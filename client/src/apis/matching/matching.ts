import axios from 'axios';

const path = '/matching';

export interface IRequestMatching {
    chatRoomId: number;
    subjectId: number;
    hourlyRate: number;
}

export interface IResponseMatching {
    receiveMemberId: number;
    isAccepted: boolean;
    teacherName: string;
    studentName: string;
    subjectName: string;
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
