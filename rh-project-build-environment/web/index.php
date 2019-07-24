<!DOCTYPE html>
<html lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>

    <!-- Development -->
    <link rel="stylesheet" type="text/css" href="_dev/css/sample.css">
    <!-- <script src="_dev/js/index.js"></script> -->


    <!-- Production -->
    <!-- <link rel="stylesheet" type="text/css" href="include/styles/bundle.css">
    <script src="include/scripts/bundle.min.js"></script> -->
</head>

<body>

    <section>
        Information from PHP web server
        <?php
            echo "Today is " . date("Y/m/d") . "<br>";
            echo "Today is " . date("Y.m.d") . "<br>";
            echo "Today is " . date("Y-m-d") . "<br>";
            echo "Today is " . date("l");
        ?>
    </section>

</body>

</html>