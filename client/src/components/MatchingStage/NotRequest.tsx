import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/commons/Modal';
import TutoringApplicationForm from '@/components/ TutoringApplicationForm';
import userSessionAtom from '@/recoil/atoms/userSession';

const NotRequest = () => {
    const userSession = useRecoilValue(userSessionAtom);
    const { open, openModal, closeModal } = useModal();

    if (userSession?.role === 'TEACHER') {
        return (
            <StyledNotRequest>
                <NoRequestMessage>과외 요청 내역이 없어요</NoRequestMessage>
            </StyledNotRequest>
        );
    }
    return (
        <StyledNotRequest>
            <Modal open={open} closeModal={closeModal}>
                <TutoringApplicationForm />
            </Modal>
            <ApplyTutoringButton onClick={openModal}>과외 신청하기</ApplyTutoringButton>
        </StyledNotRequest>
    );
};

const StyledNotRequest = styled.div`
    padding: 0.9em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.PRIMARY};
`;

const ApplyTutoringButton = styled.button`
    color: ${({ theme }) => theme.WHITE};

    &:hover {
        text-decoration: underline;
    }
`;

const NoRequestMessage = styled.span`
    color: ${({ theme }) => theme.WHITE};
`;

export default NotRequest;
