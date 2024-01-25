import { useEffect, useState } from 'react';
import { IFilterOption } from '@/components/FilterOpenTeacherList/FilterOpenTeacherList';
import { IFilterOptionValue } from '@/apis/matching/matching';

interface IUseFilter {
    filterOptions: IFilterOption[];
}

export interface IOptionValue {
    name: keyof IFilterOptionValue;
    label: string;
    multiple: boolean;
    selected: boolean;
}

const useFilter = ({ filterOptions }: IUseFilter) => {
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

    return { optionValuesOfAllFilters, handleSelectOption, handleInput };
};

export default useFilter;
