import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface VideoProps {
    stream: MediaStream | null;
    nickname: string;
    muted: boolean;
}

const MediaStreamDisplay = ({ stream, nickname, muted }: VideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!stream) return;
        if (videoRef.current) videoRef.current.srcObject = stream;
        if (audioRef.current) {
            const audioTrack = stream.getAudioTracks()[0];
            const audioStream = new MediaStream([audioTrack]);
            audioRef.current.srcObject = audioStream;
        }
    }, [stream]);

    return (
        <StyledMediaStreamDisplay>
            <Video ref={videoRef} autoPlay playsInline />
            <Audio ref={audioRef} autoPlay playsInline muted={muted} />
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
    border-radius: 0.7em;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.7em;
`;

const Audio = styled.audio`
    display: none;
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
