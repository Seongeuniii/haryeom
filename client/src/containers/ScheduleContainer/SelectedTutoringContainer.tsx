import styled from 'styled-components';
import HomeworkList from '@/components/HomeworkList';
import { IHomework } from '@/apis/homework/homework';
import TutoringStudentProfile from '@/components/TutoringStudentProfile';

interface SelectedTutoringContainerProps {
    homeworkList: IHomework[] | undefined;
}

const SelectedTutoringContainer = ({ homeworkList }: SelectedTutoringContainerProps) => {
    return (
        <StyledSelectedTutoringContainer>
            <TutoringStudentProfile />
            <HomeworkList />
        </StyledSelectedTutoringContainer>
    );
};

const StyledSelectedTutoringContainer = styled.main`
    width: 67%;
    height: 93%;
    display: flex;
    flex-direction: column;
`;

export default SelectedTutoringContainer;
