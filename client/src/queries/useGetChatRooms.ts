import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { getChatRooms } from '@/apis/chat/get-chat-rooms';
import chatSessionAtom from '@/recoil/atoms/chat';

export const useGetChatRooms = () => {
    const chatSession = useRecoilValue(chatSessionAtom);

    const { data, isLoading } = useQuery({
        queryKey: ['chatRooms', chatSession],
        queryFn: () => getChatRooms(),
        cacheTime: Infinity,
    });

    return { data, isLoading };
};
