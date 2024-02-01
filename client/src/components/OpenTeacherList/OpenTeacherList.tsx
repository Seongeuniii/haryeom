import styled from 'styled-components';
import OpenTeacherCard from './OpenTeacherCard';
import Modal from '@/components/commons/Modal';
import { useModal } from '@/hooks/useModal';
import OpenTeacherIntroduce from '@/components/OpenTeacherIntroduce';
import { IOpenTeacher } from '@/apis/matching/matching';
import { useEffect, useState } from 'react';
import { useGetOpenTeacherDetail } from '@/queries/useGetOpenTeacherDetail';
import { useRecoilState } from 'recoil';
import chatSessionAtom from '@/recoil/atoms/chat';
import { createChatRoom } from '@/apis/matching/create-chat-room';

interface OpenTeacherListProps {
    openTeacherList: IOpenTeacher[];
}

const OpenTeacherList = ({ openTeacherList }: OpenTeacherListProps) => {
    const [chatSession, setChatSession] = useRecoilState(chatSessionAtom);
    const { open, openModal, closeModal } = useModal();
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
    const { data: openTeacherDetail } = useGetOpenTeacherDetail(selectedTeacherId);

    /**
     * TODO : chatSession 시작하는 custom hook 만들기 - ChatContainer에도 똑같은 코드 있음.
     */
    const openChatContainer = () => {
        setChatSession((prev) => {
            return { ...prev, openChat: true };
        });
    };

    const joinChatRoom = (roomId: number) => {
        setChatSession((prev) => {
            return { ...prev, chatRoomId: roomId };
        });
    };

    const startChat = async () => {
        const chatRoomId = await createChatRoom(selectedTeacherId as number);
        if (!chatRoomId) return;
        openChatContainer();
        joinChatRoom(chatRoomId);
    };

    return (
        <>
            <Modal open={open} closeModal={closeModal}>
                <OpenTeacherIntroduce openTeacherDetail={openTeacherDetail} startChat={startChat} />
            </Modal>
            <StyledOpenTeacherList>
                {openTeacherList ? (
                    openTeacherList.map((openTeacher, index) => {
                        return (
                            <OpenTeacherCard
                                openTeacher={openTeacher}
                                onClick={() => {
                                    openModal();
                                    setSelectedTeacherId(openTeacher.teacherId);
                                }}
                                key={`open_teacher_${index}`}
                            />
                        );
                    })
                ) : (
                    <>매칭 가능한 선생님이 없어요:)</>
                )}
            </StyledOpenTeacherList>
        </>
    );
};

const StyledOpenTeacherList = styled.div`
    width: 100%;
    padding: 1.2em 1em 3em 1em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14em, 1fr));
    gap: 2.2em;
    overflow: scroll;
`;

export default OpenTeacherList;
