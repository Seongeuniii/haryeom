import Link from 'next/link';
import styled from 'styled-components';
import { IUserRole } from '@/apis/user/user';
import Dropdown from '@/components/commons/Dropdown';
import useDropdown from '@/hooks/useDropdown';

export interface Page {
    name: string;
    link: string;
}

const navLinks: { [key in IUserRole]: Page[] } = {
    teacher: [
        {
            name: '마이홈',
            link: '/',
        },
        {
            name: '교재관리',
            link: '/review',
        },
    ],
    student: [
        {
            name: '마이홈',
            link: '/',
        },
        {
            name: '복습하렴',
            link: '/review',
        },
    ],
    guest: [],
};

const testUserRole = 'student';

const Header = () => {
    const { open, openDropdown, closeDropdown } = useDropdown();

    return (
        <StyledHeader>
            <HeaderWrapper>
                <Nav>
                    <Link href="/find">
                        <Logo src="/images/logo.png" alt="logo" />
                    </Link>
                    {navLinks[testUserRole].map((page, index) => (
                        <Link href={page.link} key={`nav_${index}`}>
                            {page.name}
                        </Link>
                    ))}
                </Nav>
                <User onClick={!open ? openDropdown : closeDropdown}>
                    <span>김성은</span>
                    <Dropdown open={open} closeDropdown={closeDropdown}>
                        <UserControlBox>
                            <Button>마이페이지</Button>
                            <Button>로그아웃</Button>
                        </UserControlBox>
                    </Dropdown>
                </User>
            </HeaderWrapper>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 4em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    background-color: ${({ theme }) => theme.BACKGROUND};
    z-index: 100;
`;

const HeaderWrapper = styled.div`
    width: 90%;
    max-width: 1300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.img`
    width: 80px;
    height: 40px;
    margin-right: 1em;
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 1.6em;
`;

const User = styled.button`
    position: relative;
`;

const UserControlBox = styled.div`
    width: 6em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 0.3em;
    gap: 5px;
    padding: 0.4em 0.3em;
`;

const Button = styled.div`
    font-size: 12px;
    width: 100%;
    height: 30px;
    border-radius: 0.2em;
    padding-top: 7px;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
        transition: all 0.5s;
    }
`;

export default Header;
