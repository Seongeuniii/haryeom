import { ReactNode } from 'react';
import styled from 'styled-components';
import GraduationCap from '@/components/icons/GraduationCap';
import FilterIcon from '@/components/icons/Filter';
import CareerIcon from '@/components/icons/Career';
import DollarIcon from '@/components/icons/Dollar';
import UserIcon from '@/components/icons/User';
import BookIcon from '@/components/icons/Book';
import FilterOption from './FilterOption';
import { subjectDefaultOptions, univDefaultOptions } from './filterDefaultOptions';
import SelectOptionBox from './SelectOptionBox';
import InputTextOptionBox from './InputTextBox';

const filterOptions = [
    {
        name: '과목',
        icon: BookIcon,
        optionValues: subjectDefaultOptions,
        multiple: true,
    },
    {
        name: '학교',
        icon: GraduationCap,
        optionValues: univDefaultOptions,
        multiple: true,
    },
    {
        name: '경력',
        icon: CareerIcon,
        minMax: '최소',
        unit: '년',
    },
    {
        name: '성별',
        icon: UserIcon,
        optionValues: ['여자', '남자'],
        multiple: false,
    },
    {
        name: '수업료',
        icon: DollarIcon,
        minMax: '최대',
        unit: '만원',
    },
];

const FilterOpenTeacherList = () => {
    return (
        <StyledFilterOpenTeacherList>
            <FilterOption filterOptionName={'최신 등록 순'} Icon={FilterIcon} />
            {filterOptions.map((filterOption, index) => (
                <FilterOption
                    filterOptionName={filterOption.name}
                    Icon={filterOption.icon}
                    InputBox={
                        filterOption.optionValues
                            ? (children: ReactNode) =>
                                  SelectOptionBox({
                                      children,
                                      optionValues: filterOption.optionValues,
                                      multiple: filterOption.multiple,
                                  })
                            : (children: ReactNode) =>
                                  InputTextOptionBox({
                                      children,
                                      minMax: filterOption.minMax,
                                      unit: filterOption.unit,
                                  })
                    }
                    key={`filterOptions_${index}`}
                />
            ))}
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
