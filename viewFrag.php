<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>View Fragment</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- include styles -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/styles.html';
     ?>
  </head>

  <body>
    <?php
     if (!($_GET)) {
     echo "No fragment given!";
     exit();
     }
     ?>
    <!-- include forms -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/forms.html';
     ?>
<!--    <h1>Enter fragid here</h1>
    <input type="text" id="test_frag_id"></input>
    
    <h1>JSON encoded fragment</h1>
   <p id="sfrag"></p>

    <h1>Generated fragment</h1>

    <p id="dfrag-marker"></p>
-->
    <!-- include scripts -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/scripts.html';
     ?>

    <!--    <button type="button" onclick="testLoadFragment(document.getElementById('test_frag_id').value)">Load</button> -->
    
    <!-- Driver here -->
    <script>
      var str = <?php echo "\"".$_GET['list']."\"" ?>;
      loadFragment(str, document.body);
      
    </script>

  </body>

</html>

