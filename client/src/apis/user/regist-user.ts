import axios from 'axios';
import { IUserInfo, IUserRole } from './user';

const path = '/members';

export const registUser = async (role: IUserRole, form: IUserInfo) => {
    try {
        const studentInfo = {
            profile_url: 'https://avatars.githubusercontent.com/u/88070657?v=4',
            name: form.name,
            phone: '010-1234-5678',
            grade: '중학교 3학년',
            school: '솔빛중학교',
        };

        const teacherInfo = {
            profileUrl: 'https://avatars.githubusercontent.com/u/88070657?v=4',
            name: form.name,
            phone: '01012345678',
            profileStatus: true,
            college: '어디대학교',
            collegeEmail: 'email@naver.com',
            gender: 'MALE',
            salary: 100,
            subjects: [
                {
                    subjectId: 1,
                    name: '수학',
                },
                {
                    subjectId: 2,
                    name: '물리학',
                },
                {
                    subjectId: 3,
                    name: '화학',
                },
            ],
            career: 10,
            introduce: '안녕하세요. 선생님 이태호입니다.',
        };

        const createFileFromImageUrl = async (imageUrl: string, fileName: string) => {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], fileName, { type: blob.type });
            return file;
        };

        const imageUrl = 'https://avatars.githubusercontent.com/u/88070657?v=4';
        const fileName = 'image.jpg';

        const imageFile = await createFileFromImageUrl(imageUrl, fileName);
        const formData = new FormData();

        if (role === 'STUDENT') {
            formData.append(
                'request',
                new Blob([JSON.stringify(studentInfo)], { type: 'application/json' })
            );
        } else {
            formData.append(
                'request',
                new Blob([JSON.stringify(teacherInfo)], { type: 'application/json' })
            );
        }

        formData.append('profileImg', imageFile);

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${role.toLocaleLowerCase()}s`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }
        );
        return '성공';
    } catch {
        return '실패';
    }
};
