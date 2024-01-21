import { IUserRole } from '@/apis/user/user';

export interface IChatRoom {
    chatRoomId: number;
    role: IUserRole;
    profileUrl: string;
    name: string;
    lastMessage: string;
    lastMessageCreatedAt: string;
    unreadMessageCount: number;
}
