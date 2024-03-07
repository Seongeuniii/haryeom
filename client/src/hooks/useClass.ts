import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import useMediaRecord from './useMediaRecord';
import { endTutoring, startTutoring } from '@/apis/tutoring/progress-tutoring';
import usePeerPaint from '@/components/PaintCanvas/hooks/usePeerPaint';
import { getTextbookDetail } from '@/apis/tutoring/get-textbook-detail';
import { IHomework, ITextbook } from '@/apis/homework/homework';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import { getHomework } from '@/apis/homework/get-homework';
import { saveDrawing } from '@/utils/canvas';
import { saveTutoringvideo } from '@/apis/tutoring/save-tutoring-video';
import useClassTimer from './useClassTimer';
import useMyPaint from '@/components/PaintCanvas/hooks/useMyPaint';
import { IMyHomeworkDrawings } from '@/containers/HomeworkContainer/HomeworkContainer';
import useCanvas from '@/components/PaintCanvas/hooks/useCanvas';

export type ContentsType = '화이트보드' | '학습자료' | '숙제';
export interface IPenStyle {
    isPen: boolean;
    strokeStyle: string;
    lineWidth: number;
}

interface IClassAction {
    content: ContentsType;
    pageNumber: number;
    penStyle: IPenStyle;
}

interface IUseClass {
    tutoringScheduleId: number;
    dataChannels: RTCDataChannel[];
    selectedPageNumber: number;
}

