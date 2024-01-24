import { ReactNode } from 'react';
import styled from 'styled-components';

interface InputTextOptionBoxProps {
    children: ReactNode;
    minMax: string;
    unit: string;
}

const InputTextOptionBox = ({ children, minMax, unit }: InputTextOptionBoxProps) => {
    return (
        <StyledInputValueBox>
            {children}
            <InputWrapper>
                {minMax}
                <Input type="text" />
                {unit}
            </InputWrapper>
        </StyledInputValueBox>
    );
};

const StyledInputValueBox = styled.div`
    max-width: 20em;
    max-height: 30em;
    height: 100%;
    padding: 1em;
    background-color: white;
    border-radius: 0.6em;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
`;

const InputWrapper = styled.div`
    padding: 1em 1em 0.5em 1em;
`;

const Input = styled.input`
    margin-left: 1em;
    width: 2em;
    outline: none;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

export default InputTextOptionBox;
