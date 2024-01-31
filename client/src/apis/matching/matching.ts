import { ISubject } from '../tutoring/tutoring';

export interface IOpenTeacher {
    teacherId: number;
    profileUrl: string;
    name: string;
    college: string;
    career: number;
    gender: string;
    salary: number;
    subjects: ISubject[];
}
