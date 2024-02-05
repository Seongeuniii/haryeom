import { PointerEvent, RefObject } from 'react';
import styled from 'styled-components';

interface PaintCanvasProps {
    canvasRef: RefObject<HTMLCanvasElement>;
    handlePointerDown: ({ nativeEvent }: PointerEvent) => void;
    handlePointerMove: ({ nativeEvent }: PointerEvent) => void;
    handlePointerUp: ({ nativeEvent }: PointerEvent) => void;
}

const PaintCanvas = ({
    canvasRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
}: PaintCanvasProps) => {
    return (
        <Canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        />
    );
};

const Canvas = styled.canvas`
    touch-action: none;
    width: 100%;
    height: 100%;
    z-index: 3;
`;

const SaveCanvasDrawingButton = styled.button`
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 5px;
    border-radius: 6px;
    color: ${({ theme }) => theme.WHITE};
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};

    &:hover {
        color: ${({ theme }) => theme.WHITE};
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export default PaintCanvas;
