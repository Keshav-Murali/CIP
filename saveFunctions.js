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

function loadFragment(obj_id, target)
{
    var sForm = document.getElementById("saveForm");

    generateSaveForm(1);
    var elts = sForm.elements;
    
    elts["type[0]"].value = "fragment";
    elts["id[0]"].value = obj_id;
    elts["content[0]"].value = "";
//    elts["count"].value = "1";

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
	    var v_arr = JSON.parse(xmlHttp.responseText);
	    console.log(xmlHttp.responseText);
	    var v = JSON.parse(v_arr[0]);
	    if (v.id != obj_id) {
		v.id = obj_id;
		str = JSON.stringify(v);
	    }
	    else {
		str = JSON.stringify(v);
	    }
	    global_DOM_Object = fragJSONToDOM(str);
	    target.parentNode.insertBefore(global_DOM_Object, target);
	}
    }
    xmlHttp.open("post", "/load.php");
    xmlHttp.send(formData);
}

function loadDocument(doc_id)
{
    var sForm = document.getElementById("saveForm");

    generateSaveForm(1);
    var elts = sForm.elements;
    
    elts["type[0]"].value = "document";
    elts["id[0]"].value = doc_id;
    elts["content[0]"].value = "";
//    elts["count"].value = "1";

    var formData = new FormData(sForm);
	
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	{
//	    loading = 0;
	    if (xmlHttp.responseText == "No such document!") {
		alert("Invalid!");
		return;
	    }
	    // change later, alerts are annoying
	    console.log("Loaded " + doc_id + " successfully!");

	    var str;
	    var v_arr = JSON.parse(xmlHttp.responseText);
	    console.log(xmlHttp.responseText);
	    var v = JSON.parse(v_arr[0]);
	    // is this needed?
	    if (v.id != doc_id) {
		v.id = doc_id;
		str = JSON.stringify(v);
	    }
	    else {
		str = JSON.stringify(v);
	    }
	    global_DOM_Object = docJSONToDOM(str);
	    document.body.prepend(global_DOM_Object);
	}
    }
    xmlHttp.open("post", "/load.php");
    xmlHttp.send(formData);
}


function saveDocument(obj)
{
    var coll = document.getElementsByTagName("article");
    generateSaveForm(coll.length + 1);
    var sForm = document.getElementById("saveForm");
    var elts = sForm.elements;
    
    elts["type[0]"].value = "document";
    elts["id[0]"].value = obj.id;
    elts["content[0]"].value = documentToJSON(obj, currGraph);

    for(var i = 1; i <= coll.length; i++) {
	elts["type["+i+"]"].value = "fragment";
	elts["id["+i+"]"].value = coll[i - 1].id;
	elts["content["+i+"]"].value = fragmentToJSON(coll[i - 1]);
    }
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

