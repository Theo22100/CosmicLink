<?php
require '../chat/dbFunctions.php';
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
	<link rel="icon" type="image/x-icon" href="../../img/favicon.ico">
	<link rel="stylesheet" href="compte.css">
	<link rel="stylesheet" href="./../global/css/global.css">
	< </head>

<body>
	<div class="main">



		<div class="register">


			<?php
			if (isset($_GET['message'])) {
				if ($_GET["message"] == "mdpreussie") {
					echo '<h2 style="color:green;">Password changed</h2>';
				} else if ($_GET["message"] == "mdpechoue") {
					echo '<h2 style="color:red;">Password Error</h2>';
				} else if ($_GET["message"] == "mdp") {
					echo '<h2 style="color:red;">The passwords typed don\'t match !</h2>';

				} else if ($_GET["message"] == "mailechoue") {
					echo '<h2 style="color:red;">E-mail error !</h2>';
				} else if ($_GET["message"] == "mail") {
					echo '<h2 style="color:red;">An account is already aassociated with this e-mail !</h2>';
				} else if ($_GET["message"] == "prenomechoue") {
					echo '<h2 style="color:red;">Name error !</h2>';
				} else if ($_GET["message"] == "nomechoue") {
					echo '<h2 style="color:red;">Surname error !</h2>';
				} else if ($_GET["message"] == "deletemdp") {
					echo '<h2 style="color:red;">Account deletion : Wrong password</h2>';
				} else if ($_GET["message"] == "photoechoue") {
					echo '<h2 style="color:red;">Picture couldn\'t be updated. </h2>';
				} else if ($_GET["message"] == "phototaille") {
					echo '<h2 style="color:red;">Picture size must be inferior to 2Mo.</h2>';
				} else if ($_GET["message"] == "modif") {
					echo '<h2 style="color:green;">Modifications successful !</h2>';
				}
			}

			if (isset($_SESSION['role']) && $_SESSION['role'] == "A") {
				echo '<a href="../admin/index.php">Panel admin</a>';
			}

			?>
		</div>
		<!-- Modifier Photo -->
		<div id="picture-section">
			<form class="photo" method="POST" action="modifiephoto.php" enctype="multipart/form-data">
				<div class="register-bottom-grid">
					<h3>Change you profile picture (Currently :
						<?php
						$link = DBFunctions::getProfilePicFromUserId($_SESSION['id']);
						echo ("<img src='../" . $link . "' alt='profile picture' width='auto' height='100px' />");

						?>


						)
					</h3>
				</div>

				<input type="file" name="image" id="image" accept='image/*'>

				<div>
					<p>(Max 2Mo)</p>
				</div>
				<input type="submit" name="modifiephoto" id="modifButton" value="Change">
			</form>
		</div>
		<hr class="rounded">
		<div id='columns'>
			<div id="info-section">
				<!-- Modifier nom -->
				<form class="Info" method="POST" action="modifall.php">
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
					</div>

			<div class="clear"> </div>
			<!-- Modifier mdp -->
			<form class="Password" method="POST" action="modifiemdp.php onsubmit="return verifierMotDePasse()">
				<div class="register-bottom-grid">
					<h3>Change your Password</h3>
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
								<input type="mail" name="mail" id="mail" maxlength="60" placeholder="Mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$">
							</div>
							<div>

								<input type="submit" name="modifierall" id="modifButton" value="Change">

							</div>
						</div>
					</div>
				</form>
			</div>
			<div id="account-section">
				<!-- Modifier mdp -->
				<form class="Password" method="POST" action="modifiemdp.php">
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
				<form class="Delete" method="POST" action="deleteaccount.php" onsubmit="return confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')">
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
			<!-- Ajout JS pour Mot de pass Sécurisé + Même MDP -->
			<script>
							function verifierMotDePasse() {
								var password = document.getElementById("password").value;
								var confirm_password = document.getElementById("confirm_password").value;

								// Vérifier si le mot de passe est sécurisé
								if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(password)) {
									alert("The password must contain at least 8 characters, including at least one number, one lowercase letter, one uppercase letter and one special character.");
									return false;
								}

								// Vérifier si les deux mots de passe correspondent
								if (password !== confirm_password) {
									alert("The passwords don't match.");
									return false;
								}

								// Validation réussie, soumission du formulaire
								return true;
							}
			</script>
			<!-- Supprime compte -->
			<form class="Delete" method="POST" action="deleteaccount.php"
				onsubmit="return confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')">
				<div class="register-bottom-grid">
					<h3>Delete your Account</h3>
					<div>
						<!-- <span>Mot de Passe actuel</span> -->
						<input type="password" name="password" id="password" required="required" maxlength="50"
							placeholder="Type your Password">
					</div>
				</form>
			</div>
		</div>


		<hr class="rounded">
		<div class="return">
			<button onclick="location.href='../home.php'" type="button">
				Back to universe</button>

		</div>


	</div>

	<div class="back"></div>
</body>



</body>