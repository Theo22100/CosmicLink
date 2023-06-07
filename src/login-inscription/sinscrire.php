<?php
session_start();
if (isset($_SESSION['login'])) {
	header('Location:./home.php');
}
?>

<html>

<head>
	<title>Inscription MySpace</title>
	<meta charset=”utf-8″>
	<link rel="stylesheet" href="./style_login.css">
</head>

<body>
	<div class="main">
		<div class="box">
			<div class="register">


				<?php
				if (isset($_GET['message'])) {
					if ($_GET["message"] == "reussie") {
						echo '<h2 style="color:green;">Inscription réussie</h2>';
						echo '<p> You\'ll be redirected to the login page in 5 seconds. Or <a href="./login.php">click here </a> to be redirected immediately. </h2>';
						header('Refresh: 5; ./login.php');
					} else if ($_GET["message"] == "echoue") {
						echo '<h2 style="color:red;">Inscription non valide</h2>';
					} else if ($_GET["message"] == "mdp") {
						echo '<h2 style="color:red;">Le mot de passe n\'est pas le même !</h2>';
					} else if ($_GET["message"] == "champ") {
						echo '<h2 style="color:red;">Veuillez remplir tous les champs !</h2>';
					} else if ($_GET["message"] == "pseudo") {
						echo '<h2 style="color:red;">Pseudonyme déjà pris !</h2>';
					} else if ($_GET["message"] == "mail") {
						echo '<h2 style="color:red;">Vous avez un compte associé à cet email !</h2>';
					}
				}
				?>


				<form method="POST" action="sinscrire2.php">
					<div class="register-top-grid">
						<h3>Vos informations</h3>

						<div>
							<span>Pseudonyme<label>*</label></span>
							<input type="text" name="pseudo" id="pseudo" required="required" maxlength="30" placeholder="Pseudo">
						</div>

						<div>
							<span>Prénom<label>*</label></span>
							<input type="text" name="prenom" id="prenom" required="required" maxlength="30" placeholder="First Name">
						</div>


						<div>
							<span>Nom<label>*</label></span>
							<input type="text" name="nom" id="nom" required="required" maxlength="30" placeholder="Name">
						</div>

						<div>
							<span>Date de Naissance<label>*</label></span>
							<input type="date" name="datenaissance" id="datenaissance" required="required" max="<?php echo date('Y-m-d'); ?>">
						</div>

						<div>
							<span>Email<label>*</label></span>
							<input type="mail" name="mail" id="mail" required="required" maxlength="60" placeholder="Mail">
						</div>



						<div class="clear"> </div>

					</div>

					<div class="register-bottom-grid">
						<h3>Pour vous authentifier</h3>
						<div>
							<span>Mot de Passe<label>*</label></span>
							<input type="password" name="password" id="password" placeholder="eR8!z6$" required="required" maxlength="50">
						</div>

						<div>
							<span>Retapez votre Mot de Passe<label>*</label></span>
							<input type="password" name="confirm_password" id="confirm_password" placeholder="eR8!z6$" required="required" maxlength="50">
						</div>

						<div class="register-but">
							<input type="submit" name="envoyer" value="M'inscrire">

						</div>

					</div>

			</div>
			</form>

			<div class="clear"> </div>
			<div class="register">
				<h3>Already have your universe ?</h3>
				<p><a class="acount-btn" href="./login.php">Connect here</a> to get back to your universe !</p>

			</div>

		</div>

		<div class="clear"></div>
	</div>
	</div>
	<!-- fin de la partie contenu -->
	<div class="back"></div>
</body>

</html>