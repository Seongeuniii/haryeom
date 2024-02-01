import React from 'react';
import styled from 'styled-components';
import SelectForm from '../commons/SelectForm';
import { useGetTutorings } from '@/queries/useGetTutorings';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import { ITeacherTutorings } from '@/apis/tutoring/tutoring';

const SelectTutoringId = () => {
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return;

    const { data: tutorings } = useGetTutorings({ userRole: userSession.role });

    return (
        <StyledSelectTutoringId>
            <SelectTutoringIdHeader>과외 선택</SelectTutoringIdHeader>
            <SelectForm
                label={'과목 | 학생 선택'}
                name={'tutoringId'}
                optionList={(tutorings as ITeacherTutorings).map(
                    (tutoring) => `${tutoring.subject.name} | ${tutoring.student.studentName} 학생`
                )}
                handleSelect={(name, option) => {
                    console.log(name, option);
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
