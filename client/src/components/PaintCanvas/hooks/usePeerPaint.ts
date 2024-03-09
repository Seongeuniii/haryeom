import { IPenStyle } from '@/hooks/useClass';
import { MutableRefObject, PointerEvent, RefObject, useEffect, useRef, useState } from 'react';
import { IOffset } from './useMyPaint';

interface IUsePeerPaint {
    canvasRef: RefObject<HTMLCanvasElement>;
    presentationContextRef?: MutableRefObject<CanvasRenderingContext2D | null>;
    backgroundImage?: Blob | string;
    penStyle: IPenStyle;
}

const usePeerPaint = ({
    canvasRef,
    presentationContextRef,
    backgroundImage,
    penStyle,
}: IUsePeerPaint) => {
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const canvasInformRef = useRef({
        width: 0,
        height: 0,
        pixelRatio: 1,
    });

    useEffect(() => {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
            canvasInformRef.current = {
                width: 0,
                height: 0,
                pixelRatio: window.devicePixelRatio > 1 ? 2 : 1,
            };
        }
    }, []);

    useEffect(() => {
        init();
    }, [canvasRef.current, backgroundImage]);

    const init = () => {
        if (!canvasRef.current) return;
        const { clientWidth, clientHeight } = canvasRef.current;
        canvasSizeSetting(clientWidth, clientHeight);

        const context = canvasRef.current.getContext('2d');
        if (!context) return;
        canvasContextSetting(context);
        canvasBackgroundSetting(context);
    };

    const canvasSizeSetting = (width: number, height: number) => {
        if (!canvasRef.current) return;
        const resultWidth = width * canvasInformRef.current.pixelRatio;
        const resultHeight = height * canvasInformRef.current.pixelRatio;

        canvasRef.current.width = resultWidth;
        canvasRef.current.height = resultHeight;

        canvasInformRef.current.width = resultWidth;
        canvasInformRef.current.height = resultHeight;
    };

    const canvasContextSetting = (ctx: CanvasRenderingContext2D) => {
        if (!ctx) return;
        ctx.scale(canvasInformRef.current.pixelRatio, canvasInformRef.current.pixelRatio);
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        contextRef.current = ctx;
    };

    const canvasBackgroundSetting = (ctx: CanvasRenderingContext2D) => {
        if (!backgroundImage) return;

        const imageObj = new Image();
        if (typeof backgroundImage === 'string') {
            imageObj.src = backgroundImage;
        } else {
            imageObj.src = URL.createObjectURL(backgroundImage);
        }

        imageObj.onload = () => {
            if (!canvasRef.current) return;
            const { clientWidth, clientHeight } = canvasRef.current;
            const imageAspectRatio = imageObj.width / imageObj.height;

            let newWidth, newHeight;
            if (clientWidth / clientHeight > imageAspectRatio) {
                newWidth = clientHeight * imageAspectRatio;
                newHeight = clientHeight;
            } else {
                newWidth = clientWidth;
                newHeight = clientWidth / imageAspectRatio;
            }
            ctx?.drawImage(
                imageObj,
                0,
                0,
                imageObj.width,
                imageObj.height,
                0,
                0,
                newWidth,
                newHeight
            );
        };
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const erase = (offset: any) => {
        if (!contextRef.current) return;
        const { x, y } = offset;
        contextRef.current.globalCompositeOperation = 'destination-out';
        contextRef.current.beginPath();
        contextRef.current.arc(x, y, 15, 0, Math.PI * 2);
        contextRef.current.fill();
        contextRef.current.closePath();
        contextRef.current.globalCompositeOperation = 'source-over';
    };

    const [points, setPoints] = useState<IOffset[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePointerDown = (offset: any) => {
        if (!contextRef.current) return;
        const { x, y } = offset;
        setPoints((prev) => [...prev, { x, y }]);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePointerMove = (offset: any) => {
        if (!contextRef.current) return;
        const { x, y } = offset;

        if (penStyle.isPen) {
            setPoints((prev) => [...prev, { x, y }]);
        } else {
            erase(offset);
        }
    };

    const handlePointerUp = () => {
        if (!contextRef.current || !canvasRef.current) return;
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

    const paint = () => {
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
    };

    useEffect(() => {
        paint();
    }, [points]);

    const resetCanvas = () => {
        if (!canvasRef.current || !contextRef.current) return;
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    return { handlePointerDown, handlePointerMove, handlePointerUp, erase, resetCanvas };
};

export default usePeerPaint;
