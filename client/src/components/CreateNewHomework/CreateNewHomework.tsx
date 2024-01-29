import styled from 'styled-components';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/commons/Modal';
import CreateNewHomeworkForm from './CreateNewHomeworkForm';
import { ChangeEvent, useState } from 'react';
import { registHomework } from '@/apis/homework/regist-homework';

export interface INewHomework {
    [key: string]: string | number;
    textbookId: number;
    deadline: string;
    startPage: number;
    endPage: number;
}

const CreateNewHomework = () => {
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

    return (
        <>
            <Modal open={open} closeModal={closeModal}>
                <CreateNewHomeworkForm handleChange={handleChange} registForm={registForm} />
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
