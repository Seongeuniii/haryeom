import styled from 'styled-components';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/commons/Modal';
import CreateNewClassForm from './CreateNewClassForm';

const CreateNewClass = () => {
    const { open, openModal, closeModal } = useModal();

    return (
        <StyledCreateNewClass>
            <OpenModalButton onClick={openModal}>+</OpenModalButton>
            {open && (
                <Modal open={true} closeModal={closeModal}>
                    <CreateNewClassForm />
                </Modal>
            )}
        </StyledCreateNewClass>
    );
};

const StyledCreateNewClass = styled.div`
    width: 100%;
    text-align: center;
`;

const OpenModalButton = styled.button`
    width: 30px;
    height: 30px;
    margin-top: 8px;
    font-size: 24px;
    background-color: #f9f9f9;
    border-radius: 100%;
    color: ${({ theme }) => theme.LIGHT_BLACK};

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
        color: white;
    }
`;

export default CreateNewClass;
