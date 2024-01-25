import { PointerEvent, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StaticImageData } from 'next/image';

interface PaintCanvasProps {
    imageSource: StaticImageData | string;
    save: (canvasRef: RefObject<HTMLCanvasElement>, pageNum: number) => void;
    pdfPageSize: { width: number; height: number };
    pageNum: number;
}

const PaintCanvas = ({ imageSource, save, pdfPageSize, pageNum }: PaintCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const canvasInformRef = useRef({
        width: 0,
        height: 0,
        pixelRatio: 1,
    });
    const [isDown, setIsDown] = useState<boolean>(false);

    useEffect(() => {
        init();
    }, [pdfPageSize]);

    useEffect(() => {
        init();
    }, [imageSource]);

    useEffect(() => {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
            canvasInformRef.current = {
                width: 0,
                height: 0,
                pixelRatio: window.devicePixelRatio > 1 ? 2 : 1,
            };
            init();
        }
    }, []);

    const init = () => {
        if (!canvasRef.current) return;
        const { clientWidth, clientHeight } = canvasRef.current;
        canvasSizeSetting(clientWidth, clientHeight);
        const context = canvasRef.current.getContext('2d');
        if (!context) return;
        canvasContextSetting(context);
        canvasBackgroundSetting(context);
    };

    const canvasBackgroundSetting = (ctx: CanvasRenderingContext2D) => {
        if (!imageSource) return;

        const backgroundImage = new Image();
        if (typeof imageSource === 'string') {
            backgroundImage.src = imageSource;
        } else {
            backgroundImage.src = imageSource.src;
        }

        backgroundImage.onload = () => {
            if (!canvasRef.current) return;
            canvasRef.current.width = backgroundImage.width;
            canvasRef.current.height = backgroundImage.height;
            ctx?.drawImage(
                backgroundImage,
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
        };
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

    const handlePointerDown = ({ nativeEvent }: PointerEvent) => {
        setIsDown(true);
        if (!contextRef.current) return;
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    };

    const handlePointerMove = ({ nativeEvent }: PointerEvent) => {
        if (!isDown || !contextRef.current) return;
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const handlePointerUp = () => {
        setIsDown(false);
        if (!contextRef.current) return;
        contextRef.current.closePath();
    };

    return (
        <>
            <Button onClick={() => save(canvasRef, pageNum)}>저장</Button>
            <Canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            />
        </>
    );
};

const Canvas = styled.canvas`
    touch-action: none;
    width: 100%;
    height: 100%;
    z-index: 3;
`;

const Button = styled.button`
    position: absolute;
`;

export default PaintCanvas;
