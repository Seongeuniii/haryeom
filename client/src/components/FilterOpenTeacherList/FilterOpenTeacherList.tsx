import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
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
import Close from '../icons/Close';

interface FilterOpenTeacherListProps {
    filterers: { [key: string]: number | string[] };
    setFilterers: Dispatch<
        SetStateAction<{
            [key: string]: number | string[];
        }>
    >;
}

const FilterOpenTeacherList = ({ filterers, setFilterers }: FilterOpenTeacherListProps) => {
    const handleSelectOption = (name: string, value: string) => {
        const currentValues = [...(filterers[name] as string[])];
        console.log(currentValues);
        const isValueExists = currentValues.includes(value);
        const updatedValues = isValueExists
            ? currentValues.filter((item) => item !== value)
            : [...currentValues, value];

        setFilterers((prev) => ({ ...prev, [name]: updatedValues }));
    };

    const handleInput = (name: string, value: string) => {
        setFilterers((prev) => ({ ...prev, [name]: parseInt(value) }));
    };

    const isSelected = (name: string, value: string) => {
        return (filterers[name] as string[]).find((elem) => elem === value) ? true : false;
    };

    useEffect(() => {}, [filterers]);

    return (
        <>
            <StyledFilterOpenTeacherList>
                <FilterOption label={'최신 등록 순'} Icon={FilterIcon} />
                <FilterOption
                    label="과목"
                    Icon={BookIcon}
                    InputBox={(children) =>
                        SelectOptionBox({
                            children,
                            name: 'subjectIds',
                            optionValues: subjectDefaultOptions,
                            handleSelectOption,
                            isSelected,
                        })
                    }
                />
                <FilterOption
                    label={'학교'}
                    Icon={GraduationCap}
                    InputBox={(children) =>
                        SelectOptionBox({
                            children,
                            name: 'colleges',
                            optionValues: univDefaultOptions,
                            handleSelectOption,
                            isSelected,
                        })
                    }
                />
                <FilterOption
                    label={'경력'}
                    Icon={CareerIcon}
                    InputBox={(children: ReactNode) =>
                        InputTextOptionBox({
                            children,
                            name: 'minCareer',
                            minMax: '최소',
                            unit: '년',
                            handleInput,
                        })
                    }
                />
                <FilterOption
                    label={'성별'}
                    Icon={UserIcon}
                    InputBox={(children) =>
                        SelectOptionBox({
                            children,
                            name: 'gender',
                            optionValues: ['여자', '남자'],
                            handleSelectOption,
                            isSelected,
                        })
                    }
                />
                <FilterOption
                    label={'수업료'}
                    Icon={DollarIcon}
                    InputBox={(children: ReactNode) =>
                        InputTextOptionBox({
                            children,
                            name: 'maxSalary',
                            minMax: '최대',
                            unit: '만원',
                            handleInput,
                        })
                    }
                />
            </StyledFilterOpenTeacherList>
            <SelectedOptionValues>
                {Object.keys(filterers).map(
                    (key) =>
                        Array.isArray(filterers[key]) && (
                            <>
                                {(filterers[key] as string[]).map((optionValue, idx) => (
                                    <SelectedOptionValue key={`filterers_${idx}`}>
                                        <span>{optionValue}</span>
                                        <DeleteButton
                                            onClick={() => handleSelectOption(key, optionValue)}
                                        >
                                            <Close />
                                        </DeleteButton>
                                    </SelectedOptionValue>
                                ))}
                            </>
                        )
                )}
                {(filterers.minCareer as number) > 0 && (
                    <SelectedOptionValue>최소 {filterers.minCareer}년 경력</SelectedOptionValue>
                )}
                {(filterers.maxSalary as number) > 0 && (
                    <SelectedOptionValue>수강료 최대 {filterers.maxSalary}원</SelectedOptionValue>
                )}
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const SelectedOptionValues = styled.div`
    width: 100%;
    margin: 0.3em 1em 1em 1em;
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
    font-size: 12px;
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
