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
    

s += "<div class='icons'><img src='/icon/save.png' onclick='saveDocument(this.parentNode.parentNode)'> <img src='/icon/plus.png' onclick='newFrag(this.parentNode.parentNode, \"normal\")'> <img src='/icon/plust.png' onclick='openTransclusionForm(this.parentNode.parentNode)'> <img src='/icon/link.png' onclick='openEdgeForm()'> <img src='/icon/linkx.png' onclick='openEdgeForm()'></div>"

    
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


function newFrag(obj, type)
{
    //    console.log("Not implemented yet");
    if (type == "normal") {
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
		// need to do better than just inserting it in to body, not doing it at all kek
//		loadFragment(x, document.body);
		currGraph.setNode(x, "normal");
		// need to save it again for id to be updated, what to do?
	    }
	}
	xmlHttp.open("post", "/create.php");
	xmlHttp.send(formData);
    }
    else {
	currGraph.setNode(obj, "transclusion");
    }
}


function openTransclusionForm(obj)
{
    var tForm = document.getElementById("transclusionForm");
    tForm.reset();

    var temp = currGraph.nodes();
    // disgusting code duplication
    var other = [];
    var diff = [];

    var tyForm = document.getElementById("typeForm");
    tyForm.type.value = "fragment";

    var formData = new FormData(tyForm);
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function()
    {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	{
	    tForm.list.innerHTML = "";
	    var obj = JSON.parse(xmlHttp.responseText);
	    for (let key in obj) {
		other.push(obj[key]);
	    }
	    diff = other.filter(x => !temp.includes(x));
	    
	    for(var i = 0; i < diff.length; i++) {
		var o = document.createElement("option");
		o.value = diff[i];
		o.innerText = diff[i];
		tForm.list.appendChild(o);
	    }
	}
	
	document.getElementsByClassName("overlay")[0].style.display="block";
	tForm.style.display = "block";
    }
    xmlHttp.open("post", "/find.php");
    xmlHttp.send(formData);
    
}


function newTransclusion()
{
    var tForm = document.getElementById("transclusionForm");
    var val = tForm.list.value;
    newFrag(val, "transclusion");
}

function closeTransclusionForm()
{
    document.getElementById("transclusionForm").style.display = "none";
    document.getElementsByClassName("overlay")[0].style.display = "none";
}

function openEdgeForm()
{
    var eForm = document.getElementById("edgeForm");
    eForm.reset();

    var edges = currGraph.edges();
    console.log(edges);
    
    eForm.list1.innerHTML = eForm.list2.innerHTML = eForm.list3.innerHTML = "";
    var nodes = currGraph.nodes();
    console.log(nodes);

    var edges = currGraph.edges();
    for(var i = 0; i < edges.length; i++) {
	var o = document.createElement("option");
	o.value = o.innerHTML = edges[i].v + "," + edges[i].w;
	eForm.list1.appendChild(o);
    }
    for (var i = 0; i < nodes.length; i++) {
	var o1 = document.createElement("option");
	var o2 = document.createElement("option");
	o1.value = o1.innerHTML = o2.value = o2.innerHTML = nodes[i];
	eForm.list2.appendChild(o1);
	eForm.list3.appendChild(o2);
    }
    
    document.getElementsByClassName("overlay")[0].style.display="block";
    eForm.style.display = "block";
}


function closeEdgeForm()
{
    document.getElementById("edgeForm").style.display = "none";
    document.getElementsByClassName("overlay")[0].style.display = "none";
}

function makeEdge()
{
    var eForm = document.getElementById("edgeForm");
    if (eForm.list2.value == eForm.list3.value) {
	alert("Don't make self loops!");
	return;
    }

    currGraph.setEdge(eForm.list2.value, eForm.list3.value);
    closeEdgeForm();
}

function deleteEdge()
{
    var eForm = document.getElementById("edgeForm");
    var arr = eForm.list1.value.split(",");
    currGraph.removeEdge(arr[0], arr[1]);
    closeEdgeForm();
}

function loadAllEdges(obj)
{
    var id = obj.id;
    var edges = currGraph.outEdges(id);
    
    if (edges.length == 0)
	return;
    
    console.log(edges);
    console.log(obj);
    var tmp;

    if (obj.parentNode != document.body)
	tmp = obj.parentNode.parentNode;
    else
	tmp = obj;
    console.log("tmp " + tmp.className);
    deleteOthers(document.body, tmp, marker);

    // duplication was unavoidable
    console.log("edges length: " + edges.length);
    
    generateSaveForm(edges.length);
    var sForm = document.getElementById("saveForm");
    var elts = sForm.elements;

    for(var i = 0; i < edges.length; i++) {
	elts["type["+i+"]"].value = "fragment";
	elts["id["+i+"]"].value = edges[i].w;
	elts["content["+i+"]"].value = "";
    }
    //  console.log(sForm.innerHTML);

    var formData = new FormData(sForm);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	{
	    console.log("Loaded edges of" + obj.id + " successfully!");
	    var list = JSON.parse(xmlHttp.responseText);
	    
	    var slideContainer = document.createElement("div");
	    slideContainer.className = "slideshow-container";
	    // is this needed?
	    //slideContainer.innerHTML = "<p id='slide-marker'></p>"

	    for(var i = 0; i < list.length; i++) {
		var temp = JSON.parse(list[i]);
		console.log("ids " + temp.id + " " + edges[i].w);
		temp.id = edges[i].w;
		
		var d = document.createElement("div");
		d.className = "mySlides fade";
		// number Text needed?
		d.appendChild(fragJSONToDOM(JSON.stringify(temp)));
		slideContainer.appendChild(d);

		document.body.insertBefore(slideContainer, marker);
	    }
	    
	    slideContainer.innerHTML +=  "<a class='prev' onclick='plusSlides(-1, this.parentNode)'>&#10094;</a><a class='next' onclick='plusSlides(1, this.parentNode)'>&#10095;</a>"
	    showSlides(0, slideContainer)
	}
    }
    xmlHttp.open("post", "/load.php");
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
	    window.location.href = "viewDoc.php?list=" + xmlHttp.responseText;
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
