import { useRef, useState } from 'react';
import styled from 'styled-components';

interface UploadProfileImage {
    defaultImage: string;
    handleImageChange: (file: File) => void;
}

const UploadProfileImage = ({ defaultImage, handleImageChange }: UploadProfileImage) => {
    const [selectedImage, setSelectedImage] = useState<File | string>(defaultImage);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <StyledUploadProfileImage onClick={handleImageClick}>
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
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
                            setSelectedImage(file);
                            handleImageChange(file);
                        } else {
                            alert('이미지 파일은 PNG 또는 JPEG 형식이어야 합니다.');
                        }
                    }}
                ></input>
            </StyledUploadProfileImage>
            <span>프로필 사진</span>
        </>
    );
};

const StyledUploadProfileImage = styled.div`
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

export default UploadProfileImage;
