import { ReactNode } from 'react';
import styled from 'styled-components';

interface PdfThumbnailProps {
    children: ReactNode;
    thumbnailPageNumber: number;
    movePage: (selectedPageNumber: number) => void;
}

const PdfThumbnail = ({ children, thumbnailPageNumber, movePage }: PdfThumbnailProps) => {
    return (
        <StyledPdfThumbnail onClick={() => movePage(thumbnailPageNumber)}>
            <PageNumber>{thumbnailPageNumber}</PageNumber>
            <PageCanvasWrapper>{children}</PageCanvasWrapper>
        </StyledPdfThumbnail>
    );
};

const StyledPdfThumbnail = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: 12px;
`;

const PageNumber = styled.div`
    margin-right: 7px;
    color: #9e9e9e;
`;

const PageCanvasWrapper = styled.div`
    border: 1px solid #c3c3c3;
    border-radius: 8px;
    overflow: hidden;
`;

export default PdfThumbnail;
