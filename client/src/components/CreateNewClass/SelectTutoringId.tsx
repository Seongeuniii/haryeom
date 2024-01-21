import React from 'react';
import styled from 'styled-components';
import SelectForm from '../commons/SelectForm';

const SelectTutoringId = () => {
    return (
        <StyledSelectTutoringId>
            <SelectTutoringIdHeader>과외 선택</SelectTutoringIdHeader>
            <SelectForm
                label={'과목 | 학생 선택'}
                name={'tutoringId'}
                optionList={['수학 | 김성은 학생', '영어 | 이태호 학생']}
                handleSelect={(name, option) => {
                    console.log(name, option);
                }}
                height="35px"
            />
        </StyledSelectTutoringId>
    );
};

const StyledSelectTutoringId = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 2.2em;
`;

const SelectTutoringIdHeader = styled.div`
    width: 100%;
    padding: 0.3em;
    margin-bottom: 0.5em;
    font-size: 1.1em;
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

export default SelectTutoringId;
