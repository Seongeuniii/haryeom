import styled from 'styled-components';
import GraduationCap from '@/components/icons/GraduationCap';
import CareerIcon from '@/components/icons/Career';
import DollarIcon from '@/components/icons/Dollar';
import UserIcon from '@/components/icons/User';
import BookIcon from '@/components/icons/Book';
import { IOpenTeacher } from '@/apis/matching/matching';

interface OpenTeacherCardProps {
    onClick: () => void;
    openTeacher: IOpenTeacher;
}

const OpenTeacherCard = ({ onClick, openTeacher }: OpenTeacherCardProps) => {
    return (
        <StyledOpenTeacherCard onClick={onClick}>
            <TeacherProfileImg src={openTeacher.profileUrl} />
            <TeacherName>{openTeacher.name}</TeacherName>
            <TeacherInfo>
                <Section>
                    <Option>
                        <OptionIcon>
                            <BookIcon />
                        </OptionIcon>
                        <Subjects>
                            {openTeacher.subjects.map((subject) => {
                                return <div key={subject.subjectId}>{subject.name}</div>;
                            })}
                        </Subjects>
                    </Option>
                    <Option>
                        <OptionIcon>
                            <GraduationCap />
                        </OptionIcon>
                        <div>{openTeacher.college}</div>
                    </Option>
                    <Option>
                        <OptionIcon>
                            <CareerIcon />
                        </OptionIcon>
                        <div>경력 {openTeacher.career}년</div>
                    </Option>
                </Section>
                <Section>
                    <Option>
                        <OptionIcon>
                            <UserIcon />
                        </OptionIcon>
                        <div>{openTeacher.gender === 'MALE' ? '남자' : '여자'}</div>
                    </Option>
                    <Option>
                        <OptionIcon>
                            <DollarIcon />
                        </OptionIcon>
                        <div>최소 {openTeacher.salary}원</div>
                    </Option>
                </Section>
            </TeacherInfo>
        </StyledOpenTeacherCard>
    );
};

const StyledOpenTeacherCard = styled.div`
    height: 22em;
    border-radius: 1em;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &:hover {
        box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
    }
`;

const TeacherProfileImg = styled.img`
    width: 100%;
    height: 57%;
    object-fit: cover;
`;

const TeacherName = styled.div`
    padding: 1em 1em 0 1em;
    font-size: 1.1em;
    font-weight: bold;
`;

const TeacherInfo = styled.div`
    flex: 1;
    padding: 1.3em;
    font-size: 0.8em;
    display: flex;
    justify-content: space-between;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
`;

const Option = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    div {
        height: 20px;
        white-space: nowrap;
    }
`;

const Subjects = styled.div`
    width: 60px;
    white-space: nowrap;
    overflow: hidden;
`;

const OptionIcon = styled.div`
    width: 30px;
    text-align: center;
    margin-right: 3px;
`;

export default OpenTeacherCard;
