import Header from '@/components/Header';
import InputForm from '@/components/commons/InputForm';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
// import ServiceImg from '@/components/icons/ServiceImg';

interface UserInfo {
    name: string;
    grades: string;
    school: string;
    phoneNumber: string;
}

const RegistUserInfoContainer = () => {
    const [userInputValue, setUserInputValue] = useState<UserInfo>({
        name: '',
        grades: '',
        school: '',
        phoneNumber: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInputValue({
            ...userInputValue,
            [name]: value,
        });
    };

    return (
        <StyledRegistUserInfoContainer>
            <Header navLinks={[]}></Header>
            <RegistForm>
                <RegistFormHeader>[필수] 회원 유형 선택</RegistFormHeader>
                <RegistFormBody>
                    <InputForm label={'이름'} name={'name'} handleChange={handleChange} />
                    <InputForm label={'학교'} name={'grades'} handleChange={handleChange} />
                    <InputForm label={'학년'} name={'school'} handleChange={handleChange} />
                    <InputForm
                        label={'전화번호'}
                        name={'phoneNumber'}
                        handleChange={handleChange}
                    />
                </RegistFormBody>
                <FormButton>제출</FormButton>
            </RegistForm>
        </StyledRegistUserInfoContainer>
    );
};

export const getServerSideProps = () => {
    return { props: {} };
};

const StyledRegistUserInfoContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RegistForm = styled.div`
    position: relative;
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3em 3em 7.5em 3em;
    border-radius: 1em;
    border: 0.3em solid #9bc37c;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
`;

const RegistFormHeader = styled.div`
    width: 100%;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: #1c1c1c;
    padding-bottom: 1.6em;
    margin-bottom: 0.5em;
`;

const RegistFormBody = styled.div`
    width: 100%;
    padding: 0 1em 0 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const FormButton = styled.button`
    position: absolute;
    width: 100px;
    height: 50px;
    border-radius: 2em;
    bottom: 2em;
    font-size: 20px;
    font-weight: bold;
    right: 2em;
    border: 1px solid #b9b9b9;
    color: #343434;
`;

export default RegistUserInfoContainer;
