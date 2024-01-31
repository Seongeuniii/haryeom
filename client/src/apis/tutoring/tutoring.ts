export type ITutorings = ITeacherTutorings | IStudentTutorings;
export type ITeacherTutorings = ITeacherTutoring[];
export type IStudentTutorings = IStudentTutoring[];

export interface ITeacherTutoring {
    tutoringId: number;
    student: StudentReceivingTutoring;
    subject: Subject;
}
export interface IStudentTutoring {
    tutoringId: number;
    teacher: TeacherGivingTutoring;
    subject: Subject;
}

export interface TeacherGivingTutoring {
    teacherId: number;
    teacherName: string;
    teacherProfileUrl: string;
}
export interface StudentReceivingTutoring {
    studentMemberId: number;
    studentName: string;
    studentProfileUrl: string;
    studentSchool: string;
    studentGrade: string;
}

export type ITutoringSchedules = ITeacherTutoringSchedules | IStudentTutoringSchedules;
export type ITeacherTutoringSchedules = ITeacherTutoringSchedule[];
export type IStudentTutoringSchedules = IStudentTutoringSchedule[];

export interface ITeacherTutoringSchedule {
    scheduleDate: string;
    scheduleCount: number;
    schedules: ITeacherSchedule[];
}
export interface IStudentTutoringSchedule {
    scheduleDate: string;
    scheduleCount: number;
    schedules: IStudentSchedule[];
}

export interface ITeacherSchedule {
    tutoringScheduleId: number;
    tutoringId: number;
    studentMemberId: number;
    studentName: string;
    studentProfileUrl: string;
    subject: Subject;
    startTime: string;
    duration: number;
    title: string;
}

export interface IStudentSchedule {
    tutoringScheduleId: number;
    tutoringId: number;
    teacherMemberId: number;
    teacherName: string;
    teacherProfileUrl: string;
    subject: Subject;
    startTime: string;
    duration: number;
    title: string;
}

export interface Subject {
    subjectId: number;
    name: string;
}
