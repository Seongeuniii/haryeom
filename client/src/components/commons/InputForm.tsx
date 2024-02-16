import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

interface InputFormProps {
    label: string;
    name: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    isValid?: boolean;
}

const InputForm = ({ label, name, handleChange, isValid = true }: InputFormProps) => {
    const [isShaking, setShaking] = useState(false);

    const handleValidation = () => {
        if (!isValid) {
            setShaking(true);
            setTimeout(() => setShaking(false), 600);
        }
    };

    useEffect(() => {
        handleValidation();
    }, [isValid]);

    return (
        <StyledInputForm $isValid={isValid} $isShaking={isShaking}>
            <label htmlFor="inp" className={`inp ${isValid ? '' : 'invalid'}`}>
                <input
                    name={name}
                    type="text"
                    id="inp"
                    placeholder="&nbsp;"
                    onChange={(e) => handleChange(e)}
                />
                <span className="label">{label}</span>
                <span className="focus-bg" />
            </label>
        </StyledInputForm>
    );
};

const StyledInputForm = styled.div<{ $isValid: boolean; $isShaking: boolean }>`
    width: 100%;
    display: grid;
    -webkit-font-smoothing: antialiased;

    .inp {
        position: relative;
        border-radius: 3px;
        overflow: hidden;
        ${({ $isShaking }) =>
            $isShaking &&
            css`
                animation: ${shakeAnimation} 0.6s ease-in-out;
            `}

        &.invalid {
            box-shadow: inset 0 -2px 0 red;
        }
    }
    .inp .label {
        position: absolute;
        top: 20px;
        left: 12px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        font-weight: 500;
        transform-origin: 0 0;
        transform: translate3d(0, 0, 0);
        transition: all 0.2s ease;
        pointer-events: none;
    }
    .inp .focus-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.05);
        z-index: -1;
        transform: scaleX(0);
        transform-origin: left;
    }
    .inp input {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        border: 0;
        font-family: inherit;
        padding: 16px 12px 0 12px;
        height: 50px;
        font-size: 14px;
        font-weight: 400;
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.3);
        color: #000;
        transition: all 0.15s ease;
        box-shadow: inset 0 -2px 0 ${({ $isValid }) => ($isValid ? 'inset 0 -1px 0 rgba(0, 0, 0, 0.3)' : 'red')};
    }
    .inp input:not(:placeholder-shown) + .label {
        color: rgba(0, 0, 0, 0.5);
        transform: translate3d(0, -12px, 0) scale(0.75);
    }
    .inp input:focus {
        outline: none;
        box-shadow: inset 0 -2px 0 ${({ theme, $isValid }) => ($isValid ? theme.PRIMARY : 'red')};
    }
    .inp input:focus + .label {
        color: black;
        transform: translate3d(0, -12px, 0) scale(0.75);
    }
    .inp input:focus + .label + .focus-bg {
        transform: scaleX(1);
        transition: all 0.1s ease;
    }
`;

const shakeAnimation = keyframes`
    0%, 100% {
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-5px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(5px);
    }
`;

export default InputForm;
