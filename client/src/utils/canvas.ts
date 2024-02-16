import { RefObject } from 'react';

export interface ICanvasSize {
    width: number;
    height: number;
}

export const saveDrawing = ({
    canvasRef,
    size,
}: {
    canvasRef: RefObject<HTMLCanvasElement>;
    size: ICanvasSize;
}) => {
    if (!canvasRef.current) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = size.width;
    tempCanvas.height = size.height;
    const tempContext = tempCanvas.getContext('2d');

    if (!tempContext) return;

    tempContext.drawImage(
        canvasRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
    );
    const image = canvasRef.current.toDataURL();
    const blob = dataURItoBlob(image as string);
    return blob;
};

export const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
};
