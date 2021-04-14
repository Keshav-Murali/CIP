<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>View Document</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- include styles -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/styles.html';
     ?>
  </head>

  <body>
    <?php
     if (!($_GET)) {
     echo "No document given!";
     exit();
     }
     ?>
    <!-- include forms -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/forms.html';
     ?>

    <button type="button" onclick="refreshNodeList()">List nodes</button><br><br>
    <select id="nodeSelect"></select><br><br>
    <button id="button2" type="button" onclick="renderNode()">Render node below</button>
    <p id="marker"></p>
    
    <!-- include scripts -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/scripts.html';
     ?>

    <!-- Driver here -->
    <script>
      var str = <?php echo "\"".$_GET['list']."\"" ?>;
      var marker = document.getElementById("marker");
      
      loadDocument(str);

      var node_select = document.getElementById("nodeSelect");

      function deleteOthers(parent, child, end_marker)
      {
	  var count;
	  for (count = 0; count < parent.children.length; count++)
	      if (parent.children[count] == child)
		  break;

	  if (parent.children.length == count + 1)
	      return;
	  
	  while(parent.children[count + 1] != end_marker)
	      parent.children[count + 1].remove();
      }
      
      function refreshNodeList()
      {
	  node_select.innerHTML = "";
	  var node_list = currGraph.nodes();

	  for(var i = 0; i < node_list.length; i++) {
	      var o = document.createElement("option");
	      o.innerText = o.value = node_list[i];
	      node_select.appendChild(o);
	  }
      }

      function renderNode()
      {
	  var choice = node_select.value;
	  deleteOthers(document.body, document.getElementById("button2"), marker);
	  // load the fragment here
	  loadFragment(choice, marker);
      }
      
    </script>

  </body>

</html>

