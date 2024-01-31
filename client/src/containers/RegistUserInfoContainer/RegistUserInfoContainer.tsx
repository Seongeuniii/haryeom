import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { registUserInfoStep } from './infoForm';
import RequiredInfoForm from './RequiredInfoForm';
import OptionalInfoForm from './OptionalInfoForm';
import SelectUserTypeForm from './SelectUserTypeForm';
import { IUserInfo, IUserRole } from '@/apis/user/user';
import RegisterLayout from '@/components/layouts/RegisterLayout';
import { registUser } from '@/apis/user/regist-user';
import { useRouter } from 'next/router';

const RegistUserInfoContainer = () => {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [userRole, setUserRole] = useState<IUserRole>('GUEST'); // usersession 변경
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

    const updateUserInfo = (name: string, value: string | number) => {
        setUserInputValue({
            ...userInputValue,
            [name]: value,
        });
    };

    const checkInputValidate = async () => {
        if (step === 1) {
            if (userRole === 'GUEST') {
                alert('유저 유형을 선택해주세요'); // style 변경
                return;
            } else {
                setStep((prev) => prev + 1);
            }
        } else if (step === 2) {
            if (userRole === 'STUDENT') {
                const message = await registUser(userRole, userInputValue);
                alert(`회원 등록에 ${message}했어요:)`);
                router.push('/');
            } else {
                setStep((prev) => prev + 1);
            }
        } else if (step === 3) {
            if (userRole === 'TEACHER') {
                const message = await registUser(userRole, userInputValue);
                alert(`회원 등록에 ${message}했어요:)`);
                router.push('/');
            } else {
                setStep((prev) => prev + 1);
            }
        }
    };

    return (
        <RegisterLayout>
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
                    <FormButton onClick={checkInputValidate}>등록하기</FormButton>
                </RegistFormBox>
            </StyledRegistUserInfoContainer>
        </RegisterLayout>
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
    padding: 2em;
    background-color: white;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
`;

const RegistFormHeader = styled.div`
    width: 100%;
    height: 30px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 1em 0;
`;

const RegistForm = styled.div`
    width: 100%;
    padding: 1em 0 1.5em 0;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormButton = styled.button`
    width: 100%;
    padding: 0.5em;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    color: ${({ theme }) => theme.WHITE};
    font-weight: bold;
    border-radius: 0.4em;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export default RegistUserInfoContainer;
