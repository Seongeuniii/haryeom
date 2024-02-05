import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import MediaStream from './MediaStream';
import useStream from '@/hooks/useStream';
import useWebRTCStomp from '@/hooks/useWebRTC';
import HomeworkLayout from '@/components/layouts/HomeworkLayout';

const ClassContainer = () => {
    const [myStream] = useStream();

    const router = useRouter(); // test용
    const { peerStream, peerConnections, dataChannels } = useWebRTCStomp({
        memberId: parseInt(router.query.id as string),
        myStream,
    });

    return (
        <HomeworkLayout>
            <StyledClassContainer>
                <LeftSection>
                    <MediaStream myStream={myStream} peerStream={peerStream} />
                </LeftSection>
            </StyledClassContainer>
        </HomeworkLayout>
    );
};

const StyledClassContainer = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
`;

const LeftSection = styled.div`
    min-width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const TimeStamp = styled.div`
    width: 100%;
    height: 150px;
    background-color: yellow;
`;

export default ClassContainer;
