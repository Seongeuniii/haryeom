import { useEffect, useRef, useState } from 'react';
import useMediaRecord from './useMediaRecord';
import { endTutoring, startTutoring } from '@/apis/tutoring/progress-tutoring';
import usePeerPaint from '@/components/PaintCanvas/hooks/usePeerPaint';

export type ContentsType = '빈페이지' | '학습자료' | '숙제';
export interface IPenStyle {
    isPen: boolean;
    strokeStyle: string;
    lineWidth: number;
}

interface IUseClass {
    dataChannels: RTCDataChannel[];
}

interface IClassAction {
    content: ContentsType;
    penStyle: IPenStyle;
    textBookFile: string | undefined;
    textBookPage: number | undefined;
    homeworkFile: string | undefined;
    homeworkPage: number | undefined;
}

const useClass = ({ dataChannels }: IUseClass) => {
    const [myAction, setMyAction] = useState<IClassAction>({
        content: '빈페이지',
        penStyle: {
            isPen: true,
            strokeStyle: 'black',
            lineWidth: 3,
        },
        textBookFile: undefined,
        textBookPage: undefined,
        homeworkFile: undefined,
        homeworkPage: undefined,
    });

    const [peerAction, setPeerAction] = useState<IClassAction>({
        content: '빈페이지',
        penStyle: {
            isPen: true,
            strokeStyle: 'black',
            lineWidth: 3,
        },
        textBookFile: undefined,
        textBookPage: undefined,
        homeworkFile: undefined,
        homeworkPage: undefined,
    });

    /**
     * 화이트보드
     */
    const whiteboardCanvasRef = useRef<HTMLCanvasElement>(null);
    const [myWhiteboardBackgroundImage, setMyWhiteBoardBackgroundImage] = useState<Blob | string>();
    const [peerWhiteBoardBackgroundImage, setPeerWhiteBoard] = useState<Blob | string>();

    const { handlePointerDown, handlePointerMove, handlePointerUp } = usePeerPaint({
        canvasRef: whiteboardCanvasRef,
        backgroundImage: peerWhiteBoardBackgroundImage,
        penStyle: peerAction.penStyle,
    });

    const [peerWatchingSameScreen, setPeerWatchingSameScreen] = useState<boolean>(true);

    /**
     * 수업 컨텐츠
     */

    const changeContents = (value: ContentsType) => {
        setMyAction((prev) => ({ ...prev, content: value }));
    };
    const changePenStyle = (value: IPenStyle) => {
        setMyAction((prev) => ({ ...prev, penStyle: value }));
    };

    /**
     * 수업 녹화
     */
    const { startRecording, stopRecording, downloadRecording } = useMediaRecord();
    const startClass = async (tutoringScheduleId: number) => {
        alert('[필수] 녹화에 필요한 화면을 선택해주세요.');
        await startRecording();
        await startTutoring(tutoringScheduleId);
        alert('[필수] 녹화가 시작되었어요.');
    };
    const endClass = async (tutoringScheduleId: number) => {
        stopRecording();
        await endTutoring(tutoringScheduleId);
        alert('녹화가 종료되었어요. (녹화 전송 완료)');
    };

    const sendMyAction = (name: keyof IClassAction) => {
        dataChannels?.map((channel: RTCDataChannel) => {
            try {
                channel.send(
                    JSON.stringify({
                        [name]: myAction[name],
                    })
                );
            } catch (e) {
                console.log('전송 실패');
            }
        });
    };

    useEffect(() => {
        sendMyAction('content');
    }, [dataChannels, myAction.content]);

    useEffect(() => {
        sendMyAction('penStyle');
    }, [dataChannels, myAction.penStyle]);

    useEffect(() => {
        dataChannels.map((channel: RTCDataChannel) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            channel.onmessage = (e: MessageEvent<any>) => {
                const { type, action, offset, penStyle, content } = JSON.parse(e.data);

                if (action) {
                    switch (action) {
                        case 'down':
                            handlePointerDown(offset);
                            break;
                        case 'move':
                            requestAnimationFrame(() => handlePointerMove(offset));
                            break;
                        case 'up':
                            handlePointerUp();
                            break;
                    }
                }

                if (penStyle) {
                    setPeerAction((prev) => ({ ...prev, penStyle }));
                }

                if (content) {
                    console.log('peer가 content를 변경했어요: ', content);
                    setMyAction((prev) => ({ ...prev, content }));
                }
            };
        });
    }, [dataChannels, peerAction]);

    return {
        myAction,
        peerAction,
        whiteboardCanvasRef,
        myWhiteboardBackgroundImage,
        peerWhiteBoardBackgroundImage,
        peerWatchingSameScreen,
        changeContents,
        changePenStyle,
        startClass,
        endClass,
    };
};

export default useClass;
