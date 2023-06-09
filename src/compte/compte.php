<?php
session_start();
if (!isset($_SESSION['login'])) {
	header('Location: ../login-inscription/login.php');
}
?>
<!DOCTYPE html>
<html>

<head>
	<title>My Account CosmicLink</title>
	<meta charset=”utf-8″>
	<link rel="stylesheet" href="compte.css">
	<link rel="stylesheet" href="./../css/global.css">
</head>

<body>
	<div class="main">
		<div class="register">


			<?php
			if (isset($_GET['message'])) {
				if ($_GET["message"] == "mdpreussie") {
					echo '<h2 style="color:green;">Mot de passe changé</h2>';
				} else if ($_GET["message"] == "mdpechoue") {
					echo '<h2 style="color:red;">Erreur mot de passe</h2>';
				} else if ($_GET["message"] == "mdp") {
					echo '<h2 style="color:red;">Le mot de passe n\'est pas le même !</h2>';
				} else if ($_GET["message"] == "mailechoue") {
					echo '<h2 style="color:red;">Erreur mail !</h2>';
				} else if ($_GET["message"] == "mail") {
					echo '<h2 style="color:red;">Mail déjà existant !</h2>';
				} else if ($_GET["message"] == "prenomechoue") {
					echo '<h2 style="color:red;">Erreur avec le prénom saisi !</h2>';
				} else if ($_GET["message"] == "nomechoue") {
					echo '<h2 style="color:red;">Erreur avec le nom saisi !</h2>';
				} else if ($_GET["message"] == "deletemdp") {
					echo '<h2 style="color:red;">Suppression Compte : Mot de passe incorrect</h2>';
				} else if ($_GET["message"] == "photoechoue") {
					echo '<h2 style="color:red;">Erreur : Changement de Photo non effectué</h2>';
				} else if ($_GET["message"] == "phototaille") {
					echo '<h2 style="color:red;">Erreur : Taille de Photo supérieur à 2Mo</h2>';
				} else if ($_GET["message"] == "modif") {
					echo '<h2 style="color:green;">Changements Effectués !</h2>';
				}
			}

			if (isset($_SESSION['role']) && $_SESSION['role'] == "A") {
				echo '<a href="../admin/index.php">Panel admin</a>';
			}

			?>

			<!-- Modifier Photo -->

			<div class="clear"> </div>
			<form method="POST" action="modifiephoto.php" enctype="multipart/form-data">
				<div class="register-bottom-grid">
					<h3>Change you profile picture (Currently :
						<?php

						if ($_SESSION['image'] == NULL) {
							echo ("<img src='../../img/profile-pic.png' alt='profile picture' width='auto' height='100px' />");
						} else {
							echo ("<img src='../../img/profil/" . $_SESSION['id'] . "/" . $_SESSION['image'] . "' alt='" . $_SESSION['image'] . "' width='auto' height='100px' />");
						}

						?>


						)
					</h3>
				</div>

				<input type="file" name="image" id="image" accept='image/*' >

				<div>
					(Max 2Mo)
				</div>
				<input type="submit" name="modifiephoto" id="modifButton" value="Change">
			</form>
			<div class="clear"> </div>


		</div>

		<!-- Modifier nom -->

		<div class="clear"> </div>
		<form method="POST" action="modifall.php">
			<div class="register-bottom-grid">
				<h3>Change your First Name (Currently :
					<?php
					echo $_SESSION['prenom'];

					?>
					)
				</h3>

				<div>
					<!-- <span>Prénom<label></label></span> -->
					<input type="text" name="prenom" id="prenom" maxlength="30" placeholder="First Name">

				</div>
				<div class="clear"> </div>
			</div>

			<div class="clear"> </div>
			<!-- Modifier nom -->
			<div>
				<h3>Change your Last Name (Currently :
					<?php
					echo $_SESSION['nom'];

					?>
					)
				</h3>
				<div>
					<!-- <span>Nom<label></label></span> -->
					<input type="text" name="nom" id="nom" maxlength="30" placeholder="Last Name">
				</div>
			</div>

			<div class="clear"> </div>
			<!-- Modifier email -->
			<div class="register-bottom-grid">
				<h3>Change your Mail (Currently :
					<?php
					echo $_SESSION['mail'];

					?>
					)
				</h3>
				<div>
					<!-- <span>Mail<label></label></span> -->
					<div>
						<input type="mail" name="mail" id="mail" maxlength="60" placeholder="Mail">
					</div>
					<div>

						<input type="submit" name="modifierall" id="modifButton" value="Change">

					</div>
				</div>
			</div>
		</form>

		<div class="clear"> </div>
		<!-- Modifier mdp -->
		<form method="POST" action="modifiemdp.php">
			<div class="register-bottom-grid">
				<h3>Change your Password</h3>
				<div>
					<!-- <span>Password</span> -->
					<input type="password" name="password" id="password" required="required" maxlength="50" placeholder="Password">
				</div>

				<div>
					<!-- <span>Retapez votre Password</span> -->
					<input type="password" name="confirm_password" id="confirm_password" required="required" maxlength="50" placeholder="Confirm Password">
				</div>

				<div class="register-but">
					<input type="submit" name="envoyermdp" id="modifButton" value="Change">


				</div>

			</div>
		</form>
		<!-- Supprime compte -->
		<form method="POST" action="deleteaccount.php" onsubmit="return confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')">
			<div class="register-bottom-grid">
				<h3>Delete your Account</h3>
				<div>
					<!-- <span>Mot de Passe actuel</span> -->
					<input type="password" name="password" id="password" required="required" maxlength="50" placeholder="Type your Password">
				</div>
				<div class="register-but">
					<input type="submit" name="envoyermdp" id="modifButton" value="Delete">
				</div>

			</div>
		</form>
		<!-- Ajouter ami -->
		<?php
		if (isset($_GET['message'])) {
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
		}
		?>
		<div class="register-bottom-grid">
			<form method="POST" action="ajouterami.php">
				<h3>Add Friend</h3>
				<div>
					<span>Enter pseudo :</span>
					<div>
						<input type="text" name="ami" id="ami" required="required" maxlength="60" placeholder="Pseudo">
					</div>

					<div>
						<input type="submit" name="ajouterami"  id="modifButton" value="Add">

					</div>
				</div>
			</form>
		</div>

		<div class="return" >

			<a href="./../home.php">Back to galaxy</a>
		</div>


	</div>

	<div class="back"></div>
</body>



</body>