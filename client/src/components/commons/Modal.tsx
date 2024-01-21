import { ReactNode } from 'react';
import styled from 'styled-components';
import Close from '@/components/icons/Close';

interface ModalProps {
    children: ReactNode;
    open: boolean;
    closeModal: () => void;
}

const Modal = ({ children, ...props }: ModalProps) => {
    const { open, closeModal } = props;

    return (
        <StyledModal>
            <ModalWrapper open={open}>
                <ModalCloseButton onClick={closeModal}>
                    <Close />
                </ModalCloseButton>
                {children}
            </ModalWrapper>
            <ModalBackground open={open} onClick={closeModal} />
        </StyledModal>
    );
};

const StyledModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

const ModalWrapper = styled.div<{ open: boolean }>`
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(128 128 128 / 39%);
`;

const ModalCloseButton = styled.button`
    position: absolute;
    right: 1.5em;
    top: 1.5em;
    width: 15px;
    height: 15px;
`;

export default Modal;
