import { ReactNode } from 'react';
import styled from 'styled-components';
import GraduationCap from '@/components/icons/GraduationCap';
import FilterIcon from '@/components/icons/Filter';
import CareerIcon from '@/components/icons/Career';
import DollarIcon from '@/components/icons/Dollar';
import UserIcon from '@/components/icons/User';
import BookIcon from '@/components/icons/Book';
import { IFilterOptionValue } from '@/apis/matching/matching';
import FilterOption from './FilterOption';
import { subjectDefaultOptions, univDefaultOptions } from './filterDefaultOptions';
import SelectOptionBox from './SelectOptionBox';
import InputTextOptionBox from './InputTextBox';
import useFilter from '@/components/FilterOpenTeacherList/useFilter';

export interface IFilterOption {
    name: keyof IFilterOptionValue | 'filter';
    title: string;
    icon: () => JSX.Element;
    defaultOptionValues?: string[];
    multiple?: boolean;
    minMax?: string;
    unit?: string;
}

export const filterOptions: IFilterOption[] = [
    {
        name: 'filter',
        title: '최신 등록 순',
        icon: FilterIcon,
    },
    {
        name: 'subjectIds', // index 1 ~
        title: '과목',
        icon: BookIcon,
        defaultOptionValues: subjectDefaultOptions,
        multiple: true,
    },
    {
        name: 'colleges',
        title: '학교',
        icon: GraduationCap,
        defaultOptionValues: univDefaultOptions,
        multiple: true,
    },
    {
        name: 'minCareer',
        title: '경력',
        icon: CareerIcon,
        minMax: '최소',
        unit: '년',
    },
    {
        name: 'gender',
        title: '성별',
        icon: UserIcon,
        defaultOptionValues: ['여자', '남자'],
        multiple: false,
    },
    {
        name: 'maxSalary',
        title: '수업료',
        icon: DollarIcon,
        minMax: '최대',
        unit: '만원',
    },
];

const FilterOpenTeacherList = () => {
    const { optionValuesOfAllFilters, handleSelectOption, handleInput } = useFilter({
        filterOptions,
    });

    return (
        <StyledFilterOpenTeacherList>
            {filterOptions.map((filterOption, index) => {
                return (
                    <FilterOption
                        filterOption={filterOption}
                        InputBox={
                            index > 0 // 정렬기준 변경불가
                                ? filterOption.defaultOptionValues
                                    ? (children: ReactNode) =>
                                          SelectOptionBox({
                                              children,
                                              optionValues:
                                                  optionValuesOfAllFilters[filterOption.name],
                                              handleSelectOption,
                                          })
                                    : (children: ReactNode) =>
                                          InputTextOptionBox({
                                              children,
                                              name: filterOption.name,
                                              minMax: filterOption.minMax as string,
                                              unit: filterOption.unit as string,
                                              handleInput,
                                          })
                                : undefined
                        }
                        key={`filterOptions_${index}`}
                    />
                );
            })}
        </StyledFilterOpenTeacherList>
    );
};

const StyledFilterOpenTeacherList = styled.div`
    width: min-content;
    margin: 10em 0 1.3em 1em;
    padding: 0.55em;
    border-radius: 0.4em;
    font-size: 0.85em;
    border: 1px solid ${({ theme }) => theme.LIGHT_BLACK};
    display: flex;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.2);
`;

export default FilterOpenTeacherList;
