export const registUserInfoStep: { [key: number]: string } = {
    1: '[필수] 회원 유형 선택',
    2: '[필수] 회원 정보 입력',
    3: '[선택] 회원 정보 입력',
};

export const requiredInfos: UserInfos = {
    student: [
        { type: 'input', label: '이름', name: 'name' },
        { type: 'input', label: '학교', name: 'school' },
        {
            type: 'select',
            label: '학년',
            name: 'grades',
            value: [
                '초등학교 1학년',
                '초등학교 2학년',
                '초등학교 3학년',
                '초등학교 4학년',
                '초등학교 5학년',
                '초등학교 6학년',
                '중학교 1학년',
                '중학교 2학년',
                '중학교 3학년',
                '고등학교 1학년',
                '고등학교 2학년',
                '고등학교 3학년',
                '재수/N수생',
            ],
        },
        { type: 'input', label: '전화번호', name: 'phoneNumber' },
    ],
    teacher: [
        { type: 'input', label: '이름', name: 'name' },
        { type: 'input', label: '대학교', name: 'university' },
        { type: 'input', label: '대학교 이메일 인증', name: 'certifyUniv' },
        { type: 'input', label: '전화번호', name: 'phoneNumber' },
    ],
};

export const optionalInfos: UserInfos = {
    student: [],
    teacher: [
        { type: 'input', label: '프로필 공개 여부', name: 'profileLock' },
        { type: 'select', label: '성별', name: 'sex', value: ['여', '남'] },
        { type: 'input', label: '예상 과외비', name: 'fee' },
        { type: 'select', label: '가르칠 과목', name: 'career', value: ['국어', '영어', '수학'] },
        { type: 'input', label: '선생님 소개', name: 'introduce' },
    ],
};

export interface UserInfoForm {
    userType: UserType;
    name: string;
    grades: string;
    school: string;
    phoneNumber: string;
}

export type UserType = 'student' | 'teacher';

export type UserInfos = {
    [key in UserType]: Form[];
};

export interface Form {
    type: 'select' | 'input';
    label: string;
    name: string;
    value?: string[];
}
