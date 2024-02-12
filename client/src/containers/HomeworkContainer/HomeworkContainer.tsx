import { GetServerSideProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PdfViewer from '@/components/PdfViewer';
import PaintCanvas from '@/components/PaintCanvas';
import HomeworkLayout from '@/components/layouts/HomeworkLayout';
import { getHomework } from '@/apis/homework/get-homework';
import { IHomework } from '@/apis/homework/homework';
import usePdf, { IPdfSize } from '@/hooks/usePdf';
import useMyPaint from '@/components/PaintCanvas/hooks/useMyPaint';
import HomeworkStatus from '@/components/HomeworkStatus';
import { IPenStyle } from '@/hooks/useClass';
import Button from '@/components/commons/Button';
import { saveHomework } from '@/apis/homework/save-homework';

interface HomeworkContainerProps {
    homeworkData: IHomework;
}

export interface IMyHomeworkDrawings {
    [pageNum: number]: Blob | string;
}

const HomeworkContainer = ({ homeworkData }: HomeworkContainerProps) => {
    const [myHomeworkDrawings, setMyHomeworkDrawings] = useState<IMyHomeworkDrawings>(
        homeworkData.drawings.reduce((acc, { page, homeworkDrawingUrl }) => {
            acc[page] = homeworkDrawingUrl;
            return acc;
        }, {} as IMyHomeworkDrawings)
    );

    const saveHomeworkDrawing = () => {
        const imageSize = {
            width: pdfPageOriginalSize?.width as number,
            height: pdfPageOriginalSize?.height as number,
        };
        setMyHomeworkDrawings((prev) => {
            const newbackgroundImage = { ...prev };
            newbackgroundImage[selectedPageNumber] = getCanvasDrawingImage(imageSize) as Blob;
            return newbackgroundImage;
        });
    };

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
        initialSelectedPageNumer: homeworkData.startPage,
    });

    const homeworkCanvasRef = useRef<HTMLCanvasElement>(null);

    const [penStyle, setPenStyle] = useState<IPenStyle>({
        isPen: true,
        strokeStyle: 'black',
        lineWidth: 3,
    });

    const { handlePointerDown, handlePointerMove, handlePointerUp, getCanvasDrawingImage } =
        useMyPaint({
            canvasRef: homeworkCanvasRef,
            backgroundImage: myHomeworkDrawings[selectedPageNumber],
            penStyle,
        });

    useEffect(() => {
        saveHomeworkDrawing();
    }, [selectedPageNumber]);

    return (
        <HomeworkLayout
            homeworkData={homeworkData}
            handleSubmit={() => saveHomework(homeworkData.homeworkId, myHomeworkDrawings)}
        >
            <StyledHomeworkContainer>
                <Board>
                    <PdfViewer
                        pdfFile={homeworkData.textbook.textbookUrl}
                        selectedPageNumber={selectedPageNumber}
                        totalPagesOfPdfFile={totalPagesOfPdfFile}
                        pdfPageCurrentSize={pdfPageCurrentSize}
                        movePage={movePage}
                        onDocumentLoadSuccess={onDocumentLoadSuccess}
                        onPageLoadSuccess={onPageLoadSuccess}
                        updatePdfPageCurrentSize={updatePdfPageCurrentSize}
                        ZoomInPdfPageCurrentSize={ZoomInPdfPageCurrentSize}
                        ZoomOutPdfPageCurrentSize={ZoomOutPdfPageCurrentSize}
                        myHomeworkDrawings={myHomeworkDrawings}
                    >
                        <DrawingLayer>
                            <PaintCanvas
                                canvasRef={homeworkCanvasRef}
                                handlePointerDown={handlePointerDown}
                                handlePointerMove={handlePointerMove}
                                handlePointerUp={handlePointerUp}
                            />
                        </DrawingLayer>
                    </PdfViewer>
                </Board>
                <HomeworkStatus
                    homeworkData={homeworkData}
                    myHomeworkDrawings={myHomeworkDrawings}
                />
            </StyledHomeworkContainer>
        </HomeworkLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const homeworkId = context.params?.id as string;

    if (!homeworkId) return { props: {} };

    const homeworkData = await getHomework(parseInt(homeworkId));

    return { props: { homeworkData: homeworkData || null } };
};

const StyledHomeworkContainer = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Board = styled.div`
    position: relative;
    width: 100%;
    overflow: auto;
    display: flex;
`;

const DrawingLayer = styled.div`
    position: absolute;
    top: 0;
    height: 0;
    width: 100%;
    height: 100%;
`;

export default HomeworkContainer;
