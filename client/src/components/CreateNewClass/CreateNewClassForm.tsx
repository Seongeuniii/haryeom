import styled from 'styled-components';
import SelectForm from '@/components/commons/SelectForm';
import MyCalendar from '@/components/Calendar';
import useCalendar from '@/hooks/useCalendar';
import InputForm from '@/components/commons/InputForm';

const CreateNewClassForm = () => {
    // const [userInputValue, setUserInputValue] = useState<>({
    //     name: '',
    //     school: '',
    //     grade: '',
    //     phone: '',
    //     profileUrl: '',
    //     college: '',
    //     collegeEmail: '',
    //     profileStatus: false,
    //     gender: '',
    //     salary: 0,
    //     career: 0,
    //     subjects: '',
    //     introduce: '',
    // });

    // const updateUserInfo = (name: string, value: string | number) => {
    //     setUserInputValue({
    //         ...userInputValue,
    //         [name]: value,
    //     });
    // };

    const { selectedDate, handleClick, handleYearMonthChange } = useCalendar();

    return (
        <StyledCreateNewClassForm>
            <CreateNewClassFormHeader>과외 일정 추가</CreateNewClassFormHeader>
            <div style={{ display: 'flex', gap: '3em' }}>
                <div style={{}}>
                    <SelectTutoringIdSection>
                        <Header>과외 선택</Header>
                        <SelectForm
                            label={'과목 | 학생 선택'}
                            name={'tutoringId'}
                            optionList={['수학 | 김성은 학생', '영어 | 이태호 학생']}
                            handleSelect={(name, option) => {
                                console.log(name, option);
                            }}
                            height="35px"
                        />
                    </SelectTutoringIdSection>
                    <SelectTutoringTimeSection>
                        <Header>일정 선택</Header>
                        <TutoringTimeInfo>
                            <SelectForm
                                label={'시작시간'}
                                name={'tutoringId'}
                                optionList={['18:00', '19:00']}
                                handleSelect={(name, option) => {
                                    console.log(name, option);
                                }}
                                height="35px"
                            />
                            <SelectForm
                                label={'진행시간'}
                                name={'tutoringId'}
                                optionList={['1시간', '2시간']}
                                handleSelect={(name, option) => {
                                    console.log(name, option);
                                }}
                                height="35px"
                            />
                        </TutoringTimeInfo>
                    </SelectTutoringTimeSection>

                    <WriteCurriculumSection>
                        <Header>커리큘럼 작성</Header>
                        <CalendarWrapper>
                            <MyCalendar
                                selectedDate={selectedDate}
                                handleDayClick={handleClick}
                                handleYearMonthChange={handleYearMonthChange}
                            ></MyCalendar>
                        </CalendarWrapper>
                    </WriteCurriculumSection>
                </div>
                <div style={{ width: '100%' }}>
                    <WriteCurriculumList>
                        <WriteCurriculumCard>
                            <InputForm
                                label={'2024. 1. 20 (금) 18:00 ~ 20:00'}
                                name={''}
                                handleChange={() => {}}
                            />
                            <DeleteButton>-</DeleteButton>
                        </WriteCurriculumCard>
                        <WriteCurriculumCard>
                            <InputForm
                                label={'2024. 1. 20 (금) 18:00 ~ 20:00'}
                                name={''}
                                handleChange={() => {}}
                            />
                            <DeleteButton>-</DeleteButton>
                        </WriteCurriculumCard>
                        <WriteCurriculumCard>
                            <InputForm
                                label={'2024. 1. 20 (금) 18:00 ~ 20:00'}
                                name={''}
                                handleChange={() => {}}
                            />
                            <DeleteButton>-</DeleteButton>
                        </WriteCurriculumCard>
                        <WriteCurriculumCard>
                            <InputForm
                                label={'2024. 1. 20 (금) 18:00 ~ 20:00'}
                                name={''}
                                handleChange={() => {}}
                            />
                            <DeleteButton>-</DeleteButton>
                        </WriteCurriculumCard>
                        <HelpMessage>- 날짜를 선택하여 커리큘럼을 추가하세요 -</HelpMessage>
                    </WriteCurriculumList>
                </div>
            </div>
            <SubmitButton>등록</SubmitButton>
        </StyledCreateNewClassForm>
    );
};

const StyledCreateNewClassForm = styled.div`
    min-width: 800px;
    min-height: 30vh;
    padding: 3em;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 1em;
    text-align: start;
    border-radius: 1em;
`;

const CreateNewClassFormHeader = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.3em;
`;

const Header = styled.div`
    width: 100%;
    padding: 0.3em;
    margin-bottom: 0.5em;
    font-size: 1.1em;
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const SelectTutoringIdSection = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 2.2em;
`;

const SelectTutoringTimeSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.2em;
`;

const TutoringTimeInfo = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
`;

const CalendarWrapper = styled.div`
    width: 300px;
`;

const HelpMessage = styled.span`
    width: 100%;
    display: block;
    text-align: center;
    font-size: 0.7em;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    margin-top: 1em;
`;

const WriteCurriculumSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow: scroll;
`;

const WriteCurriculumList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const WriteCurriculumCard = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1em;
`;

const DeleteButton = styled.button`
    width: 22px;
    height: 20px;
    border: 1px solid ${({ theme }) => theme.LIGHT_BLACK};
    border-radius: 100%;
`;

const SubmitButton = styled.button`
    height: 30px;
    background-color: ${({ theme }) => theme.BORDER_LIGHT};
    color: white;
    border-radius: 0.5em;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export default CreateNewClassForm;
