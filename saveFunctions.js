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
	    console.log("Saved " + obj.id + " successfully!");
	    console.log(xmlHttp.responseText);
	}
    }
    xmlHttp.open("post", "/save.php");
    xmlHttp.send(formData); 
}

//var loading = 0;

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
//	    loading = 0;
	    if (xmlHttp.responseText == "No such fragment!") {
		alert("Invalid!");
		return;
	    }
	    // change later, alerts are annoying
	    console.log("Loaded " + obj_id + " successfully!");

	    var str;
	    var v = JSON.parse(xmlHttp.responseText);
	    if (v.id != obj_id) {
		v.id = obj_id;
		str = JSON.stringify(v);
	    }
	    else {
		str = xmlHttp.responseText;
	    }
	    global_DOM_Object = fragJSONToDOM(str);
	    target_parent.appendChild(global_DOM_Object);
	}
    }
    xmlHttp.open("post", "/load.php");
    xmlHttp.send(formData);
}

function saveDoc(obj)
{
    console.log("not implemented yet");
}

function loadDoc()
{
    console.log("not implemented yet");
}
