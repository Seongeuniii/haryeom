import React, {
    ChangeEvent,
    ChangeEventHandler,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';
import styled, { css, keyframes } from 'styled-components';

import InputForm from '@/components/commons/InputForm';
import SelectForm from '@/components/commons/SelectForm';
import ToggleButton from '@/components/commons/ToggleButton';
import { subjectDefaultOptions } from '@/components/FilterOpenTeacherList/filterDefaultOptions';
import SubjectOption from '@/components/RegisterUserInfoForm/SubjectOption';
import SelectSubjectBox from '@/components/RegisterUserInfoForm/SelectSubjectBox';
import Close from '@/components/icons/Close';

interface TeacherOptionalInfoFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateUserInfo: (name: string, value: any) => void;
    userInputValue: { [key: string]: number | string[] };
    setUserInputValue: Dispatch<
        SetStateAction<{
            [key: string]: number | string[];
        }>
    >;
}

interface TextAreaFormProps {
    label: string;
    name: string;
    handleChange: ChangeEventHandler<HTMLTextAreaElement>;
    isValid?: boolean;
}

const TextAreaForm = ({ label, name, handleChange, isValid = true }: TextAreaFormProps) => {
    const [isShaking, setShaking] = useState(false);

    const textRef = useRef<HTMLTextAreaElement>(null);

    const handleResizeHeight = () => {
        if (textRef.current) {
            textRef.current.style.height = 'auto';
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }
    };

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
        <StyledTextArea $isValid={isValid} $isShaking={isShaking}>
            <label htmlFor="txa" className={`txa ${isValid ? '' : 'invalid'}`}>
                <textarea
                    ref={textRef}
                    name={name}
                    id="txa"
                    placeholder="&nbsp;"
                    onChange={(e) => handleChange(e)}
                    onInput={handleResizeHeight}
                    rows={2}
                />
                <span className="label">{label}</span>
                <span className="focus-bg" />
            </label>
        </StyledTextArea>
    );
};

const StyledTextArea = styled.div<{ $isValid: boolean; $isShaking: boolean }>`
    width: 100%;
    display: grid;
    -webkit-font-smoothing: antialiased;

    .txa {
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

    .txa .label {
        position: absolute;
        top: 15px;
        left: 12px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        font-weight: 500;
        transform-origin: 0 0;
        transform: translate3d(0, 0, 0);
        transition: all 0.2s ease;
        pointer-events: none;
    }

    .txa .focus-bg {
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

    .txa textarea {
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
        resize: none;
    }

    .txa textarea:not(:placeholder-shown) + .label {
        color: rgba(0, 0, 0, 0.5);
        transform: translate3d(0, -12px, 0) scale(0.75);
    }

    .txa textarea:focus {
        outline: none;
        box-shadow: inset 0 -2px 0 ${({ theme, $isValid }) => ($isValid ? theme.PRIMARY : 'red')};
    }

    .txa textarea:focus + .label {
        color: black;
        transform: translate3d(0, -12px, 0) scale(0.75);
    }

    .txa textarea:focus + .label + .focus-bg {
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

const TeacherOptionalInfoForm = ({
    updateUserInfo,
    userInputValue,
    setUserInputValue,
}: TeacherOptionalInfoFormProps) => {
    const [isProfilePublic, setProfilePublic] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(['']);
    const handleToggleChange = (checked: boolean) => {
        setProfilePublic(checked);
        updateUserInfo('profileStatus', checked);
    };

    const handleSelectOption = (name: string, value: string) => {
        const currentValues = [...(userInputValue[name] as string[])];
        const isValueExists = currentValues.includes(value);
        const updatedValues = isValueExists
            ? currentValues.filter((item) => item !== value)
            : [...currentValues, value];

        setUserInputValue((prev) => ({ ...prev, [name]: updatedValues }));
    };

    const isSelected = (name: string, value: string) => {
        return (userInputValue[name] as string[]).find((elem) => elem === value) ? true : false;
    };

    return (
        <StyledTeacherOptionalInfoForm>
            <ProfilePrivacy>
                <span>{isProfilePublic ? '프로필 공개' : '프로필 비공개'}</span>
                <ToggleButton isChecked={isProfilePublic} onChange={handleToggleChange} />
            </ProfilePrivacy>
            <SubjectOption
                label="과목 선택"
                InputBox={(children) =>
                    SelectSubjectBox({
                        children,
                        name: 'subjects',
                        optionValues: subjectDefaultOptions,
                        handleSelectOption,
                        isSelected,
                    })
                }
            />
            <SelectedSubjectValues>
                {Object.keys(userInputValue).map(
                    (key) =>
                        Array.isArray(userInputValue[key]) && (
                            <>
                                {(userInputValue[key] as string[]).map((optionValue, idx) => (
                                    <SelectedSubjectValue key={`filterers_${idx}`}>
                                        <span>{optionValue}</span>
                                        <DeleteButton
                                            onClick={() => handleSelectOption(key, optionValue)}
                                        >
                                            <Close />
                                        </DeleteButton>
                                    </SelectedSubjectValue>
                                ))}
                            </>
                        )
                )}
            </SelectedSubjectValues>
            {/*<SelectForm*/}
            {/*    label={'과목'}*/}
            {/*    name={'subjects'}*/}
            {/*    optionList={subjectDefaultOptions}*/}
            {/*    handleSelect={updateUserInfo}*/}
            {/*/>*/}
            <SelectForm
                label={'성별'}
                name={'gender'}
                optionList={['여자', '남자']}
                handleSelect={updateUserInfo}
            />
            <InputForm
                label={'예상 과외 시급 (원)'}
                name={'salary'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateUserInfo('salary', e.target.value)
                }
            />
            <InputForm
                label={'경력 (년)'}
                name={'career'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateUserInfo('career', e.target.value)
                }
            />
            <TextAreaForm
                label={'선생님 소개 (1000자 이내)'}
                name={'introduce'}
                handleChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    updateUserInfo('introduce', e.target.value)
                }
            />
        </StyledTeacherOptionalInfoForm>
    );
};

const StyledTeacherOptionalInfoForm = styled.div`
    width: 100%;
    padding: 1.5em 2.7em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.3em;
`;

const ProfilePrivacy = styled.div`
    display: flex;
    gap: 1em;
    align-items: center;
    font-weight: 700;
    color: ${({ theme }) => theme.PRIMARY};
`;

const SelectedSubjectValues = styled.div`
    width: 100%;
    margin: 0.3em 1em 1em 1em;
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
    font-size: 12px;
`;

const SelectedSubjectValue = styled.div`
    padding: 0.5em;
    border-radius: 0.3em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.SECONDARY};
`;

const DeleteButton = styled.button`
    width: 7px;
    height: 7px;
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default TeacherOptionalInfoForm;
