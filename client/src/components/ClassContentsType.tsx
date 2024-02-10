import styled from 'styled-components';
import Button from '@/components/commons/Button';
import Drawing from '@/components/icons/Drawing';
import ClassContents from '@/components/icons/ClassContents';
import Homework from '@/components/icons/Homework';
import Dropdown from '@/components/commons/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import { ContentsType } from '@/hooks/useClass';
import HomeworkList from '@/components/HomeworkList';
import Modal from '@/components/commons/Modal';
import { useModal } from '@/hooks/useModal';

const contentsIcon = {
    빈페이지: <Drawing />,
    학습자료: <ClassContents />,
    숙제: <Homework />,
};

interface ClassContentsType {
    contentType: ContentsType;
    changeContents: (type: ContentsType) => void;
    LoadHomework?: (closeModal: () => void) => React.JSX.Element;
    LoadTextbook?: (closeModal: () => void) => React.JSX.Element;
    textbookName: string;
}

const ClassContentsType = ({
    contentType,
    changeContents,
    LoadHomework,
    LoadTextbook,
    textbookName,
}: ClassContentsType) => {
    const { open, openDropdown, closeDropdown } = useDropdown();
    const {
        open: isOpenLoadHomework,
        openModal: openLoadHomework,
        closeModal: closeLoadHomework,
    } = useModal();
    const { open: isOpenTextbook, openModal: openTextbook, closeModal: closeTextbook } = useModal();

    return (
        <>
            {LoadTextbook && (
                <Modal open={isOpenTextbook} closeModal={closeTextbook}>
                    {LoadTextbook(closeTextbook)}
                </Modal>
            )}
            {LoadHomework && (
                <Modal open={isOpenLoadHomework} closeModal={closeLoadHomework}>
                    {LoadHomework(closeLoadHomework)}
                </Modal>
            )}
            <StyledClassContentsType>
                <ContentButtons>
                    <Button
                        content={contentsIcon[contentType]}
                        onClick={openDropdown}
                        width="30px"
                        height="30px"
                        padding="5px"
                        $borderRadius="100%"
                    />
                    <Dropdown open={open} closeDropdown={closeDropdown} top="43px">
                        <SelectContentButtons>
                            <Button
                                content={contentsIcon.빈페이지}
                                onClick={() => {
                                    changeContents('빈페이지');
                                    closeDropdown();
                                }}
                                width="30px"
                                height="30px"
                                padding="5px"
                                $borderRadius="100%"
                            />
                            <Button
                                content={contentsIcon.학습자료}
                                onClick={() => {
                                    changeContents('학습자료');
                                    closeDropdown();
                                }}
                                width="30px"
                                height="30px"
                                padding="5px"
                                $borderRadius="100%"
                            />
                            <Button
                                content={contentsIcon.숙제}
                                onClick={() => {
                                    changeContents('숙제');
                                    closeDropdown();
                                }}
                                width="30px"
                                height="30px"
                                padding="5px"
                                $borderRadius="100%"
                            />
                        </SelectContentButtons>
                    </Dropdown>
                </ContentButtons>
                <ContentInfo>
                    {contentType === '빈페이지' && (
                        <>
                            <ContentType>화이트보드</ContentType>
                        </>
                    )}
                    {contentType === '학습자료' && (
                        <>
                            <ContentType onClick={LoadTextbook ? openTextbook : undefined}>
                                학습자료
                            </ContentType>
                            <ContentName>{textbookName}</ContentName>
                        </>
                    )}
                    {contentType === '숙제' && (
                        <>
                            <ContentType onClick={LoadHomework ? openLoadHomework : undefined}>
                                숙제
                            </ContentType>
                            {/* <ContentName>24. 01. 24 (금) | 수능특강 영어 (p.21 ~ 23)</ContentName> */}
                            <UploadNewContent>불러오기</UploadNewContent>
                        </>
                    )}
                </ContentInfo>
            </StyledClassContentsType>
        </>
    );
};

const StyledClassContentsType = styled.div`
    display: flex;
    align-items: center;
`;

const ContentButtons = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 100%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const SelectContentButtons = styled.div`
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 0.5em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const ContentInfo = styled.div`
    margin-left: 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
`;

const ContentType = styled.div`
    margin-right: 10px;
    padding: 7px;
    border-radius: 1em;
    background-color: ${({ theme }) => theme.PRIMARY};
    color: white;
    cursor: pointer;
`;

const ContentName = styled.span``;

const UploadNewContent = styled.div`
    color: ${({ theme }) => theme.LIGHT_BLACK};
    text-decoration: underline;
    cursor: pointer;
`;

export default ClassContentsType;