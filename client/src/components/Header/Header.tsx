import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import DropDown from '@/components/commons/DropDown';

export interface Page {
    name: string;
    link: string;
}

interface HeaderProps {
    navLinks: Page[];
}

const Header = ({ navLinks }: HeaderProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClickUser = () => {
        setOpen(!open);
    };

    return (
        <StyledHeader>
            <HeaderWrapper>
                <Nav>
                    <Link href="/">
                        <Logo>하렴</Logo>
                    </Link>
                    {navLinks.map((page, index) => (
                        <Link href={page.link} key={`nav_${index}`}>
                            {page.name}
                        </Link>
                    ))}
                </Nav>
                <User onClick={handleClickUser}>
                    <span>김성은</span>
                    {open && (
                        <DropDown>
                            <UserControlBox>
                                <Button>마이페이지</Button>
                                <Button>로그아웃</Button>
                            </UserControlBox>
                        </DropDown>
                    )}
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
    background-color: ${({ theme }) => theme.WHITE};
    background-color: ${({ theme }) => theme.BACKGROUND};
`;

const HeaderWrapper = styled.div`
    width: 90%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.div`
    font-size: 1.6em;
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 2em;
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
