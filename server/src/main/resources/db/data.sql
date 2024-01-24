-- Member 테이블 더미 데이터
INSERT INTO member (id, name, oauth_id, phone, profile_url, role, status) VALUES (1, '김영희', 'oauth1', '010-1234-5678', 'http://profile.url/member1', 'TEACHER', 'ACTIVATED');
INSERT INTO member (id, name, oauth_id, phone, profile_url, role, status) VALUES (2, '이철수', 'oauth2', '010-8765-4321', 'http://profile.url/member2', 'STUDENT', 'ACTIVATED');
INSERT INTO member (id, name, oauth_id, phone, profile_url, role, status) VALUES (3, '박지영', 'oauth3', '010-5555-5555', 'http://profile.url/member3', 'STUDENT', 'ACTIVATED');
INSERT INTO member (id, name, oauth_id, phone, profile_url, role, status) VALUES (4, '정태우', 'oauth4', '010-7777-7777', 'http://profile.url/member4', 'TEACHER', 'ACTIVATED');
INSERT INTO member (id, name, oauth_id, phone, profile_url, role, status) VALUES (5, '송미영', 'oauth5', '010-9999-9999', 'http://profile.url/member5', 'STUDENT', 'ACTIVATED');

-- Teacher 테이블 더미 데이터
INSERT INTO teacher (id, created_at, updated_at, career, college, college_email, gender, introduce, major, profile_status, salary, member_id)
VALUES (1, '2023-01-05 10:00:00', '2023-01-05 10:00:00', 5, '서울대학교', 'teacher1@koreauniv.com', 'MALE', '경력 있는 선생님', '과학', true, 50000, 1);
INSERT INTO teacher (id, created_at, updated_at, career, college, college_email, gender, introduce, major, profile_status, salary, member_id)
VALUES (4, '2023-01-05 10:00:00', '2023-01-05 10:00:00', 10, '연세대학교', 'teacher4@koreauniv.com', 'FEMALE', '경력 있는 선생님', '수학', true, 60000, 4);


-- Subject 테이블 더미 데이터
INSERT INTO subject (id, name) VALUES (1, '수학');
INSERT INTO subject (id, name) VALUES (2, '과학');
INSERT INTO subject (id, name) VALUES (3, '영어');
INSERT INTO subject (id, name) VALUES (4, '역사');
INSERT INTO subject (id, name) VALUES (5, '미술');
INSERT INTO subject (id, name) VALUES (6, '체육');
INSERT INTO subject (id, name) VALUES (7, '음악');
INSERT INTO subject (id, name) VALUES (8, '국어');

-- TeacherSubject 테이블 더미 데이터
INSERT INTO teacher_subject (subject_id, teacher_id) VALUES (1, 1); -- 김영희 선생님이 수학을 가르칩니다.
INSERT INTO teacher_subject (subject_id, teacher_id) VALUES (2, 1); -- 김영희 선생님과 과학을 가르칩니다.
INSERT INTO teacher_subject (subject_id, teacher_id) VALUES (2, 4); -- 정태우 선생님과 과학을 가르칩니다.

-- ChatRoom 테이블 더미 데이터
INSERT INTO chat_room(id, student_member_id, teacher_member_id, created_at, updated_at) -- 이철수 학생과 김영희 선생님의 채팅방
VALUES(1, 2, 1, '2023-01-05 09:00:00', '2023-01-05 11:30:00');
INSERT INTO chat_room(id, student_member_id, teacher_member_id, created_at, updated_at) -- 박지영 학생과 정태우 선생님의 채팅방
VALUES(2, 3, 4, '2023-01-05 10:00:00', '2023-01-06 13:30:00');
INSERT INTO chat_room(id, student_member_id, teacher_member_id, created_at, updated_at) -- 송미영 학생과 김영희 선생님의 채팅방
VALUES(3, 5, 1, '2023-01-04 10:00:00', '2023-01-08 11:15:00');
INSERT INTO chat_room(id, student_member_id, teacher_member_id, created_at, updated_at) -- 박지영 학생과 김영희 선생님의 채팅방
VALUES(4, 3, 1, '2023-01-04 10:00:00', '2023-01-08 11:15:00');
-- Tutoring 테이블 더미 데이터
-- Tutoring 세션 1
INSERT INTO tutoring (id, created_at, updated_at, hourly_rate, status, 
chat_room_id, student_member_id, subject_id, teacher_member_id) 
VALUES (1, '2023-01-05 10:00:00', '2023-01-05 11:30:00', 30000, 'COMPLETED', 1, 2, 1, 1); -- 이철수 학생과 김영희 선생님의 튜터링 세션
-- Tutoring 세션 2
INSERT INTO tutoring (id, created_at, updated_at, hourly_rate, status, 
chat_room_id, student_member_id, subject_id, teacher_member_id)
 VALUES (2, '2023-01-06 14:00:00', '2023-01-06 15:30:00', 40000, 'IN_PROGRESS', 2, 3, 2, 4); -- 박지영 학생과 정태우 선생님의 튜터링 세션
