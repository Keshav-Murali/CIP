/* Serialize items to strings
   Deserialize strings by creating the suitable object and returning it?
   For now only return the relevant string

   This maybe reworked later

   Items = text, image, audio and video
   This may be expanded
*/

function serializeItem(a)
{
    if (a.nodeName == "P") {
	obj = {type : "text", content : a.innerHTML};
    }

    else if (a.nodeName == "IMG") {
	obj = {type : "image", content : a.src};
    }

    else if (a.nodeName == "AUDIO" || a.nodeName == "VIDEO") {
	var ntype = a.nodeName.toLowerCase();
	if(a.src == "")
	    var src = a.currentSrc;
	else
	    var src = a.src;
	
	obj = {type : ntype, content: src}
    }

    else {
	return "UNKNOWN";
    }

    return (JSON.stringify(obj));
}

function deSerializeItem(str)
{
    tmp = JSON.parse(str);

    if (tmp.type == "text") {
	return tmp.content;
    }

    else if (tmp.type == "image") {
	return tmp.content;
    }

    else if (tmp.type == "audio") {
	return tmp.content;
    }

    else if (tmp.type == "video") {
	return tmp.content;
    }

    else {}
	
}
