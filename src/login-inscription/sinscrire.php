<?php
session_start();
if (isset($_SESSION['login'])) {
	header('Location:./home.php');
}
?>

<html>
	<head>
		<title>Registration CosmicLink</title>
		<meta charset=”utf-8″>
		<link rel="stylesheet" href="./style_login.css">
		<link rel="stylesheet" href="./../global/css/global.css">
	</head>
	<body>
		<div class="main">
			<div class = "box">
				<div class="register">


				<?php
				if (isset($_GET['message'])) {
					if ($_GET["message"] == "reussie") {
						echo '<h2 style="color:green;">Inscription réussie</h2>';
						echo '<p> You\'ll be redirected to the login page in 5 seconds. Or <a href="./login.php">click here </a> to be redirected immediately. </h2>';
						header('Refresh: 5; ./login.php');
					} else if ($_GET["message"] == "echoue") {
						echo '<h2 style="color:red;">Sign up non valid</h2>';
					} else if ($_GET["message"] == "mdp") {
						echo '<h2 style="color:red;">Password is different !</h2>';
					} else if ($_GET["message"] == "champ") {
						echo '<h2 style="color:red;">Please enter all fields !</h2>';
					} else if ($_GET["message"] == "pseudo") {
						echo '<h2 style="color:red;">NickName already taken !</h2>';
					} else if ($_GET["message"] == "mail") {
						echo '<h2 style="color:red;">This email is already used !</h2>';
					} else if ($_GET["message"] == "mailinvalide"){
						echo '<h2 style="color:red;>Email not valid!</h2>';
					}
				}
				?>


				<form method="POST" action="sinscrire2.php" onsubmit="return verifierMotDePasse()">
					<div class="register-top-grid">
						<h3>Your informations</h3>

						<div>
							<span>Pseudo<label>*</label></span>
							<input type="text" name="pseudo" id="pseudo" required="required" maxlength="30" placeholder="Pseudo">
						</div>

						<div>
							<span>First Name<label>*</label></span>
							<input type="text" name="prenom" id="prenom" required="required" maxlength="30" placeholder="First Name">
						</div>


						<div>
							<span>Last Name<label>*</label></span>
							<input type="text" name="nom" id="nom" required="required" maxlength="30" placeholder="Name">
						</div>

						<div>
							<span>Birthday<label>*</label></span>
							<input type="date" name="datenaissance" id="datenaissance" required="required" max="<?php echo date('Y-m-d'); ?>">
						</div>

						<div>
							<span>Email<label>*</label></span>
							<input type="mail" name="mail" id="mail" required="required" maxlength="60" placeholder="Mail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$">
						</div>



						<div class="clear"> </div>

					</div>

					<div class="register-bottom-grid">
						<h3>To log in</h3>
						<div>
							<span>Password<label>*</label></span>
							<input type="password" name="password" id="password" placeholder="eR8!z6$a" required="required" maxlength="50">
						</div>

						<div>
							<span>Confirm Password<label>*</label></span>
							<input type="password" name="confirm_password" id="confirm_password" placeholder="eR8!z6$a" required="required" maxlength="50">
						</div>

						<div class="register-but">
							<input id="register" type="submit" name="envoyer" value="M'inscrire">

						</div>

					</div>

			</div>
			</form>

			<!-- JS pour faire un MDP sécurisé et que ça soit le même -->

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