import React, { useEffect } from 'react';
import styled from 'styled-components';

import MediaStreamDisplay from '@/components/MediaStreamDisplay';

interface MediaStreamContainerProps {
    myStream: MediaStream | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    peerStream: any[] | undefined;
}

const MediaStreamContainer = ({ myStream, peerStream }: MediaStreamContainerProps) => {
    return (
        <StyledMediaStreamContainer>
            <MediaStreamDisplay stream={myStream} nickname={'김성은'} />
            {peerStream?.length ? (
                peerStream?.map((data, idx) => (
                    <MediaStreamDisplay stream={data.stream} key={idx} nickname={data.socketId} />
                ))
            ) : (
                <MediaStreamDisplay stream={null} nickname="선생님 대기중" />
            )}
        </StyledMediaStreamContainer>
    );
};

const StyledMediaStreamContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export default MediaStreamContainer;
