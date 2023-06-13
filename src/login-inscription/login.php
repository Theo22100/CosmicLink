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
		<link rel="stylesheet" href="./../global/css/global.css">
	</head>
	<body>
		<!-- debut de la partie contenu -->
		<div class="main">
				<div class = "box">
					<div class="welcome">
						<h1> Welcome to CosmicLink ! </h1>
						<p> Where you can create a whole universe and you can meet others like you ! </p>
					</div>
					<div class="login">
						<h3>Already have your universe ?</h3>
						<?php
							if (isset($_GET['message']) && $_GET["message"]=="echoue"){
									echo '<h2 style="color: var(--red700);filter: brightness(200%);">Your mail or your password is incorrect !</h2>';
								}
						?>
						<form method="POST" action="login1.php">
							<div>
								<span>E-mail address<label>*</label></span>
								<input type="text" name = "mail" id = "mail" required="required"  maxlength="60" placeholder="Mail"> 
							</div>
							<div>
								<span>Password<label>*</label></span>
								<input type="password" name="password" id="password" required="required"  maxlength="50" placeholder="Password"> 
							</div>
							<input id = "login" type="submit" value="Login">
							
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
		<div class= "back"></div>
	</body>

</html>