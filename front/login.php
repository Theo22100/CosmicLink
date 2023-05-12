<html>
	<head>
		<meta charset=”utf-8″>
	</head>
	<body>
		<!-- debut de la partie contenu -->
		<div class="main">

				<div class="register">
					<div class="col_1_of_list span_1_of_list login-left">
						<h3>Nouveau membre</h3>
						<p>En créant un compte, vous pourrez créer des annonces</p>
						<a class="acount-btn" href="sinscrire.php">Créer un compte</a>
					
					</div>
					<div class="col_1_of_list span_1_of_list login-right">
						<h3>Déja membre ?</h3>
						<p>Si vous avez déja un compte, merci de vous connecter</p>
						<?php
							if ($_GET["message"]=="echoue"){
									echo '<h2 style="color:red;">Votre mail ou mot de passe n\'est pas reconnu !</h2>';
								}
						?>
						<form method="POST" action="login1.php">
							<div>
								<span>Adresse email<label>*</label></span>
								<input type="text" name = "mail" id = "mail" required="required"> 
							</div>
							<div>
								<span>Mot de passe<label>*</label></span>
								<input type="password" name="password" id="password" required="required"> 
							</div>
							<a class="forgot" href="#">Mot de passe oublié</a>
							<input type="submit" value="Login">
						</form>
					</div>	
					<div class="clearfix"> </div>
				
			</div>
		<div class="clear"></div>
		</div><!-- fin de la partie contenu -->
	</body>

<?php
include("inc/bottom.php");
?>
</html>