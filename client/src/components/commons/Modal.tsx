import { ReactNode } from 'react';
import styled from 'styled-components';

interface ModalProps {
    children: ReactNode;
    open: boolean;
    closeModal: () => void;
}

const Modal = ({ children, ...props }: ModalProps) => {
    const { open, closeModal } = props;

    return (
        <>
            <StyledModal open={open}>
                <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
                {children}
            </StyledModal>
            <ModalBackground open={open} onClick={closeModal} />
        </>
    );
};

const StyledModal = styled.div<{ open: boolean }>`
    ${({ open }) => !open && `display:none;`}
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    z-index: 100;
`;

const ModalBackground = styled.div<{ open: boolean }>`
    ${({ open }) => !open && `display:none;`}
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(128 128 128 / 39%);
`;

const ModalCloseButton = styled.button`
    position: absolute;
    right: 1em;
    top: 1em;
`;

export default Modal;
