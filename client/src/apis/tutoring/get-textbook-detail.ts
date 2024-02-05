import axios from 'axios';
import { ITextbook } from '../homework/homework';

const path = '/textbook';

type ReturnType = ITextbook;

export const getTextbookDetail = async (textbookId: number) => {
    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${textbookId}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
