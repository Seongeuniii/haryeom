import { PointerEvent, useEffect, useRef, useState } from 'react';

interface IUsePeerPaint {
    backgroundImage?: Blob | string;
    dataChannels: RTCDataChannel[];
}

const usePeerPaint = ({ backgroundImage, dataChannels }: IUsePeerPaint) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const canvasInformRef = useRef({
        width: 0,
        height: 0,
        pixelRatio: 1,
    });
    const [penStyle, setPenStyle] = useState<{
        isPen: boolean;
        strokeStyle: string;
        lineWidth: number;
    }>({
        isPen: true,
        strokeStyle: 'black',
        lineWidth: 3,
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

    useEffect(() => {
        console.log(penStyle);
        if (!contextRef.current) return;
        contextRef.current.strokeStyle = penStyle.strokeStyle;
        contextRef.current.lineWidth = penStyle.lineWidth;
    }, [penStyle]);

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
    const handlePointerDown = (offset: any) => {
        if (!contextRef.current) return;
        const { x, y } = offset;
        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePointerMove = (offset: any) => {
        if (!contextRef.current) return;
        const { x, y } = offset;

        if (penStyle.isPen) {
            contextRef.current.lineTo(x, y);
            contextRef.current.stroke();
        } else {
            contextRef.current.globalCompositeOperation = 'destination-out';
            contextRef.current.beginPath();
            contextRef.current.arc(x, y, 15, 0, Math.PI * 2);
            contextRef.current.fill();
            contextRef.current.closePath();
            contextRef.current.globalCompositeOperation = 'source-over';
        }
    };

    const handlePointerUp = () => {
        if (!contextRef.current) return;
        contextRef.current.closePath();
    };

    useEffect(() => {
        dataChannels.map((channel: RTCDataChannel) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            channel.onmessage = (e: MessageEvent<any>) => {
                const { type, action, offset, updatedPenStyle } = JSON.parse(e.data);
                if (action === 'down') handlePointerDown(offset);
                else if (action === 'move') requestAnimationFrame(() => handlePointerMove(offset));
                else handlePointerUp();

                if (updatedPenStyle) {
                    setPenStyle(updatedPenStyle);
                }
            };
        });
    }, [dataChannels, penStyle]);

    return { canvasRef };
};

export default usePeerPaint;
