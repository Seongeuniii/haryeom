import Link from 'next/link';
import styled from 'styled-components';
import Select from '@/components/icons/Select';
import { ITeacherTutoring } from '@/apis/tutoring/tutoring';

interface TutoringStudentProfileProps {
    tutoring: ITeacherTutoring | undefined;
}

const TutoringStudentProfile = ({ tutoring }: TutoringStudentProfileProps) => {
    return (
        <StyledTutoringStudentProfile>
            {!tutoring ? (
                <Link href={'/find'}>과외 매칭 하러가기</Link>
            ) : (
                <>
                    <ProfileImage>
                        <img src={tutoring.studentProfileUrl} alt="" />
                    </ProfileImage>
                    <StudentInfo>
                        <SubjectName>
                            <span>{tutoring.subject.name}</span>
                            <span> ({tutoring.studentName} 학생)</span>
                            <button style={{ width: '14px', marginLeft: '0.4em' }}>
                                <Select />
                            </button>
                        </SubjectName>
                        <SchoolGrade>
                            <span>
                                {tutoring.studentSchool} {tutoring.studentGrade}
                            </span>
                        </SchoolGrade>
                    </StudentInfo>
                </>
            )}
            <Icon src="/images/student-girl.png" style={{ bottom: '0', right: '4em' }}></Icon>
            <Icon src="/images/student-boy.png" style={{ bottom: '0', right: '1em' }}></Icon>
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

const StudentInfo = styled.div`
    flex: 1%;
    margin-left: 1.4em;
    padding-bottom: 1em;
    display: flex;
    flex-direction: column;
`;

const SubjectName = styled.span`
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 0.5em;
    margin-bottom: 0.5em;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const SchoolGrade = styled.span`
    font-size: 14px;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const Icon = styled.img`
    position: absolute;
    height: 60px;
`;

export default TutoringStudentProfile;
