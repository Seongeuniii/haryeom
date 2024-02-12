import { useEffect, useState } from 'react';

enum RECORD_STATE {
    START = 'start',
    STOP = 'stop',
    PAUSE = 'pause',
    RESUME = 'resume',
}

const useMediaRecord = () => {
    const [displayStream, setDisplayStream] = useState<MediaStream>();
    const [mediaRecorder, setmediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [recordProgressState, setRecordProgressState] = useState<RECORD_STATE>(RECORD_STATE.STOP);

    useEffect(() => {
        if (!mediaRecorder) return;
        switch (recordProgressState) {
            case 'start':
                mediaRecorder.start();
                break;
            case 'stop':
                mediaRecorder.stop();
                break;
            case 'pause':
                mediaRecorder.pause();
                break;
            case 'resume':
                mediaRecorder.resume();
                break;
        }
    }, [mediaRecorder, recordProgressState]);

    const getDisplayStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            setDisplayStream(stream);
        } catch (e) {
            console.error('Error accessing media devices.', e);
        }
    };

    const createmediaRecorder = () => {
        if (!displayStream) return;
        const vr = new MediaRecorder(displayStream, {
            videoBitsPerSecond: 2500000,
            audioBitsPerSecond: 128000,
            mimeType: 'video/webm; codecs=vp9',
        });
        vr.addEventListener('dataavailable', (e) => handleDataAvailable(e));
        setmediaRecorder(() => vr);
    };

    const prepareRecording = async () => {
        await getDisplayStream();
        createmediaRecorder();
    };

    const startRecording = async () => {
        if (!displayStream) return;
        if (!mediaRecorder) createmediaRecorder();
        setRecordProgressState(RECORD_STATE.START);
    };

    const stopRecording = () => {
        if (!mediaRecorder) return;
        setRecordProgressState(RECORD_STATE.STOP);
        displayStream?.getTracks().forEach((track) => {
            track.stop();
        });
    };

    const pauseRecording = () => {
        if (!mediaRecorder) return;
        setRecordProgressState(RECORD_STATE.PAUSE);
    };

    const resumeRecording = () => {
        if (!mediaRecorder) return;
        setRecordProgressState(RECORD_STATE.RESUME);
    };

    const handleDataAvailable = (e: BlobEvent) => {
        if (e.data?.size <= 0) return;
        setRecordedChunks((prev) => [...prev, e.data]);
    };

    return {
        recordedChunks,
        prepareRecording,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
    };
};

export default useMediaRecord;
