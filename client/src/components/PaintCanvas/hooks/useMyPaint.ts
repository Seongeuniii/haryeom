import { MutableRefObject, PointerEvent, RefObject, useEffect, useRef, useState } from 'react';
import { IPenStyle } from '@/hooks/useClass';

interface IUseMyPaint {
    canvasRef: RefObject<HTMLCanvasElement>;
    contextRef: MutableRefObject<CanvasRenderingContext2D | null>;
    tempContextRef?: MutableRefObject<CanvasRenderingContext2D | null>;
    penStyle: IPenStyle;
    dataChannels?: RTCDataChannel[];
    erasePeerPaint?: (offset: IOffset) => void;
}

interface IOffset {
    x: number;
    y: number;
}

const useMyPaint = ({
    canvasRef,
    contextRef,
    tempContextRef,
    penStyle,
    dataChannels,
    erasePeerPaint,
}: IUseMyPaint) => {
    const [isDown, setIsDown] = useState<boolean>(false);
    const [points, setPoints] = useState<IOffset[]>([]);

    useEffect(() => {
        if (!contextRef.current) return;
        contextRef.current.lineCap = 'round';
        contextRef.current.strokeStyle = penStyle.strokeStyle;
        contextRef.current.lineWidth = penStyle.lineWidth;
        SendAction({ updatedPenStyle: penStyle });
    }, [penStyle, contextRef.current]);

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

        if (penStyle.isPen) {
            setPoints((prev) => [...prev, { x: offsetX, y: offsetY }]);
        } else {
            erase({ x: offsetX, y: offsetY });
        }

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
        if (tempContextRef?.current) {
            tempContextRef.current.drawImage(
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

    const resetCanvas = () => {
        if (!canvasRef.current || !contextRef.current) return;
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SendAction = (data: any) => {
        dataChannels?.map((channel: RTCDataChannel) => {
            if (Object.values(data).every((value) => typeof value !== 'undefined')) {
                try {
                    channel.send(JSON.stringify(data));
                } catch (e) {
                    console.log('전송 실패');
                }
            }
        });
    };

    return {
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        erase,
        getCanvasDrawingImage,
        resetCanvas,
        penStyle,
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
