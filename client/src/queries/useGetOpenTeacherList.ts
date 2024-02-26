import { useInfiniteQuery, useQuery } from 'react-query';
import { getOpenTeacherList } from '@/apis/matching/get-open-teacher-list';
import { IFindTeacherFilterers, IOpenTeacher } from '@/apis/matching';

const defaultPageSize = 10;

export const useGetOpenTeacherList = (
    filterers: IFindTeacherFilterers,
    initialData?: IOpenTeacher[]
) => {
    const {
        data,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
    } = useInfiniteQuery({
        queryKey: ['getOpenTeacherList', filterers],
        queryFn: ({ pageParam = 0 }) => {
            return getOpenTeacherList(pageParam, defaultPageSize, filterers);
        },
        getNextPageParam: (lastPage, pages) => {
            return lastPage?.length === 0 ? undefined : pages.length + 1;
        },
        initialData: () => {
            const data = initialData;
            if (data) {
                return {
                    pageParams: [0],
                    pages: [data],
                };
            }
        },
        keepPreviousData: true,
        cacheTime: Infinity,
        select: (data) => ({
            pages: data.pages.flatMap((page) => page),
            pageParams: data.pageParams,
        }),
    });

    return {
        data: data?.pages,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
    };
};
