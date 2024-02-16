import axios from 'axios';

const path = '/chatrooms';

const extractChatRoomId = (path: string) => {
    const match = path.match(/\/chatrooms\/(\d+)/);
    return match ? parseInt(match[1]) : null;
};

export const createChatRoom = async (teacherId: number) => {
    try {
        const res = await axios.post<number>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}`,
            JSON.stringify({ teacherId }),
            { headers: { 'Content-Type': `application/json` } }
        );
        return extractChatRoomId(res.headers.location); // chatRoomId
    } catch (e) {
        return null;
    }
};
