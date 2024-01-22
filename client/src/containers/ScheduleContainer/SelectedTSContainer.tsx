import styled from 'styled-components';
import HomeworkList from '@/components/HomeworkList';
import HomeworkProgress from '@/components/HomeworkProgress';

const SelectedTSContainer = () => {
    return (
        <StyledSelectedTSContainer>
            <div style={{ height: '50%', display: 'flex' }}>
                <div>
                    <SelectTS>수학 (김성은 선생님)</SelectTS>
                    <HomeworkProgress />
                </div>
                <div>학습자료</div>
                <div>커리큘럼</div>
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
    font-size: 1.2em;
    font-weight: 600;
    color: ${({ theme }) => theme.DARK_BLACK};
    padding: 0.3em 0.6em 1.2em 0.5em;
`;

export default SelectedTSContainer;
