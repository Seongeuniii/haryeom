import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import InputForm from '@/components/commons/InputForm';
import userSessionAtom from '@/recoil/atoms/userSession';
import UploadProfileImage from '@/components/UploadProfileImage';

interface TeacherRequiredFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateUserInfo: (name: string, value: any) => void;
}

const TeacherRequiredForm = ({ updateUserInfo }: TeacherRequiredFormProps) => {
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return;

    return (
        <StyledTeacherRequiredForm>
            <UploadProfileImage
                defaultImage={userSession.profileUrl}
                handleImageChange={(file) => updateUserInfo('profileImg', file)}
            />
            <InputForm
                label={'이름'}
                name={'name'}
                handleChange={(e) => updateUserInfo('name', e.target.value)}
            />
            <InputForm
                label={'대학교'}
                name={'college'}
                handleChange={(e) => updateUserInfo('college', e.target.value)}
            />
            <InputForm
                label={'대학교 이메일'}
                name={'collegeEmail'}
                handleChange={(e) => updateUserInfo('collegeEmail', e.target.value)}
            />
            <InputForm
                label={'전화번호 - 숫자만 입력'}
                name={'phone'}
                handleChange={(e) => updateUserInfo('phone', e.target.value)}
            />
        </StyledTeacherRequiredForm>
    );
};

const StyledTeacherRequiredForm = styled.div`
    width: 100%;
    padding: 1.5em 2.3em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.3em;
`;

export default TeacherRequiredForm;
