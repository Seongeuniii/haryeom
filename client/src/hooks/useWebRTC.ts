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

interface IPeerSession {
    memberId: number;
    socketId: string;
}

interface IPeerInfo extends IPeerSession {
    memberName: string;
}

interface IUseWebRTCStompProps {
    memberId: number;
    roomCode: string;
    myStream: MediaStream | null;
}

const useWebRTCStomp = ({ memberId, roomCode, myStream }: IUseWebRTCStompProps) => {
    const userSession = useRecoilValue(userSessionAtom);
    const [stompClient, setStompClient] = useState<CompatClient>();
    const peerConnections = useRef<{ [socketId: string]: RTCPeerConnection }>({});
    const [peerStream, setPeerStream] = useState<any[]>([]);
    const [dataChannels, setDataChannels] = useState<RTCDataChannel[]>([]);
    const [socketId, setSocketId] = useState<string>();
    const [peerNames, setPeerNames] = useState<{ [socketId: string]: string }>({});

    useEffect(() => {
        if (!peerNames || !peerStream) return;
        setPeerStream((prevPeerStream) => {
            const updatedPeerStream = prevPeerStream.map((peer) => {
                const memberName = peerNames[peer.socketId] || `이름_${peer.socketId}`;
                return { ...peer, memberName };
            });

            if (JSON.stringify(updatedPeerStream) !== JSON.stringify(peerStream)) {
                return updatedPeerStream;
            }

            return prevPeerStream;
        });
    }, [peerStream, peerNames]);

    const sendIceCandidate = (e: RTCPeerConnectionIceEvent, peerSocketId: string) => {
        if (!stompClient) return;
        const data = { iceCandidate: e.candidate, socketId };
        stompClient.send(`/app/ice/room/${roomCode}/${peerSocketId}`, {}, JSON.stringify(data));
    };
    const handleRemoteStream = (e: RTCTrackEvent, peerSocketId: string) => {
        setPeerStream((curr) => {
            const existingPeerIndex = curr.findIndex((item) => item.socketId === peerSocketId);
            if (existingPeerIndex !== -1) {
                return [
                    ...curr.slice(0, existingPeerIndex),
                    { stream: e.streams[0], socketId: peerSocketId },
                    ...curr.slice(existingPeerIndex + 1),
                ];
            }
            return [...curr, { stream: e.streams[0], socketId: peerSocketId }];
        });
    };

    const createPeerConnection = (
        peerInfo: IPeerSession,
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

            pc.addEventListener('track', (e: RTCTrackEvent) => {
                handleRemoteStream(e, peerInfo.socketId);
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
        const peers: IPeerInfo[] = JSON.parse(message.body); // 참여자 정보
        const newPeerNames: { [socketId: string]: string } = { ...peerNames };
        peers.forEach((peer) => {
            newPeerNames[peer.socketId] = peer.memberName;
        });
        setPeerNames(newPeerNames);
    };

    const handleJoinRoom = async (message: IMessage) => {
        if (!stompClient) return;
        const peer: IPeerInfo = JSON.parse(message.body);
        setPeerNames((prev) => ({ ...prev, [peer.socketId]: peer.memberName }));
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
        const peer: IPeerSession = { memberId: callerMemberId, socketId: callerId };

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
        const peer: IPeerSession = { memberId: calleeMemberId, socketId: calleeId };
        peerConnections.current[peer.socketId].setRemoteDescription(answer);
    };

    const handleIce = (message: IMessage) => {
        if (!stompClient) return;
        const { iceCandidate, socketId } = JSON.parse(message.body);
        peerConnections.current[socketId]?.addIceCandidate(iceCandidate);
    };

    const handlePeerDisconnect = (message: IMessage) => {
        if (!stompClient) return;
        const { socketId } = JSON.parse(message.body);

        if (peerConnections.current[socketId]) {
            peerConnections.current[socketId].close();
            delete peerConnections.current[socketId];
        }

        setDataChannels((prevChannels) =>
            prevChannels.filter((channel) => channel.label !== socketId)
        );

        setPeerStream((prevStreams) =>
            prevStreams.filter((stream) => stream.socketId !== socketId)
        );
    };

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
            {
                destination: `/topic/disconnect/room/${roomCode}/${socketId}`,
                callback: handlePeerDisconnect,
            },
        ];
        subscriptions.map((subscription) => {
            return stompClient.subscribe(subscription.destination, subscription.callback);
        });
    };

    const sendJoin = () => {
        if (!stompClient) return;
        const destination = `/app/join/room/${roomCode}`;
        stompClient.send(
            destination,
            {},
            JSON.stringify({ memberId, socketId, memberName: `${userSession?.name}` })
        );
    };

    useEffect(() => {
        if (!stompClient) return;
        subscribe();
        sendJoin();
    }, [stompClient]);

    useEffect(() => {
        if (!myStream) return;
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_SIGNALING_SERVER}`); // 변경
        const stomp = Stomp.over(socket);
        stomp.debug = () => {};
        stomp.connect({}, () => {
            setStompClient(stomp);
            setSocketId((socket as any)._transport.url.split('/')[5]);
            // return () => {
            //     stompSubscriptions.forEach((stompSubscription) => stompSubscription.unsubscribe());
            // };
        });
    }, [myStream]);

    return { stompClient, peerStream, peerConnections, dataChannels };
};

export default useWebRTCStomp;
