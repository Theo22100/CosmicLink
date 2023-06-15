# Comment utiliser le projet 

## Construction du projet à partir du code source :

Pour pouvoir lancer le projet il faudra installer un environnement de travail permettant la création d'un serveur local, avec base de données SQL et le langage PHP. Ici sera détaillé comment lancer le projet avec MAMP (pour macOS ou Windows) (voir https://www.mamp.info/en/downloads/), mais le fonctionnement est similaire pour WAMP (Windows) et XAMPP (macOS and linux).

#### Mise en place de MAMP

Une fois MAMP téléchargé, vous pourrez télécharger l'archive de la branche main (ou clean) et extraire l'ensemble des fichiers vers un dossier 'cosmiclink' dans MAMP/htdocs/, de sorte que le dossier cosmiclink corresponde à la racine du projet git (dans lequel on trouvera donc les fichiers README.md, INSTALL.md, etc.). 
Puis lancez MAMP, après avoir vérifié que le serveur est bien en ligne, vous pouvez cliquer sur le bouton "open in web browser".

#### Charger la base de donnée

La base de données pré-remplie de quelques utilisateurs se trouve dans /db/projet_2.sql.
Pour l'importer via phpMyAdmin, il suffit sur la page "http://localhost/MAMP/" de cliquer sur l'option Tools du menu de la page, puis phpMyAdmin. 
Ensuite il faut créer une nouvelle base de données nommée "projet". 
Dans l'onglet "import", cliquez sur "Parcourir" pour sélectionnez le fichier "projet_2.sql" et validez en cliquant sur le bouton "Go" en bas de la page.

## Exécution du logiciel :

Une fois toutes les étapes franchies c'est enfin le moment de visiter le site! Pour cela il suffit de visiter le lien: "http:/localhost/cosmiclink/src/home.php". Si le projet a été sauvegardé dans un autre dossier, remplacez "cosmiclink" par le nom du/des dossiers concernés (ex: le dossier "src" se trouve dans "C:/MAMP/htdocs/cosmiclink-newMain/cosmiclink-newMain" donc il faut lancer la page "http:/localhost/cosmiclink-newMain/cosmiclink-newMainink/src/home.php").

## Exécution des suites de tests :

Nous avons créé un petit jeu de test d'interaction humain-machine avec l'extension selenium.
Pour éxécuter ce jeu de test vous devez installé l'extension "Selenium IDE" sur votre navigateur.
Une fois cela fait il faut éxécuter l'extension. 
Ensuite ouvrez le fichier "CosmicLinkTest.side" dans le dossier /test puis cliquez sur la flèche "Running all test". 
Par moment les test s'arreteront sur l'ouverture de menu en cercle du site, pour faire continuer les sites passer votre souris sur l'icône de crayon ou sur l'icône d'utilisateur symbolisé par un petit personnage, et normalement les tests reprendront. 

Pour relancer le jeu de test connectez-vous avec les identifiants suivants :
        - mail: bruno.pichard@gmail.com
        - mot de passe : *Myspace0
Ouvrez le menu en cliquant sur le rond en bas du site, passez votre souris sur l'icône utilisateur, cliquez sur settings, entrez le mot de passe en bas, puis cliquez sur delete.
Il suffit ensuite de relancer le jeu de test comme expliqué ci-dessus.


