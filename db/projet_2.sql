-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 14, 2023 at 04:50 PM
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `membre`
--
ALTER TABLE `membre`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pseudo` (`pseudo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `membre`
--
ALTER TABLE `membre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
