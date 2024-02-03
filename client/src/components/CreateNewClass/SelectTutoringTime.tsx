import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import SelectForm from '@/components/commons/SelectForm';

interface SelectTutoringTimeProps {
    setSelectedStartHour: Dispatch<SetStateAction<string>>;
    setSelectedStartMin: Dispatch<SetStateAction<string>>;
    setSelectedDuration: Dispatch<SetStateAction<number>>;
}

const SelectTutoringTime = ({
    setSelectedStartHour,
    setSelectedStartMin,
    setSelectedDuration,
}: SelectTutoringTimeProps) => {
    return (
        <StyledSelectTutoringTime>
            <SelectTutoringTimeFormHeader>일정 선택</SelectTutoringTimeFormHeader>
            <SelectTutoringFormWrapper>
                <SelectForm
                    label={'18'}
                    name={'tutoringId'}
                    optionList={Array.from(
                        { length: 24 },
                        (_, index) => (index < 10 ? '0' : '') + index
                    )}
                    handleSelect={(name, option) => {
                        setSelectedStartHour(option as string);
                    }}
                    height="35px"
                />
                시
                <SelectForm
                    label={'30'}
                    name={'tutoringId'}
                    optionList={Array.from(
                        { length: 60 },
                        (_, index) => (index < 10 ? '0' : '') + index
                    )}
                    handleSelect={(name, option) => {
                        setSelectedStartMin(option as string);
                    }}
                    height="35px"
                />
                <div style={{ whiteSpace: 'nowrap' }}>분 부터</div>
                <div style={{ width: '100%' }}>
                    <SelectForm
                        label={'60'}
                        name={'tutoringId'}
                        optionList={Array.from({ length: 18 }, (_, index) => `${(index + 1) * 10}`)}
                        handleSelect={(name, option) => {
                            setSelectedDuration(parseInt(option as string));
                        }}
                        height="35px"
                    />
                </div>
                <div style={{ whiteSpace: 'nowrap' }}>분 동안</div>
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
    align-items: center;
    gap: 6px;
`;

export default SelectTutoringTime;
