-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 08 juin 2023 à 14:23
-- Version du serveur : 5.7.24
-- Version de PHP : 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet`
--

-- --------------------------------------------------------

--
-- Structure de la table `ami`
--

CREATE TABLE `ami` (
  `id_amitie` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `statut` varchar(1) NOT NULL DEFAULT 'E'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ami`
--

INSERT INTO `ami` (`id_amitie`, `sender`, `receiver`, `statut`) VALUES
(1, 74, 89, 'A'),
(2, 74, 83, 'A');

-- --------------------------------------------------------

--
-- Structure de la table `chat`
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
-- Déchargement des données de la table `chat`
--

INSERT INTO `chat` (`id_chat`, `sender`, `receiver`, `content`, `status`, `timesent`) VALUES
(1, 89, 74, 'Hey admin ! Got a problem!', 1, '2023-06-01 13:36:47'),
(2, 74, 83, 'Hey test account ! How are you ?', 1, '2023-06-01 13:37:29'),
(3, 74, 89, 'Hey b ! What\'s your problem ?', 1, '2023-06-01 13:38:08'),
(4, 74, 83, '1', 1, '2023-06-01 15:56:14'),
(5, 74, 83, '1', 1, '2023-06-01 15:56:29'),
(6, 74, 83, 'how are  you', 1, '2023-06-01 15:57:08'),
(7, 74, 89, 'Yo', 1, '2023-06-01 17:50:02'),
(8, 74, 83, 'You don\'t wanna talk ?', 1, '2023-06-01 17:54:03');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `commonstars`
-- (Voir ci-dessous la vue réelle)
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
-- Structure de la table `etoile`
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
-- Déchargement des données de la table `etoile`
--

INSERT INTO `etoile` (`id_etoile`, `nom`, `descr`, `cox`, `coy`, `taille`, `public`, `id_galaxie`) VALUES
(10, 'test2', 'test', 399, 146, 1, 0, 2),
(13, 'test3', 'test', 403, 239, 1, 0, 2),
(23, 'friends', '', 247, 180, 3, 0, 2),
(26, 'yo', '', 331, 187, 1, 0, 2),
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
(427, 'fsefezfer', '', 150, 245, 3, 0, 1),
(428, 'tfhgjy', '', 1400, 170, 3, 0, 1),
(429, 'recherchegalax', '', 1135, 363, 3, 0, 1),
(430, 't', '', 119, 370, 3, 0, 55),
(432, 'qsfsedfes', '', 812, 376, 3, 0, 1),
(437, 'Hey', 'fef', 744, 164, 3, 0, 55),
(438, 'sgdr', '', 696, 323, 3, 0, 55),
(439, 'blo', '', 24, 360, 3, 0, 55),
(440, 'blegh', '', 261, 326, 3, 0, 55),
(451, 'b', '', 600, 205, 3, 1, 58),
(452, 'bbb', '', 1214, 464, 3, 0, 60),
(453, 'blblb', '', 795, 406, 3, 0, 61),
(454, 'dogs', 'all of them are good bois', 622, 415, 2, 1, 2),
(455, 'dogs', 'fluffy', 61, 355, 1, 0, 56),
(456, 'honey', 'it\'s sweet. and bees made it', 293, 764, 3, 0, 63),
(457, 'honey', '', 514, 144, 3, 0, 1),
(458, 'nutella', '', 1270, 293, 3, 0, 58),
(459, 'nutella', '', 85, 354, 3, 0, 63),
(460, 'cats', '', 976, 261, 3, 0, 58),
(461, 'cats', '', 135, 607, 3, 0, 56),
(462, 'cha', '', 38, 566, 5, 0, 60),
(463, 'dferf', '', 1106, 261, 3, 0, 64);

-- --------------------------------------------------------

--
-- Structure de la table `galaxie`
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
-- Déchargement des données de la table `galaxie`
--

