<?php

//define('SITE_URL','https://www.chenzorama.com');

//set params from URL - ie. /pagename/param1/param2 <-- set in the .htaccess file.
$param1 = isset($_GET['param1']) ? $_GET['param1'] : "";
$param2 = isset($_GET['param2']) ? $_GET['param2'] : "";
$param3 = isset($_GET['param3']) ? $_GET['param3'] : "";
$param4 = isset($_GET['param4']) ? $_GET['param4'] : "";

//buildToggle gets replaced via gulp prepbuild/prepdev commands - can be manually adjusted if required.
$buildToggle = FALSE;

//cacheBusterNumber Updates automatically via the gulp prepbuild command - dont touch. It should look like this: $cacheBusterNumber="1555950973100";
$cacheBusterNumber="1555950973100";

//Base64 blank image src:
$blankImageSRC = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
$blackImageSRC = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";


?>