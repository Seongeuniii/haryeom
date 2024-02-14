import { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { GetServerSideProps } from 'next';
import { getToken } from '@/apis/user/get-token';
import userSessionAtom from '@/recoil/atoms/userSession';
import Modal from '@/components/commons/Modal';

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
    width: 39%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1em 0 0 1em;

    img {
        width: 100%;
    }
`;

const LoginContainer = () => {
    const userSession = useRecoilValue(userSessionAtom);
    const router = useRouter();

    useEffect(() => {
        if (userSession) {
            router.push('/');
            return;
        }
    }, []);

    return (
        <Modal open={true} closeModal={() => {}}>
            <StyledLoginModal>
                <SpeechBubble>하렴!</SpeechBubble>
                <LoginModalHeader>어디서나 편리하게 과외를!</LoginModalHeader>
                <KakaoLoginButton />
                {/*<ServiceImg />*/}
                {/*<Link href="/logindemo">2월 8일 테스트를 위한 계정입니다.</Link>*/}
                {/*<Link href="/login">로그인 하러가기</Link>*/}
                {/*<Link href="/find">선생님 둘러보기</Link>*/}
            </StyledLoginModal>
        </Modal>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;

    if (query.code) {
        const successLogin = await getToken(query.code as string, context);
        if (successLogin) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
    }
    return { props: {} };
};

const StyledLoginModal = styled.div`
    background-color: white;
    width: 55vw;
    height: 82.5vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    background-image: url('/images/loginbackground.png');
    background-size: cover;

    a {
        padding: 10px 20px;
        color: white;
        border-radius: 20px;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s;
    }
`;
const SpeechBubble = styled.div`
    font-size: 28px;
    font-weight: bolder;
    padding: 0 0 0 0;
    width: 30%;
    margin: 1.28em 0 0 5.1em;
    line-height: 1.2em;
    color: #ffffff;
`;

const LoginModalHeader = styled.div`
    font-size: 68px;
    font-weight: bolder;
    margin: 1.4em 0 0 0.7em;
    width: 30%;
    line-height: 1.2em;
    text-align: center;
`;

export default LoginContainer;
