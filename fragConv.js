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

    // needs to generate icons, not done yet
    DOMObject.innerHTML = "<h2 class='title'>" + obj.title + "</h2>" +
	"<span class='fragid'>id: " + obj.id + "<br></span>" + "<div class='tags'><h3>Tags</h3>" + "<span class='tags_list'><ul style='list-style-type: none'></ul></span></div>";

    target = DOMObject.getElementsByTagName("ul")[0];
    
    for(var i = 0; i < obj.tags.length; i++)
	target.innerHTML += ("<li style='display: inline'>" + obj.tags[i] + "</li>" + " ");

    DOMObject.innerHTML += "<div class='content'></div>";

    target = DOMObject.getElementsByClassName("content")[0];
    // does this need changing? it's stupid
    for(i = 0; i < obj.items.length; i++)
	target.appendChild(JSONtoDOM(JSON.stringify(items[i])));
				
    return DOMObject;
}
