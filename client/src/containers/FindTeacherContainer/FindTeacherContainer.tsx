import { useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import HomeLayout from '@/components/layouts/HomeLayout';
import FilterOpenTeacherList from '@/components/FilterOpenTeacherList/FilterOpenTeacherList';
import OpenTeacherList from '@/components/OpenTeacherList';
import { getOpenTeacherList } from '@/apis/matching/get-open-teacher-list';
import { IOpenTeacher } from '@/apis/matching/matching';
import { IFilterers, useGetOpenTeacherList } from '@/queries/useGetOpenTeacherList';

interface FindTeacherContainerProps {
    openTeacherList: IOpenTeacher[];
}

const FindTeacherContainer = ({ openTeacherList: initialData }: FindTeacherContainerProps) => {
    const [filterers, setFilterers] = useState<IFilterers>({
        subjectIds: [],
        colleges: [],
        minCareer: 0,
        gender: [],
        maxSalary: 0,
    });

    const { data: openTeacherList, isLoading } = useGetOpenTeacherList(filterers, initialData);

    return (
        <HomeLayout>
            <StyledFindTeacherContainer>
                <FindTeacherContainerHeader>
                    <Title>선생님 찾기</Title>
                    <SubTitle>원하는 선생님을 찾아 과외를 신청해보세요.</SubTitle>
                </FindTeacherContainerHeader>
                <FilterOpenTeacherList filterers={filterers} setFilterers={setFilterers} />
                {openTeacherList && <OpenTeacherList openTeacherList={openTeacherList} />}
            </StyledFindTeacherContainer>
        </HomeLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const openTeacherList = await getOpenTeacherList();

    return {
        props: {
            openTeacherList: openTeacherList || null,
        },
    };
};

const StyledFindTeacherContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const FindTeacherContainerHeader = styled.header`
    position: fixed;
    width: 100vw;
    height: 8.3em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: end;
    background-color: white;
    z-index: -1;
`;

const Title = styled.span`
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 0.5em;
`;

const SubTitle = styled.span`
    font-size: 0.8em;
    padding-left: 0.1em;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

export default FindTeacherContainer;
