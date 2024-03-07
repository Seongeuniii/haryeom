import { PointerEvent, RefObject } from 'react';
import styled from 'styled-components';

interface PaintCanvasProps {
    canvasRef: RefObject<HTMLCanvasElement>;
    tempCanvasRef?: RefObject<HTMLCanvasElement>;
    handlePointerDown: ({ nativeEvent }: PointerEvent) => void;
    handlePointerMove: ({ nativeEvent }: PointerEvent) => void;
    handlePointerUp: ({ nativeEvent }: PointerEvent) => void;
}

const PaintCanvas = ({
    canvasRef,
    tempCanvasRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
}: PaintCanvasProps) => {
    return (
        <>
            {tempCanvasRef && <Canvas ref={tempCanvasRef} />}
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
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
`;

export default PaintCanvas;