INSERT INTO `galaxie` (`id_galaxie`, `galaxie_nom`, `descr`, `cox`, `coy`, `public`, `id_univers`) VALUES
(1, 'testgalaxie', '', 287, 153, 0, 1),
(2, 'test2', '', 1002, 153, 0, 1),
(55, 'undefined', '', 0, 0, 1, 1),
(56, 'undefined', '', 0, 0, 1, 4),
(57, 'test', '', 4, 4, 1, 4),
(58, 'undefined', '', 0, 0, 1, 7),
(59, 't', '', 268, 343, 1, 7),
(60, 'famille', '', 199, 54, 0, 7),
(61, 'blbu', '', 852, 133, 0, 7),
(62, 'amis', '', 1205, 356, 0, 1),
(63, 'food', 'Just love eating okay', 202, 559, 0, 4),
(64, 'undefined', '', 0, 0, 1, 8);

-- --------------------------------------------------------

--
-- Structure de la table `membre`
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
-- Déchargement des données de la table `membre`
--

INSERT INTO `membre` (`id`, `pseudo`, `prenom`, `nom`, `datenaissance`, `dateinscription`, `password`, `mail`, `image`, `role`, `login`) VALUES
(74, 'admin', 'admin', 'admin', '2006-06-06', '2023-05-15', '$2y$10$97Al5ULlPLtgxiJZR4cqX.O7NKe/DaB5ltzusowu6AovrspIbFiwq', 'admin@admin', NULL, 'A', 0),
(83, 'test', 'test', 'test', '2001-01-01', '2023-05-19', '$2y$10$oKZFJhIB4AfLTWpf6EukYuzrtB5BzsqV8G7Pm8f/KzsxQaMN4fwYu', 'test@test', 'IMG_20230124_110131.jpg', 'U', 0),
(89, 'b', 'b', 'b', '0001-01-01', '2023-05-30', '$2y$10$8CqVkX9UZesfAZ3TSAME2.YD6w4Y4H8y60lABCjkPtnEDnEYwrQ5S', 'b', NULL, 'U', 0),
(90, 'test2', 'test2', 'test2', '0001-01-01', '2023-06-08', '$2y$10$/K.hh3OV03vDX5HiwrLacex6ASY.n5Ee.PY1WKPFvsgJrCvYRraY.', 'test2', NULL, 'U', 0);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `startomember`
-- (Voir ci-dessous la vue réelle)
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
-- Structure de la table `univers`
--

CREATE TABLE `univers` (
  `id_univers` int(11) NOT NULL,
  `id_membre` int(11) NOT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `univers`
--

INSERT INTO `univers` (`id_univers`, `id_membre`, `public`) VALUES
(1, 83, 0),
(4, 74, 1),
(7, 89, 1),
(8, 90, 0);

-- --------------------------------------------------------

--
-- Structure de la vue `commonstars`
--
DROP TABLE IF EXISTS `commonstars`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `commonstars`  AS SELECT `s1`.`pseudo` AS `pseudo_1`, `s1`.`id_membre` AS `id_membre_1`, `s1`.`id_univers` AS `id_univers_1`, `s1`.`public_univers` AS `public_univers_1`, `s1`.`id_galaxie` AS `id_galaxie_1`, `s1`.`public_galaxie` AS `public_galaxie_1`, `s1`.`id_etoile` AS `id_etoile1`, `s1`.`public_etoile` AS `public_etoile1`, `s1`.`nom_etoile` AS `nom_etoile`, `s2`.`id_etoile` AS `id_etoile_2`, `s2`.`public_etoile` AS `public_etoile_2`, `s2`.`public_galaxie` AS `public_galaxie_2`, `s2`.`id_galaxie` AS `id_galaxie_2`, `s2`.`public_univers` AS `public_univers_2`, `s2`.`id_univers` AS `id_univers_2`, `s2`.`id_membre` AS `id_membre_2`, `s2`.`pseudo` AS `pseudo_2` FROM (`startomember` `s1` join `startomember` `s2`) WHERE ((`s1`.`nom_etoile` = `s2`.`nom_etoile`) AND (`s1`.`id_membre` <> `s2`.`id_membre`))  ;

-- --------------------------------------------------------

--
-- Structure de la vue `startomember`
--
DROP TABLE IF EXISTS `startomember`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `startomember`  AS SELECT `etoile`.`id_etoile` AS `id_etoile`, `etoile`.`nom` AS `nom_etoile`, `etoile`.`public` AS `public_etoile`, `etoile`.`id_galaxie` AS `id_galaxie`, `galaxie`.`galaxie_nom` AS `galaxie_nom`, `galaxie`.`public` AS `public_galaxie`, `galaxie`.`id_univers` AS `id_univers`, `univers`.`public` AS `public_univers`, `univers`.`id_membre` AS `id_membre`, `membre`.`pseudo` AS `pseudo` FROM (`etoile` join (`galaxie` join (`univers` join `membre`))) WHERE ((`etoile`.`id_galaxie` = `galaxie`.`id_galaxie`) AND (`galaxie`.`id_univers` = `univers`.`id_univers`) AND (`univers`.`id_membre` = `membre`.`id`))  ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ami`
--
ALTER TABLE `ami`
  ADD PRIMARY KEY (`id_amitie`),
  ADD UNIQUE KEY `sender_2` (`sender`,`receiver`),
  ADD KEY `sender` (`sender`),
  ADD KEY `receiver` (`receiver`);

--
-- Index pour la table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id_chat`),
  ADD KEY `sender` (`sender`),
  ADD KEY `receiver` (`receiver`);

