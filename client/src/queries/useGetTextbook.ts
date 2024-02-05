import { useQuery } from 'react-query';
import { getTextbookDetail } from '@/apis/tutoring/get-textbook-detail';

export const useGetTextbook = (textbookId: number) => {
    const { data, isLoading } = useQuery({
        queryKey: ['textbook', textbookId],
        queryFn: () => getTextbookDetail(textbookId),
        cacheTime: Infinity,
    });

    return { data, isLoading };
};
