import axios from 'axios';

const path = '/textbook/tutoring/students';

export const getTextbooks = async (tutoringId: number) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}${path}/${tutoringId}`);
        return res.data.textbooks;
    } catch (e) {
        console.log(e);
    }
};
