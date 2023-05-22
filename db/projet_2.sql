-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 22, 2023 at 09:40 AM
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
  `id_membre1` int(11) NOT NULL,
  `id_membre2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `id_galaxie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `etoile`
--

INSERT INTO `etoile` (`id_etoile`, `nom`, `descr`, `cox`, `coy`, `taille`, `id_galaxie`) VALUES
(5, 'test', 'test', 1239, 78, 1, 1),
(10, 'test2', 'test', 294, 262, 1, 2),
(13, 'test3', 'test', 1001, 211, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `galaxie`
--

CREATE TABLE `galaxie` (
  `id_galaxie` int(11) NOT NULL,
  `galaxie_nom` varchar(50) NOT NULL,
  `cox` int(11) NOT NULL,
  `coy` int(11) NOT NULL,
  `id_univers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `galaxie`
--

INSERT INTO `galaxie` (`id_galaxie`, `galaxie_nom`, `cox`, `coy`, `id_univers`) VALUES
(1, 'TestGalaxie', 100, 100, 1),
(2, 'test2', 100, 200, 1);

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
  `role` varchar(1) NOT NULL DEFAULT 'U',
  `login` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `membre`
--

INSERT INTO `membre` (`id`, `pseudo`, `prenom`, `nom`, `datenaissance`, `dateinscription`, `password`, `mail`, `role`, `login`) VALUES
(74, 'admin', 'admin', 'admin', '2006-06-06', '2023-05-15', '$2y$10$97Al5ULlPLtgxiJZR4cqX.O7NKe/DaB5ltzusowu6AovrspIbFiwq', 'admin@admin', 'A', 0),
(76, 'a', 'a', 'a', '2006-06-06', '2023-05-16', '$2y$10$ZR7eeo41zrh9J4Sp97clk.MmhJSZAA4wP95a0CwJqQP5fnhLkpcy.', 'a@a', 'U', 0),
(80, 'test2', 'test2', 'test2', '2001-01-01', '2023-05-19', '$2y$10$rNha0.nwizhv7Gm5P9bHxewBFbgxruWgw/Ewo3/qNSDwLrJX5a4n2', 'test2@', 'U', 0),
(83, 'test', 'test', 'test', '2001-01-01', '2023-05-19', '$2y$10$oKZFJhIB4AfLTWpf6EukYuzrtB5BzsqV8G7Pm8f/KzsxQaMN4fwYu', 'test@test', 'U', 0);

-- --------------------------------------------------------

--
-- Table structure for table `univers`
--

CREATE TABLE `univers` (
  `id_univers` int(11) NOT NULL,
  `id_membre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `univers`
--

INSERT INTO `univers` (`id_univers`, `id_membre`) VALUES
(1, 83);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ami`
--
ALTER TABLE `ami`
  ADD PRIMARY KEY (`id_membre1`,`id_membre2`),
  ADD KEY `id_membre1` (`id_membre1`),
  ADD KEY `id_membre2` (`id_membre2`);

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
  ADD UNIQUE KEY `id_galaxie` (`id_galaxie`,`galaxie_nom`),
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
-- AUTO_INCREMENT for table `etoile`
--
ALTER TABLE `etoile`
  MODIFY `id_etoile` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `galaxie`
--
ALTER TABLE `galaxie`
  MODIFY `id_galaxie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `membre`
--
ALTER TABLE `membre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `univers`
--
ALTER TABLE `univers`
  MODIFY `id_univers` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
