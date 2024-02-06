import React, { useState } from 'react';
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

type toolType = '빈페이지' | '학습자료';

const ClassContainer = () => {
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return;
    const router = useRouter();

    const [myStream] = useStream();
    const { peerStream, peerConnections, dataChannels } = useWebRTCStomp({
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

    const [seletedTool, setSelectedTool] = useState<toolType>('빈페이지');
    const [myWhiteboardBackgroundImage, setMyWhiteBoardBackgroundImage] = useState<Blob | string>();
    const [peerWhiteBoardBackgroundImage, setPeerWhiteBoard] = useState<Blob | string>();

    const {
        canvasRef,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        getCanvasDrawingImage,
    } = useMyPaint({
        backgroundImage: myWhiteboardBackgroundImage,
        dataChannels: dataChannels,
    });

    const { canvasRef: peerCavasRef } = usePeerPaint({
        backgroundImage: peerWhiteBoardBackgroundImage,
        dataChannels: dataChannels,
    });

    const changeToolType = (type: toolType) => {
        setSelectedTool(type);
    };

    return (
        <ClassLayout>
            <StyledClassContainer>
                <LeftSection>
                    <MediaStream myStream={myStream} peerStream={peerStream} />
                </LeftSection>
                <TeachingTools>
                    <HelperBar>
                        <Button
                            content={'빈 페이지'}
                            onClick={(e) => changeToolType('빈페이지')}
                            width="80px"
                            height="30px"
                            $borderColor="#b9b9b9"
                            $borderRadius="0.4em"
                            $backgroundColor={seletedTool === '빈페이지' ? '#606060' : ''}
                            color={seletedTool === '빈페이지' ? 'white' : ''}
                        ></Button>
                        <Button
                            content={'학습자료'}
                            onClick={(e) => changeToolType('학습자료')}
                            width="100px"
                            height="30px"
                            $borderColor="#b9b9b9"
                            $borderRadius="0.4em"
                            $backgroundColor={seletedTool === '학습자료' ? '#606060' : ''}
                            color={seletedTool === '학습자료' ? 'white' : ''}
                        ></Button>
                    </HelperBar>
                    <Board>
                        {seletedTool === '빈페이지' ? (
                            <WhiteBoard>
                                <DrawingLayer>
                                    <PeerPaintCanvas canvasRef={peerCavasRef} />
                                </DrawingLayer>
                                <DrawingLayer>
                                    <PaintCanvas
                                        canvasRef={canvasRef}
                                        handlePointerDown={handlePointerDown}
                                        handlePointerMove={handlePointerMove}
                                        handlePointerUp={handlePointerUp}
                                    />
                                </DrawingLayer>
                            </WhiteBoard>
                        ) : (
                            <PdfViewer
                                pdfFile={
                                    'https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf'
                                }
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
                                        canvasRef={canvasRef}
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
    min-width: 300px;
    height: 93%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 1100px) {
        & {
            display: none;
        }
    }
`;

const Board = styled.div`
    position: relative;
    width: 93%;
    flex: 0.93;
    overflow: auto;
    display: flex;
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

const TimeStamp = styled.div`
    width: 100%;
    height: 150px;
    background-color: yellow;
`;

const HelperBar = styled.div`
    width: 93%;
    min-height: 50px;
    display: flex;
    align-items: center;
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
