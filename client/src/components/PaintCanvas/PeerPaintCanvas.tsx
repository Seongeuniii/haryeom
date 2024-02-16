import { PointerEvent, RefObject } from 'react';
import styled from 'styled-components';

interface PeerPaintCanvasProps {
    canvasRef: RefObject<HTMLCanvasElement>;
}

const PaintCanvas = ({ canvasRef }: PeerPaintCanvasProps) => {
    return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas`
    touch-action: none;
    width: 100%;
    height: 100%;
    z-index: 3;
`;

export default PaintCanvas;
