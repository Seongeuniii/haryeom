import { atom } from 'recoil';

const ATOM_KEY = 'chat';

const chatSessionAtom = atom<{
    openChat: boolean;
    chatRoomId: number | null;
    chattingWithName: string;
}>({
    key: ATOM_KEY,
    default: {
        openChat: false,
        chatRoomId: null,
        chattingWithName: '',
    },
});

export default chatSessionAtom;
