import React, { useEffect } from 'react';
import styled from 'styled-components';

import MediaStreamDisplay from '@/components/molecules/UserMediaStream';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';

interface MediaStreamProps {
    myStream: MediaStream | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    peerStream: any[] | undefined;
}

const MediaStream = ({ myStream, peerStream }: MediaStreamProps) => {
    const userSession = useRecoilValue(userSessionAtom);

    return (
        <StyledMediaStream>
            <MediaStreamDisplay
                stream={myStream}
                nickname={userSession?.name as string}
                muted={true}
            />
            {peerStream?.length ? (
                peerStream?.map((data, idx) => (
                    <MediaStreamDisplay
                        stream={data.stream}
                        key={idx}
                        nickname={data.memberName}
                        muted={false}
                    />
                ))
            ) : (
                <MediaStreamDisplay stream={null} nickname="대기중" muted={true} />
            )}
        </StyledMediaStream>
    );
};

const StyledMediaStream = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 10px;
`;

export default MediaStream;
