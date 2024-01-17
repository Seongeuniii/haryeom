import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';

interface InputFormProps {
    label: string;
    name: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
}

const InputForm = ({ label, name, handleChange }: InputFormProps) => {
    return (
        <StyledInputForm>
            <label htmlFor="inp" className="inp">
                <input
                    name={name}
                    type="text"
                    id="inp"
                    placeholder="&nbsp;"
                    onChange={handleChange}
                />
                <span className="label">{label}</span>
                <span className="focus-bg" />
            </label>
        </StyledInputForm>
    );
};

const StyledInputForm = styled.div`
    width: 100%;
    display: grid;
    -webkit-font-smoothing: antialiased;

    .inp {
        position: relative;
        border-radius: 3px;
        overflow: hidden;
    }
    .inp .label {
        position: absolute;
        top: 20px;
        left: 12px;
        font-size: 16px;
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
        height: 56px;
        font-size: 16px;
        font-weight: 400;
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.3);
        color: #000;
        transition: all 0.15s ease;
    }
    .inp input:hover {
        /* background: rgba(0, 0, 0, 0.02);
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5); */
    }
    .inp input:not(:placeholder-shown) + .label {
        color: rgba(0, 0, 0, 0.5);
        transform: translate3d(0, -12px, 0) scale(0.75);
    }
    .inp input:focus {
        /* background: rgba(0, 0, 0, 0.001); */
        outline: none;
        box-shadow: inset 0 -2px 0 ${({ theme }) => theme.PRIMARY};
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

export default InputForm;
