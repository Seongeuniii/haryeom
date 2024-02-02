import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import InputForm from '@/components/commons/InputForm';
import SelectForm from '@/components/commons/SelectForm';
import { IUserRole } from '@/apis/user/user';
import ToggleButton from '@/components/commons/ToggleButton';
import { subjectDefaultOptions } from '@/components/FilterOpenTeacherList/filterDefaultOptions';

interface OptionalInfoFormProps {
    userRole: IUserRole;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateUserInfo: (name: string, value: any) => void;
}

const OptionalInfoForm = ({ userRole, updateUserInfo }: OptionalInfoFormProps) => {
    const [isProfilePublic, setProfilePublic] = useState(false);

    const handleToggleChange = (checked: boolean) => {
        setProfilePublic(checked);
        updateUserInfo('profileStatus', checked);
    };

    return (
        <StyledOptionalInfoForm>
            <ProfilePrivacy>
                <span>{isProfilePublic ? '프로필 공개' : '프로필 비공개'}</span>
                <ToggleButton isChecked={isProfilePublic} onChange={handleToggleChange} />
            </ProfilePrivacy>
            <SelectForm
                label={'과목'}
                name={'subjects'}
                optionList={subjectDefaultOptions}
                handleSelect={updateUserInfo}
            />
            <SelectForm
                label={'성별'}
                name={'gender'}
                optionList={['여자', '남자']}
                handleSelect={updateUserInfo}
            />
            <InputForm
                label={'예상 과외비 (원)'}
                name={'salary'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateUserInfo('salary', e.target.value)
                }
            />
            <InputForm
                label={'경력 (년)'}
                name={'career'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateUserInfo('career', e.target.value)
                }
            />
            <InputForm
                label={'선생님 소개'}
                name={'introduce'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateUserInfo('introduce', e.target.value)
                }
            />
        </StyledOptionalInfoForm>
    );
};

const StyledOptionalInfoForm = styled.div`
    width: 100%;
    padding: 1.5em 2.7em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.3em;
`;

const ProfilePrivacy = styled.div`
    display: flex;
    gap: 1em;
    align-items: center;
    font-weight: 700;
    color: ${({ theme }) => theme.PRIMARY};
`;

export default OptionalInfoForm;
