import styled from 'styled-components';
import InputForm from '../commons/InputForm';
import { ChangeEvent } from 'react';

interface CreateNewHomeworkFormProps {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    registForm: () => void;
}

const CreateNewHomeworkForm = ({ handleChange, registForm }: CreateNewHomeworkFormProps) => {
    return (
        <StyledCreateNewHomeworkForm>
            <CreateNewHomeworkFormHeader>학생 숙제 등록</CreateNewHomeworkFormHeader>
            <InputForm
                label={'마감일자'}
                name={'deadline'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputForm
                label={'학습자료 선택'}
                name={'textbookId'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputForm
                label={'시작페이지'}
                name={'startPage'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputForm
                label={'끝페이지'}
                name={'endPage'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <SubmitButton onClick={registForm}>등록</SubmitButton>
        </StyledCreateNewHomeworkForm>
    );
};

const StyledCreateNewHomeworkForm = styled.div`
    min-width: 500px;
    min-height: 30vh;
    padding: 2em;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 1em;
    text-align: start;
    border-radius: 1em;
`;

const CreateNewHomeworkFormHeader = styled.div`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.8em;
`;

const SubmitButton = styled.button`
    width: 100%;
    height: 35px;
    margin-top: 1em;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    color: white;
    border-radius: 0.5em;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export default CreateNewHomeworkForm;
