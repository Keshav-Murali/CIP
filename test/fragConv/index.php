<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Test fragment <-> JSON</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- include styles -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/styles.html';
     ?>
  </head>

  <!-- Not including any icons or event handlers in the test case yet. It shouldn't matter -->
  <body>
    <h1>Test fragment</h1>
    <article class="fragment" id="tfrag">
      <h2 class="title">Fragment1</h2>
      <span class="fragid">id: tfrag<br></span>
      <div class="tags">
	<h3>Tags</h3>
	<span class="tags_list">
	  <ul style="list-style-type: none;">
	    <li style="display: inline">Tag1</li>
	    <li style="display: inline">Tag2</li>
	    <li style="display: inline">Tag3</li>
	  </ul>
	</span>
      </div>

      <div class="content">
	<!-- generated using mozilla's example -->
	<section class="text" id="ttext">
	  <div class="content">
	    <p>Lorem ipsum<br></p><p>asdasd<b>basdd <i>dadad</i></b><i>dadad<u>bbbbb</u></i></p><p><i><u><span style="background-color: red;">abcd<font color="blue">bad</font></span></u></i></p><pre><font size="5" face="Courier New">dddd <br><br></font><pre>ddasdaswww <br></pre></pre><p><i><u><span style="background-color: red;"></span></u></i></p><p><i><u><span style="background-color: red;"><font color="blue"><br></font></span></u></i></p><p><i><u><span style="background-color: red;"><font color="blue"></font></span></u></i><br></p>
	  </div>
	</section>
    
	<section class="image" id="timage">
	  <div class="content">
	    <img src="../resources/img.jpg">
	  </div>
	</section>
	<section class="image" id= "outtimage">
	  <div class="content">
	    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png">
	  </div>
	</section>
	
	<section class="audio" id="taudio">
	  <div class="content">
	    <audio controls id="taudio" src="../resources/audio.mp3"></audio>
	    </div>
	</section>
	
	<section class="video" id="tvideo">
	  <div class="content">
	    <video controls id="tvideo">
	      <source src="../resources/video.mp4">
	    </video>
	  </div>
	</section>
	  
	<section class="link" id="tlink">
	  <div class="content">
	    <a href="https://www.google.com/" class="original_link">Link to content</a>
	    <a href="../resources/goog.html" class="archived_link">(Archive)</a>
	  </div>
	</section>
	<section class="link" id="tlink2">
	  <div class="content">
	    <a href="https://www.yahoo.com" class="original_link">Link to content</a>
	  </div>
	</section>
      </div>
    </article>
    
    <h1>JSON encoded results</h1>
    <p id="sfrag"></p>

    <h1>Regenerated fragment</h1>

    <p id="dfrag-marker"></p>
    <!-- include scripts -->
    <?php
     require $_SERVER['DOCUMENT_ROOT'].'/includes/scripts.html';
     ?>
    
    <!-- Driver here -->
    <script>
      document.getElementById("sfrag").textContent = fragmentToJSON(document.getElementById("tfrag"));
      var marker = document.getElementById("dfrag-marker");
      marker.parentNode.insertBefore(fragJSONToDOM(document.getElementById("sfrag").textContent), marker);
</script>
      
  </body>

</html>

