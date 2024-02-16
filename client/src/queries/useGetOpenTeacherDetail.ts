import { useQuery } from 'react-query';
import { getOpenTeacherDetail } from '@/apis/matching/get-open-teacher-detail';

export const useGetOpenTeacherDetail = (teacherId: number | null) => {
    const { data, isLoading } = useQuery({
        queryKey: ['openTeacherDetail', teacherId],
        queryFn: () => getOpenTeacherDetail(teacherId),
        cacheTime: Infinity,
    });

    return { data, isLoading };
};
