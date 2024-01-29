import { StaticImageData } from 'next/image';

export interface IHomework {
    homeworkId: number;
    textbook: Textbook;
    startPage: number;
    endPage: number;
    drawings: Drawing[];
}

export interface Textbook {
    textbookId: number;
    textbookName: string;
    textbookUrl: string;
    totalPage: number;
}

export interface Drawing {
    page: number;
    homeworkDrawingUrl: string | StaticImageData;
    drawingId: number;
}

export type IHomeworkStatus = 'UNCONFIRMED' | 'IN_PROGRESS' | 'COMPLETED';
export type IProgressPercentage = number;

export interface IHomeworkPreview {
    homeworkId: number;
    textbookId: number;
    textbookName: string;
    startPage: number;
    endPage: number;
    status: IHomeworkStatus;
    deadline: string;
}

export type IHomeworkList = IHomeworkPreview[];
