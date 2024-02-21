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

export default FilterOpenTeacherList;
