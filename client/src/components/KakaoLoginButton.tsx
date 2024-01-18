import styled from 'styled-components';

const REST_API_KEY = '';
const REDIRECT_URI = '';

const KakaoLoginButton = () => {
    return (
        <StyledKakaoLoginButton
            href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`}
        >
            <img src="/images/kakao.png" alt="kakao login" />
        </StyledKakaoLoginButton>
    );
};

const StyledKakaoLoginButton = styled.a`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
    }
`;

export default KakaoLoginButton;
