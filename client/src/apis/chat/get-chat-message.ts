import axios from 'axios';
import { IChatMessage } from './chat';

const path = '/chatrooms';

type ReturnType = IChatMessage[];

export const getChatMessages = async (
    chatRoomId: number,
    lastMessageId: string | null,
    size: number = 30
) => {
    const query = new URLSearchParams();
    if (lastMessageId !== null) {
        query.append('lastMessageId', lastMessageId);
    }
    query.append('size', size.toString());
    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${chatRoomId}/messages?${query.toString()}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
