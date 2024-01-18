import styled from 'styled-components';
import { UserInfoForm } from './info';

interface SelectUserTypeFormProps {
    userInputValue: UserInfoForm;
    updateUserInfo: (name: string, value: string | number) => void;
}

const SelectUserTypeForm = ({ userInputValue, updateUserInfo }: SelectUserTypeFormProps) => {
    return (
        <StyledSelectUserTypeForm>
            <UserTypeSection>
                <SelectButton
                    onClick={() => updateUserInfo('userType', 'teacher')}
                    selected={userInputValue.userType === 'teacher'}
                >
                    <img src="/images/teacher.png" alt="teacher" />
                </SelectButton>
                <span>선생님 회원</span>
            </UserTypeSection>
            <UserTypeSection>
                <SelectButton
                    onClick={() => updateUserInfo('userType', 'student')}
                    selected={userInputValue.userType === 'student'}
                >
                    <img src="/images/student-girl.png" alt="student" />
                    <img src="/images/student-boy.png" alt="student" />
                </SelectButton>
                <span>학생 회원</span>
            </UserTypeSection>
        </StyledSelectUserTypeForm>
    );
};

const StyledSelectUserTypeForm = styled.div`
    width: 100%;
    height: 330px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const UserTypeSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        color: ${({ theme }) => theme.DARK_BLACK};
        font-weight: bold;
    }
`;

const SelectButton = styled.button<{ selected: boolean }>`
    width: 200px;
    height: 200px;
    border-radius: 100%;
    margin-bottom: 15px;
    border: 3px solid ${({ theme, selected }) => (selected ? theme.DARK_BLACK : theme.LIGHT_BLACK)};
    background-color: ${({ theme, selected }) => (selected ? theme.PRIMARY : theme.WHITE)};

    &:hover {
        border: 3px solid ${({ theme }) => theme.DARK_BLACK};
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export default SelectUserTypeForm;
