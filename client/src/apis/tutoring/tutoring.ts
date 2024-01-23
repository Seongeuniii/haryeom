export interface Subject {
    subjectId: number;
    name: string;
}

export interface StudentReceivingTutoring {
    studentMemberId: number;
    studentName: string;
    studentProfileUrl: string;
    studentSchool: string;
    studentGrade: string;
}

export interface ITeacherTutoring {
    tutoringId: number;
    student: StudentReceivingTutoring;
    subject: Subject;
}

export type ITeacherTutorings = ITeacherTutoring[];

export interface TeacherGivingTutoring {
    teacherId: number;
    teacherName: string;
    teacherProfileUrl: string;
}

export interface IStudentTutoring {
    tutoringId: number;
    teacher: TeacherGivingTutoring;
    subject: Subject;
}

export type IStudentTutorings = IStudentTutoring[];

export type ITutorings = ITeacherTutorings | IStudentTutorings;

export interface IStudentSchedule {
    tutoringScheduleId: number;
    tutoringId: number;
    teacherMemberId: number;
    subject: Subject;
    startTime: string;
    duration: number;
    title: string;
}

export interface IStudentTutoringSchedule {
    scheduleDate: string;
    scheduleCount: number;
    schedules: IStudentSchedule[];
}

export type IStudentTutoringSchedules = IStudentTutoringSchedule[];

export interface ITeacherSchedule {
    tutoringScheduleId: number;
    tutoringId: number;
    studentMemberId: number;
    studentName: string;
    studentProfileUrl: string;
    startTime: string;
    duration: number;
    title: string;
}

export interface ITeacherTutoringSchedule {
    scheduleDate: string;
    scheduleCount: number;
    schedules: ITeacherSchedule[];
}

export type ITeacherTutoringSchedules = ITeacherTutoringSchedule[];

export type ITutoringSchedules = ITeacherTutoringSchedules | IStudentTutoringSchedules;
