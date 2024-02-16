import { ReactNode } from 'react';
import styled from 'styled-components';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '@/components/commons/Dropdown';

interface FilterOptionProps {
    label: string;
    Icon: () => JSX.Element;
    InputBox?: (children: ReactNode) => JSX.Element;
}

const FilterOption = ({ label, Icon, InputBox }: FilterOptionProps) => {
    const { open, openDropdown, closeDropdown } = useDropdown();

    return (
        <StyledFilterOption onClick={!open ? openDropdown : undefined}>
            <IconWrapper>{Icon()}</IconWrapper>
            <FilterOptionLabel>{label}</FilterOptionLabel>
            {InputBox && (
                <Dropdown open={open} closeDropdown={closeDropdown} top="0em" left="1em">
                    {InputBox(
                        <InputBoxHeader>
                            <IconWrapper>{Icon()}</IconWrapper>
                            <FilterOptionLabel>{label}</FilterOptionLabel>
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

const FilterOptionLabel = styled.span`
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
    background-color: white;
`;

export default FilterOption;
