function analyze() {
    var all = document.getElementsByTagName("*");
    for (var i = 0; i < all.length; ++i) {
        var info = new Array();
        var validtags = ["A", "BUTTON", "FORM", "IMG", "INPUT", "LINK", "OPTION", "SELECT", "TABLE", "TEXTAREA"];
        if (validtags.indexOf(all[i].tagName) < 0) continue;
        info[0] = all[i].tagName;
  	switch(info[0]) {
			case "INPUT":
			info[1] = all[i].getAttribute("type");
			break;
			case "A":
			info[1] = all[i].getAttribute("href");
			break;
			case "BUTTON"
			info[1] = all[i].getAttribute("name");
			info[2] = all[i].getAttribute("type");
			info[3] = all[i].getAttribute("value");
			info[4] = all[i].getAttribute("form");
			break;
			case "FORM":
			info[1] = all[i].getAttribute("name");
			info[2] = all[i].getAttribute("length");
			info[3] = all[i].getAttribute("target");
			info[4] = all[i].getAttribute("action");
			break;
			case "IMG":
			info[1] = all[i].getAttribute("name");
			info[2] = all[i].getAttribute("src");
			info[3] = all[i].getAttribute("align");
			break;
			case "INPUT":
			info[1] = all[i].getAttribute("name");
			info[2] = all[i].getAttribute("type");
			info[3] = all[i].getAttribute("value");
		
			break;
			case "LINK"
			info[1] = all[i].getAttribute("href");
			info[2] = all[i].getAttribute("type");
			info[3] = all[i].getAttribute("charset");
			break;
			case "OPTION":
			info[1] = all[i].getAttribute("text");
			info[2] = all[i].getAttribute("value");
			info[3] = all[i].getAttribute("index");
			break;
			case "SELECT":
			info[1] = all[i].getAttribute("type");
			info[2] = all[i].getAttribute("name");
			info[3] = all[i].getAttribute("size");
			break;
			case "TABLE":
			info[1] = all[i].getAttribute("summmary");
			info[2] = all[i].getAttribute("caption");
			break;
			case "TEXTAREA":
			info[1] = all[i].getAttribute("name");
			info[2] = all[i].getAttribute("type");
			info[3] = all[i].getAttribute("value");
			break;
		}
        generatescript(info);
    }
}
function generatescript(info) {
	var command;
	switch(info[0]) {
		case "A":
		command = "window.location.href = '" + info[1] + "';";
		break;
	}
    alert(command);
}
