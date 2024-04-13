import { MutableRefObject, PointerEvent, RefObject, useCallback, useEffect, useState } from 'react';

interface IUseMyPaint {
    canvasRef: RefObject<HTMLCanvasElement>;
    contextRef: MutableRefObject<CanvasRenderingContext2D | null>;
    presentationContextRef?: MutableRefObject<CanvasRenderingContext2D | null>;
    penStyle?: IPenStyle;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SendAction?: (data: any) => void;
    erasePeerPaint?: (offset: IOffset) => void;
}

export interface IOffset {
    x: number;
    y: number;
}

export interface IPenStyle {
    isPen: boolean;
    strokeStyle: string;
    lineWidth: number;
}

const useMyPaint = ({
    canvasRef,
    contextRef,
    presentationContextRef,
    SendAction,
    erasePeerPaint,
}: IUseMyPaint) => {
    const [penStyle, setPenStyle] = useState<IPenStyle>({
        isPen: true,
        strokeStyle: 'black',
        lineWidth: 3,
    });
    const [points, setPoints] = useState<IOffset[]>([]);
    const [isDown, setIsDown] = useState<boolean>(false);

    useEffect(() => {
        if (!contextRef.current) return;
        contextRef.current.lineCap = 'round';
        contextRef.current.strokeStyle = penStyle.strokeStyle;
        contextRef.current.lineWidth = penStyle.lineWidth;
        SendAction && SendAction({ updatedPenStyle: penStyle });
    }, [penStyle, contextRef.current]);

    const changePenStyle = (value: IPenStyle) => {
        setPenStyle((prev) => ({ ...prev, penStyle: value }));
    };

    const erase = (offset: IOffset) => {
        if (!contextRef.current) return;
        const { x, y } = offset;
        contextRef.current.globalCompositeOperation = 'destination-out';
        contextRef.current.beginPath();
        contextRef.current.arc(x, y, 15, 0, Math.PI * 2);
        contextRef.current.fill();
        contextRef.current.closePath();
        contextRef.current.globalCompositeOperation = 'source-over';
        erasePeerPaint && erasePeerPaint(offset);
    };

    const handlePointerDown = ({ nativeEvent }: PointerEvent) => {
        if (!contextRef.current) return;
        setIsDown(true);
        const { offsetX, offsetY } = nativeEvent;
        setPoints((prev) => [...prev, { x: offsetX, y: offsetY }]);

        SendAction &&
            SendAction({
                action: 'down',
                offset: {
                    x: offsetX,
                    y: offsetY,
                    canvasWidth: canvasRef.current?.width,
                    canvasHeight: canvasRef.current?.height,
                },
            });
    };

    const handlePointerMove = ({ nativeEvent }: PointerEvent) => {
        if (!contextRef.current || !isDown) return;
        const { offsetX, offsetY } = nativeEvent;

        // TODO : 수정
        setPoints((prev) => [...prev, { x: offsetX, y: offsetY }]);
        // if (penStyle.isPen) {
        //     setPoints((prev) => [...prev, { x: offsetX, y: offsetY }]);
        // } else {
        //     erase({ x: offsetX, y: offsetY });
        // }

        SendAction &&
            SendAction({
                action: 'move',
                offset: {
                    x: offsetX,
                    y: offsetY,
                    canvasWidth: canvasRef.current?.width,
                    canvasHeight: canvasRef.current?.height,
                },
            });
    };

    const handlePointerUp = () => {
        if (!canvasRef.current || !contextRef.current) return;
        setIsDown(false);
        if (presentationContextRef?.current) {
            presentationContextRef.current.drawImage(
                canvasRef.current,
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height,
                0,
                0,
                canvasRef.current.clientWidth,
                canvasRef.current.clientHeight
            );
        }
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setPoints(() => []);
    };

    useEffect(() => {
        if (!canvasRef.current || !contextRef.current || points.length === 0) return;

        if (points.length < 3) {
            const b = points[0];
            contextRef.current.beginPath();
            contextRef.current.arc(b.x, b.y, contextRef.current.lineWidth / 2, 0, Math.PI * 2, !0);
            contextRef.current.fill();
            contextRef.current.closePath();
            return;
        }

        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        contextRef.current.beginPath();
        contextRef.current.moveTo(points[0].x, points[0].y);

        // eslint-disable-next-line no-var
        for (var i = 1; i < points.length - 2; i++) {
            const c = (points[i].x + points[i + 1].x) / 2;
            const d = (points[i].y + points[i + 1].y) / 2;

            contextRef.current.quadraticCurveTo(points[i].x, points[i].y, c, d);
        }

        contextRef.current.quadraticCurveTo(
            points[i].x,
            points[i].y,
            points[i + 1].x,
            points[i + 1].y
        );
        contextRef.current.stroke();
    }, [points]);

    const getCanvasDrawingImage = (size: { width: number; height: number }) => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = size.width as number;
        tempCanvas.height = size.height as number;
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
            tempCanvas.width,
            tempCanvas.height
        );
        const image = canvasRef.current.toDataURL();
        const blob = dataURItoBlob(image as string);
        return blob;
    };

    const resetCanvas = useCallback(() => {
        if (!canvasRef.current || !contextRef.current) return;
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }, []);

    return {
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        erase,
        getCanvasDrawingImage,
        resetCanvas,
        penStyle,
        changePenStyle,
    };
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
