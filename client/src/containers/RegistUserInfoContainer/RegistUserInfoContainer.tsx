import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { UserInfoForm, registUserInfoStep } from './info';
import RequiredInfoForm from './RequiredInfoForm';
import OptionalInfoForm from './OptionalInfoForm';
import SelectUserTypeForm from './SelectUserTypeForm';

const RegistUserInfoContainer = () => {
    const [step, setStep] = useState<number>(1);
    const [userInputValue, setUserInputValue] = useState<UserInfoForm>({
        userType: 'teacher',
        name: '',
        grades: '',
        school: '',
        phoneNumber: '',
    });

    const updateUserInfo = (name: string, value: string | number) => {
        setUserInputValue({
            ...userInputValue,
            [name]: value,
        });
    };

    useEffect(() => {
        if (userInputValue.userType === 'teacher' && step === 4) {
            console.log('끝');
        } else if (userInputValue.userType === 'student' && step === 3) {
            console.log('끝');
        }
    }, [step, userInputValue.userType]);

    return (
        <StyledRegistUserInfoContainer>
            <RegistFormBox>
                <RegistFormHeader>{registUserInfoStep[step]}</RegistFormHeader>
                <RegistForm>
                    {step === 1 && (
                        <SelectUserTypeForm
                            userInputValue={userInputValue}
                            updateUserInfo={updateUserInfo}
                        />
                    )}
                    {step === 2 && (
                        <RequiredInfoForm
                            userType={userInputValue.userType}
                            updateUserInfo={updateUserInfo}
                        />
                    )}
                    {step === 3 && (
                        <OptionalInfoForm
                            userType={userInputValue.userType}
                            updateUserInfo={updateUserInfo}
                        />
                    )}
                </RegistForm>
                <FormButton onClick={() => setStep(step + 1)}>등록하기</FormButton>
            </RegistFormBox>
        </StyledRegistUserInfoContainer>
    );
};

export const getServerSideProps = () => {
    return { props: {} };
};

const StyledRegistUserInfoContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
`;

const RegistFormBox = styled.div`
    position: relative;
    min-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.8em;
    padding: 0.5em;
    background-color: white;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
`;

const RegistFormHeader = styled.div`
    width: 100%;
    height: 30px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: #1c1c1c;
    margin-top: 50px;
`;

const RegistForm = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* gap: 1em; */
`;

const FormButton = styled.button`
    width: 100%;
    height: 45px;
    background-color: ${({ theme }) => theme.PRIMARY};
    color: ${({ theme }) => theme.WHITE};
    font-weight: bold;
    border-radius: 0.4em;
    font-size: 1.2em;
`;

export default RegistUserInfoContainer;
