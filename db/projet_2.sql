-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 28 mai 2023 à 22:01
-- Version du serveur : 5.7.24
-- Version de PHP : 7.4.1

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
  `id_membre1` int(11) NOT NULL,
  `id_membre2` int(11) NOT NULL,
  `statut` varchar(1) NOT NULL DEFAULT 'E'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `id_galaxie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `galaxie`
--

CREATE TABLE `galaxie` (
  `id_galaxie` int(11) NOT NULL,
  `galaxie_nom` varchar(30) NOT NULL,
  `cox` int(11) NOT NULL,
  `coy` int(11) NOT NULL,
  `id_univers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `galaxie`
--

INSERT INTO `galaxie` (`id_galaxie`, `galaxie_nom`, `cox`, `coy`, `id_univers`) VALUES
(3, 'Undefined', 0, 0, 93),
(4, 'Undefined', 0, 0, 94),
(5, 'Undefined', 0, 0, 95),
(7, 'undefined', 0, 0, 97);

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
(76, 'a', 'b', 'b', '2006-06-06', '2023-05-16', '$2y$10$ZR7eeo41zrh9J4Sp97clk.MmhJSZAA4wP95a0CwJqQP5fnhLkpcy.', 'b@b', NULL, 'A', 0),
(77, 'admin', 'admin', 'admin', '2023-05-04', '2023-05-18', '$2y$10$yYpYmvllKakYi2sELIMZQeNoeO5/DPyS2bB8alLuP5rZju1pe5dV.', 'admin@admin', NULL, 'A', 0),
(93, 'z', 'z', 'z', '2008-08-08', '2023-05-25', '$2y$10$XgFcLoz2CGx68KLNyCuTMuMclHmBZ57Qd9PP3mgwBfRT/Xmd0WgWy', 'z@z', NULL, 'U', 0),
(94, 'h', 'h', 'h', '2008-08-08', '2023-05-25', '$2y$10$M0oaWGfSWBKpI9Ti0V411Ojk0.E1VnqzQxuzJ28A5.4NOOvs3a8A6', 'h@h', NULL, 'U', 0),
(95, 'u', 'u', 'u@u', '2023-05-03', '2023-05-25', 'u', 'u@u', NULL, 'U', 0),
(96, 'v', 'v', 'v', '2008-08-08', '2023-05-25', '$2y$10$vMwa7uFEHetc425oDsP.HOA87mblea/WcT7gAo7p.Zc9eS4B8ltJa', 'v@v', NULL, 'U', 0),
(101, 'oui', 'oui', 'oui', '2023-05-03', '2023-05-28', '$2y$10$pVEQJxpbSX/hJqQX.kLz/eUI8wQNpNTZAonRkNsTGZP0fGn6QoOuq', 'oui@oui', 'Hiro.gif', 'U', 0);

-- --------------------------------------------------------

--
-- Structure de la table `univers`
--

CREATE TABLE `univers` (
  `id_univers` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `univers`
--

INSERT INTO `univers` (`id_univers`, `id`) VALUES
(6, 76),
(93, 93),
(94, 94),
(95, 96),
(97, 101);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ami`
--
ALTER TABLE `ami`
  ADD PRIMARY KEY (`id_amitie`),
  ADD KEY `id_membre1` (`id_membre1`),
  ADD KEY `id_membre2` (`id_membre2`);

--
-- Index pour la table `etoile`
--
ALTER TABLE `etoile`
  ADD PRIMARY KEY (`id_etoile`),
  ADD UNIQUE KEY `galaxie_etoile` (`id_galaxie`);

--
-- Index pour la table `galaxie`
--
ALTER TABLE `galaxie`
  ADD PRIMARY KEY (`id_galaxie`),
  ADD KEY `univers_galaxie` (`id_univers`);

--
-- Index pour la table `membre`
--
ALTER TABLE `membre`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `univers`
--
ALTER TABLE `univers`
  ADD PRIMARY KEY (`id_univers`),
  ADD UNIQUE KEY `univers_membre` (`id`) USING BTREE;

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ami`
--
ALTER TABLE `ami`
  MODIFY `id_amitie` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `etoile`
--
ALTER TABLE `etoile`
  MODIFY `id_etoile` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `galaxie`
--
ALTER TABLE `galaxie`
  MODIFY `id_galaxie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `membre`
--
ALTER TABLE `membre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT pour la table `univers`
--
ALTER TABLE `univers`
  MODIFY `id_univers` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ami`
--
ALTER TABLE `ami`
  ADD CONSTRAINT `ami_ibfk_1` FOREIGN KEY (`id_membre1`) REFERENCES `membre` (`id`),
  ADD CONSTRAINT `ami_ibfk_2` FOREIGN KEY (`id_membre2`) REFERENCES `membre` (`id`);

--
-- Contraintes pour la table `etoile`
--
ALTER TABLE `etoile`
  ADD CONSTRAINT `etoile_ibfk_1` FOREIGN KEY (`id_galaxie`) REFERENCES `galaxie` (`id_galaxie`);

--
-- Contraintes pour la table `galaxie`
--
ALTER TABLE `galaxie`
  ADD CONSTRAINT `galaxie_ibfk_1` FOREIGN KEY (`id_univers`) REFERENCES `univers` (`id_univers`);

--
-- Contraintes pour la table `univers`
--
ALTER TABLE `univers`
  ADD CONSTRAINT `univers_ibfk_1` FOREIGN KEY (`id`) REFERENCES `membre` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
