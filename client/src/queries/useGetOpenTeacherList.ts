import { useQuery } from 'react-query';
import { getOpenTeacherList } from '@/apis/matching/get-open-teacher-list';
import { IOpenTeacher } from '@/apis/matching/matching';

export interface IFilterers {
    [key: string]: string[] | number;
}

export const useGetOpenTeacherList = (filterers: IFilterers, initialData?: IOpenTeacher[]) => {
    const { data, isLoading } = useQuery({
        queryKey: ['getOpenTeacherList', filterers],
        queryFn: () => getOpenTeacherList(filterers),
        cacheTime: Infinity,
        initialData: initialData,
    });

    return { data, isLoading };
};
