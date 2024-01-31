import styled from 'styled-components';
import OpenTeacherCard from './OpenTeacherCard';
import Modal from '@/components/commons/Modal';
import { useModal } from '@/hooks/useModal';
import OpenTeacherIntroduce from '@/components/OpenTeacherIntroduce';
import { IOpenTeacher } from '@/apis/matching/matching';
import { useEffect, useState } from 'react';

interface OpenTeacherListProps {
    openTeacherList: IOpenTeacher[];
}

const OpenTeacherList = ({ openTeacherList }: OpenTeacherListProps) => {
    const { open, openModal, closeModal } = useModal();

    return (
        <>
            <Modal open={open} closeModal={closeModal}>
                <OpenTeacherIntroduce />
            </Modal>
            <StyledOpenTeacherList>
                {openTeacherList ? (
                    openTeacherList.map((openTeacher, index) => {
                        return (
                            <OpenTeacherCard
                                openTeacher={openTeacher}
                                onClick={() => openModal()}
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
