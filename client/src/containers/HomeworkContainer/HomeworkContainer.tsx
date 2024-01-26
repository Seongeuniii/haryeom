import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import styled from 'styled-components';
import PdfViewer from '@/components/PdfViewer';
import PaintCanvas from '@/components/PaintCanvas';
import HomeworkLayout from '@/components/layouts/HomeworkLayout';
import { getHomework } from '@/apis/homework/get-homework';
import { IHomework } from '@/apis/homework/homework';
import usePdf from '@/hooks/usePdf';
import useMyPaint from '@/components/PaintCanvas/Hook/useMyPaint';

interface HomeworkContainerProps {
    homeworkData: IHomework;
}

interface IMyHomeworkDrawings {
    [pageNum: number]: string | StaticImageData;
}

const HomeworkContainer = ({ homeworkData }: HomeworkContainerProps) => {
    const [myHomeworkDrawings, setMyHomeworkDrawings] = useState<IMyHomeworkDrawings>({});
    const {
        totalPagesOfPdfFile,
        selectedPageNumber,
        pdfPageCurrentSize,
        onDocumentLoadSuccess,
        onPageLoadSuccess,
        movePage,
        updatePdfPageCurrentSize,
    } = usePdf({
        initialSelectedPageNumer: homeworkData.startPage,
    });
    const { save } = useMyPaint({ updateImageSource: setMyHomeworkDrawings });

    useEffect(() => {
        const { drawings } = homeworkData;
        const initialMyHomeworkDrawings: IMyHomeworkDrawings = drawings.reduce(
            (acc, { page, homeworkDrawingUrl }) => {
                acc[page] = homeworkDrawingUrl;
                return acc;
            },
            {} as IMyHomeworkDrawings
        );
        setMyHomeworkDrawings(initialMyHomeworkDrawings);
    }, []);

    return (
        <HomeworkLayout>
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
                    >
                        <DrawingLayer>
                            <PaintCanvas
                                imageSource={myHomeworkDrawings[selectedPageNumber]}
                                save={save}
                                pdfPageCurrentSize={pdfPageCurrentSize}
                                pageNum={selectedPageNumber}
                            />
                        </DrawingLayer>
                    </PdfViewer>
                </Board>
            </StyledHomeworkContainer>
        </HomeworkLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const homeworkId = context.params?.id as string;

    if (!homeworkId) return { props: {} };

    const homeworkData = await getHomework(homeworkId);

    return { props: { homeworkData } };
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
    width: 93%;
    flex: 0.93;
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
