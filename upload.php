<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_POST)
{
	clearstatcache();
	$path = $_SERVER['DOCUMENT_ROOT']."/fragments/".$_POST['fragId'];
	if (!file_exists($path)) {
	   mkdir($path);
	}

	$file_name = $path."/".basename($_FILES['med']['name']);
 
	if (file_exists($file_name)) {
	   $pos = strrpos($file_name, ".");
	   $tmp = substr($file_name, 0, $pos)."1";
	   $tmp = $tmp.substr($file_name, $pos);
	   
	   move_uploaded_file($_FILES['med']['tmp_name'], $tmp);
	   $file_name = $tmp;
	 }

	 else {
	      move_uploaded_file($_FILES['med']['tmp_name'], $file_name);
	}

	echo str_replace($_SERVER['DOCUMENT_ROOT'], "", $file_name);
}

else {
     echo "INVALID REQUEST";
     }
?>
