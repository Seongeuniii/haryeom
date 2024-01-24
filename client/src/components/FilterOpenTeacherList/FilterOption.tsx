import styled from 'styled-components';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '../commons/Dropdown';
import { ReactNode } from 'react';

interface FilterOptionProps {
    filterOptionName: string;
    Icon: () => JSX.Element;
    InputBox?: (children: ReactNode) => JSX.Element;
}

const FilterOption = ({ filterOptionName, Icon, InputBox }: FilterOptionProps) => {
    const { open, openDropdown, closeDropdown } = useDropdown();

    return (
        <StyledFilterOption onClick={!open ? openDropdown : undefined}>
            <IconWrapper>
                <Icon />
            </IconWrapper>
            <FilterOptionName>{filterOptionName}</FilterOptionName>
            {InputBox && (
                <Dropdown open={open} closeDropdown={closeDropdown} top="0em" left="1em">
                    {InputBox(
                        <InputBoxHeader>
                            <IconWrapper>
                                <Icon />
                            </IconWrapper>
                            <FilterOptionName>{filterOptionName}</FilterOptionName>
                        </InputBoxHeader>
                    )}
                </Dropdown>
            )}
        </StyledFilterOption>
    );
};

const StyledFilterOption = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 1.5em;
    border-right: 2px solid ${({ theme }) => theme.LIGHT_BLACK};
    font-size: 1em;

    &:last-child {
        border-right: none;
    }
`;

const IconWrapper = styled.div`
    width: 1.5em;
    text-align: end;
    margin-right: 0.6em;
    padding-top: 0.1em;
    cursor: pointer;
`;

const FilterOptionName = styled.span`
    white-space: nowrap;
    cursor: pointer;
`;

const InputBoxHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0em 1em 0.6em 0.5em;
    margin-bottom: 0.3em;
    font-size: 1.1em;
    font-weight: bold;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

export default FilterOption;
