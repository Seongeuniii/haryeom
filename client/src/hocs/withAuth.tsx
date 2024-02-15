import React, { FC } from 'react';
import LoginModal from '@/components/LoginModal';
import RegisterUserInfoContainer from '@/containers/RegisterUserInfoContainer';
import userSessionAtom from '@/recoil/atoms/userSession';
import { useRecoilValue } from 'recoil';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WithAuth = (Component: any): FC => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const userSession = useRecoilValue(userSessionAtom);
        if (!userSession) return <Component {...props} openLoginModal={true} />;
        if (userSession.role === 'GUEST') return <RegisterUserInfoContainer />;
        return <Component {...props} />;
    };
};

export default WithAuth;
