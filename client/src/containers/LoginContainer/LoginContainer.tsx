import { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { GetServerSideProps } from 'next';
import { getToken } from '@/apis/user/get-token';
import userSessionAtom from '@/recoil/atoms/userSession';
import Modal from '@/components/commons/Modal';

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
                <HaryeomHeader>어디서든 편리하게 과외를</HaryeomHeader>
                <HaryeomTitle>하렴</HaryeomTitle>
                <StyledKakaoLoginButton
                    href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email`}
                >
                    <KakaoLoginImg src={'/images/kakao.png'} />
                </StyledKakaoLoginButton>
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
    position: relative;
    background-color: white;
    width: 43.5vw;
    max-width: 688px;
    height: calc(43vw * 0.73);
    max-height: 500px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    background-image: url('/images/loginbackground.png');
    background-size: cover;
    background-position: center;
    margin: auto;

    @media (max-width: 768px) {
        width: 60vw;
        min-width: 300px;
        height: calc(59vw * 0.73);
    }
`;

const SpeechBubble = styled.div`
    position: absolute;
    top: 8.7%;
    left: 20.48%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1.3em;

    @media (max-width: 1024px) {
        font-size: 0.9em;
    }

    @media (max-width: 768px) {
        font-size: 0.8em;
    }

    @media (max-width: 480px) {
        font-size: 0.7em;
    }
`;

const HaryeomHeader = styled.div`
    position: absolute;
    top: 40%;
    left: 20%;
    transform: translate(-50%, -50%);
    color: black;
    font-size: 2.5em;
    font-weight: bold;
    max-width: 3.7em;
    text-align: center;
    line-height: 1.2em;

    @media (max-width: 1245px) {
        font-size: 2em;
        line-height: 1em;
    }

    @media (max-width: 1024px) {
        font-size: 2em;
        line-height: 1em;
    }

    @media (max-width: 820px) {
        font-size: 1.7em;
        line-height: 1em;
    }

    @media (max-width: 768px) {
        font-size: 2em;
        line-height: 1em;
    }

    @media (max-width: 480px) {
        font-size: 1.9em;
        line-height: 1em;
    }
`;

const HaryeomTitle = styled.div`
    position: absolute;
    top: 65%;
    left: 19%;
    transform: translate(-50%, -50%);
    font-size: 4em;
    font-weight: bold;
    max-width: 3.7em;
    text-align: center;
    color: #57c08d;

    @media (max-width: 1024px) {
        font-size: 2em;
    }

    @media (max-width: 768px) {
        font-size: 2em;
    }

    @media (max-width: 480px) {
        font-size: 1.9em;
    }
`;

const StyledKakaoLoginButton = styled.a`
    position: absolute;
    bottom: 13%;
    left: 21%;
    transform: translateX(-50%);
    width: 70%;
    max-width: 233px;

    @media (max-width: 1245px) {
        width: 35%;
    }

    @media (max-width: 1024px) {
        width: 35%;
    }

    @media (max-width: 768px) {
        width: 37%;
    }

    @media (max-width: 480px) {
        width: 40%;
    }
`;

const KakaoLoginImg = styled.img`
    width: 100%;
`;

export default LoginContainer;
