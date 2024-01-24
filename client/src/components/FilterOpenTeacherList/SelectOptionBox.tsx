import { ReactNode, useState } from 'react';
import styled from 'styled-components';

interface SelectOptionBoxProps {
    children: ReactNode;
    optionValues: string[];
    multiple: boolean;
}

const SelectOptionBox = ({ children, optionValues, multiple }: SelectOptionBoxProps) => {
    const [options, setOptions] = useState(
        optionValues.map((optionValue) => ({ name: optionValue, selected: false }))
    );

    const selectOption = (selectedOptionIndex: number) => {
        if (multiple) {
            const newOptions = [...options];
            newOptions[selectedOptionIndex].selected = !newOptions[selectedOptionIndex].selected;
            setOptions(newOptions);
        } else {
            const newOptions = options.map((option, idx) => {
                if (selectedOptionIndex === idx) {
                    return {
                        name: option.name,
                        selected: !options[selectedOptionIndex].selected,
                    };
                }
                return {
                    name: option.name,
                    selected: false,
                };
            });
            setOptions(newOptions);
        }
    };

    return (
        <StyledSelectOptionValuBox>
            {children}
            {options.map((option, index) => {
                return (
                    <Option
                        key={`filterOptions_${index}`}
                        onClick={() => selectOption(index)}
                        selected={option.selected}
                    >
                        {option.name}
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
