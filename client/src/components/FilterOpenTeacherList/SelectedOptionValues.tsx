import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { IFindTeacherFilterers } from '@/apis/matching';
import Close from '@/components/icons/Close';

interface SelectedOptionValuesProps {
    filterers: IFindTeacherFilterers;
    handleSelectOption: (name: string, value: string) => void;
    handleInput: (name: string, value: string) => void;
}

const SelectedOptionValues = ({
    filterers,
    handleSelectOption,
    handleInput,
}: SelectedOptionValuesProps) => {
    return (
        <StyledSelectedOptionValues>
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
                <SelectedOptionValue>
                    <span>최소 {filterers.minCareer}년 경력</span>
                    <DeleteButton onClick={() => handleInput('minCareer', '0')}>
                        <Close />
                    </DeleteButton>
                </SelectedOptionValue>
            )}
            {(filterers.maxSalary as number) > 0 && (
                <SelectedOptionValue>
                    <span>수강료 최대 {filterers.maxSalary}원</span>
                    <DeleteButton onClick={() => handleInput('maxSalary', '0')}>
                        <Close />
                    </DeleteButton>
                </SelectedOptionValue>
            )}
        </StyledSelectedOptionValues>
    );
};

const StyledSelectedOptionValues = styled.div`
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

export default SelectedOptionValues;
