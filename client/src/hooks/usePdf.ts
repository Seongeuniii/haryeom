import { RefObject, useEffect, useState } from 'react';
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

interface IUsePdf {
    defaultPageNum?: number;
}

const usePdf = ({ defaultPageNum = 1 }: IUsePdf) => {
    const [pageNum, setPageNum] = useState<number>(defaultPageNum);
    const [pdfPagesNum, setPdfPagesNum] = useState<number>(0);
    const [pdfPageSize, setPdfPageSize] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });
    const [resizeTimer, setResizeTimer] = useState<NodeJS.Timeout>();

    const movePage = (selectedPageNumber: number) => {
        setPageNum(selectedPageNumber);
    };

    const updatePdfPageSize = (pdfPageWrapperRef: RefObject<HTMLDivElement>) => {
        clearTimeout(resizeTimer);
        const timerId = setTimeout(() => {
            if (!pdfPageWrapperRef.current) return;
            const { clientWidth, clientHeight } = pdfPageWrapperRef.current;
            setPdfPageSize({ width: clientWidth, height: clientHeight });
        }, 300);
        setResizeTimer(timerId);
    };

    const onDocumentLoadSuccess = (pdfDocument: PDFDocumentProxy) => {
        const { numPages } = pdfDocument;
        setPdfPagesNum(numPages);
    };

    const onPageLoadSuccess = (pdfPage: PDFPageProxy) => {
        const viewport = pdfPage.getViewport({ scale: 1 });
        // width, height -> canvas 저장 사이즈
    };

    return {
        pdfPagesNum,
        pdfPageSize,
        pageNum,
        onDocumentLoadSuccess,
        onPageLoadSuccess,
        movePage,
        updatePdfPageSize,
    };
};

export default usePdf;
