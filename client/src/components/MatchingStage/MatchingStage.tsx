import NotRequest from './NotRequest';
import WaitResponse from './WaitResponse';
import GetResponse from './GetResponse';
import styled from 'styled-components';
import { IRequestMatchingStatus, IResponseMatchingStatus } from '@/apis/chat/chat';

interface MatchingStage {
    requestStatus: IRequestMatchingStatus | undefined;
    responseStatus: IResponseMatchingStatus | undefined;
}

const MatchingStage = ({ requestStatus, responseStatus }: MatchingStage) => {
    // 깜빡이는 문제
    if (!requestStatus && !responseStatus) {
        return (
            <StyledMatchingRequest>
                <NotRequest />
            </StyledMatchingRequest>
        );
    }

    if (requestStatus && !responseStatus) {
        return (
            <StyledMatchingRequest>
                <WaitResponse requestStatus={requestStatus} />
            </StyledMatchingRequest>
        );
    }

    /**
     * response 여러개
     * 일단 시간 순으로 전체 띄우기
     * 차후에 변경
     *
     * >> 배열의 마지막 데이터만 거절일 수 있다.
     */
    if (!requestStatus && responseStatus) {
        return (
            <StyledMatchingRequest>
                <GetResponse lastResponseStatus={responseStatus} />
            </StyledMatchingRequest>
        );
    }
};

const StyledMatchingRequest = styled.div`
    width: 100%;
    flex: 0 0 auto;
    margin: 1em 0;
    border-radius: 0.4em;
    font-size: 14px;
    overflow: hidden;
`;

export default MatchingStage;
