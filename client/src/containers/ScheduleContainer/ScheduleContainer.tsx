import styled from 'styled-components';
import Header from '@/components/Header';
import { Page } from '@/components/Header/Header';
import Modal from '@/components/commons/Modal';
import { useModal } from '@/hooks/useModal';
import Login from '@/components/Login';

interface ScheduleContainerProps {
    navLinks: Page[];
}

const ScheduleContainer = ({ navLinks }: ScheduleContainerProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { open, openModal, closeModal } = useModal();

    return (
        <StyledScheduleContainer>
            <Header navLinks={navLinks}></Header>
            <Modal open={open} closeModal={closeModal}>
                <Login />
            </Modal>
        </StyledScheduleContainer>
    );
};

export const getServerSideProps = () => {
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/find',
                permanent: false,
            },
        };
    }

    const userType = 'student';
    const navLinks: Page[] = [
        { name: '홈', link: '/' },
        { name: '복습하렴', link: '/review' },
        { name: '선생님찾기', link: '/find' },
    ];

    if (userType === 'student') return { props: { navLinks } };
    else return { props: {} };
};

const StyledScheduleContainer = styled.main``;

export default ScheduleContainer;
