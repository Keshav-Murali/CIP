<?php
        if($_POST)
        {
            $fpath= $_SERVER['DOCUMENT_ROOT'].'/fragments'."/".$_POST['name'];
	    if (!file_exists($path)) {
	       mkdir($path, 0777, true);	
	    }	

	    $file_name = $fpath."/content.json";
//	    echo $file_name;
            $tfile=fopen($file_name, "w+");
//	    echo $tfile;
            fwrite($tfile,$_POST['content']);
//	    echo ($_POST['content']);
            fclose($tfile);        
        }
?>
