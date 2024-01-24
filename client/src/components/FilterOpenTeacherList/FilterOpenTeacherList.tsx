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
import useFilter from '@/components/FilterOpenTeacherList/useFilter';
import Close from '../icons/Close';

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
    const [selectedItems, setSelectedItems] = useState([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getSelectedOptions = (optionValuesOfAllFilters: any) => {
        const selectedOptions = {};

        Object.keys(optionValuesOfAllFilters).forEach((key) => {
            const filterOptions = optionValuesOfAllFilters[key];

            if (Array.isArray(filterOptions)) {
                selectedOptions[key] = filterOptions.filter((option) => option.selected);
            } else {
                selectedOptions[key] = filterOptions;
            }
        });

        return selectedOptions;
    };

    useEffect(() => {
        setSelectedItems(getSelectedOptions(optionValuesOfAllFilters));
        console.log(selectedItems);
    }, [optionValuesOfAllFilters]);

    return (
        <>
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
            <SelectedOptionValues>
                {Object.keys(selectedItems).map((key) => (
                    <>
                        {Array.isArray(selectedItems[key]) &&
                            selectedItems[key].map((option, idx) => (
                                <SelectedOptionValue key={option.label}>
                                    <span>{option.label}</span>
                                    <DeleteButton onClick={() => handleSelectOption(option, idx)}>
                                        <Close />
                                    </DeleteButton>
                                </SelectedOptionValue>
                            ))}
                    </>
                ))}
            </SelectedOptionValues>
        </>
    );
};

const StyledFilterOpenTeacherList = styled.div`
    width: min-content;
    margin: 10em 0 0.3em 1em;
    padding: 0.55em;
    border-radius: 0.4em;
    font-size: 0.85em;
    border: 1px solid ${({ theme }) => theme.LIGHT_BLACK};
    display: flex;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.2);
`;

const SelectedOptionValues = styled.div`
    width: 100%;
    margin: 0.3em 1em 1em 1em;
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
`;

const SelectedOptionValue = styled.div`
    padding: 0.5em;
    border-radius: 0.3em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.SECONDARY};
`;

const DeleteButton = styled.button`
    width: 7px;
    height: 7px;
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default FilterOpenTeacherList;
