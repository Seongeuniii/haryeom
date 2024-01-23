import styled from 'styled-components';
import HomeLayout from '@/components/layouts/HomeLayout';
import FilterOpenTeacherList from '@/components/FilterOpenTeacherList';
import OpenTeacherList from '@/components/OpenTeacherList';

const FindTeacherContainer = () => {
    return (
        <HomeLayout>
            <StyledFindTeacherContainer>
                <FindTeacherContainerHeader>
                    <Title>선생님 찾기</Title>
                    <SubTitle>원하는 선생님을 찾아 과외를 신청해보세요.</SubTitle>
                </FindTeacherContainerHeader>
                <FilterOpenTeacherList />
                <OpenTeacherList />
            </StyledFindTeacherContainer>
        </HomeLayout>
    );
};

const StyledFindTeacherContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.7em 0 0.7em;
`;

const FindTeacherContainerHeader = styled.header`
    position: fixed;
    width: 100%;
    height: 8.3em;
    padding-bottom: 1em;
    display: flex;
    flex-direction: column;
    justify-content: end;
    background-color: white;
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
