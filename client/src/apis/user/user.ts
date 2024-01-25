export type IUserRole = 'TEACHER' | 'STUDENT' | 'GUEST';

export interface IUser {
    memberId: number;
    role: IUserRole;
    name: string;
    profileUrl: string;
}

export interface IStudentInfo {
    name: string;
    school: string;
    grade: string;
    phone: string;
    profileUrl: string;
}
export type IStudentInfoKeys = keyof IStudentInfo;

export interface ITeacherInfo {
    name: string;
    college: string;
    collegeEmail: string;
    phone: string;
    profileUrl: string;
    profileStatus: boolean;
    gender?: string;
    salary?: number;
    career?: number;
    subjects?: string;
    introduce?: string;
}
export type TeacherInfoKeys = keyof ITeacherInfo;

export interface IUserInfo extends IStudentInfo, ITeacherInfo {}
