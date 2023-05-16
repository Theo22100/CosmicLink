-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 16 mai 2023 à 11:28
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
  `id_membre1` int(11) NOT NULL,
  `id_membre2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `etoile`
--

CREATE TABLE `etoile` (
  `id_etoile` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `description` text,
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
  `cox` int(11) NOT NULL,
  `coy` int(11) NOT NULL,
  `id_univers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `role` varchar(1) NOT NULL DEFAULT 'U',
  `login` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `membre`
--

INSERT INTO `membre` (`id`, `pseudo`, `prenom`, `nom`, `datenaissance`, `dateinscription`, `password`, `mail`, `role`, `login`) VALUES
(74, 'admin', 'admin', 'admin', '2006-06-06', '2023-05-15', '$2y$10$97Al5ULlPLtgxiJZR4cqX.O7NKe/DaB5ltzusowu6AovrspIbFiwq', 'admin@admin', 'A', 0),
(76, 'a', 'a', 'a', '2006-06-06', '2023-05-16', '$2y$10$ZR7eeo41zrh9J4Sp97clk.MmhJSZAA4wP95a0CwJqQP5fnhLkpcy.', 'a@a', 'U', 0);

-- --------------------------------------------------------

--
-- Structure de la table `univers`
--

CREATE TABLE `univers` (
  `id_univers` int(11) NOT NULL,
  `id_membre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ami`
--
ALTER TABLE `ami`
  ADD PRIMARY KEY (`id_membre1`,`id_membre2`),
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
  ADD UNIQUE KEY `univers_membre` (`id_membre`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `etoile`
--
ALTER TABLE `etoile`
  MODIFY `id_etoile` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `galaxie`
--
ALTER TABLE `galaxie`
  MODIFY `id_galaxie` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `membre`
--
ALTER TABLE `membre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT pour la table `univers`
--
ALTER TABLE `univers`
  MODIFY `id_univers` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `univers_ibfk_1` FOREIGN KEY (`id_membre`) REFERENCES `membre` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
