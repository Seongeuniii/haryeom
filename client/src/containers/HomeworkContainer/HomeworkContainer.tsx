import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import styled from 'styled-components';
import PdfViewer from '@/components/PdfViewer';
import PaintCanvas from '@/components/PaintCanvas';
import HomeworkLayout from '@/components/layouts/HomeworkLayout';
import { getHomework } from '@/apis/homework/get-homework';
import { IHomework } from '@/apis/homework/homework';
import usePdf, { IPdfSize } from '@/hooks/usePdf';
import useMyPaint from '@/components/PaintCanvas/Hook/useMyPaint';
import { saveHomework } from '@/apis/homework/save-homework';
import HomeworkStatus from '@/components/HomeworkStatus';

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
    const { saveCanvasDrawing } = useMyPaint({
        updateImageSource: setMyHomeworkDrawings,
        saveCanvasSize: pdfPageOriginalSize as IPdfSize,
    });

    useEffect(() => {
        const { drawings } = homeworkData;
    }, []);

    return (
        <HomeworkLayout>
            <StyledHomeworkContainer>
                {/* <button onClick={() => saveHomework(homeworkData.homeworkId, myHomeworkDrawings)}>
                    제출하기
                </button> */}
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
                                imageSource={myHomeworkDrawings[selectedPageNumber]}
                                saveCanvasDrawing={saveCanvasDrawing}
                                pdfPageCurrentSize={pdfPageCurrentSize}
                                pageNum={selectedPageNumber}
                            />
                        </DrawingLayer>
                    </PdfViewer>
                </Board>
                <HomeworkStatus />
            </StyledHomeworkContainer>
        </HomeworkLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const homeworkId = context.params?.id as string;

    if (!homeworkId) return { props: {} };

    const homeworkData = await getHomework(homeworkId);

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
