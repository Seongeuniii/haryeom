/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ClassContentsType from '@/components/ClassContentsType';
import LoadClassContent from '@/components/LoadClassContent';
import Display from '@/components/icons/Display';
import ClassBoard from '../ClassBoard';
import { IHomework, ITextbook } from '@/apis/homework/homework';
import DrawingTools from '@/components/DrawingTools';
import { getTextbookDetail } from '@/apis/tutoring/get-textbook-detail';
import { getHomework } from '@/apis/homework/get-homework';
import useCanvas from '@/hooks/useCanvas';
import useMyPaint from '@/hooks/useMyPaint';
import usePeerPaint from '@/hooks/usePeerPaint';
import { PaintCanvas } from '@/components/atoms/Canvas';

interface TeachingToolsProps {
    isTeacher: boolean;
    // TODO : 제거
    tutoringScheduleId: number;
    dataChannels: RTCDataChannel[];
    tutoringId: number;
}

const TeachingTools = ({
    isTeacher,
    tutoringScheduleId,
    dataChannels,
    tutoringId,
}: TeachingToolsProps) => {
    const [myAction, setMyAction] = useState<any>({
        content: '화이트보드',
        pageNumber: 1,
    });
    const [peerAction, setPeerAction] = useState<any>({
        content: '화이트보드',
        pageNumber: 1,
    });
    const [textbook, setTextbook] = useState<ITextbook>();
    const [homework, setHomework] = useState<IHomework>();

    const loadTextbook = async (textbookId: number) => {
        const textbook = await getTextbookDetail(textbookId);
        setTextbook(textbook);
    };
    const loadHomework = async (homeworkId: number) => {
        const homework = await getHomework(homeworkId);
        setHomework(homework);
    };

    const SendAction = (data: any) => {
        dataChannels?.map((channel: RTCDataChannel) => {
            if (Object.values(data).every((value) => typeof value !== 'undefined')) {
                try {
                    channel.send(JSON.stringify(data));
                } catch (e) {
                    console.log('전송 실패');
                }
            }
        });
    };

    // myCanvas
    const myCanvasRef = useRef<HTMLCanvasElement>(null);
    const myPresentationCanvasRef = useRef<HTMLCanvasElement>(null);
    const { contextRef: myContextRef } = useCanvas({
        canvasRef: myCanvasRef,
    });
    const { contextRef: myPresentationContextRef } = useCanvas({
        canvasRef: myPresentationCanvasRef,
    });
    const { handlePointerDown, handlePointerMove, handlePointerUp, penStyle } = useMyPaint({
        canvasRef: myCanvasRef,
        contextRef: myContextRef,
        presentationContextRef: myPresentationContextRef,
        SendAction,
    });

    // peerCanvas
    const peerCanvasRef = useRef<HTMLCanvasElement>(null);
    const peerPresentationCanvasRef = useRef<HTMLCanvasElement>(null);
    const [peerBackgroundImage, setPeerBackgroundImage] = useState<Blob | string>();
    const { contextRef: peerPresentationContextRef } = useCanvas({
        canvasRef: peerPresentationCanvasRef,
    });
    const {
        handlePointerDown: handlePeerPointerDown,
        handlePointerMove: handlePeerPointerMove,
        handlePointerUp: handlePeerPointerUp,
    } = usePeerPaint({
        canvasRef: peerCanvasRef,
        presentationContextRef: peerPresentationContextRef,
        backgroundImage: peerBackgroundImage,
    });

    const calculateOffsetRelativeToCanvasSize = (offsetFromPeer: any) => {
        const {
            x: offsetXFromPeer,
            y: offsetYFromPeer,
            canvasWidth,
            canvasHeight,
        } = offsetFromPeer;

        const xFromPeer = offsetXFromPeer;
        const yFromPeer = offsetYFromPeer;

        const myCanvasWidth = peerCanvasRef.current?.width;
        const myCanvasHeight = peerCanvasRef.current?.height;

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
                            // if (!peerAction.penStyle.isPen) {
                            //     erase(calculateOffsetRelativeToCanvasSize(offset));
                            // }
                            break;
                        case 'up':
                            handlePeerPointerUp();
                            break;
                    }
                }
            };
        });
    }, [dataChannels]);

    return (
        <StyledTeachingTools>
            <HelperBar>
                <ClassContentsType
                    changeContents={() => {}}
                    contentType={myAction.content}
                    LoadTextbook={
                        isTeacher
                            ? ({ closeModal }) =>
                                  LoadClassContent({
                                      content: 'textbook',
                                      tutoringId,
                                      loadClassContent: loadTextbook,
                                      closeModal,
                                  })
                            : undefined
                    }
                    LoadHomework={
                        isTeacher
                            ? ({ closeModal }) =>
                                  LoadClassContent({
                                      content: 'homework',
                                      tutoringId,
                                      loadClassContent: loadHomework,
                                      closeModal,
                                  })
                            : undefined
                    }
                    textbookName={
                        myAction.content === '학습자료'
                            ? textbook?.textbookName
                            : homework?.textbook.textbookName
                    }
                />
                <Section>
                    <FollowingMode onClick={() => {}} isWatching={true}>
                        <Display />
                    </FollowingMode>
                    <DrawingTools
                        penStyle={penStyle}
                        changePenStyle={() => {}}
                        resetCanvas={() => {}}
                    />
                </Section>
            </HelperBar>
            <ClassBoard ContentsType={'화이트보드'}>
                <PaintCanvas
                    canvasRef={peerCanvasRef}
                    presentationCanvasRef={peerPresentationCanvasRef}
                />
                <PaintCanvas
                    canvasRef={myCanvasRef}
                    presentationCanvasRef={myPresentationCanvasRef}
                    handlePointerDown={handlePointerDown}
                    handlePointerMove={handlePointerMove}
                    handlePointerUp={handlePointerUp}
                />
            </ClassBoard>
        </StyledTeachingTools>
    );
};

const FollowingMode = styled.button<{ isWatching: boolean }>`
    width: 40px;
    height: 40px;
    padding-top: 3px;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 100%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    background-color: ${({ theme, isWatching }) => (isWatching ? theme.PRIMARY : '#ff4e4e')};

    svg {
        width: 25px;
        height: 25px;
    }
`;

const Section = styled.div`
    display: flex;
    height: 100%;
    gap: 15px;
`;

const Board = styled.div`
    position: relative;
    width: 93%;
    flex: 0.93;
    overflow: auto;
    display: flex;
`;

const StyledTeachingTools = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const HelperBar = styled.div`
    width: 90%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
`;

const WhiteBoard = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 1em;
`;

export default TeachingTools;
