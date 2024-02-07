/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeLayout from '@/components/layouts/HomeLayout';
import axios from 'axios';
import Modal from '@/components/commons/Modal';
import { useModal } from '@/hooks/useModal';
import InputForm from '../components/commons/InputForm';
import { ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import { ISubject } from '@/apis/tutoring/tutoring';
import router from 'next/router';

interface Textbook {
    textbookId: number;
    textbookName: string;
    firstPageCover: boolean;
    members: Member[];
}
interface Member {
    studentMemberId: number;
    profileUrl: string;
    name: string;
}

interface INewTextbook {
    subjectId: number;
    textbookName: string;
    firstPageCover: boolean;
}

const textbooks: Textbook[] = [];

const MyContents = () => {
    const userSession = useRecoilValue(userSessionAtom);
    const [textbooks, setTextbooks] = useState<Textbook[]>([]);
    const [selectedTextbookIds, setSelectedTextbookIds] = useState<number[]>([]);
    const [currentTextbookId, setCurrentTextbookId] = useState<number | null>(null);
    const [currentStudents, setCurrentStudents] = useState<Member[]>([]);
    // 아래것은 OpenAssignStudent에서 사용하지만 배열 비우기를 위해 props하려고 여기선언
    const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
    const [deselectedStudentIds, SetDeselectedStudentIds] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const memberId: any = userSession?.memberId;
            const textbookData = await fetchTextbook(memberId);
            setTextbooks(textbookData);
        };

        fetchData();
    }, []); // 최초 렌더링 시에만 실행

    // 선생님 학습자료 조회
    const fetchTextbook = async (memberId: number) => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER}/textbook/teachers/${memberId}`,
                {
                    withCredentials: true,
                }
            );
            return res.data;
        } catch (e) {
            console.log(e);
            return [];
        }
    };

    const {
        open: openAddTextbookModal,
        openModal: openAddTextbook,
        closeModal: closeAddTextbook,
    } = useModal();

    const {
        open: openAssignStudentModal,
        openModal: openAssignStudent,
        closeModal: closeAssignStudent,
    } = useModal();

    const handleCheckboxChange = (textbookId: number, isChecked: boolean) => {
        if (isChecked) {
            setSelectedTextbookIds((prev) => [...prev, textbookId]);
        } else {
            setSelectedTextbookIds((prev) => prev.filter((id) => id !== textbookId));
        }
    };

    const openAssignStudentWithInfo = (textbookId: number, students: Member[]) => {
        setCurrentTextbookId(textbookId);
        setCurrentStudents(students);
        openAssignStudent();
    };

    const deleteTextbook = async () => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_SERVER}/textbook`, {
                params: {
                    textbookIds: selectedTextbookIds,
                },
                paramsSerializer: (paramObj) => {
                    const params = new URLSearchParams();
                    for (const key in paramObj) {
                        params.append(key, paramObj[key]);
                    }
                    return params.toString();
                },
                withCredentials: true,
            });
            return router.reload();
        } catch (e) {
            console.log(e);
        }
    };

    // 선택 학생 배열 초기화
    const clearSelectedStudents = () => {
        setSelectedStudentIds([]);
        SetDeselectedStudentIds([]);
    };
    const closeAssignStudentwithClean = () => {
        closeAssignStudent();
        clearSelectedStudents();
    };

    return (
        <HomeLayout>
            <StyledMyContents>
                <Modal open={openAddTextbookModal} closeModal={closeAddTextbook}>
                    <OpenTextbookLoad />
                </Modal>
                <MyContentsHeader>
                    <div className="title">학습자료 목록</div>
                    <div className="contents-btn">
                        <button onClick={() => openAddTextbook()}>학습자료 추가</button>
                        <button onClick={deleteTextbook}>선택 삭제</button>
                    </div>
                </MyContentsHeader>
                <MyContentsListHeader>
                    <div>학습자료명</div>
                    <div>표지 등록 여부</div>
                    <div>등록된 학생</div>
                </MyContentsListHeader>
                <Modal open={openAssignStudentModal} closeModal={closeAssignStudentwithClean}>
                    {currentTextbookId !== null && (
                        <OpenAssignStudent
                            textbookId={currentTextbookId}
                            assignedStudents={currentStudents}
                            selectedStudentIds={selectedStudentIds}
                            setSelectedStudentIds={setSelectedStudentIds}
                            deselectedStudentIds={deselectedStudentIds}
                            setDeselectedStudentIds={SetDeselectedStudentIds}
                        />
                    )}
                </Modal>
                <MyContentList>
                    {textbooks.map((textbook: any) => (
                        <div className="textbookList" key={textbook.textbookId}>
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    handleCheckboxChange(textbook.textbookId, e.target.checked)
                                }
                                checked={selectedTextbookIds.includes(textbook.textbookId)}
                            />
                            <div
                                className="textbookNameContainer"
                                onClick={() => console.log('학습자료 보기 ' + textbook.textbookId)}
                            >
                                {textbook.textbookName}
                            </div>
                            <div className="textbookisCoverContainer">
                                {textbook.firstPageCover ? 'O' : 'X'}
                            </div>
                            <div className="textbookmemberListContainer">
                                {textbook.students &&
                                    textbook.students.map((student: any) => (
                                        <div className="memberContainer" key={student.memberId}>
                                            <div>
                                                <img
                                                    src={student.profileUrl}
                                                    width={'40px'}
                                                    height={'40px'}
                                                />
                                            </div>
                                            <div className="memberListName">{student.name}</div>
                                        </div>
                                    ))}
                            </div>
                            <button
                                className="addStudent"
                                onClick={() =>
                                    openAssignStudentWithInfo(
                                        textbook.textbookId,
                                        textbook.students
                                    )
                                }
                            >
                                +
                            </button>
                        </div>
                    ))}
                </MyContentList>
            </StyledMyContents>
        </HomeLayout>
    );
};

