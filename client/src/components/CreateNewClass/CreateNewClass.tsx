import { useState } from 'react';
import styled from 'styled-components';
import { INewSchedule, ITeacherTutorings } from '@/apis/tutoring/tutoring';
import SelectTutoringId from './SelectTutoringId';
import SelectTutoringTime from './SelectTutoringTime';
import SelectTutoringDate from './SelectTutoringDate';
import WriteCurriculum from './WriteCurriculum';
import { getFormattedYearMonthDay } from '@/utils/time';
import { createTutorings } from '@/apis/tutoring/create-tutorings';

interface CreateNewClassProps {
    tutorings: ITeacherTutorings;
}

const CreateNewClass = ({ tutorings }: CreateNewClassProps) => {
    console.log('newClass');
    const [selectedTutoringId, setSelectedTutoringId] = useState<number>();
    const [selectedStartHour, setSelectedStartHour] = useState<string>('18');
    const [selectedStartMin, setSelectedStartMin] = useState<string>('30');
    const [selectedSuration, setSelectedDuration] = useState<number>(60);
    const [newSchedules, setNewSchedules] = useState<INewSchedule[]>([]);

    const updateSchedules = (date: Date) => {
        const newSchedule: INewSchedule = {
            scheduleDate: getFormattedYearMonthDay(date),
            startTime: selectedStartHour + ':' + selectedStartMin,
            duration: selectedSuration,
            title: '시험 3일전 수업',
        };
        setNewSchedules((prev) => [...prev, newSchedule]);
    };

    const submit = async () => {
        if (!selectedTutoringId) {
            alert('학생을 선택해주세요:)');
            return;
        }
        if (!newSchedules.length) {
            alert('새로운 커리큘럼을 등록해주세요:)');
            return;
        }
        const data = await createTutorings(selectedTutoringId, newSchedules);
        if (data) {
            alert('성공적으로 등록했어요');
        } else {
            alert('등록에 실패했어요ㅠㅠ');
        }
    };

    return (
        <StyledCreateNewClassForm>
            <CreateNewClassFormHeader>과외 일정 추가</CreateNewClassFormHeader>
            <div style={{ display: 'flex', gap: '2em' }}>
                <LeftSection>
                    <SelectTutoringId
                        tutorings={tutorings}
                        setSelectedTutoringId={setSelectedTutoringId}
                    />
                    <SelectTutoringTime
                        setSelectedStartHour={setSelectedStartHour}
                        setSelectedStartMin={setSelectedStartMin}
                        setSelectedDuration={setSelectedDuration}
                    />
                    <SelectTutoringDate updateSchedules={updateSchedules} />
                </LeftSection>
                <RightSection>
                    <WriteCurriculum
                        newSchedules={newSchedules}
                        setNewSchedules={setNewSchedules}
                    />
                </RightSection>
            </div>
            <SubmitButton onClick={submit}>등록</SubmitButton>
        </StyledCreateNewClassForm>
    );
};

const StyledCreateNewClassForm = styled.div`
    min-width: 800px;
    min-height: 30vh;
    padding: 2em;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 1em;
    text-align: start;
    border-radius: 1em;
`;

const CreateNewClassFormHeader = styled.div`
    font-size: 1.4em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.8em;
`;

const LeftSection = styled.section`
    padding: 1.5em;
    border-radius: 1em;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
`;

const RightSection = styled.section`
    width: 100%;
    padding: 1em;
`;

const SubmitButton = styled.button`
    width: 100%;
    height: 35px;
    margin-top: 1em;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    color: white;
    border-radius: 0.5em;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export default CreateNewClass;
