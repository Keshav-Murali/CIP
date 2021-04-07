function generateSaveForm(count)
{
    var i;
    var sForm = document.getElementById("saveForm");
    sForm.innerHTML = "";

    var str = "<input type='text' name='count' value='" + count + "'></input>"
    for(i = 0; i < count; i++) {
	str += "<input type='text' name='type[" + i + "]'></input>";
	str += "<input type='text' name='id[" + i + "]'></input>";
	str += "<input type='text' name='content[" + i + "]'></input>";
    }
    sForm.innerHTML = str;
//    console.log(sForm.innerHTML);
}

function saveFragment(obj)
{
    generateSaveForm(1);
    var sForm = document.getElementById("saveForm");
    var elts = sForm.elements;
    elts["type[0]"].value = "fragment";
    elts["id[0]"].value = obj.id;
    elts["content[0]"].value = fragmentToJSON(obj);

  //  console.log(sForm.innerHTML);
    
    var formData = new FormData(sForm);
	
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	{
	    // change later, alerts are annoying
	    //	    currMediaObject.src = xmlHttp.responseText;
	    alert("Saved " + obj.id + " successfully!");
	    console.log(xmlHttp.responseText);
	}
    }
    xmlHttp.open("post", "/save.php");
    xmlHttp.send(formData); 
}


function loadFragment(obj_id, target_parent)
{
    var sForm = document.getElementById("saveForm");

    generateSaveForm(1);
    var elts = sForm.elements;
    
    elts["type[0]"].value = "fragment";
    elts["id[0]"].value = obj_id;
    elts["content[0]"].value = "";

    var formData = new FormData(sForm);
	
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	{
	    if (xmlHttp.responseText == "No such fragment!") {
		alert("Invalid!");
		return;
	    }
	    // change later, alerts are annoying
	    alert("Loaded " + obj_id + " successfully!");
	    global_DOM_Object = fragJSONToDOM(xmlHttp.responseText);
	    target_parent.appendChild(global_DOM_Object);
	}
    }
    xmlHttp.open("post", "/load.php");
    xmlHttp.send(formData);
}
