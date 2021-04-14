<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Home</title>
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
    <form method="GET" id="viewForm">
      <h1>View</h1>
      <input type="radio" name="choice" value="fragment">Fragment</input>
      <input type="radio" name="choice" value="document">Document</input><br><br>
      <button type="button" onclick="loadList(this.parentNode)">Load list</button><br></br>
      <select name="list" id="list"></select><br><br>
      <button type="button" onclick="viewFD()">Go!</button>
    </form>

    <form>
      <h1>Create document</h1>
      <button type="button" onclick="newDoc()">New document</button>
    </form>
    
    <form id="deleteDocForm">
      <h1>Delete document</h1>
      <button type="button" onclick="loadList(this.parentNode)">Load list</button><br></br>
      <select name="list" id="list"></select><br><br>
      <button type="button" onclick="delDoc(this.parentNode)">Delete!</button>
    </form>

	<form method="GET">
	<h1>Search</h1>
	<input type="text" name="keyword" id="keyword"><br>
	<input type="radio" name="search" id="fragSearch">Fragment</input>
	<input type="radio" name="search" id="docSearch">Document</input><br><br>
	<button type="button" onclick="search()">Search</button>
	</form>
	<div id="sresult"></div>
    <!-- include scripts -->
    <?php                                                                   
     require $_SERVER['DOCUMENT_ROOT'].'/includes/scripts.html';                ?>
    
    <script>
      var form1 = document.getElementById("viewForm");
      var form2 = document.getElementById("deleteDocForm");
      
      function loadList(node)
      {
	  var f;
	  if (node == form1)
	      f = form1;
	  else
	      f = form2;
	  
	  //	  console.log(f.choice.value);
	  var tForm = document.getElementById("typeForm");
	  if (node == form1)
	      tForm.type.value = f.choice.value;
	  else
	      tForm.type.value = "document";
	  
	  var formData = new FormData(tForm);
	  var xmlHttp = new XMLHttpRequest();
	  
	  xmlHttp.onreadystatechange = function()
	  {
	      if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	      {
		  f.list.innerHTML = "";
		  var obj = JSON.parse(xmlHttp.responseText);
		  for(let key in obj) {
		      var o = document.createElement("option");
		      o.value = obj[key];
		      o.innerText = obj[key];
		      f.list.appendChild(o);
		  }
	      }
	  }
	  xmlHttp.open("post", "/find.php");
	  xmlHttp.send(formData); 
	  
      }

      function viewFD()
      {
	  var f = form1;
	  if (f.choice.value == "fragment")
	      f.action = "/viewFrag.php";
	  else
	      f.action = "/viewDoc.php";
	  f.submit();
      }

	  function search()
      {
	  var f = form1;
	  if (f.choice.value == "fragment")
	      f.action = "/searchFrag.php";
	  else
	      f.action = "/searchDoc.php";
	  f.submit();
      }

      function delDoc(node)
      {
	  // reusing the same little form since we need only one input
	  var tForm = document.getElementById("typeForm");
	  tForm.type.value = form2.list.value;
	  
	  var formData = new FormData(tForm);
	  var xmlHttp = new XMLHttpRequest();
	  
	  xmlHttp.onreadystatechange = function()
	  {
	      if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	      {
		  console.log(xmlHttp.responseText);
	      }
	  }
	  xmlHttp.open("post", "/delDoc.php");
	  xmlHttp.send(formData); 	  
      }

</script>

  </body>

</html>

