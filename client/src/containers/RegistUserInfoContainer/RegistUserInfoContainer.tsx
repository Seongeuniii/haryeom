import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { registUserInfoStep } from './infoForm';
import RequiredInfoForm from './RequiredInfoForm';
import OptionalInfoForm from './OptionalInfoForm';
import SelectUserTypeForm from './SelectUserTypeForm';
import { IUserRole } from '@/apis/user/user';
import RegisterLayout from '@/components/layouts/RegisterLayout';
import { registUser } from '@/apis/user/regist-user';
import userSessionAtom from '@/recoil/atoms/userSession';

const RegistUserInfoContainer = () => {
    const router = useRouter();
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return;

    const [step, setStep] = useState<number>(1);
    const [selectedUserRole, setSelectedUserRole] = useState<IUserRole>('GUEST');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userInputValue, setUserInputValue] = useState<any>({
        name: '',
        school: '',
        grade: '',
        phone: '',
        profileUrl: userSession?.profileUrl,
        college: '',
        collegeEmail: '',
        profileStatus: false,
        gender: '',
        salary: 0,
        career: 0,
        subjects: '',
        introduce: '',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateUserInfo = (name: string, value: any) => {
        setUserInputValue({
            ...userInputValue,
            [name]: value,
        });
    };

    const isAllFieldsFilled = (checkKeys: string[]) => {
        return Object.entries(userInputValue)
            .filter(([key, value]) => checkKeys.includes(key))
            .map(([key, value]) => value)
            .every((value) => value !== '' && value !== null);
    };

    const checkInputValidate = async () => {
        if (step === 1) {
            if (selectedUserRole === 'GUEST') {
                alert('회원 유형을 선택해주세요');
                return;
            } else {
                setStep((prev) => prev + 1);
            }
        } else if (step === 2) {
            if (selectedUserRole === 'STUDENT') {
                if (!isAllFieldsFilled(['name', 'school', 'grade', 'phone'])) {
                    alert('모든 항목을 입력해주세요');
                    return;
                }
                const message = await registUser(selectedUserRole, userInputValue);
                alert(`회원 등록에 ${message}했어요:)`);
                router.push('/');
            } else {
                if (!isAllFieldsFilled(['name', 'college', 'collegeEmail', 'phone'])) {
                    alert('모든 항목을 입력해주세요');
                    return;
                }
                setStep((prev) => prev + 1);
            }
        } else if (step === 3) {
            if (selectedUserRole === 'TEACHER') {
                if (
                    userInputValue.profileStatus === '공개' &&
                    !isAllFieldsFilled(['gender', 'salary', 'career', 'subjects', 'introduce'])
                ) {
                    alert('모든 항목을 입력해주세요');
                    return;
                }
                const message = await registUser(selectedUserRole, userInputValue);
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
                            <SelectUserTypeForm
                                userRole={selectedUserRole}
                                setUserRole={setSelectedUserRole}
                            />
                        )}
                        {step === 2 && (
                            <RequiredInfoForm
                                userRole={selectedUserRole}
                                updateUserInfo={updateUserInfo}
                            />
                        )}
                        {step === 3 && (
                            <OptionalInfoForm
                                userRole={selectedUserRole}
                                updateUserInfo={updateUserInfo}
                            />
                        )}
                    </RegistForm>
                    {step === 1 ? (
                        <FormButton onClick={checkInputValidate}>등록하기</FormButton>
                    ) : (
                        <FormButton onClick={checkInputValidate}>
                            등록하기 ({step - 1} / {selectedUserRole === 'STUDENT' ? 1 : 2} )
                        </FormButton>
                    )}
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
    padding: 1.7em 2em;
    background-color: white;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
`;

const RegistFormHeader = styled.div`
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding-top: 1em;
`;

const RegistForm = styled.div`
    width: 100%;
    padding-top: 1em 0 1.5em 0;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormButton = styled.button`
    width: 100%;
    padding: 0.7em;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    color: ${({ theme }) => theme.WHITE};
    font-weight: bold;
    border-radius: 0.4em;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export default RegistUserInfoContainer;
