import styled from 'styled-components';
import GraduationCap from '@/components/icons/GraduationCap';
import CareerIcon from '@/components/icons/Career';
import DollarIcon from '@/components/icons/Dollar';
import UserIcon from '@/components/icons/User';
import BookIcon from '@/components/icons/Book';

const OpenTeacherCard = () => {
    return (
        <StyledOpenTeacherCard>
            <TeacherProfileImg src="/images/cha.png" />
            <TeacherName>이태호</TeacherName>
            <TeacherInfo>
                <Section>
                    <Option>
                        <OptionIcon>
                            <BookIcon />
                        </OptionIcon>
                        <span>국어 수학 영어</span>
                    </Option>
                    <Option>
                        <OptionIcon>
                            <GraduationCap />
                        </OptionIcon>
                        <span>서울대학교</span>
                    </Option>
                    <Option>
                        <OptionIcon>
                            <CareerIcon />
                        </OptionIcon>
                        <span>경력 10년 이상</span>
                    </Option>
                </Section>
                <Section>
                    <Option>
                        <OptionIcon>
                            <UserIcon />
                        </OptionIcon>
                        <span>여</span>
                    </Option>
                    <Option>
                        <OptionIcon>
                            <DollarIcon />
                        </OptionIcon>
                        <span>수업료</span>
                    </Option>
                </Section>
            </TeacherInfo>
        </StyledOpenTeacherCard>
    );
};

const StyledOpenTeacherCard = styled.div`
    height: 22em;
    border-radius: 1em;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
    overflow: hidden;
    display: flex;
    flex-direction: column;
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
    margin-bottom: 8px;
`;

const OptionIcon = styled.div`
    width: 30px;
`;

export default OpenTeacherCard;
