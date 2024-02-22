import { ReactNode } from 'react';
import styled from 'styled-components';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '@/components/commons/Dropdown';

interface FilterOptionProps {
    label: string;
    Icon?: () => JSX.Element;
    InputOptionBox?: (children: ReactNode) => JSX.Element;
}

const FilterOption = ({ label, Icon, InputOptionBox }: FilterOptionProps) => {
    const { open, openDropdown, closeDropdown } = useDropdown();

    const filterTitle = (
        <FilterTitle>
            {Icon && <IconWrapper>{Icon()}</IconWrapper>}
            <FilterOptionLabel>{label}</FilterOptionLabel>
        </FilterTitle>
    );

    return (
        <StyledFilterOption onClick={!open ? openDropdown : undefined}>
            {filterTitle}
            {InputOptionBox && (
                <Dropdown open={open} closeDropdown={closeDropdown} top="0em" left="1em">
                    {InputOptionBox(filterTitle)}
                </Dropdown>
            )}
        </StyledFilterOption>
    );
};

const StyledFilterOption = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 2em;
    border-right: 2px solid ${({ theme }) => theme.LIGHT_BLACK};
    font-size: 1em;

    &:last-child {
        border-right: none;
    }
`;

const IconWrapper = styled.div`
    width: 1.5em;
    text-align: end;
    margin-right: 0.7em;
    padding-top: 0.1em;
    cursor: pointer;
`;

const FilterOptionLabel = styled.span`
    white-space: nowrap;
    cursor: pointer;
`;

const FilterTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-color: white;
`;

export default FilterOption;
