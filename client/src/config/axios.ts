import axios from 'axios';

export const axiosConfig = () => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_SERVER;
    axios.defaults.withCredentials = true;
};
