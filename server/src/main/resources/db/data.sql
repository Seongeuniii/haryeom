-- Subjects
INSERT INTO subject (id, name)
VALUES (1, 'Mathematics');
INSERT INTO subject (id, name)
VALUES (2, 'Physics');
INSERT INTO subject (id, name)
VALUES (3, 'Chemistry');

-- Members
INSERT INTO member (id, role, status, oauth_id, profile_url, name, phone)
VALUES (1, 'TEACHER', 'ACTIVATED', 'oauth1', 'http://profile.url/1', 'John Doe', '123-456-7890'),
       (2, 'TEACHER', 'ACTIVATED', 'oauth2', 'http://profile.url/2', 'Jane Smith', '234-567-8901');

-- Teachers
INSERT INTO teacher (id, member_id, profile_status, college, major, college_email, gender, salary,
                     career, introduce)
VALUES (1, 1, true, 'University A', 'Mathematics', 'john@univ.com', 'MALE', 50000, 5,
        'Experienced Math Teacher'),
       (2, 2, true, 'University B', 'Physics', 'jane@univ.com', 'FEMALE', 55000, 6,
        'Dedicated Physics Teacher');

-- Teacher Subjects
INSERT INTO teacher_subject (id, teacher_id, subject_id)
VALUES (1, 1, 1),
       (2, 1, 2),
       (3, 2, 2),
       (4, 2, 3);

-- Tutoring
INSERT INTO tutoring (id, chat_room_id, subject_id, hourly_rate, status, student_member_id,
                      teacher_member_id, created_at, updated_at)
VALUES (1, 1, 101, 50, 'IN_PROGRESS', 2, 1, '2023-01-01 10:00:00', '2023-01-01 10:00:00'),
       (2, 2, 102, 60, 'CLOSED', 3, 1, '2023-01-02 10:00:00', '2023-01-02 10:00:00');

-- Textbooks
INSERT INTO textbook (id, teacher_member_id, textbook_name, textbook_url, is_first_page_cover,
                      total_page, cover_img, is_deleted, created_at, updated_at)
VALUES (1, 1, 'Textbook 1', 'http://textbook1.url', true, 120, 'http://coverimg1.url', false,
        '2023-01-03 10:00:00', '2023-01-03 10:00:00'),
       (2, 1, 'Textbook 2', 'http://textbook2.url', false, 200, 'http://coverimg2.url', false,
        '2023-01-04 10:00:00', '2023-01-04 10:00:00');

-- Homework
INSERT INTO homework (id, textbook_id, tutoring_id, deadline, start_page, end_page, status,
                      is_deleted, created_at, updated_at)
VALUES (1, 1, 1, '2023-12-31', 10, 20, 'UNCONFIRMED', false, '2023-01-05 10:00:00',
        '2023-01-05 10:00:00'),
       (2, 2, 1, '2023-12-31', 30, 40, 'IN_PROGRESS', false, '2023-01-06 10:00:00',
        '2023-01-06 10:00:00'),
       (3, 1, 2, '2023-11-30', 50, 60, 'COMPLETED', false, '2023-01-07 10:00:00',
        '2023-01-07 10:00:00');

-- ChatRoom 데이터 생성
INSERT INTO chat_room (id, teacher_member_id, student_member_id)
VALUES (1, 1, 2);

-- ChatMessage 데이터 생성
INSERT INTO chat_message (id, chat_room_id, member_id, content, created_at, updated_at)
VALUES
(1, 1, 1, 'Hello, how can I help you?', '2024-01-24 08:00:00', '2024-01-24 08:00:00'),
(2, 1, 2, 'Hello, I have a question.', '2024-01-24 08:05:00', '2024-01-24 08:05:00');

-- ChatRoomState 데이터 생성
INSERT INTO chat_room_state (id, chat_room_id, member_id, unread_message_count, last_read_message_id,
                             is_deleted)
VALUES (1, 1, 1, 0, 2, FALSE);
INSERT INTO chat_room_state (id, chat_room_id, member_id, unread_message_count, last_read_message_id,
                             is_deleted)
VALUES (2, 1, 2, 1, 1, FALSE);
