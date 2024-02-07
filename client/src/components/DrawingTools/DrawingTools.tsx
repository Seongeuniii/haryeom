import styled from 'styled-components';
import Button from '@/components/commons/Button';
import Pen from '@/components/icons/Pen';
import ThickPen from '@/components/icons/ThickPen';
import Eraser from '@/components/icons/Eraser';
import { useState } from 'react';

const DrawingTools = () => {
    const [tooType, setToolType] = useState<string>('');
    const [penColor, setPenColor] = useState<string>('');

    return (
        <StyledDrawingTools>
            <SelectToolType>
                <Button
                    content={<Pen />}
                    onClick={(e) => {}}
                    width="30px"
                    height="30px"
                    padding="6px"
                    $borderColor="#8c8c8c"
                    $borderRadius="100%"
                />
                <Button
                    content={<ThickPen />}
                    onClick={(e) => {}}
                    width="30px"
                    height="30px"
                    padding="6px"
                    $borderColor="#8c8c8c"
                    $borderRadius="100%"
                />
                <Button
                    content={<Eraser />}
                    onClick={(e) => {}}
                    width="30px"
                    height="30px"
                    padding="6px"
                    $borderColor="#8c8c8c"
                    $borderRadius="100%"
                />
            </SelectToolType>
            <SelectColor>
                <Button
                    content={undefined}
                    onClick={(e) => {}}
                    width="19px"
                    height="19px"
                    $borderRadius="100%"
                    $backgroundColor={'red'}
                />
                <Button
                    content={undefined}
                    onClick={(e) => {}}
                    width="19px"
                    height="19px"
                    $borderRadius="100%"
                    $backgroundColor={'green'}
                />
                <Button
                    content={undefined}
                    onClick={(e) => {}}
                    width="19px"
                    height="19px"
                    $borderRadius="100%"
                    $backgroundColor={'blue'}
                />
                <Button
                    content={undefined}
                    onClick={(e) => {}}
                    width="19px"
                    height="19px"
                    $borderRadius="100%"
                    $backgroundColor={'black'}
                />
            </SelectColor>
        </StyledDrawingTools>
    );
};

const StyledDrawingTools = styled.div`
    height: 100%;
    padding: 0 0.2em;
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 1em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
`;

const SelectToolType = styled.div`
    padding: 0 1em;
    display: flex;
    align-items: center;
    gap: 12px;
    border-right: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const SelectColor = styled.div`
    padding: 0 1em;
    display: flex;
    gap: 10px;
`;

export default DrawingTools;
