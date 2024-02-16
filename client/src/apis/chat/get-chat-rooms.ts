import axios from 'axios';
import { IChatRoom } from './chat';

const path = '/chatrooms';

type ReturnType = IChatRoom[];

export const getChatRooms = async () => {
    try {
        const res = await axios.get<ReturnType>(`${process.env.NEXT_PUBLIC_API_SERVER}${path}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
