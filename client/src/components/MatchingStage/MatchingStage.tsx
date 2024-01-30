import { IRequestMatchingStatus, IResponseMatchingStatus } from '@/apis/matching/matching';
import NotRequest from './NotRequest';
import WaitResponse from './WaitResponse';
import GetResponse from './GetResponse';
import styled from 'styled-components';

interface MatchingStage {
    requestStatus: IRequestMatchingStatus | undefined;
    responseStatus: IResponseMatchingStatus | undefined;
}

const MatchingStage = ({ requestStatus, responseStatus }: MatchingStage) => {
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
                <WaitResponse />
            </StyledMatchingRequest>
        );
    }

    /**
     * response 여러개
     * 일단 시간 순으로 전체 띄우기
     * 차후에 변경
     */
    if (!requestStatus && responseStatus) {
        return (
            <StyledMatchingRequest>
                <GetResponse />
            </StyledMatchingRequest>
        );
    }
};

const StyledMatchingRequest = styled.div`
    width: 100%;
    font-size: 14px;
    margin: 1em 0;
    border-radius: 0.4em;
    overflow: hidden;
`;

export default MatchingStage;
