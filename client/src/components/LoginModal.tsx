import Link from 'next/link';
import styled from 'styled-components';
import Modal from './commons/Modal';
import ServiceImg from '@/components/icons/ServiceImg';

const LoginModal = () => {
    return (
        <Modal open={true} closeModal={() => {}}>
            <StyledLoginModal>
                <LoginModalHeader>하렴 서비스를 이용하려면 로그인이 필요해요</LoginModalHeader>
                <ServiceImg />
                <Link href="/logindemo">2월 8일 테스트를 위한 계정입니다.</Link>
                <Link href="/login">로그인 하러가기</Link>
                <Link href="/find">선생님 둘러보기</Link>
            </StyledLoginModal>
        </Modal>
    );
};

// const StyledLoginModal = styled.div`
//     background-color: white;
//     width: 200px;
//     height: 200px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 1em;
// `;

const LoginModalHeader = styled.div`
    font-size: 24px;
`;

const StyledLoginModal = styled.div`
    background-color: white;
    width: 50vw;
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3em 0;
    gap: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

    a {
        padding: 10px 20px;
        background-color: ${({ theme }) => theme.PRIMARY};
        color: white;
        border-radius: 20px;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s;

        &:hover {
            background-color: ${({ theme }) => theme.BACKGROUND};
        }
    }
`;

export default LoginModal;
