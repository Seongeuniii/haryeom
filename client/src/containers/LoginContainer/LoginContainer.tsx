import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import KakaoLoginButton from '@/components/KakaoLoginButton';
import React from 'react';
import styled from 'styled-components';
import ServiceImg from '@/components/icons/ServiceImg';
import { login } from '@/apis/user/get-token';

const LoginContainer = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
        const authCode = searchParams.get('code');
        if (!authCode) return;
        login(authCode);
    }, []);

    return (
        <StyledLoginContainer>
            <LoginSection>
                <LeftSection>
                    <SubTitle>학습관리를 편리하게</SubTitle>
                    <Logo>하렴</Logo>
                </LeftSection>
                <RightSection>
                    <ServiceImg />
                    <KakaoLoginButton />
                </RightSection>
            </LoginSection>
        </StyledLoginContainer>
    );
};

const StyledLoginContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginSection = styled.div`
    width: 630px;
    height: 350px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-radius: 1em;
`;

const RightSection = styled.div`
    width: 55%;
    padding: 5%;
`;

const LeftSection = styled.div`
    width: 45%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5%;
    border-right: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const SubTitle = styled.div`
    margin-bottom: 1em;
    text-align: center;
    padding-left: 0.6em;
`;

const Logo = styled.div`
    font-size: 5.5em;
    font-weight: bold;
`;

export default LoginContainer;
