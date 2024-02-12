import axios from 'axios';

const path = '/lesson/timestamp';

export const saveTimeStamp = async ({
    tutoringScheduleId,
    stampTime,
    content,
}: {
    tutoringScheduleId: number;
    stampTime: string;
    content: string;
}) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${tutoringScheduleId}`,
            JSON.stringify({
                stampTime,
                content,
            }),
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );
        return res.data;
    } catch (e) {
        return null;
    }
};

// {
// 	"stampTime": "00:08:32",
// 	"content" : "모르겠는 부분"
// }
