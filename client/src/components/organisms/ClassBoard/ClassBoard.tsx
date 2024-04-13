import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PdfViewer from '@/components/PdfViewer';
import usePdf from '@/hooks/usePdf';
import { IMyHomeworkDrawings } from '@/containers/HomeworkContainer/HomeworkContainer';
import { IHomework, ITextbook } from '@/apis/homework/homework';

type ContentsType = '화이트보드' | '학습자료' | '숙제';
interface ClassBoardProps {
    children: React.ReactNode;
    ContentsType: ContentsType;
}

const ClassBoard = ({ children, ContentsType }: ClassBoardProps) => {
    const {
        totalPagesOfPdfFile,
        selectedPageNumber,
        pdfPageCurrentSize,
        pdfPageOriginalSize,
        onDocumentLoadSuccess,
        onPageLoadSuccess,
        movePage,
        updatePdfPageCurrentSize,
        ZoomInPdfPageCurrentSize,
        ZoomOutPdfPageCurrentSize,
    } = usePdf({
        initialSelectedPageNumer: 1,
    });

    const [textbook, setTextbook] = useState<ITextbook>();
    const [homework, setHomework] = useState<IHomework>();

    const [homeworkDrawings, setHomeworkDrawings] = useState<IMyHomeworkDrawings>();

    useEffect(() => {
        if (!homework) return;
        setHomeworkDrawings(
            homework.drawings.reduce((acc, { page, homeworkDrawingUrl }) => {
                acc[page] = homeworkDrawingUrl;
                return acc;
            }, {} as IMyHomeworkDrawings)
        );
    }, [homework, setHomeworkDrawings]);

    return (
        <StyledClassBoard>
            <PeerWatchingSameScreen isWatching={true}>
                {/* {isWatching
                        ? `${gerRole(isTeacher ? 'TEACHER' : 'STUDENT')}이 현재 화면을 보고있어요.`
                        : `${gerRole(isTeacher ? 'TEACHER' : 'STUDENT')}이 다른 화면을 보고있어요`} */}
                선생님이 현재 화면을 보고있어요
            </PeerWatchingSameScreen>
            {ContentsType === '화이트보드' ? (
                <WhiteBoard>{children}</WhiteBoard>
            ) : (
                <PdfViewer
                    pdfFile={
                        ContentsType === '학습자료'
                            ? textbook?.textbookUrl
                            : homework?.textbook.textbookUrl
                    }
                    selectedPageNumber={selectedPageNumber}
                    totalPagesOfPdfFile={totalPagesOfPdfFile}
                    pdfPageCurrentSize={pdfPageCurrentSize}
                    movePage={(selectedPageNumber) => {}}
                    onDocumentLoadSuccess={onDocumentLoadSuccess}
                    onPageLoadSuccess={onPageLoadSuccess}
                    updatePdfPageCurrentSize={updatePdfPageCurrentSize}
                    ZoomInPdfPageCurrentSize={ZoomInPdfPageCurrentSize}
                    ZoomOutPdfPageCurrentSize={ZoomOutPdfPageCurrentSize}
                    myHomeworkDrawings={homeworkDrawings || {}}
                    startPageNumber={0}
                >
                    {children}
                </PdfViewer>
            )}
        </StyledClassBoard>
    );
};

const StyledClassBoard = styled.div`
    position: relative;
    width: 93%;
    flex: 0.93;
    overflow: auto;
    display: flex;
`;

const WhiteBoard = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 1em;
`;

const PeerWatchingSameScreen = styled.div<{ isWatching: boolean }>`
    position: absolute;
    top: 25px;
    left: 50%;
    padding: 0.7em 1.2em;
    transform: translate(-50%, -50%);
    border-radius: 2em;
    background-color: ${({ theme, isWatching }) => (isWatching ? theme.PRIMARY : '#ff4e4e')};
    color: white;
    font-size: 11px;
    z-index: 3;
`;

export default ClassBoard;
