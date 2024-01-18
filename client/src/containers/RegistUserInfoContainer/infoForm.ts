import { IStudentInfoKeys, TeacherInfoKeys, IUserRole } from '@/components/apis/user/user';

export interface Form {
    inputType: 'select' | 'text';
    label: string;
    option?: string | number | string[] | boolean[];
}

export type IUserInfoForm = {
    [key in IStudentInfoKeys | TeacherInfoKeys]: Form;
};

export type UserInfos = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [key in IUserRole]: IUserInfoForm | {};
};

export const registUserInfoStep: { [key: number]: string } = {
    1: '[필수] 회원 유형 선택',
    2: '[필수] 회원 정보 입력',
    3: '[선택] 회원 정보 입력',
};

export const requiredInfos: UserInfos = {
    teacher: {
        profileUrl: { inputType: 'text', label: '프로필 사진' },
        name: { inputType: 'text', label: '이름' },
        college: { inputType: 'text', label: '대학교' },
        collegeEmail: { inputType: 'text', label: '대학교 이메일 인증', name: 'collegeEmail' },
        phone: { inputType: 'text', label: '전화번호', name: 'phone' },
    },
    student: {
        profileUrl: { inputType: 'text', label: '프로필 사진' },
        name: { inputType: 'text', label: '이름' },
        school: { inputType: 'text', label: '학교' },
        grade: {
            inputType: 'select',
            label: '학년',
            option: [
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
        phone: { inputType: 'text', label: '전화번호' },
    },
    guest: {},
};

export const optionalInfos: UserInfos = {
    teacher: {
        profileStatus: {
            inputType: 'select',
            label: '프로필 공개 여부',
            option: [true, false],
        },
        gender: { inputType: 'select', label: '성별', option: ['male', 'female'] },
        salary: { inputType: 'text', label: '예상 과외비' },
        career: { inputType: 'text', label: '경력' },
        subjects: {
            inputType: 'select',
            label: '가르칠 과목',
            option: ['국어', '영어', '수학'],
        },
        introduce: { inputType: 'text', label: '선생님 소개' },
    },
    student: {},
    guest: {},
};
