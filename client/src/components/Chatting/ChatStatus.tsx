import { useModal } from '@/hooks/useModal';
import styled from 'styled-components';
import Modal from '@/components/commons/Modal';
import TutoringApplicationForm from '../ TutoringApplicationForm';

interface ChatStatusProps {
    chatRoomId: number;
}

const ChatStatus = ({ chatRoomId }: ChatStatusProps) => {
    const { open, openModal, closeModal } = useModal();

    return (
        <StyledChatStatus>
            {open && (
                <Modal open={open} closeModal={closeModal}>
                    <TutoringApplicationForm />
                </Modal>
            )}
            <ApplyTutoring onClick={openModal}>과외 신청하기</ApplyTutoring>
        </StyledChatStatus>
    );
};

const StyledChatStatus = styled.div`
    width: 100%;
    height: 40px;
    font-size: 14px;
    margin-top: 10px;
    background-color: ${({ theme }) => theme.PRIMARY};
    border-radius: 0.4em;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ApplyTutoring = styled.button`
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.WHITE};
`;

export default ChatStatus;
