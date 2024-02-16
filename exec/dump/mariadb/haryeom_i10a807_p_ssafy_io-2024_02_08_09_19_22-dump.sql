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
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(69,24,37),
(79,27,46),
(89,25,46),
(90,26,46),
(91,26,41),
(92,20,17),
(93,21,17);
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
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(13,45,42,0,'2024-02-01 00:07:51','2024-02-01 00:07:51'),
(14,47,42,0,'2024-02-05 04:06:37','2024-02-05 04:06:37'),
(15,45,46,0,'2024-02-05 04:09:57','2024-02-05 04:09:57'),
(17,43,46,0,'2024-02-06 09:52:45','2024-02-06 09:52:45'),
(18,44,46,0,'2024-02-08 09:15:28','2024-02-08 09:15:28'),
(36,60,57,0,'2024-02-07 15:04:22','2024-02-07 15:04:22'),
(37,61,58,0,'2024-02-07 15:12:37','2024-02-07 15:12:37'),
(38,62,59,0,'2024-02-07 15:12:37','2024-02-07 15:12:37'),
(39,66,63,0,'2024-02-07 15:35:23','2024-02-07 15:35:23'),
(40,67,64,0,'2024-02-07 15:35:46','2024-02-07 15:35:46'),
(41,68,65,0,'2024-02-07 15:35:53','2024-02-07 15:35:53'),
(42,72,69,0,'2024-02-07 15:36:14','2024-02-07 15:36:14'),
(43,73,70,0,'2024-02-07 15:36:20','2024-02-07 15:36:20'),
(44,74,71,0,'2024-02-07 15:36:26','2024-02-07 15:36:26'),
(45,78,75,0,'2024-02-07 15:36:33','2024-02-07 15:36:33'),
(46,79,76,0,'2024-02-07 15:36:41','2024-02-07 15:36:41'),
(47,80,77,0,'2024-02-07 15:36:48','2024-02-07 15:36:48'),
(48,84,81,0,'2024-02-07 15:36:57','2024-02-07 15:36:57'),
(49,85,82,0,'2024-02-07 15:37:03','2024-02-07 15:37:03'),
(50,86,83,0,'2024-02-07 15:37:10','2024-02-07 15:37:10'),
(51,90,87,0,'2024-02-07 15:37:17','2024-02-07 15:37:17'),
(52,91,88,0,'2024-02-07 15:37:23','2024-02-07 15:37:23'),
(53,92,89,0,'2024-02-07 15:37:29','2024-02-07 15:37:29'),
(54,96,93,0,'2024-02-07 15:37:37','2024-02-07 15:37:37'),
(55,97,94,0,'2024-02-07 15:37:44','2024-02-07 15:37:44'),
(56,98,95,0,'2024-02-07 15:37:51','2024-02-07 15:37:51'),
(57,102,99,0,'2024-02-07 15:37:59','2024-02-07 15:37:59'),
(58,103,100,0,'2024-02-07 15:38:07','2024-02-07 15:38:07'),
(59,104,101,0,'2024-02-07 15:38:15','2024-02-07 15:38:15'),
(60,108,105,0,'2024-02-07 15:38:21','2024-02-07 15:38:21'),
(61,109,106,0,'2024-02-07 15:38:30','2024-02-07 15:38:30'),
(62,110,107,0,'2024-02-07 15:38:37','2024-02-07 15:38:37'),
(63,41,105,0,'2024-02-07 20:42:59','2024-02-07 20:42:59');
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
  `last_read_message_id` varchar(24) DEFAULT '000000000000000000000000',
  `is_deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `chat_room_id` (`chat_room_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `chat_room_state_ibfk_1` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`),
  CONSTRAINT `chat_room_state_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room_state`
--

LOCK TABLES `chat_room_state` WRITE;
/*!40000 ALTER TABLE `chat_room_state` DISABLE KEYS */;
INSERT INTO `chat_room_state` (`id`, `chat_room_id`, `member_id`, `last_read_message_id`, `is_deleted`) VALUES (1,6,39,'000000000000000000000000',0),
(2,6,43,'000000000000000000000000',0),
(3,7,39,'000000000000000000000000',0),
(4,7,44,'65c14eb11931154bdb4765ec',0),
(5,8,41,'000000000000000000000000',0),
(6,8,43,'000000000000000000000000',0),
(7,9,41,'65c337e1cddb4a285f7c04ea',0),
(8,9,44,'65c337e1cddb4a285f7c04ea',0),
(9,10,41,'000000000000000000000000',0),
(10,10,45,'65c1c20f67fc66091e3de67e',0),
(11,11,42,'65c32ec54ffe4b793c01f873',0),
(12,11,43,'000000000000000000000000',0),
(13,12,42,'65c336abaca3a772edf356b9',0),
(14,12,44,'65c336abaca3a772edf356b9',0),
(15,13,42,'65c3c588aca3a772edf356d4',0),
(16,13,45,'65c3026340164b6b0c5fd98c',0),
(17,14,47,'65c343bfaca3a772edf356c6',0),
(18,14,42,'65c3c548aca3a772edf356cc',0),
(19,15,45,'000000000000000000000000',0),
(20,15,46,'000000000000000000000000',0),
(23,17,43,'000000000000000000000000',0),
(24,17,46,'000000000000000000000000',0),
(29,36,60,'000000000000000000000000',0),
(30,36,57,'000000000000000000000000',0),
(31,37,61,'000000000000000000000000',0),
(32,37,58,'000000000000000000000000',0),
(33,38,62,'000000000000000000000000',0),
(34,38,59,'000000000000000000000000',0),
(35,39,66,'000000000000000000000000',0),
(36,39,63,'000000000000000000000000',0),
(37,40,67,'000000000000000000000000',0),
(38,40,64,'000000000000000000000000',0),
(39,41,68,'000000000000000000000000',0),
(40,41,65,'000000000000000000000000',0),
(41,42,72,'000000000000000000000000',0),
(42,42,69,'000000000000000000000000',0),
(43,43,73,'000000000000000000000000',0),
(44,43,70,'000000000000000000000000',0),
(45,44,74,'000000000000000000000000',0),
(46,44,71,'000000000000000000000000',0),
(47,45,78,'000000000000000000000000',0),
(48,45,75,'000000000000000000000000',0),
(49,46,79,'000000000000000000000000',0),
(50,46,76,'000000000000000000000000',0),
(51,47,80,'000000000000000000000000',0),
(52,47,77,'000000000000000000000000',0),
(53,48,84,'000000000000000000000000',0),
(54,48,81,'000000000000000000000000',0),
(55,49,85,'000000000000000000000000',0),
(56,49,82,'000000000000000000000000',0),
(57,50,86,'000000000000000000000000',0),
(58,50,83,'000000000000000000000000',0),
(59,51,90,'000000000000000000000000',0),
(60,51,87,'000000000000000000000000',0),
(61,52,91,'65c32c6340164b6b0c5fd992',0),
(62,52,88,'65c32c6340164b6b0c5fd992',0),
(63,53,92,'000000000000000000000000',0),
(64,53,89,'000000000000000000000000',0),
(65,54,96,'000000000000000000000000',0),
(66,54,93,'000000000000000000000000',0),
(67,55,97,'000000000000000000000000',0),
(68,55,94,'000000000000000000000000',0),
(69,56,98,'000000000000000000000000',0),
(70,56,95,'000000000000000000000000',0),
(71,57,102,'000000000000000000000000',0),
(72,57,99,'000000000000000000000000',0),
(73,58,103,'000000000000000000000000',0),
(74,58,100,'000000000000000000000000',0),
(75,59,104,'000000000000000000000000',0),
(76,59,101,'000000000000000000000000',0),
(77,60,108,'000000000000000000000000',0),
(78,60,105,'000000000000000000000000',0),
(79,61,109,'000000000000000000000000',0),
(80,61,106,'000000000000000000000000',0),
(81,62,110,'000000000000000000000000',0),
(82,62,107,'000000000000000000000000',0),
(83,63,41,'000000000000000000000000',0),
(84,63,105,'000000000000000000000000',0),
(85,18,46,'000000000000000000000000',0),
(86,18,44,'65c41defaca3a772edf356d5',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(6,31,15,'https://hjr-bucket.s3.ap-northeast-2.amazonaws.com/hjrimage.jpg','http://iamge.url/drawing6','http://iamge.url/drawing6'),
(7,71,3,'https://d1b632bso7m0wd.cloudfront.net/71_blob_3',NULL,NULL),
(8,71,5,'https://d1b632bso7m0wd.cloudfront.net/71_blob_5',NULL,NULL),
(9,71,6,'https://d1b632bso7m0wd.cloudfront.net/71_blob_6',NULL,NULL),
(10,72,3,'https://d1b632bso7m0wd.cloudfront.net/72_blob_3',NULL,NULL),
(11,31,3,'https://d1b632bso7m0wd.cloudfront.net/31_blob_3',NULL,NULL),
(12,31,5,'https://d1b632bso7m0wd.cloudfront.net/31_blob_5',NULL,NULL),
(13,31,6,'https://d1b632bso7m0wd.cloudfront.net/31_blob_6',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `homework`
--

LOCK TABLES `homework` WRITE;
/*!40000 ALTER TABLE `homework` DISABLE KEYS */;
INSERT INTO `homework` (`id`, `textbook_id`, `tutoring_id`, `deadline`, `start_page`, `end_page`, `status`, `created_at`, `updated_at`, `is_deleted`) VALUES (31,8,17,'2024-02-10',1,10,'IN_PROGRESS','2024-02-01 01:57:03','2024-02-05 10:03:52',0),
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
(71,21,21,'2024-02-10',1,10,'IN_PROGRESS','2024-02-01 01:57:03','2024-02-05 04:09:10',0),
(72,21,21,'2024-02-17',11,20,'IN_PROGRESS','2024-02-01 01:57:03','2024-02-06 08:17:26',0),
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
(101,24,24,'2024-02-10',1,10,'IN_PROGRESS','2024-02-01 01:57:03','2024-02-05 06:53:56',0),
(102,24,24,'2024-02-17',11,20,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(103,24,24,'2024-02-24',21,30,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(104,24,24,'2024-03-02',31,40,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(105,24,24,'2024-03-09',41,50,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(106,24,24,'2024-03-16',51,60,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(107,24,24,'2024-03-23',61,70,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(108,24,24,'2024-03-30',71,80,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(109,24,24,'2024-04-06',81,90,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(110,24,24,'2024-04-13',91,100,'UNCONFIRMED','2024-02-01 01:57:03','2024-02-01 01:57:03',0),
(111,41,25,'2024-04-05',130,136,'UNCONFIRMED','2024-02-05 12:53:22','2024-02-05 12:53:23',0),
(112,46,25,'2024-02-07',1,10,'UNCONFIRMED','2024-02-07 09:25:12','2024-02-07 09:25:13',0),
(113,46,26,'2024-02-07',1,10,'UNCONFIRMED','2024-02-07 09:25:53','2024-02-07 09:25:54',0),
(114,46,27,'2024-02-07',1,10,'UNCONFIRMED','2024-02-07 09:26:14','2024-02-07 09:26:15',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` (`id`, `role`, `status`, `oauth_id`, `profile_url`, `name`, `phone`, `created_at`, `updated_at`) VALUES (39,'TEACHER','ACTIVATED','3324109118','http://k.kakaocdn.net/dn/d3rqY0/btrXj1twSEc/IaZfrmCnfIGLKHHY8tozfK/img_640x640.jpg','허준혁',NULL,'2024-01-30 15:38:47','2024-02-05 10:19:08'),
(41,'TEACHER','ACTIVATED','3324112565','https://d1b632bso7m0wd.cloudfront.net/41','김성은','01012345678','2024-01-31 02:25:17','2024-02-05 10:20:34'),
(42,'TEACHER','ACTIVATED','3324108441','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','이상영',NULL,'2024-01-31 02:25:42','2024-02-05 10:18:18'),
(43,'STUDENT','ACTIVATED','3324111214','http://k.kakaocdn.net/dn/bExR2r/btrjGcG6I5t/RGULT8HXONkUELdEbAyCb0/img_640x640.jpg','하재률',NULL,'2024-01-31 03:58:19','2024-02-05 10:19:53'),
(44,'STUDENT','ACTIVATED','3324128968','http://k.kakaocdn.net/dn/bfzV8w/btrSYnuhFZU/Ue8eyRthaCGISfYnDL0VK1/img_640x640.jpg','김태윤','01099999999','2024-01-31 03:58:53','2024-02-06 16:48:18'),
(45,'STUDENT','ACTIVATED','3324101431','https://d1b632bso7m0wd.cloudfront.net/45','이태호','01012345678','2024-01-31 04:52:17','2024-02-05 10:49:02'),
(46,'TEACHER','ACTIVATED','1234567890','https://d1b632bso7m0wd.cloudfront.net/46.png','김선생','01012345678','2024-02-05 10:51:00','2024-02-05 10:56:50'),
(47,'STUDENT','ACTIVATED','2345678901','https://d1b632bso7m0wd.cloudfront.net/47.png','이학생','01087654321','2024-02-05 10:51:50','2024-02-05 10:56:50'),
(57,'TEACHER','ACTIVATED','S10A801N1','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김승우','01025792826','2024-02-07 11:09:54','2024-02-07 11:14:31'),
(58,'TEACHER','ACTIVATED','S10A801N2','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','황진하','01098287090','2024-02-07 11:10:44','2024-02-07 11:14:31'),
(59,'TEACHER','ACTIVATED','S10A801N3','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김미서','01021645644','2024-02-07 11:11:58','2024-02-07 11:14:31'),
(60,'STUDENT','ACTIVATED','S10A801N4','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','조서현','01037463336','2024-02-07 11:13:16','2024-02-07 11:18:51'),
(61,'STUDENT','ACTIVATED','S10A801N5','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','권원영','01038477211','2024-02-07 11:13:16','2024-02-07 11:18:51'),
(62,'STUDENT','ACTIVATED','S10A801N6','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','박주현','01080963058','2024-02-07 11:13:16','2024-02-07 11:18:51'),
(63,'TEACHER','ACTIVATED','S10A803N1','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김진용','01019190178','2024-02-07 11:22:01','2024-02-07 11:22:01'),
(64,'TEACHER','ACTIVATED','S10A803N2','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','강민정','01035753030','2024-02-07 11:22:02','2024-02-08 09:04:27'),
(65,'TEACHER','ACTIVATED','S10A803N3','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','신우섭','01043109939','2024-02-07 11:22:03','2024-02-08 09:04:27'),
(66,'STUDENT','ACTIVATED','S10A803N4','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김연화','01062016400','2024-02-07 11:22:04','2024-02-08 09:04:27'),
(67,'STUDENT','ACTIVATED','S10A803N5','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','최민호','01072126142','2024-02-07 11:22:05','2024-02-08 09:04:27'),
(68,'STUDENT','ACTIVATED','S10A803N6','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','임덕기','01081987073','2024-02-07 11:22:06','2024-02-08 09:04:27'),
(69,'TEACHER','ACTIVATED','S10A804N1','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김민준','01019190178','2024-02-07 11:26:12','2024-02-07 11:26:12'),
(70,'TEACHER','ACTIVATED','S10A804N2','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김은비','01035753030','2024-02-07 11:26:13','2024-02-08 09:06:46'),
(71,'TEACHER','ACTIVATED','S10A804N3','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','정여민','01043109939','2024-02-07 11:26:14','2024-02-08 09:06:46'),
(72,'STUDENT','ACTIVATED','S10A804N4','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','배유열','01062016400','2024-02-07 11:26:15','2024-02-08 09:06:46'),
(73,'STUDENT','ACTIVATED','S10A804N5','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','문성현','01072126142','2024-02-07 11:26:16','2024-02-08 09:06:46'),
(74,'STUDENT','ACTIVATED','S10A804N6','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','임소현','01081987073','2024-02-07 11:26:17','2024-02-08 09:06:46'),
(75,'TEACHER','ACTIVATED','S10A805N1','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','정필모','01019190178','2024-02-07 11:29:36','2024-02-07 11:29:36'),
(76,'TEACHER','ACTIVATED','S10A805N2','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','박세정','01035753030','2024-02-07 11:29:37','2024-02-08 09:06:46'),
(77,'TEACHER','ACTIVATED','S10A805N3','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김성수','01043109939','2024-02-07 11:29:38','2024-02-08 09:06:46'),
(78,'STUDENT','ACTIVATED','S10A805N4','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김현지','01062016400','2024-02-07 11:29:39','2024-02-08 09:06:46'),
(79,'STUDENT','ACTIVATED','S10A805N5','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','전은평','01072126142','2024-02-07 11:29:40','2024-02-08 09:06:46'),
(80,'STUDENT','ACTIVATED','S10A805N6','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김병현','01081987073','2024-02-07 11:29:41','2024-02-08 09:06:46'),
(81,'TEACHER','ACTIVATED','S10A806N1','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김지현','01019190178','2024-02-07 11:32:50','2024-02-08 09:06:46'),
(82,'TEACHER','ACTIVATED','S10A806N2','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','남수진','01035753030','2024-02-07 11:32:51','2024-02-08 09:06:46'),
(83,'TEACHER','ACTIVATED','S10A806N3','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','정승환','01043109939','2024-02-07 11:32:52','2024-02-08 09:06:46'),
(84,'STUDENT','ACTIVATED','S10A806N4','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','하동준','01062016400','2024-02-07 11:32:53','2024-02-08 09:06:46'),
(85,'STUDENT','ACTIVATED','S10A806N5','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김예지','01072126142','2024-02-07 11:32:54','2024-02-08 09:06:46'),
(86,'STUDENT','ACTIVATED','S10A806N6','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','정유경','01081987073','2024-02-07 11:32:56','2024-02-07 11:32:56'),
(87,'TEACHER','ACTIVATED','S10A807N1','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','조승우','01019190178','2024-02-07 12:55:03','2024-02-07 12:55:03'),
(88,'TEACHER','ACTIVATED','S10A807N2','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','이상학','01035753030','2024-02-07 12:55:04','2024-02-08 09:06:46'),
(89,'TEACHER','ACTIVATED','S10A807N3','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','지인성','01043109939','2024-02-07 12:55:05','2024-02-08 09:06:46'),
(90,'STUDENT','ACTIVATED','S10A807N4','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김현창','01062016400','2024-02-07 12:55:06','2024-02-08 09:06:46'),
(91,'STUDENT','ACTIVATED','S10A807N5','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','이민지','01072126142','2024-02-07 12:55:07','2024-02-08 09:06:46'),
(92,'STUDENT','ACTIVATED','S10A807N6','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','신시원','01081987073','2024-02-07 12:55:08','2024-02-08 09:06:46'),
(93,'TEACHER','ACTIVATED','S10A808N1','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','윤길재','01019190178','2024-02-07 12:59:06','2024-02-07 12:59:06'),
(94,'TEACHER','ACTIVATED','S10A808N2','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','명소이','01035753030','2024-02-07 12:59:07','2024-02-08 09:06:46'),
(95,'TEACHER','ACTIVATED','S10A808N3','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','배정훈','01043109939','2024-02-07 12:59:08','2024-02-08 09:06:46'),
(96,'STUDENT','ACTIVATED','S10A808N4','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','한태희','01062016400','2024-02-07 12:59:09','2024-02-08 09:06:46'),
(97,'STUDENT','ACTIVATED','S10A808N5','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김대현','01072126142','2024-02-07 12:59:10','2024-02-08 09:06:46'),
(98,'STUDENT','ACTIVATED','S10A808N6','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','이인석','01081987073','2024-02-07 12:59:11','2024-02-08 09:06:46'),
(99,'TEACHER','ACTIVATED','S10A809N1','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','박현우','01019190178','2024-02-07 13:04:12','2024-02-08 09:06:46'),
(100,'TEACHER','ACTIVATED','S10A809N2','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','이효리','01035753030','2024-02-07 13:04:13','2024-02-08 09:06:46'),
(101,'TEACHER','ACTIVATED','S10A809N3','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','조은별','01043109939','2024-02-07 13:04:14','2024-02-08 09:06:46'),
(102,'STUDENT','ACTIVATED','S10A809N4','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김종범','01062016400','2024-02-07 13:04:15','2024-02-08 09:06:46'),
(103,'STUDENT','ACTIVATED','S10A809N5','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','장승호','01072126142','2024-02-07 13:04:16','2024-02-08 09:06:46'),
(104,'STUDENT','ACTIVATED','S10A809N6','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','황인규','01081987073','2024-02-07 13:04:17','2024-02-08 09:06:46'),
(105,'TEACHER','ACTIVATED','S10A810N1','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','선수연','01019190178','2024-02-07 13:06:11','2024-02-08 09:06:46'),
(106,'TEACHER','ACTIVATED','S10A810N2','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','권순준','01035753030','2024-02-07 13:06:12','2024-02-08 09:06:46'),
(107,'TEACHER','ACTIVATED','S10A810N3','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','임세환','01043109939','2024-02-07 13:06:13','2024-02-08 09:06:46'),
(108,'STUDENT','ACTIVATED','S10A810N4','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','최현기','01062016400','2024-02-07 13:06:14','2024-02-08 09:06:46'),
(109,'STUDENT','ACTIVATED','S10A810N5','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','김대원','01072126142','2024-02-07 13:06:15','2024-02-08 09:06:46'),
(110,'STUDENT','ACTIVATED','S10A810N6','http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','윤예빈','01081987073','2024-02-07 13:06:16','2024-02-08 09:06:46');
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
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` (`id`, `member_id`, `grade`, `school`) VALUES (33,43,'고등학교 2학년','상산고등학교'),
(34,44,'고등학교 2학년','하나고등학교'),
(35,45,'고등학교 2학년','하늘고등학교'),
(36,47,'고등학교 3학년','싸피고등학교'),
(38,60,'고등학교 1학년','싸피고등학교'),
(39,61,'고등학교 2학년','싸피고등학교'),
(40,62,'고등학교 3학년','싸피고등학교'),
(41,66,'고등학교 1학년','싸피고등학교'),
(42,67,'고등학교 2학년','싸피고등학교'),
(43,68,'고등학교 3학년','싸피고등학교'),
(44,72,'고등학교 1학년','싸피고등학교'),
(45,73,'고등학교 2학년','싸피고등학교'),
(46,74,'고등학교 3학년','싸피고등학교'),
(47,84,'고등학교 1학년','싸피고등학교'),
(48,85,'고등학교 2학년','싸피고등학교'),
(49,86,'고등학교 3학년','싸피고등학교'),
(50,90,'고등학교 1학년','싸피고등학교'),
(51,91,'고등학교 2학년','싸피고등학교'),
(52,92,'고등학교 3학년','싸피고등학교'),
(53,96,'고등학교 1학년','싸피고등학교'),
(54,97,'고등학교 2학년','싸피고등학교'),
(55,98,'고등학교 3학년','싸피고등학교'),
(56,102,'고등학교 1학년','싸피고등학교'),
(57,103,'고등학교 2학년','싸피고등학교'),
(58,104,'고등학교 3학년','싸피고등학교'),
(59,108,'고등학교 1학년','싸피고등학교'),
(60,109,'고등학교 2학년','싸피고등학교'),
(61,110,'고등학교 3학년','싸피고등학교');
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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` (`id`, `member_id`, `profile_status`, `college`, `major`, `college_email`, `gender`, `salary`, `career`, `introduce`, `created_at`, `updated_at`) VALUES (12,39,1,'서울대학교','국어국문학과','email1@example.com','MALE',30000,5,'국영수 강사입니다.','2024-02-01 00:23:02','2024-02-07 03:40:02'),
(13,41,1,'연세대학교','사회학과','email2@example.com','FEMALE',40000,7,'사회탐구 강사입니다.','2024-02-01 00:23:03','2024-02-07 03:40:02'),
(14,42,1,'고려대학교','컴퓨터공학과','email3@example.com','MALE',50000,9,'과학탐구 강사입니다.','2024-02-01 00:23:04','2024-02-07 03:40:02'),
(15,46,1,'서울대학교','컴퓨터공학과','teacher@ssafy.com','FEMALE',60000,1,'싸피 강사입니다.','2024-02-05 12:36:09','2024-02-05 12:37:15'),
(32,57,1,'서울대학교','컴퓨터공학과','email1@example.com','MALE',30000,5,'강사 김승우입니다!','2024-02-07 11:16:11','2024-02-07 13:52:49'),
(33,58,1,'고려대학교','컴퓨터공학과','email2@example.com','MALE',40000,7,'강사 황진하입니다!','2024-02-07 11:16:11','2024-02-07 18:01:34'),
(34,59,1,'연세대학교','컴퓨터공학과','email3@example.com','FEMALE',50000,9,'강사 김미서입니다!','2024-02-07 11:16:11','2024-02-07 18:01:34'),
(35,63,1,'한국과학기술원','컴퓨터공학과','email1@example.com','MALE',30000,5,'강사 김진용입니다!','2024-02-07 11:23:44','2024-02-07 18:01:34'),
(36,64,1,'포항공과대학교','컴퓨터공학과','email2@example.com','FEMALE',40000,7,'강사 강민정입니다!','2024-02-07 11:23:44','2024-02-07 18:01:34'),
(37,65,1,'서울대학교','컴퓨터공학과','email3@example.com','MALE',50000,9,'강사 신우섭입니다!','2024-02-07 11:23:44','2024-02-07 18:02:33'),
(38,69,1,'서울대학교','컴퓨터공학과','email1@example.com','MALE',30000,5,'강사 김민준입니다!','2024-02-07 11:27:23','2024-02-07 18:01:34'),
(39,70,1,'고려대학교','컴퓨터공학과','email2@example.com','FEMALE',40000,7,'강사 김은비입니다!','2024-02-07 11:27:23','2024-02-07 18:01:34'),
(40,71,1,'연세대학교','컴퓨터공학과','email3@example.com','FEMALE',50000,9,'강사 정여민입니다!','2024-02-07 11:27:23','2024-02-07 18:01:34'),
(41,75,1,'한국과학기술원','컴퓨터공학과','email1@example.com','MALE',30000,5,'강사 정필모입니다!','2024-02-07 11:30:26','2024-02-07 18:01:34'),
(42,76,1,'포항공과대학교','컴퓨터공학과','email2@example.com','FEMALE',40000,7,'강사 박세정입니다!','2024-02-07 11:30:26','2024-02-07 18:01:34'),
(43,77,1,'서울대학교','컴퓨터공학과','email3@example.com','MALE',50000,9,'강사 김성수입니다!','2024-02-07 11:30:26','2024-02-07 18:02:33'),
(44,81,1,'서울대학교','컴퓨터공학과','email1@example.com','FEMALE',30000,5,'강사 김지현입니다!','2024-02-07 11:34:46','2024-02-07 18:01:34'),
(45,82,1,'고려대학교','컴퓨터공학과','email2@example.com','FEMALE',40000,7,'강사 남수진입니다!','2024-02-07 11:34:46','2024-02-07 18:01:34'),
(46,83,1,'연세대학교','컴퓨터공학과','email3@example.com','MALE',50000,9,'강사 정승환입니다!','2024-02-07 11:34:46','2024-02-07 18:01:34'),
(47,87,1,'한국과학기술원','컴퓨터공학과','email1@example.com','MALE',30000,5,'강사 조승우입니다!','2024-02-07 12:55:51','2024-02-07 18:01:34'),
(48,88,1,'포항공과대학교','컴퓨터공학과','email2@example.com','MALE',40000,7,'강사 이상학입니다!','2024-02-07 12:55:51','2024-02-07 18:01:34'),
(49,89,1,'서울대학교','컴퓨터공학과','email3@example.com','MALE',50000,9,'강사 지인성입니다!','2024-02-07 12:55:51','2024-02-07 18:02:33'),
(50,93,1,'서울대학교','컴퓨터공학과','email1@example.com','MALE',30000,5,'강사 윤길재입니다!','2024-02-07 13:02:48','2024-02-07 18:01:34'),
(51,94,1,'고려대학교','컴퓨터공학과','email2@example.com','FEMALE',40000,7,'강사 명소이입니다!','2024-02-07 13:02:48','2024-02-07 18:01:34'),
(52,95,1,'연세대학교','컴퓨터공학과','email3@example.com','MALE',50000,9,'강사 배정훈입니다!','2024-02-07 13:02:48','2024-02-07 18:01:34'),
(53,99,1,'한국과학기술원','컴퓨터공학과','email1@example.com','MALE',30000,5,'강사 박현우입니다!','2024-02-07 13:05:09','2024-02-07 18:01:34'),
(54,100,1,'포항공과대학교','컴퓨터공학과','email2@example.com','FEMALE',40000,7,'강사 이효리입니다!','2024-02-07 13:05:09','2024-02-07 18:01:34'),
(55,101,1,'서울대학교','컴퓨터공학과','email3@example.com','FEMALE',50000,9,'강사 조은별입니다!','2024-02-07 13:05:09','2024-02-07 18:02:33'),
(56,105,1,'서울대학교','컴퓨터공학과','email1@example.com','FEMALE',30000,5,'강사 선수연입니다!','2024-02-07 13:07:25','2024-02-07 18:01:34'),
(57,106,1,'고려대학교','컴퓨터공학과','email2@example.com','MALE',40000,7,'강사 권순준입니다!','2024-02-07 13:07:25','2024-02-07 18:01:34'),
(58,107,1,'연세대학교','컴퓨터공학과','email3@example.com','MALE',50000,9,'강사 임세환입니다!','2024-02-07 13:07:25','2024-02-07 18:01:34');
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
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(41,20,14),
(42,1,15),
(43,2,15),
(44,3,15),
(49,6,32),
(50,7,32),
(51,8,32),
(52,10,33),
(53,11,33),
(54,12,33),
(55,13,33),
(56,17,34),
(57,18,34),
(58,19,34),
(59,20,34),
(60,6,35),
(61,7,35),
(62,8,35),
(63,10,36),
(64,11,36),
(65,12,36),
(66,13,36),
(67,17,37),
(68,18,37),
(69,19,37),
(70,20,37),
(71,6,38),
(72,7,38),
(73,8,38),
(74,10,39),
(75,11,39),
(76,12,39),
(77,13,39),
(78,17,40),
(79,18,40),
(80,19,40),
(81,20,40),
(84,6,41),
(85,7,41),
(86,8,41),
(87,10,42),
(88,11,42),
(89,12,42),
(90,13,42),
(91,17,43),
(92,18,43),
(93,19,43),
(94,20,43),
(95,6,44),
(96,7,44),
(97,8,44),
(98,10,45),
(99,11,45),
(100,12,45),
(101,13,45),
(102,17,46),
(103,18,46),
(104,19,46),
(105,20,46),
(106,6,47),
(107,7,47),
(108,8,47),
(109,10,48),
(110,11,48),
(111,12,48),
(112,13,48),
(113,17,49),
(114,18,49),
(115,19,49),
(116,20,49),
(117,6,50),
(118,7,50),
(119,8,50),
(120,10,51),
(121,11,51),
(122,12,51),
(123,13,51),
(124,17,52),
(125,18,52),
(126,19,52),
(127,20,52),
(128,6,53),
(129,7,53),
(130,8,53),
(131,10,54),
(132,11,54),
(133,12,54),
(134,13,54),
(135,17,55),
(136,18,55),
(137,19,55),
(138,20,55),
(139,6,56),
(140,7,56),
(141,8,56),
(142,10,57),
(143,11,57),
(144,12,57),
(145,13,57),
(146,17,58),
(147,18,58),
(148,19,58),
(149,20,58);
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
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(20,41,11,'한국지리_세계지리 교재 1','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,137,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img10.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(21,41,11,'한국지리_세계지리 교재 2','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,110,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img11.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(22,41,11,'한국지리_세계지리 교재 3','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,130,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img12.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(23,41,12,'동아시아사_세계사 교재 1','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,150,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img13.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(24,41,12,'동아시아사_세계사 교재 2','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,160,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img14.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(25,41,12,'동아시아사_세계사 교재 3','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,140,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img15.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(26,41,13,'사회문화 교재 1','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,121,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img16.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(27,41,13,'사회문화 교재 2','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,144,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img17.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(28,41,13,'사회문화 교재 3','https://d1b632bso7m0wd.cloudfront.net/2024+%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95+%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,110,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img18.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(29,42,17,'물리학 교재 1','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,130,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img19.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(30,42,17,'물리학 교재 2','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,120,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img20.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(31,42,17,'물리학 교재 3','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,140,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img21.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(32,42,18,'화학 교재 1','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,100,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img22.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(33,42,18,'화학 교재 2','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,110,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img23.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(34,42,18,'화학 교재 3','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,155,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img24.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(35,42,19,'생명과학 교재 1','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,160,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img25.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(36,42,19,'생명과학 교재 2','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,150,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img26.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(37,42,19,'생명과학 교재 3','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,120,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img27.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(38,42,20,'지구과학 교재 1','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,130,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img28.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(39,42,20,'지구과학 교재 2','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,140,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img29.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(40,42,20,'지구과학 교재 3','https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',1,151,'https://d1b632bso7m0wd.cloudfront.net/test_cover_img30.jpg',0,'2024-02-01 00:51:43','2024-02-07 13:23:56'),
(41,46,7,'수능특강국어','https://d1b632bso7m0wd.cloudfront.net/2024%20%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95%20%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8.pdf',1,240,'https://d1b632bso7m0wd.cloudfront.net/%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%ED%99%94%EB%B2%95%EA%B3%BC%EC%9E%91%EB%AC%B8_cover.png',0,'2024-02-05 12:50:04','2024-02-05 17:13:27'),
(46,46,7,'화법과작문테스트','https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 화법과작문.pdf',1,240,'https://d1b632bso7m0wd.cloudfront.net/화법과작문테스트_cover.png',0,'2024-02-05 16:59:59','2024-02-06 10:00:49'),
(53,57,7,'2024 수능특강 수학','https://d1b632bso7m0wd.cloudfront.net/EBS_2024학년도_수능특강_수학영역_수학Ⅰ.pdf',1,104,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 수학_cover.png',0,'2024-02-07 16:59:33','2024-02-07 16:59:33'),
(54,58,11,'2024 수능특강 한국지리','https://d1b632bso7m0wd.cloudfront.net/2024 수특 한국지리.pdf',1,192,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 한국지리_cover.png',0,'2024-02-07 17:01:25','2024-02-07 17:01:25'),
(55,59,17,'2024 수능특강 물리1','https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1.pdf',1,200,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1_cover.png',0,'2024-02-07 17:02:14','2024-02-07 17:02:14'),
(56,63,7,'2024 수능특강 수학','https://d1b632bso7m0wd.cloudfront.net/EBS_2024학년도_수능특강_수학영역_수학Ⅰ.pdf',1,104,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 수학_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(57,64,11,'2024 수능특강 한국지리','https://d1b632bso7m0wd.cloudfront.net/2024 수특 한국지리.pdf',1,192,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 한국지리_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(58,65,17,'2024 수능특강 물리1','https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1.pdf',1,200,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(59,69,7,'2024 수능특강 수학','https://d1b632bso7m0wd.cloudfront.net/EBS_2024학년도_수능특강_수학영역_수학Ⅰ.pdf',1,104,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 수학_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(60,70,11,'2024 수능특강 한국지리','https://d1b632bso7m0wd.cloudfront.net/2024 수특 한국지리.pdf',1,192,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 한국지리_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(61,71,17,'2024 수능특강 물리1','https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1.pdf',1,200,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(62,75,7,'2024 수능특강 수학','https://d1b632bso7m0wd.cloudfront.net/EBS_2024학년도_수능특강_수학영역_수학Ⅰ.pdf',1,104,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 수학_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(63,76,11,'2024 수능특강 한국지리','https://d1b632bso7m0wd.cloudfront.net/2024 수특 한국지리.pdf',1,192,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 한국지리_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(64,77,17,'2024 수능특강 물리1','https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1.pdf',1,200,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(65,81,7,'2024 수능특강 수학','https://d1b632bso7m0wd.cloudfront.net/EBS_2024학년도_수능특강_수학영역_수학Ⅰ.pdf',1,104,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 수학_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(66,82,11,'2024 수능특강 한국지리','https://d1b632bso7m0wd.cloudfront.net/2024 수특 한국지리.pdf',1,192,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 한국지리_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(67,83,17,'2024 수능특강 물리1','https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1.pdf',1,200,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(68,87,7,'2024 수능특강 수학','https://d1b632bso7m0wd.cloudfront.net/EBS_2024학년도_수능특강_수학영역_수학Ⅰ.pdf',1,104,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 수학_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(69,88,11,'2024 수능특강 한국지리','https://d1b632bso7m0wd.cloudfront.net/2024 수특 한국지리.pdf',1,192,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 한국지리_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(70,89,17,'2024 수능특강 물리1','https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1.pdf',1,200,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(71,93,7,'2024 수능특강 수학','https://d1b632bso7m0wd.cloudfront.net/EBS_2024학년도_수능특강_수학영역_수학Ⅰ.pdf',1,104,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 수학_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(72,94,11,'2024 수능특강 한국지리','https://d1b632bso7m0wd.cloudfront.net/2024 수특 한국지리.pdf',1,192,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 한국지리_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(73,95,17,'2024 수능특강 물리1','https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1.pdf',1,200,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(74,99,7,'2024 수능특강 수학','https://d1b632bso7m0wd.cloudfront.net/EBS_2024학년도_수능특강_수학영역_수학Ⅰ.pdf',1,104,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 수학_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(75,100,11,'2024 수능특강 한국지리','https://d1b632bso7m0wd.cloudfront.net/2024 수특 한국지리.pdf',1,192,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 한국지리_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(76,101,17,'2024 수능특강 물리1','https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1.pdf',1,200,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(77,105,7,'2024 수능특강 수학','https://d1b632bso7m0wd.cloudfront.net/EBS_2024학년도_수능특강_수학영역_수학Ⅰ.pdf',1,104,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 수학_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(78,106,11,'2024 수능특강 한국지리','https://d1b632bso7m0wd.cloudfront.net/2024 수특 한국지리.pdf',1,192,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 한국지리_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(79,107,17,'2024 수능특강 물리1','https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1.pdf',1,200,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 물리1_cover.png',0,'2024-02-07 17:12:35','2024-02-07 17:12:35'),
(80,59,18,'2024 수능특강 화학1','https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 화학Ⅰ.pdf',1,208,'https://d1b632bso7m0wd.cloudfront.net/2024 수능특강 화학1_cover.png',0,'2024-02-07 08:31:18','2024-02-07 08:31:18');
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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
(24,13,19,50000,'IN_PROGRESS',45,42,'2024-02-01 00:28:24','2024-02-01 00:28:24'),
(25,17,7,50000,'IN_PROGRESS',43,46,'2024-02-05 12:48:30','2024-02-06 09:53:09'),
(26,15,9,450000,'IN_PROGRESS',45,46,'2024-02-06 14:43:12','2024-02-06 14:43:12'),
(27,18,7,30000,'IN_PROGRESS',44,46,'2024-02-06 17:14:19','2024-02-06 17:14:19'),
(29,36,7,50000,'IN_PROGRESS',60,57,'2024-02-07 15:04:22','2024-02-07 15:04:22'),
(30,37,11,50000,'IN_PROGRESS',61,58,'2024-02-07 15:12:37','2024-02-07 15:12:37'),
(31,38,17,50000,'IN_PROGRESS',62,59,'2024-02-07 15:12:37','2024-02-07 15:12:37'),
(32,39,7,50000,'IN_PROGRESS',66,63,'2024-02-07 15:35:23','2024-02-07 15:35:23'),
(33,40,11,50000,'IN_PROGRESS',67,64,'2024-02-07 15:35:46','2024-02-07 15:35:46'),
(34,41,17,50000,'IN_PROGRESS',68,65,'2024-02-07 15:35:53','2024-02-07 15:35:53'),
(35,42,7,50000,'IN_PROGRESS',72,69,'2024-02-07 15:36:14','2024-02-07 15:36:14'),
(36,43,11,50000,'IN_PROGRESS',73,70,'2024-02-07 15:36:20','2024-02-07 15:36:20'),
(37,44,17,50000,'IN_PROGRESS',74,71,'2024-02-07 15:36:26','2024-02-07 15:36:26'),
(38,45,7,50000,'IN_PROGRESS',78,75,'2024-02-07 15:36:33','2024-02-07 15:36:33'),
(39,46,11,50000,'IN_PROGRESS',79,76,'2024-02-07 15:36:41','2024-02-07 15:36:41'),
(40,47,17,50000,'IN_PROGRESS',80,77,'2024-02-07 15:36:48','2024-02-07 15:36:48'),
(41,48,7,50000,'IN_PROGRESS',84,81,'2024-02-07 15:36:57','2024-02-07 15:36:57'),
(42,49,11,50000,'IN_PROGRESS',85,82,'2024-02-07 15:37:03','2024-02-07 15:37:03'),
(43,50,17,50000,'IN_PROGRESS',86,83,'2024-02-07 15:37:10','2024-02-07 15:37:10'),
(44,51,7,50000,'IN_PROGRESS',90,87,'2024-02-07 15:37:17','2024-02-07 15:37:17'),
(45,52,11,50000,'IN_PROGRESS',91,88,'2024-02-07 15:37:23','2024-02-07 15:37:23'),
(46,53,17,50000,'IN_PROGRESS',92,89,'2024-02-07 15:37:29','2024-02-07 15:37:29'),
(47,54,7,50000,'IN_PROGRESS',96,93,'2024-02-07 15:37:37','2024-02-07 15:37:37'),
(48,55,11,50000,'IN_PROGRESS',97,94,'2024-02-07 15:37:44','2024-02-07 15:37:44'),
(49,56,17,50000,'IN_PROGRESS',98,95,'2024-02-07 15:37:51','2024-02-07 15:37:51'),
(50,57,7,50000,'IN_PROGRESS',102,99,'2024-02-07 15:37:59','2024-02-07 15:37:59'),
(51,58,11,50000,'IN_PROGRESS',103,100,'2024-02-07 15:38:08','2024-02-07 15:38:08'),
(52,59,17,50000,'IN_PROGRESS',104,101,'2024-02-07 15:38:15','2024-02-07 15:38:15'),
(53,60,7,50000,'IN_PROGRESS',108,105,'2024-02-07 15:38:22','2024-02-07 15:38:22'),
(54,61,11,50000,'IN_PROGRESS',109,106,'2024-02-07 15:38:30','2024-02-07 15:38:30'),
(55,62,17,50000,'IN_PROGRESS',110,107,'2024-02-07 15:38:37','2024-02-07 15:38:37');
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
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutoring_schedule`
--

LOCK TABLES `tutoring_schedule` WRITE;
/*!40000 ALTER TABLE `tutoring_schedule` DISABLE KEYS */;
INSERT INTO `tutoring_schedule` (`id`, `tutoring_id`, `schedule_date`, `start_time`, `duration`, `title`, `updated_at`, `created_at`) VALUES (34,17,'2024-02-01','18:30:00',60,'현대 시','2024-02-07 14:10:10','2024-02-01 00:40:03'),
(35,17,'2024-02-02','00:00:00',60,'글쓰기 기초와 표현','2024-02-01 15:01:33','2024-02-01 00:40:03'),
(36,17,'2024-02-03','00:00:00',60,'한국어 문학과 작품 분석','2024-02-01 15:01:33','2024-02-01 00:40:03'),
(37,17,'2024-02-04','00:00:00',60,'문자와 단어의 의미','2024-02-01 15:01:33','2024-02-01 00:40:03'),
(38,17,'2024-02-05','00:00:00',60,'형용사와 부사 활용법','2024-02-01 15:01:33','2024-02-01 00:40:03'),
(39,17,'2024-02-06','00:00:00',60,'문학 작품 비교 분석','2024-02-01 15:01:33','2024-02-01 00:40:03'),
(40,17,'2024-02-07','00:00:00',60,'말하는 미술: 수사와 표현','2024-02-01 15:01:33','2024-02-01 00:40:03'),
(41,17,'2024-02-08','00:00:00',60,'형용사와 부사의 다양한 사용법','2024-02-01 15:01:33','2024-02-01 00:40:03'),
(42,17,'2024-02-09','00:00:00',60,'문학 작품 해석과 비평','2024-02-01 15:01:33','2024-02-01 00:40:03'),
(43,17,'2024-02-10','00:00:00',60,'문학적 표현의 다양성','2024-02-01 15:01:33','2024-02-01 00:40:03'),
(49,18,'2024-02-01','00:00:00',90,'수학의 기초 개념','2024-02-01 15:03:17','2024-02-01 00:40:03'),
(50,18,'2024-02-02','00:00:00',90,'수학 문제 해결 능력 향상','2024-02-01 15:03:17','2024-02-01 00:40:03'),
(51,18,'2024-02-03','00:00:00',90,'수학 실습과 응용','2024-02-01 15:03:17','2024-02-01 00:40:03'),
(52,18,'2024-02-04','00:00:00',90,'수학의 역사와 발전','2024-02-01 15:03:17','2024-02-01 00:40:03'),
(53,18,'2024-02-05','00:00:00',90,'수학적 모델링','2024-02-01 15:03:17','2024-02-01 00:40:03'),
(54,18,'2024-02-06','00:00:00',90,'수학 문제 해결 전략','2024-02-01 15:03:17','2024-02-01 00:40:03'),
(55,18,'2024-02-07','00:00:00',90,'수학과 과학의 연관성','2024-02-01 15:03:17','2024-02-01 00:40:03'),
(56,18,'2024-02-08','00:00:00',90,'수학적 사고와 논리','2024-02-01 15:03:17','2024-02-01 00:40:03'),
(57,18,'2024-02-09','00:00:00',90,'수학 공식과 정리','2024-02-01 15:03:17','2024-02-01 00:40:03'),
(58,18,'2024-02-10','00:00:00',90,'수학적 증명과 이론','2024-02-01 15:03:17','2024-02-01 00:40:03'),
(64,19,'2024-02-01','00:00:00',60,'윤리와 생활','2024-02-01 15:04:30','2024-02-01 00:40:04'),
(65,19,'2024-02-02','00:00:00',60,'생활과 윤리의 기초','2024-02-01 15:04:30','2024-02-01 00:40:04'),
(66,19,'2024-02-03','00:00:00',60,'윤리적 판단과 의사결정','2024-02-01 15:04:30','2024-02-01 00:40:04'),
(67,19,'2024-02-04','00:00:00',60,'윤리적 가치와 도덕적 행동','2024-02-01 15:04:30','2024-02-01 00:40:04'),
(68,19,'2024-02-05','00:00:00',60,'윤리적 논쟁과 논리','2024-02-01 15:04:30','2024-02-01 00:40:04'),
(69,19,'2024-02-06','00:00:00',60,'사회 윤리와 정치 윤리','2024-02-01 15:04:30','2024-02-01 00:40:04'),
(70,19,'2024-02-07','00:00:00',60,'윤리적 갈등 해결','2024-02-01 15:04:30','2024-02-01 00:40:04'),
(71,19,'2024-02-08','00:00:00',60,'윤리적 선택과 도덕적 책임','2024-02-01 15:04:30','2024-02-01 00:40:04'),
(72,19,'2024-02-09','00:00:00',60,'윤리적 이해와 응용','2024-02-01 15:04:30','2024-02-01 00:40:04'),
(73,19,'2024-02-10','00:00:00',60,'윤리와 생활의 관련성','2024-02-01 15:04:30','2024-02-01 00:40:04'),
(79,20,'2024-02-01','00:00:00',90,'한국지리의 기초','2024-02-01 15:05:46','2024-02-01 00:40:04'),
(80,20,'2024-02-02','00:00:00',90,'지형과 지리적 특성','2024-02-01 15:05:46','2024-02-01 00:40:04'),
(81,20,'2024-02-03','00:00:00',90,'한국의 지리적 분포','2024-02-01 15:05:46','2024-02-01 00:40:04'),
(82,20,'2024-02-04','00:00:00',90,'세계 지리와 문화','2024-02-01 15:05:46','2024-02-01 00:40:04'),
(83,20,'2024-02-05','00:00:00',90,'지리적 현상과 영향','2024-02-01 15:05:46','2024-02-01 00:40:04'),
(84,20,'2024-02-06','00:00:00',90,'지리적 정보와 분석','2024-02-01 15:05:46','2024-02-01 00:40:04'),
(85,20,'2024-02-07','00:00:00',90,'세계의 지리적 특성','2024-02-01 15:05:46','2024-02-01 00:40:04'),
(86,20,'2024-02-08','00:00:00',90,'문화와 환경','2024-02-01 15:05:46','2024-02-01 00:40:04'),
(87,20,'2024-02-09','00:00:00',90,'지리적 문제와 도전','2024-02-01 15:05:46','2024-02-01 00:40:04'),
(88,20,'2024-02-10','00:00:00',90,'지리학적 시각과 이해','2024-02-01 15:05:46','2024-02-01 00:40:04'),
(94,21,'2024-02-01','00:00:00',120,'동아시아사의 기초','2024-02-01 15:06:42','2024-02-01 00:40:04'),
(95,21,'2024-02-02','00:00:00',120,'동아시아의 역사적 변천','2024-02-01 15:06:42','2024-02-01 00:40:04'),
(96,21,'2024-02-03','00:00:00',120,'동아시아 문화와 예술','2024-02-01 15:06:42','2024-02-01 00:40:04'),
(97,21,'2024-02-04','00:00:00',120,'동아시아의 정치와 사회','2024-02-01 15:06:42','2024-02-01 00:40:04'),
(98,21,'2024-02-05','00:00:00',120,'동아시아의 경제와 무역','2024-02-01 15:06:42','2024-02-01 00:40:04'),
(99,21,'2024-02-06','00:00:00',120,'동아시아와 세계 역사의 상호작용','2024-02-01 15:06:42','2024-02-01 00:40:04'),
(100,21,'2024-02-07','00:00:00',120,'세계사의 이해와 연구 방법','2024-02-01 15:06:42','2024-02-01 00:40:04'),
(101,21,'2024-02-08','00:00:00',120,'세계 역사의 주요 사건과 인물','2024-02-01 15:06:42','2024-02-01 00:40:04'),
(102,21,'2024-02-09','00:00:00',120,'세계 역사와 문화적 다양성','2024-02-01 15:06:42','2024-02-01 00:40:04'),
(103,21,'2024-02-10','00:00:00',120,'세계사의 현대적 관점','2024-02-01 15:06:42','2024-02-01 00:40:04'),
(109,22,'2024-02-01','00:00:00',60,'물리학의 기초 개념','2024-02-01 15:08:04','2024-02-01 00:40:04'),
(110,22,'2024-02-02','00:00:00',60,'운동과 역학','2024-02-01 15:08:04','2024-02-01 00:40:04'),
(111,22,'2024-02-03','00:00:00',60,'열과 열역학','2024-02-01 15:08:04','2024-02-01 00:40:04'),
(112,22,'2024-02-04','00:00:00',60,'전기와 자기','2024-02-01 15:08:04','2024-02-01 00:40:04'),
(113,22,'2024-02-05','00:00:00',60,'물리학적 파동과 음향','2024-02-01 15:08:04','2024-02-01 00:40:04'),
(114,22,'2024-02-06','00:00:00',60,'광학과 광전자학','2024-02-01 15:08:04','2024-02-01 00:40:04'),
(115,22,'2024-02-07','00:00:00',60,'원자와 분자','2024-02-01 15:08:04','2024-02-01 00:40:04'),
(116,22,'2024-02-08','00:00:00',60,'물리학적 시스템과 고체 상태','2024-02-01 15:08:04','2024-02-01 00:40:04'),
(117,22,'2024-02-09','00:00:00',60,'물리학적 현상과 과학적 이론','2024-02-01 15:08:04','2024-02-01 00:40:04'),
(118,22,'2024-02-10','00:00:00',60,'물리학의 응용 분야','2024-02-01 15:08:04','2024-02-01 00:40:04'),
(124,23,'2024-02-01','00:00:00',90,'화학의 기초 개념','2024-02-01 15:09:00','2024-02-01 00:40:04'),
(125,23,'2024-02-02','00:00:00',90,'원자와 원소','2024-02-01 15:09:00','2024-02-01 00:40:04'),
(126,23,'2024-02-03','00:00:00',90,'화학의 주기성','2024-02-01 15:09:00','2024-02-01 00:40:04'),
(127,23,'2024-02-04','00:00:00',90,'분자와 화합물','2024-02-01 15:09:00','2024-02-01 00:40:04'),
(128,23,'2024-02-05','00:00:00',90,'화학 반응과 반응속도','2024-02-01 15:09:00','2024-02-01 00:40:04'),
(129,23,'2024-02-06','00:00:00',90,'열과 엔트로피','2024-02-01 15:09:00','2024-02-01 00:40:04'),
(130,23,'2024-02-07','00:00:00',90,'화학 평형과 평형상태','2024-02-01 15:09:00','2024-02-01 00:40:04'),
(131,23,'2024-02-08','00:00:00',90,'산업 및 환경 화학','2024-02-01 15:09:00','2024-02-01 00:40:04'),
(132,23,'2024-02-09','00:00:00',90,'화학과 생명과학','2024-02-01 15:09:00','2024-02-01 00:40:04'),
(133,23,'2024-02-10','00:00:00',90,'화학 연구와 응용','2024-02-01 15:09:00','2024-02-01 00:40:04'),
(139,24,'2024-02-01','00:00:00',120,'생명과학의 기초 개념','2024-02-01 15:09:54','2024-02-01 00:40:04'),
(140,24,'2024-02-02','00:00:00',120,'세포와 세포 생물학','2024-02-01 15:09:54','2024-02-01 00:40:04'),
(141,24,'2024-02-03','00:00:00',120,'유전자와 유전학','2024-02-01 15:09:54','2024-02-01 00:40:04'),
(142,24,'2024-02-04','00:00:00',120,'생명의 다양성과 분류','2024-02-01 15:09:54','2024-02-01 00:40:04'),
(143,24,'2024-02-05','00:00:00',120,'동물 생리학과 동물 행동','2024-02-01 15:09:54','2024-02-01 00:40:04'),
(144,24,'2024-02-06','00:00:00',120,'식물 생리학과 식물 생태학','2024-02-01 15:09:54','2024-02-01 00:40:04'),
(145,24,'2024-02-07','00:00:00',120,'생명의 진화와 형태학','2024-02-01 15:09:54','2024-02-01 00:40:04'),
(146,24,'2024-02-08','00:00:00',120,'생물학적 연구 방법과 실험','2024-02-01 15:09:54','2024-02-01 00:40:04'),
(147,24,'2024-02-09','00:00:00',120,'생명과학과 환경 상호작용','2024-02-01 15:09:54','2024-02-01 00:40:04'),
(148,24,'2024-02-10','00:00:00',120,'생명과학의 응용 분야','2024-02-01 15:09:54','2024-02-01 00:40:04'),
(154,19,'2024-02-08','18:30:00',60,'오늘 모먹지','2024-02-06 04:51:12','2024-02-06 04:51:12'),
(155,27,'2024-02-06','18:30:00',120,'집합의 개념','2024-02-06 17:17:37','2024-02-06 17:17:37'),
(156,27,'2024-02-07','18:30:00',120,'고등어 수학','2024-02-06 17:18:23','2024-02-06 17:18:23'),
(157,27,'2024-02-08','18:30:00',120,'수학의 정석','2024-02-06 17:19:10','2024-02-06 17:19:10'),
(158,27,'2024-02-09','18:20:00',120,'적분 마스터 특강','2024-02-06 17:20:48','2024-02-06 17:19:22'),
(165,21,'2024-02-07','18:30:00',60,'시험 3일전 수업','2024-02-07 11:24:21','2024-02-07 11:24:21'),
(166,21,'2024-03-01','18:30:00',60,'시험 3일전 수업','2024-02-07 11:24:21','2024-02-07 11:24:21');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` (`id`, `tutoring_schedule_id`, `video_url`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES (1,34,'https://d1b632bso7m0wd.cloudfront.net/vod/N8ECzA9p4xSH/N8ECzA9p4xSH.m3u8','17:59:03','20:00:18','2024-01-10 17:59:03','2024-02-06 17:22:09'),
(2,34,'https://d1b632bso7m0wd.cloudfront.net/vod/N8ECzA9p4xSH/N8ECzA9p4xSH.m3u8','17:05:04','19:03:21','2024-01-20 17:05:04','2024-02-06 17:22:12'),
(3,155,'https://d1b632bso7m0wd.cloudfront.net/vod/allaV9Nkz243/allaV9Nkz243.m3u8','17:39:51','17:46:25','2024-02-06 17:39:51','2024-02-06 17:51:26'),
(4,64,NULL,'05:00:36',NULL,'2024-02-08 05:00:36','2024-02-08 05:00:36'),
(5,64,NULL,'05:03:58',NULL,'2024-02-08 05:03:58','2024-02-08 05:03:58'),
(6,64,NULL,'05:09:11',NULL,'2024-02-08 05:09:11','2024-02-08 05:09:11'),
(7,79,NULL,'20:17:39',NULL,'2024-02-07 20:17:39','2024-02-07 20:17:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_room`
--

LOCK TABLES `video_room` WRITE;
/*!40000 ALTER TABLE `video_room` DISABLE KEYS */;
INSERT INTO `video_room` (`id`, `tutoring_schedule_id`, `room_code`, `created_at`, `updated_at`) VALUES (1,157,'b87c36a3-4be9-4efc-926c-8de1edab42ad','2024-02-08 00:15:06','2024-02-08 00:15:06'),
(2,86,'586887bf-8d3f-4350-b4a9-0af204381c7c','2024-02-08 00:15:12','2024-02-08 00:15:12'),
(3,131,'9e01fae5-07f6-4156-b75e-8645a63c1d0a','2024-02-08 00:17:23','2024-02-08 00:17:23');
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

-- Dump completed on 2024-02-08  9:19:24
