export type Gender = 'MALE' | 'FEMALE';

export interface IFilterOptionValue {
    subjectIds: number[];
    colleges: string[];
    minCareer: number;
    gender: Gender;
    maxSalary: number;
}
