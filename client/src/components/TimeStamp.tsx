import { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import Pin from '@/components/icons/Pin';
import Button from './commons/Button';
import Send from './icons/Send';

const TimeStamp = () => {
    const [message, setMessage] = useState<string>('');

    return (
        <StyledTimeStamp>
            <Title>
                <Icon>
                    <Pin />
                </Icon>
                <span>타임스탬프</span>
            </Title>
            <Form>
                <Input
                    type="text"
                    value={message}
                    placeholder="기록을 남겨보세요."
                    onChange={(e) => setMessage(e.target.value)}
                />
                <SendButton>저장</SendButton>
            </Form>
        </StyledTimeStamp>
    );
};

const StyledTimeStamp = styled.div`
    width: 100%;
    /* height: 100px; */
    padding: 1em;
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 1em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    font-weight: 700;
`;

const Icon = styled.div`
    width: 30px;
    height: 20px;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const Form = styled.form`
    display: flex;
`;

const Input = styled.input`
    width: 100%;
    font-size: 14px;
    border: none;
    &:focus {
        outline: none;
    }
`;

const SendButton = styled.button`
    width: 40px;
    height: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border-radius: 0.9em;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
        border: none;
        color: white;
    }
`;

export default TimeStamp;
