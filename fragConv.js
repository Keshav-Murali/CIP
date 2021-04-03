//import { DOMtoJSObject, DOMToJSON, JSONToDOM, JSONToInnerHTML } from './itemConv.js'
//export { fragmentToJSON, fragmentToJSObject }

function fragmentToJSObject(fragment)
{
    id = fragment.id;
    title = fragment.getElementsByClassName("title")[0].textContent;
    
    tags_list_temp = fragment.getElementsByClassName("tags")[0].getElementsByClassName("tags_list")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
    tags_list = [];
    
    for(i = 0; i < tags_list_temp.length; i++) {
	tags_list.push(tags_list_temp[i].textContent);
    }
    
    innerContents = fragment.getElementsByClassName("content")[0];
    sections = innerContents.getElementsByTagName("section");

    items = [];
    
    for(i = 0; i < sections.length; i++) {
	items.push(DOMToJSObject(sections[i]));
    }

    obj = {id: id, title: title, tags : tags_list, items: items};
    return obj;
}


function fragmentToJSON(fragment)
{
    obj = fragmentToJSObject(fragment);
    return (JSON.stringify(obj));
}
    
function fragJSONToDOM(str)
{
    obj = JSON.parse(str);
    
    DOMObject = document.createElement("article");
    DOMObject.id = obj.id;
    DOMObject.className = "fragment"

    var s = "<h2 class='title'>" + obj.title + "</h2>" +
	"<span class='fragid'>id: " + obj.id + " </span>" +
	"<span class='editIcon'><img src='/icon/edit.png' onclick='editTitleTag(this.parentNode.parentNode)'></span>" + "<br>"
	s += "<div class='tags'><h3>Tags</h3>" + "<span class='tags_list'><ul></ul></span></div>";
    s += "<div class='icons'><img src='/icon/save.png' onclick='saveFragment(this.parentNode.parentNode)'> <img src='/icon/inserttext.png' onclick='insertNewText(this.parentNode.parentNode)'> <img src='/icon/insertimage.png' onclick='insertNewImage(this.parentNode.parentNode)'> <img src='/icon/insertaudio.png' onclick='insertNewAudio(this.parentNode.parentNode)'> <img src='/icon/insertvideo.png' onclick='insertNewVideo(this.parentNode.parentNode)'> <img src='/icon/link.png' onclick='insertNewLink(this.parentNode.parentNode)'> </div>"
    DOMObject.innerHTML = s;
    target = DOMObject.getElementsByTagName("ul")[0];
    
    for(var i = 0; i < obj.tags.length; i++)
	target.innerHTML += ("<li>" + obj.tags[i] + "</li>" + " ");

    DOMObject.innerHTML += "<div class='content'></div>";

    target = DOMObject.getElementsByClassName("content")[0];
    // does this need changing? it's stupid
    for(i = 0; i < obj.items.length; i++)
	target.appendChild(JSONtoDOM(JSON.stringify(obj.items[i])));
				
    return DOMObject;
}

function saveFragment(obj)
{
    var sForm = document.getElementById("saveFrag");
    sForm.name.value = obj.id;
    sForm.content.value = fragmentToJSON(obj);
    
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

//below two not useful
var global_DOM_Object;
var fetching = true;

function loadFragment(obj_id, target_parent)
{
    var sForm = document.getElementById("saveFrag");
    sForm.name.value = obj_id;
    sForm.content.value = " ";
    
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

