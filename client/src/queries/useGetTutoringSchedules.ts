import { useQuery } from 'react-query';
import { IStudentSchedule, ITeacherSchedule, ITutoringSchedules } from '@/apis/tutoring/tutoring';
import { IUserRole } from '@/apis/user/user';
import { getTutoringSchedules } from '@/apis/tutoring/get-tutoring-schedules';

export interface IDateTutoringScheduleMap {
    [date: string]: ITeacherSchedule[] | IStudentSchedule[];
}

export const useGetTutoringSchedules = (
    userRole: IUserRole,
    yearmonth: string,
    initialData?: ITutoringSchedules
) => {
    const { ...result } = useQuery({
        queryKey: ['tutoringSchedules', yearmonth],
        queryFn: () => getTutoringSchedules(userRole, yearmonth),
        select: (data) =>
            data?.reduce((acc: IDateTutoringScheduleMap, cur) => {
                acc[cur.scheduleDate] = cur.schedules;
                return acc;
            }, {}),
        cacheTime: Infinity,
        initialData: initialData,
    });

    return { ...result, tutoringSchedulesOfMonth: result.data };
};
