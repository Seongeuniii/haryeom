/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import HomeLayout from '@/components/layouts/HomeLayout';
import { IUserInfo, IUserRole } from '@/apis/user/user';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import router from 'next/router';

const path = '/members';
const Mypage = () => {
    const userSession = useRecoilValue(userSessionAtom);

    const [name, setName] = useState<number>(1);
    const [profile, setProfile] = useState<any>({
        name: '김태윤',
        school: '싸피중학교',
        grade: '중학교 2학년',
        phone: '01012345678',
        profileUrl: '/images/student-boy.png',
        college: '싸피대학교', // 여기부터 선생님의 정보
        collegeEmail: 'taeyun@ssafy.ac.kr',
        profileStatus: false,
        gender: 'MALE',
        salary: 999,
        career: 99,
        subjects: [
            { id: 1, name: '수학' },
            { id: 2, name: '과학' },
        ],
        introduce:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    }); // role에 따라서 student 담거나, teacher 담거나

    const [role, setRole] = useState<IUserRole>(); // STUDENT or TEACHER
    useEffect(() => {
        setRole('TEACHER');
        // const result = axios.get<IUserInfo>(`${process.env.NEXT_PUBLIC_API_SERVER}${path}/${userSession?.role.toLocaleLowerCase()}s/${userSession?.memberId}`)
        // setProfile(result);
    }, []); // 최초 렌더링 직후에만 실행

    const subject = () => {
        const result = [];
        for (let i = 0; i < profile.subjects.length; i++) {
            result.push(<span key={i}>{profile.subjects[i].name}</span>);
        }
        return result;
    };

    const gender = () => {
        let result = '';
        if (profile.gender == 'MALE') result = '남성';
        else result = '여성';
        return result;
    };

    const profileStatus = () => {
        let result = '';
        if (profile.profileStatus) result = '공개';
        else result = '비공개';
        return result;
    };
    const isTeacher = () => {
        if (role == 'TEACHER') return true;
        else return false;
    };
    const isStudent = () => {
        if (role == 'STUDENT') return true;
        else return false;
    };

    const submit = () => {};

    return (
        <HomeLayout>
            <StyledMypage>
                <InfoBox>
                    <InfoHeader>
                        <div>프로필 정보</div>
                    </InfoHeader>
                    <InfoBody>
                        <SubInfoHeader>
                            <div>필수 정보</div>
                        </SubInfoHeader>
                        <RequiredInfo>
                            <ProfileImg>
                                <img src={profile.profileUrl} />
                            </ProfileImg>
                            <ProfileInfo>
                                <InfoName>
                                    <div>이름</div>
                                    {isStudent() && <div>학년</div>}
                                    {isStudent() && <div>학교</div>}
                                    {isTeacher() && <div>대학교</div>}
                                    <div>전화번호</div>
                                </InfoName>
                                <InfoContent>
                                    <div>
                                        <input type="text" name="name" value={profile.name} />
                                    </div>
                                    {isStudent() && (
                                        <div>
                                            <input type="text" name="grade" value={profile.grade} />{' '}
                                            select
                                        </div>
                                    )}
                                    {isStudent() && (
                                        <div>
                                            <input
                                                type="text"
                                                name="school"
                                                value={profile.school}
                                            />
                                        </div>
                                    )}
                                    {isTeacher() && <div>{profile.college}</div>}
                                    <div>
                                        <input type="text" name="phone" value={profile.phone} />
                                    </div>
                                </InfoContent>
                            </ProfileInfo>
                        </RequiredInfo>
                    </InfoBody>
                    {isTeacher() && (
                        <InfoBody>
                            <SubInfoHeader>
                                <div>선택 정보</div>
                            </SubInfoHeader>
                            <OptionalInfo>
                                <TeacherInfo>
                                    <div className="infoName">프로필 공개 여부</div>
                                    <div>
                                        <span>공개</span>
                                        <span>비공개</span>
                                    </div>
                                    <div className="infoName">성별</div>
                                    <div>{gender()}</div>
                                </TeacherInfo>
                                <TeacherInfo>
                                    <div className="infoName">예상 과외비</div>
                                    <div>
                                        <input
                                            className="salaryInput"
                                            type="number"
                                            value={profile.salary}
                                        />
                                        만원
                                    </div>
                                    <div className="infoName">경력</div>
                                    <div>
                                        <input
                                            className="careerInput"
                                            type="number"
                                            value={profile.career}
                                        />
                                        년
                                    </div>
                                </TeacherInfo>
                                <InfoContent>
                                    <div className="infoName">
                                        가르칠 과목
                                        <button>+</button>
                                        <button>-</button>
                                    </div>
                                    <div>{subject()}</div>
                                    <div className="infoName">선생님 소개</div>
                                </InfoContent>
                                <br />
                                <TeacherIntroduce>
                                    <textarea value={profile.introduce} />
                                </TeacherIntroduce>
                            </OptionalInfo>
                        </InfoBody>
                    )}
                    <Button>
                        <FormButton onClick={() => submit()}>수정</FormButton>
                        <FormButton onClick={() => router.back()}>취소</FormButton>
                    </Button>
                </InfoBox>
            </StyledMypage>
        </HomeLayout>
    );
};
const StyledMypage = styled.div`
    margin: auto;
    width: 90%;
    text-align: center;
    input {
        height: 16px;
        font-family: inherit;
        border-width: 0;
        font-size: 16px;
    }
    input:hover {
        background: rgba(0, 0, 0, 0.02);
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5);
    }
    input:not(:placeholder-shown) + .label {
        color: rgba(0, 0, 0, 0.5);
        transform: translate3d(0, -12px, 0) scale(0.75);
    }
    input:focus {
        background: rgba(0, 0, 0, 0.001);
        outline: none;
        box-shadow: 0 2px 0 ${({ theme }) => theme.PRIMARY};
    }
`;
const InfoBox = styled.div`
    position: relative;
    min-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1em;
    background-color: white;
    box-shadow:
        15px 0px 20px rgba(105, 105, 105, 0.25),
        -15px 0px 20px rgba(105, 105, 105, 0.25);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;
const InfoHeader = styled.div`
    width: 100%;
    height: 30px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    padding: 1.5em 0;
