<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Test item editing</title>
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
    <h1>JSON encoded fragment</h1>
    <p id="sfrag"></p>

    <h1>Regenerated fragment</h1>

    <p id="dfrag-marker"></p>
    <!-- include scripts -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/scripts.html';
     ?>

    <button type="button" onclick="checkInConsole()">Check</button>
    <!-- Driver here -->
    <script>
      obj = {"id":"tfrag","title":"Fragment1","tags":["Tag1","Tag2","Tag3"],"items":[{"type":"text","content":"\n\t <p>Lorem ipsum<br></p><p>asdasd<b>basdd <i>dadad</i></b><i>dadad<u>bbbbb</u></i></p><p><i><u><span style=\"background-color: red;\">abcd<font color=\"blue\">bad</font></span></u></i></p><pre><font size=\"5\" face=\"Courier New\">dddd <br><br></font><pre>ddasdaswww <br></pre></pre><p><i><u><span style=\"background-color: red;\"></span></u></i></p><p><i><u><span style=\"background-color: red;\"><font color=\"blue\"><br></font></span></u></i></p><p><i><u><span style=\"background-color: red;\"><font color=\"blue\"></font></span></u></i><br></p>\n\t "},{"type":"image","content":"http://localhost/test/resources/img.jpg"},{"type":"image","content":"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"},{"type":"audio","content":"http://localhost/test/resources/audio.mp3"},{"type":"video","content":"http://localhost/test/resources/video.mp4"},{"type":"link","original_link":"https://www.google.com/","original_text":"Link to content","archived_link":"http://localhost/test/resources/goog.html"},{"type":"link","original_link":"https://www.yahoo.com/","original_text":"Link to content","archived_link":""}]}
      document.getElementById("sfrag").textContent = JSON.stringify(obj);
      var marker = document.getElementById("dfrag-marker");
      marker.parentNode.insertBefore(fragJSONToDOM(document.getElementById("sfrag").textContent), marker);

      function checkInConsole()
      {
	  console.log(fragmentToJSON(document.getElementById("tfrag")));
      }
</script>

  </body>

</html>

