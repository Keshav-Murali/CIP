<?php
        if(isset($_POST['submit']))
        {
            $fpath= $_SERVER['DOCUMENT_ROOT'].'/fragments'."/".$_POST['name'].'.json';
            $tfile=fopen($fpath, "w+");
            echo fwrite($tfile,$_POST['content']);
            fclose($tfile);        
        }
?>
