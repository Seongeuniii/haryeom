import { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import InputForm from '@/components/commons/InputForm';
import SelectForm from '@/components/commons/SelectForm';
import { IUserRole } from '@/apis/user/user';
import userSessionAtom from '@/recoil/atoms/userSession';

interface RequiredInfoFormProps {
    userRole: IUserRole;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateUserInfo: (name: string, value: any) => void;
}

const RequiredInfoForm = ({ userRole, updateUserInfo }: RequiredInfoFormProps) => {
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return;

    const [selectedImage, setSelectedImage] = useState<File | string | undefined>(
        userSession?.profileUrl
    );
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>, name: string) => {
        const file = event.target.files?.[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            setSelectedImage(file);
            // updateUserInfo(name, file);
        } else {
            alert('이미지 파일은 PNG 또는 JPEG 형식이어야 합니다.');
        }
    };

    return (
        <StyledRequiredInfoForm>
            <UploadImage onClick={handleImageClick}>
                {selectedImage ? (
                    <img
                        src={
                            selectedImage instanceof File
                                ? URL.createObjectURL(selectedImage)
                                : selectedImage
                        }
                        alt="Selected"
                    />
                ) : (
                    <p>클릭하여 이미지 업로드</p>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    accept=".png, .jpg, .jpeg"
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageChange(e, 'name')}
                ></input>
            </UploadImage>
            <span>프로필 사진</span>
            <InputForm
                label={'이름'}
                name={'name'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateUserInfo('name', e.target.value)
                }
            />
            {userRole === 'STUDENT' ? (
                <>
                    <InputForm
                        label={'학교'}
                        name={'school'}
                        handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updateUserInfo('school', e.target.value)
                        }
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
                </>
            ) : (
                <>
                    <InputForm
                        label={'대학교'}
                        name={'college'}
                        handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updateUserInfo('college', e.target.value)
                        }
                    />
                    <InputForm
                        label={'대학교 이메일'}
                        name={'collegeEmail'}
                        handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updateUserInfo('collegeEmail', e.target.value)
                        }
                    />
                </>
            )}
            <InputForm
                label={'전화번호 - 숫자만 입력'}
                name={'phone'}
                handleChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateUserInfo('phone', e.target.value)
                }
            />
        </StyledRequiredInfoForm>
    );
};

const StyledRequiredInfoForm = styled.div`
    width: 100%;
    padding: 1.5em 2.3em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.3em;
`;

const UploadImage = styled.div`
    width: 170px;
    height: 170px;
    border-radius: 50%;
    border: 1px solid #ccc;
    overflow: hidden;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p {
        text-align: center;
        line-height: 100px;
        margin: 0;
        padding-top: 34px;
        font-size: 12px;
    }
`;

export default RequiredInfoForm;
