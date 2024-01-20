import axios from 'axios';
import { IUserRole } from './user';

const path = '/members';

export const registUser = async (role: IUserRole) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${role}s`,
            // {
            //     profile_url: 'https://avatars.githubusercontent.com/u/88070657?v=4',
            //     name: '새로운 유저',
            //     phone: '010-1234-5678',
            //     grade: '중학교 3학년',
            //     school: '솔빛중학교',
            // },
            {
                gender: 'male',
                salary: 100,
                subjects: [
                    {
                        subjectId: '1',
                        subjectName: '국어',
                    },
                    {
                        subjectId: '2',
                        subjectName: '영어',
                    },
                    {
                        subjectId: '3',
                        subjectName: '수학',
                    },
                ],
                career: 10,
                introduce: '안녕하세요. 선생님 이태호입니다.',
            }
        );
        const { data } = res;
        console.log(data); // 토큰
        console.log('등록 성공');
    } catch {
        /**
         * 유저 등록 실패
         */
        // refreshAccessToken()
        console.log('등록 실패');
    }
};
