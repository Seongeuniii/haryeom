import React, { useEffect } from 'react';
import styled from 'styled-components';

import MediaStreamDisplay from '@/components/MediaStreamDisplay';

interface MediaStreamContainerProps {
    myStream: MediaStream | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    peerStream: any[] | undefined;
}

const MediaStreamContainer = ({ myStream, peerStream }: MediaStreamContainerProps) => {
    useEffect(() => {
        console.log(peerStream);
    }, [peerStream]);

    return (
        <StyledMediaStreamContainer>
            <MediaStreamDisplaySection>
                <MediaStreamDisplay stream={myStream} nickname={'김성은'} />
                {peerStream?.map((data, idx) => (
                    <MediaStreamDisplay stream={data.stream} key={idx} nickname={data.socketId} />
                ))}
            </MediaStreamDisplaySection>
        </StyledMediaStreamContainer>
    );
};

const StyledMediaStreamContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const MediaStreamDisplaySection = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default MediaStreamContainer;
