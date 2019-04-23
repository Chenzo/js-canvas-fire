<?php 
include "includes/globals.php"; 
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>JS CANVAS FIRE</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="/css/styles.css?v=?v=<?=$cacheBusterNumber; ?>" />
    </head>
    <body class="home_fire">
        <!-- <h1>JS CANVAS FIRE</h1> -->

        <div class="overCanvas">
            <button class="js-toggle-fire">Toggle Fire</button>

            <div class="checkbox js-toggle-blur">
                <input type="checkbox" id="haveBlur">
                <label for="haveBlur">Apply Blur</label>
            </div>
        </div>

        <div class="canvasholder">
            <canvas id="myCanvas" width="1500" height="500"></canvas>
        </div>

    <?php include "includes/foot_include.php"; ?>

    </body>
</html>