import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import MediaStream from './MediaStream';
import useStream from '@/hooks/useStream';
import useWebRTCStomp from '@/hooks/useWebRTC';
import ClassLayout from '@/components/layouts/ClassLayout';
import PdfViewer from '@/components/PdfViewer';
import usePdf from '@/hooks/usePdf';
import useMyPaint from '@/components/PaintCanvas/Hook/useMyPaint';
import PaintCanvas from '@/components/PaintCanvas';

const ClassContainer = () => {
    const [myStream] = useStream();

    const router = useRouter(); // test용
    const { peerStream, peerConnections, dataChannels } = useWebRTCStomp({
        memberId: parseInt(router.query.id as string),
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
        canvasRef,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        getCanvasDrawingImage,
    } = useMyPaint({
        backgroundImage: undefined,
    });

    return (
        <ClassLayout>
            <StyledClassContainer>
                <MediaStreamDisplaySection>
                    <MediaStream myStream={myStream} peerStream={peerStream} />
                </MediaStreamDisplaySection>
                <TeachingTools>
                    {/* <PdfViewer
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
                    </PdfViewer> */}
                </TeachingTools>
            </StyledClassContainer>
        </ClassLayout>
    );
};

const StyledClassContainer = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
`;

const MediaStreamDisplaySection = styled.div`
    min-width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TeachingTools = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
`;

const TimeStamp = styled.div`
    width: 100%;
    height: 150px;
    background-color: yellow;
`;

const DrawingLayer = styled.div`
    position: absolute;
    top: 0;
    height: 0;
    width: 100%;
    height: 100%;
`;

export default ClassContainer;
