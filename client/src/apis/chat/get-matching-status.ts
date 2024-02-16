import axios from 'axios';
import { IRequestMatching, IResponseMatching } from './chat';

const path = '/matching';

export const requestMatching = async (requestMatching: IRequestMatching) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/request`,
            JSON.stringify(requestMatching),
            { headers: { 'Content-Type': `application/json` } }
        );
        console.log(res.headers.location);
        return res.headers.location;
    } catch (e) {
        return null;
    }
};

export const responseMatching = async (responsetMatching: IResponseMatching) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/response`,
            responsetMatching
        );
        console.log(res.headers.location);
        return res.headers.location;
    } catch (e) {
        return null;
    }
};
