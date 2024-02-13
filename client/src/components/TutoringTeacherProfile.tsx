import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Select from '@/components/icons/Select';
import { IStudentTutoring, IStudentTutorings } from '@/apis/tutoring/tutoring';
import Dropdown from './commons/Dropdown';
import useDropdown from '@/hooks/useDropdown';

interface TutoringTeacherProfileProps {
    seletedTutoring: IStudentTutoring | undefined;
    setSelectedTutoring: Dispatch<SetStateAction<IStudentTutoring>>;
    tutorings: IStudentTutorings;
}

const TutoringTeacherProfile = ({
    seletedTutoring,
    setSelectedTutoring,
    tutorings,
}: TutoringTeacherProfileProps) => {
    const { open, openDropdown, closeDropdown } = useDropdown();

    return (
        <StyledTutoringTeacherProfile>
            {!seletedTutoring ? (
                <Link href={'/find'}>과외 매칭 하러가기</Link>
            ) : (
                <>
                    <ProfileImage>
                        <img src={seletedTutoring.teacherProfileUrl} alt="" />
                    </ProfileImage>
                    <TeacherInfo onClick={!open ? openDropdown : undefined}>
                        <SubjectName>
                            <span>{seletedTutoring.subject.name}</span>
                            <span> ({seletedTutoring.teacherName} 선생님)</span>
                            <button style={{ width: '14px', marginLeft: '0.4em' }}>
                                <Select />
                            </button>
                        </SubjectName>
                        <Dropdown open={open} closeDropdown={closeDropdown} top="27px">
                            <SelectTeacherBox>
                                {tutorings.map((tutoring, index) => {
                                    return (
                                        <Button
                                            onClick={() => {
                                                closeDropdown();
                                                setSelectedTutoring(() => tutoring);
                                            }}
                                            key={`select_teacher_${index}`}
                                        >
                                            <TeacherProfileImage src={tutoring.teacherProfileUrl} />
                                            <div>
                                                <SubjectName>{tutoring.subject.name} </SubjectName>
                                                <TeacherName>
                                                    ({tutoring.teacherName} 선생님)
                                                </TeacherName>
                                            </div>
                                        </Button>
                                    );
                                })}
                            </SelectTeacherBox>
                        </Dropdown>
                    </TeacherInfo>
                </>
            )}
            <Icon src="/images/teacher.png" style={{ bottom: '0', right: '1em' }}></Icon>
        </StyledTutoringTeacherProfile>
    );
};

const StyledTutoringTeacherProfile = styled.div`
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

const TeacherProfileImage = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 100%;
`;

const TeacherInfo = styled.div`
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

const TeacherName = styled.span`
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

const SelectTeacherBox = styled.div`
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

export default TutoringTeacherProfile;
