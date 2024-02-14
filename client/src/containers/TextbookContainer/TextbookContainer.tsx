import { ITextbook } from '@/apis/homework/homework';
import { getTextbookDetail } from '@/apis/tutoring/get-textbook-detail';
import PdfViewer from '@/components/PdfViewer';
import TextbookLayout from '@/components/layouts/TextbookLayout';
import usePdf from '@/hooks/usePdf';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';

interface TextbookContainerProps {
    textbookData: ITextbook;
}

const TextbookContainer = ({ textbookData }: TextbookContainerProps) => {
    if (!textbookData) return <div>...loading</div>; // TODO : 리팩토링

    const {
        totalPagesOfPdfFile,
        selectedPageNumber,
        pdfPageCurrentSize,
        onDocumentLoadSuccess,
        onPageLoadSuccess,
        movePage,
        updatePdfPageCurrentSize,
        ZoomInPdfPageCurrentSize,
        ZoomOutPdfPageCurrentSize,
    } = usePdf({
        initialSelectedPageNumer: 1,
    });

    return (
        <TextbookLayout textbookData={textbookData}>
            <StyledTextbookContainer>
                <Board>
                    <PdfViewer
                        pdfFile={textbookData.textbookUrl}
                        selectedPageNumber={selectedPageNumber}
                        totalPagesOfPdfFile={totalPagesOfPdfFile}
                        pdfPageCurrentSize={pdfPageCurrentSize}
                        movePage={movePage}
                        onDocumentLoadSuccess={onDocumentLoadSuccess}
                        onPageLoadSuccess={onPageLoadSuccess}
                        updatePdfPageCurrentSize={updatePdfPageCurrentSize}
                        ZoomInPdfPageCurrentSize={ZoomInPdfPageCurrentSize}
                        ZoomOutPdfPageCurrentSize={ZoomOutPdfPageCurrentSize}
                        myHomeworkDrawings={[]}
                        startPageNumber={1}
                    />
                </Board>
            </StyledTextbookContainer>
        </TextbookLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const textbookId = context.params?.id as string;

    if (!textbookId) {
        return { props: { textbookData: null } };
    }

    const textbookData = await getTextbookDetail(parseInt(textbookId));

    return { props: { textbookData } };
};

const StyledTextbookContainer = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Board = styled.div`
    position: relative;
    width: 100%;
    overflow: auto;
    display: flex;
`;

export default TextbookContainer;
