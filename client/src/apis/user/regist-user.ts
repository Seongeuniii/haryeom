import axios from 'axios';
import { IUserInfo, IUserRole } from './user';
import { subjectDefaultOptions } from '@/components/FilterOpenTeacherList/filterDefaultOptions';

const path = '/members';

export const registUser = async (role: IUserRole, form: IUserInfo) => {
    try {
        let info;
        if (role === 'STUDENT') {
            info = {
                name: form.name,
                phone: form.phone,
                grade: form.grade,
                school: form.school,
            };
        } else {
            info = {
                name: form.name,
                phone: form.phone,
                college: form.college,
                collegeEmail: form.collegeEmail,
                profileStatus: form.profileStatus,
                gender: form.gender === '여자' ? 'FEMALE' : 'MALE',
                salary: parseInt(String(form.salary), 10),
                subjects: [
                    {
                        subjectId: subjectDefaultOptions.indexOf(form.subjects as string) + 1,
                        name: form.subjects,
                    },
                ],
                career: parseInt(String(form.career), 10),
                introduce: form.introduce,
            };
        }

        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify(info)], { type: 'application/json' }));
        if (form.profileImg instanceof File) {
            formData.append('profileImg', form.profileImg);
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
        return true;
    } catch {
        return false;
    }
};
