import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { IUserRole } from '@/apis/user/user';
import Dropdown from '@/components/commons/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import userSessionAtom from '@/recoil/atoms/userSession';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

export interface Page {
    name: string;
    link: string;
}

const navLinks: { [key in IUserRole]: Page[] } = {
    TEACHER: [
        {
            name: '마이홈',
            link: '/',
        },
        {
            name: '교재관리',
            link: '/review',
        },
    ],
    STUDENT: [
        {
            name: '마이홈',
            link: '/',
        },
        {
            name: '복습하렴',
            link: '/review',
        },
    ],
    GUEST: [],
};

const Header = () => {
    const { open, openDropdown, closeDropdown } = useDropdown();
    const userSession = useRecoilValue(userSessionAtom);
    const router = useRouter();

    const logout = () => {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        deleteCookie('userRole');
        router.reload();
    };

    return (
        <StyledHeader>
            <HeaderWrapper>
                <Nav>
                    <Link href="/find">
                        <Logo src="/images/logo.png" alt="logo" />
                    </Link>
                    {userSession &&
                        navLinks[userSession.role].map((page, index) => (
                            <Link href={page.link} key={`nav_${index}`}>
                                {page.name}
                            </Link>
                        ))}
                </Nav>
                {userSession ? (
                    <User onClick={!open ? openDropdown : undefined}>
                        <Name>{userSession?.name}</Name>
                        <Dropdown open={open} closeDropdown={closeDropdown}>
                            <UserControlBox>
                                <Button>마이페이지</Button>
                                <Button onClick={logout}>로그아웃</Button>
                            </UserControlBox>
                        </Dropdown>
                    </User>
                ) : (
                    <Link href={'/login'}>로그인</Link>
                )}
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
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
    z-index: 1;
`;

const HeaderWrapper = styled.div`
    width: 90%;
    max-width: 1150px;
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

const Name = styled.div``;

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
