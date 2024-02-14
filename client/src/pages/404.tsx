import styled from 'styled-components';
import { useRouter } from 'next/router';
import theme from '@/theme';

const Custom404 = () => {
    const router = useRouter();

    return (
        <StyledPageNotFoundContainer>
            <Logo>하렴</Logo>
            <Heading>원하시는 페이지를 찾을 수 없습니다.</Heading>
            <Paragraph>
                찾으려는 페이지의 주소가 잘못 입력되었거나,
                <br />
                주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
                <br />
                입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
            </Paragraph>
            <StyledMoveHomeButton href={`/`}>
                <button style={{ backgroundColor: theme.BACKGROUND }}>하렴 홈으로 이동</button>
            </StyledMoveHomeButton>
        </StyledPageNotFoundContainer>
    );
};

const StyledPageNotFoundContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.div`
    font-size: 5.5em;
    font-weight: bold;
`;

const StyledMoveHomeButton = styled.a`
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        width: 100%;
        padding: 10px;
    }
`;

const Heading = styled.h1`
    font-size: 1.5em;
    padding: 10px;
    margin: 0;
`;

const Paragraph = styled.p`
    font-size: 1em;
    padding: 10px;
    text-align: center;
    margin: 0;
`;

export default Custom404;
