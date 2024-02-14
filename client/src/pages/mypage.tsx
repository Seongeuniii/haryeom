/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
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
        name: '',
        school: '',
        grade: '',
        phone: '',
        profileUrl: '',
        college: '', // 여기부터 선생님의 정보
        collegeEmail: '',
        profileStatus: false,
        gender: '',
        salary: 0,
        career: 0,
        subjects: [],
        introduce: '',
    }); // role에 따라서 student 담거나, teacher 담거나

    const [role, setRole] = useState<IUserRole>(); // STUDENT or TEACHER
    useEffect(() => {
        setRole(userSession?.role);
        axios
            .get<IUserInfo>(
                `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${userSession?.role.toLocaleLowerCase()}s/${userSession?.memberId}`,
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                setProfile(res.data);
            });
    }, []); // 최초 렌더링 직후에만 실행
    //
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
                                    <div>{profile.name}</div>
                                    {isStudent() && <div>{profile.grade}</div>}
                                    {isStudent() && <div>{profile.school}</div>}
                                    {isTeacher() && <div className={role}>{profile.college}</div>}
                                    <div>{profile.phone}</div>
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
                                    <div>{profileStatus()}</div>
                                    <div className="infoName">성별</div>
                                    <div>{gender()}</div>
                                </TeacherInfo>
                                <TeacherInfo>
                                    <div className="infoName">예상 과외비</div>
                                    <div>{profile.salary}원</div>
                                    <div className="infoName">경력</div>
                                    <div>{profile.career}년</div>
                                </TeacherInfo>
                                <InfoContent>
                                    <div className="infoName">가르칠 과목</div>
                                    <div>{subject()}</div>
                                    <div className="infoName">선생님 소개</div>
                                </InfoContent>
                                <br />
                                <TeacherIntroduce className={role}>
                                    <p>{profile.introduce}</p>
                                </TeacherIntroduce>
                            </OptionalInfo>
                        </InfoBody>
                    )}
                    <FormButton onClick={() => router.push('/update')}>정보 수정하기</FormButton>
                </InfoBox>
            </StyledMypage>
        </HomeLayout>
    );
};
const StyledMypage = styled.div`
    margin: auto;
    width: 90%;
    text-align: center;
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
`;

const FormButton = styled.button`
    width: 20%;
    margin: 2em 0;
    padding: 0.5em;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    color: ${({ theme }) => theme.WHITE};
    font-weight: bold;
    border-radius: 0.4em;
    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;
export default Mypage;
