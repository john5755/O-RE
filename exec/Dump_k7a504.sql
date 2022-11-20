-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: k7a504.p.ssafy.io    Database: oredb
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content_value` longtext COLLATE utf8mb4_unicode_ci,
  `is_table` bit(1) NOT NULL,
  `page_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1lv6h7cjxydrlm7fjy8ncp75k` (`page_id`),
  CONSTRAINT `FK1lv6h7cjxydrlm7fjy8ncp75k` FOREIGN KEY (`page_id`) REFERENCES `page` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page`
--

DROP TABLE IF EXISTS `page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `team_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpuhg4kfji38yx2mu2q36jddsh` (`team_id`),
  CONSTRAINT `FKpuhg4kfji38yx2mu2q36jddsh` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page`
--

LOCK TABLES `page` WRITE;
/*!40000 ALTER TABLE `page` DISABLE KEYS */;
/*!40000 ALTER TABLE `page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_user`
--

DROP TABLE IF EXISTS `page_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `page_user_role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK63gg97xjdykm7yavv5lq1ttkj` (`page_id`),
  KEY `FKdbrkjlst22ybboih853p8u6y6` (`user_id`),
  CONSTRAINT `FK63gg97xjdykm7yavv5lq1ttkj` FOREIGN KEY (`page_id`) REFERENCES `page` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKdbrkjlst22ybboih853p8u6y6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_user`
--

LOCK TABLES `page_user` WRITE;
/*!40000 ALTER TABLE `page_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'https://ore-s3.s3.ap-northeast-2.amazonaws.com/team/TeamDefaultImg.png','사업기획'),(2,'https://ore-s3.s3.ap-northeast-2.amazonaws.com/team/ore_2022-11-18-02-19-52-519_iu.jpg','아이유');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_user`
--

DROP TABLE IF EXISTS `team_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `team_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiuwi96twuthgvhnarqj34mnjv` (`team_id`),
  KEY `FK6w6lkqjk13n0nmf4jbnb3d376` (`user_id`),
  CONSTRAINT `FK6w6lkqjk13n0nmf4jbnb3d376` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FKiuwi96twuthgvhnarqj34mnjv` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_user`
--

LOCK TABLES `team_user` WRITE;
/*!40000 ALTER TABLE `team_user` DISABLE KEYS */;
INSERT INTO `team_user` VALUES (1,'OWNER',1,1),(2,'LEADER',1,3),(3,'MEMBER',1,9),(4,'MEMBER',1,10),(5,'MEMBER',1,11),(6,'MEMBER',1,12),(7,'MEMBER',1,13),(8,'MEMBER',1,14),(9,'OWNER',2,1),(10,'MEMBER',2,17),(11,'MEMBER',2,18),(12,'MEMBER',2,19),(13,'MEMBER',2,20),(14,'MEMBER',2,21);
/*!40000 ALTER TABLE `team_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'john5755@naver.com','테스트','테스트','$2a$10$szx1yr3mA3aIhZVzhBIVX.JXydVPeVWAWfClF1vqXCtFvZuaXk9kK','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','OWNER'),(2,'test1@naver.com','테스트1','테스트1','$2a$10$uyV2M0.kM2Wu43/WxdSimunFIOqfIKZ3ae7pHy2GgNTpZxyGw7Exa','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','ADMIN'),(3,'test2@naver.com','테스트2','테스트2','$2a$10$DuDYnN0NtLU9oKB7cmAsR.cxgAJCrCU/MSDVmAh/tQnNfpyRXhIta','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','ADMIN'),(4,'test3@naver.com','테스트3','테스트3','$2a$10$ySTMLiWg95emOE4gVZ9vx.L.xAqnaG/KEbwDg6vfY0TGTxPPA.6f2','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','ADMIN'),(5,'test4@naver.com','테스트4','테스트4','$2a$10$p2AJ3vs7kR3kHweVXu3PeuvQGETqIqz70AxtKnAlLRQ.ipTiFzvZG','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','ADMIN'),(6,'test5@naver.com','테스트5','테스트5','$2a$10$u7V7IbnCSag4JltRmKDDT.5RNhNKGxUnbzfAFFx6.q9dLlqqd0cum','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(7,'test6@naver.com','테스트6','테스트6','$2a$10$thVIPQvOn6oidjqk6Gmch.1mLJZljLc6sk2spo1vqd2Fl5s7M.U7e','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(8,'test7@naver.com','테스트7','테스트7','$2a$10$wr7Qka6PTLYVbhsIHgSvi.jtEAp8uTYIknHv.7CCKCauF.vOex2Gq','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(9,'test8@naver.com','테스트8','테스트8','$2a$10$EmIY8sS7Qacd1lbPY/bzXukEOBVHN5IhuXuqNbO6fPivK52Mkapdu','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(10,'test9@naver.com','테스트9','테스트9','$2a$10$6fvDJqZuov7n7HraUn/j4.S4CIQwggA9cSrqSEh9HQpdZC7ECEX3a','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(11,'test10@naver.com','테스트10','테스트10','$2a$10$Hg0LpRo9OU1shFJCF3nkC.RfkjiOJ11C7ft2bJ/9SxoS3cCWSBe3.','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(12,'test11@naver.com','테스트11','테스트11','$2a$10$kt4eYNelFRj0fh3Sg9X8tOYkFKXx.QpNG8TjI7DMo/g7bh68Lq7/q','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(13,'test12@naver.com','테스트12','테스트12','$2a$10$X.OW0bB72qVjLVngSJS6z.iTL.I/ZAwQLjHzG3AiDfgDn/3MZIcTu','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(14,'test13@naver.com','테스트13','테스트13','$2a$10$ZjWg6dXGboQ1rn75bAzBcelxUe0bSi3R432sYdJ2MXa9CGHrFRJB2','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(15,'test14@naver.com','테스트14','테스트14','$2a$10$CnJMpEchFTZD0oJYtclqaeKqrrJExgPyYurE54RpBy2xdLI3GqJg2','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(16,'test15@naver.com','테스트15','테스트15','$2a$10$hhW8pUZKJs6l0MihVZ7RLuatx7.7b8d.r1H44QESqnOvFn24cUJZO','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(17,'test16@naver.com','테스트16','테스트16','$2a$10$7DBmGuJYnb26fp3WLJ3hMeFqzlIlvHVNhNV3o/8k2ReuEmyyn28ea','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(18,'test17@naver.com','테스트17','테스트17','$2a$10$Yo7/v.CVsgc6lcCCAptnKuB9FDyU7q97VouM1pea6OjbEN/pjbzY.','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(19,'test18@naver.com','테스트18','테스트18','$2a$10$tV3BdSHvuheo9POgEJCWue6ZGDSsQJSk6vtsiZjo38SzSXFMkQHD6','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(20,'test19@naver.com','테스트19','테스트19','$2a$10$hMVZW63kG0xcok2rTZ67heTE5J0xq9sqwHj42nxvfblNWDhDaNuIu','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(21,'test20@naver.com','테스트20','테스트20','$2a$10$oLfuyE04Jw/qd8w27LaJUezPjEF1pZTkSGRSs4cSqhPU7i3LOauCS','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(22,'test21@naver.com','테스트21','테스트21','$2a$10$gCzLnZZSiezUO2iLtj1b/OEPzkwugCeTQfYcGk22t/A7yHKjmkGwC','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(23,'test22@naver.com','테스트22','테스트22','$2a$10$e4BQ6TJJOWHXINBtOoAa8OLS9cHgqhFgOvyXww4SodrwARV.jdNWS','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(24,'test23@naver.com','테스트23','테스트23','$2a$10$sHMVc6X6XPADqKiZP9SniehsUcvik7Lb3C7tFPqSVF1zDiVvg4sp6','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(25,'test24@naver.com','테스트24','테스트24','$2a$10$Ryy6mr5EyLhHwTpES1.eDuTHIukjylsCL5/f8syBcQXXnIbW1YrVm','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(26,'test25@naver.com','테스트25','테스트25','$2a$10$XnILeEonq5FrtgfyZumTnOdQx5XUupwQwedHzD8WqPZqc3mc8B06q','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(27,'test26@naver.com','테스트26','테스트26','$2a$10$tKtkFiiFxLc7BXBAWa0nEOh3Wl1Z3XtKR49wXwsZfKmYKBtrFAfYy','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(28,'test27@naver.com','테스트27','테스트27','$2a$10$Pmg3UvgdSdhCZOgITNx/vOvQRlFFfbMX2y4z6sewzuYufwrJko3xa','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(29,'test28@naver.com','테스트28','테스트28','$2a$10$Pf90WSSQIybhKwetpbVN6uAVrYASr2RNvtLYSyBR4WNcdUY2tR1ba','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(30,'test29@naver.com','테스트29','테스트29','$2a$10$zHskgknVf1nKEAf2Y2SDluJt8Ayu.ioBpMcS0aQVQw21q7.INE.mO','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER'),(31,'john5755@hanmail.net','비번','비번','$2a$10$ZhamryGHN0aHD3nNEprL0ul.4j6qTbrpHCFIfp8YfRNC1TRSVvrOO','https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/UserDefault.png','USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_input`
--

DROP TABLE IF EXISTS `user_input`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_input` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `input_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `input_value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page_id` bigint DEFAULT NULL,
  `page_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK96nav1spvjmmtcqop5ut0oq00` (`page_id`),
  KEY `FK6xqlmoej3973egr8d89e9j8t9` (`page_user_id`),
  CONSTRAINT `FK6xqlmoej3973egr8d89e9j8t9` FOREIGN KEY (`page_user_id`) REFERENCES `page_user` (`id`),
  CONSTRAINT `FK96nav1spvjmmtcqop5ut0oq00` FOREIGN KEY (`page_id`) REFERENCES `page` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_input`
--

LOCK TABLES `user_input` WRITE;
/*!40000 ALTER TABLE `user_input` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_input` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-18 22:26:32
