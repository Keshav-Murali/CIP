<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_POST)
{
	clearstatcache();
	$path = $_SERVER['DOCUMENT_ROOT']."/fragments/".$_POST['fragId'];
	if (!file_exists($path)) {
	   mkdir($path, 0777, true);	
	}

	$file_name = $path."/".basename($_FILES['med']['name']);
	$pos = strrpos($file_name, ".");
	$base = substr($file_name, 0, $pos);
	$ext = substr($file_name, $pos);

	$count = 0;
	$tmp = $base.$ext;

	while (file_exists($tmp)) {
	   $tmp = $base.strval($count).$ext;
	   $count = $count + 1;
	 }

	$file_name = $tmp;
	move_uploaded_file($_FILES['med']['tmp_name'], $file_name);
	echo str_replace($_SERVER['DOCUMENT_ROOT'], "", $file_name);
}

else {
     echo "INVALID REQUEST";
     }
?>
