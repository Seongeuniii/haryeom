import { useQuery } from 'react-query';
import { ITutoringSchedules } from '@/apis/tutoring/tutoring';
import { IUserRole } from '@/apis/user/user';
import { getTutoringSchedules } from '@/apis/tutoring/get-tutoring-schedules';

export const useGetTutoringSchedules = (
    userRole: IUserRole,
    yearmonth: string,
    initialData?: ITutoringSchedules
) => {
    const { data, isLoading } = useQuery({
        queryKey: ['teacherTutoringSchedules'],
        queryFn: () => getTutoringSchedules(userRole, yearmonth),
        initialData: initialData,
        cacheTime: Infinity,
    });

    return { data, isLoading };
};
