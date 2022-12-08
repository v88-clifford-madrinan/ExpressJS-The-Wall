/*
SQLyog Enterprise - MySQL GUI v8.12 
MySQL - 5.7.36 : Database - the_wall_record
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`the_wall_record` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `the_wall_record`;

/*Table structure for table `comments` */

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `comment` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

/*Data for the table `comments` */

insert  into `comments`(`id`,`user_id`,`message_id`,`comment`,`created_at`,`updated_at`) values (1,1,4,'First comment!','2022-12-08 09:08:42',NULL),(2,1,4,'second comment','2022-12-08 09:16:45',NULL),(3,1,4,'Hello!','2022-12-08 09:16:48',NULL),(4,1,3,'Testing comment #1','2022-12-08 09:19:30',NULL),(5,1,3,'Testing comment #2','2022-12-08 09:19:42',NULL),(6,1,2,'Another Test','2022-12-08 09:19:48',NULL),(8,2,7,'may per koment','2022-12-08 09:54:50',NULL);

/*Table structure for table `messages` */

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `messages` */

insert  into `messages`(`id`,`user_id`,`message`,`created_at`,`updated_at`) values (6,2,'Test','2022-12-08 09:52:57',NULL),(2,1,'Testing message','2022-12-08 07:58:29',NULL),(3,1,'Test','2022-12-08 08:22:49',NULL),(4,1,'Test 123','2022-12-08 08:23:37',NULL),(7,2,'My pers blog','2022-12-08 09:54:38',NULL);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`first_name`,`last_name`,`email`,`password`,`created_at`,`updated_at`) values (1,'John Clifford','Madriñan','clifford@example.com','$2a$10$H2LoICeM3a1Bke6kCeFbIu0IWKHuW75gc1lHSlJsR1IH6xfPAsOt6','2022-12-08 07:10:53',NULL),(2,'John','Doe','johndoe@example.com','$2a$10$ZKk4HzMkrarebCi8P5c54.LDTRR39YpGNIzc.caqEYBlkPkAc/SYa','2022-12-08 09:45:38',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
