import { useQuery } from 'react-query';
import { IHomework, IHomeworkList, IProgressPercentage } from '@/apis/homework/homework';
import { getHomework } from '@/apis/homework/get-homework';

export const useGetHomework = (homeworkId: number, initialData?: IHomework) => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['homework', homeworkId],
        queryFn: () => getHomework(homeworkId),
        cacheTime: Infinity,
        initialData: initialData,
    });
    return { data, isLoading, refetch };
};
