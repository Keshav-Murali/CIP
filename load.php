<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

        if($_POST)
        {
		$ft = "";
	       if ($_POST['type'][0] == "fragment") {
	     	  $ft = "/fragments";
		}
		
		else {
		  $ft = "/documents";
		}

            $fpath= $_SERVER['DOCUMENT_ROOT'].$ft."/".$_POST['id'][0];
   	    $file_name = $fpath."/content.json";

	    if (!file_exists($fpath)) {
	       exit("No such fragment!");
	    }	
//	    echo $file_name."HELLO";

	    if (!file_exists($file_name)) {
	       exit("No such fragment!");
	    }	
	    $contents = file_get_contents($file_name);
	    echo $contents;
        }
?>
