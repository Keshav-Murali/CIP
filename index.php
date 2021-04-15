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

  <body id="bmain">
    <!-- include forms -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/forms.html';
     ?>
	 <h1 class="head1 w1">KNOWLEDGE ORGANIZER</h1>
	 <ul class="tabs w1">
	 <li data-tab-target="#view" class="active tab">View</li>
	 <li data-tab-target="#create" class="tab">Create</li>
	 <li data-tab-target="#search" class="tab">Search</li>
	 <li data-tab-target="#delete" class="tab">Delete</li>
	 </ul>
	 <div class="tab-content">
	<article id='view' class="active" data-tab-content>
		<form method="GET" id="viewForm">
			<h1 class="head1">View</h1>
			<input type="radio" name="choice" value="fragment">Fragment</input>
			<input type="radio" name="choice" value="document">Document</input><br><br>
			<button type="button" class="bu4" onclick="loadList(this.parentNode)">Load list</button><br></br>
			<select name="list" id="list"></select><br><br>
			<button type="button" class="bu4" onclick="viewFD()">Go!</button>
		</form>
	</article>
	<article id='create' data-tab-content>
		<form>
			<h1 class="head1">Create document</h1>
			<button type="button"  class="bu4" onclick="newDoc()">New document</button>
		</form>
	</article>
	<article id='delete' data-tab-content>
		<form id="deleteDocForm">
			<h1 class="head1">Delete document</h1>
			<button type="button" class="bu4" onclick="loadList(this.parentNode)">Load list</button><br></br>
			<select name="list" id="list"></select><br><br>
			<button type="button" class="bu4" onclick="delDoc(this.parentNode)">Delete!</button>
		</form>
	</article>
	<article id='search' data-tab-content>
		<form name="searchForm" id="searchForm">
			<h1 class="head1">Search</h1>
			<label for="keyword">Search term</label>
			<input type="text" name="keyword" id="keyword"><br>
			<label>Choose the search type</labeL> 
			<input type="radio" name="search" value="title">Title</input>
			<input type="radio" name="search" value="tag">Tag</input>
			<input type="radio" name="search" value="full">Content</input><br><br>
			
			<button type="button" class="bu4" onclick="search_function()">Search</button>
		</form>
		<h1 class="head1">Search results</h1>
		<div id="sresult"></div>
	</div>
	</article>
    <!-- include scripts -->
    <?php                                                                   
     require $_SERVER['DOCUMENT_ROOT'].'/includes/scripts.html';                ?>
    
    <script>
      var form1 = document.getElementById("viewForm");
      var form2 = document.getElementById("deleteDocForm");
      var form3 = document.getElementById("searchForm");
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

      function gen_search_result(type, id)
      {
	  var target_location = document.getElementById("sresult");
	  var l = document.createElement("a");
	  var target_link = "/view";
	  if (type == "fragment")
	      target_link += "Frag.php?list=" + id;
	  else
	      target_link += "Doc.php?list=" + id;
	  l.href = target_link;
	  l.textContent = type + " " + id;
	  target_location.appendChild(l);
	  target_location.innerHTML += "<br>";
      }
      
      function search_function()
      {
	  var xmlHttp = new XMLHttpRequest();
	  var target_location = document.getElementById("sresult");
	  target_location.innerHTML = "";
	  xmlHttp.onreadystatechange = function()
	  {
	      if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	      {
		  // first we get the whole data
		  var data = JSON.parse(xmlHttp.responseText);
		  console.log(data);
		  var countf = data.countf;
		  var countd = data.countd;
		  var total = countf + countd;
		  var found = false;
		  
		  var type = form3.search.value;
		  var val = form3.keyword.value;

		  if (val == undefined)
		      return;
		  
		  console.log(type);

		  for(var i = 0; i < total; i++) {
		      var obj_type;
		      if (i >= countf)
			  obj_type = "document";
		      else
			  obj_type = "fragment";

		      if (type == "full" && obj_type == "document")
			  continue;

		      var t = JSON.parse(data[i]);
//		      console.log(i + " " + t);
		      
		      if (type == "tag") {
			  console.log(t.tags);
			  for (var j = 0; j < t.tags.length; j++) {
			      var pos = t.tags[j].indexOf(val)
			      if (pos != -1) {
				  gen_search_result(obj_type, t.id);
				  found = true;
				  break;
			      }
			  }
		      }

		      else if (type == "title") {
			  console.log(t.title);
			  var pos = t.title.indexOf(val)
			  if (pos != -1) {
			      gen_search_result(obj_type, t.id);
			      found = true;
			      break;
			  }
		      }

		      else if (type == "full") {
			  var local_found = false;
			  console.log(t.items);
			  for(var j = 0; j < t.items.length && local_found == false; j++) {
			      var curr = t.items[j];
			      if (curr.type == "text") {
				  var tdiv = document.createElement("DIV");
				  tdiv.innerHTML = curr.content;
				  console.log(tdiv.innerText);
				  var pos = tdiv.innerText.indexOf(val);
				  if (pos != -1) {
				      gen_search_result(obj_type, t.id);
				      found = true;
				      local_found = true;
				  }
			      }
			      
			      else if (curr.type == "audio" || curr.type == "image" || curr.type == "video") {
				  var pos = curr.desc.indexOf(val);
				  if (pos != -1) {
				      gen_search_result(obj_type, t.id);
				      found = true;
				      local_found = true;
				  }
			      }

			      else if (curr.type == "link") {
				  var pos = curr.original_text.indexOf(val);
				  if (pos != -1) {
				      gen_search_result(obj_type, t.id);
				      found = true;
				      local_found = true;
				  }

			      }
			      
			  }
		      }
		  }

		  if (found == false)
		      target_location.innerHTML = "no results!";
		  
	      }
	  }
//	      console.log("here first!");
	      xmlHttp.open("GET", "/loadAll.php");
//	      console.log("got here");
	      xmlHttp.send();
//	      console.log("got here too");
      }


</script>

  </body>

</html>