-- Tutoring 세션 3
INSERT INTO tutoring (id, created_at, updated_at, hourly_rate, status, 
chat_room_id, student_member_id, subject_id, teacher_member_id)
 VALUES (3, '2023-01-07 16:00:00', '2023-01-07 17:30:00', 30000, 'IN_PROGRESS', 3, 5, 1, 1); -- 박지영  학생과 김영희 선생님의 튜터링 세션

-- ChatMessage 테이블 더미 데이터
-- ChatMessage 1
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (1, '2023-01-05 10:05:00', '2023-01-05 10:05:00', '안녕하세요!', 1, 2); -- 이철수 학생이 김영희 선생님에게 메시지
-- ChatMessage 2
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (2, '2023-01-05 10:10:00', '2023-01-05 10:10:00', '안녕하세요! 어떻게 도와드릴까요?', 1, 1); -- 김영희 선생님이 이철수 학생에게 응답
-- ChatMessage 3
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (3, '2023-01-05 10:15:00', '2023-01-05 10:15:00', '과학 문제를 도와줄게요.', 1, 1); -- 김영희 선생님이 이철수 학생에게 메시지
-- ChatMessage 4
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (4, '2023-01-05 10:20:00', '2023-01-05 10:20:00', '알겠습니다. 문제를 보내드릴게요.', 1, 1); -- 김영희 선생님이 이철수 학생에게 메시지
-- ChatMessage 5
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (5, '2023-01-05 10:25:00', '2023-01-05 10:25:00', '감사합니다!', 1, 2); -- 이철수 학생이 김영희 선생님에게 메시지
-- ChatMessage 6
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (6, '2023-01-05 10:30:00', '2023-01-05 10:30:00', '별 말씀을요. 다른 질문이 있으면 언제든지 물어보세요!', 1, 1); -- 김영희 선생님이 이철수 학생에게 메시지
-- ChatMessage 7
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (7, '2023-01-05 10:35:00', '2023-01-05 10:35:00', '안녕하세요!', 2, 3); -- 박지영 학생이 정태우 선생님에게 메시지
-- ChatMessage 8
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (8, '2023-01-05 10:40:00', '2023-01-05 10:40:00', '안녕하세요! 어떻게 도와드릴까요?', 2, 4); -- 정태우 선생님이 박지영 학생에게 응답
-- ChatMessage 9
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (9, '2023-01-05 10:45:00', '2023-01-05 10:45:00', '수학 문제를 도와줄게요.', 2, 4); -- 정태우 선생님이 박지영 학생에게 메시지
-- ChatMessage 10
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (10, '2023-01-05 10:50:00', '2023-01-05 10:50:00', '알겠습니다. 문제를 보내드릴게요.', 2, 4); -- 정태우 선생님이 박지영 학생에게 메시지
-- ChatMessage 11
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (11, '2023-01-05 10:55:00', '2023-01-05 10:55:00', '감사합니다!', 2, 3); -- 박지영 학생이 정태우 선생님에게 메시지
-- ChatMessage 12
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (12, '2023-01-05 11:00:00', '2023-01-05 11:00:00', '별 말씀을요. 다른 질문이 있으면 언제든지 물어보세요!', 2, 4); -- 정태우 선생님이 박지영 학생에게 메시지
-- ChatMessage 13
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (13, '2023-01-05 11:05:00', '2023-01-05 11:05:00', '안녕하세요!', 3, 5); -- 송미영 학생이 김영희 선생님에게 메시지
-- ChatMessage 14
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (14, '2023-01-05 11:10:00', '2023-01-05 11:10:00', '안녕하세요! 어떻게 도와드릴까요?', 3, 1); -- 김영희 선생님이 송미영 학생에게 응답
-- ChatMessage 15
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (15, '2023-01-05 11:15:00', '2023-01-05 11:15:00', '과학 문제를 도와줄게요.', 3, 1); -- 김영희 선생님이 송미영 학생에게 메시지
-- ChatMessage 16
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (16, '2023-01-05 11:20:00', '2023-01-05 11:20:00', '알겠습니다. 문제를 보내드릴게요.', 3, 1); -- 김영희 선생님이 송미영 학생에게 메시지
-- ChatMessage 17
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (17, '2023-01-05 11:25:00', '2023-01-05 11:25:00', '감사합니다!', 3, 5); -- 송미영 학생이 김영희 선생님에게 메시지
-- ChatMessage 18
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (18, '2023-01-05 11:30:00', '2023-01-05 11:30:00', '별 말씀을요. 다른 질문이 있으면 언제든지 물어보세요!', 3, 1); -- 김영희 선생님이 송미영 학생에게 메시지
-- ChatMessage 19
INSERT INTO chat_message (id, created_at, updated_at, message_content, chat_room_id, member_id) VALUES (19, '2023-01-05 11:35:00', '2023-01-05 11:35:00', '안녕하세요!', 4, 3); -- 박지영 학생이 김영희 선생님에게 메시지

