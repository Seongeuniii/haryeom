import { ReactNode, RefObject, useRef } from 'react';
import styled from 'styled-components';

interface PdfThumbnailProps {
    children: ReactNode;
    thumbnailPageNumber: number;
    pageNum: number;
    movePage: (selectedPageNumber: number) => void;
}

const PdfThumbnail = ({ children, thumbnailPageNumber, pageNum, movePage }: PdfThumbnailProps) => {
    const item = useRef<HTMLDivElement>(null);

    const scrollToCenter = () => {
        if (!item.current) return;
        item.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <StyledPdfThumbnail
            onClick={() => {
                movePage(thumbnailPageNumber);
                scrollToCenter();
            }}
            ref={item}
        >
            <PageNumber>{thumbnailPageNumber}</PageNumber>
            <PageCanvasWrapper isSelected={thumbnailPageNumber === pageNum}>
                {children}
            </PageCanvasWrapper>
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

const PageCanvasWrapper = styled.div<{ isSelected: boolean }>`
    border: ${({ isSelected, theme }) =>
        isSelected ? `2px solid ${theme.PRIMARY}` : `2px solid ${theme.BORDER_LIGHT}`};
    border-radius: 8px;
    overflow: hidden;
    ${({ isSelected }) => isSelected && 'box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25)'}
`;

export default PdfThumbnail;
