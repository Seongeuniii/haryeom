import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import HomeLayout from '@/components/layouts/HomeLayout';
import FilterOpenTeacherList from '@/components/FilterOpenTeacherList/FilterOpenTeacherList';
import OpenTeacherList from '@/components/OpenTeacherList';
import { getOpenTeacherList } from '@/apis/matching/get-open-teacher-list';
import { IOpenTeacher } from '@/apis/matching/matching';
import { useGetOpenTeacherList } from '@/queries/useGetOpenTeacherList';
import Spinner from '@/components/icons/Spinner';
import useFilter from '@/components/FilterOpenTeacherList/hooks/useFilter';
import SelectedOptionValues from '@/components/FilterOpenTeacherList/SelectedOptionValues';

interface FindTeacherContainerProps {
    openTeacherList: IOpenTeacher[];
}

const FindTeacherContainer = ({ openTeacherList: _openTeacherList }: FindTeacherContainerProps) => {
    const { filterers, handleSelectOption, handleInput, isSelected } = useFilter();
    const { data: openTeacherList, isFetching } = useGetOpenTeacherList(
        filterers,
        _openTeacherList
    );

    return (
        <HomeLayout>
            <StyledFindTeacherContainer>
                <FindTeacherContainerHeader>
                    <Title>선생님 찾기</Title>
                    <SubTitle>원하는 선생님을 찾아 과외를 신청해보세요.</SubTitle>
                </FindTeacherContainerHeader>
                <FilterOpenTeacherList
                    handleSelectOption={handleSelectOption}
                    handleInput={handleInput}
                    isSelected={isSelected}
                />
                <SelectedOptionValues
                    filterers={filterers}
                    handleSelectOption={handleSelectOption}
                    handleInput={handleInput}
                />
                {isFetching && <Spinner />}
                <OpenTeacherList openTeacherList={openTeacherList} />
            </StyledFindTeacherContainer>
        </HomeLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const openTeacherList = await getOpenTeacherList();

    return { props: { openTeacherList } };
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
