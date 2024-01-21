import { ReactNode } from 'react';
import styled from 'styled-components';

interface DropDownProps {
    children: ReactNode;
}

const DropDown = ({ children }: DropDownProps) => {
    return <StyledDropDown>{children}</StyledDropDown>;
};

const StyledDropDown = styled.div`
    position: absolute;
    top: 2em;
    right: 0%;
    width: min-content;
    height: min-content;
`;

export default DropDown;
