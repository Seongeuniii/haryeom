import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import {
    BookIcon,
    UserIcon,
    DollarIcon,
    GraduationCapIcon,
    FilterIcon,
    CareerIcon,
} from '@/components/icons';
import SelectOptionBox from '@/components/FilterOpenTeacherList/SelectOptionBox';
import InputTextOptionBox from './InputTextBox';
import FilterOption from './FilterOption';
import { subjectDefaultOptions, univDefaultOptions } from './filterDefaultOptions';

interface FilterOpenTeacherListProps {
    handleSelectOption: (name: string, value: string) => void;
    handleInput: (name: string, value: string) => void;
    isSelected: (name: string, value: string) => boolean;
}

const FilterOpenTeacherList = ({
    handleSelectOption,
    handleInput,
    isSelected,
}: FilterOpenTeacherListProps) => {
    return (
        <StyledFilterOpenTeacherList>
            <FilterOption label={'최신 등록 순'} Icon={FilterIcon} />
            <FilterOption
                label={'과목'}
                Icon={BookIcon}
                InputOptionBox={(title) =>
                    SelectOptionBox({
                        title,
                        name: 'subjectIds',
                        optionValues: subjectDefaultOptions,
                        handleSelectOption,
                        isSelected,
                    })
                }
            />
            <FilterOption
                label={'학교'}
                Icon={GraduationCapIcon}
                InputOptionBox={(title) =>
                    SelectOptionBox({
                        title,
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
                InputOptionBox={(children: ReactNode) =>
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
                InputOptionBox={(title) =>
                    SelectOptionBox({
                        title,
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
                InputOptionBox={(children: ReactNode) =>
                    InputTextOptionBox({
                        children,
                        name: 'maxSalary',
                        minMax: '최대',
                        unit: '원',
                        handleInput,
                    })
                }
            />
        </StyledFilterOpenTeacherList>
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
    font-size: 1em;
`;

export default FilterOpenTeacherList;
