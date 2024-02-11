import styled from 'styled-components';
import Link from 'next/link';
import { IHomeworkList, IHomeworkStatus } from '@/apis/homework/homework';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import { ITutoringTextbook } from '@/apis/tutoring/tutoring';

interface TextbookListProps {
    textbookList: ITutoringTextbook[];
}

const TextbookList = ({ textbookList }: TextbookListProps) => {
    const userSession = useRecoilValue(userSessionAtom);

    return (
        <StyledTextbookList>
            <TextbookCards>
                {textbookList && textbookList.length > 0 ? (
                    textbookList.map((textbook, index) => (
                        <Link href={`textbook`} key={`textbook${index}`}>
                            <TextbookCard>
                                {textbook.firstPageCover && (
                                    <BookCover>
                                        <img src={textbook.coverImg} alt="book_cover" />
                                    </BookCover>
                                )}
                                <BookName>{textbook.textbookName}</BookName>
                            </TextbookCard>
                        </Link>
                    ))
                ) : (
                    <NoTextbook>숙제가 없어요.</NoTextbook>
                )}
            </TextbookCards>
        </StyledTextbookList>
    );
};

const StyledTextbookList = styled.div`
    width: 100%;
    height: 100%;
`;

const TextbookCards = styled.div`
    width: 100%;
    min-width: 700px;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1.7em;
    overflow-x: scroll;
`;

const TextbookCard = styled.div`
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    border-radius: 0.5em;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const BookCover = styled.div`
    width: 100%;
    overflow: hidden;

    img {
        width: 100%;
        min-width: 100%;
        min-height: 300px;
        background-color: ${({ theme }) => theme.SECONDARY};
        object-fit: cover;
    }
`;

const BookName = styled.span`
    width: 100%;
    padding: 1em;
`;

const NoTextbook = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

export default TextbookList;
