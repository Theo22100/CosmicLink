-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 01, 2023 at 05:59 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projet`
--

-- --------------------------------------------------------

--
-- Table structure for table `ami`
--

CREATE TABLE `ami` (
  `id_amitie` int(11) NOT NULL,
  `id_membre1` int(11) NOT NULL,
  `id_membre2` int(11) NOT NULL,
  `statut` varchar(1) NOT NULL DEFAULT 'E'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id_chat` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `content` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `timesent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id_chat`, `sender`, `receiver`, `content`, `status`, `timesent`) VALUES
(1, 89, 74, 'Hey admin ! Got a problem!', 1, '2023-06-01 13:36:47'),
(2, 74, 83, 'Hey test account ! How are you ?', 0, '2023-06-01 13:37:29'),
(3, 74, 89, 'Hey b ! What\'s your problem ?', 0, '2023-06-01 13:38:08'),
(4, 74, 83, '1', 0, '2023-06-01 15:56:14'),
(5, 74, 83, '1', 0, '2023-06-01 15:56:29'),
(6, 74, 83, 'how are  you', 0, '2023-06-01 15:57:08'),
(7, 74, 89, 'Yo', 0, '2023-06-01 17:50:02'),
(8, 74, 83, 'You don\'t wanna talk ?', 0, '2023-06-01 17:54:03');

-- --------------------------------------------------------

--
-- Table structure for table `etoile`
--

