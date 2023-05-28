<?php
session_start();
if (!isset($_SESSION['login'])) {
	header('Location: ../login-inscription/login.php');
}
?>
<html>

<head>
	<title>Mon Compte CosmicLink</title>
	<meta charset=”utf-8″>
</head>

<body>
	<div class="main">
		<div class="register">


			<?php
			if ($_GET["message"] == "mdpreussie") {
				echo '<h2 style="color:green;">Mot de passe changé</h2>';
			} else if ($_GET["message"] == "mdpechoue") {
				echo '<h2 style="color:red;">Erreur mot de passe</h2>';
			} else if ($_GET["message"] == "mdp") {
				echo '<h2 style="color:red;">Le mot de passe n\'est pas le même !</h2>';
			} else if ($_GET["message"] == "mailreussi") {
				echo '<h2 style="color:green;">Mail changé !</h2>';
			} else if ($_GET["message"] == "mailechoue") {
				echo '<h2 style="color:red;">Erreur mail !</h2>';
			} else if ($_GET["message"] == "mail") {
				echo '<h2 style="color:red;">Mail déjà existant !</h2>';
			} else if ($_GET["message"] == "prenomechoue") {
				echo '<h2 style="color:red;">Erreur avec le prénom saisi !</h2>';
			} else if ($_GET["message"] == "prenomreussi") {
				echo '<h2 style="color:green;">Prénom changé !</h2>';
			} else if ($_GET["message"] == "nomechoue") {
				echo '<h2 style="color:red;">Erreur avec le nom saisi !</h2>';
			} else if ($_GET["message"] == "nomreussi") {
				echo '<h2 style="color:green;">Nom changé !</h2>';
			} else if ($_GET["message"] == "deletemdp") {
				echo '<h2 style="color:red;">Suppression Compte : Mot de passe incorrect</h2>';
			} else if ($_GET["message"] == "photoechoue") {
				echo '<h2 style="color:red;">Erreur : Changement de Photo non effectué</h2>';
			} else if ($_GET["message"] == "phototaille") {
				echo '<h2 style="color:red;">Erreur : Taille de Photo supérieur à 2Mo</h2>';
			} else if ($_GET["message"] == "photoreussi") {
				echo '<h2 style="color:green;">Photo changée !</h2>';
			}

			if ($_SESSION['role'] == "A") {
				echo '<a href="../admin/index.php">Panel admin</a>';
			}
			
			?>

			<!-- Modifier Photo -->

			<div class="clear"> </div>
			<form method="POST" action="modifiephoto.php" enctype="multipart/form-data">
				<div class="register-bottom-grid">
					<h3>Changez votre Photo de Profil (Actuellement :
						<?php
						try { //Connexion BDD
							$servername = "localhost";
							$username = "root";
							$password_db = "root";
							$dbname = "projet";

							$connexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password_db);
							$connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
						} catch (PDOException $e) {
							echo 'Echec Connexion : ' . $e->getMessage();
						}

						try { //Requete Image
							$requete_image = $connexion->prepare("SELECT image FROM membre WHERE id= :id");

							$requete_image->bindParam(':id', $_SESSION['id']);

							$requete_image->execute();

							$lienimage = $requete_image->fetchColumn();
							echo "<td> " . $nbutil . "</td>";
						} catch (PDOException $e) {
							echo 'Echec Calcul Utilisateur : ' . $e->getMessage();
						}
						if ($lienimage == NULL) {
							echo ("<img src='../../img/profile-pic.png' alt='profile picture' width='auto' height='100px' />");
						} else {
							echo ("<img src='../../img/profil/".$_SESSION['id']."/" . $lienimage . "' alt='" . $lienimage . "' width='auto' height='100px' />");
						}

						?>
						

						)
					</h3>
				</div>
				<input type="file" name="image" id="image" accept='image/*'> 
				
				<div>
						(Max 2Mo)
				</div>
				<input type="submit" name="modifiephoto" value="Modifier">
			</form>
			<div class="clear"> </div>
			<div>
				<span>Prénom<label></label></span>
				<input type="text" name="prenom" id="prenom" required="required" maxlength="30">
				<input type="submit" name="modifierprenom" value="Modifier">
			</div>
			<div class="clear"> </div>
		</div>
		</form>

		<!-- Modifier nom -->

		<div class="clear"> </div>
		<form method="POST" action="modifieprenom.php">
			<div class="register-bottom-grid">
				<h3>Changez votre Prénom (Actuellement :
					<?php
					echo $_SESSION['prenom'];

					?>
					)
				</h3>

				<div>
					<span>Prénom<label></label></span>
					<input type="text" name="prenom" id="prenom" required="required" maxlength="30">
					<input type="submit" name="modifierprenom" value="Modifier">
				</div>
				<div class="clear"> </div>
			</div>
		</form>

		<div class="clear"> </div>
		<!-- Modifier nom -->
		<form method="POST" action="modifienom.php">
			<div>
				<h3>Changez votre Nom (Actuellement :
					<?php
					echo $_SESSION['nom'];

					?>
					)
				</h3>
				<div>
					<span>Nom<label></label></span>
					<input type="text" name="nom" id="nom" required="required" maxlength="30">
					<input type="submit" name="modifiernom" value="Modifier">
				</div>
			</div>
		</form>

		<div class="clear"> </div>
		<!-- Modifier email -->
		<form method="POST" action="modifiemail.php">
			<div class="register-bottom-grid">
				<h3>Changez votre Mail (Actuellement :
					<?php
					echo $_SESSION['mail'];

					?>
					)
				</h3>
				<div>
					<span>Mail<label></label></span>
					<div>
						<input type="mail" name="mail" id="mail" required="required" maxlength="60">
					</div>
					<div>
						<input type="submit" name="modifiermail" value="Modifier">
					</div>
				</div>
				<div class="clear"> </div>
			</div>
		</form>

		<div class="clear"> </div>
		<!-- Modifier mdp -->
		<form method="POST" action="modifiemdp.php">
			<div class="register-bottom-grid">
				<h3>Changez votre Password</h3>
				<div>
					<span>Password</span>
					<input type="password" name="password" id="password" required="required" maxlength="50">
				</div>

				<div>
					<span>Retapez votre Password</span>
					<input type="password" name="confirm_password" id="confirm_password" required="required"
						maxlength="50">
				</div>

				<div class="register-but">
					<input type="submit" name="envoyermdp" value="Modifier">


				</div>

			</div>
		</form>
		<!-- Supprime compte -->
		<form method="POST" action="deleteaccount.php"
			onsubmit="return confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')">
			<div class="register-bottom-grid">
				<h3>Supprimer votre compte</h3>
				<div>
					<span>Mot de Passe actuel</span>
					<input type="password" name="password" id="password" required="required" maxlength="50">
				</div>
				<div class="register-but">
					<input type="submit" name="envoyermdp" value="Supprimer votre Compte">
				</div>

			</div>
		</form>
		<!-- Ajouter ami -->
		<?php
		if ($_GET["message"] == "idintroubable") {
			echo '<h3 style="color:red;">Pseudo Introuvable</h2>';
		} else if ($_GET["message"] == "erreurami") {
			echo '<h3 style="color:red;">Erreur : Impossible de l\'ajouter en ami, veuillez réessayer !</h2>';
		} else if ($_GET["message"] == "ajoutami") {
			echo '<h3 style="color:green;">Demande envoyé avec succès</h2>';
		} else if ($_GET["message"] == "bdd") {
			echo '<h3 style="color:red;">Erreur : Impossibilité de se connecter à la BDD</h2>';
		} else if ($_GET["message"] == "idutil") {
			echo '<h3 style="color:red;">Erreur : Soucis utilisateur</h2>';
		} else if ($_GET["message"] == "ami") {
			echo '<h3 style="color:red;">Erreur : Vous ne pouvez pas vous ajouter en ami.</h2>';
		} else if ($_GET["message"] == "amideja") {
			echo '<h3 style="color:red;">Vous êtes déjà ami avec cette personne.</h2>';
		} else if ($_GET["message"] == "amiattente") {
			echo '<h3 style="color:red;">Vous avez déjà envoyé une demande à cette personne, veuillez attendre que la personnne accepte.</h2>';
		}
		?>
		<div class="register-bottom-grid">
			<form method="POST" action="ajouterami.php">
				<h3>Ajouter Ami</h3>
				<div>
					<span>Saississez le pseudo :</span>
					<div>
						<input type="text" name="ami" id="ami" required="required" maxlength="60">
					</div>
					<div>
						<input type="submit" name="ajouterami" value="Ajouter">
					</div>
				</div>
			</form>
		</div>
	</div>

	<?php
	$connexion = null;
	?>

</body>