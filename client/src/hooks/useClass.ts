import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import useMediaRecord from './useMediaRecord';
import { endTutoring, startTutoring } from '@/apis/tutoring/progress-tutoring';
import usePeerPaint from '@/components/PaintCanvas/hooks/usePeerPaint';
import { getTextbookDetail } from '@/apis/tutoring/get-textbook-detail';
import { IHomework, ITextbook } from '@/apis/homework/homework';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import { getHomework } from '@/apis/homework/get-homework';
import { ICanvasSize, saveDrawing } from '@/utils/canvas';
import { saveTutoringvideo } from '@/apis/tutoring/save-tutoring-video';
import useClassTimer from './useClassTimer';

export type ContentsType = '빈페이지' | '학습자료' | '숙제';
export interface IPenStyle {
    isPen: boolean;
    strokeStyle: string;
    lineWidth: number;
}

interface IUseClass {
    tutoringScheduleId: number;
    dataChannels: RTCDataChannel[];
}

interface IClassAction {
    content: ContentsType;
    penStyle: IPenStyle;
}

const useClass = ({ tutoringScheduleId, dataChannels }: IUseClass) => {
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
    const [whiteboardCanvasBackgroundImage, setWhiteboardCanvasBackgroundImage] = useState<
        Blob | string
    >();

    const textbookCanvasRef = useRef<HTMLCanvasElement>(null);
    const [textbookCanvasBackgroundImage, setTextbookCanvasBackgroundImage] = useState<
        Blob | string
    >();

    const { handlePointerDown, handlePointerMove, handlePointerUp } = usePeerPaint({
        canvasRef: peerAction.content === '빈페이지' ? whiteboardCanvasRef : textbookCanvasRef,
        backgroundImage:
            peerAction.content === '빈페이지'
                ? whiteboardCanvasBackgroundImage
                : textbookCanvasBackgroundImage,
        penStyle: peerAction.penStyle,
    });

    const [peerWatchingSameScreen, setPeerWatchingSameScreen] = useState<boolean>(true);

    /**
     * 수업 컨텐츠
     */

    // 캔버스 저장
    const cleanUpCanvas = (
        canvasRef: RefObject<HTMLCanvasElement>,
        setState: Dispatch<SetStateAction<string | Blob | undefined>>
    ) => {
        if (canvasRef.current) {
            const drawingBlobData = saveDrawing({
                canvasRef,
                size: {
                    width: canvasRef.current.width,
                    height: canvasRef.current.height,
                },
            });
            setState(drawingBlobData);
        }
    };

    const changeContents = (value: ContentsType) => {
        // 1. 드로잉 데이터 저장
        if (myAction.content === '빈페이지') {
            if (whiteboardCanvasRef.current) {
                console.log('whiteboard 드로잉 저장');
                const drawingBlobData = saveDrawing({
                    canvasRef: whiteboardCanvasRef,
                    size: {
                        width: whiteboardCanvasRef.current.width,
                        height: whiteboardCanvasRef.current.height,
                    },
                });
                setWhiteboardCanvasBackgroundImage(drawingBlobData);
            }
        } else if (myAction.content === '학습자료') {
            if (textbookCanvasRef.current) {
                console.log('textbook 드로잉 저장');
                const drawingBlobData = saveDrawing({
                    canvasRef: textbookCanvasRef,
                    size: {
                        width: textbookCanvasRef.current.width,
                        height: textbookCanvasRef.current.height,
                    },
                });
                setTextbookCanvasBackgroundImage(drawingBlobData);
            }
        }
        // 2. 컨텐츠 변경
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
    const {
        recordedChunks,
        prepareRecording,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
    } = useMediaRecord();

    const startClass = async (): Promise<boolean> => {
        const isUserSelectDisplay = confirm('[필수] 녹화에 필요한 화면을 선택해주세요.');

        if (!isUserSelectDisplay) {
            alert('녹화 화면 선택 후 수업을 시작할 수 있어요:)');
            return false;
        }

        await prepareRecording();
        startRecording();
        await startTutoring(tutoringScheduleId); // api
        alert('[필수] 녹화가 시작되었어요.');
        return true;
    };
    const endClass = async (): Promise<boolean> => {
        const isEndingClass = confirm('수업을 종료하시겠습니까?');

        if (!isEndingClass) {
            return false;
        }

        stopRecording();
        startClass;
        await endTutoring(tutoringScheduleId); // api
        alert('수업이 종료되었어요.');
        return true;
    };

    const { startTimer, stopTimer, progressTime, classState, changeClassState } = useClassTimer({
        startClass,
        endClass,
    });

    // TODO : 리팩토링 - useMediaRecord 내부로
    useEffect(() => {
        if (!recordedChunks) return;
        saveTutoringvideo(tutoringScheduleId, recordedChunks);
    }, [recordedChunks]);

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

    const sendHomework = () => {
        dataChannels?.map((channel: RTCDataChannel) => {
            try {
                if (homework) {
                    channel.send(
                        JSON.stringify({
                            homework,
                        })
                    );
                }
            } catch (e) {
                console.log('전송 실패');
            }
        });
    };

    const sendClassState = (state: string) => {
        dataChannels?.map((channel: RTCDataChannel) => {
            try {
                if (state) {
                    channel.send(
                        JSON.stringify({
                            classState: state,
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
        if (userSession?.role === 'STUDENT') return;
        sendHomework();
    }, [dataChannels, homework]);

    useEffect(() => {
        if (userSession?.role === 'STUDENT') return;
        if (classState === '수업중') sendClassState('start');
        if (classState === '수업종료') sendClassState('stop');
    }, [dataChannels, classState]);

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
                    homework: loadHomework,
                    classState,
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

                if (loadHomework) {
                    console.log('peer가 homework를 변경했어요: ', loadHomework);
                    setHomework(loadHomework);
                }

                if (classState) {
                    console.log('peer가 classState를 변경했어요: ', classState);
                    if (classState === 'start') changeClassState('start');
                    if (classState === 'stop') changeClassState('stop');
                }
            };
        });
    }, [dataChannels, peerAction, textbook, homework, changeClassState]);

    return {
        myAction,
        peerAction,
        textbook,
        homework,
        whiteboardCanvasRef,
        whiteboardCanvasBackgroundImage,
        textbookCanvasRef,
        setTextbookCanvasBackgroundImage,
        textbookCanvasBackgroundImage,
        peerWatchingSameScreen,
        cleanUpCanvas,
        changeContents,
        changePenStyle,
        loadTextbook,
        loadHomework,
        startTimer,
        stopTimer,
        progressTime,
        classState,
        changeClassState,
    };
};

export default useClass;