--
-- Index pour la table `etoile`
--
ALTER TABLE `etoile`
  ADD PRIMARY KEY (`id_etoile`),
  ADD KEY `id_galaxie` (`id_galaxie`);

--
-- Index pour la table `galaxie`
--
ALTER TABLE `galaxie`
  ADD PRIMARY KEY (`id_galaxie`),
  ADD UNIQUE KEY `galaxie_nom` (`galaxie_nom`,`id_univers`),
  ADD KEY `univers_galaxie` (`id_univers`);

--
-- Index pour la table `membre`
--
ALTER TABLE `membre`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pseudo` (`pseudo`);

--
-- Index pour la table `univers`
--
ALTER TABLE `univers`
  ADD PRIMARY KEY (`id_univers`),
  ADD UNIQUE KEY `univers_membre` (`id_membre`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ami`
--
ALTER TABLE `ami`
  MODIFY `id_amitie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `etoile`
--
ALTER TABLE `etoile`
  MODIFY `id_etoile` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=464;

--
-- AUTO_INCREMENT pour la table `galaxie`
--
ALTER TABLE `galaxie`
  MODIFY `id_galaxie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pour la table `membre`
--
ALTER TABLE `membre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT pour la table `univers`
--
ALTER TABLE `univers`
  MODIFY `id_univers` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ami`
--
ALTER TABLE `ami`
  ADD CONSTRAINT `ami_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `membre` (`id`),
  ADD CONSTRAINT `ami_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `membre` (`id`);

--
-- Contraintes pour la table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `receiver_id` FOREIGN KEY (`receiver`) REFERENCES `membre` (`id`),
  ADD CONSTRAINT `sender_id` FOREIGN KEY (`sender`) REFERENCES `membre` (`id`);

--
-- Contraintes pour la table `etoile`
--
ALTER TABLE `etoile`
  ADD CONSTRAINT `galaxie` FOREIGN KEY (`id_galaxie`) REFERENCES `galaxie` (`id_galaxie`);

--
-- Contraintes pour la table `galaxie`
--
ALTER TABLE `galaxie`
  ADD CONSTRAINT `galaxie_ibfk_1` FOREIGN KEY (`id_univers`) REFERENCES `univers` (`id_univers`);

--
-- Contraintes pour la table `univers`
--
ALTER TABLE `univers`
  ADD CONSTRAINT `univers_ibfk_1` FOREIGN KEY (`id_membre`) REFERENCES `membre` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
