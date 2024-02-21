import { useState } from 'react';
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
}

const OpenTeacherList = ({ openTeacherList }: OpenTeacherListProps) => {
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
                    openTeacherList.map((openTeacher, index) => {
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
                    })
                ) : (
                    <>매칭 가능한 선생님이 없어요:)</>
                )}
            </StyledOpenTeacherList>
        </>
    );
};

const StyledOpenTeacherList = styled.div`
    width: 100%;
    padding: 1.2em 1em 3em 1em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14em, 1fr));
    gap: 2.2em;
    overflow: scroll;
`;

export default OpenTeacherList;
