import { useRecoilState } from 'recoil';
import chatSessionAtom from '@/recoil/atoms/chat';
import { createChatRoom } from '@/apis/matching/create-chat-room';

const useChat = () => {
    const [chatSession, setChatSession] = useRecoilState(chatSessionAtom);

    const openChatContainer = () => {
        setChatSession((prev) => {
            return { ...prev, openChat: true };
        });
    };

    const joinChatRoom = (roomId: number) => {
        setChatSession((prev) => {
            return { ...prev, chatRoomId: roomId };
        });
    };

    const startChat = async (chatWithId: number) => {
        const chatRoomId = await createChatRoom(chatWithId);
        if (!chatRoomId) return;
        openChatContainer();
        joinChatRoom(chatRoomId);
    };

    return { openChatContainer, startChat };
};

export default useChat;
