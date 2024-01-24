#데이터베이스 초기화
DROP DATABASE IF EXISTS haryeom;

CREATE DATABASE haryeom CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE haryeom;

#전체 테이블 생성
CREATE TABLE `member` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`role`	VARCHAR(20)	NULL	COMMENT 'GUEST, STUDENT, TEACHER',
	`status`	VARCHAR(50)	NULL	COMMENT 'ACTIVATED, DELETED',
	`oauth_id`	VARCHAR(255)	NULL	COMMENT 'OAuth 계정 ID(Not Null)',
	`profile_url`	VARCHAR(2048)	NULL	COMMENT '프로필 사진 URL',
	`name`	VARCHAR(30)	NULL	COMMENT '이름',
	`phone`	VARCHAR(20)	NULL	COMMENT '전화번호(010XXXXXXXX)',
	`created_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP,
	`updated_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP
) ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `teacher` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`member_id`	BIGINT	NOT NULL	COMMENT '멤버 테이블 FK',
	`profile_status`	TINYINT(1)	NULL	DEFAULT 0	COMMENT '공개 1, 비공개 0',
	`college`	VARCHAR(50)	NULL	COMMENT '대학교명',
	`major`	VARCHAR(50)	NULL	COMMENT '대학 전공명',
	`college_email`	VARCHAR(100)	NULL	COMMENT '대학 인증 이메일',
	`gender`	VARCHAR(10)	NULL	COMMENT 'MALE, FEMALE, NONE',
	`salary`	INT	NULL	COMMENT 'NULL OK, (단위 : 만원)',
	`career`	INT	NULL	COMMENT 'NULL OK, (단위 : 년)',
	`introduce`	VARCHAR(1500)	NULL	COMMENT '자기 소개',
	`created_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP,
	`updated_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `student` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`member_id`	BIGINT	NOT NULL	COMMENT '멤버 테이블 FK',
	`grade`	VARCHAR(30)	NULL	COMMENT '학생 학년',
	`school`	VARCHAR(50)	NULL	COMMENT '학생 학교'
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `subject` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name`	varchar(20)	NULL	COMMENT '과목명'
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `textbook` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`teacher_member_id`	BIGINT	NOT NULL,
	`subject_id`	BIGINT	NOT NULL,
	`textbook_name`	VARCHAR(20)	NULL,
	`textbook_url`	VARCHAR(2048)	NULL,
	`first_page_cover`	TINYINT(1)	NULL,
	`total_page`	INT	NULL,
	`cover_img`	VARCHAR(2048)	NULL,
	`is_deleted`	TINYINT(1)	NULL DEFAULT 0,
	`created_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP,
	`updated_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `tutoring_schedule` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT	PRIMARY KEY COMMENT '과외일정 테이블 PK',
	`tutoring_id`	BIGINT	NOT NULL	COMMENT '과외 테이블 FK',
	`schedule_date`	DATE	NULL	COMMENT '과외 날짜',
	`start_time`	TIME	NULL	COMMENT '과외 시작 시간',
	`duration`	INT	NULL	COMMENT '과외 진행 시간(단위: 분)',
	`title`	VARCHAR(64)	NULL	COMMENT '커리큘럼명',
	`updated_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP,
	`created_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `video` (
	`id`	BIGINT	NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`tutoring_schedule_id`	BIGINT	NOT NULL,
	`video_url`	VARCHAR(2048)	NULL,
	`start_time`	TIME	NULL,
	`end_time`	TIME	NULL,
	`created_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP,
	`updated_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `video_room` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`tutoring_schedule_id`	BIGINT	NOT NULL	COMMENT '과외일정 테이블 FK',
	`room_code`	VARCHAR(100)	NULL	COMMENT '화상과외방 입장 코드',
	`created_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP,
	`updated_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `video_timestamp` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`video_id`	BIGINT	NOT NULL,
	`stamp_time`	TIME	NULL,
	`content`	VARCHAR(100)	NULL
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `homework` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`textbook_id`	BIGINT	NOT NULL,
	`tutoring_id`	BIGINT	NOT NULL,
	`deadline`	DATE	NULL,
	`start_page`	INT	NULL,
	`end_page`	INT	NULL,
	`status`	VARCHAR(20)	NULL	DEFAULT 'UNCONFIRMED'	COMMENT 'UNCONFIRMED, IN_PROGRESS, COMPLETED',
	`created_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP,
	`updated_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP,
	`is_deleted`	TINYINT(1)	NULL DEFAULT 0
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `drawing` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`homework_id`	BIGINT	NOT NULL,
	`page`	INT	NULL,
	`homework_drawing_url`	VARCHAR(2048)	NULL,
	`review_drawing_url`	VARCHAR(2048)	NULL,
	`teacher_drawing_url`	VARCHAR(2048)	NULL
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `chat_room` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`student_member_id`	BIGINT	NOT NULL,
	`teacher_member_id`	BIGINT	NOT NULL,
	`is_deleted`	TINYINT(1)	NULL DEFAULT 0,
	`created_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP,
	`updated_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `chat_message` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`chat_room_id`	BIGINT	NOT NULL,
	`member_id`	BIGINT	NOT NULL,
	`message_content`	VARCHAR(255)	NULL,
	`created_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP,
	`updated_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `chat_room_state` (
	id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	is_deleted TINYINT(1) DEFAULT 0,
	last_read_message_id BIGINT,
	chat_room_id BIGINT,
	member_id BIGINT
) engine=InnoDB, charset=utf8mb4;

CREATE TABLE `assignment` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`tutoring_id`	BIGINT	NOT NULL,
	`textbook_id`	BIGINT	NOT NULL
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `tutoring` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`chat_room_id`	BIGINT	NOT NULL,
	`subject_id`	BIGINT	NULL,
	`hourly_rate`	INT	NULL,
	`status`	VARCHAR(20)	NULL	DEFAULT 'IN_PROGRESS'	COMMENT 'IN_PROGRESS, CLOSED',
	`student_member_id`	BIGINT	NOT NULL,
	`teacher_member_id`	BIGINT	NOT NULL,
	`created_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP,
	`updated_at`	DATETIME	NULL	DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP
)ENGINE=InnoDB, charset=utf8mb4;

