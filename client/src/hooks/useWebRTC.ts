/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { CompatClient, IMessage, Stomp, messageCallbackType } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';

export interface ISubscription {
    destination: string;
    callback: messageCallbackType;
}

interface PeerInfo {
    memberId: number;
    socketId: string;
}

interface IUseWebRTCStompProps {
    memberId: number;
    roomCode: string;
    myStream: MediaStream | null;
}

const useWebRTCStomp = ({ memberId, roomCode, myStream }: IUseWebRTCStompProps) => {
    const [stompClient, setStompClient] = useState<CompatClient>();
    const peerConnections = useRef<{ [socketId: string]: RTCPeerConnection }>({});
    const [peerStream, setPeerStream] = useState<any[]>([]);
    const [dataChannels, setDataChannels] = useState<RTCDataChannel[]>([]);
    const [socketId, setSocketId] = useState<string>();
    const userSession = useRecoilValue(userSessionAtom);

    const sendIceCandidate = (e: RTCPeerConnectionIceEvent, peerId: string) => {
        if (!stompClient) return;
        const data = { iceCandidate: e.candidate, socketId };
        stompClient.send(`/app/ice/room/${roomCode}/${peerId}`, {}, JSON.stringify(data));
    };
    const handleRemoteStream = (e: RTCTrackEvent, peerId: number) => {
        setPeerStream((curr) => {
            const existingPeerIndex = curr.findIndex((item) => item.socketId === peerId);
            if (existingPeerIndex !== -1) {
                return [
                    ...curr.slice(0, existingPeerIndex),
                    { stream: e.streams[0], socketId: peerId },
                    ...curr.slice(existingPeerIndex + 1),
                ];
            }
            return [...curr, { stream: e.streams[0], socketId: peerId }];
        });
    };

    const createPeerConnection = (
        peerInfo: PeerInfo,
        isOfferer: boolean
    ): RTCPeerConnection | null => {
        try {
            /**
             * ===============  PeerConnection  ===============
             */
            const stunUrls = [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun3.l.google.com:19302',
                'stun:stun4.l.google.com:19302',
            ];
            const configuration = {
                iceServers: [{ urls: stunUrls }],
            };
            const pc = new RTCPeerConnection(configuration);
            myStream?.getTracks().forEach((track) => pc.addTrack(track, myStream));

            pc.addEventListener('icecandidate', (e: RTCPeerConnectionIceEvent) => {
                sendIceCandidate(e, peerInfo.socketId);
            });

            // // TODO: 오디오
            pc.addEventListener('track', (e: RTCTrackEvent) => {
                if (e.track.kind === 'video') handleRemoteStream(e, peerInfo.memberId);
            });

            /**
             * ===============  DataChannel  ===============
             */
            if (isOfferer) {
                const channel: RTCDataChannel = pc.createDataChannel('chat');
                channel.onopen = () => console.log('Hi: Data channel open');
                channel.onclose = () => console.log('Data channel close');
                channel.onmessage = (e: MessageEvent<any>) => {
                    // console.log(e.data);
                };
                setDataChannels((prev: RTCDataChannel[]) => [...prev, channel]);
            } else {
                pc.ondatachannel = (e: RTCDataChannelEvent) => {
                    const channel: RTCDataChannel = e.channel;
                    channel.onopen = () => console.log('Hi Back: Data channel open');
                    channel.onclose = () => console.log('Data channel close');
                    channel.onmessage = (e: MessageEvent<any>) => {
                        // console.log(e.data);
                    };
                    setDataChannels((prev: RTCDataChannel[]) => [...prev, channel]);
                };
            }
            return pc;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    const handleWelcome = (message: IMessage) => {
        if (!stompClient) return;
        const peer = JSON.parse(message.body); // 참여자 정보
    };

    const handleJoinRoom = async (message: IMessage) => {
        if (!stompClient) return;
        const peer: PeerInfo = JSON.parse(message.body);

        const pc = createPeerConnection(peer, true);
        if (!pc) return;
        const offer = await pc.createOffer();
        pc.setLocalDescription(offer);
        peerConnections.current[peer.socketId] = pc;

        // send offer
        const data = {
            offer,
            callerId: socketId,
            callerMemberId: memberId,
            calleeId: peer.socketId,
        };
        stompClient.send(`/app/offer/room/${roomCode}/${peer.socketId}`, {}, JSON.stringify(data));
    };

    const handleOffer = async (message: IMessage) => {
        if (!stompClient) return;

        const { offer, callerId, callerMemberId, calleeId } = JSON.parse(message.body);
        const peer: PeerInfo = { memberId: callerMemberId, socketId: callerId };

        const pc = createPeerConnection(peer, false);
        if (!pc) return;
        pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        pc.setLocalDescription(answer);
        peerConnections.current[peer.socketId] = pc;

        // send answer
        const data = {
            answer,
            callerId,
            calleeId,
            calleeMemberId: memberId,
        };
        stompClient.send(`/app/answer/room/${roomCode}/${peer.socketId}`, {}, JSON.stringify(data));
    };

    const handleAnswer = async (message: IMessage) => {
        if (!stompClient) return;
        const { answer, callerId, calleeId, calleeMemberId } = JSON.parse(message.body);
        const peer: PeerInfo = { memberId: calleeMemberId, socketId: calleeId };
        peerConnections.current[peer.socketId].setRemoteDescription(answer);
    };

    const handleIce = (message: IMessage) => {
        if (!stompClient) return;
        const { iceCandidate, peerId } = JSON.parse(message.body);
        peerConnections.current[peerId]?.addIceCandidate(iceCandidate);
    };

    useEffect(() => {
        if (!myStream) return;
        console.log('connectSocket: ', memberId);
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_SIGNALING_SERVER}`); // 변경
        const stomp = Stomp.over(socket);
        stomp.debug = () => {};
        stomp.connect({}, () => {
            setStompClient(stomp);
            setSocketId(socket._transport.url.split('/')[5]);
            // return () => {
            //     stompSubscriptions.forEach((stompSubscription) => stompSubscription.unsubscribe());
            // };
        });
    }, [myStream]);

    const subscribe = () => {
        if (!stompClient) return;
        const subscriptions: ISubscription[] = [
            {
                destination: `/topic/welcome/room/${roomCode}/${socketId}`,
                callback: handleWelcome,
            },
            {
                destination: `/topic/enterRoom/room/${roomCode}/${socketId}`,
                callback: handleJoinRoom,
            },

            {
                destination: `/topic/offer/room/${roomCode}/${socketId}`,
                callback: handleOffer,
            },
            {
                destination: `/topic/answer/room/${roomCode}/${socketId}`,
                callback: handleAnswer,
            },
            {
                destination: `/topic/ice/room/${roomCode}/${socketId}`,
                callback: handleIce,
            },
        ];
        subscriptions.map((subscription) => {
            return stompClient.subscribe(subscription.destination, subscription.callback);
        });
    };

    useEffect(() => {
        if (!stompClient) return;

        // subscribe
        subscribe();

        console.log('sendJoin: ', socketId);

        // send join
        const destination = `/app/join/room/${roomCode}`;
        stompClient.send(
            destination,
            {},
            JSON.stringify({ memberId, socketId, memberName: `${userSession?.name}` })
        );
    }, [stompClient]);

    useEffect(() => {
        return () => {
            console.log(stompClient);
            stompClient?.disconnect();
        };
    }, []);

    return { stompClient, peerStream, peerConnections, dataChannels };
};

export default useWebRTCStomp;
