import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

interface ToggleButtonProps {
    isChecked: boolean;
    onChange: (checked: boolean) => void;
}

const ToggleButton = ({ isChecked, onChange }: ToggleButtonProps) => {
    const handleClick = () => {
        onChange(!isChecked);
    };

    return (
        <StyledToggleButton onClick={handleClick} isChecked={isChecked}>
            {isChecked && <FontAwesomeIcon icon={faCheck} />}
        </StyledToggleButton>
    );
};

const StyledToggleButton = styled.div<{ isChecked: boolean }>`
    width: 50px;
    height: 20px;
    background-color: ${({ isChecked }) => (isChecked ? '#4CAF50' : '#ddd')};
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:after {
        content: '';
        width: 18px;
        height: 18px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        top: 1px;
        left: ${({ isChecked }) => (isChecked ? '30px' : '1px')};
        transition: left 0.3s ease;
    }

    svg {
        color: white;
        position: absolute;
        top: 50%;
        left: 36%;
        transform: translate(-50%, -50%);
        font-size: 12px;
        transition: opacity 0.3s ease;
        opacity: ${({ isChecked }) => (isChecked ? 1 : 0)};
    }

    &:hover {
        background-color: ${({ isChecked }) => (isChecked ? '#45a049' : '#ccc')};

        svg {
            opacity: 1;
        }
    }
`;

export default ToggleButton;
