import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';

const GetResponse = () => {
    const userSession = useRecoilValue(userSessionAtom);

    return (
        <>
            <StyledWaitResponse>
                <ResponseMessageHeader>
                    {userSession?.role === 'TEACHER'
                        ? '매칭된 학생입니다.'
                        : '매칭된 선생님입니다.'}
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
`;

export default GetResponse;
