import styled from 'styled-components';
import GraduationCap from '@/components/icons/GraduationCap';
import Filter from '@/components/icons/Filter';
import Career from '@/components/icons/Career';
import Dollar from '@/components/icons/Dollar';
import User from '@/components/icons/User';
import Book from '@/components/icons/Book';

const FilterOpenTeacherList = () => {
    return (
        <StyledFilterOpenTeacherList>
            <FilterOption>
                <FilterOptionIcon>
                    <Filter />
                </FilterOptionIcon>
                <FilterOptionName>최신 등록 순</FilterOptionName>
            </FilterOption>
            <FilterOption>
                <FilterOptionIcon>
                    <Book />
                </FilterOptionIcon>
                <FilterOptionName>과목</FilterOptionName>
            </FilterOption>
            <FilterOption>
                <FilterOptionIcon>
                    <GraduationCap />
                </FilterOptionIcon>
                <FilterOptionName>학교</FilterOptionName>
            </FilterOption>
            <FilterOption>
                <FilterOptionIcon>
                    <Career />
                </FilterOptionIcon>
                <FilterOptionName>경력</FilterOptionName>
            </FilterOption>
            <FilterOption>
                <FilterOptionIcon>
                    <User />
                </FilterOptionIcon>
                <FilterOptionName>성별</FilterOptionName>
            </FilterOption>
            <FilterOption>
                <FilterOptionIcon>
                    <Dollar />
                </FilterOptionIcon>
                <FilterOptionName>수업료</FilterOptionName>
            </FilterOption>
        </StyledFilterOpenTeacherList>
    );
};

const StyledFilterOpenTeacherList = styled.div`
    width: min-content;
    margin: 10em 0 1.3em 0;
    padding: 0.55em 0;

    font-size: 0.85em;
    border-radius: 0.7em;
    border: 2px solid ${({ theme }) => theme.LIGHT_BLACK};
    display: flex;

    & > button:last-child {
        border-right: none;
    }
`;

const FilterOption = styled.button`
    display: flex;
    align-items: center;
    padding: 0 1.5em;
    border-right: 2px solid ${({ theme }) => theme.LIGHT_BLACK};
    font-size: 1em;
`;

const FilterOptionIcon = styled.div`
    width: 1.5em;
    margin-right: 0.7em;
    padding-top: 0.1em;
`;

const FilterOptionName = styled.span`
    white-space: nowrap;
`;

export default FilterOpenTeacherList;
