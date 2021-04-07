<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

	if($_POST)
	{
		$count = $_POST['count'];
		for($i = 0; $i < $count; $i++) {
		       $fpath = "";
		       if ($_POST['type'][$i] == "fragment") {
		       	  $fpath= $_SERVER['DOCUMENT_ROOT'].'/fragments'."/".$_POST['id'][$i];
			}
			else {
			  $fpath= $_SERVER['DOCUMENT_ROOT'].'/documents'."/".$_POST['id'][$i];
			}

			if (!file_exists($fpath)) {
			   mkdir($fpath, 0777, true);	
			}	

			$file_name = $fpath."/content.json";
			//	    echo $file_name;
			$tfile=fopen($file_name, "w+");
			//	    echo $tfile;
			fwrite($tfile,$_POST['content'][$i]);
			//	    echo ($_POST['content']);
			fclose($tfile);
			echo "Wrote ".$file_name."\n";
		}
	}
?>
