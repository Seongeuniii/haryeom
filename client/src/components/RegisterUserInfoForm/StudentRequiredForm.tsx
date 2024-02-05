import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import InputForm from '@/components/commons/InputForm';
import SelectForm from '@/components/commons/SelectForm';
import userSessionAtom from '@/recoil/atoms/userSession';
import UploadProfileImage from '@/components/UploadProfileImage';

interface StudentRequiredFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateUserInfo: (name: string, value: any) => void;
}

const StudentRequiredForm = ({ updateUserInfo }: StudentRequiredFormProps) => {
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return;

    return (
        <StyledStudentRequiredForm>
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
                label={'학교'}
                name={'school'}
                handleChange={(e) => updateUserInfo('school', e.target.value)}
            />
            <SelectForm
                label={'학년'}
                name={'grade'}
                optionList={[
                    '초등학교 1학년',
                    '초등학교 2학년',
                    '초등학교 3학년',
                    '초등학교 4학년',
                    '초등학교 5학년',
                    '초등학교 6학년',
                    '중학교 1학년',
                    '중학교 2학년',
                    '중학교 3학년',
                    '고등학교 1학년',
                    '고등학교 2학년',
                    '고등학교 3학년',
                    '재수/N수생',
                ]}
                handleSelect={updateUserInfo}
            />
            <InputForm
                label={'전화번호 - 숫자만 입력'}
                name={'phone'}
                handleChange={(e) => updateUserInfo('phone', e.target.value)}
            />
        </StyledStudentRequiredForm>
    );
};

const StyledStudentRequiredForm = styled.div`
    width: 100%;
    padding: 1.5em 2.3em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.3em;
`;

export default StudentRequiredForm;
