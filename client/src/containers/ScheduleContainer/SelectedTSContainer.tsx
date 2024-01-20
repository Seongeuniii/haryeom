import styled from 'styled-components';
import HomeworkList from '@/components/HomeworkList';
import HomeworkProgress from '@/components/HomeworkProgress';

const SelectedTSContainer = () => {
    return (
        <StyledSelectedTSContainer>
            <div style={{ height: '50%' }}>
                <SelectTS>수학 (김성은 선생님)</SelectTS>
                <HomeworkProgress />
            </div>
            <HomeworkList />
        </StyledSelectedTSContainer>
    );
};

const StyledSelectedTSContainer = styled.main`
    width: 67%;
    height: 90%;
    background-color: ${({ theme }) => theme.WHITE};
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
    padding: 1.8em;
`;

const SelectTS = styled.div`
    font-size: 1.3em;
    font-weight: 600;
    color: ${({ theme }) => theme.DARK_BLACK};
    padding: 1em 0.6em;
`;

export default SelectedTSContainer;
