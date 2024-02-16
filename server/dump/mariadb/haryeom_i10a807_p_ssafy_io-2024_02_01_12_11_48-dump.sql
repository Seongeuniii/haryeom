-- MariaDB dump 10.19-11.2.2-MariaDB, for Win64 (AMD64)
--
-- Host: i10a807.p.ssafy.io    Database: haryeom
-- ------------------------------------------------------
-- Server version	11.2.2-MariaDB-1:11.2.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assignment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tutoring_id` bigint(20) NOT NULL,
  `textbook_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_textbook_id_in_assignment` (`textbook_id`),
  KEY `FK_tutoring_id_in_assignment` (`tutoring_id`),
  CONSTRAINT `FK_textbook_id_in_assignment` FOREIGN KEY (`textbook_id`) REFERENCES `textbook` (`id`),
  CONSTRAINT `FK_tutoring_id_in_assignment` FOREIGN KEY (`tutoring_id`) REFERENCES `tutoring` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
INSERT INTO `assignment` (`id`, `tutoring_id`, `textbook_id`) VALUES (46,17,8),
(47,17,9),
(48,17,10),
(49,18,11),
(50,18,12),
(51,18,13),
(52,19,17),
(53,19,18),
(54,19,19),
(55,20,20),
(56,20,21),
(57,20,22),
(58,21,23),
(59,21,24),
(60,21,25),
(61,22,29),
(62,22,30),
(63,22,31),
(64,23,32),
(65,23,33),
(66,23,34),
(67,24,35),
(68,24,36),
(69,24,37);
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chat_room_id` bigint(20) NOT NULL,
  `member_id` bigint(20) NOT NULL,
  `message_content` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_chat_room_id_in_chat_message` (`chat_room_id`),
  KEY `FK_member_id_in_chat_message` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
INSERT INTO `chat_message` (`id`, `chat_room_id`, `member_id`, `message_content`, `created_at`, `updated_at`) VALUES (1,1,2,'안녕하세요!','2023-01-05 10:05:00','2023-01-05 10:05:00'),
(2,1,1,'안녕하세요! 어떻게 도와드릴까요?','2023-01-05 10:10:00','2023-01-05 10:10:00'),
(3,1,1,'과학 문제를 도와줄게요.','2023-01-05 10:15:00','2023-01-05 10:15:00'),
(4,1,1,'알겠습니다. 문제를 보내드릴게요.','2023-01-05 10:20:00','2023-01-05 10:20:00'),
(5,1,2,'감사합니다!','2023-01-05 10:25:00','2023-01-05 10:25:00'),
(6,1,1,'별 말씀을요. 다른 질문이 있으면 언제든지 물어보세요!','2023-01-05 10:30:00','2023-01-05 10:30:00'),
(7,2,3,'안녕하세요!','2023-01-05 10:35:00','2023-01-05 10:35:00'),
(8,2,4,'안녕하세요! 어떻게 도와드릴까요?','2023-01-05 10:40:00','2023-01-05 10:40:00'),
(9,2,4,'수학 문제를 도와줄게요.','2023-01-05 10:45:00','2023-01-05 10:45:00'),
(10,2,4,'알겠습니다. 문제를 보내드릴게요.','2023-01-05 10:50:00','2023-01-05 10:50:00'),
(11,2,3,'감사합니다!','2023-01-05 10:55:00','2023-01-05 10:55:00'),
(12,2,4,'별 말씀을요. 다른 질문이 있으면 언제든지 물어보세요!','2023-01-05 11:00:00','2023-01-05 11:00:00'),
(13,3,5,'안녕하세요!','2023-01-05 11:05:00','2023-01-05 11:05:00'),
(14,3,1,'안녕하세요! 어떻게 도와드릴까요?','2023-01-05 11:10:00','2023-01-05 11:10:00'),
(15,3,1,'과학 문제를 도와줄게요.','2023-01-05 11:15:00','2023-01-05 11:15:00'),
(16,3,1,'알겠습니다. 문제를 보내드릴게요.','2023-01-05 11:20:00','2023-01-05 11:20:00'),
(17,3,5,'감사합니다!','2023-01-05 11:25:00','2023-01-05 11:25:00'),
(18,3,1,'별 말씀을요. 다른 질문이 있으면 언제든지 물어보세요!','2023-01-05 11:30:00','2023-01-05 11:30:00'),
(19,4,3,'안녕하세요!','2023-01-05 11:35:00','2023-01-05 11:35:00'),
(20,1,2,'ㅋ',NULL,NULL),
(21,1,2,'안녕하세요',NULL,NULL),
(22,1,2,'ㅎㅎ',NULL,NULL),
(23,1,2,'메시지 보내기',NULL,NULL),
(24,1,2,'왜 하나가 아닌 여러개가 보이는 거죠',NULL,NULL),
(25,1,2,'두번',NULL,NULL),
(26,1,2,'아니 왜 두번 보이냐고 진짜',NULL,NULL),
(27,1,2,'뭔데',NULL,NULL),
(28,1,2,'짜증나!!!!!!!!!!!!!',NULL,NULL),
(29,1,2,'ㅋㅋ',NULL,NULL),
(30,1,2,'ㄷ',NULL,NULL),
(31,1,2,'ㅎ',NULL,NULL),
(32,1,2,'ㅇ',NULL,NULL),
(33,1,2,'ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ',NULL,NULL);
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `student_member_id` bigint(20) NOT NULL,
  `teacher_member_id` bigint(20) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_student_member_id_in_chat_room` (`student_member_id`),
  KEY `FK_teacher_member_id_in_chat_room` (`teacher_member_id`),
  CONSTRAINT `FK_student_member_id_in_chat_room` FOREIGN KEY (`student_member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FK_teacher_member_id_in_chat_room` FOREIGN KEY (`teacher_member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` (`id`, `student_member_id`, `teacher_member_id`, `is_deleted`, `created_at`, `updated_at`) VALUES (6,43,39,0,'2024-02-01 00:07:51','2024-02-01 00:07:51'),
(7,44,39,0,'2024-02-01 00:07:51','2024-02-01 00:07:51'),
(8,43,41,0,'2024-02-01 00:07:51','2024-02-01 00:07:51'),
(9,44,41,0,'2024-02-01 00:07:51','2024-02-01 00:07:51'),
(10,45,41,0,'2024-02-01 00:07:51','2024-02-01 00:07:51'),
(11,43,42,0,'2024-02-01 00:07:51','2024-02-01 00:07:51'),
(12,44,42,0,'2024-02-01 00:07:51','2024-02-01 00:07:51'),
(13,45,42,0,'2024-02-01 00:07:51','2024-02-01 00:07:51');
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room_state`
--

DROP TABLE IF EXISTS `chat_room_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_room_state` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chat_room_id` bigint(20) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  `last_read_message_id` varchar(24) DEFAULT 'ffffffffffffffffffffffff',
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `chat_room_id` (`chat_room_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `chat_room_state_ibfk_1` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`),
  CONSTRAINT `chat_room_state_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room_state`
--

LOCK TABLES `chat_room_state` WRITE;
/*!40000 ALTER TABLE `chat_room_state` DISABLE KEYS */;
INSERT INTO `chat_room_state` (`id`, `chat_room_id`, `member_id`, `last_read_message_id`, `is_deleted`) VALUES (1,6,39,'ffffffffffffffffffffffff',0),
(2,6,43,'ffffffffffffffffffffffff',0),
(3,7,39,'ffffffffffffffffffffffff',0),
(4,7,44,'ffffffffffffffffffffffff',0),
(5,8,41,'ffffffffffffffffffffffff',0),
(6,8,43,'ffffffffffffffffffffffff',0),
(7,9,41,'ffffffffffffffffffffffff',0),
(8,9,44,'ffffffffffffffffffffffff',0),
(9,10,41,'ffffffffffffffffffffffff',0),
(10,10,45,'ffffffffffffffffffffffff',0),
(11,11,42,'ffffffffffffffffffffffff',0),
(12,11,43,'ffffffffffffffffffffffff',0),
(13,12,42,'ffffffffffffffffffffffff',0),
(14,12,44,'ffffffffffffffffffffffff',0),
(15,13,42,'ffffffffffffffffffffffff',0),
(16,13,45,'ffffffffffffffffffffffff',0);
/*!40000 ALTER TABLE `chat_room_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drawing`
--

DROP TABLE IF EXISTS `drawing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drawing` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `homework_id` bigint(20) NOT NULL,
  `page` int(11) DEFAULT NULL,
  `homework_drawing_url` varchar(2048) DEFAULT NULL,
  `review_drawing_url` varchar(2048) DEFAULT NULL,
  `teacher_drawing_url` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_homework_id_in_drawing` (`homework_id`),
  CONSTRAINT `FK_homework_id_in_drawing` FOREIGN KEY (`homework_id`) REFERENCES `homework` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drawing`
--

LOCK TABLES `drawing` WRITE;
/*!40000 ALTER TABLE `drawing` DISABLE KEYS */;
INSERT INTO `drawing` (`id`, `homework_id`, `page`, `homework_drawing_url`, `review_drawing_url`, `teacher_drawing_url`) VALUES (1,31,10,'https://hjr-bucket.s3.ap-northeast-2.amazonaws.com/hjrimage.jpg','http://iamge.url/drawing1','http://iamge.url/drawing1'),
(2,31,11,'https://hjr-bucket.s3.ap-northeast-2.amazonaws.com/hjrimage.jpg','http://iamge.url/drawing2','http://iamge.url/drawing2'),
(3,31,12,'https://hjr-bucket.s3.ap-northeast-2.amazonaws.com/hjrimage.jpg','http://iamge.url/drawing3','http://iamge.url/drawing3'),
(4,31,13,'https://hjr-bucket.s3.ap-northeast-2.amazonaws.com/hjrimage.jpg','http://iamge.url/drawing4','http://iamge.url/drawing4'),
(5,31,14,'https://hjr-bucket.s3.ap-northeast-2.amazonaws.com/hjrimage.jpg','http://iamge.url/drawing5','http://iamge.url/drawing5'),
(6,31,15,'https://hjr-bucket.s3.ap-northeast-2.amazonaws.com/hjrimage.jpg','http://iamge.url/drawing6','http://iamge.url/drawing6');
/*!40000 ALTER TABLE `drawing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `homework`
--

DROP TABLE IF EXISTS `homework`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `homework` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `textbook_id` bigint(20) NOT NULL,
  `tutoring_id` bigint(20) NOT NULL,
  `deadline` date DEFAULT NULL,
  `start_page` int(11) DEFAULT NULL,
  `end_page` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'UNCONFIRMED' COMMENT 'UNCONFIRMED, IN_PROGRESS, COMPLETED',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_textbook_id_in_homework` (`textbook_id`),
  KEY `FK_tutoring_id_in_homework` (`tutoring_id`),
  CONSTRAINT `FK_textbook_id_in_homework` FOREIGN KEY (`textbook_id`) REFERENCES `textbook` (`id`),
  CONSTRAINT `FK_tutoring_id_in_homework` FOREIGN KEY (`tutoring_id`) REFERENCES `tutoring` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `homework`
--

LOCK TABLES `homework` WRITE;
/*!40000 ALTER TABLE `homework` DISABLE KEYS */;
INSERT INTO `homework` (`id`, `textbook_id`, `tutoring_id`, `deadline`, `start_page`, `end_page`, `status`, `created_at`, `updated_at`, `is_deleted`) VALUES (31,8,17,'2024-02-10',1,10,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(32,8,17,'2024-02-17',11,20,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(33,8,17,'2024-02-24',21,30,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(34,8,17,'2024-03-02',31,40,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(35,8,17,'2024-03-09',41,50,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(36,8,17,'2024-03-16',51,60,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(37,8,17,'2024-03-23',61,70,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(38,8,17,'2024-03-30',71,80,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(39,8,17,'2024-04-06',81,90,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(40,8,17,'2024-04-13',91,100,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(41,11,18,'2024-02-10',1,10,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(42,11,18,'2024-02-17',11,20,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(43,11,18,'2024-02-24',21,30,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(44,11,18,'2024-03-02',31,40,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(45,11,18,'2024-03-09',41,50,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(46,11,18,'2024-03-16',51,60,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(47,11,18,'2024-03-23',61,70,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(48,11,18,'2024-03-30',71,80,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(49,11,18,'2024-04-06',81,90,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(50,11,18,'2024-04-13',91,100,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(51,17,19,'2024-02-10',1,10,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(52,17,19,'2024-02-17',11,20,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(53,17,19,'2024-02-24',21,30,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(54,17,19,'2024-03-02',31,40,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(55,17,19,'2024-03-09',41,50,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(56,17,19,'2024-03-16',51,60,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(57,17,19,'2024-03-23',61,70,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(58,17,19,'2024-03-30',71,80,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(59,17,19,'2024-04-06',81,90,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(60,17,19,'2024-04-13',91,100,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(61,20,20,'2024-02-10',1,10,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(62,20,20,'2024-02-17',11,20,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(63,20,20,'2024-02-24',21,30,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(64,20,20,'2024-03-02',31,40,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(65,20,20,'2024-03-09',41,50,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(66,20,20,'2024-03-16',51,60,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(67,20,20,'2024-03-23',61,70,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(68,20,20,'2024-03-30',71,80,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(69,20,20,'2024-04-06',81,90,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(70,20,20,'2024-04-13',91,100,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(71,21,21,'2024-02-10',1,10,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(72,21,21,'2024-02-17',11,20,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(73,21,21,'2024-02-24',21,30,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(74,21,21,'2024-03-02',31,40,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(75,21,21,'2024-03-09',41,50,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(76,21,21,'2024-03-16',51,60,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(77,21,21,'2024-03-23',61,70,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(78,21,21,'2024-03-30',71,80,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(79,21,21,'2024-04-06',81,90,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(80,21,21,'2024-04-13',91,100,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(81,22,22,'2024-02-10',1,10,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(82,22,22,'2024-02-17',11,20,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(83,22,22,'2024-02-24',21,30,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(84,22,22,'2024-03-02',31,40,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(85,22,22,'2024-03-09',41,50,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(86,22,22,'2024-03-16',51,60,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(87,22,22,'2024-03-23',61,70,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(88,22,22,'2024-03-30',71,80,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(89,22,22,'2024-04-06',81,90,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(90,22,22,'2024-04-13',91,100,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(91,23,23,'2024-02-10',1,10,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(92,23,23,'2024-02-17',11,20,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(93,23,23,'2024-02-24',21,30,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(94,23,23,'2024-03-02',31,40,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(95,23,23,'2024-03-09',41,50,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(96,23,23,'2024-03-16',51,60,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(97,23,23,'2024-03-23',61,70,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(98,23,23,'2024-03-30',71,80,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(99,23,23,'2024-04-06',81,90,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(100,23,23,'2024-04-13',91,100,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(101,24,24,'2024-02-10',1,10,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(102,24,24,'2024-02-17',11,20,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(103,24,24,'2024-02-24',21,30,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(104,24,24,'2024-03-02',31,40,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(105,24,24,'2024-03-09',41,50,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(106,24,24,'2024-03-16',51,60,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(107,24,24,'2024-03-23',61,70,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(108,24,24,'2024-03-30',71,80,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(109,24,24,'2024-04-06',81,90,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(110,24,24,'2024-04-13',91,100,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0);
/*!40000 ALTER TABLE `homework` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role` varchar(20) DEFAULT NULL COMMENT 'GUEST, STUDENT, TEACHER',
  `status` varchar(50) DEFAULT NULL COMMENT 'ACTIVATED, DELETED',
  `oauth_id` varchar(255) DEFAULT NULL COMMENT 'OAuth 계정 ID(Not Null)',
  `profile_url` varchar(2048) DEFAULT NULL COMMENT '프로필 사진 URL',
  `name` varchar(30) DEFAULT NULL COMMENT '이름',
  `phone` varchar(20) DEFAULT NULL COMMENT '전화번호(010XXXXXXXX)',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` (`id`, `role`, `status`, `oauth_id`, `profile_url`, `name`, `phone`, `created_at`, `updated_at`) VALUES (39,'TEACHER','ACTIVATED','3317706722','http://k.kakaocdn.net/dn/d3rqY0/btrXj1twSEc/IaZfrmCnfIGLKHHY8tozfK/img_640x640.jpg','허준혁',NULL,'2024-01-30 15:38:47','2024-02-01 01:46:41'),
(41,'TEACHER','ACTIVATED','3289519571','https://d1b632bso7m0wd.cloudfront.net/41','김성은','01012345678','2024-01-31 02:25:17','2024-02-01 09:22:14'),
(42,'TEACHER','ACTIVATED','3299905804','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','이상영',NULL,'2024-01-31 02:25:42','2024-01-31 13:15:56'),
(43,'STUDENT','ACTIVATED','3320108004','http://k.kakaocdn.net/dn/bExR2r/btrjGcG6I5t/RGULT8HXONkUELdEbAyCb0/img_640x640.jpg','하재률',NULL,'2024-01-31 03:58:19','2024-02-01 01:46:41'),
(44,'STUDENT','ACTIVATED','3301475964','http://k.kakaocdn.net/dn/bfzV8w/btrSYnuhFZU/Ue8eyRthaCGISfYnDL0VK1/img_640x640.jpg','김태윤',NULL,'2024-01-31 03:58:53','2024-02-01 01:37:18'),
(45,'STUDENT','ACTIVATED','3289254241','https://d1b632bso7m0wd.cloudfront.net/45','이태호','01012345678','2024-01-31 04:52:17','2024-02-01 09:22:14');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL COMMENT '멤버 테이블 FK',
  `grade` varchar(30) DEFAULT NULL COMMENT '학생 학년',
  `school` varchar(50) DEFAULT NULL COMMENT '학생 학교',
  PRIMARY KEY (`id`),
  KEY `FK_member_id_in_homework` (`member_id`),
  CONSTRAINT `FK_member_id_in_homework` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` (`id`, `member_id`, `grade`, `school`) VALUES (33,43,'고등학교 2학년','상산고등학교'),
(34,44,'고등학교 2학년','하나고등학교'),
(35,45,'고등학교 2학년','하늘고등학교');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subject` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL COMMENT '과목명',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` (`id`, `name`) VALUES (1,'중등국어'),
(2,'중등영어'),
(3,'중등수학'),
(4,'중등사회'),
(5,'중등과학'),
(6,'고등국어'),
(7,'고등수학'),
(8,'고등영어'),
(9,'한국사'),
(10,'생활과 윤리'),
(11,'한국지리/세계지리'),
(12,'동아시아사/세계사'),
(13,'사회문화'),
(14,'정치와 법'),
(15,'경제'),
(16,'통합사회'),
(17,'물리학'),
(18,'화학'),
(19,'생명과학'),
(20,'지구과학');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) NOT NULL COMMENT '멤버 테이블 FK',
  `profile_status` tinyint(1) DEFAULT 0 COMMENT '공개 1, 비공개 0',
  `college` varchar(50) DEFAULT NULL COMMENT '대학교명',
  `major` varchar(50) DEFAULT NULL COMMENT '대학 전공명',
  `college_email` varchar(100) DEFAULT NULL COMMENT '대학 인증 이메일',
  `gender` varchar(10) DEFAULT NULL COMMENT 'MALE, FEMALE, NONE',
  `salary` int(11) DEFAULT NULL COMMENT 'NULL OK, (단위 : 만원)',
  `career` int(11) DEFAULT NULL COMMENT 'NULL OK, (단위 : 년)',
  `introduce` varchar(1500) DEFAULT NULL COMMENT '자기 소개',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_member_id_in_teacher` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` (`id`, `member_id`, `profile_status`, `college`, `major`, `college_email`, `gender`, `salary`, `career`, `introduce`, `created_at`, `updated_at`) VALUES (12,39,1,'서울대학교','국어국문학과','email1@example.com','MALE',30000,5,'국영수 강사입니다.','2024-02-01 00:23:01','2024-02-01 00:23:01'),
(13,41,1,'연세대학교','사회학과','email2@example.com','FEMALE',40000,7,'사회탐구 강사입니다.','2024-02-01 00:23:01','2024-02-01 00:23:01'),
(14,42,1,'고려대학교','컴퓨터공학과','email3@example.com','MALE',50000,9,'과학탐구 강사입니다.','2024-02-01 00:23:01','2024-02-01 00:23:01');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_subject`
--

DROP TABLE IF EXISTS `teacher_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_subject` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `subject_id` bigint(20) NOT NULL,
  `teacher_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_subject_id_in_teacher_subject` (`subject_id`),
  KEY `FK_teacher_id_in_teacher_subject` (`teacher_id`),
  CONSTRAINT `FK_subject_id_in_teacher_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`),
  CONSTRAINT `FK_teacher_id_in_teacher_subject` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_subject`
--

LOCK TABLES `teacher_subject` WRITE;
/*!40000 ALTER TABLE `teacher_subject` DISABLE KEYS */;
INSERT INTO `teacher_subject` (`id`, `subject_id`, `teacher_id`) VALUES (31,6,12),
(32,7,12),
(33,8,12),
(34,10,13),
(35,11,13),
(36,12,13),
(37,13,13),
(38,17,14),
(39,18,14),
(40,19,14),
(41,20,14);
/*!40000 ALTER TABLE `teacher_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `textbook`
--

DROP TABLE IF EXISTS `textbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `textbook` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `teacher_member_id` bigint(20) NOT NULL,
  `subject_id` bigint(20) NOT NULL,
  `textbook_name` varchar(20) DEFAULT NULL,
  `textbook_url` varchar(2048) DEFAULT NULL,
  `first_page_cover` tinyint(1) DEFAULT NULL,
  `total_page` int(11) DEFAULT NULL,
  `cover_img` varchar(2048) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_teacher_member_id_in_textbook` (`teacher_member_id`),
  CONSTRAINT `FK_teacher_member_id_in_textbook` FOREIGN KEY (`teacher_member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `textbook`
--

LOCK TABLES `textbook` WRITE;
/*!40000 ALTER TABLE `textbook` DISABLE KEYS */;
INSERT INTO `textbook` (`id`, `teacher_member_id`, `subject_id`, `textbook_name`, `textbook_url`, `first_page_cover`, `total_page`, `cover_img`, `is_deleted`, `created_at`, `updated_at`) VALUES (8,39,6,'고등국어 교재 1','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,110,'https://d1b632bso7m0wd.cloudfront.net/testtest_cover.png',0,'2024-02-01 00:51:43','2024-02-01 10:21:30'),
(9,39,6,'고등국어 교재 2','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,130,'https://d1b632bso7m0wd.cloudfront.net/hjrimage.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:21:34'),
(10,39,6,'고등국어 교재 3','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,104,'https://d1b632bso7m0wd.cloudfront.net/%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%991_cover.png',0,'2024-02-01 00:51:43','2024-02-01 10:21:36'),
(11,39,7,'고등수학 교재 1','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,120,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img1.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:36'),
(12,39,7,'고등수학 교재 2','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,130,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img2.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:38'),
(13,39,7,'고등수학 교재 3','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,110,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img3.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:39'),
(14,39,8,'고등영어 교재 1','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,120,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img4.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:40'),
(15,39,8,'고등영어 교재 2','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,100,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img5.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:42'),
(16,39,8,'고등영어 교재 3','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,130,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img6.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:46'),
(17,41,10,'생활과 윤리 교재 1','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,140,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img7.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:21:56'),
(18,41,10,'생활과 윤리 교재 2','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,135,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img8.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:21:58'),
(19,41,10,'생활과 윤리 교재 3','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,136,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img9.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:21:59'),
(20,41,11,'한국지리/세계지리 교재 1','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',NULL,137,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img10.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:00'),
(21,41,11,'한국지리/세계지리 교재 2','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',NULL,110,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img11.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:01'),
(22,41,11,'한국지리/세계지리 교재 3','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',NULL,130,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img12.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:03'),
(23,41,12,'동아시아사/세계사 교재 1','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',NULL,150,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img13.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:04'),
(24,41,12,'동아시아사/세계사 교재 2','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',NULL,160,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img14.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:05'),
(25,41,12,'동아시아사/세계사 교재 3','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',NULL,140,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img15.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:06'),
(26,41,13,'사회문화 교재 1','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',NULL,121,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img16.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:09'),
(27,41,13,'사회문화 교재 2','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',NULL,144,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img17.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:10'),
(28,41,13,'사회문화 교재 3','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',NULL,110,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img18.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:12'),
(29,42,17,'물리학 교재 1','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',NULL,130,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img19.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:47'),
(30,42,17,'물리학 교재 2','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',NULL,120,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img20.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:48'),
(31,42,17,'물리학 교재 3','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',NULL,140,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img21.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:49'),
(32,42,18,'화학 교재 1','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',NULL,100,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img22.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:50'),
(33,42,18,'화학 교재 2','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',NULL,110,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img23.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:51'),
(34,42,18,'화학 교재 3','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',NULL,155,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img24.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:52'),
(35,42,19,'생명과학 교재 1','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',NULL,160,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img25.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:53'),
(36,42,19,'생명과학 교재 2','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',NULL,150,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img26.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:54'),
(37,42,19,'생명과학 교재 3','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',NULL,120,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img27.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:55'),
(38,42,20,'지구과학 교재 1','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',NULL,130,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img28.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:55'),
(39,42,20,'지구과학 교재 2','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',NULL,140,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img29.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:56'),
(40,42,20,'지구과학 교재 3','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',NULL,151,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img30.jpg',0,'2024-02-01 00:51:43','2024-02-01 10:22:57');
/*!40000 ALTER TABLE `textbook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutoring`
--

DROP TABLE IF EXISTS `tutoring`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tutoring` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chat_room_id` bigint(20) NOT NULL,
  `subject_id` bigint(20) DEFAULT NULL,
  `hourly_rate` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'IN_PROGRESS' COMMENT 'IN_PROGRESS, CLOSED',
  `student_member_id` bigint(20) NOT NULL,
  `teacher_member_id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_chat_room_id_in_tutoring` (`chat_room_id`),
  KEY `FK_student_member_id_in_tutoring` (`student_member_id`),
  KEY `FK_subject_id_in_tutoring` (`subject_id`),
  KEY `FK_teacher_member_id_in_tutoring` (`teacher_member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutoring`
--

LOCK TABLES `tutoring` WRITE;
/*!40000 ALTER TABLE `tutoring` DISABLE KEYS */;
INSERT INTO `tutoring` (`id`, `chat_room_id`, `subject_id`, `hourly_rate`, `status`, `student_member_id`, `teacher_member_id`, `created_at`, `updated_at`) VALUES (17,6,6,30000,'IN_PROGRESS',43,39,'2024-02-01 00:28:23','2024-02-01 00:28:23'),
(18,7,7,30000,'IN_PROGRESS',44,39,'2024-02-01 00:28:23','2024-02-01 00:28:23'),
(19,8,10,40000,'IN_PROGRESS',43,41,'2024-02-01 00:28:23','2024-02-01 00:28:23'),
(20,9,11,40000,'IN_PROGRESS',44,41,'2024-02-01 00:28:23','2024-02-01 00:28:23'),
(21,10,12,40000,'IN_PROGRESS',45,41,'2024-02-01 00:28:24','2024-02-01 00:28:24'),
(22,11,17,50000,'IN_PROGRESS',43,42,'2024-02-01 00:28:24','2024-02-01 00:28:24'),
(23,12,18,50000,'IN_PROGRESS',44,42,'2024-02-01 00:28:24','2024-02-01 00:28:24'),
(24,13,19,50000,'IN_PROGRESS',45,42,'2024-02-01 00:28:24','2024-02-01 00:28:24');
/*!40000 ALTER TABLE `tutoring` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutoring_schedule`
--

DROP TABLE IF EXISTS `tutoring_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tutoring_schedule` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '과외일정 테이블 PK',
  `tutoring_id` bigint(20) NOT NULL COMMENT '과외 테이블 FK',
  `schedule_date` date DEFAULT NULL COMMENT '과외 날짜',
  `start_time` time DEFAULT NULL COMMENT '과외 시작 시간',
  `duration` int(11) DEFAULT NULL COMMENT '과외 진행 시간(단위: 분)',
  `title` varchar(64) DEFAULT NULL COMMENT '커리큘럼명',
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_tutoring_id_in_tutoring_schedule` (`tutoring_id`),
  CONSTRAINT `FK_tutoring_id_in_tutoring_schedule` FOREIGN KEY (`tutoring_id`) REFERENCES `tutoring` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutoring_schedule`
--

LOCK TABLES `tutoring_schedule` WRITE;
/*!40000 ALTER TABLE `tutoring_schedule` DISABLE KEYS */;
INSERT INTO `tutoring_schedule` (`id`, `tutoring_id`, `schedule_date`, `start_time`, `duration`, `title`, `updated_at`, `created_at`) VALUES (34,17,'2024-02-01','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(35,17,'2024-02-02','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(36,17,'2024-02-03','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(37,17,'2024-02-04','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(38,17,'2024-02-05','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(39,17,'2024-02-06','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(40,17,'2024-02-07','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(41,17,'2024-02-08','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(42,17,'2024-02-09','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(43,17,'2024-02-10','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(49,18,'2024-02-01','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(50,18,'2024-02-02','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(51,18,'2024-02-03','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(52,18,'2024-02-04','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(53,18,'2024-02-05','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(54,18,'2024-02-06','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(55,18,'2024-02-07','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(56,18,'2024-02-08','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(57,18,'2024-02-09','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(58,18,'2024-02-10','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:03','2024-02-01 00:40:03'),
(64,19,'2024-02-01','00:00:00',60,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(65,19,'2024-02-02','00:00:00',60,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(66,19,'2024-02-03','00:00:00',60,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(67,19,'2024-02-04','00:00:00',60,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(68,19,'2024-02-05','00:00:00',60,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(69,19,'2024-02-06','00:00:00',60,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(70,19,'2024-02-07','00:00:00',60,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(71,19,'2024-02-08','00:00:00',60,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(72,19,'2024-02-09','00:00:00',60,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(73,19,'2024-02-10','00:00:00',60,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(79,20,'2024-02-01','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(80,20,'2024-02-02','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(81,20,'2024-02-03','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(82,20,'2024-02-04','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(83,20,'2024-02-05','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(84,20,'2024-02-06','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(85,20,'2024-02-07','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(86,20,'2024-02-08','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(87,20,'2024-02-09','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(88,20,'2024-02-10','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(94,21,'2024-02-01','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(95,21,'2024-02-02','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(96,21,'2024-02-03','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(97,21,'2024-02-04','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(98,21,'2024-02-05','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(99,21,'2024-02-06','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(100,21,'2024-02-07','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(101,21,'2024-02-08','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(102,21,'2024-02-09','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(103,21,'2024-02-10','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(109,22,'2024-02-01','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(110,22,'2024-02-02','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(111,22,'2024-02-03','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(112,22,'2024-02-04','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(113,22,'2024-02-05','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(114,22,'2024-02-06','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(115,22,'2024-02-07','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(116,22,'2024-02-08','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(117,22,'2024-02-09','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(118,22,'2024-02-10','00:00:00',60,'수열의 극한 1 - 수열의 수렴과 발산','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(124,23,'2024-02-01','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(125,23,'2024-02-02','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(126,23,'2024-02-03','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(127,23,'2024-02-04','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(128,23,'2024-02-05','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(129,23,'2024-02-06','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(130,23,'2024-02-07','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(131,23,'2024-02-08','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(132,23,'2024-02-09','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(133,23,'2024-02-10','00:00:00',90,'수열의 극한 2 - 급수','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(139,24,'2024-02-01','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(140,24,'2024-02-02','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(141,24,'2024-02-03','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(142,24,'2024-02-04','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(143,24,'2024-02-05','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(144,24,'2024-02-06','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(145,24,'2024-02-07','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(146,24,'2024-02-08','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(147,24,'2024-02-09','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04'),
(148,24,'2024-02-10','00:00:00',120,'지수함수와 로그함수의 극한','2024-02-01 00:40:04','2024-02-01 00:40:04');
/*!40000 ALTER TABLE `tutoring_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tutoring_schedule_id` bigint(20) NOT NULL,
  `video_url` varchar(2048) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_tutoring_schedule_id_in_video` (`tutoring_schedule_id`),
  CONSTRAINT `FK_tutoring_schedule_id_in_video` FOREIGN KEY (`tutoring_schedule_id`) REFERENCES `tutoring_schedule` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` (`id`, `tutoring_schedule_id`, `video_url`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES (1,34,'https://haryeom-video-bucket.s3.ap-northeast-2.amazonaws.com/big-buck-bunny_trailer.webm','17:59:03','20:00:18','2024-01-10 17:59:03','2024-02-01 09:18:09'),
(2,34,'https://haryeom-video-bucket.s3.ap-northeast-2.amazonaws.com/file_example_WEBM_1920_3_7MB.webm','17:05:04','19:03:21','2024-01-20 17:05:04','2024-02-01 09:18:09');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_room`
--

DROP TABLE IF EXISTS `video_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video_room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tutoring_schedule_id` bigint(20) NOT NULL COMMENT '과외일정 테이블 FK',
  `room_code` varchar(100) DEFAULT NULL COMMENT '화상과외방 입장 코드',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_tutoring_schedule_id_in_video_room` (`tutoring_schedule_id`),
  CONSTRAINT `FK_tutoring_schedule_id_in_video_room` FOREIGN KEY (`tutoring_schedule_id`) REFERENCES `tutoring_schedule` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_room`
--

LOCK TABLES `video_room` WRITE;
/*!40000 ALTER TABLE `video_room` DISABLE KEYS */;
INSERT INTO `video_room` (`id`, `tutoring_schedule_id`, `room_code`, `created_at`, `updated_at`) VALUES (1,34,'78a8971e-1863-4c92-98d6-0d0f7caca4f0','2024-02-01 00:00:00','2024-02-01 09:18:50'),
(2,34,'96f7963b-5db6-4fa5-9b51-f9a70f591d43','2024-02-01 00:00:00','2024-02-01 00:00:00'),
(3,34,'7d6b2108-4984-4a41-8091-9a268e3e442b','2024-02-01 00:00:00','2024-02-01 09:18:50'),
(4,34,'f7e4516d-8930-4fdb-b5e1-77d0688d3368','2024-02-01 00:00:00','2024-02-01 09:18:50'),
(5,34,'fa6220cf-ce87-4f00-be86-b42b26b26a44','2024-02-01 00:00:00','2024-02-01 09:18:50'),
(6,34,'7a745e0d-4e0f-43c8-9679-07bfe2cc7aa4','2024-02-01 00:00:00','2024-02-01 09:18:50'),
(7,34,'52428d2f-653e-4e59-8ffe-f357e025bc62','2024-02-01 00:00:00','2024-02-01 09:18:50'),
(8,34,'fdcfd7bb-ae41-4f31-a748-5c5224e59e55','2024-02-01 00:00:00','2024-02-01 09:18:50'),
(9,34,'da3a90d8-2b51-40fd-bd23-c33f3da2de96','2024-02-01 00:00:00','2024-02-01 09:18:50');
/*!40000 ALTER TABLE `video_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_timestamp`
--

DROP TABLE IF EXISTS `video_timestamp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video_timestamp` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `video_id` bigint(20) NOT NULL,
  `stamp_time` time DEFAULT NULL,
  `content` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_video_id_in_timestamp` (`video_id`),
  CONSTRAINT `FK_video_id_in_timestamp` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_timestamp`
--

LOCK TABLES `video_timestamp` WRITE;
/*!40000 ALTER TABLE `video_timestamp` DISABLE KEYS */;
INSERT INTO `video_timestamp` (`id`, `video_id`, `stamp_time`, `content`) VALUES (1,1,'00:04:03','수열의수렴 개념설명'),
(2,1,'00:07:05','수열의발산 개념설명'),
(3,2,'00:15:31','수렴할 때 급수 계산방법'),
(4,2,'00:57:31','오답 유형');
/*!40000 ALTER TABLE `video_timestamp` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-01 12:11:49
