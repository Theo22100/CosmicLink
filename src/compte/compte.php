<?php
session_start();
if (!isset($_SESSION['login'])) {
	header('Location: ../login-inscription/login.php');
}
?>
<html>

<head>
	<title>Mon Compte MySpace</title>
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
			}else if ($_GET["message"] == "prenomechoue") {
				echo '<h2 style="color:red;">Erreur avec le prénom saisi !</h2>';
			} else if ($_GET["message"] == "prenomreussi") {
				echo '<h2 style="color:green;">Prénom changé !</h2>';
			} else if ($_GET["message"] == "nomechoue") {
				echo '<h2 style="color:red;">Erreur avec le nom saisi !</h2>';
			} else if ($_GET["message"] == "nomreussi") {
				echo '<h2 style="color:green;">Nom changé !</h2>';
			}  else if ($_GET["message"] == "deletemdp") {
				echo '<h2 style="color:red;">Suppression Compte : Mot de passe incorrect</h2>';
			} 

			if ($_SESSION['role'] == "A") {
				echo '<a href="../admin/index.php">Panel admin</a>';
			}
			?>

			
			
			<!-- Modifier nom -->

			<div class="clear"> </div>
			<form method="POST" action="modifieprenom.php">
				<div class="register-bottom-grid">
					<h3>Changez votre Prénom (Actuellement :
						<?php
						echo $_SESSION['prenom'];

						?>
						)</h3>

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
						)</h3>
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
						)</h3>
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
						<input type="password" name="confirm_password" id="confirm_password" required="required" maxlength="50">
					</div>

					<div class="register-but">
						<input type="submit" name="envoyermdp" value="Modifier">


					</div>

				</div>
			</form>
			<!-- Modifier mdp -->
			<form method="POST" action="deleteaccount.php" onsubmit="return confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')">
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
		</div>
		<br>

</body>