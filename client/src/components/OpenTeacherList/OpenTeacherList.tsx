import styled from 'styled-components';
import OpenTeacherCard from './OpenTeacherCard';
import Modal from '@/components/commons/Modal';
import { useModal } from '@/hooks/useModal';
import OpenTeacherIntroduce from '@/components/OpenTeacherIntroduce';

const OpenTeacherList = () => {
    const { open, openModal, closeModal } = useModal();
    return (
        <>
            <Modal open={open} closeModal={closeModal}>
                <OpenTeacherIntroduce />
            </Modal>
            <StyledOpenTeacherList>
                <OpenTeacherCard onClick={openModal} />
                <OpenTeacherCard onClick={openModal} />
                <OpenTeacherCard onClick={openModal} />
                <OpenTeacherCard onClick={openModal} />
                <OpenTeacherCard onClick={openModal} />
                <OpenTeacherCard onClick={openModal} />
                <OpenTeacherCard onClick={openModal} />
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
