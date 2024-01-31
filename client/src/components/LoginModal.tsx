import Link from 'next/link';
import styled from 'styled-components';
import Modal from './commons/Modal';

const LoginModal = () => {
    return (
        <Modal open={true} closeModal={() => {}}>
            <StyledLoginModal>
                <LoginModalHeader>로그인이 필요해요:)</LoginModalHeader>
                <Link href="/login">로그인 하러가기</Link>
                <Link href="/find">선생님 둘러보기</Link>
            </StyledLoginModal>
        </Modal>
    );
};

const StyledLoginModal = styled.div`
    background-color: white;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
`;

const LoginModalHeader = styled.div`
    font-size: 20px;
`;

export default LoginModal;
