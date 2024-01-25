import { ReactNode } from 'react';
import styled from 'styled-components';
import { IOptionValue } from './FilterOpenTeacherList';

interface SelectOptionBoxProps {
    children: ReactNode;
    optionValues: IOptionValue[];
    handleSelectOption: (optionValue: IOptionValue, index: number) => void;
}

const SelectOptionBox = ({ children, optionValues, handleSelectOption }: SelectOptionBoxProps) => {
    return (
        <StyledSelectOptionValuBox>
            {children}
            {optionValues.map((optionValue: IOptionValue, index: number) => {
                return (
                    <Option
                        key={`filterOptions_${index}`}
                        onClick={() => handleSelectOption(optionValue, index)}
                        selected={optionValue.selected}
                    >
                        {optionValue.label}
                    </Option>
                );
            })}
        </StyledSelectOptionValuBox>
    );
};

const StyledSelectOptionValuBox = styled.div`
    min-width: 100px;
    max-height: 30em;
    height: 100%;
    padding: 1em;
    background-color: white;
    border-radius: 0.6em;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
`;

const Option = styled.button<{ selected: boolean }>`
    margin: 0.3em 0;
    padding: 0.4em;
    border-radius: 0.4em;
    text-align: left;
    ${({ selected, theme }) => selected && ` background-color: ${theme.PRIMARY_LIGHT}`};

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
        transition: all 0.3s;
    }
`;

export default SelectOptionBox;
