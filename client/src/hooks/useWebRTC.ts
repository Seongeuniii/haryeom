/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { CompatClient, IMessage, Stomp, messageCallbackType } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface ISubscription {
    destination: string;
    callback: messageCallbackType;
}

interface IUseWebRTCStompProps {
    memberId: number;
    myStream: MediaStream | null;
}

interface PeerInfo {
    memberId: number;
}

const roomCode = 34;

const useWebRTCStomp = ({ memberId, myStream }: IUseWebRTCStompProps) => {
    const [stompClient, setStompClient] = useState<CompatClient>();
    const peerConnections = useRef<{ [socketId: string]: RTCPeerConnection }>({});
    const [peerStream, setPeerStream] = useState<any[]>([]);
    const [dataChannels, setDataChannels] = useState<RTCDataChannel[]>([]);

    const sendIceCandidate = (e: RTCPeerConnectionIceEvent, peerId: number) => {
        if (!stompClient) return;
        const data = { iceCandidate: e.candidate, memberId };
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
                sendIceCandidate(e, peerInfo.memberId);
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
        peerConnections.current[peer.memberId] = pc;

        // send offer
        const data = { offer, callerId: memberId, calleeId: peer.memberId };
        stompClient.send(`/app/offer/room/${roomCode}/${peer.memberId}`, {}, JSON.stringify(data));
    };

    const handleOffer = async (message: IMessage) => {
        if (!stompClient) return;

        const { offer, callerId, calleeId } = JSON.parse(message.body);
        const peer: PeerInfo = { memberId: callerId };

        const pc = createPeerConnection(peer, false);
        if (!pc) return;
        pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        pc.setLocalDescription(answer);
        peerConnections.current[peer.memberId] = pc;

        // send answer
        const data = {
            answer,
            callerId,
            calleeId,
        };
        stompClient.send(`/app/answer/room/${roomCode}/${peer.memberId}`, {}, JSON.stringify(data));
    };

    const handleAnswer = async (message: IMessage) => {
        if (!stompClient) return;
        const { answer, callerId, calleeId } = JSON.parse(message.body);
        const peer: PeerInfo = { memberId: calleeId };
        peerConnections.current[peer.memberId].setRemoteDescription(answer);
    };

    const handleIce = (message: IMessage) => {
        if (!stompClient) return;
        const { iceCandidate, peerId } = JSON.parse(message.body);
        peerConnections.current[peerId]?.addIceCandidate(iceCandidate);
    };

    useEffect(() => {
        if (!myStream) return;
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_SIGNALING_SERVER}`);
        const stomp = Stomp.over(socket);
        stomp.debug = () => {};
        stomp.connect({}, () => {
            setStompClient(stomp);
            // return () => {
            //     stompSubscriptions.forEach((stompSubscription) => stompSubscription.unsubscribe());
            // };
        });
        return () => {
            stompClient?.disconnect();
        };
    }, [myStream]);

    const subscribe = () => {
        if (!stompClient) return;
        const subscriptions: ISubscription[] = [
            {
                destination: `/topic/welcome/room/${roomCode}/${memberId}`,
                callback: handleWelcome,
            },
            {
                destination: `/topic/enterRoom/room/${roomCode}/${memberId}`,
                callback: handleJoinRoom,
            },

            {
                destination: `/topic/offer/room/${roomCode}/${memberId}`,
                callback: handleOffer,
            },
            {
                destination: `/topic/answer/room/${roomCode}/${memberId}`,
                callback: handleAnswer,
            },
            {
                destination: `/topic/ice/room/${roomCode}/${memberId}`,
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

        // send join
        const destination = `/app/join/room/${roomCode}`;
        stompClient.send(
            destination,
            {},
            JSON.stringify({ memberId, memberName: `이름_${memberId}` })
        );
    }, [stompClient]);

    return { peerStream, peerConnections, dataChannels };
};

export default useWebRTCStomp;
