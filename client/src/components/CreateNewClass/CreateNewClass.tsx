import styled from 'styled-components';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/commons/Modal';
import { INewSchedule, ITeacherTutorings } from '@/apis/tutoring/tutoring';
import SelectTutoringId from './SelectTutoringId';
import SelectTutoringTime from './SelectTutoringTime';
import SelectTutoringDate from './SelectTutoringDate';
import WriteCurriculum from './WriteCurriculum';
import { useState } from 'react';
import { getFormattedYearMonthDay } from '@/utils/time';
import { createTutorings } from '@/apis/tutoring/create-tutorings';

interface CreateNewClassProps {
    tutorings: ITeacherTutorings;
}

const CreateNewClass = ({ tutorings }: CreateNewClassProps) => {
    const { open, openModal, closeModal } = useModal();
    const [selectedTutoringId, setSelectedTutoringId] = useState<number>();
    const [selectedStartHour, setSelectedStartHour] = useState<string>('18:30');
    const [selectedSuration, setSelectedDuration] = useState<number>(60);
    const [newSchedules, setNewSchedules] = useState<INewSchedule[]>([]);

    const updateSchedules = (date: Date) => {
        const newSchedule: INewSchedule = {
            scheduleDate: getFormattedYearMonthDay(date),
            startTime: selectedStartHour,
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
        <>
            <Modal open={open} closeModal={closeModal}>
                <StyledCreateNewClassForm>
                    <CreateNewClassFormHeader>과외 일정 추가</CreateNewClassFormHeader>
                    <div style={{ display: 'flex', gap: '2em' }}>
                        <LeftSection>
                            <SelectTutoringId
                                tutorings={tutorings}
                                setSelectedTutoringId={setSelectedTutoringId}
                            />
                            <SelectTutoringTime />
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
            </Modal>
            <StyledCreateNewClass>
                <OpenModalButton onClick={openModal}>+</OpenModalButton>
            </StyledCreateNewClass>
        </>
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

const StyledCreateNewClass = styled.div`
    width: 100%;
    bottom: 1.5em;
    left: 0;
    text-align: center;
    position: absolute;
`;

const OpenModalButton = styled.button`
    width: 30px;
    height: 30px;
    margin-top: 8px;
    font-size: 24px;
    border-radius: 100%;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    background-color: ${({ theme }) => theme.LIGHT_BLACK};
    color: white;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
        color: white;
    }
`;

export default CreateNewClass;
