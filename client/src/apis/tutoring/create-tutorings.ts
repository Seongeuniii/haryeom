import axios from 'axios';

const path = '/tutoring/schedule';

export const createTutorings = async () => {
    const newTutorings = {
        tutoringId: 7,
        schedules: [
            {
                scheduleDate: '2024-03-01',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명1',
            },
            {
                scheduleDate: '2024-03-02',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명2',
            },
            {
                scheduleDate: '2024-03-02',
                startTime: '12:30',
                duration: 120,
                title: '커리큘럼명1',
            },
            {
                scheduleDate: '2024-03-02',
                startTime: '09:30',
                duration: 120,
                title: '커리큘럼명2',
            },
            {
                scheduleDate: '2024-03-09',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명1',
            },
            {
                scheduleDate: '2024-03-10',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명2',
            },
        ],
    };

    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}`,
            JSON.stringify(newTutorings),
            { headers: { 'Content-Type': 'application/json' } }
        );
        return res.data;
    } catch (e) {
        return null;
    }
};
