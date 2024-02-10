import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import MediaStream from './MediaStream';
import useStream from '@/hooks/useStream';
import useWebRTCStomp from '@/hooks/useWebRTC';
import ClassLayout from '@/components/layouts/ClassLayout';
import PdfViewer from '@/components/PdfViewer';
import usePdf from '@/hooks/usePdf';
import useMyPaint from '@/components/PaintCanvas/hooks/useMyPaint';
import PaintCanvas from '@/components/PaintCanvas';
import Button from '@/components/commons/Button';
import { useRecoilValue } from 'recoil';
import PeerPaintCanvas from '@/components/PaintCanvas/PeerPaintCanvas';
import usePeerPaint from '@/components/PaintCanvas/hooks/usePeerPaint';
import userSessionAtom from '@/recoil/atoms/userSession';
import useMediaRecord from '@/hooks/useMediaRecord';
import DrawingTools from '@/components/DrawingTools';
import ClassTimer from '@/components/ClassTimer';
import ClassContentsType from '@/components/ClassContentsType';
import useClass from '@/hooks/useClass';
import HomeworkList from '@/components/HomeworkList';
import { useGetHomeworkList } from '@/queries/useGetHomeworkList';
import { getPageFiles } from 'next/dist/server/get-page-files';

const LoadHomework = (getPdfFile: (homeworkId: number) => Promise<void>) => {
    const { data } = useGetHomeworkList(19); // TODO: tutoringId

    const handleClickHomeworkCard = async (homeworkId: number) => {
        await getPdfFile(homeworkId);
    };

    return (
        <HomeworkList
            homeworkList={data?.homeworkList}
            handleClickHomeworkCard={handleClickHomeworkCard}
        />
    );
};

