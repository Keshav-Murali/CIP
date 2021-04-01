<?php
        if($_POST)
        {
            $fpath= $_SERVER['DOCUMENT_ROOT'].'/fragments'."/".$_POST['name'];
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
