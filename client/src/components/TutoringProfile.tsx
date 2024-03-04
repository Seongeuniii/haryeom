import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Select from '@/components/icons/Select';
import { ITutoring, ITutorings } from '@/apis/tutoring/tutoring';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '@/components/commons/Dropdown';
import userSessionAtom from '@/recoil/atoms/userSession';

interface TutoringProfileProps {
    seletedTutoring: ITutoring;
    setSelectedTutoring: Dispatch<SetStateAction<ITutoring>>;
    tutorings: ITutorings;
}

const TutoringProfile = ({
    seletedTutoring,
    setSelectedTutoring,
    tutorings,
}: TutoringProfileProps) => {
    const userSession = useRecoilValue(userSessionAtom);
    const { open, openDropdown, closeDropdown } = useDropdown();

    if (!seletedTutoring) {
        return (
            <StyledTutoringProfile>
                <NoTutoring>
                    {userSession?.role === 'STUDENT' ? (
                        <span>과외 선생님이 없어요</span>
                    ) : (
                        <span>과외 학생 없어요</span>
                    )}
                    <Link href={'/find'}>(과외 매칭 바로가기)</Link>
                </NoTutoring>
            </StyledTutoringProfile>
        );
    }

    if (userSession?.role === 'TEACHER') {
        return (
            <StyledTutoringProfile>
                <ProfileImage>
                    <img src={seletedTutoring.studentProfileUrl} alt="프로필 사진" />
                </ProfileImage>
                <TutoringInfo onClick={!open ? openDropdown : undefined}>
                    <SubjectName>
                        <span>{seletedTutoring.subject.name}</span>
                        <span> ({seletedTutoring.studentName} 학생)</span>
                        <button style={{ width: '14px', marginLeft: '0.4em' }}>
                            <Select />
                        </button>
                    </SubjectName>
                    <SchoolGrade>
                        <span>
                            {seletedTutoring.studentSchool} {seletedTutoring.studentGrade}
                        </span>
                    </SchoolGrade>
                    {/* <Dropdown open={open} closeDropdown={closeDropdown} top="27px">
                        <SelectStudentBox>
                            {tutorings.map((tutoring, index) => {
                                return (
                                    <Button
                                        onClick={() => {
                                            closeDropdown();
                                            setSelectedTutoring(() => tutoring);
                                        }}
                                        key={`select_teacher_${index}`}
                                    >
                                        <StudentProfileImage
                                            src={tutoring.studentProfileUrl}
                                            alt="학생 프로필 사진"
                                        />
                                        <span>
                                            <SubjectName>{tutoring.subject.name} </SubjectName>
                                            <StudentName>({tutoring.studentName}학생)</StudentName>
                                        </span>
                                    </Button>
                                );
                            })}
                        </SelectStudentBox>
                    </Dropdown> */}
                </TutoringInfo>
            </StyledTutoringProfile>
        );
    }

    return (
        <StyledTutoringProfile>
            <ProfileImage>
                <img src={seletedTutoring.teacherProfileUrl} alt="프로필 사진" />
            </ProfileImage>
            <TutoringInfo onClick={!open ? openDropdown : undefined}>
                <SubjectName>
                    <span>{seletedTutoring.subject.name}</span>
                    <span> ({seletedTutoring.teacherName} 선생님)</span>
                    <button style={{ width: '14px', marginLeft: '0.4em' }}>
                        <Select />
                    </button>
                </SubjectName>
                {/* <Dropdown open={open} closeDropdown={closeDropdown} top="27px">
                    <SelectStudentBox>
                        {tutorings.map((tutoring, index) => {
                            return (
                                <Button
                                    onClick={() => {
                                        closeDropdown();
                                        setSelectedTutoring(() => tutoring);
                                    }}
                                    key={`select_teacher_${index}`}
                                >
                                    <StudentProfileImage
                                        src={tutoring.teacherProfileUrl}
                                        alt="선생님 프로필 사진"
                                    />
                                    <div>
                                        <SubjectName>{tutoring.subject.name} </SubjectName>
                                        <StudentName>({tutoring.teacherName} 선생님)</StudentName>
                                    </div>
                                </Button>
                            );
                        })}
                    </SelectStudentBox>
                </Dropdown> */}
            </TutoringInfo>
        </StyledTutoringProfile>
    );
};

const StyledTutoringProfile = styled.div`
    position: relative;
    width: 100%;
    padding: 1.3em;
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    border-radius: 1em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 100%;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const StudentProfileImage = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.LIGHT_BLACK};
`;

const TutoringInfo = styled.div`
    position: relative;
    margin-left: 1.4em;
    padding-bottom: 1em;
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

const SubjectName = styled.span`
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 0.5em;
    margin-bottom: 0.5em;
`;

const StudentName = styled.span`
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 0.5em;
    margin-bottom: 0.5em;
`;

const SchoolGrade = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const Icon = styled.img`
    position: absolute;
    height: 60px;
`;

const SelectStudentBox = styled.div`
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 0.3em;
    white-space: nowrap;
`;

const Button = styled.button`
    width: 100%;
    height: 50px;
    padding: 0 1em;
    display: flex;
    align-items: center;
    border-radius: 0.2em;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
        transition: all 0.5s;
    }
`;

const NoTutoring = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    font-weight: 700;
    color: ${({ theme }) => theme.LIGHT_BLACK};

    a {
        text-decoration: underline;
    }
`;

export default TutoringProfile;
