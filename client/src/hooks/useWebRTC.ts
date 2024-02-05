/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { CompatClient, IMessage, Stomp, StompConfig, messageCallbackType } from '@stomp/stompjs';
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
    console.log(myStream);
    const [stompClient, setStompClient] = useState<CompatClient>();
    const peerConnections = useRef<{ [socketId: string]: RTCPeerConnection }>({});
    const [peerStream, setPeerStream] = useState<any[]>([]);
    const [dataChannels, setDataChannels] = useState<RTCDataChannel[]>([]);

    const sendIceCandidate = (e: RTCPeerConnectionIceEvent, peerId: number) => {
        if (!stompClient) return;
        console.log('send ice');
        const data = { iceCandidate: e.candidate, peerId };
        stompClient.send(`/app/ice/room/${roomCode}/${peerId}`, {}, JSON.stringify(data));
    };

    const handleRemoteStream = (e: RTCTrackEvent, peerId: number) => {
        setPeerStream((curr) => [...curr, { stream: e.streams[0], socketId: peerId }]);
        // setUsers((prev) => [...prev, { stream: data.stream, socketID, nickname }]);
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
                console.log('ice!!!!');
                sendIceCandidate(e, peerInfo.memberId);
            });

            // // TODO: 일단 비디오만
            pc.addEventListener('track', (e: RTCTrackEvent) => {
                console.log('track!!!!');
                if (e.track.kind === 'video') handleRemoteStream(e, peerInfo.memberId);
            });
            return pc;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    const handleWelcome = (message: IMessage) => {
        if (!stompClient) return;
        console.log('welcome');
        const peer = JSON.parse(message.body); // 참여자 정보
    };

    const handleJoinRoom = async (message: IMessage) => {
        if (!stompClient) return;
        console.log('joinRoom');
        const peer: PeerInfo = JSON.parse(message.body);

        const pc = createPeerConnection(peer, true);
        if (!pc) return;
        const offer = await pc.createOffer();
        pc.setLocalDescription(offer);
        peerConnections.current[peer.memberId] = pc;

        // send offer
        console.log('send offer');
        const data = { offer, callerId: memberId, calleeId: peer.memberId };
        stompClient.send(`/app/offer/room/${roomCode}/${peer.memberId}`, {}, JSON.stringify(data));
    };

    const handleOffer = async (message: IMessage) => {
        if (!stompClient) return;
        console.log('receive offer');

        const { offer, callerId, calleeId } = JSON.parse(message.body);
        const peer: PeerInfo = { memberId: callerId };

        const pc = createPeerConnection(peer, false);
        if (!pc) return;
        pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        pc.setLocalDescription(answer);
        peerConnections.current[peer.memberId] = pc;

        // send answer
        console.log('send answer');
        const data = {
            answer,
            callerId,
            calleeId,
        };
        stompClient.send(`/app/answer/room/${roomCode}/${peer.memberId}`, {}, JSON.stringify(data));
    };

    const handleAnswer = async (message: IMessage) => {
        if (!stompClient) return;
        console.log('receive answer');
        const { answer, callerId, calleeId } = JSON.parse(message.body);
        const peer: PeerInfo = { memberId: calleeId };
        peerConnections.current[peer.memberId].setRemoteDescription(answer);
    };

    const handleIce = (message: IMessage) => {
        if (!stompClient) return;
        console.log('receive ice');
        const { iceCandidate, peerId } = JSON.parse(message.body);
        peerConnections.current[peerId]?.addIceCandidate(iceCandidate);
    };

    useEffect(() => {
        if (!myStream) return;
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_CHAT_SERVER}`); // roomCode
        console.log('after socket : ' + socket);
        const stomp = Stomp.over(socket);
        console.log('after stomp over : ' + stomp);
        console.log('after debug, start connect');
        stomp.connect(
            {},
            () => {
                console.log('stomp connection');
                setStompClient(stomp);
                console.log('setStompClient : ' + stompClient);
                // return () => {
                //     stompSubscriptions.forEach((stompSubscription) => stompSubscription.unsubscribe());
                // };
            },
            (error: any) => {
                console.error('Stomp connection error : ', error);
            }
        );
        return () => {
            stompClient?.disconnect();
        };
    }, [myStream]);

    const subscribe = () => {
        if (!stompClient) return;
        console.log('subscribe');
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
        subscriptions.map((subscription, i) => {
            console.log('subscribe ' + i + ':' + subscription);
            return stompClient.subscribe(subscription.destination, subscription.callback);
        });
    };

    // subscribe
    useEffect(() => {
        console.log('stompClient : ' + stompClient);
        if (!stompClient) return;
        subscribe();
        console.log('send join');
        const destination = `/app/join/room/${roomCode}`;
        stompClient.send(
            destination,
            {},
            JSON.stringify({ memberId, memberName: `이름_${memberId}` })
        );
    }, [stompClient]);

    useEffect(() => {
        console.log(peerConnections);
    }, [peerConnections]);

    return { peerStream, peerConnections, dataChannels };
};

export default useWebRTCStomp;
