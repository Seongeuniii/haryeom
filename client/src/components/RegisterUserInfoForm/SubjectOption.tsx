import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '@/components/commons/Dropdown';

interface SubjectOptionProps {
    label: string;
    InputBox?: (children: ReactNode) => JSX.Element;
}

interface StyledProps {
    height?: string;
}

const SubjectOption = ({ label, InputBox }: SubjectOptionProps) => {
    const { open, openDropdown, closeDropdown } = useDropdown();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <StyledSubjectOption>
            <SubjectOptionList
                className={`select-box__current ${isFocused ? 'focused' : ''}`}
                onClick={!open ? openDropdown : undefined}
            >
                <SubjectOptionLabel>{label}</SubjectOptionLabel>
                {InputBox && (
                    <Dropdown open={open} closeDropdown={closeDropdown} top="0em" left="1em">
                        {InputBox(<InputBoxHeader></InputBoxHeader>)}
                    </Dropdown>
                )}
                <DropDownIcon
                    className={`select-box__icon ${isFocused ? 'rotate' : ''}`}
                    src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                    alt="Arrow Icon"
                    aria-hidden="true"
                />
            </SubjectOptionList>
        </StyledSubjectOption>
    );
};

const StyledSubjectOption = styled.div`
    position: relative;
    display: block;
    width: 100%;
`;

const SubjectOptionList = styled.div<StyledProps>`
    //position: relative;
    //width: 100%;
    //display: flex;
    //align-items: center;
    //padding: 0 1.5em;
    //border: 1px solid rgba(0, 0, 0, 0.3);
    //font-size: 1em;
    //
    //&:last-child {
    //    border-right: none;
    //}
    cursor: pointer;
    outline: none;
    height: ${({ height }) => (height ? height : '50px')};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 0.5em;
    background-color: white;
    padding-right: 1.2em;

    img {
        width: 14px;
        height: 14px;
    }

    &.focused {
        border: 2px solid ${({ theme }) => theme.PRIMARY};
    }

    &.focused + .select-box__list {
        opacity: 1;
        animation-name: none;
    }

    &.focused .select-box__icon {
        transform: translateY(-50%) rotate(180deg);
    }

    @keyframes HideList {
        from {
            transform: scaleY(1);
        }
        to {
            transform: scaleY(0);
        }
    }
`;

const SubjectOptionLabel = styled.span`
    white-space: nowrap;
    cursor: pointer;
`;

const InputBoxHeader = styled.div`
    background-color: white;
`;

const DropDownIcon = styled.img`
    position: absolute;
    top: 50%;
    right: 9px;
    transform: translateY(-50%);
    width: 20px;
    opacity: 0.3;
    transition: 0.2s ease;

    &.rotate {
        transform: translateY(-50%) rotate(180deg);
    }
`;

export default SubjectOption;
