import { useEffect, useState } from 'react';

enum RECORD_STATE {
    START = 'start',
    STOP = 'stop',
    PAUSE = 'pause',
    RESUME = 'resume',
}

const useMediaRecord = () => {
    const [displayStream, setDisplayStream] = useState<MediaStream>();
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
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
                displayStream?.getTracks().forEach((track) => {
                    track.stop();
                });
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
            return stream;
        } catch (e) {
            console.error('Error accessing media devices.', e);
        }
    };

    const createMediaRecorder = async () => {
        const stream = await getDisplayStream();
        if (!stream) return;

        const vr = new MediaRecorder(stream, {
            videoBitsPerSecond: 2500000,
            audioBitsPerSecond: 128000,
            mimeType: 'video/webm; codecs=vp9',
        });
        vr.addEventListener('dataavailable', (e) => handleDataAvailable(e));
        setDisplayStream(stream);
        setMediaRecorder(() => vr);
    };

    const prepareRecording = async () => {
        await createMediaRecorder();
    };

    const startRecording = async () => {
        setRecordProgressState(RECORD_STATE.START);
    };

    const stopRecording = () => {
        setRecordProgressState(RECORD_STATE.STOP);
    };

    const pauseRecording = () => {
        setRecordProgressState(RECORD_STATE.PAUSE);
    };

    const resumeRecording = () => {
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
