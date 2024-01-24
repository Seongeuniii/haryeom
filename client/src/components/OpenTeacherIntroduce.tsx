import styled from 'styled-components';
import GraduationCap from '@/components/icons/GraduationCap';
import CareerIcon from '@/components/icons/Career';
import DollarIcon from '@/components/icons/Dollar';
import UserIcon from '@/components/icons/User';
import BookIcon from '@/components/icons/Book';

const OpenTeacherIntroduce = () => {
    return (
        <StyledOpenTeacherIntroduce>
            <StyledOpenTeacherIntroduceHeader>이태호 선생님</StyledOpenTeacherIntroduceHeader>
            <div style={{ display: 'flex' }}>
                <TeacherProfileImg src="/images/cha.png" />
                <StartMatching>
                    <MatchingButtonDescription>
                        <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>이태호 </span>
                        선생님에게
                        <br />
                        원하는 수업에 대해 문의해 보세요!
                    </MatchingButtonDescription>
                    <StartChattingButton>채팅으로 문의하기</StartChattingButton>
                </StartMatching>
            </div>
            <TeacherTutoringInfo>
                <Infos>
                    <Info>
                        <Icon>
                            <BookIcon />
                        </Icon>
                        <span>국어 수학 영어</span>
                    </Info>
                    <Info>
                        <Icon>
                            <GraduationCap />
                        </Icon>
                        <span>서울대학교</span>
                    </Info>
                    <Info>
                        <Icon>
                            <CareerIcon />
                        </Icon>
                        <span>경력 10년 이상</span>
                    </Info>
                    <Info>
                        <Icon>
                            <UserIcon />
                        </Icon>
                        <span>여</span>
                    </Info>
                    <Info>
                        <Icon>
                            <DollarIcon />
                        </Icon>
                        <span>수업료</span>
                    </Info>
                </Infos>
                <TeacherIntroduceText>
                    학생이 잘 못하는 것에 절대 화내지 않고, 화나지 않습니다. 그것은, 그렇기 때문에
                    저에게 찾아온 것이고, 개선되지 않는 것은 선생인 제 탓이기 때문입니다.
                    <br />
                    <br />
                    공부는 인생의 수단일 뿐,
                    <br />
                    나를 주도하는 뭔가가 될 수 없습니다.
                    <br />
                    <br />
                    수능이라는 과정을 통해서 문제상황을 감지하고, 분석하고, 대응하는 방식을 잘 배워
                    앞으로 누군가의 도움 없이도 인생을 스스로 설계하는 어른으로 성장하기를 바랍니다.
                </TeacherIntroduceText>
            </TeacherTutoringInfo>
        </StyledOpenTeacherIntroduce>
    );
};

const StyledOpenTeacherIntroduce = styled.div`
    background-color: white;
    padding: 2.5em;
    border-radius: 1em;
    width: min-content;
`;

const StyledOpenTeacherIntroduceHeader = styled.header`
    font-size: 1.2em;
    font-weight: bold;
    padding: 0.3em 0 1.2em 0;
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
    border-radius: 0.5em;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    border: 2px solid ${({ theme }) => theme.PRIMARY};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MatchingButtonDescription = styled.div`
    text-align: center;
    padding: 1em;
`;

const StartChattingButton = styled.button`
    width: 92%;
    height: 3em;
    background-color: ${({ theme }) => theme.PRIMARY};
    color: white;
    border-radius: 0.5em;

    &:hover {
        border: 2px solid ${({ theme }) => theme.DARK_BLACK};
    }
`;

const TeacherTutoringInfo = styled.div`
    display: flex;
    padding: 1em 1em 0 1em;
    font-size: 0.9em;
`;

const Infos = styled.div`
    width: min-content;
    padding-right: 2em;
    border-right: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const Info = styled.div`
    white-space: nowrap;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const Icon = styled.div`
    width: 30px;
    text-align: center;
    margin-right: 3px;
`;

const TeacherIntroduceText = styled.span`
    padding-left: 2em;
`;

export default OpenTeacherIntroduce;
