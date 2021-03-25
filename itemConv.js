//export{ DOMToJSObject, DOMToJSON,
//	JSONToDOM, JSONToInnerHTML};

/* 
   Items <-> JSON

   Items = text, image, audio, video and links
   This may be expanded

   Items form SECTIONS of an ARTICLE (FRAGMENT)

   One DIV or SPAN (not decided yet) for showing icons
   Another for displaying stuff

   <section class=ItemType (text, image etc)>
   <div/span class=Work>...Icons... Tie to relevant handlers</div/span>
   <div class="content">.......</div>
   </section>
*/

var currMediaObject;

function DOMToJSObject(item)
{
    innerContents = item.getElementsByClassName("content")[0];
    
    if (item.className == "text") {
	obj = {type : "text", content : innerContents.innerHTML};
    }

    else if (item.className == "image") {
	obj = {type : "image", content : innerContents.getElementsByTagName("IMG")[0].src}
    }
	      
    else if (item.className == "audio" || item.className == "video") {
	var temp = innerContents.getElementsByTagName("audio");
	if (temp.length == 0)
	    temp = innerContents.getElementsByTagName("video");
	
	var it = temp[0];
	
	var ntype = it.nodeName.toLowerCase();
	if(it.src == "")
	    var src = it.currentSrc;
	else
	    var src = it.src;
	
	obj = {type : ntype, content: src}
    }

    else if (item.className == "link") {
	var temp = innerContents.getElementsByClassName("original_link")[0];
	var original = temp.href;
	var original_text = temp.text;
	temp = innerContents.getElementsByClassName("archived_link");
	if(temp.length == 0)
	    var archived = "";
	else
	    archived = temp[0].href;

	obj = {type : "link", original_link : original, original_text: original_text, archived_link : archived}
	
    }
    else {
	obj = {type : "unknown"};
	return obj;
    }
									    
    return obj;
}

function DOMToJSON(item)
{
    obj = DOMToJSObject(item);
    return (JSON.stringify(obj));
}

function JSONToInnerHTML(tmp) 
{
    var opening = "<div class='content'>";
    // fix dummy argument
    opening = iconsGen("dummy argument") + opening;
    var closing = "</div>";
    
    if (tmp.type == "text") {
	return opening + tmp.content + closing;
    }

    else if (tmp.type == "image") {
	return opening + "<img src='" + tmp.content + "'>" + closing;
    }

    else if (tmp.type == "audio" || tmp.type == "video") {
	return opening + "<" + tmp.type + " controls src='" + tmp.content + "'>" + closing;
    }

    else if (tmp.type == "link") {
	var concat = opening + "<a class='original_link' href='" + tmp.original_link + "'>" + tmp.original_text + "</a>";
	
	if (tmp.archived_link != "")
	{
	    concat += " " + "<a class='archived_link' href='" + tmp.archived_link + "'>" + "(Archive)" + "</a>";
	}

	return concat + closing;
    }

    else {
	return "<span color='red'>Unknown element!</span>";
    }	
}

function JSONtoDOM(str)
{
    var tmp = JSON.parse(str);
    
    var DOMObject = document.createElement("SECTION");
    DOMObject.className = tmp.type;
    DOMObject.innerHTML = JSONToInnerHTML(tmp);

    return DOMObject;
}

function iconsGen(arg)
{
    str = "<span class='itemIcons'><img src='/icon/edit.png' onclick='editItem(this.parentNode.parentNode)'> <img src='/icon/delete.png' onclick='deleteItem(this.parentNode.parentNode)'> <span onclick='moveUp(this.parentNode.parentNode)'>&uparrow;</span> <span onclick='moveDown(this.parentNode.parentNode)'>&downarrow;</span></span>";
    return str;
}

function moveUp(obj)
{
    var parent = obj.parentNode;
    // handles both top, and the case where it is the only child
    if (parent.children[0] == obj) {
	alert("Already at top!");
	return;
    }

    var i;
    for(i = 0; i < parent.children.length; i++)
    {
	if (obj == parent.children[i])
	    break;
    }

    var next = parent.removeChild(parent.children[i - 1]);

    if (parent.children.length > 1) {
	parent.insertBefore(next, parent.children[i]);
    }

    else {
	parent.appendChild(next);
    }
}

function moveDown(obj)
{
    var parent = obj.parentNode;
    // handles both top, and the case where it is the only child
    if (parent.children[parent.children.length - 1] == obj)
    {
	alert("Already at bottom!");
	return;
    }

    var i;
    for(i = 0; i < parent.children.length; i++)
    {
	if (obj == parent.children[i])
	    break;
    }

    var prev = parent.removeChild(parent.children[i + 1]);

    if (parent.children.length > 1) {
	parent.insertBefore(prev, parent.children[i]);
    }

    else {
	parent.prepend(prev);
    }
}

function deleteItem(DOMObject)
{
    ret = confirm("The element will be deleted!");
    if (ret)
	DOMObject.remove();
}

function editItem(DOMObject)
{
    document.getElementsByClassName("overlay")[0].style.display="block";
    
    if(DOMObject.className == "text")
	editText(DOMObject);

    else if (DOMObject.className == "image" || DOMObject.className == "audio" || DOMObject.className == "video") {
	editMedia(DOMObject);
    }

    else {
	alert("Links not supported yet!");
	// Remove once implemented
//	document.getElementsByClassName("overlay")[0].style.display="none";
    }
}

function editText(obj)                                                      {
    document.getElementById("textEdit").style.display="block";
    initDoc(obj.getElementsByClassName("content")[0]);   
}

function editMedia(obj)
{
    var mediaObjectTag;
    
    if (obj.className == "image")
	mediaObjectTag = "img";
    else
	mediaObjectTag = obj.className;
    
    currMediaObject = obj.getElementsByClassName("content")[0].getElementsByTagName(mediaObjectTag)[0];
    
    var mediaForm = document.getElementById("mediaEdit");
    var str = "Modify ";
    var file_input = mediaForm.getElementsByClassName("file")[0];
    
    mediaForm.getElementsByClassName("title")[0].textContent = str + obj.className;
    mediaForm.getElementsByClassName("frag")[0].readonly = false;
    mediaForm.getElementsByClassName("frag")[0].value = obj.parentNode.parentNode.id;
    mediaForm.getElementsByClassName("frag")[0].readonly = true;
    
    
    file_input.accept = obj.className + "/*";
        
    document.getElementsByClassName("overlay")[0].style.display="block";
    document.getElementById("mediaEdit").style.display = "block";
}

function submitMedia(media_form)
{
    var f = media_form.getElementsByClassName("file")[0].files;
    if (f.length == 0) {
	alert("No modifications were done!");
	return;
    }
    else {
	var mForm = document.getElementById("mediaEdit");
	var formData = new FormData(mForm);
	
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function()
	{
	    if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
	    {
		currMediaObject.src = xmlHttp.responseText;
	    }
	}
	xmlHttp.open("post", "/upload.php");
	xmlHttp.send(formData); 
    }
    // action="/upload.php" method="POST"
}

function closeMediaForm()
{
    document.getElementById("mediaEdit").style.display = "none";
    document.getElementsByClassName("overlay")[0].style.display = "none";
}
