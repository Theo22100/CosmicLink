-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 15, 2023 at 09:00 AM
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
  `sender` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `statut` varchar(1) NOT NULL DEFAULT 'E'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ami`
--

INSERT INTO `ami` (`id_amitie`, `sender`, `receiver`, `statut`) VALUES
(1, 3, 2, 'A'),
(2, 1, 2, 'A'),
(3, 1, 4, 'E');

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
(1, 1, 2, 'Hi billy ! I feel like we have a lot in common!', 1, '2023-06-14 15:48:39'),
(2, 1, 2, 'For example, I adore amphibia too ! Did you watch all of it already?', 1, '2023-06-14 15:51:03'),
(3, 2, 1, 'Hi ! I\'m almost done with the whole show, what about you ?', 0, '2023-06-14 15:52:14'),
(4, 2, 1, 'Have you seen season 3 ?', 0, '2023-06-14 15:54:40'),
(5, 2, 1, 'it\'s getting quite crazy', 0, '2023-06-14 15:56:00'),
(6, 2, 3, 'hi ! So you like pool ?', 0, '2023-06-14 16:12:39');

-- --------------------------------------------------------

--
-- Stand-in structure for view `commonstars`
-- (See below for the actual view)
--
CREATE TABLE `commonstars` (
`pseudo_1` varchar(30)
,`id_membre_1` int(11)
,`id_univers_1` int(11)
,`public_univers_1` tinyint(1)
,`id_galaxie_1` int(11)
,`public_galaxie_1` tinyint(1)
,`id_etoile1` int(11)
,`public_etoile1` tinyint(1)
,`nom_etoile` varchar(30)
,`id_etoile_2` int(11)
,`public_etoile_2` tinyint(1)
,`public_galaxie_2` tinyint(1)
,`id_galaxie_2` int(11)
,`public_univers_2` tinyint(1)
,`id_univers_2` int(11)
,`id_membre_2` int(11)
,`pseudo_2` varchar(30)
);

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
(1, 'Théo', 'We both love Miraculous Ladybug !', 1058, 235, 2, 0, 2),
(2, 'Jules', 'We both love art, cartoons and pets!', 946, 192, 4, 1, 2),
(3, 'Yann', 'Dad of the group ! ', 1083, 252, 4, 1, 2),
(4, 'Gravity Falls', 'It\'s just beautiful animation with a lot of humor and hidden stuff ! ', 453, 169, 5, 1, 3),
(5, 'Amphibia', 'I JUST LOVE EVERYTHING', 559, 143, 4, 1, 3),
(6, 'Lucifer', 'The actor is kind of cute...', 376, 213, 2, 0, 3),
(7, 'crochet', 'It\'s kind of a grandma thing but it\'s really relaxing!', 510, 217, 3, 0, 4),
(8, 'drawing', 'Drawing and painting is my favorite thing ever to do. Been doing it for over 10 years.', 506, 267, 5, 1, 4),
(9, 'amphibia', '', 1076, 396, 5, 1, 6),
(10, 'bluey', 'It\'s not just for children. They have deep themes that even adults can enjoy.', 1060, 300, 3, 0, 6),
(11, 'Betty', 'Cutest niece you could wish for !', 533, 371, 5, 0, 5),
(12, 'chocolate raisins', 'they helped save my sanity.\nwhy do some taste like soap though..?', 1002, 165, 4, 1, 8),
(13, 'drawing', '', 592, 165, 4, 1, 5),
(14, 'running', '', 381, 224, 3, 1, 5),
(15, 'travel', 'love discovering new cultures and meeting people', 254, 220, 5, 1, 9),
(16, 'pool', 'the game not the water thing', 453, 273, 3, 1, 9),
(17, 'pool', 'I like to play with my friends', 450, 260, 5, 1, 11),
(18, 'supernatural', 'Sam is the best Winchester. Change my mind.', 1195, 210, 3, 0, 12),
(19, 'Lucifer', 'Grr Chloe', 1000, 132, 3, 0, 12),
(20, 'miraculous ladybug', 'miraculous ! porte-bonheur !', 586, 294, 3, 1, 14),
(21, 'League of Legends', '', 128, 424, 5, 0, 15),
(22, 'minecraft', 'Played a lot with Jules at this point', 354, 487, 2, 1, 15),
(23, 'minecraft', 'With Theo at some point', 555, 229, 1, 1, 9),
(24, 'miraculous ladybug', 'Still shook that (spoiler!) Adrien and Felix are sentimonsters...', 491, 74, 4, 0, 3),
(29, 'friends', 'with the sisters', 147, 159, 4, 1, 3);

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
(1, 'undefined', '', 0, 0, 1, 1),
(2, 'friends', 'People who make my life more fun !', 1096, 8, 0, 1),
(3, 'shows', 'Shows I really love! ', 296, 32, 1, 1),
(4, 'hobbies', 'All things that bring me joy', 549, 150, 1, 1),
(5, 'undefined', '', 0, 0, 1, 2),
(6, 'cartoons', 'I just love them okay', 976, 277, 1, 2),
(7, 'family', '', 477, 399, 0, 2),
(8, 'food', '', 1012, 175, 1, 2),
(9, 'hobbies', '', 420, 116, 1, 2),
(10, 'undefined', '', 0, 0, 1, 3),
(11, 'activities', '', 885, 154, 1, 3),
(12, 'series', '', 1020, 91, 1, 3),
(13, 'undefined', '', 0, 0, 1, 4),
(14, 'cartoons', '', 436, 70, 1, 4),
(15, 'games', 'on Pc mostly, sometimes switch\n', -35, 370, 1, 4),
(18, 'undefined', '', 0, 0, 1, 6);

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
(1, 'lmaier', 'Leonie', 'Maier', '1999-10-30', '2023-06-14', '$2y$10$/6sIVpRCgL3dwe1j.tjm2eJv/IcbCpr.miWQb8j12J.9OE1v/RwXi', 'leonie.maier@etudiant.univ-rennes1.fr', NULL, 'U', 0),
(2, 'billy', 'Jules', 'C', '2001-11-14', '2023-06-14', '$2y$10$my.rYnhIVpCY.6fZWr/.I./1n9UT8SNG9m50NBlxRBflkeOxPH8EO', 'jules.cooper@etudiant.univ-rennes1.fr', NULL, 'U', 0),
(3, 'ybazin', 'Yann', 'Bazin', '2002-01-18', '2023-06-14', '$2y$10$OTzeyTGC/aBDUORIa7/Q3Od48OtKmbimOlrXKqcovdocZaFL/0lpO', 'yann.bazin@etudiant.univ-rennes1.fr', NULL, 'U', 0),
(4, 'tguerin', 'Theo', 'G', '2001-02-09', '2023-06-14', '$2y$10$44jMNNv5RReJ.McRwUkkU.2jSpisVSFg0qqELb0IdYVNoA20aKHfe', 'theo.guerin@etudiant.univ-rennes1.fr', NULL, 'U', 0),
(6, 'admin', 'Admin', 'Istrator', '2001-01-01', '2023-06-14', '$2y$10$Kmu0erig16DJlX6KG3FJNOUVgkdYlVBw/376ZHLDASDmoSpuIgqOi', 'admin@cosmiclink.com', NULL, 'A', 0);

-- --------------------------------------------------------

--
-- Stand-in structure for view `startomember`
-- (See below for the actual view)
--
CREATE TABLE `startomember` (
`id_etoile` int(11)
,`nom_etoile` varchar(30)
,`public_etoile` tinyint(1)
,`id_galaxie` int(11)
,`galaxie_nom` varchar(50)
,`public_galaxie` tinyint(1)
,`id_univers` int(11)
,`public_univers` tinyint(1)
,`id_membre` int(11)
,`pseudo` varchar(30)
);

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
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(6, 6, 1);

-- --------------------------------------------------------

--
-- Structure for view `commonstars`
--
DROP TABLE IF EXISTS `commonstars`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `commonstars`  AS SELECT `s1`.`pseudo` AS `pseudo_1`, `s1`.`id_membre` AS `id_membre_1`, `s1`.`id_univers` AS `id_univers_1`, `s1`.`public_univers` AS `public_univers_1`, `s1`.`id_galaxie` AS `id_galaxie_1`, `s1`.`public_galaxie` AS `public_galaxie_1`, `s1`.`id_etoile` AS `id_etoile1`, `s1`.`public_etoile` AS `public_etoile1`, `s1`.`nom_etoile` AS `nom_etoile`, `s2`.`id_etoile` AS `id_etoile_2`, `s2`.`public_etoile` AS `public_etoile_2`, `s2`.`public_galaxie` AS `public_galaxie_2`, `s2`.`id_galaxie` AS `id_galaxie_2`, `s2`.`public_univers` AS `public_univers_2`, `s2`.`id_univers` AS `id_univers_2`, `s2`.`id_membre` AS `id_membre_2`, `s2`.`pseudo` AS `pseudo_2` FROM (`startomember` `s1` join `startomember` `s2`) WHERE ((`s1`.`nom_etoile` = `s2`.`nom_etoile`) AND (`s1`.`id_membre` <> `s2`.`id_membre`))  ;

-- --------------------------------------------------------

--
-- Structure for view `startomember`
--
DROP TABLE IF EXISTS `startomember`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `startomember`  AS SELECT `etoile`.`id_etoile` AS `id_etoile`, `etoile`.`nom` AS `nom_etoile`, `etoile`.`public` AS `public_etoile`, `etoile`.`id_galaxie` AS `id_galaxie`, `galaxie`.`galaxie_nom` AS `galaxie_nom`, `galaxie`.`public` AS `public_galaxie`, `galaxie`.`id_univers` AS `id_univers`, `univers`.`public` AS `public_univers`, `univers`.`id_membre` AS `id_membre`, `membre`.`pseudo` AS `pseudo` FROM (`etoile` join (`galaxie` join (`univers` join `membre`))) WHERE ((`etoile`.`id_galaxie` = `galaxie`.`id_galaxie`) AND (`galaxie`.`id_univers` = `univers`.`id_univers`) AND (`univers`.`id_membre` = `membre`.`id`))  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ami`
--
ALTER TABLE `ami`
  ADD PRIMARY KEY (`id_amitie`),
  ADD UNIQUE KEY `sender_2` (`sender`,`receiver`),
  ADD KEY `sender` (`sender`),
  ADD KEY `receiver` (`receiver`);

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
  ADD KEY `id_galaxie` (`id_galaxie`);

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pseudo` (`pseudo`);

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
  MODIFY `id_amitie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `etoile`
--
ALTER TABLE `etoile`
  MODIFY `id_etoile` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `galaxie`
--
ALTER TABLE `galaxie`
  MODIFY `id_galaxie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `membre`
--
ALTER TABLE `membre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  ADD CONSTRAINT `ami_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `membre` (`id`),
  ADD CONSTRAINT `ami_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `membre` (`id`);

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
  ADD CONSTRAINT `galaxie` FOREIGN KEY (`id_galaxie`) REFERENCES `galaxie` (`id_galaxie`);

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
