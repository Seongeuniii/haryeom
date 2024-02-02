import axios from 'axios';
import { IUserInfo, IUserRole } from './user';
import { subjectDefaultOptions } from '@/components/FilterOpenTeacherList/filterDefaultOptions';

const path = '/members';

export const registUser = async (role: IUserRole, form: IUserInfo) => {
    try {
        let info;
        if (role === 'STUDENT') {
            info = {
                profile_url: '',
                name: form.name,
                phone: form.phone,
                grade: form.grade,
                school: form.school,
            };
        } else {
            info = {
                profile_url: '',
                name: form.name,
                phone: form.phone,
                profileStatus: form.profileStatus,
                college: form.college,
                collegeEmail: form.collegeEmail,
                gender: form.gender === '여자' ? 'FEMALE' : 'MALE',
                salary: form.salary,
                subjects: [
                    {
                        subjectId: subjectDefaultOptions.indexOf(form.subjects as string) + 1,
                        name: form.subjects,
                    },
                ],
                career: form.career,
                introduce: form.introduce,
            };
        }

        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify(info)], { type: 'application/json' }));
        if (form.profileUrl instanceof File) {
            formData.append('profileImg', form.profileUrl);
        }

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
