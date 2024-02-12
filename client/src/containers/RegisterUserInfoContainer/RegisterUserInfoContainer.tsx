import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import { IUserRole } from '@/apis/user/user';
import { registUser } from '@/apis/user/regist-user';
import RegisterLayout from '@/components/layouts/RegisterLayout';
import {
    SelectUserTypeForm,
    StudentOptionalForm,
    StudentRequiredForm,
    TeacherOptionalForm,
    TeacherRequiredForm,
} from '@/components/RegisterUserInfoForm';

export const registerStep: { [key: number]: string } = {
    1: '[필수] 회원 유형 선택',
    2: '[필수] 회원 정보 입력',
    3: '[선택] 회원 정보 입력',
};

const RegisterUserInfoContainer = () => {
    const router = useRouter();
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return;

    // TODO : 리팩토링
    // server or withauth에서 처리방법
    useEffect(() => {
        if (userSession.role !== 'GUEST') {
            router.push('/');
        }
    }, []);

    const [step, setStep] = useState<number>(1);
    const [selectedUserRole, setSelectedUserRole] = useState<IUserRole>('GUEST');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userInputValue, setUserInputValue] = useState<any>({
        name: '',
        school: '',
        grade: '',
        phone: '',
        college: '',
        collegeEmail: '',
        profileStatus: false,
        gender: '',
        salary: 0,
        career: 0,
        subjects: '',
        introduce: '',
    });
    const [isValidated, setIsValidated] = useState<{ [step: number]: boolean }>({
        1: false,
        2: false,
        3: false,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateUserInfo = (name: string, value: any) => {
        setUserInputValue({
            ...userInputValue,
            [name]: value,
        });
    };

    // 이전 모든 필드가 값이 있는지 확인하는 함수
    // const isAllFieldsFilled = (checkKeys: string[]) => {
    //     return Object.entries(userInputValue)
    //         .filter(([key, value]) => checkKeys.includes(key))
    //         .map(([key, value]) => value)
    //         .every((value) => value !== '' && value !== null);
    // };

    const isAllFieldsFilled = (checkKeys: string[]) => {
        const isAnyFieldEmpty = Object.entries(userInputValue)
            .filter(([key, value]) => checkKeys.includes(key))
            .map(([key, value]) => value)
            .some((value) => value === '' || value === null);

        if (isAnyFieldEmpty) {
            alert('모든 항목을 채워주세요!');
            return false;
        }

        return true;
    };

    // 학생 필드 validation
    const validateStudentFields = (): boolean => {
        if (!/^[가-힣]+$/.test(userInputValue.name)) {
            alert('이름은 한글이여야합니다.');
            return false;
        } else if (!/^[가-힣]+$/.test(userInputValue.school)) {
            alert('학교명은 한글이여야합니다.');
            return false;
        } else if (!/^[0-9]+$/.test(userInputValue.phone)) {
            alert('전화번호는 숫자여야합니다.');
            return false;
        }
        return true;
    };

    // 선생님 필수 입력 항목 validation
    const validateTeacherFields = (): boolean => {
        if (!/^[가-힣]+$/.test(userInputValue.name)) {
            alert('이름은 한글이여야합니다.');
            return false;
        } else if (!/^[0-9]+$/.test(userInputValue.phone)) {
            alert('전화번호는 숫자여야합니다.');
            return false;
        } else if (
            !/^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(userInputValue.collegeEmail)
        ) {
            alert('이메일 형식이 아닙니다.');
            return false;
        } else if (!/^[가-힝]+$/.test(userInputValue.college)) {
            alert('대학명은 한글이여야합니다.');
            return false;
        }
        return true;
    };

    // 선생님 선택 입력 항목 validation
    const validateTeacherSelectFields = (checkKeys: string[]): boolean => {
        if (userInputValue.profileStatus) {
            if (!isAllFieldsFilled(checkKeys)) {
                return false;
            } else if (!/^[0-9]+$/.test(userInputValue.salary)) {
                alert('예상 과외비는 숫자여야합니다.');
                return false;
            } else if (userInputValue.subjects == null || userInputValue.subjects == '') {
                alert('과목을 선택해주세요.');
                return false;
            } else if (!/^[0-9]+$/.test(userInputValue.career)) {
                alert('경력은 숫자여야합니다.');
                return false;
            } else if (userInputValue.introduce.length > 1000) {
                alert('선생님 소개는 1000자 이하여야합니다.');
                return false;
            }
        }
        return true;
    };
    const checkValidated = () => {
        switch (step) {
            case 1:
                if (selectedUserRole === 'GUEST') {
                    alert('회원 유형을 선택해주세요:)');
                    return false;
                }
                return true;
            case 2:
                if (
                    (selectedUserRole === 'STUDENT' &&
                        isAllFieldsFilled(['name', 'phone', 'grade', 'school']) &&
                        validateStudentFields()) ||
                    (selectedUserRole === 'TEACHER' &&
                        isAllFieldsFilled(['name', 'phone', 'college', 'collegeEmail']) &&
                        validateTeacherFields())
                ) {
                    return true;
                }
                // 중복으로 삭제
                // alert('모든 항목을 입력해주세요:)');
                return false;
            case 3:
                if (
                    selectedUserRole === 'TEACHER' &&
                    validateTeacherSelectFields(['salary', 'subjects', 'career', 'introduce'])
                ) {
                    return true;
                }
                // 중복으로 삭제
                // alert('모든 항목을 입력해주세요:)');
                return false;
        }
    };

    const upload = async () => {
        if (!checkValidated()) return;
        if (
            (step === 2 && selectedUserRole === 'STUDENT') ||
            (step === 3 && selectedUserRole === 'TEACHER')
        ) {
            const message = (await registUser(selectedUserRole, userInputValue)) ? '성공' : '실패';
            alert(`회원 등록에 ${message}했어요:)`);
            // router.reload();
        } else {
            setStep((prev) => prev + 1);
        }
    };

    return (
        <RegisterLayout>
            <StyledRegisterUserInfoContainer>
                <RegisterFormBox>
                    <RegisterFormHeader>{registerStep[step]}</RegisterFormHeader>
                    <RegisterForm>
                        {step === 1 && (
                            <SelectUserTypeForm
                                userRole={selectedUserRole}
                                setSelectedUserRole={setSelectedUserRole}
                            />
                        )}
                        {step === 2 &&
                            (selectedUserRole === 'TEACHER' ? (
                                <TeacherRequiredForm updateUserInfo={updateUserInfo} />
                            ) : (
                                <StudentRequiredForm updateUserInfo={updateUserInfo} />
                            ))}
                        {step === 3 &&
                            (selectedUserRole === 'TEACHER' ? (
                                <TeacherOptionalForm updateUserInfo={updateUserInfo} />
                            ) : (
                                <StudentOptionalForm />
                            ))}
                    </RegisterForm>
                    {step === 1 ? (
                        <FormButton onClick={upload}>
                            <span>등록하기</span>
                        </FormButton>
                    ) : (
                        <FormButton onClick={upload}>
                            <span>등록하기</span>
                            <span>
                                ( {step - 1} / {selectedUserRole === 'STUDENT' ? 1 : 2} )
                            </span>
                        </FormButton>
                    )}
                </RegisterFormBox>
            </StyledRegisterUserInfoContainer>
        </RegisterLayout>
    );
};

export const getServerSideProps = () => {
    return { props: {} };
};

const StyledRegisterUserInfoContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RegisterFormBox = styled.div`
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

const RegisterFormHeader = styled.div`
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    padding-top: 1em;
`;

const RegisterForm = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
`;

const FormButton = styled.button`
    width: 100%;
    padding: 0.5em;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    color: ${({ theme }) => theme.WHITE};
    font-size: 16px;
    font-weight: bold;
    border-radius: 0.4em;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export default RegisterUserInfoContainer;
