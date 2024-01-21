import styled from 'styled-components';
import SelectTutoringId from './SelectTutoringId';
import SelectTutoringTime from './SelectTutoringTime';
import SelectTutoringDate from './SelectTutoringDate';
import WriteCurriculum from './WriteCurriculum';

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

    return (
        <StyledCreateNewClassForm>
            <CreateNewClassFormHeader>과외 일정 추가</CreateNewClassFormHeader>
            <div style={{ display: 'flex', gap: '2em' }}>
                <LeftSection>
                    <SelectTutoringId />
                    <SelectTutoringTime />
                    <SelectTutoringDate />
                </LeftSection>
                <RightSection>
                    <WriteCurriculum />
                </RightSection>
            </div>
            <SubmitButton>등록</SubmitButton>
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

export default CreateNewClassForm;
