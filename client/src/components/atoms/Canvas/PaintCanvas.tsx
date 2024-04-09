import { PointerEvent, RefObject } from 'react';
import styled from 'styled-components';

interface PaintCanvasProps {
    canvasRef: RefObject<HTMLCanvasElement>;
    presentationCanvasRef?: RefObject<HTMLCanvasElement>;
    handlePointerDown: ({ nativeEvent }: PointerEvent) => void;
    handlePointerMove: ({ nativeEvent }: PointerEvent) => void;
    handlePointerUp: ({ nativeEvent }: PointerEvent) => void;
}

const PaintCanvas = ({
    canvasRef,
    presentationCanvasRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
}: PaintCanvasProps) => {
    return (
        <DrawingLayer>
            {presentationCanvasRef && <Canvas ref={presentationCanvasRef} />}
            <Canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            />
        </DrawingLayer>
    );
};

const DrawingLayer = styled.div`
    position: absolute;
    top: 0;
    height: 0;
    width: 100%;
    height: 100%;
`;

const Canvas = styled.canvas`
    touch-action: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
`;

export default PaintCanvas;
