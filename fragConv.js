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
	"<span class='fragid'>id: " + obj.id + "<br></span>" + "<div class='tags'><h3>Tags</h3>" + "<span class='tags_list'><ul style='list-style-type: none'></ul></span></div>";
    s += "<div class='icons'><img src='/icon/inserttext.png' onclick='insertNewText(this.parentNode.parentNode)'> <img src='/icon/insertimage.png' onclick='insertNewImage(this.parentNode.parentNode)'> <img src='/icon/insertaudio.png' onclick='insertNewAudio(this.parentNode.parentNode)'> <img src='/icon/insertvideo.png' onclick='insertNewVideo(this.parentNode.parentNode)'> <img src='/icon/link.png' onclick='insertNewLink(this.parentNode.parentNode)'> </div>"
    DOMObject.innerHTML = s;
    target = DOMObject.getElementsByTagName("ul")[0];
    
    for(var i = 0; i < obj.tags.length; i++)
	target.innerHTML += ("<li style='display: inline'>" + obj.tags[i] + "</li>" + " ");

    DOMObject.innerHTML += "<div class='content'></div>";

    target = DOMObject.getElementsByClassName("content")[0];
    // does this need changing? it's stupid
    for(i = 0; i < obj.items.length; i++)
	target.appendChild(JSONtoDOM(JSON.stringify(obj.items[i])));
				
    return DOMObject;
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
