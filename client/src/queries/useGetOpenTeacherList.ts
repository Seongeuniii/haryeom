import { useQuery } from 'react-query';
import { ITutoringSchedules } from '@/apis/tutoring/tutoring';
import { getOpenTeacherList } from '@/apis/matching/get-open-teacher-list';
import { IOpenTeacher } from '@/apis/matching/matching';

export const useGetOpenTeacherList = (
    filteres: { [key: string]: string[] | number },
    initialData?: IOpenTeacher[]
) => {
    const { data, isLoading } = useQuery({
        queryKey: ['getOpenTeacherList', filteres],
        queryFn: () => getOpenTeacherList(filteres),
        cacheTime: Infinity,
        initialData: initialData,
    });

    return { data, isLoading };
};
