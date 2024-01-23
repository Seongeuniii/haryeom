-- Member 테이블 더미 데이터
INSERT INTO member (name, oauth_id, phone, profile_url, role, status) VALUES ('Member1', 'oauth1', '010-1234-5678', 'http://profile.url/member1', 'TEACHER', 'ACTIVATED');
INSERT INTO member (name, oauth_id, phone, profile_url, role, status) VALUES ('Member2', 'oauth2', '010-8765-4321', 'http://profile.url/member2', 'STUDENT', 'ACTIVATED');

-- Teacher 테이블 더미 데이터
INSERT INTO teacher (created_at, updated_at, career, college, college_email, gender, introduce, major, profile_status, salary, member_id) VALUES ('2023-01-01', '2023-01-01', 5, 'College1', 'teacher1@college.com', 'MALE', 'Experienced teacher', 'Science', true, 50000, 1);

-- Subject 테이블 더미 데이터
INSERT INTO subject (name) VALUES ('Mathematics');
INSERT INTO subject (name) VALUES ('Science');

-- TeacherSubject 테이블 더미 데이터
INSERT INTO teacher_subject (subject_id, teacher_id) VALUES (1, 1);
INSERT INTO teacher_subject (subject_id, teacher_id) VALUES (2, 1);

-- ChatRoom 테이블 더미 데이터
INSERT INTO chat_room (created_at, updated_at, student_member_id, teacher_member_id) VALUES ('2023-01-01', '2023-01-01', 2, 1);

-- Tutoring 테이블 더미 데이터
INSERT INTO tutoring (created_at, updated_at, hourly_rate, status, chat_room_id, student_member_id, subject_id, teacher_member_id) VALUES ('2023-01-01', '2023-01-01', 40, 'IN_PROGRESS', 1, 2, 1, 1);

-- ChatMessage 테이블 더미 데이터
INSERT INTO chat_message (created_at, updated_at, message_content, chat_room_id, member_id) VALUES ('2023-01-01', '2023-01-01', 'Hello!', 1, 2);

-- Textbook 테이블 더미 데이터
INSERT INTO textbook (created_at, updated_at, cover_img, is_deleted, is_first_page_cover, textbook_name, textbookurl, total_page, teacher_member_id) VALUES ('2023-01-01', '2023-01-01', 'http://cover.url/textbook1', false, true, 'Textbook1', 'http://textbook.url/textbook1', 100, 1);

-- Homework 테이블 더미 데이터
INSERT INTO homework (created_at, updated_at, deadline, end_page, is_deleted, start_page, status, textbook_id, tutoring_id) VALUES ('2023-01-01', '2023-01-01', '2023-03-01', 50, 0, 1, 'UNCONFIRMED', 1, 1);

-- Assignment 테이블 더미 데이터
INSERT INTO assignment (textbook_id, tutoring_id) VALUES (1, 1);

-- Student 테이블 더미 데이터
INSERT INTO student (grade, school, member_id) VALUES ('11th', 'High School 1', 2);

-- ChatRoomState 테이블 더미 데이터
INSERT INTO chat_room_state (is_deleted, last_read_message_id, unread_message_count, chat_room_id, member_id) VALUES (0, 1, 0, 1, 2);

-- Drawing 테이블 더미 데이터
INSERT INTO drawing (homework_drawingurl, page, review_drawingurl, teacher_drawingurl, homework_id) VALUES ('http://drawing.url/homework1', 1, 'http://drawing.url/review1', 'http://drawing.url/teacher1', 1);

-- TutoringSchedule 테이블 더미 데이터
INSERT INTO tutoring_schedule (created_at, updated_at, duration, schedule_date, start_time, title, tutoring_id) VALUES ('2023-01-01', '2023-01-01', 60, '2023-03-01', '14:00:00', 'Tutoring Session 1', 1);

-- Video 테이블 더미 데이터
INSERT INTO video (created_at, updated_at, end_time, start_time, videourl, tutoring_schedule_id) VALUES ('2023-01-01', '2023-01-01', '15:00:00', '14:00:00', 'http://video.url/video1', 1);

-- VideoRoom 테이블 더미 데이터
INSERT INTO video_room (created_at, updated_at, room_code, tutoring_schedule_id) VALUES ('2023-01-01', '2023-01-01', 'ROOM1234', 1);

-- VideoTimestamp 테이블 더미 데이터
INSERT INTO video_timestamp (content, stamp_time, video_id) VALUES ('Important Point', '14:15:00', 1);

-- Homework
INSERT INTO homework (id, textbook_id, tutoring_id, deadline, start_page, end_page, status,
                      is_deleted, created_at, updated_at)
VALUES (1, 1, 1, '2023-12-31', 10, 20, 'UNCONFIRMED', false, '2023-01-05 10:00:00',
        '2023-01-05 10:00:00'),
       (2, 2, 1, '2023-12-31', 30, 40, 'IN_PROGRESS', false, '2023-01-06 10:00:00',
        '2023-01-06 10:00:00'),
       (3, 1, 2, '2023-11-30', 50, 60, 'COMPLETED', false, '2023-01-07 10:00:00',
        '2023-01-07 10:00:00');

-- TutoringSchedule
INSERT INTO tutoring_schedule(id, tutoring_id, schedule_date, start_time, duration, title, created_at, updated_at)
VALUES (1, 1, DATE '2024-01-22', TIME '18:00:00',2, '수열의 극한', DATEADD('SECOND', 10, CURRENT_TIMESTAMP()), DATEADD('SECOND', 20, CURRENT_TIMESTAMP())),
       (2, 1, DATE '2024-01-26', TIME '17:00:00',2,'손흥민 축구교실',DATEADD('SECOND', 10, CURRENT_TIMESTAMP()), DATEADD('SECOND', 20, CURRENT_TIMESTAMP()));

-- Video
INSERT INTO video(id, tutoring_schedule_id, video_url, start_time, end_time, created_at, updated_at)
VALUES (1, 1, 'dummy-url1/limitofsequence','17:59:03', '20:00:18', NOW(), NOW()),
       (2, 2, 'dummy-url2/sonnyfootballclass','17:05:04','19:03:21', DATEADD('SECOND', 20, CURRENT_TIMESTAMP()),
        DATEADD('SECOND', 10, CURRENT_TIMESTAMP()));

-- VideoTimestamp
INSERT INTO video_timestamp(id, video_id, stamp_time, content)
VALUES (1, 1, TIME '00:04:03','수열의극한 개념설명'),
       (2,1,TIME '00:07:05','수열의극한 문제풀이'),
       (3,2,TIME'00:15:31','모든 것은 기초부터'),
       (4,2,TIME'00:57:31', '토트넘 우승썰 풀어주기');

-- VideoRoom
INSERT INTO video_room(id, tutoring_schedule_id, room_code)
VALUES (1, 1, '3a3ba96a-d32a-4891-81c4-47acd2de01fa'),(2, 2, '58e43602-17f7-45f3-aeb5-67cc296c8823');