CREATE TABLE `etoile` (
  `id_etoile` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `descr` text,
  `cox` int(11) NOT NULL,
  `coy` int(11) NOT NULL,
  `taille` int(1) NOT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '0',
  `id_galaxie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `etoile`
--

INSERT INTO `etoile` (`id_etoile`, `nom`, `descr`, `cox`, `coy`, `taille`, `public`, `id_galaxie`) VALUES
(10, 'test2', 'test', 399, 146, 1, 0, 2),
(13, 'test3', 'test', 403, 239, 1, 0, 2),
(23, 'friends', '', 247, 180, 3, 0, 2),
(26, 'yo', '', 331, 187, 1, 0, 2),
(27, '', '', 921, 649, 3, 0, 2),
(28, 'frends', '', 711, 82, 3, 0, 2),
(33, 'test', 'test', 657, 223, 1, 0, 2),
(54, 'fxfbgfdg', '', 1226, 162, 3, 0, 2),
(77, 'yoooooooooo', '', 607, 67, 3, 0, 2),
(102, 'yolo', '', 490, 119, 3, 0, 2),
(200, 'qfsvsdfsd', '', 756, 562, 3, 0, 2),
(397, 'bjr', '', 315, 620, 3, 0, 2),
(414, 'trolololololololo', '', 378, 96, 3, 0, 2),
(416, 'testbind', 'testbind', 702, 160, 3, 0, 2),
(417, 'fbgfgfg', 'fbgfgfg', 906, 169, 3, 0, 2),
(418, 'hghfhf', 'hghfhf', -174, 333, 3, 0, 2),
(419, 'eferfre', 'eferfre', 389, 106, 3, 0, 2),
(420, 'gdsgdrg', 'gdsgdrg', 870, 109, 3, 0, 2),
(421, 'fzefzf', '', -35, 402, 3, 0, 2),
(422, 'trolo', '', 1157, 227, 3, 0, 1),
(426, '', '', 914, 122, 3, 0, 1),
(427, 'fsefezfer', '', 150, 245, 3, 0, 1),
(428, 'tfhgjy', '', 1400, 170, 3, 0, 1),
(429, 'recherchegalax', '', 1135, 363, 3, 0, 1),
(430, 't', '', 119, 370, 3, 0, 55),
(432, 'qsfsedfes', '', 812, 376, 3, 0, 1),
(437, 'Hey', 'fef', 744, 164, 3, 0, 55),
(438, 'sgdr', '', 696, 323, 3, 0, 55),
(439, 'blo', '', 24, 360, 3, 0, 55),
(440, 'blegh', '', 261, 326, 3, 0, 55),
(441, '', '', 673, 398, 3, 0, 55),
(449, '', '', 616, 129, 3, 0, 57),
(450, '', '', 748, 37, 3, 0, 56),
(451, 'b', '', 600, 205, 3, 1, 58),
(452, 'bbb', '', 1214, 464, 3, 0, 60),
(453, 'blblb', '', 795, 406, 3, 0, 61);

-- --------------------------------------------------------

--
-- Table structure for table `galaxie`
--

CREATE TABLE `galaxie` (
  `id_galaxie` int(11) NOT NULL,
  `galaxie_nom` varchar(50) NOT NULL,
  `descr` text NOT NULL,
  `cox` int(11) NOT NULL,
  `coy` int(11) NOT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '0',
  `id_univers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `galaxie`
--

INSERT INTO `galaxie` (`id_galaxie`, `galaxie_nom`, `descr`, `cox`, `coy`, `public`, `id_univers`) VALUES
(1, 'testgalaxie', '', 100, 100, 0, 1),
(2, 'test2', '', 100, 200, 0, 1),
(55, 'undefined', '', 0, 0, 1, 1),
(56, 'undefined', '', 0, 0, 1, 4),
(57, 'test', '', 4, 4, 1, 4),
(58, 'undefined', '', 0, 0, 1, 7),
(59, 't', '', 268, 343, 1, 7),
(60, 'b', '', 596, 83, 0, 7),
(61, 'blbu', '', 852, 133, 0, 7);

-- --------------------------------------------------------

--
-- Table structure for table `membre`
--

CREATE TABLE `membre` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `datenaissance` date DEFAULT NULL,
  `dateinscription` date DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `mail` varchar(60) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `role` varchar(1) NOT NULL DEFAULT 'U',
  `login` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `membre`
--

INSERT INTO `membre` (`id`, `pseudo`, `prenom`, `nom`, `datenaissance`, `dateinscription`, `password`, `mail`, `image`, `role`, `login`) VALUES
(74, 'admin', 'admin', 'admin', '2006-06-06', '2023-05-15', '$2y$10$97Al5ULlPLtgxiJZR4cqX.O7NKe/DaB5ltzusowu6AovrspIbFiwq', 'admin@admin', NULL, 'A', 0),
(83, 'test', 'test', 'test', '2001-01-01', '2023-05-19', '$2y$10$oKZFJhIB4AfLTWpf6EukYuzrtB5BzsqV8G7Pm8f/KzsxQaMN4fwYu', 'test@test', NULL, 'U', 0),
(89, 'b', 'b', 'b', '0001-01-01', '2023-05-30', '$2y$10$8CqVkX9UZesfAZ3TSAME2.YD6w4Y4H8y60lABCjkPtnEDnEYwrQ5S', 'b', NULL, 'U', 0);

-- --------------------------------------------------------

--
-- Table structure for table `univers`
--

CREATE TABLE `univers` (
  `id_univers` int(11) NOT NULL,
  `id_membre` int(11) NOT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `univers`
--

INSERT INTO `univers` (`id_univers`, `id_membre`, `public`) VALUES
(1, 83, 0),
(4, 74, 1),
(7, 89, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ami`
--
ALTER TABLE `ami`
  ADD PRIMARY KEY (`id_amitie`),
  ADD KEY `id_membre1` (`id_membre1`),
  ADD KEY `id_membre2` (`id_membre2`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id_chat`),
  ADD KEY `sender` (`sender`),
  ADD KEY `receiver` (`receiver`);

--
-- Indexes for table `etoile`
--
ALTER TABLE `etoile`
  ADD PRIMARY KEY (`id_etoile`),
  ADD UNIQUE KEY `nom_galaxie` (`nom`,`id_galaxie`),
  ADD KEY `galaxie_etoile` (`id_galaxie`) USING BTREE;

--
-- Indexes for table `galaxie`
--
ALTER TABLE `galaxie`
  ADD PRIMARY KEY (`id_galaxie`),
  ADD UNIQUE KEY `galaxie_nom` (`galaxie_nom`,`id_univers`),
  ADD KEY `univers_galaxie` (`id_univers`);

--
-- Indexes for table `membre`
--
ALTER TABLE `membre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `univers`
--
ALTER TABLE `univers`
  ADD PRIMARY KEY (`id_univers`),
  ADD UNIQUE KEY `univers_membre` (`id_membre`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ami`
--
ALTER TABLE `ami`
  MODIFY `id_amitie` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `etoile`
--
ALTER TABLE `etoile`
  MODIFY `id_etoile` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=454;

--
-- AUTO_INCREMENT for table `galaxie`
--
ALTER TABLE `galaxie`
  MODIFY `id_galaxie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `membre`
--
ALTER TABLE `membre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `univers`
--
ALTER TABLE `univers`
  MODIFY `id_univers` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ami`
--
ALTER TABLE `ami`
  ADD CONSTRAINT `ami_ibfk_1` FOREIGN KEY (`id_membre1`) REFERENCES `membre` (`id`),
  ADD CONSTRAINT `ami_ibfk_2` FOREIGN KEY (`id_membre2`) REFERENCES `membre` (`id`);

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `receiver_id` FOREIGN KEY (`receiver`) REFERENCES `membre` (`id`),
  ADD CONSTRAINT `sender_id` FOREIGN KEY (`sender`) REFERENCES `membre` (`id`);

--
-- Constraints for table `etoile`
--
ALTER TABLE `etoile`
  ADD CONSTRAINT `etoile_ibfk_1` FOREIGN KEY (`id_galaxie`) REFERENCES `galaxie` (`id_galaxie`);

--
-- Constraints for table `galaxie`
--
ALTER TABLE `galaxie`
  ADD CONSTRAINT `galaxie_ibfk_1` FOREIGN KEY (`id_univers`) REFERENCES `univers` (`id_univers`);

--
-- Constraints for table `univers`
--
ALTER TABLE `univers`
  ADD CONSTRAINT `univers_ibfk_1` FOREIGN KEY (`id_membre`) REFERENCES `membre` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
