import styled from 'styled-components';
import InputForm from '@/components/commons/InputForm';

const WriteCurriculum = () => {
    return (
        <WriteCurriculumForm>
            <Header>커리큘럼 작성</Header>
            {/* <WriteCurriculumCard>
                <InputForm
                    label={'2024. 1. 20 (금) 18:00 ~ 20:00'}
                    name={''}
                    handleChange={() => {}}
                />
                <DeleteButton>-</DeleteButton>
            </WriteCurriculumCard>
            <WriteCurriculumCard>
                <InputForm
                    label={'2024. 1. 20 (금) 18:00 ~ 20:00'}
                    name={''}
                    handleChange={() => {}}
                />
                <DeleteButton>-</DeleteButton>
            </WriteCurriculumCard>
            <WriteCurriculumCard>
                <InputForm
                    label={'2024. 1. 20 (금) 18:00 ~ 20:00'}
                    name={''}
                    handleChange={() => {}}
                />
                <DeleteButton>-</DeleteButton>
            </WriteCurriculumCard>
            <WriteCurriculumCard>
                <InputForm
                    label={'2024. 1. 20 (금) 18:00 ~ 20:00'}
                    name={''}
                    handleChange={() => {}}
                />
                <DeleteButton>-</DeleteButton>
            </WriteCurriculumCard> */}
            <HelpMessage>- 날짜를 선택하여 커리큘럼을 추가하세요 -</HelpMessage>
        </WriteCurriculumForm>
    );
};

const Header = styled.div`
    width: 100%;
    padding: 0.3em;
    margin-bottom: 0.5em;
    font-size: 1.1em;
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const HelpMessage = styled.span`
    width: 100%;
    display: block;
    text-align: center;
    font-size: 0.7em;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    margin-top: 1em;
`;

const WriteCurriculumForm = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* gap: 1em; */
`;

const WriteCurriculumCard = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 1em;
`;

const DeleteButton = styled.button`
    width: 22px;
    height: 20px;
    border: 1px solid ${({ theme }) => theme.LIGHT_BLACK};
    border-radius: 100%;
`;

export default WriteCurriculum;
