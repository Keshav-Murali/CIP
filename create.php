<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_POST)
{
	clearstatcache();
	$path = " ";
	$name = " ";
//	$target = "";
	
       if ($_POST['type'][0] == "fragment") {
       	  $path= $_SERVER['DOCUMENT_ROOT'].'/fragments';
	  $name = "f";
//	  $target="f";
	}
	else {
	  $path= $_SERVER['DOCUMENT_ROOT'].'/documents';
	  $name = "d";
//	  $target = "d";
	}

// ."/".$_POST['id'][$i];

	if (!file_exists($path)) {
	   mkdir($path, 0777, true);	
	}

	$path = $path."/";
	$file_name = $path.$name;
//	$pos = strrpos($file_name, $target);
//	$base = substr($file_name, 0, $pos);
//	$ext = substr($file_name, $pos);

	$count = 0;
	$tmp = $file_name;

	while (file_exists($tmp)) {
	   $tmp = $file_name.strval($count);
	   $count = $count + 1;
	 }

	$file_name = $tmp;
//	move_uploaded_file($_FILES['med']['tmp_name'], $file_name);
	mkdir($file_name, 0777, true);
	echo str_replace($path, "", $file_name);
}

else {
     echo "INVALID REQUEST";
     }
?>