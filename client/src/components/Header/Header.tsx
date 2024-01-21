import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { IUserRole } from '@/apis/user/user';

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
    const handleClickUser = () => {};

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
                <User onClick={handleClickUser}>김성은</User>
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

const User = styled.button``;

export default Header;
