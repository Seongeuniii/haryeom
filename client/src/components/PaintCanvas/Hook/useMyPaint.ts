import { Dispatch, RefObject, SetStateAction } from 'react';
import { StaticImageData } from 'next/image';

interface IUseMyPaint {
    updateImageSource?: Dispatch<
        SetStateAction<{
            [key: number]: string | StaticImageData;
        }>
    >;
}

const useMyPaint = ({ updateImageSource }: IUseMyPaint) => {
    const save = (canvasRef: RefObject<HTMLCanvasElement>, pageNum: number) => {
        if (!updateImageSource) return;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 538; // 실제값으로
        tempCanvas.height = 737;
        const tempContext = tempCanvas.getContext('2d');
        if (!tempContext) {
            console.error('Failed to get 2D context from temporary canvas.');
            return;
        }
        if (!canvasRef.current) return;

        tempContext.drawImage(
            canvasRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
            0,
            0,
            538,
            737
        );
        const image = canvasRef.current?.toDataURL();
        const blob = dataURItoBlob(image as string);
        const staticImageData = URL.createObjectURL(blob);

        updateImageSource((prev) => {
            const newImageSource = { ...prev };
            newImageSource[pageNum] = staticImageData;
            return newImageSource;
        });
    };

    return { save };
};

export default useMyPaint;

const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
};
