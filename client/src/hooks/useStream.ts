import React, { useState, useCallback, useEffect } from 'react';

const useStream = () => {
    const [myStream, setMyStream] = useState<MediaStream | null>(null);

    const getMyStream = useCallback(async () => {
        const myStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { facingMode: 'user' },
        });
        setMyStream(() => myStream);
    }, []);

    useEffect(() => {
        getMyStream();
    }, []);

    return [myStream];
};

export default useStream;
