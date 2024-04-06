import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import UserMediaStream from '@/components/molecules/UserMediaStream';
import { IUser } from '@/apis/user/user';

interface MediaStreamListProps {
    myStream: MediaStream | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    peerStream: any[];
}

const MediaStreamList = ({ myStream, peerStream }: MediaStreamListProps) => {
    const userSession = useRecoilValue(userSessionAtom) as IUser;

    return (
        <StyledMediaStream>
            <UserMediaStream stream={myStream} nickname={userSession.name} muted={true} />
            {peerStream.length ? (
                peerStream.map((data, idx) => (
                    <UserMediaStream
                        key={idx}
                        stream={data.stream}
                        nickname={data.memberName}
                        muted={false}
                    />
                ))
            ) : (
                <UserMediaStream stream={null} nickname="대기중" muted={true} />
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

export default MediaStreamList;
