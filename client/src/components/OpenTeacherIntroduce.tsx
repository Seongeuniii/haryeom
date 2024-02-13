import styled from 'styled-components';
import GraduationCap from '@/components/icons/GraduationCap';
import CareerIcon from '@/components/icons/Career';
import DollarIcon from '@/components/icons/Dollar';
import UserIcon from '@/components/icons/User';
import BookIcon from '@/components/icons/Book';
import { IOpenTeacherDetail } from '@/apis/matching/matching';

interface IOpenTeacherIntroduceProps {
    openTeacherDetail: IOpenTeacherDetail | undefined;
    startChat: () => void;
}

const OpenTeacherIntroduce = ({ openTeacherDetail, startChat }: IOpenTeacherIntroduceProps) => {
    return (
        <StyledOpenTeacherIntroduce>
            <StyledOpenTeacherIntroduceHeader>
                {openTeacherDetail?.name} 선생님
            </StyledOpenTeacherIntroduceHeader>
            <div style={{ display: 'flex' }}>
                <TeacherProfileImg src={openTeacherDetail?.profileUrl} />
                <StartMatching>
                    <MatchingButtonDescription>
                        <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                            {openTeacherDetail?.name}{' '}
                        </span>
                        선생님에게
                        <br />
                        <br />
                        원하는 수업에 대해 문의해 보세요!
                        <br /> <br /> <br />
                    </MatchingButtonDescription>
                    <StartChattingButton onClick={startChat}>채팅으로 문의하기</StartChattingButton>
                </StartMatching>
            </div>
            <TeacherTutoringInfo>
                <Infos>
                    <Title>수업 정보</Title>
                    <Info>
                        <Icon>
                            <BookIcon />
                        </Icon>
                        <Subjects>
                            {openTeacherDetail?.subjects.map((subject) => {
                                return (
                                    <SubjectName key={subject.subjectId}>
                                        {subject.name}
                                    </SubjectName>
                                );
                            })}
                        </Subjects>
                    </Info>
                    <Info>
                        <Icon>
                            <GraduationCap />
                        </Icon>
                        <span>{openTeacherDetail?.college}</span>
                    </Info>
                    <Info>
                        <Icon>
                            <CareerIcon />
                        </Icon>
                        <span>경력 {openTeacherDetail?.career}년</span>
                    </Info>
                    <Info>
                        <Icon>
                            <UserIcon />
                        </Icon>
                        <span>{openTeacherDetail?.gender === 'MALE' ? '남자' : '여자'}</span>
                    </Info>
                    <Info>
                        <Icon>
                            <DollarIcon />
                        </Icon>
                        <span>최소 {openTeacherDetail?.salary}원</span>
                    </Info>
                </Infos>
                <TeacherIntroduceText>
                    <Title>선생님 소개</Title>
                    <span>{openTeacherDetail?.introduce}</span>
                </TeacherIntroduceText>
            </TeacherTutoringInfo>
        </StyledOpenTeacherIntroduce>
    );
};

const StyledOpenTeacherIntroduce = styled.div`
    padding: 2.5em;
    border-radius: 1em;
    width: min-content;
    background-color: ${({ theme }) => theme.SECONDARY};
`;

const StyledOpenTeacherIntroduceHeader = styled.header`
    font-size: 22px;
    font-weight: bold;
    padding: 0.3em 0 1.2em 0;
`;

const Title = styled.div`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const TeacherProfileImg = styled.img`
    width: 22em;
    height: 16em;
    object-fit: cover;
    border-radius: 0.5em;
    margin-bottom: 1em;
`;

const StartMatching = styled.div`
    width: 18em;
    height: 16em;
    margin-left: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.5em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    background-color: white;
`;

const MatchingButtonDescription = styled.div`
    line-height: 0.75;
`;

const StartChattingButton = styled.button`
    width: 92%;
    height: 3em;
    background-color: ${({ theme }) => theme.PRIMARY};
    color: white;
    border-radius: 0.5em;

    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.03);
    }
`;

const TeacherTutoringInfo = styled.div`
    display: flex;
    padding: 1em;
    font-size: 14px;
    border-radius: 0.5em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    background-color: white;
`;

const Infos = styled.div`
    width: min-content;
    min-width: 200px;
    padding-right: 1.5em;
    border-right: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const Info = styled.div`
    white-space: nowrap;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Subjects = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

const SubjectName = styled.li`
    padding: 3px;
`;

const Icon = styled.div`
    min-width: 30px;
    margin-right: 3px;
    text-align: center;
`;

const TeacherIntroduceText = styled.span`
    width: 100%;
    padding-left: 2em;

    span {
        padding: 10px;
    }
`;

export default OpenTeacherIntroduce;
