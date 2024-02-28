import { useQuery } from 'react-query';
import { getTextbooks } from '@/apis/tutoring/get-textbooks';
import { ITutoringTextbook } from '@/apis/tutoring/tutoring';

export const useGetTutoringTextbooks = (tutoringId: number, initialData: ITutoringTextbook[]) => {
    const result = useQuery({
        queryKey: ['tutoringTextbooks', tutoringId],
        queryFn: () => getTextbooks(tutoringId),
        cacheTime: Infinity,
        initialData,
    });

    return {
        tutoringTextbooks: result.data,
        ...result,
    };
};
