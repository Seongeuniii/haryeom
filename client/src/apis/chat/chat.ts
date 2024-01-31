import { IUserRole } from '@/apis/user/user';

export interface IChatRoom {
    chatRoomId: number;
    oppositeMember: IChatOppositeMember;
    lastMessage: string;
    lastMessageCreatedAt: string;
    unreadMessageCount: number;
}

export interface IChatOppositeMember {
    role: IUserRole;
    profileUrl: string;
    name: string;
}