// 학습자료 추가 모달
const OpenTextbookLoad = () => {
    const [textbookData, setTextbookData] = useState<INewTextbook>({
        subjectId: 0,
        textbookName: '',
        firstPageCover: true,
    });
    const [file, setFile] = useState<File | null>(null);
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const subjectData = await fetchSubjects();
            setSubjects(subjectData);
        };

        fetchData();
    }, []);

    // 선생님 과목 조회
    const fetchSubjects = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/textbook/subjects`, {
                withCredentials: true,
            });
            return res.data;
        } catch (e) {
            console.log(e);
            return [];
        }
    };

    const registTextbookForm = async () => {
        const formData = new FormData();
        formData.append(
            'request',
            new Blob([JSON.stringify(textbookData)], { type: 'application/json' })
        );
        if (file) formData.append('file', file);

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_SERVER}/textbook/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );
            console.log(res.data);
            return router.reload();
        } catch (e) {
            console.log(e);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const handleFirstPageCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTextbookData((prev) => ({
            ...prev,
            firstPageCover: e.target.checked,
        }));
    };

    const handleSubjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTextbookData((prev) => ({
            ...prev,
            subjectId: parseInt(e.target.value),
        }));
    };

    return (
        <RegistMyContent>
            <RegistMyContentHeader>학습자료 추가하기</RegistMyContentHeader>
            <label htmlFor="subjectSelect">과목 선택</label>
            <select
                className="subjectSelect"
                name="subjectId"
                id="subjectSelect"
                value={textbookData.subjectId}
                onChange={handleSubjectChange}
            >
                <option value="0" disabled>
                    과목 선택
                </option>
                {subjects.map((subject: any) => (
                    <option value={subject.subjectId} key={subject.subjectId}>
                        {subject.name}
                    </option>
                ))}
            </select>
            <RegistMyContentFile>
                <div>
                    <div className="fileUploadTitle">교재 업로드</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="fileName"
                        value={fileName}
                        readOnly
                        placeholder="첨부된 파일이 없습니다."
                    />
                </div>
                <div>
                    <label htmlFor="textbookFile" className="fileLabel">
                        <div>파일 찾기</div>
                    </label>
                    <ul>
                        <li>- 첨부파일 용량은 최대 10MB를 초과할 수 없습니다.</li>
                        <li>- 첨부 가능 파일 : pdf</li>
                    </ul>
                </div>
                <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    id="textbookFile"
                    style={{ display: 'none' }}
                />
            </RegistMyContentFile>
            <InputForm
                label={'학습 자료명'}
                name={'textbookName'}
                handleChange={(e) =>
                    setTextbookData((prev) => ({
                        ...prev,
                        textbookName: e.target.value,
                    }))
                }
            />
            <RegistMyContentCover>
                <label htmlFor="firstPageCover">첫 페이지 표지 등록 여부</label>
                <input type="checkbox" onChange={handleFirstPageCoverChange} id="firstPageCover" />
            </RegistMyContentCover>
            <button className="registBtn" onClick={registTextbookForm}>
                등록
            </button>
        </RegistMyContent>
    );
};

interface OpenAssignStudentProps {
    textbookId: number;
    assignedStudents?: Member[];
    selectedStudentIds: number[];
    setSelectedStudentIds: Dispatch<SetStateAction<number[]>>;
    deselectedStudentIds: number[];
    setDeselectedStudentIds: Dispatch<SetStateAction<number[]>>;
}

// 학생 추가하기 모달
const OpenAssignStudent = ({
    textbookId,
    assignedStudents,
    selectedStudentIds,
    setSelectedStudentIds,
    deselectedStudentIds,
    setDeselectedStudentIds,
}: OpenAssignStudentProps) => {
    const [assignableStudent, SetAssignableStudent] = useState<Member[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const subjectData = await fetchAssignableStudents();
            SetAssignableStudent(subjectData);
        };

        fetchData();
    }, [textbookId]);

    // 지정 가능 학생 리스트 조회
    const fetchAssignableStudents = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_SERVER}/textbook/${textbookId}/students`,
                {
                    withCredentials: true,
                }
            );
            return res.data;
        } catch (e) {
            console.log(e);
            return [];
        }
    };

    const handleCheckStudentChange = (studentMemberId: number) => {
        if (!selectedStudentIds.includes(studentMemberId)) {
            setSelectedStudentIds((prev) => [...prev, studentMemberId]);
        } else {
            setSelectedStudentIds((prev) => prev.filter((id) => id !== studentMemberId));
        }
    };

    const handleDeselectStudentChange = (studentMemberId: number) => {
        if (!deselectedStudentIds.includes(studentMemberId)) {
            setDeselectedStudentIds((prev) => [...prev, studentMemberId]);
        } else {
            setDeselectedStudentIds((prev) => prev.filter((id) => id !== studentMemberId));
        }
    };

    // 등록된 학생 선택하면 지정 해제, 지정 가능 학생 선택하면 지정
    const AssignStudentAndTextbook = async (textbookId: any) => {
        const requests = [];

        if (selectedStudentIds.length > 0) {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_SERVER}/textbook/${textbookId}/students`,
                {
                    studentMemberIds: selectedStudentIds,
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            requests.push(res);
        }

        if (deselectedStudentIds.length > 0) {
            const res = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_SERVER}/textbook/${textbookId}/students`,
                {
                    params: {
                        studentMemberIds: deselectedStudentIds,
                    },
                    paramsSerializer: (paramObj) => {
                        const params = new URLSearchParams();
                        for (const key in paramObj) {
                            params.append(key, paramObj[key]);
                        }
                        return params.toString();
                    },
                    withCredentials: true,
                }
            );
            requests.push(res);
        }

        try {
            const responses = await Promise.all(requests);
            router.reload();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <AssignStudent>
            <AssignStudentHeader>학생 등록하기</AssignStudentHeader>
            <div>
                <AlreadyAssignStudentHeader>등록된 학생</AlreadyAssignStudentHeader>
                <div className="memberListContainer">
                    {assignedStudents &&
                        assignedStudents.map((student: any) => (
                            <div
                                className="memberContainer"
                                key={student.memberId}
                                onClick={() => handleDeselectStudentChange(student.memberId)}
                                style={{
                                    border: deselectedStudentIds.includes(student.memberId)
                                        ? '1px solid red'
                                        : '1px solid #ddd',
                                    borderRadius: '5px',
                                }}
                            >
                                <div>
                                    <img src={student.profileUrl} width={'40px'} height={'40px'} />
                                </div>
                                <div className="memberListName">{student.name}</div>
                                <input
                                    type="checkbox"
                                    checked={deselectedStudentIds.includes(student.studentMemberId)}
                                    onChange={() => {}}
                                    style={{ visibility: 'hidden', position: 'absolute' }}
                                />
                            </div>
                        ))}
                </div>
            </div>
            <div>
                <AssignableStudentHeader>학생 추가하기</AssignableStudentHeader>
                <div className="memberListContainer">
                    {assignableStudent &&
                        assignableStudent.map((student: any) => (
                            <div
                                className="memberContainer"
                                key={student.memberId}
                                onClick={() => handleCheckStudentChange(student.memberId)}
                                style={{
                                    border: selectedStudentIds.includes(student.memberId)
                                        ? '1px solid red'
                                        : '1px solid #ddd',
                                    borderRadius: '5px',
                                }}
                            >
                                <div>
                                    <img src={student.profileUrl} width={'40px'} height={'40px'} />
                                </div>
                                <div className="memberListName">{student.name}</div>
                                <input
                                    type="checkbox"
                                    checked={selectedStudentIds.includes(student.studentMemberId)}
                                    onChange={() => {}}
                                    style={{ visibility: 'hidden', position: 'absolute' }}
                                />
                            </div>
                        ))}
                </div>
            </div>
            <button className="registBtn" onClick={() => AssignStudentAndTextbook(textbookId)}>
                확인
            </button>
        </AssignStudent>
    );
};

