-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 05, 2018 at 04:28 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `lastUpdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `isbn` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` varchar(4) NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `isbn`, `name`, `year`, `author`, `description`, `image`, `createdAt`, `updatedAt`) VALUES
(1, '9781785883262', 'Android Programming for Beginnerst', '2015', 'John Horton', 'Learn Android application development with this accessible tutorial that takes you through Android and Java programming with practical and actionable steps.', '419c152f3fad5c31c844686310fb1ac2.jpg', '2018-04-22 13:57:30', '2018-06-15 17:10:41'),
(2, '9781787121799', 'Practical Game Design', '2018', 'Adam Kramarzewski, Ennio De Nucci', 'Design accessible and creative games across genres, platforms, and development realities', 'B06082.png', '0000-00-00 00:00:00', '2018-04-22 13:57:30'),
(3, '9781788293631', 'Learn Node.js by Building 6 Projects', '2018', 'Eduonix Learning Solutions', 'This is an advanced, practical guide to harnessing the power of Node.js by creating 6 full-scale real-world projects, from creating a chat application to an eLearning system.', 'B07858_cover.png', '2018-04-22 13:57:14', '2018-04-22 13:57:14'),
(17, '9781785283109', 'Multiplayer Game Development with HTML5', '2015', 'Rodrigo Silveira', 'Build fully-featured, highly interactive multiplayer games with HTML5', '3109OS_Multiplayer Game Development with HTML5.jpg', '2018-04-23 18:46:36', '2018-04-23 18:46:36'),
(18, '9781788299954', 'Integrating Twitter and Facebook into Your iOS Apps', '2018', 'Nick Walter', 'Learn how to integrate Twitter and Facebook APIs into iOS apps', 'V07323_low.png', '2018-04-23 18:47:04', '2018-04-23 18:47:04'),
(19, '21212121', 'Android 101: How To Make Android Apps for Lazy People', '2018', 'Buda Suyasa', 'Build Android application in no time with without reinventing +the wheels, by using various existing Android Library. Great book for lazy people', '9a6cc6f1a5ddeb3913c749bc86a1bae5.jpeg', '2018-06-23 10:53:30', '2018-06-23 10:53:51');

-- --------------------------------------------------------

--
-- Table structure for table `peminjaman`
--

CREATE TABLE `peminjaman` (
  `id` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `nama` varchar(60) NOT NULL,
  `lamaPinjam` tinyint(4) NOT NULL,
  `tanggalPinjam` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `peminjaman`
--

INSERT INTO `peminjaman` (`id`, `bookId`, `nama`, `lamaPinjam`, `tanggalPinjam`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Buda', 2, '2018-07-05 12:58:01', '2018-07-05 12:58:01', '2018-07-05 12:58:01'),
(3, 3, 'agus', 2, '2018-07-05 13:32:52', '2018-07-05 13:32:52', '2018-07-05 13:32:52'),
(4, 19, 'Andi ', 6, '2018-07-05 13:33:22', '2018-07-05 13:33:22', '2018-07-05 13:33:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `peminjaman`
--
ALTER TABLE `peminjaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
