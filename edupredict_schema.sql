-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2026
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edupredict`
--

-- --------------------------------------------------------
--
-- Table structure for table `academic_records`
--

CREATE TABLE `academic_records` (
  `id`                       int(10) UNSIGNED NOT NULL,
  `student_id`               int(10) UNSIGNED NOT NULL,
  `hours_studied`            int(11) NOT NULL,
  `attendance`               int(11) NOT NULL,
  `parental_involvement`     varchar(20) NOT NULL,
  `access_to_resources`      varchar(20) NOT NULL,
  `sleep_hours`              int(11) NOT NULL,
  `previous_scores`          int(11) NOT NULL,
  `motivation_level`         varchar(20) NOT NULL,
  `internet_access`          varchar(10) NOT NULL,
  `tutoring_sessions`        int(11) NOT NULL,
  `family_income`            varchar(20) NOT NULL,
  `teacher_quality`          varchar(20) NOT NULL,
  `peer_influence`           varchar(20) NOT NULL,
  `physical_activity`        int(11) NOT NULL,
  `parental_education_level` varchar(50) NOT NULL,
  `recorded_at`              timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id`            int(10) UNSIGNED NOT NULL,
  `user_id`       int(10) UNSIGNED NOT NULL,
  `student_id`    int(10) UNSIGNED DEFAULT NULL,
  `prediction_id` int(10) UNSIGNED DEFAULT NULL,
  `title`         varchar(100) NOT NULL,
  `message`       text NOT NULL,
  `type`          enum('High','Medium','Low','Info') DEFAULT 'Info',
  `is_read`       tinyint(1) DEFAULT 0,
  `created_at`    timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Table structure for table `predictions`
--

CREATE TABLE `predictions` (
  `id`                  int(10) UNSIGNED NOT NULL,
  `student_id`          int(10) UNSIGNED NOT NULL,
  `academic_record_id`  int(10) UNSIGNED NOT NULL,
  `risk_category`       enum('Low','Medium','High') NOT NULL,
  `confidence`          decimal(5,2) DEFAULT NULL,
  `probabilities`       text DEFAULT NULL,
  `risk_factors`        text DEFAULT NULL,
  `recommendations`     text DEFAULT NULL,
  `raw_input`           text DEFAULT NULL,
  `created_at`          timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id`                       int(10) UNSIGNED NOT NULL,
  `user_id`                  int(10) UNSIGNED DEFAULT NULL,
  `nisn`                     varchar(20) NOT NULL,
  `nama_siswa`               varchar(100) NOT NULL,
  `kelas`                    varchar(50) NOT NULL,
  `gender`                   enum('Male','Female') NOT NULL,
  `school_type`              enum('Public','Private') NOT NULL,
  `distance_from_home`       enum('Near','Moderate','Far') NOT NULL,
  `parental_education_level` enum('High School','College','Postgraduate') NOT NULL,
  `learning_disabilities`    enum('Yes','No') NOT NULL DEFAULT 'No',
  `created_at`               timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at`               timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Table structure for table `users`
-- Kolom nip s/d foto_profil ditambahkan untuk fitur profil guru
--

CREATE TABLE `users` (
  `id`                  int(10) UNSIGNED NOT NULL,
  `nama`                varchar(100) NOT NULL,
  `email`               varchar(100) NOT NULL,
  `password_hash`       varchar(255) NOT NULL,
  `role`                enum('guru','siswa') NOT NULL DEFAULT 'siswa',
  `nip`                 varchar(30) NULL DEFAULT NULL,
  `nuptk`               varchar(30) NULL DEFAULT NULL,
  `ttl`                 varchar(100) NULL DEFAULT NULL,
  `pendidikan_terakhir` varchar(100) NULL DEFAULT NULL,
  `no_hp`               varchar(20) NULL DEFAULT NULL,
  `alamat`              text NULL DEFAULT NULL,
  `nama_sekolah`        varchar(150) NULL DEFAULT NULL,
  `school_type`         enum('Public','Private') NULL DEFAULT NULL,
  `kelas`               varchar(50) NULL DEFAULT NULL,
  `jenjang`             varchar(50) NULL DEFAULT NULL,
  `foto_profil`         varchar(255) NULL DEFAULT NULL,
  `created_at`          timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at`          timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

ALTER TABLE `academic_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_academic_student` (`student_id`);

ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notification_user` (`user_id`),
  ADD KEY `fk_notification_student` (`student_id`),
  ADD KEY `fk_notification_prediction` (`prediction_id`);

ALTER TABLE `predictions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_prediction_student` (`student_id`),
  ADD KEY `fk_prediction_academic` (`academic_record_id`);

ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nisn` (`nisn`),
  ADD KEY `idx_students_nisn` (`nisn`),
  ADD KEY `idx_students_user_id` (`user_id`),
  ADD KEY `idx_students_kelas` (`kelas`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_email` (`email`),
  ADD KEY `idx_users_role` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

ALTER TABLE `academic_records`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `predictions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `students`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

ALTER TABLE `academic_records`
  ADD CONSTRAINT `fk_academic_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notification_prediction` FOREIGN KEY (`prediction_id`) REFERENCES `predictions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_notification_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_notification_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `predictions`
  ADD CONSTRAINT `fk_prediction_academic` FOREIGN KEY (`academic_record_id`) REFERENCES `academic_records` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_prediction_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

ALTER TABLE `students`
  ADD CONSTRAINT `fk_students_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
