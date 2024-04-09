import styled from 'styled-components';
import useClass from '@/hooks/useClass';
import usePdf from '@/hooks/usePdf';
import PdfViewer from '@/components/PdfViewer';
import { PaintCanvas } from '@/atoms/Canvas';
import DrawingTools from '@/components/DrawingTools';
import ClassContentsType from '@/components/ClassContentsType';
import LoadClassContent from '@/components/LoadClassContent';
import { gerRole } from '@/components/MatchingStage/GetResponse';
import Display from '@/components/icons/Display';
import { IUserRole } from '@/apis/user/user';

interface ClassBoardProps {
    userRole: IUserRole;
    // TODO : 제거
    tutoringScheduleId: number;
    dataChannels: RTCDataChannel[];
    tutoringId: number;
}

const ClassBoard = ({
    userRole,
    tutoringScheduleId,
    dataChannels,
    tutoringId,
}: ClassBoardProps) => {
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

    const {
        myAction,
        peerAction,
        textbook,
        homework,
        homeworkDrawings,

        myWhiteboardCanvasRef,
        myWhiteboardCanvasBackgroundImage,
        myTextbookCanvasRef,
        myTextbookCanvasBackgroundImage,
        myHomeworkCanvasRef,
        setMyTextbookCanvasBackgroundImage,
        setMyHomeworkCanvasBackgroundImage,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        penStyle,

        peerWhiteboardCanvasRef,
        peerWhiteboardCanvasBackgroundImage,
        peerTextbookCanvasRef,
        peerTextbookCanvasBackgroundImage,
        peerHomeworkCanvasRef,
        peerHomeworkCanvasBackgroundImage,
        setPeerTextbookCanvasBackgroundImage,
        handlePeerPointerDown,
        handlePeerPointerMove,
        handlePeerPointerUp,

        watchingSameScreen,
        cleanUpCanvas,
        followPeer,
        changeContents,
        changePenStyle,
        loadTextbook,
        loadHomework,
        saveHomeworkDrawing,
        resetCanvas,

        presentationCanvasRef,
        peerPresentationCanvasRef,
    } = useClass({
        tutoringScheduleId,
        dataChannels,
        selectedPageNumber,
    });

    return (
        <TeachingTools>
            <HelperBar>
                <ClassContentsType
                    changeContents={changeContents}
                    contentType={myAction.content}
                    LoadTextbook={
                        userRole === 'TEACHER'
                            ? ({ closeModal }) =>
                                  LoadClassContent({
                                      content: 'textbook',
                                      tutoringId,
                                      loadClassContent: loadTextbook,
                                      closeModal,
                                  })
                            : undefined
                    }
                    LoadHomework={
                        userRole === 'TEACHER'
                            ? ({ closeModal }) =>
                                  LoadClassContent({
                                      content: 'homework',
                                      tutoringId,
                                      loadClassContent: loadHomework,
                                      closeModal,
                                  })
                            : undefined
                    }
                    textbookName={
                        myAction.content === '학습자료'
                            ? textbook?.textbookName
                            : homework?.textbook.textbookName
                    }
                />
                <Section>
                    <FollowingMode
                        onClick={() => {
                            followPeer();
                            movePage(peerAction.pageNumber);
                        }}
                        isWatching={watchingSameScreen}
                    >
                        <Display />
                    </FollowingMode>
                    <DrawingTools
                        penStyle={penStyle}
                        changePenStyle={changePenStyle}
                        resetCanvas={resetCanvas}
                    />
                </Section>
            </HelperBar>
            <Board>
                <PeerWatchingSameScreen isWatching={watchingSameScreen}>
                    {watchingSameScreen
                        ? `${gerRole(userRole)}이 현재 화면을 보고있어요.`
                        : `${gerRole(userRole)}이 다른 화면을 보고있어요`}
                </PeerWatchingSameScreen>
                {myAction.content === '화이트보드' ? (
                    <WhiteBoard>
                        <PaintCanvas
                            canvasRef={peerWhiteboardCanvasRef}
                            presentationCanvasRef={peerPresentationCanvasRef}
                            handlePointerDown={handlePeerPointerDown}
                            handlePointerMove={handlePeerPointerMove}
                            handlePointerUp={handlePeerPointerUp}
                        />
                        <PaintCanvas
                            canvasRef={myWhiteboardCanvasRef}
                            presentationCanvasRef={presentationCanvasRef}
                            handlePointerDown={handlePointerDown}
                            handlePointerMove={handlePointerMove}
                            handlePointerUp={handlePointerUp}
                        />
                    </WhiteBoard>
                ) : (
                    <>
                        <PdfViewer
                            pdfFile={
                                myAction.content === '학습자료'
                                    ? textbook?.textbookUrl
                                    : homework?.textbook.textbookUrl
                            }
                            selectedPageNumber={selectedPageNumber}
                            totalPagesOfPdfFile={totalPagesOfPdfFile}
                            pdfPageCurrentSize={pdfPageCurrentSize}
                            movePage={(selectedPageNumber) => {
                                myAction.content === '학습자료' &&
                                    cleanUpCanvas(
                                        myTextbookCanvasRef,
                                        setMyTextbookCanvasBackgroundImage
                                    );
                                myAction.content === '숙제' && saveHomeworkDrawing();
                                saveHomeworkDrawing();
                                movePage(selectedPageNumber);
                            }}
                            onDocumentLoadSuccess={onDocumentLoadSuccess}
                            onPageLoadSuccess={onPageLoadSuccess}
                            updatePdfPageCurrentSize={updatePdfPageCurrentSize}
                            ZoomInPdfPageCurrentSize={ZoomInPdfPageCurrentSize}
                            ZoomOutPdfPageCurrentSize={ZoomOutPdfPageCurrentSize}
                            myHomeworkDrawings={homeworkDrawings || {}}
                            startPageNumber={
                                myAction.content === '학습자료'
                                    ? 0
                                    : (homework?.startPage as number)
                            }
                        >
                            <PaintCanvas
                                canvasRef={
                                    myAction.content === '학습자료'
                                        ? peerTextbookCanvasRef
                                        : peerHomeworkCanvasRef
                                }
                                handlePointerDown={handlePeerPointerDown}
                                handlePointerMove={handlePeerPointerMove}
                                handlePointerUp={handlePeerPointerUp}
                            />
                            <PaintCanvas
                                canvasRef={
                                    myAction.content === '학습자료'
                                        ? myTextbookCanvasRef
                                        : myHomeworkCanvasRef
                                }
                                handlePointerDown={handlePointerDown}
                                handlePointerMove={handlePointerMove}
                                handlePointerUp={handlePointerUp}
                            />
                        </PdfViewer>
                    </>
                )}
            </Board>
        </TeachingTools>
    );
};

const FollowingMode = styled.button<{ isWatching: boolean }>`
    width: 40px;
    height: 40px;
    padding-top: 3px;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 100%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    background-color: ${({ theme, isWatching }) => (isWatching ? theme.PRIMARY : '#ff4e4e')};

    svg {
        width: 25px;
        height: 25px;
    }
`;

const Section = styled.div`
    display: flex;
    height: 100%;
    gap: 15px;
`;

const Board = styled.div`
    position: relative;
    width: 93%;
    flex: 0.93;
    overflow: auto;
    display: flex;
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

const TeachingTools = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const HelperBar = styled.div`
    width: 90%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
`;

const WhiteBoard = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 1em;
`;

export default ClassBoard;
