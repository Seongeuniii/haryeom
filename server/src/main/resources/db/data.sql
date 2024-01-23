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

