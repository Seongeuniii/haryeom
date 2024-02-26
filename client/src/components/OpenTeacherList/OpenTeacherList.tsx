import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import OpenTeacherCard from './OpenTeacherCard';
import Modal from '@/components/commons/Modal';
import OpenTeacherIntroduce from '@/components/OpenTeacherIntroduce';
import { IOpenTeacher } from '@/apis/matching/matching';
import { useGetOpenTeacherDetail } from '@/queries/useGetOpenTeacherDetail';
import { useModal } from '@/hooks/useModal';
import useChat from '@/hooks/useChat';

interface OpenTeacherListProps {
    openTeacherList: IOpenTeacher[] | undefined;
    lastItemRef: RefObject<HTMLDivElement>;
}

const OpenTeacherList = ({ openTeacherList, lastItemRef }: OpenTeacherListProps) => {
    const { startChat } = useChat();
    const { open, openModal, closeModal } = useModal();
    const [selectedOpenTeacherId, setSelectedOpenTeacherId] = useState<number | undefined>();
    const { data: openTeacherDetail } = useGetOpenTeacherDetail(selectedOpenTeacherId);

    return (
        <>
            <Modal open={open} closeModal={closeModal}>
                {selectedOpenTeacherId && (
                    <OpenTeacherIntroduce
                        openTeacherDetail={openTeacherDetail}
                        startChat={() => startChat(selectedOpenTeacherId)}
                    />
                )}
            </Modal>
            <StyledOpenTeacherList>
                {openTeacherList ? (
                    <>
                        <InfiniteScrollList>
                            {openTeacherList.map((openTeacher, index) => {
                                return (
                                    <OpenTeacherCard
                                        openTeacher={openTeacher}
                                        onClick={() => {
                                            openModal();
                                            setSelectedOpenTeacherId(openTeacher.teacherId);
                                        }}
                                        key={`open_teacher_${index}`}
                                    />
                                );
                            })}
                        </InfiniteScrollList>
                        <LastItem ref={lastItemRef} />
                    </>
                ) : (
                    <NoOpenTeacher>매칭 가능한 선생님이 없어요:)</NoOpenTeacher>
                )}
            </StyledOpenTeacherList>
        </>
    );
};

const StyledOpenTeacherList = styled.div`
    width: 100%;
    padding: 1.2em 1em 3em 1em;
    overflow: scroll;
`;

const InfiniteScrollList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14em, 1fr));
    gap: 2.2em;
`;

const LastItem = styled.div`
    width: 100%;
    height: 1px;
`;

const NoOpenTeacher = styled.div`
    width: 100%;
    height: 100%;
    padding: 3em;
    text-align: center;
    font-weight: 500;
`;

export default OpenTeacherList;
