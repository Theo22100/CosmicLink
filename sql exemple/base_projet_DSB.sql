-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Ven 04 Mars 2022 à 16:25
-- Version du serveur: 5.5.31
-- Version de PHP: 5.4.23

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `base_ybazin`
--

-- --------------------------------------------------------

--
-- Structure de la table `AIME`
--

CREATE TABLE IF NOT EXISTS `AIME` (
  `nomf` varchar(42) NOT NULL DEFAULT '',
  `nomp` varchar(42) NOT NULL DEFAULT 'NULL',
  `nomg` varchar(42) NOT NULL DEFAULT 'NULL',
  `noma` varchar(42) NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`nomf`,`nomp`,`nomg`,`noma`),
  KEY `noma` (`noma`),
  KEY `nomg` (`nomg`),
  KEY `nomp` (`nomp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `AIME`
--

INSERT INTO `AIME` (`nomf`, `nomp`, `nomg`, `noma`) VALUES
('Miyazaki', 'Guts', 'Seinen', 'Berserk'),
('Cooper', 'Monkey D Luffy', 'Shonen', 'Bleach'),
('Polakiov', 'Rukia Kuchiki', 'Seinen', 'Bleach'),
('Schmidt', 'Tanjiro Kamado', 'Seinen', 'Demon Slayer'),
('Maier', 'Merlin', 'Seinen', 'Fairy Tail'),
('Vincent', 'Eren Jaeger', 'Shonen', 'Fairy Tail'),
('Pichard', 'Gon Freecs', 'Shonen', 'Hunter X Hunter'),
('Müller', 'Joseph Joestar', 'Shonen', 'Jojo s bizarre adventure'),
('Castano-Rios', 'Erza Scarlett', 'Shonen', 'My hero Academia'),
('Smith', 'Ochako Uraraka', 'Seinen', 'My Hero Academia'),
('Garcia', 'Itachi Uchiwa', 'Shonen', 'Naruto'),
('Molas', 'Eren Jaeger', 'Anime Original', 'One Piece'),
('Saito', 'Akane Tsunemori', 'Anime Original', 'Psycho Pass'),
('Johnson', 'Merlin', 'Shonen', 'Seven Deadly Sins');

-- --------------------------------------------------------

--
-- Structure de la table `ANIMES`
--

CREATE TABLE IF NOT EXISTS `ANIMES` (
  `noma` varchar(42) NOT NULL DEFAULT '',
  `saisons` varchar(42) DEFAULT NULL,
  `année` int(42) DEFAULT NULL,
  `nomp` varchar(42) DEFAULT NULL,
  PRIMARY KEY (`noma`),
  KEY `nomp` (`nomp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `ANIMES`
--

INSERT INTO `ANIMES` (`noma`, `saisons`, `année`, `nomp`) VALUES
('Berserk', '2', 2016, 'Guts'),
('Bleach', '16', 2004, 'Rukia Kuchiki'),
('Demon Slayer', '2', 2019, 'Tanjiro Kamado'),
('Fairy tail', '7', 2009, 'Erza Scarlett'),
('Hunter X Hunter', '3', 2011, 'Gon Freecs'),
('Jojo s bizarre adventure', '5', 2012, 'Joseph Joestar'),
('L attaque des titans', '4', 2012, 'Eren Jaeger'),
('My Hero Academia', '5', 2016, 'Ochako Uraraka'),
('Naruto', '26', 2002, 'Itachi Uchiwa'),
('One Piece', '21', 1999, 'Monkey D Luffy'),
('Psycho Pass', '3', 2012, 'Akane Tsunemori'),
('Seven Deadly Sins', '5', 2014, 'Merlin');

-- --------------------------------------------------------

--
-- Structure de la table `APPARTIENT_A`
--

CREATE TABLE IF NOT EXISTS `APPARTIENT_A` (
  `noma` varchar(42) NOT NULL DEFAULT '',
  `nomg` varchar(42) NOT NULL DEFAULT '',
  PRIMARY KEY (`noma`,`nomg`),
  KEY `nomg` (`nomg`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `APPARTIENT_A`
--

INSERT INTO `APPARTIENT_A` (`noma`, `nomg`) VALUES
('Psycho Pass', 'Anime Original'),
('Berserk', 'Seinen'),
('L attaque des titans', 'Seinen'),
('Bleach', 'Shonen'),
('Demon Slayer', 'Shonen'),
('Fairy Tail', 'Shonen'),
('Hunter X Hunter', 'Shonen'),
('Jojo s bizarre adventure', 'Shonen'),
('My Hero Academia', 'Shonen'),
('Naruto', 'Shonen'),
('One Piece', 'Shonen'),
('Seven Deadly Sins', 'Shonen');

-- --------------------------------------------------------

--
-- Structure de la table `FAN`
--

CREATE TABLE IF NOT EXISTS `FAN` (
  `nomf` varchar(42) NOT NULL DEFAULT '',
  `prénomf` varchar(42) DEFAULT NULL,
  `âge` varchar(42) DEFAULT NULL,
  `sexe` varchar(42) DEFAULT NULL,
  `nationalité` varchar(42) DEFAULT NULL,
  PRIMARY KEY (`nomf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `FAN`
--

INSERT INTO `FAN` (`nomf`, `prénomf`, `âge`, `sexe`, `nationalité`) VALUES
('Castano-Rios', 'Isabella', '23', 'F', 'Espagnole'),
('Cooper', 'Bryan', '26', 'M', 'Anglais'),
('Garcia', 'Esteban', '17', 'M', 'Espagnol'),
('Johnson', 'Aimee', '15', 'F', 'Anglaise'),
('Maier', 'Louise', '25', 'F', 'Allemande'),
('Miyazaki', 'Hayao', '34', 'M', 'Japonais'),
('Molas', 'Frederic', '39', 'M', 'Français'),
('Müller', 'Thomas', '10', 'M', 'Allemand'),
('Pichard', 'Martine', '45', 'F', 'Française'),
('Polakiov', 'Alexeï', '15', 'M', 'Russe'),
('Saito', 'Mia', '16', 'F', 'Japonaise'),
('Schmidt', 'Alice', '20', 'F', 'Allemande'),
('Smith', 'Tom', '20', 'M', 'Anglais'),
('Vincent', 'Benoit', '15', 'M', 'Français');

-- --------------------------------------------------------

--
-- Structure de la table `GENRE`
--

CREATE TABLE IF NOT EXISTS `GENRE` (
  `nomg` varchar(42) NOT NULL DEFAULT '',
  `thème` varchar(42) DEFAULT NULL,
  `public_visé` varchar(42) DEFAULT NULL,
  PRIMARY KEY (`nomg`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `GENRE`
--

INSERT INTO `GENRE` (`nomg`, `thème`, `public_visé`) VALUES
('Anime Original', 'Tout', 'Tous publics'),
('Seinen', 'Action', 'Jeunes adultes'),
('Shonen', 'Dépassement de soi', 'Jeunes garçons adolescents');

-- --------------------------------------------------------

--
-- Structure de la table `PERSO`
--

CREATE TABLE IF NOT EXISTS `PERSO` (
  `nomp` varchar(42) NOT NULL DEFAULT '',
  `âge` varchar(42) DEFAULT NULL,
  `sexe` varchar(42) DEFAULT NULL,
  `origine` varchar(42) DEFAULT NULL,
  PRIMARY KEY (`nomp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `PERSO`
--

INSERT INTO `PERSO` (`nomp`, `âge`, `sexe`, `origine`) VALUES
('Akane Tsunemori', '20', 'F', 'Japon'),
('Eren Jaeger', '19', 'M', 'Allemagne'),
('Erza Scarlett', '19', 'F', 'Europe'),
('Gon Freecs', '12', 'M', 'Ile de la baleine'),
('Guts', '24', 'M', 'Anglaise'),
('Itachi Uchiwa', '22', 'M', 'Japon'),
('Joseph Joestar', '68', 'M', 'USA'),
('Merlin', '3000', 'F', 'Europe'),
('Monkey D Luffy', '19', 'M', 'Japon'),
('Ochako Uraraka', '15', 'F', 'Japon'),
('Rukia Kuchiki', '15', 'F', 'Japon'),
('Tanjiro Kamado', '15', 'M', 'Japon');

-- --------------------------------------------------------

--
-- Structure de la table `STUDIO`
--

CREATE TABLE IF NOT EXISTS `STUDIO` (
  `noms` varchar(42) NOT NULL DEFAULT '',
  `pdg` varchar(42) DEFAULT NULL,
  `nationalité` varchar(42) DEFAULT NULL,
  `noma` varchar(42) DEFAULT NULL,
  `nomp` varchar(42) DEFAULT NULL,
  PRIMARY KEY (`noms`),
  KEY `nomp` (`nomp`),
  KEY `noma` (`noma`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `STUDIO`
--

INSERT INTO `STUDIO` (`noms`, `pdg`, `nationalité`, `noma`, `nomp`) VALUES
('Madhouse', NULL, 'Japonais', 'Hunter X Hunter', 'Gon Freecs'),
('Mappa', 'Manabu Otsuka', 'Japonais', 'L attaque des titans', 'Eren Jaeger'),
('Pierrot', NULL, 'Japon', 'Bleach', NULL),
('Toei Animation', 'Katsuhiro Takagi', 'Japonais', 'One Piece', 'Monkey D Luffy'),
('Wit', NULL, 'Japonais', 'L attaque des titans', 'Eren Jaeger');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `AIME`
--
ALTER TABLE `AIME`
  ADD CONSTRAINT `AIME_ibfk_4` FOREIGN KEY (`nomf`) REFERENCES `FAN` (`nomf`),
  ADD CONSTRAINT `AIME_ibfk_1` FOREIGN KEY (`noma`) REFERENCES `ANIMES` (`noma`),
  ADD CONSTRAINT `AIME_ibfk_2` FOREIGN KEY (`nomg`) REFERENCES `GENRE` (`nomg`),
  ADD CONSTRAINT `AIME_ibfk_3` FOREIGN KEY (`nomp`) REFERENCES `PERSO` (`nomp`);

--
-- Contraintes pour la table `ANIMES`
--
ALTER TABLE `ANIMES`
  ADD CONSTRAINT `ANIMES_ibfk_1` FOREIGN KEY (`nomp`) REFERENCES `PERSO` (`nomp`);

--
-- Contraintes pour la table `APPARTIENT_A`
--
ALTER TABLE `APPARTIENT_A`
  ADD CONSTRAINT `APPARTIENT_A_ibfk_2` FOREIGN KEY (`noma`) REFERENCES `ANIMES` (`noma`),
  ADD CONSTRAINT `APPARTIENT_A_ibfk_1` FOREIGN KEY (`nomg`) REFERENCES `GENRE` (`nomg`);

--
-- Contraintes pour la table `STUDIO`
--
ALTER TABLE `STUDIO`
  ADD CONSTRAINT `STUDIO_ibfk_2` FOREIGN KEY (`noma`) REFERENCES `ANIMES` (`noma`),
  ADD CONSTRAINT `STUDIO_ibfk_1` FOREIGN KEY (`nomp`) REFERENCES `PERSO` (`nomp`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