const ClassContainer = () => {
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return;
    const router = useRouter();

    const { myStream, stopStream } = useStream();
    const { stompClient, peerStream, peerConnections, dataChannels } = useWebRTCStomp({
        memberId: userSession.memberId,
        roomCode: router.query.id as string,
        myStream,
    });

    const {
        totalPagesOfPdfFile,
        selectedPageNumber,
        pdfPageCurrentSize,
        pdfPageOriginalSize,
        onDocumentLoadSuccess,
        onPageLoadSuccess,
        movePage,
        updatePdfPageCurrentSize,
        ZoomInPdfPageCurrentSize,
        ZoomOutPdfPageCurrentSize,
    } = usePdf({
        initialSelectedPageNumer: 1,
    });

    const {
        myAction,
        whiteboardCanvasRef,
        myWhiteboardBackgroundImage,
        peerWhiteBoardBackgroundImage,
        peerWatchingSameScreen,
        changeContents,
        changePenStyle,
        startClass,
        endClass,
    } = useClass({ dataChannels });

    const {
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        getCanvasDrawingImage,
        penStyle,
    } = useMyPaint({
        canvasRef: whiteboardCanvasRef,
        backgroundImage: myWhiteboardBackgroundImage,
        penStyle: myAction.penStyle,
        dataChannels,
    });

    // TOOD: 리팩토링
    useEffect(() => {
        const handleRouteChange = () => {
            stopStream();
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
            stompClient?.disconnect();
        };
    }, [router, stopStream, stompClient]);

    const [pdfFile, setPefFile] = useState<string>();

    const getPdfFile = async (homeworkId: number) => {
        console.log('pdf: ', homeworkId);
    };

    return (
        <ClassLayout>
            <StyledClassContainer>
                <LeftSection>
                    <ClassInfo>
                        <Logo>하렴</Logo>
                        <div>
                            <Subject>{router.query.subject}</Subject>
                            <Title>| {router.query.title}</Title>
                        </div>
                        {userSession.role === 'TEACHER' && (
                            <ClassTimer // TODO : 리팩토링
                                startClass={() => {
                                    startClass(parseInt(router.query.tutoringScheduleId as string));
                                }}
                                endClass={() => {
                                    endClass(parseInt(router.query.tutoringScheduleId as string));
                                }}
                            />
                        )}
                    </ClassInfo>
                    <MediaStream myStream={myStream} peerStream={peerStream} />
                </LeftSection>
                <TeachingTools>
                    <HelperBar>
                        <ClassContentsType
                            changeContents={changeContents}
                            contentType={myAction.content}
                            LoadHomework={
                                userSession.role === 'TEACHER'
                                    ? () => LoadHomework(getPdfFile)
                                    : undefined
                            }
                        />
                        <DrawingTools penStyle={penStyle} changePenStyle={changePenStyle} />
                    </HelperBar>
                    <Board>
                        {peerWatchingSameScreen && (
                            <PeerWatchingStatus>
                                선생님이 현재 화면을 보고있어요.
                            </PeerWatchingStatus>
                        )}
                        {myAction.content === '빈페이지' ? (
                            <WhiteBoard>
                                <DrawingLayer>
                                    <PaintCanvas
                                        canvasRef={whiteboardCanvasRef}
                                        handlePointerDown={handlePointerDown}
                                        handlePointerMove={handlePointerMove}
                                        handlePointerUp={handlePointerUp}
                                    />
                                </DrawingLayer>
                            </WhiteBoard>
                        ) : (
                            <PdfViewer
                                pdfFile={pdfFile}
                                selectedPageNumber={selectedPageNumber}
                                totalPagesOfPdfFile={totalPagesOfPdfFile}
                                pdfPageCurrentSize={pdfPageCurrentSize}
                                movePage={movePage}
                                onDocumentLoadSuccess={onDocumentLoadSuccess}
                                onPageLoadSuccess={onPageLoadSuccess}
                                updatePdfPageCurrentSize={updatePdfPageCurrentSize}
                                ZoomInPdfPageCurrentSize={ZoomInPdfPageCurrentSize}
                                ZoomOutPdfPageCurrentSize={ZoomOutPdfPageCurrentSize}
                                myHomeworkDrawings={[]}
                            >
                                <DrawingLayer>
                                    <PaintCanvas
                                        canvasRef={whiteboardCanvasRef}
                                        handlePointerDown={handlePointerDown}
                                        handlePointerMove={handlePointerMove}
                                        handlePointerUp={handlePointerUp}
                                    />
                                </DrawingLayer>
                            </PdfViewer>
                        )}
                    </Board>
                </TeachingTools>
            </StyledClassContainer>
        </ClassLayout>
    );
};

const StyledClassContainer = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`;

const LeftSection = styled.div`
    height: 92%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 1100px) {
        & {
            display: none;
        }
    }
`;

const ClassInfo = styled.div`
    width: 100%;
    padding: 1em;
    margin-bottom: 2em;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: 2px solid ${({ theme }) => theme.PRIMARY};
    border-radius: 0.6em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const Logo = styled.span`
    font-weight: 700;
    font-size: 22px;
    color: ${({ theme }) => theme.PRIMARY};
`;

const Subject = styled.div`
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 8px;
`;

const Title = styled.div`
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const Board = styled.div`
    position: relative;
    width: 93%;
    flex: 0.93;
    overflow: auto;
    display: flex;
`;

const PeerWatchingStatus = styled.div`
    position: absolute;
    bottom: 25px;
    left: 50%;
    padding: 0.8em 1.2em;
    transform: translate(-50%, -50%);
    border-radius: 2em;
    background-color: ${({ theme }) => theme.PRIMARY};
    color: white;
    font-size: 10px;
    z-index: 100;
`;

const TeachingTools = styled.div`
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
    width: 93%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    display: flex;
    gap: 10px;
`;

const WhiteBoard = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 1em;
`;

const DrawingLayer = styled.div`
    position: absolute;
    top: 0;
    height: 0;
    width: 100%;
    height: 100%;
`;

export default ClassContainer;
