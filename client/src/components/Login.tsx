import React from 'react';
import styled from 'styled-components';
import ServiceImg from './icons/ServiceImg';

const REST_API_KEY = '';
const REDIRECT_URI = '';

const Login = () => {
    return (
        <StyledLogin>
            <LeftSection>
                <SubTitle>학습관리를 편리하게</SubTitle>
                <Logo>하렴</Logo>
            </LeftSection>
            <RightSection>
                <ServiceImg />
                <KakaoSocialLoginButton
                    href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`}
                >
                    <img src="/images/kakao.png" alt="kakao login" />
                </KakaoSocialLoginButton>
            </RightSection>
        </StyledLogin>
    );
};

const StyledLogin = styled.div`
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

const KakaoSocialLoginButton = styled.a`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 100%;
    }
`;

export default Login;
