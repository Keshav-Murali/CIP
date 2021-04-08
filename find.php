<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_POST['type'] == "fragment") {
    $path= $_SERVER['DOCUMENT_ROOT'].'/fragments';
}
else {
$path= $_SERVER['DOCUMENT_ROOT'].'/documents';
}
$dirs=array_diff(scandir($path), array('..', '.'));;
    /* echo "<pre>";
    print_r($dirs);
    echo "</pre>"; */
    $myJSON = json_encode($dirs);
    echo $myJSON;
?>