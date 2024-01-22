import { ReactNode } from 'react';
import styled from 'styled-components';

interface DropdownnProps {
    children: ReactNode;
    open: boolean;
    closeDropdown: () => void;
}

const Dropdown = ({ children, ...props }: DropdownnProps) => {
    const { open, closeDropdown } = props;

    return (
        <StyledDropDown>
            <DropdownWrapper open={open}>{children}</DropdownWrapper>
            <DropdownBackground open={open} onClick={closeDropdown} />
        </StyledDropDown>
    );
};

const StyledDropDown = styled.div``;

const DropdownWrapper = styled.div<{ open: boolean }>`
    ${({ open }) => !open && `display:none;`}
    position: absolute;
    top: 2em;
    left: 50%;
    transform: translate(-50%, 0);
    width: min-content;
    height: min-content;
    z-index: 100;
`;

const DropdownBackground = styled.div<{ open: boolean }>`
    ${({ open }) => !open && `display:none;`}
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

export default Dropdown;
