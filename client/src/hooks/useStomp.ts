import { useEffect, useState } from 'react';
import { CompatClient, Stomp, messageCallbackType } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface ISubscription {
    destination: string;
    callback: messageCallbackType;
}

interface IUseStompProps {
    subscriptions: ISubscription[];
}

const useStomp = ({ subscriptions }: IUseStompProps) => {
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

    return { stompClient };
};

export default useStomp;