const StyledMyContents = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 10em;
    display: flex;
    align-items: center;
    flex-direction: column;

    /* &:hover {
        background-color: beige;
    } */
`;

const MyContentsHeader = styled.div`
    width: 40vw;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;

    .title {
        font-size: 2rem;
    }
    .contents-btn button {
        padding: 2px 10px;
        margin-left: 5px;
        font-size: 0.8rem;
        border: 1px solid rgb(0, 0, 0);
        border-radius: 10px;
    }
`;

const MyContentsListHeader = styled.div`
    margin-top: 3em;
    padding-bottom: 0.6em;
    width: 40vw;
    justify-content: space-around;
    display: flex;
    border-bottom: 2px solid rgb(198, 198, 198);

    div {
        color: rgb(140, 140, 140);
        font-weight: bold;
    }
`;

const MyContentList = styled.div`
    width: 40vw;

    .textbookList {
        display: flex;
        margin-top: 1em;
        align-items: center;
        height: 4vw;
    }

    .textbookNameContainer {
        width: 33%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .textbookisCoverContainer {
        width: 33%;
        text-align: center;
    }

    .textbookmemberListContainer {
        width: 25%;
        display: flex;
        padding-left: 1em;
        overflow-x: auto;
        white-space: nowrap;
    }

    .memberContainer {
        margin-right: 0.2em;
    }

    .textbookList img {
        border-radius: 50%;
    }

    .memberListName {
        text-align: center;
        font-size: 0.5em;
    }

    .addStudent {
        margin-left: 1em;
        border: 1px solid rgb(0, 0, 0);
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 20px;
    }
`;

// 학습자료 추가 모달
const RegistMyContent = styled.div`
    background-color: white;
    padding: 2.5em;
    border-radius: 1em;
    width: 30vw;

    .registBtn {
        width: 100%;
        padding: 0.5em;
        margin-top: 1em;
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
        color: ${({ theme }) => theme.WHITE};
        font-weight: bold;
        border-radius: 0.5em;

        &:hover {
            background-color: ${({ theme }) => theme.PRIMARY};
        }
    }
    .fileUpload {
        margin-top: 5em;
    }

    label {
        padding: 16px 12px 0px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        font-weight: 500;
    }
    .subjectSelect {
        width: 10em;
        padding: 0.3em 0.5em;
        border: 1px solid #999;
        font-family: inherit;
        border-radius: 5px;
        /* -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none; */
    }
`;

const RegistMyContentHeader = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    padding: 0.3em 0 1.2em 0;
`;

const RegistMyContentSubject = styled.div``;

const RegistMyContentFile = styled.div`
    margin-top: 1em;
    display: flex;
    flex-direction: column;

    .fileUploadTitle {
        padding: 16px 12px 0px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        font-weight: 500;
    }
    div:nth-child(2) {
        padding: 12px 12px;
    }
    .fileName {
        padding: 0.4em;
        width: 100%;
    }
    .fileLabel {
        padding: 10px 12px;
    }
    .fileLabel div {
        display: inline-block;
        padding: 0.5em;
        color: black;
        font-size: 17px;
        border: 1px solid rgb(198, 198, 198);
    }
    div:nth-child(3) {
        display: flex;
    }
    ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    li {
        margin-bottom: 0.3em;
        font-size: 10px;
    }
`;

const RegistMyContentName = styled.div``;

const RegistMyContentCover = styled.div`
    margin-top: 1em;
`;

// 학생 지정 모달
const AssignStudent = styled.div`
    background-color: white;
    padding: 2.5em;
    border-radius: 1em;
    width: 30vw;

    .registBtn {
        width: 100%;
        padding: 0.5em;
        margin-top: 1em;
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
        color: ${({ theme }) => theme.WHITE};
        font-weight: bold;
        border-radius: 0.5em;

        &:hover {
            background-color: ${({ theme }) => theme.PRIMARY};
        }
    }

    img {
        border-radius: 50%;
    }

    .memberListContainer {
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
        height: 6vw;
    }

    .memberContainer {
        margin-right: 0.2em;
    }

    .memberListName {
        text-align: center;
        font-size: 0.5em;
    }
`;

const AssignStudentHeader = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    padding: 0.3em 0 1.2em 0;
`;

const AlreadyAssignStudentHeader = styled.div`
    font-weight: bold;
    margin-bottom: 1em;
`;

const AssignableStudentHeader = styled.div`
    font-weight: bold;
    margin-bottom: 1em;
`;

export default MyContents;
