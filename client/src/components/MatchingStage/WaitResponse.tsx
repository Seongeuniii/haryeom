import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import { responseMatching } from '@/apis/chat/get-matching-status';

const WaitResponse = () => {
    const userSession = useRecoilValue(userSessionAtom);

    return (
        <>
            <StyledWaitResponse>
                <RequestMessageHeader>
                    김성은 {userSession?.role === 'TEACHER' ? '학생' : '선생님'}이 과외를
                    신청했어요.
                </RequestMessageHeader>
                <RequestMessage>
                    <TutoringSubject>과목: 수학</TutoringSubject>
                    <TutoringFee>수강료: 30000원</TutoringFee>
                </RequestMessage>
            </StyledWaitResponse>
            {userSession?.role === 'TEACHER' && (
                <ResponseButtons>
                    <ResponseButton
                        onClick={async () => {
                            await responseMatching({
                                matchingId: '3d45ca10-d292-4563-a973-e2b47c36222a',
                                isAccepted: true,
                            });
                        }}
                    >
                        수락
                    </ResponseButton>
                    <ResponseButton
                        onClick={async () => {
                            await responseMatching({
                                matchingId: 'd47bd6cf-35db-4fa0-a0a9-f89100fed257',
                                isAccepted: false,
                            });
                        }}
                    >
                        거절
                    </ResponseButton>
                </ResponseButtons>
            )}
        </>
    );
};

const StyledWaitResponse = styled.div`
    padding: 1.5em 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
`;

const RequestMessageHeader = styled.span`
    margin-bottom: 10px;
`;

const RequestMessage = styled.div`
    display: flex;
    gap: 1em;
`;

const TutoringSubject = styled.div``;

const TutoringFee = styled.div``;

const ResponseButtons = styled.div`
    width: 100%;
    padding: 1em 0;
    display: flex;
    align-items: center;
    border-radius: 0 0 0.4em 0.4em;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.PRIMARY};
`;

const ResponseButton = styled.button`
    width: 100%;
    border-right: 1px solid ${({ theme }) => theme.PRIMARY};

    &:last-child {
        border-right: none;
    }

    &:hover {
        text-decoration: underline;
    }
`;

export default WaitResponse;
