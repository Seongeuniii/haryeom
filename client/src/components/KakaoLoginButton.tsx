import styled from 'styled-components';

const KakaoLoginButton = () => {
    return (
        <StyledKakaoLoginButton
            href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email`}
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