CREATE TABLE `teacher_subject` (
	`id`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`subject_id`	BIGINT	NOT NULL,
	`teacher_id`	BIGINT	NOT NULL
)ENGINE=InnoDB, charset=utf8mb4;

-- FK 값 입력
    alter table assignment 
       add constraint `FK_textbook_id_in_assignment`
       foreign key (textbook_id) 
       references textbook (id),
       add constraint `FK_tutoring_id_in_assignment`
       foreign key (tutoring_id) 
       references tutoring (id);
     
    alter table chat_message 
       add constraint `FK_chat_room_id_in_chat_message`
       foreign key (chat_room_id) 
       references chat_room (id),
       add constraint `FK_member_id_in_chat_message`
       foreign key (member_id) 
       references member (id);
    
    alter table chat_room 
       add constraint `FK_student_member_id_in_chat_room`
       foreign key (student_member_id) 
       references member (id),
       add constraint `FK_teacher_member_id_in_chat_room`
       foreign key (teacher_member_id) 
       references member (id);
    
    alter table chat_room_state 
       add constraint `FK_chat_room_id_in_chat_room_state`
       foreign key (chat_room_id) 
       references chat_room (id),
       add constraint `FK_member_id_in_chat_room_state`
       foreign key (member_id) 
       references member (id);
    
    alter table drawing 
       add constraint `FK_homework_id_in_drawing`
       foreign key (homework_id) 
       references homework (id);
    
    alter table homework 
       add constraint `FK_textbook_id_in_homework`
       foreign key (textbook_id) 
       references textbook (id),
       add constraint `FK_tutoring_id_in_homework`
       foreign key (tutoring_id) 
       references tutoring (id);
    
    alter table student 
       add constraint `FK_member_id_in_homework`
       foreign key (member_id) 
       references member (id);
    
    alter table teacher 
       add constraint `FK_member_id_in_teacher`
       foreign key (member_id) 
       references member (id);
    
    alter table teacher_subject 
       add constraint `FK_subject_id_in_teacher_subject`
       foreign key (subject_id) 
       references subject (id), 
       add constraint `FK_teacher_id_in_teacher_subject`
       foreign key (teacher_id) 
       references teacher (id);
    
    alter table textbook 
       add constraint `FK_teacher_member_id_in_textbook`
       foreign key (teacher_member_id) 
       references member (id);
    
    alter table tutoring 
       add constraint `FK_chat_room_id_in_tutoring`
       foreign key (chat_room_id) 
       references chat_room (id),
       add constraint `FK_student_member_id_in_tutoring`
       foreign key (student_member_id) 
       references member (id),
       add constraint `FK_subject_id_in_tutoring`
       foreign key (subject_id) 
       references subject (id),
       add constraint `FK_teacher_member_id_in_tutoring`
       foreign key (teacher_member_id) 
       references member (id);
    
    alter table tutoring_schedule 
       add constraint `FK_tutoring_id_in_tutoring_schedule`
       foreign key (tutoring_id) 
       references tutoring (id);
    
    alter table video 
       add constraint `FK_tutoring_schedule_id_in_video`
       foreign key (tutoring_schedule_id) 
       references tutoring_schedule (id);

    alter table video_room 
       add constraint `FK_tutoring_schedule_id_in_video_room`
       foreign key (tutoring_schedule_id) 
       references tutoring_schedule (id);

    alter table video_timestamp 
       add constraint `FK_video_id_in_timestamp`
       foreign key (video_id) 
       references video (id);
