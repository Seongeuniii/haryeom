import axios from 'axios';
import { IMyHomeworkDrawings } from '@/containers/HomeworkContainer/HomeworkContainer';

const path = '/homework';

export const saveHomework = async (homeworkId: number, myHomeworkDrawings: IMyHomeworkDrawings) => {
    const page = [3, 5, 6];

    const formData = new FormData();
    formData.append('page', new Blob([JSON.stringify(page)], { type: 'application/json' }));
    if (myHomeworkDrawings[3] instanceof Blob) {
        formData.append('file', myHomeworkDrawings[3] as Blob);
    }
    if (myHomeworkDrawings[5] instanceof Blob) {
        formData.append('file', myHomeworkDrawings[5] as Blob);
    }
    if (myHomeworkDrawings[6] instanceof Blob) {
        formData.append('file', myHomeworkDrawings[6] as Blob);
    }
    console.log(formData);

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
