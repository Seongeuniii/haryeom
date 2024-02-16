import { useQuery } from 'react-query';
import { ITutorings } from '@/apis/tutoring/tutoring';
import { IUserRole } from '@/apis/user/user';
import { getTutorings } from '@/apis/tutoring/get-tutorings';

export const useGetTutorings = ({
    userRole,
    initialData,
}: {
    userRole: IUserRole;
    initialData?: ITutorings;
}) => {
    const { data, isLoading } = useQuery({
        queryKey: ['tutorings'],
        queryFn: () => getTutorings(userRole),
        cacheTime: Infinity,
        initialData: initialData,
    });

    return { data, isLoading };
};