-- Textbook 테이블 더미 데이터
INSERT INTO textbook (id, teacher_member_id, subject_id, textbook_name, textbook_url, first_page_cover, total_page, cover_img, is_deleted, created_at, updated_at)
VALUES
  (1, 1, 3, '영어단어장', 'https://hjr-bucket.s3.ap-northeast-2.amazonaws.com/%EC%98%81%EC%96%B4_%EB%8B%A8%EC%96%B4%EC%9E%A5.pdf', true, 40, 'https://hjr-bucket.s3.ap-northeast-2.amazonaws.com/testtest_cover.png', false, '2023-01-15 10:00:00', '2023-01-15 10:00:00'),
  (2, 1, 8, '국어문제지', 'https://hjr-bucket.s3.ap-northeast-2.amazonaws.com/%EA%B5%AD%EC%96%B4%EC%98%81%EC%97%AD_%EB%AC%B8%EC%A0%9C%EC%A7%80.pdf', true, 20, 'https://hjr-bucket.s3.ap-northeast-2.amazonaws.com/hjrimage.jpg', false, '2023-01-16 10:00:00', '2023-01-16 10:00:00');

-- Assignment 테이블 더미 데이터
INSERT INTO assignment (id, tutoring_id, textbook_id)
VALUES
  (1, 1, 1),
  (2, 2, 2);

-- Homework 테이블 더미 데이터
INSERT INTO homework (id, textbook_id, tutoring_id, deadline, start_page, end_page, status, is_deleted, created_at, updated_at)
VALUES
  (1, 1, 1, '2023-12-31', 10, 20, 'UNCONFIRMED', false, '2023-01-05 10:00:00', '2023-01-05 10:00:00'),
  (2, 2, 1, '2023-12-31', 30, 40, 'IN_PROGRESS', false, '2023-01-06 10:00:00', '2023-01-06 10:00:00'),
  (3, 1, 2, '2023-11-30', 50, 60, 'COMPLETED', false, '2023-01-07 10:00:00', '2023-01-07 10:00:00');

-- ChatRoomState 테이블 더미 데이터
INSERT INTO chat_room_state (id, is_deleted, last_read_message_id, chat_room_id, member_id)
VALUES
  (1, 0, 1, 1, 2), -- 이철수 학생과 김영희 선생님의 채팅방 상태
  (2, 0, 1, 2, 3), -- 박지영 학생과 정태우 선생님의 채팅방 상태
  (3, 0, 1, 3, 5), -- 송미영 학생과 김영희 선생님의 채팅방 상태
  (4, 0, 1, 4, 3); -- 박지영 학생과 김영희 선생님의 또 다른 채팅방 상태

-- TutoringSchedule 테이블 더미 데이터
INSERT INTO tutoring_schedule(id, tutoring_id, schedule_date, start_time, duration, title, created_at, updated_at)
VALUES (1, 1, '2024-01-10', '18:00:00',2, '수열의 극한 1 - 수열의 수렴과 발산', '2024-01-08 12:34:56', '2024-01-08 12:34:56'),
       (2, 1, '2024-01-20', '17:00:00',2,'수열의 극한 2 - 급수', '2024-01-15 11:05:36', '2024-01-15 11:30:00'),
       (3, 1, '2024-02-01', '10:00:00',2,'지수함수와 로그함수의 극한', '2024-01-24 05:03:21', '2024-01-24 05:03:21');

-- Video 테이블 더미 데이터
INSERT INTO video(id, tutoring_schedule_id, video_url, start_time, end_time, created_at, updated_at)
VALUES (1, 1, 'https://haryeom-video-bucket.s3.ap-northeast-2.amazonaws.com/big-buck-bunny_trailer.webm','17:59:03', '20:00:18', '2024-01-10 17:59:03', '2024-01-10 20:00:18'),
       (2, 2, 'https://haryeom-video-bucket.s3.ap-northeast-2.amazonaws.com/file_example_WEBM_1920_3_7MB.webm','17:05:04','19:03:21', '2024-01-20 17:05:04', '2024-01-20 19:03:21');

-- VideoTimestamp 테이블 더미 데이터
INSERT INTO video_timestamp(id, video_id, stamp_time, content)
VALUES (1, 1, TIME '00:04:03','수열의수렴 개념설명'),
       (2,1,TIME '00:07:05','수열의발산 개념설명'),
       (3,2,TIME'00:15:31','수렴할 때 급수 계산방법'),
       (4,2,TIME'00:57:31', '오답 유형');

-- VideoRoom 테이블 더미 데이터
INSERT INTO video_room(id, tutoring_schedule_id, room_code)
VALUES (1, 1, '3a3ba96a-d32a-4891-81c4-47acd2de01fa'),(2, 2, '58e43602-17f7-45f3-aeb5-67cc296c8823');
