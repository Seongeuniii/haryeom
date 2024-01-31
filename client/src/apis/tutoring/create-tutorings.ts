import axios from 'axios';

const path = '/tutoring/schedule';

export const registHomework = async () => {
    const newTutorings = {
        tutoringId: 7,
        schedules: [
            {
                scheduleDate: '2024-01-01',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명1',
            },
            {
                scheduleDate: '2024-01-02',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명2',
            },
            {
                scheduleDate: '2024-01-02',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명1',
            },
            {
                scheduleDate: '2024-01-02',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명2',
            },
            {
                scheduleDate: '2024-01-02',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명1',
            },
            {
                scheduleDate: '2024-01-07',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명2',
            },
            {
                scheduleDate: '2024-01-07',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명1',
            },
            {
                scheduleDate: '2024-01-09',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명2',
            },
            {
                scheduleDate: '2024-01-09',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명1',
            },
            {
                scheduleDate: '2024-01-09',
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명2',
            },
        ],
    };

    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}${path}`, newTutorings);
        return res.data;
    } catch (e) {
        return null;
    }
};
