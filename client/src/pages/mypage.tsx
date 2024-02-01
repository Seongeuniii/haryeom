/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeLayout from '@/components/layouts/HomeLayout';

const 변수 = 1; // 컴포넌트 밖에 변수 선언해도 됨.

const Mypage = () => {
    const [name, setName] = useState<number>(1);

    useEffect(() => {}, []); // 최초 렌더링 시에만 실행

    const handleClick = () => {
        setName((prev) => prev + 1);
    };

    return (
        <HomeLayout>
            <StyledMypage>
                <div>{name}</div>
                <button onClick={handleClick}>버튼</button>
            </StyledMypage>
        </HomeLayout>
    );
};

const StyledMypage = styled.div`
    width: 100%;
    height: 100%;
    background-color: aliceblue;

    .hello {
        color: red;

        &:hover {
            color: blue;
        }
    }

    &:hover {
        background-color: beige;
    }
`;

export default Mypage;
