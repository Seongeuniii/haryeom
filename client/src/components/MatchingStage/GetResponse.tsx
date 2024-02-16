import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import { IResponseMatchingStatus } from '@/apis/chat/chat';
import { IUserRole } from '@/apis/user/user';

interface GetResponseProps {
    lastResponseStatus: IResponseMatchingStatus;
}

export const gerRole = (role: IUserRole) => {
    if (role === 'TEACHER') return '학생';
    else return '선생님';
};
const getName = (role: IUserRole, lastResponseStatus: IResponseMatchingStatus) => {
    if (role === 'TEACHER') return lastResponseStatus?.studentName;
    else return lastResponseStatus?.teacherName;
};

const GetResponse = ({ lastResponseStatus }: GetResponseProps) => {
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return;

    return (
        <StyledWaitResponse>
            <ResponseMessageHeader>
                {lastResponseStatus?.isAccepted ? (
                    <div>
                        {getName(userSession.role, lastResponseStatus)} {gerRole(userSession.role)}
                        과 과외를 진행중입니다.
                    </div>
                ) : (
                    <div>
                        {userSession.role === 'TEACHER'
                            ? '과외 신청을 거절했어요.'
                            : '과외 신청이 거절되었어요.'}
                    </div>
                )}
                <ResponseMessage>
                    <TutoringSubject>과목: {lastResponseStatus?.subject?.name}</TutoringSubject>
                    <TutoringFee>수강료: {lastResponseStatus?.hourlyRate}원</TutoringFee>
                </ResponseMessage>
            </ResponseMessageHeader>
        </StyledWaitResponse>
    );
};

const StyledWaitResponse = styled.div`
    padding: 0.9em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.PRIMARY};
`;

const ResponseMessageHeader = styled.span`
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
`;

const ResponseMessage = styled.div`
    display: flex;
    gap: 1em;
    padding-top: 0.5em;
`;

const TutoringSubject = styled.div``;

const TutoringFee = styled.div``;

export default GetResponse;
