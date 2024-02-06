import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import { IResponseMatchingStatus } from '@/apis/chat/chat';

interface GetResponseProps {
    lastResponseStatus: IResponseMatchingStatus;
}

const GetResponse = ({ lastResponseStatus }: GetResponseProps) => {
    const userSession = useRecoilValue(userSessionAtom);

    return (
        <>
            <StyledWaitResponse>
                <ResponseMessageHeader>
                    {lastResponseStatus?.teacherName}과 {lastResponseStatus?.studentName}의 시급{' '}
                    {lastResponseStatus?.hourlyRate}원 {lastResponseStatus.subject.name} 과외가
                    {lastResponseStatus?.isAccepted == true ? ' 진행중입니다.' : ' 거절되었습니다.'}
                    {/* {userSession?.role === 'TEACHER'
                        ? '매칭된 학생입니다.'
                        : '매칭된 선생님입니다.'} */}
                </ResponseMessageHeader>
            </StyledWaitResponse>
        </>
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
    padding: 0.5em 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
`;

export default GetResponse;
