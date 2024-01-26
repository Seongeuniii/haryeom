import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfThumbnail from './PdfThumbnail';
import { OnDocumentLoadSuccess, OnPageLoadSuccess } from 'react-pdf/dist/cjs/shared/types';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfViewerProps {
    pdfUrl: string;
    pdfPagesNum: number;
    pdfPageSize: { width: number; height: number };
    children: ReactNode;
    pageNum: number;
    movePage: (selectedPageNumber: number) => void;
    onDocumentLoadSuccess: OnDocumentLoadSuccess;
    onPageLoadSuccess: OnPageLoadSuccess;
    updatePdfPageSize: (pdfPageWrapperRef: RefObject<HTMLDivElement>) => void;
}

const PdfViewer = ({
    pdfUrl,
    pdfPagesNum,
    pdfPageSize,
    pageNum,
    children,
    onDocumentLoadSuccess,
    onPageLoadSuccess,
    movePage,
    updatePdfPageSize,
}: PdfViewerProps) => {
    const pdfPageWrapperRef = useRef<HTMLDivElement>(null);
    const [fitWidth, setFitWidth] = useState<boolean>(false);

    useEffect(() => {
        updatePdfPageSize(pdfPageWrapperRef);
        window.addEventListener('resize', () => {
            updatePdfPageSize(pdfPageWrapperRef);
        });
    }, [pdfPagesNum]);

    useEffect(() => {
        updatePdfPageSize(pdfPageWrapperRef);
    }, [pdfPageWrapperRef.current?.clientWidth, fitWidth]);

    const container = useRef<HTMLDivElement>(null);

    return (
        <StyledPdfViewer>
            <Fit onClick={() => setFitWidth(!fitWidth)}>전체보기</Fit>
            <PdfThumbnailList ref={container}>
                <Document file={pdfUrl}>
                    {Array.from({ length: pdfPagesNum }, (el, index) => (
                        <PdfThumbnail
                            key={`page_${index + 1}`}
                            thumbnailPageNumber={index + 1}
                            pageNum={pageNum}
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
                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page
                        pageNumber={pageNum}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        onLoadSuccess={onPageLoadSuccess}
                        width={!fitWidth ? pdfPageSize.width : undefined}
                        height={fitWidth ? pdfPageSize.height : undefined}
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

const Fit = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
`;

export default PdfViewer;
