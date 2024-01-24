import { ReactNode, useEffect, useState } from 'react';
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

export interface IOptionValue {
    name: keyof IFilterOptionValue;
    label: string;
    multiple: boolean;
    selected: boolean;
}

const FilterOpenTeacherList = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [optionValuesOfAllFilters, setOptionValuesOfAllFilters] = useState<any>({
        subjectIds: [],
        colleges: [],
        minCareer: 0,
        gender: [],
        maxSalary: 0,
    });

    const handleSelectOption = (optionValue: IOptionValue, selectedIdx: number) => {
        if (optionValue.multiple) {
            const newOptionValuesOfAllFilters = { ...optionValuesOfAllFilters };
            newOptionValuesOfAllFilters[optionValue.name][selectedIdx].selected =
                !newOptionValuesOfAllFilters[optionValue.name][selectedIdx].selected;
            setOptionValuesOfAllFilters(newOptionValuesOfAllFilters);
        } else {
            const newOptionValuesOfAllFilters = { ...optionValuesOfAllFilters };
            newOptionValuesOfAllFilters[optionValue.name] = optionValuesOfAllFilters[
                optionValue.name
            ].map((optionValuesOfOneFilter: IOptionValue, idx: number) => {
                if (selectedIdx === idx) {
                    return {
                        ...optionValuesOfOneFilter,
                        selected: !optionValuesOfOneFilter.selected,
                    };
                }
                return {
                    ...optionValuesOfOneFilter,
                    selected: false,
                };
            });
            setOptionValuesOfAllFilters(newOptionValuesOfAllFilters);
        }
    };

    const handleInput = (name: string, value: string) => {
        const newOptionValuesOfAllFilters = { ...optionValuesOfAllFilters };
        newOptionValuesOfAllFilters[name] = value;
        setOptionValuesOfAllFilters(newOptionValuesOfAllFilters);
    };

    useEffect(() => {
        const newOptionValuesOfAllFilters = { ...optionValuesOfAllFilters };
        filterOptions.map((filterOption) => {
            if (filterOption.defaultOptionValues) {
                newOptionValuesOfAllFilters[filterOption.name] =
                    filterOption.defaultOptionValues.map((defaultOptionValue) => {
                        return {
                            name: filterOption.name,
                            label: defaultOptionValue,
                            multiple: filterOption.multiple,
                            selected: false,
                        };
                    });
            }
        });
        setOptionValuesOfAllFilters(newOptionValuesOfAllFilters);
    }, []);

    useEffect(() => {
        console.log(optionValuesOfAllFilters);
    }, [optionValuesOfAllFilters]);

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
