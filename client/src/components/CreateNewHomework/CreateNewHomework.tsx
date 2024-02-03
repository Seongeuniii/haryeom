import styled from 'styled-components';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/commons/Modal';
import { ChangeEvent, useState } from 'react';
import { registHomework } from '@/apis/homework/regist-homework';
import InputForm from '@/components/commons/InputForm';
import { ITutoringTextbook } from '@/apis/tutoring/tutoring';
import Link from 'next/link';

export interface INewHomework {
    [key: string]: string | number;
    textbookId: number;
    deadline: string;
    startPage: number;
    endPage: number;
}

interface CreateNewHomeworkProps {
    tutoringTextbooks: ITutoringTextbook[];
}

const CreateNewHomework = ({ tutoringTextbooks }: CreateNewHomeworkProps) => {
    const { open, openModal, closeModal } = useModal();
    const [homeworkData, setHomeworkData] = useState<INewHomework>({
        textbookId: 0,
        deadline: '',
        startPage: 0,
        endPage: 0,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValue = typeof homeworkData[name] === 'number' ? parseInt(value, 10) : value;
        const newHomeworkData = { ...homeworkData, [name]: newValue };
        setHomeworkData(newHomeworkData);
    };

    const registForm = async () => {
        const data = await registHomework(homeworkData);
        if (data) closeModal();
        else alert('등록에 실패했어요:)');
    };

    console.log(tutoringTextbooks);

    return (
        <>
            <Modal open={open} closeModal={closeModal}>
                <StyledCreateNewHomeworkForm>
                    <CreateNewHomeworkFormHeader>학생 숙제 등록</CreateNewHomeworkFormHeader>
                    {!tutoringTextbooks ? (
                        <NoContents>
                            <span>학습자료가 없어요.</span>
                            <Link href="/mycontents">학습자료 등록하러 가기</Link>
                        </NoContents>
                    ) : (
                        <>
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
                        </>
                    )}
                </StyledCreateNewHomeworkForm>
            </Modal>
            <StyledCreateNewHomework>
                <OpenModalButton onClick={openModal}>+</OpenModalButton>
            </StyledCreateNewHomework>
        </>
    );
};

const StyledCreateNewHomework = styled.div`
    bottom: 1.5em;
    left: 0;
    text-align: center;
`;

const StyledCreateNewHomeworkForm = styled.div`
    min-width: 500px;
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

const NoContents = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    font-size: 14px;

    a {
        text-decoration: underline;
        color: ${({ theme }) => theme.PRIMARY};
        font-size: 16px;
    }
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

const OpenModalButton = styled.button`
    width: 25px;
    height: 25px;
    font-size: 24px;
    border-radius: 100%;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    background-color: ${({ theme }) => theme.LIGHT_BLACK};
    color: white;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
        color: white;
    }
`;

export default CreateNewHomework;
