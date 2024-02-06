import { useQuery } from 'react-query';
import { getOpenTeacherList } from '@/apis/matching/get-open-teacher-list';
import { IOpenTeacher } from '@/apis/matching/matching';

export const useGetOpenTeacherList = (
    filterers: { [key: string]: string[] | number },
    initialData?: IOpenTeacher[]
) => {
    const { data, isLoading } = useQuery({
        queryKey: ['getOpenTeacherList', filterers],
        queryFn: () => getOpenTeacherList(filterers),
        cacheTime: Infinity,
        initialData: initialData,
    });

    return { data, isLoading };
};
