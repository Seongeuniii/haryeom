import axios from 'axios';
import { IMyHomeworkDrawings } from '@/containers/HomeworkContainer/HomeworkContainer';

const path = '/homework';

export const saveHomework = async (homeworkId: number, myHomeworkDrawings: IMyHomeworkDrawings) => {
    const formData = new FormData();
    const page: number[] = [];

    Object.entries(myHomeworkDrawings).forEach(([pageNum, drawing]) => {
        // string: 변경 데이터 없음
        if (drawing instanceof Blob) {
            page.push(parseInt(pageNum));
            formData.append('file', drawing);
        }
    });
    formData.append('page', new Blob([JSON.stringify(page)], { type: 'application/json' }));

    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${homeworkId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }
        );
    } catch (e) {
        return null;
    }
};

export const submitHomework = async (homeworkId: number) => {
    try {
        const res = await axios.put<number>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/submit/${homeworkId}`,
            JSON.stringify({ status: 'COMPLETE' })
        );
        return;
    } catch (e) {
        return null;
    }
};
