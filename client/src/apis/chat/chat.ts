import { IUserRole } from '@/apis/user/user';
import { ISubject } from '../tutoring/tutoring';

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

export interface IRequestMatching {
    chatRoomId: number;
    subjectId: number;
    hourlyRate: number;
}

export interface IResponseMatching {
    matchingId: string;
    isAccepted: boolean;
}

export interface IRequestMatchingStatus {
    matchingId: string;
    receiveMemberId: number;
    senderName: string;
    subject: ISubject;
    hourlyRate: number;
}

export interface IResponseMatchingStatus {
    recipientMemberId: number;
    isAccepted: boolean;
    teacherName: string;
    studentName: string;
    subject: ISubject;
    hourlyRate: number;
}
