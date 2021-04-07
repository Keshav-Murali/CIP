<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Test fragment loading</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- include styles -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/styles.html';
     ?>
  </head>

  <body>
    <!-- include forms -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/forms.html';
     ?>
    <h1>Enter fragid here</h1>
    <input type="text" id="test_frag_id"></input>
    
<!--    <h1>JSON encoded fragment</h1>
   <p id="sfrag"></p> -->

    <h1>Generated fragment</h1>

    <p id="dfrag-marker"></p>
    <!-- include scripts -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/scripts.html';
     ?>

    <button type="button" onclick="testLoadFragment(document.getElementById('test_frag_id').value)">Load</button>
    <!-- Driver here -->
    <script>
      function testLoadFragment(str)
      {
	  //  code to remove any already present
	  var exists = document.getElementById(str);
	  if (exists)
	      exists.remove();
	  
	  var marker = document.getElementById("dfrag-marker");
	  loadFragment(str, marker.parentNode);
//	  console.log(global_loaded_fragment_string);
//	  var domobj = JSON.parse(global_loaded_fragment_string);
	  //	  console.log(domobj.id);
//	  console.log(global_DOM_Object.id);
//	  marker.parentNode.insertBefore(global_DOM_Object, marker);
      }

</script>

  </body>

</html>

