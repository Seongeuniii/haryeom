import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfThumbnail from './PdfThumbnail';
import { OnDocumentLoadSuccess, OnPageLoadSuccess } from 'react-pdf/dist/cjs/shared/types';
import { IPdfSize } from '@/hooks/usePdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfViewerProps {
    pdfFile: string;
    totalPagesOfPdfFile: number;
    pdfPageCurrentSize: IPdfSize;
    children: ReactNode;
    selectedPageNumber: number;
    movePage: (selectedPageNumber: number) => void;
    onDocumentLoadSuccess: OnDocumentLoadSuccess;
    onPageLoadSuccess: OnPageLoadSuccess;
    updatePdfPageCurrentSize: (size: IPdfSize) => void;
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
    children,
}: PdfViewerProps) => {
    const pdfPageWrapperRef = useRef<HTMLDivElement>(null);
    const thumbnailListcontainer = useRef<HTMLDivElement>(null);
    const [showFullFile, setShowFullFile] = useState<boolean>(false);

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

    const handleClickShowFullFileButton = () => {
        const { width, height } = getPdfPageWrapperSize();
        if (showFullFile) {
            updatePdfPageCurrentSize({ width, height: undefined });
        } else {
            updatePdfPageCurrentSize({ width: undefined, height: height });
        }
        setShowFullFile(!showFullFile);
    };

    return (
        <StyledPdfViewer>
            <ShowFullFileButton onClick={handleClickShowFullFileButton}>
                {showFullFile ? '크게보기' : '전체화면'}
            </ShowFullFileButton>
            <PdfThumbnailList ref={thumbnailListcontainer}>
                <Document file={pdfFile}>
                    {/* pdf 전체 리스트 */}
                    {Array.from({ length: totalPagesOfPdfFile }, (el, index) => (
                        <PdfThumbnail
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            selectedPageNumber={selectedPageNumber}
                            movePage={movePage}
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
                {/* pdf 한 페이지 */}
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
            </PdfPageWrapper>
        </StyledPdfViewer>
    );
};

const StyledPdfViewer = styled.div`
    width: 100%;
    flex: 1;
    overflow: auto;
    display: flex;
`;

const PdfThumbnailList = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    min-width: 125px;
    height: 100%;
    padding-right: 8px;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const PdfPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const ShowFullFileButton = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
`;

export default PdfViewer;
