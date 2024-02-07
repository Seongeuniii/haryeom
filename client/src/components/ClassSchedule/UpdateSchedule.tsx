import styled from 'styled-components';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/commons/Modal';
import { INewSchedule, ITeacherTutorings } from '@/apis/tutoring/tutoring';
import SelectTutoringTime from '../CreateNewClass/SelectTutoringTime';
import SelectTutoringDate from '../CreateNewClass/SelectTutoringDate';
import WriteCurriculum from '../CreateNewClass/WriteCurriculum';
import { useEffect, useState } from 'react';
import { addMinutesToTime, getDayOfWeek, getFormattedYearMonthDay } from '@/utils/time';
import { createTutorings } from '@/apis/tutoring/create-tutorings';
import { updateTutoringSchedule } from '@/apis/tutoring/update-tutoring-schedule';
import InputForm from '../commons/InputForm';
import MyCalendar from '../Calendar';
import useCalendar from '@/hooks/useCalendar';

interface UpdateScheduleProps {
    tutoringScheduleId: number;
    scheduleInfo: INewSchedule;
    open: boolean;
    closeModal: () => void;
}

const UpdateSchedule = ({
    tutoringScheduleId,
    scheduleInfo,
    open,
    closeModal,
}: UpdateScheduleProps) => {
    const [selectedStartHour, setSelectedStartHour] = useState<string>(
        scheduleInfo.startTime.split(':')[0]
    );
    const [selectedStartMin, setSelectedStartMin] = useState<string>(
        scheduleInfo.startTime.split(':')[1]
    );
    const [selectedDuration, setSelectedDuration] = useState<number>(scheduleInfo.duration);
    const [selectedScheduleDate, setSelectedScheduleDate] = useState<string>(
        scheduleInfo.scheduleDate
    );
    const [updateTitle, setUpdateTitle] = useState<string>(scheduleInfo.title);
    const [updateSchedule, setUpdateSchedule] = useState<INewSchedule>(scheduleInfo);

    const { handleYearMonthChange } = useCalendar();
    const calenderDefaultDate = new Date(scheduleInfo.scheduleDate);

    const updateDate = (date: Date) => {
        setSelectedScheduleDate(getFormattedYearMonthDay(date));
    };

    useEffect(() => {
        setUpdateSchedule({
            scheduleDate: selectedScheduleDate,
            startTime: selectedStartHour + ':' + selectedStartMin,
            duration: selectedDuration,
            title: updateTitle,
        });
    }, [selectedScheduleDate, selectedStartHour, selectedStartMin, selectedDuration, updateTitle]);

    const submit = async () => {
        if (confirm('수정하시겠습니까?')) {
            setUpdateSchedule({
                scheduleDate: selectedScheduleDate,
                startTime: selectedStartHour + ':' + selectedStartMin,
                duration: selectedDuration,
                title: updateTitle,
            });
            await updateTutoringSchedule(tutoringScheduleId, updateSchedule);
            closeModal();
        }
    };

    return (
        <>
            <Modal open={open} closeModal={closeModal}>
                <StyledCreateNewClassForm>
                    <CreateNewClassFormHeader>과외 일정 수정</CreateNewClassFormHeader>
                    <div style={{ display: 'flex', gap: '2em' }}>
                        <LeftSection>
                            <SelectTutoringTime
                                setSelectedStartHour={setSelectedStartHour}
                                setSelectedStartMin={setSelectedStartMin}
                                setSelectedDuration={setSelectedDuration}
                            />
                            {/* <SelectTutoringDate updateSchedules={updateDate} /> */}
                            <StyledSelectTutoringDate>
                                <CalendarWrapper>
                                    <MyCalendar
                                        selectedDate={calenderDefaultDate}
                                        handleClickDay={updateDate}
                                        handleYearMonthChange={handleYearMonthChange}
                                    ></MyCalendar>
                                </CalendarWrapper>
                            </StyledSelectTutoringDate>
                        </LeftSection>
                        <RightSection>
                            <ScheduleInfo>
                                <DateStyle>
                                    {selectedScheduleDate} ({getDayOfWeek(selectedScheduleDate)}){' '}
                                </DateStyle>
                                <Time>
                                    {selectedStartHour + ':' + selectedStartMin}
                                    {' ~ '}
                                    {addMinutesToTime(
                                        selectedStartHour + ':' + selectedStartMin,
                                        selectedDuration
                                    )}
                                </Time>
                            </ScheduleInfo>
                            <input
                                defaultValue={updateTitle}
                                onChange={(e) => setUpdateTitle(e.target.value)}
                            ></input>
                        </RightSection>
                    </div>
                    <SubmitButton onClick={submit}>수정</SubmitButton>
                </StyledCreateNewClassForm>
            </Modal>
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

const StyledSelectTutoringDate = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow: scroll;
`;

const CalendarWrapper = styled.div`
    width: 300px;
`;

const ScheduleInfo = styled.div`
    font-weight: 500;
`;

const DateStyle = styled.span`
    margin-right: 8px;
`;

const Time = styled.span``;

export default UpdateSchedule;