`;
const InfoBody = styled.div`
    width: 100%;
    padding: 0.5em 0 0;
`;
const SubInfoHeader = styled.div`
    width: 100%;
    height: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin: 1em 0;
`;

const RequiredInfo = styled.div`
    margin: auto;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
`;

const ProfileImg = styled.div`
    background-color: skyblue;
    width: 150px;
    height: 150px;
    border-radius: 30%;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const ProfileInfo = styled.div`
    display: flex;
    justify-content: flex-start;
`;
const InfoName = styled.div`
    div {
        padding: 0.5em 1em;
    }
    text-align: left;

    font-weight: 500;
`;
const InfoContent = styled.div`
    div {
        padding: 0.5em 1em;
    }
    span {
        display: inline-block;
        margin: 0 0.5em;
        min-width: 4em;
        padding: 0.5em 0.5em;
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
        color: ${({ theme }) => theme.WHITE};
        &:hover {
            background-color: ${({ theme }) => theme.PRIMARY};
        }
        text-align: center;
        border-radius: 0.4em;
    }
    button {
        margin: 0 0.2em;
        width: 18px;
        height: 18px;
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
        color: ${({ theme }) => theme.WHITE};
        font-weight: bold;
        border-radius: 70%;
        &:hover {
            background-color: ${({ theme }) => theme.PRIMARY};
        }
        text-align: center;
    }
    text-align: left;
`;

const OptionalInfo = styled.div`
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .infoName {
        font-weight: 500;
    }
    text-align: left;
`;

const TeacherInfo = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 0.5em;
    div:nth-child(1) {
        flex-basis: 30%;
    }
    div {
        flex-basis: 25%;
        padding: 0 0.5em;
    }
    span {
        padding: 0 0.3em;
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
        color: ${({ theme }) => theme.WHITE};
        &:hover {
            background-color: ${({ theme }) => theme.PRIMARY};
        }
        text-align: center;
    }
    .careerInput {
        max-width: 1.5em;
    }
    input {
        max-width: 2.5em;
        text-align: center;
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type='number'] {
        -moz-appearance: textfield;
    }
`;
const TeacherIntroduce = styled.div`
    width: 90%;
    min-height: 200px;
    margin: auto;
    border-radius: 0.8em;
    padding: 2em;
    background-color: white;
    text-align: left;
    box-shadow: 0px 0px 10px rgba(105, 105, 105, 0.25);
    textarea {
        resize: none;
        width: 100%;
        min-height: 200px;
        border: 0;
    }
    textarea:focus {
        outline: none;
    }
`;

const FormButton = styled.button`
    margin: 2em 0;
    padding: 0.5em;
    min-width: 6em;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    color: ${({ theme }) => theme.WHITE};
    font-weight: bold;
    border-radius: 0.4em;
    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

const Button = styled.div`
    display: flex;
    justify-content: space-around;
    width: 30%;
`;
export default Mypage;
