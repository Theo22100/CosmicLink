# DESIGN.md

## Organisation de la base de données

 
Pour la base de données on a 6 tables. La plus importante et celle de membre puisqu’elle sert de clef étrangère à presque toutes les autres. Comme on peut le voir un univers est lié à un utilisateur et pas l’inverse ce qui pourrait permettre à l’avenir d’avoir plusieurs univers. On a ensuite une étoile forcément liée à une galaxie qui elle-même est liée à un univers. 
Au niveau de l’organisation des étoiles, deux étoiles au sein d’une même galaxie ne peuvent pas avoir le même nom. Et les galaxies d’un même univers ont toujours un nom unique. Chaque univers est créé avec une galaxie ‘undefined’.
Au niveau de la table d’amis, on a choisi des statuts en format de caractères pour permettre à l’avenir d’ajouter des fonctionnalités comme le blocage de personnes et de messages.
Les views comme indiqué sur les schémas sont utilisés pour faciliter les requêtes vers la base de données, elle ne duplique pas les données des tables. Elles sont presque toutes utilisées dans les fonctionnalités du chat, et la partie sociale.

## Organisation des packages

Le projet est organisé en package. Chacun pour une fonctionnalité du site. On en a donc un pour le chat, le panel admin, l’inscription et la connexion, les étoiles et les galaxies.
Comme vous pouvez le voir sur le schéma ci-dessous, voici les façons de voyager entre les différentes pages. Où la page principale est home.php, et en fonction de l’état de la session (connecté ou non) redirige vers les pages de login.
 

#### Explication page home
Pour ce qui est de la page principale, on a des interfaces qui fonctionnent avec javascript afin de ne pas rafraichir la page et perdre les déplacements effectués par l’utilisateur. Elles finissent toute par le mot clef « Interface » et étendent chacune la classe principale InterfaceClass, qui contient les fonctions d’ouverture et de fermeture de l’interface, avec la possibilité de choisir si l’interface doit être fermé aux clics en dehors de celle-ci. 
Tous les fichiers se terminant par DB sont ceux utilisé par Ajax, et qui permettent un lien vers la base de données sans redirection. On a donc ceux pour les étoiles starDB (qui réalise les requêtes d’ajout, d’édition, de déplacement liée aux étoiles etc..), galaxyDB (similaire à starDB mais pour les galaxies), friendDB, chatDB et dbFunctions (qui sont tous des fichiers liés au chat, pour les listes des amis et d’attente, les messages et les photos de profils).
Les fichiers contenus dans univers/classes sont tous ceux qui seront exécutés dès le chargement d’un nouvel univers (home.php ou visit.php), ils permettent l’affichage de toutes les galaxies et étoiles déjà existantes à partir des informations de la base de données.
Les classes javascript starClass et galaxyClass gèrent chaque objet html lié aux étoiles et galaxies et facilitent la sauvegarde d’informations sans appel constant à la base de données.

  
Ci-dessus sont représentés des schémas de l’interface chat : l’onglet ‘Connect’ à gauche et ‘Friends’ à droite. Leur fonctionnement est similaire mais les données envoyés et reçues diffèrent selon le cas.
Le dossier /global contient tous les fichiers servant pour la quasi-intégralité des pages, on peut y retrouver les styles css (qui contiennent les couleurs, le menu footer) et les fichiers js, class d’interface, et les pages visit et home (permettant le fonctionnement des listeners de l’écran).
Retrouvez ci-dessous des diagrammes de séquence détaillant quelques scénarios possibles : l’un pour l’ajout d’une étoile, l’autre pour l’envoi d’un message dans le chat.

 

 

#### Explication page settings (compte)

Tous les fichiers (php et css) liés à la page compte sont présent dans le dossier du même nom. On a donc la page principale compte.php et en fonction du bouton (change image, password etc…) une redirection vers un script php s’effectue (le nom du script est celui de l’action effectuée).
Pour ce qui est des attributs mail, pseudo, nom, prénom, date de naissance et mot de passe, ils sont stockés sur la base de donnée phpMyAdmin, seul la photo de profil et directement téléversé sur les fichiers serveur dans l’emplacement img/profil/[id du compte]/profile-pic.png.
Ci-dessous un diagramme de séquence de l’action suppression de compte.

 

#### Explication page admin

Tout comme la page compte, la page admin est stockée sur un dossier du nom d’admin, on a ensuite toutes les fonctionnalités list_admin, list_user, statistiques, user_modifier et autres qui sont retrouvés dans leurs fichiers php correspondant. Tous les autres fichiers css et js liés à celle-ci sont retrouvés dans le dossier.
En plus des fonctionnalités admin le fichier regroupe aussi les pages d’erreurs 500, 404 et 401, ainsi que leurs css.

#### Explication des pages login

Les pages logins ont été faites en php, la page principale est login et celle du nom de login1 sert à recevoir toutes les informations contenues dans les formulaires et de les envoyer dans la base de données.
Ci-dessous un diagramme de séquence détaillant une connexion réussie.
 

#### Explication des pages sinscrire

Tout comme login, on a deux pages php, sinscrire et sinscrire2, où sinscrire2 vérifie que les informations rentrées par l’utilisateur sont correctes (mot de passe sécurisé, email valide, pseudo unique). 
Ci-dessous un diagramme de séquence détaillant une inscription réussie.
 
