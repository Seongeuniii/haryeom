import { useState } from 'react';
import styled from 'styled-components';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfThumbnail from './PdfThumbnail';
import { useIntersect } from '@/hooks/useIntersect';
import { IHomeworkStatus } from '@/containers/HomeworkContainer/HomeworkContainer';

interface PdfThumbnailListProps {
    pdfFile: string | undefined;
    totalPagesOfPdfFile: number;
    startPageNumber: number;
    selectedPageNumber: number;
    movePage: (selectedPageNumber: number) => void;
    homeworkStatus?: IHomeworkStatus | undefined;
}

const PdfThumbnailList = ({
    pdfFile,
    totalPagesOfPdfFile,
    startPageNumber,
    selectedPageNumber,
    movePage,
    homeworkStatus,
}: PdfThumbnailListProps) => {
    const [renderedThumbnailLength, setRenderedThumbnailLength] = useState<number>(10);

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
        <StyledPdfThumbnailList>
            <Document file={pdfFile}>
                {Array.from({ length: renderedThumbnailLength }, (el, index) => (
                    <PdfThumbnail
                        key={`page_${index + 1}`}
                        startPageNumber={startPageNumber}
                        pageNumber={index + 1}
                        selectedPageNumber={selectedPageNumber}
                        movePage={movePage}
                        homeworkStatus={homeworkStatus}
                    >
                        <Page
                            pageNumber={index + 1}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            width={70}
                        />
                    </PdfThumbnail>
                ))}
                <LastItem ref={lastItemRef} />
            </Document>
        </StyledPdfThumbnailList>
    );
};

const StyledPdfThumbnailList = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    width: 108px;
    height: 100%;
    margin-right: 8px;
    margin: 1em 0;

    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const LastItem = styled.div`
    width: 100%;
    height: 1px;
`;

export default PdfThumbnailList;
