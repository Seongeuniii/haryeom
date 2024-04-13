import { GetServerSideProps } from 'next';
import { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { QueryClient } from 'react-query';
import PdfViewer from '@/components/PdfViewer';
import PaintCanvas from '@/atoms/Canvas/PaintCanvas';
import { getHomework } from '@/apis/homework/get-homework';
import { IHomework } from '@/apis/homework/homework';
import usePdf from '@/hooks/usePdf';
import useMyPaint, { IPenStyle } from '@/hooks/useMyPaint';
import HomeworkStatus from '@/components/HomeworkStatus';
import { saveHomework, submitHomework } from '@/apis/homework/save-homework';
import { useGetHomework } from '@/queries/useGetHomework';
import DrawingTools from '@/components/DrawingTools';
import { useRouter } from 'next/router';
import useCanvas from '@/hooks/useCanvas';
import PdfThumbnailList from '@/components/PdfThumbnailList';
import HomeworkPageHeader from '@/components/HomeworkPageHeader';

interface HomeworkContainerProps {
    homeworkData: IHomework;
}

export interface IMyHomeworkDrawings {
    [pageNum: number]: Blob | string;
}

export interface IHomeworkStatus {
    [pageNum: number]: 'progress' | 'done' | 'not-start';
}

const HomeworkContainer = ({ homeworkData: _homeworkData }: HomeworkContainerProps) => {
    const { data: homeworkData, refetch } = useGetHomework(_homeworkData.homeworkId, _homeworkData);
    if (!homeworkData) return <div>...loading</div>; // TODO : 리팩토링

    const router = useRouter();
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

    const homeworkCanvasRef = useRef<HTMLCanvasElement>(null);
    const [penStyle, setPenStyle] = useState<IPenStyle>({
        isPen: true,
        strokeStyle: 'black',
        lineWidth: 3,
    });
    const changePenStyle = useCallback((value: IPenStyle) => {
        setPenStyle((prev) => ({ ...prev, ...value }));
    }, []);

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
    const { contextRef } = useCanvas({
        canvasRef: homeworkCanvasRef,
        backgroundImage: myHomeworkDrawings[selectedPageNumber],
    });
    const {
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        getCanvasDrawingImage,
        resetCanvas,
    } = useMyPaint({
        canvasRef: homeworkCanvasRef,
        contextRef,
        penStyle,
    });

    const homeworkStatus: IHomeworkStatus = useMemo(() => {
        const { startPage, endPage } = homeworkData;
        const pageRange: number[] = Array.from(
            { length: endPage - startPage + 1 },
            (_, index) => startPage + index
        );
        return pageRange.reduce((acc, pageNum) => {
            if (homeworkData.drawings.some((drawing) => drawing.page === pageNum)) {
                acc[pageNum] = 'done';
            } else if (myHomeworkDrawings[pageNum]) {
                acc[pageNum] = 'progress';
            } else {
                acc[pageNum] = 'not-start';
            }
            return acc;
        }, {} as IHomeworkStatus);
    }, [homeworkData, myHomeworkDrawings]);
    const handleSave = useCallback(async () => {
        await saveHomework(homeworkData.homeworkId, myHomeworkDrawings);
        refetch();
        alert('숙제가 임시 저장되었어요. 제출하여 완료해주세요:)');
    }, [homeworkData, myHomeworkDrawings]);

    const handleSubmit = useCallback(async () => {
        await saveHomework(homeworkData.homeworkId, myHomeworkDrawings);
        await submitHomework(homeworkData.homeworkId);
        alert('숙제가 제출되었어요. 홈 화면으로 이동합니다:)');
        router.push('/');
    }, [homeworkData, myHomeworkDrawings]);

    return (
        <StyledHomeworkContainer>
            <HomeworkPageHeader
                homeworkData={homeworkData}
                handleSave={handleSave}
                handleSubmit={handleSubmit}
            />
            <HomeworkContents>
                <HomeworkDrawingBoard>
                    <DrawingToolsWrapper>
                        <DrawingTools
                            penStyle={penStyle}
                            changePenStyle={changePenStyle}
                            resetCanvas={resetCanvas}
                        />
                    </DrawingToolsWrapper>
                    <PdfThumbnailList
                        pdfFile={homeworkData.textbook.textbookUrl}
                        totalPagesOfPdfFile={totalPagesOfPdfFile}
                        startPageNumber={homeworkData.startPage}
                        selectedPageNumber={selectedPageNumber}
                        movePage={movePage}
                    />
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
                        startPageNumber={homeworkData.startPage}
                    >
                        <PaintCanvas
                            canvasRef={homeworkCanvasRef}
                            handlePointerDown={handlePointerDown}
                            handlePointerMove={handlePointerMove}
                            handlePointerUp={() => {
                                handlePointerUp();
                                saveHomeworkDrawing();
                            }}
                        />
                    </PdfViewer>
                </HomeworkDrawingBoard>
                <HomeworkStatus homeworkData={homeworkData} homeworkStatus={homeworkStatus} />
            </HomeworkContents>
        </StyledHomeworkContainer>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const homeworkId = context.params?.id as string;

    if (!homeworkId) return { props: {} };

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('homework', async () => {
        const data = await getHomework(parseInt(homeworkId));
        return data;
    });

    const homeworkData = queryClient.getQueryData('homework');

    return { props: { homeworkData: homeworkData || null } };
};

const StyledHomeworkContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: end;
`;

const HomeworkDrawingBoard = styled.div`
    position: relative;
    width: 100%;
    margin-top: 1em;
    overflow: auto;
    display: flex;
`;

const DrawingToolsWrapper = styled.div`
    position: absolute;
    width: 95%;
    height: 40px;
    top: 10px;
    right: 30px;
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
    z-index: 10;
`;

const HomeworkContents = styled.main`
    width: 70%;
    height: calc(100% - 3em);
    display: flex;

    @media screen and (max-width: 1200px) {
        & {
            width: 100%;
        }
    }
`;

export default HomeworkContainer;
