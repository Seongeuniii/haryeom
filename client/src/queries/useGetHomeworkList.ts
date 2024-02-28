import { useQuery } from 'react-query';
import { getHomeworkList } from '@/apis/homework/get-homework-list';
import { IHomeworkList, IProgressPercentage } from '@/apis/homework/homework';

export const useGetHomeworkList = (
    tutoringId: number,
    initialData?: {
        homeworkList: IHomeworkList;
        progressPercentage: IProgressPercentage;
    }
) => {
    const result = useQuery({
        queryKey: ['homeworkList', tutoringId],
        queryFn: () => getHomeworkList(tutoringId),
        cacheTime: Infinity,
        initialData: initialData,
    });

    return {
        homeworkList: result.data?.homeworkList,
        progressPercentage: result.data?.progressPercentage,
        ...result,
    };
};
