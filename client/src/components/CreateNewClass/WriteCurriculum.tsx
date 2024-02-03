import styled from 'styled-components';
import InputForm from '@/components/commons/InputForm';
import { INewSchedule } from '@/apis/tutoring/tutoring';
import { addMinutesToTime, getDayOfWeek } from '@/utils/time';
import { Dispatch, SetStateAction } from 'react';

interface WriteCurriculum {
    newSchedules: INewSchedule[];
    setNewSchedules: Dispatch<SetStateAction<INewSchedule[]>>;
}

const WriteCurriculum = ({ newSchedules, setNewSchedules }: WriteCurriculum) => {
    return (
        <StyledWriteCurriculum>
            <Header>커리큘럼 작성</Header>
            <NewCurriculumList>
                {newSchedules.map((newSchedule, index) => {
                    return (
                        <WriteCurriculumCard key={`new_schedule_${index}`}>
                            <FormControl>
                                <ScheduleInfo>
                                    <Date>
                                        {newSchedule.scheduleDate} (
                                        {getDayOfWeek(newSchedule.scheduleDate)}){' '}
                                    </Date>
                                    <Time>
                                        {newSchedule.startTime}
                                        {' ~ '}
                                        {addMinutesToTime(
                                            newSchedule.startTime,
                                            newSchedule.duration
                                        )}
                                    </Time>
                                </ScheduleInfo>
                                <DeleteButton>--</DeleteButton>
                            </FormControl>
                            <InputForm
                                label={'커리큘럼 내용'}
                                name={''}
                                handleChange={(e) =>
                                    setNewSchedules((prev) =>
                                        prev.map((schedule, i) => {
                                            if (i === index) {
                                                return { ...schedule, title: e.target.value };
                                            }
                                            return schedule;
                                        })
                                    )
                                }
                            />
                        </WriteCurriculumCard>
                    );
                })}
            </NewCurriculumList>
            <HelpMessage>- 날짜를 선택하여 커리큘럼을 추가하세요 -</HelpMessage>
        </StyledWriteCurriculum>
    );
};

const StyledWriteCurriculum = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    width: 100%;
    padding: 0.3em;
    margin-bottom: 0.5em;
    font-size: 1.1em;
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const NewCurriculumList = styled.div`
    max-height: 460px;
    flex: 1;
    overflow: scroll;
`;

const WriteCurriculumCard = styled.div`
    width: 100%;
    margin: 1em 0;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 1em;
    font-size: 14px;
`;

const FormControl = styled.div`
    width: 100%;
    padding-left: 0.6em;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ScheduleInfo = styled.div`
    font-weight: 500;
`;

const Date = styled.span`
    margin-right: 8px;
`;

const Time = styled.span``;

const DeleteButton = styled.button`
    width: 22px;
    height: 22px;
    border: 1px solid ${({ theme }) => theme.LIGHT_BLACK};
    border-radius: 100%;
`;

const HelpMessage = styled.span`
    width: 100%;
    display: block;
    text-align: center;
    font-size: 0.7em;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    margin-top: 1em;
`;

export default WriteCurriculum;
