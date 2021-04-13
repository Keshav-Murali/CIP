<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_POST) {

$path= $_SERVER['DOCUMENT_ROOT'].'/documents/'.$_POST['type'];
unlink($path.'/content.json');
rmdir($path);
echo "Done deleting ".$_POST['type'];
}
?>