import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfThumbnail from './PdfThumbnail';
import { OnDocumentLoadSuccess, OnPageLoadSuccess } from 'react-pdf/dist/cjs/shared/types';
import { IPdfSize } from '@/hooks/usePdf';
import { IMyHomeworkDrawings } from '@/containers/HomeworkContainer/HomeworkContainer';
import Fold from '../icons/Fold';
import { useIntersect } from '@/hooks/useIntersect';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface Homework {
    myHomeworkDrawings: IMyHomeworkDrawings;
}

interface PdfViewerProps extends Homework {
    pdfFile: string | undefined;
    totalPagesOfPdfFile: number;
    pdfPageCurrentSize: IPdfSize;
    children?: ReactNode;
    selectedPageNumber: number;
    startPageNumber: number;
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
    startPageNumber,
    onDocumentLoadSuccess,
    onPageLoadSuccess,
    movePage,
    updatePdfPageCurrentSize,
    ZoomInPdfPageCurrentSize,
    ZoomOutPdfPageCurrentSize,
    children,
    myHomeworkDrawings,
}: PdfViewerProps) => {
    if (!pdfFile) {
        return (
            <StyledPdfViewer>
                <NoPdfFile>불러온 파일이 없어요:)</NoPdfFile>
            </StyledPdfViewer>
        );
    }

    const pdfPageWrapperRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState<boolean>(true);

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

    const [renderedThumbnailLength, setRenderedThumbnailLength] = useState<number>(0);
    const lastItemRef = useIntersect(async (entry, observer) => {
        observer.unobserve(entry.target);

        if (totalPagesOfPdfFile - renderedThumbnailLength >= 10) {
            setRenderedThumbnailLength((prev) => prev + 10);
        } else {
            setRenderedThumbnailLength(
                (prev) => prev + totalPagesOfPdfFile - renderedThumbnailLength
            );
        }
    });

    return (
        <StyledPdfViewer>
            <PdfThumbnailList>
                <Document file={pdfFile}>
                    {Array.from({ length: renderedThumbnailLength }, (el, index) => (
                        <PdfThumbnail
                            key={`page_${index + 1}`}
                            startPageNumber={startPageNumber}
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
                                width={70}
                            />
                        </PdfThumbnail>
                    ))}
                    <div ref={lastItemRef} />
                </Document>
            </PdfThumbnailList>
            <PdfPageWrapper ref={pdfPageWrapperRef}>
                <ToggleThumbnailButton onClick={(prev) => setShow(!show)}>
                    <Fold />
                </ToggleThumbnailButton>
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
    align-items: center;
    justify-content: center;
`;

const NoPdfFile = styled.span`
    font-weight: 700;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const ToggleThumbnailButton = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    width: 25px;
    height: 25px;
    padding-top: 3px;
    z-index: 10;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 100%;

    svg {
        width: 13px;
        height: 13px;
    }
`;

const PdfThumbnailList = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    height: 100%;
    margin-right: 8px;
    margin: 1em 0;

    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const PdfPageWrapper = styled.div`
    position: relative;
    height: 100%;
    flex: 1;
    margin: 1em;
    display: flex;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: auto;
`;

const ControlPdfSize = styled.div`
    position: absolute;
    bottom: 8px;
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
