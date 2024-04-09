import { RefObject } from 'react';
import styled from 'styled-components';

interface PeerPaintCanvasProps {
    canvasRef: RefObject<HTMLCanvasElement>;
}

// TODO : PaintCanvas로 사용하기
const PaintCanvas = ({ canvasRef }: PeerPaintCanvasProps) => {
    return (
        <DrawingLayer>
            <Canvas ref={canvasRef} />
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
    width: 100%;
    height: 100%;
    z-index: 3;
`;

export default PaintCanvas;
