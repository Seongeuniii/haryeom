import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ITeacherTutorings } from '@/apis/tutoring/tutoring';
import SelectForm from '../commons/SelectForm';

interface SelectTutoringIdProps {
    tutorings: ITeacherTutorings;
    setSelectedTutoringId: Dispatch<SetStateAction<number | undefined>>;
}

const SelectTutoringId = ({ tutorings, setSelectedTutoringId }: SelectTutoringIdProps) => {
    return (
        <StyledSelectTutoringId>
            <SelectTutoringIdHeader>과외 선택</SelectTutoringIdHeader>
            <SelectForm
                label={'과목 | 학생 선택'}
                name={'tutoringId'}
                optionList={tutorings.map(
                    (tutoring) => `${tutoring.subject.name} | ${tutoring.studentName} 학생`
                )}
                handleSelect={(name, option) => {
                    setSelectedTutoringId(
                        tutorings.find(
                            (tutoring) =>
                                `${tutoring.subject.name} | ${tutoring.studentName} 학생` === option
                        )?.tutoringId as number
                    );
                }}
                height="35px"
            />
        </StyledSelectTutoringId>
    );
};

const StyledSelectTutoringId = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 2.2em;
`;

const SelectTutoringIdHeader = styled.div`
    width: 100%;
    padding: 0.3em;
    margin-bottom: 0.5em;
    font-size: 1.1em;
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

export default SelectTutoringId;
