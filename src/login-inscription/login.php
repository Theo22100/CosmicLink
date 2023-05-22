<?php
session_start();
if (isset($_SESSION['login'])) {
	header('Location: ../home.php');
}
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset=”utf-8″>
		<link rel="stylesheet" href="./style_login.css">
	</head>
	<body>
		<!-- debut de la partie contenu -->
		<div class="main">
			<div class = "box">
					<div class="welcome">
						<h1> Welcome to Starlink ! </h1>
						<p> Blabla you're a whole universe and you can meet others like you ! </p>
					</div>
					<div class="login">
						<h3>Already have your universe ?</h3>
						<?php
							if ($_GET["message"]=="echoue"){
									echo '<h2 style="color:red;">Votre mail ou mot de passe n\'est pas reconnu !</h2>';
								}
						?>
						<form method="POST" action="login1.php">
							<div>
								<span>E-mail address<label>*</label></span>
								<input type="text" name = "mail" id = "mail" required="required"  maxlength="60"> 
							</div>
							<div>
								<span>Password<label>*</label></span>
								<input type="password" name="password" id="password" required="required"  maxlength="50"> 
							</div>
							<input type="submit" value="Login">
							<a class="forgot" href="#">Forgot your password?</a>
							
						</form>
					</div>	
					<div class="register">
						<h3>Ready to add to the mutliverse ?</h3>
						<p><a class="acount-btn" href="./sinscrire.php">Register here</a> to create your own universe now !</p>
					
					</div>
							
					<div class="clearfix"> </div>
			<div class="clear"></div>
			</div>
		</div><!-- fin de la partie contenu -->
	</body>

<?php
include("inc/bottom.php");
?>
</html>