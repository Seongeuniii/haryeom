import { useState } from 'react';

const useMediaRecord = () => {
    const [displayStream, setDisplayStream] = useState<MediaStream>();
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            setDisplayStream(stream);
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
            recorder.ondataavailable = handleDataAvailable;
            recorder.start();
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    };

    const handleDataAvailable = (e: BlobEvent) => {
        if (e.data.size > 0) {
            setRecordedChunks((prevChunks) => [...prevChunks, e.data]);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && displayStream) {
            mediaRecorder.stop();
            displayStream.getTracks().forEach((track) => {
                track.stop();
            });
        }
    };

    const downloadRecording = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        // const a = document.createElement('a');
        // a.style.display = 'none';
        // a.href = url;
        // a.download = 'screen-recording.webm';
        // document.body.appendChild(a);
        // a.click();
        // window.URL.revokeObjectURL(url);
    };

    return { startRecording, stopRecording, downloadRecording };
};

export default useMediaRecord;
