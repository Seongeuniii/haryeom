import styled from 'styled-components';
import HomeworkList from '@/components/HomeworkList';
import { useGetHomeworkList } from '@/queries/useGetHomeworkList';
import { getTextbooks } from '@/apis/tutoring/get-textbooks';
import { ITutoringTextbook } from '@/apis/tutoring/tutoring';
import { useEffect, useState } from 'react';
import TextbookList from './TextbookList';

const LoadClassContent = ({
    content,
    tutoringId,
    loadClassContent,
    closeModal,
}: {
    content: 'textbook' | 'homework';
    tutoringId: number;
    loadClassContent: (contentId: number) => Promise<void>;
    closeModal: () => void;
}) => {
    /**
     * homework
     */
    const { data } = useGetHomeworkList(tutoringId); // TODO: tutoringId

    const handleClickHomeworkCard = async (homeworkId: number) => {
        loadClassContent(homeworkId);
        closeModal();
    };

    /**
     * textbook
     */
    const [books, setBooks] = useState<ITutoringTextbook[]>();

    const handleClickTextbookCard = async (textbookId: number) => {
        loadClassContent(textbookId);
        closeModal();
    };

    const initData = async () => {
        const data = await getTextbooks(tutoringId);
        setBooks(data);
    };
    useEffect(() => {
        initData();
    }, []);

    // TODO : 리팩토링 - 숙제 목록 커스텀 불가능
    return (
        <StyledLoadClassContent>
            <LoadClassContentHeader>
                <Title>{content === 'homework' ? '숙제' : '학습자료'} 불러오기</Title>
                <SubTitle>
                    {content === 'homework' ? '숙제' : '학습자료'}를 불러와서 함께 학습할 수 있어요.
                </SubTitle>
            </LoadClassContentHeader>
            <ContentListWrapper>
                {content === 'homework' && (
                    <HomeworkList
                        homeworkList={data?.homeworkList}
                        handleClickHomeworkCard={handleClickHomeworkCard}
                    />
                )}
                {content === 'textbook' && (
                    <TextbookList
                        textbookList={books}
                        handleClickTextbookCard={handleClickTextbookCard}
                    />
                )}
            </ContentListWrapper>
        </StyledLoadClassContent>
    );
};

const StyledLoadClassContent = styled.div`
    padding: 1.5em;
    border-radius: 1em;
    background-color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
`;

const ContentListWrapper = styled.div`
    min-width: 800px;
    max-width: 1000px;
    padding: 1.5em;
    border-radius: 1em;
    background-color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const LoadClassContentHeader = styled.header`
    display: flex;
    flex-direction: column;
`;

const Title = styled.span`
    padding: 0.6em 0.2em;
    font-size: 20px;
    font-weight: 700;
`;

const SubTitle = styled.span`
    padding: 0 0 1.6em 0.3em;
    font-size: 14px;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

export default LoadClassContent;
