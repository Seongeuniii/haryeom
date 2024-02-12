import { MouseEvent, ReactNode, useRef } from 'react';
import styled from 'styled-components';
import Check from '@/components/icons/Check';

interface PdfThumbnailProps {
    pageNumber: number;
    selectedPageNumber: number;
    startPageNumber: number;
    movePage: (selectedPageNumber: number) => void;
    homeworkStatus?: 'done' | 'inProgress' | 'notStart';
    children: ReactNode;
}

const PdfThumbnail = ({
    children,
    pageNumber,
    startPageNumber,
    selectedPageNumber,
    movePage,
    homeworkStatus,
}: PdfThumbnailProps) => {
    const item = useRef<HTMLDivElement>(null);

    const scrollToCenter = () => {
        if (!item.current) return;
        item.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const saveHomework = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // movePage()
    };

    return (
        <StyledPdfThumbnail
            ref={item}
            onClick={() => {
                movePage(pageNumber);
                scrollToCenter();
            }}
        >
            <PageNumber>{startPageNumber + pageNumber - 1}</PageNumber>
            <PageCanvasWrapper $isSelected={pageNumber === selectedPageNumber}>
                {children}
                {homeworkStatus && (
                    <HomeworkStatus onClick={(e: MouseEvent<HTMLButtonElement>) => saveHomework(e)}>
                        {homeworkStatus === 'done' && <Check.Done />}
                        {homeworkStatus === 'inProgress' && <Check.InProgress />}
                        {homeworkStatus === 'notStart' && <Check.NotStart />}
                    </HomeworkStatus>
                )}
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

const PageCanvasWrapper = styled.div<{ $isSelected: boolean }>`
    position: relative;
    border: ${({ $isSelected, theme }) =>
        $isSelected ? `2px solid ${theme.PRIMARY}` : `1px solid ${theme.BORDER_LIGHT}`};
    border-radius: 8px;
    overflow: hidden;
    ${({ $isSelected }) => $isSelected && 'box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25)'}
`;

const HomeworkStatus = styled.button`
    position: absolute;
    width: 20px;
    height: 20px;
    top: 5px;
    left: 5px;
`;

export default PdfThumbnail;
