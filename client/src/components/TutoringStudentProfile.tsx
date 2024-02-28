import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Select from '@/components/icons/Select';
import { ITeacherTutoring, ITeacherTutorings } from '@/apis/tutoring/tutoring';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '@/components/commons/Dropdown';

interface TutoringStudentProfileProps {
    seletedTutoring: ITeacherTutoring | undefined;
    setSelectedTutoring: Dispatch<SetStateAction<ITeacherTutoring>>;
    tutorings: ITeacherTutorings;
}

const TutoringStudentProfile = ({
    seletedTutoring,
    setSelectedTutoring,
    tutorings,
}: TutoringStudentProfileProps) => {
    const { open, openDropdown, closeDropdown } = useDropdown();

    return (
        <StyledTutoringStudentProfile>
            {!seletedTutoring ? (
                <Link href={'/find'}>과외 매칭 하러가기</Link>
            ) : (
                <>
                    <ProfileImage>
                        <img src={seletedTutoring.studentProfileUrl} alt="학생 프로필 사진" />
                    </ProfileImage>
                    <StudentInfo onClick={!open ? openDropdown : undefined}>
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
                        <Dropdown open={open} closeDropdown={closeDropdown} top="27px">
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
                                                <StudentName>
                                                    ({tutoring.studentName}학생)
                                                </StudentName>
                                            </span>
                                        </Button>
                                    );
                                })}
                            </SelectStudentBox>
                        </Dropdown>
                    </StudentInfo>
                </>
            )}
            <Icon
                src="/images/student-girl.png"
                style={{ bottom: '0', right: '4em' }}
                alt="학생 이미지"
            ></Icon>
            <Icon
                src="/images/student-boy.png"
                style={{ bottom: '0', right: '1em' }}
                alt="학생 이미지"
            ></Icon>
        </StyledTutoringStudentProfile>
    );
};

const StyledTutoringStudentProfile = styled.div`
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

const StudentInfo = styled.div`
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

export default TutoringStudentProfile;
