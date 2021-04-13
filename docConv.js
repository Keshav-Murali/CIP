var currGraph;

function documentToJSObject(doc, graph)
{
    id = doc.id;
    title = doc.getElementsByClassName("title")[0].textContent;
    
    tags_list_temp = doc.getElementsByClassName("tags")[0].getElementsByClassName("tags_list")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
    tags_list = [];
    
    for(i = 0; i < tags_list_temp.length; i++) {
	tags_list.push(tags_list_temp[i].textContent);
    }
    
    var g = graphlib.json.write(graph);
    obj = {id: id, title: title, tags : tags_list, graph: g};
    return obj;
}

function documentToJSON(doc, graph)
{
    obj = documentToJSObject(doc, graph);
    return (JSON.stringify(obj));
}

function docJSONToDOM(str)
{
    obj = JSON.parse(str);
    currGraph = graphlib.json.read(obj.graph);
    
    DOMObject = document.createElement("div");
    DOMObject.id = obj.id;
    DOMObject.className = "document"

    var s = "<h2 class='title'>" + obj.title + "</h2>" +
	"<span class='docid'>id: " + obj.id + " </span>" +
	"<span class='editIcon'><img src='/icon/edit.png' onclick='editTitleTag(this.parentNode.parentNode)'></span>" + "<br>"
    s += "<div class='tags'><h3>Tags</h3>" + "<span class='tags_list'><ul></ul></span></div>";
    

s += "<div class='icons'><img src='/icon/save.png' onclick='saveDoc(this.parentNode.parentNode)'> <img src='/icon/plus.png' onclick='newFrag(this.parentNode.parentNode)'> <img src='/icon/link.png' onclick='makeEdge(this.parentNode.parentNode)'> </div>"

    
    DOMObject.innerHTML = s;
    target = DOMObject.getElementsByTagName("ul")[0];
    
    for(var i = 0; i < obj.tags.length; i++)
	target.innerHTML += ("<li>" + obj.tags[i] + "</li>" + " ");

/*    DOMObject.innerHTML += "<div class='content'></div>";

    target = DOMObject.getElementsByClassName("content")[0];
    // does this need changing? it's stupid
    for(i = 0; i < obj.items.length; i++)
	target.appendChild(JSONtoDOM(JSON.stringify(obj.items[i])));
*/				
    return DOMObject;
}


function newFrag(obj)
{
//    console.log("Not implemented yet");
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
		  var x = xmlHttp.responseText;
		  // need to do better than just inserting it in to body
		  loadFragment(x, document.body);
		  currGraph.setNode(x, "normal");
		  // need to save it again for id to be updated, what to do?
	      }
	  }
	  xmlHttp.open("post", "/create.php");
	  xmlHttp.send(formData); 

}

function removeNode(fragment)
{
    currGraph.removeNode(fragment.id);
    fragment.remove();
    console.log("Done removing");
    console.log("Graph is" + JSON.stringify(graphlib.json.write(currGraph)));
}

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

/*
Impl in main index.php
function delDoc(id)
{
    
}
*/
function makeEdge()
{
    console.log("Not implemented yet");
    
}

function removeEdge()
{
    console.log("Not implemented yet");
}
/*    

   

function insertNewText(obj)
{
    var cont = obj.getElementsByClassName("content")[0];
    var def_text = {"type":"text","content":"\n\t <p>Lorem ipsum</p>"}
    
    cont.appendChild(JSONtoDOM(JSON.stringify(def_text)));
}

function insertNewImage(obj)
{
    var cont = obj.getElementsByClassName("content")[0];
    var def_image = {"type":"image","desc":"Default image","content":"/includes/defimg.png"}
    
    cont.appendChild(JSONtoDOM(JSON.stringify(def_image)));
}

function insertNewAudio(obj)
{
    var cont = obj.getElementsByClassName("content")[0];
    var def_audio = {"type":"audio","desc":"Default audio","content":"/includes/defaud.ogg"}
    
    cont.appendChild(JSONtoDOM(JSON.stringify(def_audio)));
}

function insertNewVideo(obj)
{
    var cont = obj.getElementsByClassName("content")[0];
    var def_video = {"type":"video","desc":"Default video","content":"/includes/defvid.webm"}
    
    cont.appendChild(JSONtoDOM(JSON.stringify(def_video)));
}

function insertNewLink(obj)
{
    var cont = obj.getElementsByClassName("content")[0];
    var def_link = {"type":"link","original_link":"https://www.yahoo.com/","original_text":"Default link","archived_link":""}
    
    cont.appendChild(JSONtoDOM(JSON.stringify(def_link)));
}

function editTitleTag(obj)
{
    var tForm = document.getElementById("titleTagEdit");
    tForm.reset();
    
    var str = "Modify ";
        
    tForm.getElementsByClassName("title")[0].textContent = str + obj.className;
    document.getElementById("titleTagEditLabel").textContent = obj.className + " Id";
    tForm.getElementsByClassName("Id")[0].readonly = false;
    tForm.getElementsByClassName("Id")[0].value = obj.id;
    tForm.getElementsByClassName("Id")[0].readonly = true;

    var title_elt = obj.getElementsByClassName("title")[0];
    var tags_list_ul = obj.getElementsByClassName("tags")[0].getElementsByClassName("tags_list")[0].getElementsByTagName("ul")[0];
    
    tForm.desc.value = title_elt.textContent;
    var i;
    for(i = 0; i < tags_list_ul.children.length; i++) {
	if (i != (tags_list_ul.children.length - 1))
	    tForm.med.value += (tags_list_ul.children[i].textContent + " ");
	else
	    tForm.med.value += tags_list_ul.children[i].textContent;
    }
//    mediaForm.getElementsByClassName("desc")[0].value = obj.getElementsByClassName("desc")[0].textContent;
    
    document.getElementsByClassName("overlay")[0].style.display="block";
    document.getElementById("titleTagEdit").style.display = "block";

}

function modifyTitleTag(tForm)
{
    var obj = document.getElementById(tForm.Id.value);
    var title_elt = obj.getElementsByClassName("title")[0];
    var tags_list_ul = obj.getElementsByClassName("tags")[0].getElementsByClassName("tags_list")[0].getElementsByTagName("ul")[0];

    title_elt.textContent = tForm.desc.value;

    var tags = tForm.med.value.split(' ');
    console.log(tags);
    var s = "";
    for(var i = 0; i < tags.length; i++) {
	s += ("<li>" + tags[i] + "</li>" + " ");
    }

    tags_list_ul.innerHTML = s;
}

function closeTitleTagForm()
{
    document.getElementById("titleTagEdit").style.display = "none";
    document.getElementsByClassName("overlay")[0].style.display = "none";
}

*/
