import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { registUserInfoStep } from './infoForm';
import RequiredInfoForm from './RequiredInfoForm';
import OptionalInfoForm from './OptionalInfoForm';
import SelectUserTypeForm from './SelectUserTypeForm';
import { IUserInfo, IUserRole } from '@/apis/user/user';
import userSessionAtom from '@/recoil/atoms/userSession';
import { useRecoilValue } from 'recoil';

const RegistUserInfoContainer = () => {
    const [step, setStep] = useState<number>(1);
    const [userRole, setUserRole] = useState<IUserRole>('guest');
    const [userInputValue, setUserInputValue] = useState<IUserInfo>({
        name: '',
        school: '',
        grade: '',
        phone: '',
        profileUrl: '',
        college: '',
        collegeEmail: '',
        profileStatus: false,
        gender: '',
        salary: 0,
        career: 0,
        subjects: '',
        introduce: '',
    });

    const userSession = useRecoilValue(userSessionAtom);

    const updateUserInfo = (name: string, value: string | number) => {
        setUserInputValue({
            ...userInputValue,
            [name]: value,
        });
    };

    useEffect(() => {
        if (userRole === 'teacher' && step === 4) {
            console.log('끝');
        } else if (userRole === 'student' && step === 3) {
            console.log('끝');
        }
    }, [step, userRole]);

    useEffect(() => {
        console.log('regist', userSession);
    }, []);

    return (
        <StyledRegistUserInfoContainer>
            <RegistFormBox>
                <RegistFormHeader>{registUserInfoStep[step]}</RegistFormHeader>
                <RegistForm>
                    {step === 1 && (
                        <SelectUserTypeForm userRole={userRole} setUserRole={setUserRole} />
                    )}
                    {step === 2 && (
                        <RequiredInfoForm userRole={userRole} updateUserInfo={updateUserInfo} />
                    )}
                    {step === 3 && (
                        <OptionalInfoForm userRole={userRole} updateUserInfo={updateUserInfo} />
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
