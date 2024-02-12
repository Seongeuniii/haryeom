import axios from 'axios';

const path = '/lesson/video/upload';

export const saveTutoringvideo = async (tutoringScheduleId: number, recordedChunks: Blob[]) => {
    try {
        if (recordedChunks.length <= 0) return;
        const blob = new Blob(recordedChunks, { type: 'video/webm' }); // video data
        const formData = new FormData();
        formData.append('file', blob);

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${tutoringScheduleId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }
        );
        return;
    } catch (e) {
        console.log(e);
        return;
    }
};
