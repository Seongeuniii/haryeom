import { useEffect, useRef, useState } from 'react';
import useMediaRecord from './useMediaRecord';
import { endTutoring, startTutoring } from '@/apis/tutoring/progress-tutoring';
import usePeerPaint from '@/components/PaintCanvas/hooks/usePeerPaint';
import { getTextbookDetail } from '@/apis/tutoring/get-textbook-detail';
import { IHomework, ITextbook } from '@/apis/homework/homework';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import { getHomework } from '@/apis/homework/get-homework';

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
}

const useClass = ({ dataChannels }: IUseClass) => {
    const userSession = useRecoilValue(userSessionAtom);

    const [myAction, setMyAction] = useState<IClassAction>({
        content: '빈페이지',
        penStyle: {
            isPen: true,
            strokeStyle: 'black',
            lineWidth: 3,
        },
    });

    const [peerAction, setPeerAction] = useState<IClassAction>({
        content: '빈페이지',
        penStyle: {
            isPen: true,
            strokeStyle: 'black',
            lineWidth: 3,
        },
    });

    const [textbook, setTextbook] = useState<ITextbook>();
    const [homework, setHomework] = useState<IHomework>();

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
    const loadTextbook = async (textbookId: number) => {
        const textbook = await getTextbookDetail(textbookId);
        setTextbook(textbook);
    };
    const loadHomework = async (homeworkId: number) => {
        const homework = await getHomework(homeworkId);
        setHomework(homework);
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
                if (myAction[name]) {
                    channel.send(
                        JSON.stringify({
                            [name]: myAction[name],
                        })
                    );
                }
            } catch (e) {
                console.log('전송 실패');
            }
        });
    };

    const sendTextbook = () => {
        dataChannels?.map((channel: RTCDataChannel) => {
            try {
                if (textbook) {
                    channel.send(
                        JSON.stringify({
                            textbook,
                        })
                    );
                }
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
        if (userSession?.role === 'STUDENT') return;
        sendTextbook();
    }, [dataChannels, textbook]);

    useEffect(() => {
        dataChannels.map((channel: RTCDataChannel) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            channel.onmessage = (e: MessageEvent<any>) => {
                const {
                    type,
                    action,
                    offset,
                    penStyle,
                    content,
                    textbook: loadTextbook,
                } = JSON.parse(e.data);

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
                    console.log('peer가 pen을 변경했어요: ', penStyle);
                    setPeerAction((prev) => ({ ...prev, penStyle }));
                }

                if (content) {
                    console.log('peer가 content를 변경했어요: ', content);
                    setPeerAction((prev) => ({ ...prev, content }));
                }

                if (loadTextbook) {
                    console.log('peer가 textbook을 변경했어요: ', loadTextbook);
                    setTextbook(loadTextbook);
                }
            };
        });
    }, [dataChannels, peerAction, textbook]);

    return {
        myAction,
        peerAction,
        textbook,
        homework,
        whiteboardCanvasRef,
        myWhiteboardBackgroundImage,
        peerWhiteBoardBackgroundImage,
        peerWatchingSameScreen,
        changeContents,
        changePenStyle,
        loadTextbook,
        loadHomework,
        startClass,
        endClass,
    };
};

export default useClass;
