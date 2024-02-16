import { useEffect, useState } from 'react';
import { CompatClient, Stomp, messageCallbackType } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface ISubscription {
    name: string;
    destination: string;
    callback: messageCallbackType;
}

interface IUseStompProps {
    subscriptions: ISubscription[];
    roomId: number;
}

const useStomp = ({ subscriptions, roomId }: IUseStompProps) => {
    const [stompClient, setStompClient] = useState<CompatClient>();

    useEffect(() => {
        const socket = new SockJS(`${process.env.NEXT_PUBLIC_CHAT_SERVER}`);
        const stomp = Stomp.over(socket);
        stomp.connect({}, () => {
            const stompSubscriptions = subscriptions.map((subscription) => {
                return stomp.subscribe(subscription.destination, subscription.callback);
            });
            setStompClient(stomp);
            return () => {
                stompSubscriptions.forEach((stompSubscription) => stompSubscription.unsubscribe());
            };
        });
        return () => {
            stompClient?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!stompClient) return;
        const destination = `/app/chatroom/${roomId}/connect`;
        stompClient.send(destination);
    }, [stompClient]);

    return { stompClient };
};

export default useStomp;
