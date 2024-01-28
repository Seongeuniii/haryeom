import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfThumbnail from './PdfThumbnail';
import { OnDocumentLoadSuccess, OnPageLoadSuccess } from 'react-pdf/dist/cjs/shared/types';
import { IPdfSize } from '@/hooks/usePdf';
import { IMyHomeworkDrawings } from '@/containers/HomeworkContainer/HomeworkContainer';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Homework {
    myHomeworkDrawings: IMyHomeworkDrawings;
}

interface PdfViewerProps extends Homework {
    pdfFile: string;
    totalPagesOfPdfFile: number;
    pdfPageCurrentSize: IPdfSize;
    children: ReactNode;
    selectedPageNumber: number;
    movePage: (selectedPageNumber: number) => void;
    onDocumentLoadSuccess: OnDocumentLoadSuccess;
    onPageLoadSuccess: OnPageLoadSuccess;
    updatePdfPageCurrentSize: (size: IPdfSize) => void;
    ZoomInPdfPageCurrentSize: () => void;
    ZoomOutPdfPageCurrentSize: () => void;
}

const PdfViewer = ({
    pdfFile,
    totalPagesOfPdfFile,
    pdfPageCurrentSize,
    selectedPageNumber,
    onDocumentLoadSuccess,
    onPageLoadSuccess,
    movePage,
    updatePdfPageCurrentSize,
    ZoomInPdfPageCurrentSize,
    ZoomOutPdfPageCurrentSize,
    children,
    myHomeworkDrawings,
}: PdfViewerProps) => {
    const pdfPageWrapperRef = useRef<HTMLDivElement>(null);
    const thumbnailListcontainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        updatePdfPageCurrentSize(getPdfPageWrapperSize());
        window.addEventListener('resize', () => {
            updatePdfPageCurrentSize(getPdfPageWrapperSize());
        });
    }, [pdfFile]);

    useEffect(() => {
        updatePdfPageCurrentSize(getPdfPageWrapperSize());
    }, [pdfPageWrapperRef.current?.clientWidth, pdfPageWrapperRef.current?.clientHeight]);

    const getPdfPageWrapperSize = () => {
        if (!pdfPageWrapperRef.current) return { width: undefined, height: undefined };
        const { clientWidth, clientHeight } = pdfPageWrapperRef.current;
        return { width: clientWidth, height: clientHeight };
    };

    return (
        <StyledPdfViewer>
            <PdfThumbnailList ref={thumbnailListcontainer}>
                <Document file={pdfFile}>
                    {Array.from({ length: totalPagesOfPdfFile }, (el, index) => (
                        <PdfThumbnail
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            selectedPageNumber={selectedPageNumber}
                            movePage={movePage}
                            homeworkStatus={
                                myHomeworkDrawings[index + 1] === undefined ? 'notStart' : 'done'
                            }
                        >
                            <Page
                                pageNumber={index + 1}
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                                width={90}
                            />
                        </PdfThumbnail>
                    ))}
                </Document>
            </PdfThumbnailList>
            <PdfPageWrapper ref={pdfPageWrapperRef}>
                <div
                    style={{
                        width: `${pdfPageCurrentSize.width}`,
                        height: `${pdfPageCurrentSize.height}`,
                        overflow: 'scroll',
                    }}
                >
                    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page
                            pageNumber={selectedPageNumber}
                            onLoadSuccess={onPageLoadSuccess}
                            width={pdfPageCurrentSize.width}
                            height={pdfPageCurrentSize.height}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                        >
                            {children}
                        </Page>
                    </Document>
                </div>
                <ControlPdfSize>
                    <ZoomButton onClick={ZoomInPdfPageCurrentSize}>+</ZoomButton>
                    <ZoomButton onClick={ZoomOutPdfPageCurrentSize}>-</ZoomButton>
                </ControlPdfSize>
            </PdfPageWrapper>
        </StyledPdfViewer>
    );
};

const StyledPdfViewer = styled.div`
    flex: 1;
    overflow: auto;
    display: flex;
`;

const PdfThumbnailList = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    min-width: 125px;
    padding-right: 8px;
    margin: 1em 0 1em 1em;

    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const PdfPageWrapper = styled.div`
    position: relative;
    flex: 1;
    margin: 1em;
    display: flex;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: auto;
`;

const ControlPdfSize = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const ZoomButton = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 100%;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    background-color: ${({ theme }) => theme.BORDER_LIGHT};

    &:hover {
        color: ${({ theme }) => theme.WHITE};
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export default PdfViewer;
