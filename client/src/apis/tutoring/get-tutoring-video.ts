import axios from 'axios';

const path = '/review/video';

export interface IReviewVideo {
    videoId: number;
    title: string;
    scheduleDate: string;
    duration: string;
    tutoringScheduleId: number;
    teacherMemberId: number;
}

export interface ITutoringSubject {
    subjectId: number;
    name: string;
}

export const getTutoringSubjectList = async () => {
    try {
        const res = await axios.get<{ subject: ITutoringSubject[] }>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}`
        );
        console.log(res.data);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getTutoringVideoList = async (subjectId: number) => {
    try {
        const res = await axios.get<IReviewVideo[]>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${subjectId}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

interface IVideoDetail {
    startTime: string;
    videoUrl: string;
    videoId: number;
    endTime: string;
}

export const getTutoringVideo = async (videoId: number) => {
    try {
        const res = await axios.get<IVideoDetail>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/detail/${videoId}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
