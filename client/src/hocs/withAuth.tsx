import LoginModal from '@/components/LoginModal';
import RegistUserInfoContainer from '@/containers/RegistUserInfoContainer';
import userSessionAtom from '@/recoil/atoms/userSession';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WithAuth = (Component: any): FC => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const userSession = useRecoilValue(userSessionAtom);
        console.log(userSession);
        if (!userSession) return <LoginModal />;
        if (userSession.role === 'GUEST') return <RegistUserInfoContainer />;
        return <Component {...props} />;
    };
};

export default WithAuth;
