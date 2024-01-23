export interface IHomework {
    homeworkId: number;
    textbookId: number;
    textbookName: string;
    startPage: number;
    endPage: number;
    status: IHomeworkStatus;
    deadline: string;
}

export type IHomeworkStatus = 'UNCONFIRMED' | 'IN_PROGRESS' | 'COMPLETED';

export type IProgressPercentage = number;
