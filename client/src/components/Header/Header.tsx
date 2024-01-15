import { NextPage } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

export interface Page {
    name: string;
    link: string;
}

interface HeaderProps {
    navLinks: Page[];
}

const Header = ({ navLinks }: HeaderProps) => {
    const handleClickUser = () => {};

    return (
        <StyledHeader>
            <HeaderWrapper>
                <Nav>
                    <Link href="/">
                        <Logo>하렴</Logo>
                    </Link>
                    {navLinks.map((page) => (
                        <Link href={page.link}>{page.name}</Link>
                    ))}
                </Nav>
                <User onClick={handleClickUser}>김성은</User>
            </HeaderWrapper>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    position: sticky;
    width: 100%;
    height: 3.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
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

const User = styled.button``;

export default Header;
