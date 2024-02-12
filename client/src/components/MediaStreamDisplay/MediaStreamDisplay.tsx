import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface VideoProps {
    stream: MediaStream | null;
    nickname: string;
}

const MediaStreamDisplay = ({ stream, nickname }: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current || !stream) return;
        videoRef.current.srcObject = stream;
        // videoRef.current.ontimeupdate = (e) => {};
        // videoRef.current.onloadedmetadata = () => {
        //     console.log('Video metadata loaded:');
        // };
    }, [stream]);

    return (
        <StyledMediaStreamDisplay>
            <Video ref={videoRef} autoPlay playsInline muted={true} />
            <NickName>
                <span>{nickname}</span>
            </NickName>
        </StyledMediaStreamDisplay>
    );
};

const StyledMediaStreamDisplay = styled.div`
    position: relative;
    width: 220px;
    height: 220px;
    /* margin-bottom: 15px; */
    border-radius: 0.7em;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.7em;
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg); /* Safari and Chrome */
    -moz-transform: rotateY(180deg); /* Firefox */
`;

const NickName = styled.div`
    position: absolute;
    bottom: 5px;
    right: 5px;

    padding: 8px 15px;
    border-radius: 8px;

    color: white;
    font-size: 13px;
    font-weight: 600;
    background: rgb(104 104 104 / 40%);
`;

export default MediaStreamDisplay;
