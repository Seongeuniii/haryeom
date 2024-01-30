import { atom } from 'recoil';

const ATOM_KEY = 'chat';

const chatSessionAtom = atom<{
    openChat: boolean;
    chatRoomId: number | null;
    chattingWithName: string | null;
}>({
    key: ATOM_KEY,
    default: {
        openChat: true,
        chatRoomId: null,
        chattingWithName: null,
    },
});

export default chatSessionAtom;
