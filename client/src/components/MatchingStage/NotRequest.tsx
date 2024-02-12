import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/commons/Modal';
import TutoringApplicationForm from '@/components/ TutoringApplicationForm';
import userSessionAtom from '@/recoil/atoms/userSession';
import { requestMatching } from '@/apis/chat/get-matching-status';
import chatSessionAtom from '@/recoil/atoms/chat';

const NotRequest = () => {
    const userSession = useRecoilValue(userSessionAtom);
    const chatSession = useRecoilValue(chatSessionAtom);
    const { open, openModal, closeModal } = useModal();

    const request = async (subjectId: number, hourlyRate: number) => {
        const data = await requestMatching({
            chatRoomId: chatSession.chatRoomId as number,
            subjectId: subjectId,
            hourlyRate: hourlyRate,
        });
        if (data) {
            alert('과외 신청을 성공적으로 완료했어요:)');
            closeModal();
        } else {
            alert('과외 신청에 실패했어요.');
        }
    };

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
                <TutoringApplicationForm
                    request={(data) => request(data.subjectId, data.hourlyRate)}
                />
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
    height: 52px;
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
