import axios from 'axios';
import { ISubject } from '@/apis/tutoring/tutoring';

const path = '/matching';

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
    receiveMemberId: number;
    isAccepted: boolean;
    teacherName: string;
    studentName: string;
    subject: ISubject;
    hourlyRate: number;
}

export const requestMatching = async (requestMatching: IRequestMatching) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/request`,
            requestMatching
        );
        console.log(res.headers.location);
        return res.headers.location;
    } catch (e) {
        return null;
    }
};

export const responseMatching = async (requestMatching: IResponseMatching[]) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/response`,
            requestMatching
        );
        console.log(res.headers.location);
        return res.headers.location;
    } catch (e) {
        return null;
    }
};
