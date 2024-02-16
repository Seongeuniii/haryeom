import { StaticImageData } from 'next/image';

export interface IHomework {
    homeworkId: number;
    textbook: ITextbook;
    startPage: number;
    endPage: number;
    drawings: Drawing[];
}

export interface ISubmittedHomework {
    homeworkId: number;
    textbook: ITextbook;
    startPage: number;
    endPage: number;
    drawings: IReviewDrawing[];
}

export interface ITextbook {
    textbookId: number;
    textbookName: string;
    textbookUrl: string;
    totalPage: number;
}

export interface Drawing {
    drawingId: number;
    page: number;
    homeworkDrawingUrl: string;
}

export interface IReviewDrawing {
    drawingId: number;
    page: number;
    homeworkDrawingUrl: string;
    reviewDrawingUrl: string;
    teacherDrawingUrl: string;
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
