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

	$yt = false;
	$img = false;
	
	$yt_name = "/vid.mkv";
	$wg_name = "/res.html";
	$wg_img_base = "/image";
	
	$wg_pos = strrpos($_POST['link'], ".");
	$wg_ext = substr($_POST['link'], $wg_pos);
	
	if ( (strstr($_POST['link'], "youtube") || (strstr($_POST['link'], "youtu.be")))) {
	   $yt = true;
	}

	if ( (strstr($wg_ext, ".jpg")) || (strstr($wg_ext, ".png")) || (strstr($wg_ext, ".gif")) || (strstr($wg_ext, ".webp")) || (strstr($wg_ext, ".svg"))) {
	   $img = true;
	}


	if ($yt)
		$file_name = $path.$yt_name;
	else if ($img)
		$file_name = $path.$wg_img_base.$wg_ext;
	else
		$file_name = $path.$wg_name;
	
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

	chdir($path);
	
	if ($yt) {
	   $str = "youtube-dl --format 'bestvideo[height<=480]+bestaudio/bestvideo+bestaudio' --merge-output-format mkv --output \"";
	   $str = $str.$file_name."\" ";
	   $str = $str.$_POST['link'];
	   exec($str);   
	}

	else if ($img) {
	   $str = "wget -O \"";
	   $str = $str.$file_name."\" ";
	   $str = $str.$_POST['link'];
	   exec($str);   
	
	}

	else {
	   $str = "wget -E -H -O ";
	   $str = $str.$file_name." ";
	   $str = $str.$_POST['link'];
	   system($str);   
	}
	
	echo str_replace($_SERVER['DOCUMENT_ROOT'], "", $file_name);
}

else {
     echo "INVALID REQUEST";
     }
?>
