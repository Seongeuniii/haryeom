import { useQuery } from 'react-query';
import { getTutoringVideoList } from '@/apis/tutoring/get-tutoring-video';

export const useGetTutoringVideoList = (tutoringId: number) => {
    const result = useQuery({
        queryKey: ['videoList', tutoringId],
        queryFn: () => getTutoringVideoList(tutoringId),
        cacheTime: Infinity,
    });

    return {
        videoList: result.data,
        ...result,
    };
};
