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
        const res = await axios.get<{ videoList: IReviewVideo[] }>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${subjectId}`
        );
        return res.data.videoList;
    } catch (e) {
        console.log(e);
    }
};

interface IVideoTimeStamp {
    timestampId: number;
    stampTime: string;
    content: string;
}

export interface IRecordedTutoringDetail {
    videoId: number;
    startTime: string;
    endTime: string;
    videoUrl: string;
    duration: string;
    teacherName: string;
    teacherProfileUrl: string;
    title: string;
    scheduleDate: string;
    subjectName: string;
    videoTimestampList: IVideoTimeStamp[];
}
export const getTutoringVideo = async (videoId: number) => {
    try {
        const res = await axios.get<IRecordedTutoringDetail>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/detail/${videoId}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
