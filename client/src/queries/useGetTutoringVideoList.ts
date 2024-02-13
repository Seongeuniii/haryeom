import { useQuery } from 'react-query';
import { getTutoringVideoList } from '@/apis/tutoring/get-tutoring-video';

export const useGetTutoringVideoList = (subjectId: number) => {
    const { data, isLoading } = useQuery({
        queryKey: ['videoList', subjectId],
        queryFn: () => getTutoringVideoList(subjectId),
        cacheTime: Infinity,
    });
    return { data, isLoading };
};
