import styled from 'styled-components';
import SelectForm from '../commons/SelectForm';

const SelectTutoringTime = () => {
    return (
        <StyledSelectTutoringTime>
            <SelectTutoringTimeFormHeader>일정 선택</SelectTutoringTimeFormHeader>
            <SelectTutoringFormWrapper>
                <SelectForm
                    label={'시작시간'}
                    name={'tutoringId'}
                    optionList={['18:00', '19:00']}
                    handleSelect={(name, option) => {
                        console.log(name, option);
                    }}
                    height="35px"
                />
                <SelectForm
                    label={'진행시간'}
                    name={'tutoringId'}
                    optionList={['1시간', '2시간']}
                    handleSelect={(name, option) => {
                        console.log(name, option);
                    }}
                    height="35px"
                />
            </SelectTutoringFormWrapper>
        </StyledSelectTutoringTime>
    );
};

const StyledSelectTutoringTime = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.2em;
`;

const SelectTutoringTimeFormHeader = styled.div`
    width: 100%;
    padding: 0.3em;
    margin-bottom: 0.5em;
    font-size: 1.1em;
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const SelectTutoringFormWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
`;

export default SelectTutoringTime;
