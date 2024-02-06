import React, { useState } from 'react';
import styled from 'styled-components';
import SelectForm from '@/components/commons/SelectForm';
import InputForm from '@/components/commons/InputForm';
import { subjectDefaultOptions } from './FilterOpenTeacherList/filterDefaultOptions';

interface TutoringApplicationFormProps {
    // request: () => void;
    request: (data: { subjectId: number; hourlyRate: number }) => void;
}

const TutoringApplicationForm = ({ request }: TutoringApplicationFormProps) => {
    const [formData, setFormData] = useState({ subjectId: '', hourlyRate: '' });

    const handleInputChange = (name: string, value: string | number) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const { subjectId, hourlyRate } = formData;
        if (subjectId && hourlyRate) {
            request({ subjectId: Number(subjectId), hourlyRate: Number(hourlyRate) });
        } else {
            alert('과목과 시간당 금액을 입력하세요.');
        }
    };

    return (
        <ApplyTutoringForm>
            <ApplyTutoringFormHeader>과외 신청서</ApplyTutoringFormHeader>
            <SelectSubjectHeader>과목 선택</SelectSubjectHeader>
            <SelectSubject>
                <SelectForm
                    label={'선택'}
                    name={'subjectId'}
                    optionList={subjectDefaultOptions}
                    handleSelect={(name, clickedOption) => {
                        if (typeof clickedOption === 'string') {
                            const optionIndex = subjectDefaultOptions.findIndex(
                                (option) => option.trim() === clickedOption.trim()
                            );
                            if (optionIndex !== -1) {
                                // 옵션의 인덱스를 찾았다면, 이를 사용합니다.
                                handleInputChange(name, optionIndex + 1);
                            }
                        }
                    }}
                    height="40px"
                />
            </SelectSubject>
            <InputTutoringFeeHeader>수업료</InputTutoringFeeHeader>
            <InputTutoringFee>
                <InputForm
                    label={''}
                    name={'hourlyRate'}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange('hourlyRate', e.target.value)
                    }
                />
                <span>원</span>
            </InputTutoringFee>
            <SubmitButton onClick={handleSubmit}>신청하기</SubmitButton>
        </ApplyTutoringForm>
    );
};

const ApplyTutoringForm = styled.div`
    width: 400px;
    /* height: 400px; */
    padding: 2em;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 1em;
`;

const ApplyTutoringFormHeader = styled.header`
    width: 100%;
    height: 35px;
    text-align: center;
    font-size: 1.4em;
    font-weight: bold;
    margin-bottom: 0.4em;
`;

const SelectSubjectHeader = styled.header`
    font-size: 1.1em;
    font-weight: bold;
    padding: 0.5em;
    margin-bottom: 0.5em;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const SelectSubject = styled.div`
    margin-bottom: 3em;
`;

const InputTutoringFeeHeader = styled.header`
    font-size: 1.1em;
    font-weight: bold;
    padding-left: 0.5em;
    padding-bottom: 0.5em;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const InputTutoringFee = styled.div`
    display: flex;
    align-items: end;
    width: 150px;

    span {
        min-width: 100px;
        padding: 0 0 0.8em 0.1em;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    height: 35px;
    margin-top: 3.5em;
    border-radius: 0.6em;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    color: white;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export default TutoringApplicationForm;
