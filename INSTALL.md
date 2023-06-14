# Comment utiliser le projet 

## Construction du projet à partir du code source :

Pour pouvoir lancer le projet il faudra télécharger une application pour créer un serveur local php. Ici sera détaillé comment lancer le projet avec MAMP (voir https://www.mamp.info/en/downloads/), mais le fonctionnement est similaire pour WAMP et XAMPP.

#### Mise en place de MAMP

Une fois MAMP téléchargé, vous pourrez télécharger et déplacer les fichiers git vers le dossier MAMP/htdocs.
Puis lancez MAMP, après avoir vérifié que le serveur est bien en ligne, vous pouvez cliquer sur le bouton "open in web browser".

#### Charger la base de donnée

Vous devriez être redirigé vers la page "http://localhost/MAMP/". A partir d'ici, il faut importer la base de données dans phpMyAdmin.
Pour ce faire il suffit cliquer sur l'option tools du menu de la page, puis phpMyAdmin. Ensuite il faut créer une nouvelle base de données nommée "projet". Puis dans "import" la base de donnée, dans l'option "import" puis "Parcourir" pour sélectionner le fichier "projet_2.sql" et l'enregistrer en cliquant sur le bouton "Go" en bas de la page.

## Exécution des suites de tests :

Nous avons créé un petit jeu de test d'interaction humain-machine avec l'extension selenium.
Pour éxécuter ce jeu de test vous devez installé l'extension selenium sur votre navigateur, une fois cela fait il faut éxécuter l'extension. Ensuite ouvrer le fichier "CosmicLinkTest" puis cliquer sur la fléche "Running all test". 
Par moment les test s'arreteront sur l'ouverture de menu en cercle du site, pour faire continuer les sites passer votre souris sur l'icône de crayon ou sur l'icône d'utilisateur symbolisé par un petit personnage, et normalement les tests reprendront. 

-----Pour le moment le jeu de test pour s'éxécuter une seule fois, pour pouvoir l'éxécuter à nouveau il vous faut supprimer l'étoile et la galaxie qui ont été crééent, et de plus supprimer dans la base de données directement , les derniers messages dans la table chat, la derniere galaxie dans la table galaxies, le dernier univers dans la table univers, le dernier ami dans la table ami et enfin le dernier utilisateur nommé "DragonFly" dans la table membre.
Nous avons conscient que ce n'est pas l'idéal mais c'est la seule méthode que nous avons trouvé pour mettre en place ces tests.-----

Pour relancer le jeu de test connectez-vous avec les identifiants suivants :
        - mail: bruno.pichard@gmail.com
        - mot de passe : *Myspace0
Ouvrez le menu en cliquant sur le rond en bas du site, passez votre souris sur l'icône utilisateur, cliquez sur settings, entrez le mot de passe en bas, puis cliquez sur delete.
Il suffit ensuite de relancer le jeu de test comme expliquez ci-dessus.


## Exécution du logiciel :

Une fois toutes les étapes franchies c'est enfin le moment de visiter le site! Pour cela il suffit de visiter le lien: "http:/localhost/cosmiclink/src/home.php". 
