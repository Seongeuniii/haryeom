import { useQuery } from 'react-query';
import { getOpenTeacherList } from '@/apis/matching/get-open-teacher-list';
import { IFindTeacherFilterers, IOpenTeacher } from '@/apis/matching';

export const useGetOpenTeacherList = (
    filterers: IFindTeacherFilterers,
    initialData?: IOpenTeacher[]
) => {
    const { data, isFetching } = useQuery({
        queryKey: ['getOpenTeacherList', filterers],
        queryFn: () => getOpenTeacherList(filterers),
        cacheTime: Infinity,
        initialData: initialData,
        keepPreviousData: true,
    });

    return { data, isFetching };
};