const useClass = ({ tutoringScheduleId, dataChannels, selectedPageNumber }: IUseClass) => {
    const userSession = useRecoilValue(userSessionAtom);

    const [myAction, setMyAction] = useState<IClassAction>({
        content: '화이트보드',
        pageNumber: 1,
        penStyle: {
            isPen: true,
            strokeStyle: 'black',
            lineWidth: 3,
        },
    });

    const [peerAction, setPeerAction] = useState<IClassAction>({
        content: '화이트보드',
        pageNumber: 1,
        penStyle: {
            isPen: true,
            strokeStyle: 'black',
            lineWidth: 3,
        },
    });

    useEffect(() => {
        setMyAction((prev) => ({ ...prev, pageNumber: selectedPageNumber }));
    }, [selectedPageNumber, setMyAction]);

    const [textbook, setTextbook] = useState<ITextbook>();
    const [homework, setHomework] = useState<IHomework>();

    const [homeworkDrawings, setHomeworkDrawings] = useState<IMyHomeworkDrawings>();

    useEffect(() => {
        if (!homework) return;
        setHomeworkDrawings(
            homework.drawings.reduce((acc, { page, homeworkDrawingUrl }) => {
                acc[page] = homeworkDrawingUrl;
                return acc;
            }, {} as IMyHomeworkDrawings)
        );
    }, [homework, setHomeworkDrawings]);

    /**
     * 화이트보드
     */
    // TODO : canvasRef를 여러개 할 필요가,,, background만 바꿔주면 됨
    const myWhiteboardCanvasRef = useRef<HTMLCanvasElement>(null);
    const [myWhiteboardCanvasBackgroundImage, setMyWhiteboardCanvasBackgroundImage] = useState<
        Blob | string
    >();
    const peerWhiteboardCanvasRef = useRef<HTMLCanvasElement>(null);
    const [peerWhiteboardCanvasBackgroundImage, setPeerWhiteboardCanvasBackgroundImage] = useState<
        Blob | string
    >();
    const myTextbookCanvasRef = useRef<HTMLCanvasElement>(null);
    const [myTextbookCanvasBackgroundImage, setMyTextbookCanvasBackgroundImage] = useState<
        Blob | string
    >();
    const peerTextbookCanvasRef = useRef<HTMLCanvasElement>(null);
    const [peerTextbookCanvasBackgroundImage, setPeerTextbookCanvasBackgroundImage] = useState<
        Blob | string
    >();
    const myHomeworkCanvasRef = useRef<HTMLCanvasElement>(null);
    const [myHomeworkCanvasBackgroundImage, setMyHomeworkCanvasBackgroundImage] = useState<
        Blob | string
    >();
    const peerHomeworkCanvasRef = useRef<HTMLCanvasElement>(null);
    const [peerHomeworkCanvasBackgroundImage, setPeerHomeworkCanvasBackgroundImage] = useState<
        Blob | string
    >();

    // const [selectedMyCanvasRef, setSelectedMyCanvasRef] =
    //     useState<RefObject<HTMLCanvasElement>>(myWhiteboardCanvasRef);
    // const [selectedMyCanvasBackgroundImage, setSelectedMyCanvasBackgroundImage] = useState<
    //     string | Blob | undefined
    // >(myWhiteboardCanvasBackgroundImage);
    // const [selectedPeerCanvasRef, setSelectedPeerCanvasRef] =
    //     useState<RefObject<HTMLCanvasElement>>(peerWhiteboardCanvasRef);
    // const [selectedPeerCanvasBackgroundImage, setSelectedPeerCanvasBackgroundImage] = useState<
    //     string | Blob | undefined
    // >(peerWhiteboardCanvasBackgroundImage);

    // useEffect(() => {
    //     switch (myAction.content) {
    //         case '화이트보드':
    //             setSelectedMyCanvasRef(myWhiteboardCanvasRef);
    //             setSelectedMyCanvasBackgroundImage(myWhiteboardCanvasBackgroundImage);
    //             setSelectedPeerCanvasRef(peerWhiteboardCanvasRef);
    //             setSelectedPeerCanvasBackgroundImage(peerWhiteboardCanvasBackgroundImage);
    //             break;
    //         case '학습자료':
    //             setSelectedMyCanvasRef(myTextbookCanvasRef);
    //             setSelectedMyCanvasBackgroundImage(myTextbookCanvasBackgroundImage);
    //             setSelectedPeerCanvasRef(peerTextbookCanvasRef);
    //             setSelectedPeerCanvasBackgroundImage(peerTextbookCanvasBackgroundImage);
    //             break;
    //         case '숙제':
    //             setSelectedMyCanvasRef(myHomeworkCanvasRef);
    //             setSelectedMyCanvasBackgroundImage(myHomeworkCanvasBackgroundImage);
    //             setSelectedPeerCanvasRef(peerHomeworkCanvasRef);
    //             setSelectedPeerCanvasBackgroundImage(peerHomeworkCanvasBackgroundImage);
    //             break;
    //     }
    // }, [myAction.content, selectedPeerCanvasRef, selectedPeerCanvasBackgroundImage]);

    const {
        handlePointerDown: handlePeerPointerDown,
        handlePointerMove: handlePeerPointerMove,
        handlePointerUp: handlePeerPointerUp,
        erase: erasePeerPaint,
        resetCanvas: resetPeerCanvas,
    } = usePeerPaint({
        canvasRef:
            myAction.content === '화이트보드'
                ? peerWhiteboardCanvasRef
                : myAction.content === '학습자료'
                  ? peerTextbookCanvasRef
                  : peerHomeworkCanvasRef,
        backgroundImage:
            myAction.content === '화이트보드'
                ? peerWhiteboardCanvasBackgroundImage
                : myAction.content === '학습자료'
                  ? peerTextbookCanvasBackgroundImage
                  : peerHomeworkCanvasBackgroundImage,
        penStyle: peerAction.penStyle,
    });

    const { contextRef } = useCanvas({
        canvasRef:
            myAction.content === '화이트보드'
                ? myWhiteboardCanvasRef
                : myAction.content === '학습자료'
                  ? myTextbookCanvasRef
                  : myHomeworkCanvasRef,
        backgroundImage:
            myAction.content === '화이트보드'
                ? myWhiteboardCanvasBackgroundImage
                : myAction.content === '학습자료'
                  ? myTextbookCanvasBackgroundImage
                  : homeworkDrawings
                    ? homeworkDrawings[myAction.pageNumber]
                    : '',
    });
    const {
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        erase,
        getCanvasDrawingImage,
        resetCanvas: resetMyCanvas,
        penStyle,
    } = useMyPaint({
        canvasRef:
            myAction.content === '화이트보드'
                ? myWhiteboardCanvasRef
                : myAction.content === '학습자료'
                  ? myTextbookCanvasRef
                  : myHomeworkCanvasRef,
        contextRef,
        penStyle: myAction.penStyle,
        dataChannels,
        erasePeerPaint,
    });

    const resetCanvas = () => {
        resetPeerCanvas();
        resetMyCanvas();

        dataChannels?.map((channel: RTCDataChannel) => {
            try {
                channel.send(
                    JSON.stringify({
                        canvasReset: 'reset',
                    })
                );
            } catch (e) {
                console.log('전송 실패');
            }
        });
    };

    /**
     * 따라가기
     */
    const [watchingSameScreen, setWatchingSameScreen] = useState<boolean>(true);

    useEffect(() => {
        if (
            myAction.content === peerAction.content &&
            myAction.pageNumber === peerAction.pageNumber
        ) {
            setWatchingSameScreen(true);
        } else {
            setWatchingSameScreen(false);
        }
    }, [myAction.content, peerAction.content, myAction.pageNumber, peerAction.pageNumber]);

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

    const saveHomeworkDrawing = () => {
        if (!myHomeworkCanvasRef.current) return;
        const imageSize = {
            width: myHomeworkCanvasRef.current.width,
            height: myHomeworkCanvasRef.current.height,
        };
        setHomeworkDrawings((prev) => {
            const newbackgroundImage = { ...prev };
            newbackgroundImage[selectedPageNumber] = getCanvasDrawingImage(imageSize) as Blob;
            return newbackgroundImage;
        });
        console.log(homeworkDrawings);
    };

    const changeContents = (value: ContentsType) => {
        // 1. 드로잉 데이터 저장
        if (myAction.content === '화이트보드') {
            if (myWhiteboardCanvasRef.current) {
                const drawingBlobData = saveDrawing({
                    canvasRef: myWhiteboardCanvasRef,
                    size: {
                        width: myWhiteboardCanvasRef.current.width,
                        height: myWhiteboardCanvasRef.current.height,
                    },
                });
                setMyWhiteboardCanvasBackgroundImage(drawingBlobData);
            }
            if (peerWhiteboardCanvasRef.current) {
                const drawingBlobData = saveDrawing({
                    canvasRef: peerWhiteboardCanvasRef,
                    size: {
                        width: peerWhiteboardCanvasRef.current.width,
                        height: peerWhiteboardCanvasRef.current.height,
                    },
                });
                setPeerWhiteboardCanvasBackgroundImage(drawingBlobData);
            }
        } else if (myAction.content === '학습자료') {
            if (myTextbookCanvasRef.current) {
                const drawingBlobData = saveDrawing({
                    canvasRef: myTextbookCanvasRef,
                    size: {
                        width: myTextbookCanvasRef.current.width,
                        height: myTextbookCanvasRef.current.height,
                    },
                });
                setMyTextbookCanvasBackgroundImage(drawingBlobData);
            }
            if (peerTextbookCanvasRef.current) {
                const drawingBlobData = saveDrawing({
                    canvasRef: peerTextbookCanvasRef,
                    size: {
                        width: peerTextbookCanvasRef.current.width,
                        height: peerTextbookCanvasRef.current.height,
                    },
                });
                setPeerTextbookCanvasBackgroundImage(drawingBlobData);
            }
        } else {
            if (myHomeworkCanvasRef.current) {
                const drawingBlobData = saveDrawing({
                    canvasRef: myHomeworkCanvasRef,
                    size: {
                        width: myHomeworkCanvasRef.current.width,
                        height: myHomeworkCanvasRef.current.height,
                    },
                });
                setMyHomeworkCanvasBackgroundImage(drawingBlobData);
            }
            if (peerHomeworkCanvasRef.current) {
                const drawingBlobData = saveDrawing({
                    canvasRef: peerHomeworkCanvasRef,
                    size: {
                        width: peerHomeworkCanvasRef.current.width,
                        height: peerHomeworkCanvasRef.current.height,
                    },
                });
                setPeerHomeworkCanvasBackgroundImage(drawingBlobData);
            }
        }

        // 2. 컨텐츠 변경
        setMyAction((prev) => ({ ...prev, content: value }));
    };
    const followPeer = () => {
        setMyAction((prev) => ({
            ...prev,
            content: peerAction.content,
            pageNumber: peerAction.pageNumber,
        }));
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
        sendMyAction('pageNumber');
    }, [dataChannels, myAction.pageNumber]);

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const calculateOffsetRelativeToCanvasSize = (offsetFromPeer: any) => {
        const {
            x: offsetXFromPeer,
            y: offsetYFromPeer,
            canvasWidth,
            canvasHeight,
        } = offsetFromPeer;

        const xFromPeer = offsetXFromPeer;
        const yFromPeer = offsetYFromPeer;

        const myCanvasWidth =
            myAction.content === '화이트보드'
                ? peerWhiteboardCanvasRef.current?.width
                : myAction.content === '학습자료'
                  ? peerTextbookCanvasRef.current?.width
                  : peerHomeworkCanvasRef.current?.width;
        const myCanvasHeight =
            myAction.content === '화이트보드'
                ? peerWhiteboardCanvasRef.current?.height
                : myAction.content === '학습자료'
                  ? peerTextbookCanvasRef.current?.height
                  : peerHomeworkCanvasRef.current?.height;

        const widthRatio = myCanvasWidth ? myCanvasWidth / canvasWidth : 1;
        const heightRatio = myCanvasHeight ? myCanvasHeight / canvasHeight : 1;

        const x = xFromPeer * widthRatio;
        const y = yFromPeer * heightRatio;

        return { x, y };
    };

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
                    pageNumber,
                    textbook: loadTextbook,
                    homework: loadHomework,
                    classState,
                    canvasReset,
                } = JSON.parse(e.data);

                if (action) {
                    if (myAction.content !== peerAction.content) return;
                    switch (action) {
                        case 'down':
                            handlePeerPointerDown(calculateOffsetRelativeToCanvasSize(offset));
                            break;
                        case 'move':
                            handlePeerPointerMove(calculateOffsetRelativeToCanvasSize(offset));
                            if (!peerAction.penStyle.isPen) {
                                erase(calculateOffsetRelativeToCanvasSize(offset));
                            }
                            break;
                        case 'up':
                            handlePeerPointerUp();
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

                if (pageNumber) {
                    console.log('peer가 pageNumber를 변경했어요: ', pageNumber);
                    setPeerAction((prev) => ({ ...prev, pageNumber }));
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

                if (canvasReset) {
                    resetPeerCanvas();
                    resetMyCanvas();
                }
            };
        });
    }, [dataChannels, peerAction, textbook, homework, changeClassState]);

    return {
        myAction,
        peerAction,

        textbook,
        homework,
        homeworkDrawings,

        myWhiteboardCanvasRef,
        myWhiteboardCanvasBackgroundImage,
        myTextbookCanvasRef,
        myTextbookCanvasBackgroundImage,
        myHomeworkCanvasRef,
        myHomeworkCanvasBackgroundImage,
        setMyTextbookCanvasBackgroundImage,
        setMyHomeworkCanvasBackgroundImage,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        getCanvasDrawingImage,
        penStyle,

        peerWhiteboardCanvasRef,
        peerWhiteboardCanvasBackgroundImage,
        peerTextbookCanvasRef,
        peerTextbookCanvasBackgroundImage,
        peerHomeworkCanvasRef,
        peerHomeworkCanvasBackgroundImage,
        setPeerTextbookCanvasBackgroundImage,
        setPeerHomeworkCanvasBackgroundImage,
        handlePeerPointerDown,
        handlePeerPointerMove,
        handlePeerPointerUp,

        watchingSameScreen,
        cleanUpCanvas,
        followPeer,
        changeContents,
        changePenStyle,
        loadTextbook,
        loadHomework,
        startTimer,
        stopTimer,
        progressTime,
        classState,
        changeClassState,
        saveHomeworkDrawing,
        resetCanvas,
    };
};

export default useClass;
