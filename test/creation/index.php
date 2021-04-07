<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Test creation</title>
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
    <button type="button" onclick="newDoc()">Create new document</button>
    <button type="button" onclick="newFrag()">Create new fragment</button>
    
<!--    <h1>JSON encoded fragment</h1>
   <p id="sfrag"></p> -->

    <h1>Created item id</h1>

    <p id="marker"></p>
    <!-- include scripts -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/scripts.html';
     ?>

    <!-- Driver here -->
    <script>
      var marker = document.getElementById("marker");

      function newDoc()
      {
	  generateSaveForm(1);
	  var sForm = document.getElementById("saveForm");
	  var elts = sForm.elements;
	  elts["type[0]"].value = "document";
	  var formData = new FormData(sForm);
	  
	  var xmlHttp = new XMLHttpRequest();
	  xmlHttp.onreadystatechange = function()
	  {
	      if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	      {
		  marker.textContent = xmlHttp.responseText;
	      }
	  }
	  xmlHttp.open("post", "/create.php");
	  xmlHttp.send(formData); 
      }

      function newFrag()
      {
	  generateSaveForm(1);
	  var sForm = document.getElementById("saveForm");
	  var elts = sForm.elements;
	  elts["type[0]"].value = "fragment";
	  var formData = new FormData(sForm);
	  
	  var xmlHttp = new XMLHttpRequest();
	  xmlHttp.onreadystatechange = function()
	  {
	      if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	      {
		  marker.textContent = xmlHttp.responseText;
	      }
	  }
	  xmlHttp.open("post", "/create.php");
	  xmlHttp.send(formData); 
      }


</script>

  </body>

</html>
