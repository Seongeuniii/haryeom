import styled from 'styled-components';
import Button from '@/components/commons/Button';
import Pen from '@/components/icons/Pen';
import ThickPen from '@/components/icons/ThickPen';
import Eraser from '@/components/icons/Eraser';
import Dropdown from '../commons/Dropdown';
import useDropdown from '@/hooks/useDropdown';

interface DrawingToolsProps {
    penStyle: {
        isPen: boolean;
        strokeStyle: string;
        lineWidth: number;
    };
    changePen: (name: string, value: string | number | boolean) => void;
}

const DrawingTools = ({ penStyle, changePen }: DrawingToolsProps) => {
    const { open, openDropdown, closeDropdown } = useDropdown();

    return (
        <StyledDrawingTools>
            <SelectToolType>
                <Button
                    content={<Pen />}
                    onClick={(e) => {
                        changePen('isPen', true);
                        changePen('lineWidth', 3);
                    }}
                    width="30px"
                    height="30px"
                    padding="6px"
                    $borderColor={penStyle.isPen && penStyle.lineWidth === 3 ? '#8c8c8c' : ''}
                    $borderRadius="100%"
                />
                <Button
                    content={<ThickPen />}
                    onClick={(e) => {
                        changePen('isPen', true);
                        changePen('lineWidth', 15);
                    }}
                    width="30px"
                    height="30px"
                    padding="6px"
                    $borderColor={penStyle.isPen && penStyle.lineWidth === 15 ? '#8c8c8c' : ''}
                    $borderRadius="100%"
                />
                <Button
                    content={<Eraser />}
                    onClick={(e) => changePen('isPen', false)}
                    width="30px"
                    height="30px"
                    padding="6px"
                    $borderColor={!penStyle.isPen ? '#8c8c8c' : ''}
                    $borderRadius="100%"
                />
            </SelectToolType>
            <SelectColor>
                <Button
                    content={undefined}
                    onClick={openDropdown}
                    width="19px"
                    height="19px"
                    $borderColor={'#8c8c8c'}
                    $borderRadius="100%"
                    $backgroundColor={penStyle.strokeStyle}
                />
                <Dropdown open={open} closeDropdown={closeDropdown} top="25px" left="5px">
                    <ColorButtons>
                        <Button
                            content={undefined}
                            onClick={(e) => {
                                closeDropdown();
                                changePen('strokeStyle', 'black');
                            }}
                            width="19px"
                            height="19px"
                            $borderColor={'#8c8c8c'}
                            $borderRadius="100%"
                            $backgroundColor={'black'}
                        />
                        <Button
                            content={undefined}
                            onClick={(e) => {
                                closeDropdown();
                                changePen('strokeStyle', 'red');
                            }}
                            width="19px"
                            height="19px"
                            $borderRadius="100%"
                            $backgroundColor={'red'}
                        />
                        <Button
                            content={undefined}
                            onClick={(e) => {
                                closeDropdown();
                                changePen('strokeStyle', 'green');
                            }}
                            width="19px"
                            height="19px"
                            $borderRadius="100%"
                            $backgroundColor={'green'}
                        />
                        <Button
                            content={undefined}
                            onClick={(e) => {
                                closeDropdown();
                                changePen('strokeStyle', 'blue');
                            }}
                            width="19px"
                            height="19px"
                            $borderRadius="100%"
                            $backgroundColor={'blue'}
                        />
                    </ColorButtons>
                </Dropdown>
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
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const SelectToolType = styled.div`
    padding: 0 1em;
    display: flex;
    align-items: center;
    gap: 12px;
    border-right: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const SelectColor = styled.div`
    position: relative;
    padding: 0 1em;
    display: flex;
    gap: 10px;
`;

const ColorButtons = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 0.5em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export default DrawingTools;