<?php
include("inc/top.php");
if (!isset($_SESSION['login']) && $_SESSION['role'] != "A") {
  header('Location: ../login-inscription/login.php');
}

?>

<head>

  <script src="
https://cdn.jsdelivr.net/npm/chart.js@4.3.0/dist/chart.umd.min.js
"></script>
</head>
<div class="container-fluid px-4">
  <h1 class="mt-4">Statistics</h1>
  <ol class="breadcrumb mb-4">
    <li class="breadcrumb-item"><a href="index.php">Dashboard</a></li>
    <li class="breadcrumb-item active">Statistics</li>
  </ol>
  <div class="card mb-4">
    <div class="card-body">
      <table border='1'>
        <tr>
          <td>Total number of users :&nbsp;</td>
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

          try { //Calcul utilisateur
            $requete_util = $connexion->prepare("SELECT count(*) FROM membre");

            $requete_util->execute();

            $nbutil = $requete_util->fetchColumn();
            echo "<td> " . $nbutil . "</td>";
          } catch (PDOException $e) {
            echo 'Echec Calcul Utilisateur : ' . $e->getMessage();
          }

          ?>


        </tr>
        <tr>
          <td>Total number of galaxies :&nbsp;</td>
          <?php
          try { //Calcul galaxie
            $requete_util = $connexion->prepare("SELECT count(*) FROM galaxie");

            $requete_util->execute();

            $nbgal = $requete_util->fetchColumn();
            echo "<td> " . $nbgal . "</td>";
          } catch (PDOException $e) {
            echo 'Echec Calcul Galaxie : ' . $e->getMessage();
          }
          ?>
        <tr>
        <tr>
          <td>NTotal number of stars :&nbsp;</td>
          <?php
          try {
            // Requête SQL
            $requete = "
                            SELECT COUNT(*) AS total_etoiles
                            FROM Etoile et
                            JOIN galaxie ga ON et.id_galaxie = ga.id_galaxie
                            JOIN univers un ON ga.id_univers = un.id_univers
                            JOIN membre mem ON un.id_membre = mem.id
                        ";

            // Exécution de la requête
            $resultat = $connexion->query($requete);

            // Récupération du nombre total d'étoiles
            $row = $resultat->fetch(PDO::FETCH_ASSOC);
            $totalEtoiles = $row['total_etoiles'];

            // Affichage du résultat
            echo "<td> " . $totalEtoiles . "</td>";

          } catch (PDOException $e) {
            // Gestion des erreurs de connexion à la base de données
            echo "Erreur de calcul étoile : " . $e->getMessage();
          }

          ?>
        <tr>
      </table>
    </div>
  </div>




  <canvas id="graph"  width="500px" height="auto"></canvas>
  <script>
    // Données de la requête SQL (tableau d'objets JSON)
      <?php
    try {
        $requetegraph = "SELECT id, dateInscription FROM membre ORDER BY dateInscription";
        $resultat2 = $connexion->query($requetegraph);

        $queryResult = array();
        while ($row = $resultat2->fetch(PDO::FETCH_ASSOC)) {
            $queryResult[] = $row;
        }

        // Convertir en JSON
        $jsonResult = json_encode($queryResult);
        echo "const data = $jsonResult;";
    } catch (PDOException $e) {
        // Gestion des erreurs de connexion à la base de données
        echo "Erreur de DateInscription : " . $e->getMessage();
    }
    ?>

    // Extraire les mois et compter le nombre d'inscrits par mois
    const counts = {};
data.forEach(entry => {
    const date = new Date(entry.dateInscription);
    const month = date.getMonth() + 1; // Les mois commencent à 0 dans JavaScript
    const year = date.getFullYear();
    const key = `${year}-${month}`; // Utiliser une clé combinant l'année et le mois

    if (counts[key]) {
        counts[key]++;
    } else {
        counts[key] = 1;
    }
});

    // Préparer les données pour le graphe
    const labels = Object.keys(counts);
    const values = Object.values(counts);

    // Créer le graphe
    const ctx = document.getElementById('graph').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of registrations per month',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
        responsive: true,
        maintainAspectRatio: true, // Permet de définir la taille manuellement
        scales: {
            y: {
                beginAtZero: true,
                stepSize: 1
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        layout: {
            padding: {
                left: 50,
                right: 50,
                top: 50,
                bottom: 50
            }
        }
    }
    });
    </script>





</div>