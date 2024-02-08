import Link from 'next/link';
import styled from 'styled-components';
import Modal from '@/components/commons/Modal';
import { SetStateAction, useState } from 'react';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

interface IMember {
    memberId: number;
    memberName: string;
}

interface ITeam {
    teamId: number;
    teamName: string;
    members: IMember[];
}

const DemoLoginContainer = () => {
    const router = useRouter();

    const path = '/auth/test/login/';
    // const [reqMemberId, setReqMemberId] = useState<number>(67);
    const [selectedTeam, setSelectedTeam] = useState<number>(0);
    const getToken = async (reqMemberId: number) => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER}/auth/test/login/${reqMemberId}`
            );
            const { accessToken, refreshToken } = res.data;
            setCookie('accessToken', accessToken);
            setCookie('refreshToken', refreshToken);
            window.location.href = '/';
            console.log('success login');
            return true;
        } catch {
            console.log('fail login');
            return false;
        }
    };

    const login = (memberId: number) => {
        const successLogin = getToken(memberId);
        if (!successLogin) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
    };

    const [teams, setTeams] = useState<ITeam[]>([
        {
            teamId: 0,
            teamName: '1팀',
            members: [
                { memberId: 57, memberName: '김승우' },
                { memberId: 58, memberName: '황진하' },
                { memberId: 59, memberName: '김미서' },
                { memberId: 60, memberName: '조서현' },
                { memberId: 61, memberName: '권원영' },
                { memberId: 62, memberName: '박주현' },
            ],
        },
        {
            teamId: 1,
            teamName: '2팀',
            members: [
                { memberId: 63, memberName: '김진용' },
                { memberId: 64, memberName: '강민정' },
                { memberId: 65, memberName: '신우섭' },
                { memberId: 66, memberName: '김연화' },
                { memberId: 67, memberName: '최민호' },
                { memberId: 68, memberName: '임덕기' },
            ],
        },
        {
            teamId: 2,
            teamName: '3팀',
            members: [
                { memberId: 69, memberName: '김민준' },
                { memberId: 70, memberName: '김은비' },
                { memberId: 71, memberName: '정여민' },
                { memberId: 72, memberName: '배유열' },
                { memberId: 73, memberName: '문성현' },
                { memberId: 74, memberName: '임소현' },
            ],
        },
        {
            teamId: 3,
            teamName: '4팀',
            members: [
                { memberId: 75, memberName: '정필모' },
                { memberId: 76, memberName: '박세정' },
                { memberId: 77, memberName: '김성수' },
                { memberId: 78, memberName: '김현지' },
                { memberId: 79, memberName: '전은평' },
                { memberId: 80, memberName: '김병현' },
            ],
        },
        {
            teamId: 4,
            teamName: '5팀',
            members: [
                { memberId: 81, memberName: '김지현' },
                { memberId: 82, memberName: '남수진' },
                { memberId: 83, memberName: '정승환' },
                { memberId: 84, memberName: '하동준' },
                { memberId: 85, memberName: '김예지' },
                { memberId: 86, memberName: '정유경' },
            ],
        },
        {
            teamId: 5,
            teamName: '6팀',
            members: [
                { memberId: 87, memberName: '조승우' },
                { memberId: 88, memberName: '이상학' },
                { memberId: 89, memberName: '지인성' },
                { memberId: 90, memberName: '김현창' },
                { memberId: 91, memberName: '이민지' },
                { memberId: 92, memberName: '신시원' },
            ],
        },
        {
            teamId: 6,
            teamName: '8팀',
            members: [
                { memberId: 93, memberName: '윤길재' },
                { memberId: 94, memberName: '명소이' },
                { memberId: 95, memberName: '배정훈' },
                { memberId: 96, memberName: '한태희' },
                { memberId: 97, memberName: '김대현' },
                { memberId: 98, memberName: '이인석' },
            ],
        },
        {
            teamId: 7,
            teamName: '9팀',
            members: [
                { memberId: 99, memberName: '박현우' },
                { memberId: 100, memberName: '이효리' },
                { memberId: 101, memberName: '조은별' },
                { memberId: 102, memberName: '김종범' },
                { memberId: 103, memberName: '장승호' },
                { memberId: 104, memberName: '황인규' },
            ],
        },
        {
            teamId: 8,
            teamName: '10팀',
            members: [
                { memberId: 105, memberName: '선수연' },
                { memberId: 106, memberName: '권순준' },
                { memberId: 107, memberName: '임세환' },
                { memberId: 108, memberName: '최현기' },
                { memberId: 109, memberName: '김대원' },
                { memberId: 110, memberName: '윤예빈' },
            ],
        },
    ]);

    const selectTeamNumber = (params: SetStateAction<number>) => {
        setSelectedTeam(params);
    };

    const getMemberList = () => {
        const result = [];
        const selMembers: IMember[] = teams[selectedTeam].members;
        for (let i = 0; i < 6; i++) {
            result.push(
                <Button key={i} onClick={() => login(selMembers[i].memberId)}>
                    {selMembers[i].memberName}
                </Button>
            );
        }
        return result;
    };

    return (
        <Modal open={true} closeModal={() => {}}>
            <StyledDemoLoginContainer>
                <DemoLoginContainerHeader>팀에 맞는 사용자를 선택해주세요</DemoLoginContainerHeader>
                <LoginContentSection>
                    <Button>
                        <Link href="/login">로그인 하러가기</Link>
                    </Button>
                    <Button>
                        <Link href="/find">선생님 둘러보기</Link>
                    </Button>
                </LoginContentSection>
                <Box>
                    <TeamTypeSelect>
                        <div>팀 목록</div>
                        {teams.map((team) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <Button onClick={(e) => selectTeamNumber(team.teamId)}>
                                    {team.teamName}
                                </Button>
                            );
                        })}
                    </TeamTypeSelect>
                    <div className="v-line" />
                    <MemberTypeSelect>
                        <div>사용자 목록</div>
                        <MemberList>{getMemberList()}</MemberList>
                    </MemberTypeSelect>
                </Box>
            </StyledDemoLoginContainer>
        </Modal>
    );
};

const Box = styled.div`
    display: flex;
`;

const StyledDemoLoginContainer = styled.div`
    background-color: white;
    width: 1000px;
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1em;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
    gap: 1em;
    padding: 30px 0 0 0;
`;

const DemoLoginContainerHeader = styled.div`
    font-size: 35px;
`;

const LoginContentSection = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 15px;
`;

const Button = styled.button`
    padding: 0.8em;
    font-weight: bold;
    border-radius: 0.4em;
    border: solid 1px;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
        color: ${({ theme }) => theme.WHITE};
    }
`;

const TeamTypeSelect = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: bold;
    flex-basis: 25%;
    padding: 2em;
    white-space: nowrap;
`;

const MemberTypeSelect = styled.div`
    font-weight: bold;
    flex-basis: 25%;
    padding: 2em;
    white-space: nowrap;
`;

const MemberList = styled.div`
    display: flex;
    flex-direction: column;
`;

export default DemoLoginContainer;
