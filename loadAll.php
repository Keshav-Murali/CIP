<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

	    $fpath= $_SERVER['DOCUMENT_ROOT'].'/fragments';
	    $dpath= $_SERVER['DOCUMENT_ROOT'].'/documents';
	
	    $fdirs=array_diff(scandir($fpath), array('..', '.'));
    	    $ddirs=array_diff(scandir($dpath), array('..', '.'));

	    $arr = [];
	    $arr["countf"] = count($fdirs);
	    $arr["countd"] = count($ddirs);
		
	    for($i = 0; $i < $arr["countf"]; $i++) {
	    	   $file_name = $fpath."/".$fdirs[$i+2]."/content.json";
	    	   $contents = file_get_contents($file_name);
		   $arr[] = $contents;
	    	   
	    }	
	    for($i = 0; $i < $arr["countd"]; $i++) {
	    	   $file_name = $dpath."/".$ddirs[$i+2]."/content.json";
	    	   $contents = file_get_contents($file_name);
		   $arr[] = $contents;
	    }	
	
	echo json_encode($arr);
	
?>

