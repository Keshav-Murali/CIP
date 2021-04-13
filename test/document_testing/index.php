<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Test document</title>
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
    <!--    
	    <div class="document" id="tdoc">
	      <h2 class="title">Document1</h2>
	      <span class="docId">id: tdoc </span><span class="editIcon"><img src="/icon/edit.png" onclick="editTitleTag(this.parentNode.parentNode)"></span><br>
	      <div class="tags"><h3>Tags</h3><span class="tags_list"><ul><li>Tag1</li> <li>Tag2</li> <li>Tag3</li> </ul></span></div>
	    </div>
	    -->

<button onclick="disp()">Display document</button>
<button onclick="update()">Update document</button>
    <h1>Results below</h1>

    <p id="marker"></p>

    <!-- testing shit -->
    <!-- include scripts -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/scripts.html';
     ?>

    <!-- Driver here -->
    <script>
      setTimeout(() => {}, 2000);
      var marker = document.getElementById("marker");
      
      var test_obj = JSON.stringify({"id":"tdoc","title":"Document1","tags":["Tag1","Tag2","Tag3"],"graph":{"options":{"directed":true,"multigraph":false,"compound":false},"nodes":[],"edges":[]}});

      currGraph = graphlib.json.read({"options":{"directed":true,"multigraph":false,"compound":false},"nodes":[],"edges":[]});
      
      function update() {
	  test_obj = documentToJSON(document.getElementById("tdoc"), currGraph);
	  marker.textContent = test_obj;
      }

      function disp()
      {
	  if (document.getElementById("tdoc"))
	      document.getElementById("tdoc").remove();
	  
	  document.body.appendChild(docJSONToDOM(test_obj));
      }			 
//      setTimeout(() => {}, 2000);
/*      var marker = document.getElementById("marker");
      var doc = document.getElementById("tdoc");
      currGraph = new graphlib.Graph();
      currGraph.setNode("f");
      currGraph.setNode("f1");
      currGraph.setNode("f2");
      currGraph.setEdge("f", "f1");
      currGraph.setEdge("f", "f2");

      var t = documentToJSON(tdoc, currGraph);
      marker.textContent = t;
      marker.innerHTML += "<br />"
//      marker.textContent += 
*/
	  
/*      
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
*/

</script>

  </body>

</html>
