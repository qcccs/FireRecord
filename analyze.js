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
			case "BUTTON":
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
			case "LINK":
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
command = "window.location.href = '" + info[1] + "';"
break;
case "BUTTON":
command = "button.name = '" + info[1] + "';"
+ "button.type = '" + info[2] + "';"
+ "button.value = '" + info[3] + "';"
+ "button.form = '" + info[4] + "';";
break;
case "FORM":
command = "form.name = '" + info[1] + "';"
+ "form.length = '" + info[2] + "';"
+ "form.target = '" + info[3] + "';"
+ "form.action = '" + info[4] + "';";
break;
case "IMG":
command = "img.name = '" + info[1] + "';"
+ "img.src = '" + info[2] + "';"
+ "img.align = '" + info[3] + "';";
break;
case "INPUT":
command = "input.name = '" + info[1] + "';"
+ "input.type = '" + info[2] + "';"
+ "input.value = '" + info[3] + "';";
break;
case "LINK":
command = "link.href = '" + info[1] + "';"
+ "link.type = '" + info[2] + "';"
+ "link.charset = '" + info[3] + "';";
break;
case "OPTION":
command = "option.text = '" + info[1] + "';"
+ "option.value = '" + info[2] + "';"
+ "option.index = '" + info[3] + "';";
break;
case "SELECT":
command = "select.type = '" + info[1] + "';"
+ "select.name = '" + info[2] + "';"
+ "select.size = '" + info[3] + "';";
break;
case "TABLE":
command = "table.summary = '" + info[1] + "';"
+ "table.caption = '" + info[2] + "';";
break;
case "TEXTAREA":
command = "window.location.name = '" + info[1] + "';"
+ "table.type = '" + info[2] + "';"
+ "table.value = '" + info[3] + "';";
break;
}
    alert(command);
}function analyze() {
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
			case "BUTTON":
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
			case "LINK":
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
command = "window.location.href = '" + info[1] + "';"
break;
case "BUTTON":
command = "button.name = '" + info[1] + "';"
+ "button.type = '" + info[2] + "';"
+ "button.value = '" + info[3] + "';"
+ "button.form = '" + info[4] + "';";
break;
case "FORM":
command = "form.name = '" + info[1] + "';"
+ "form.length = '" + info[2] + "';"
+ "form.target = '" + info[3] + "';"
+ "form.action = '" + info[4] + "';";
break;
case "IMG":
command = "img.name = '" + info[1] + "';"
+ "img.src = '" + info[2] + "';"
+ "img.align = '" + info[3] + "';";
break;
case "INPUT":
command = "input.name = '" + info[1] + "';"
+ "input.type = '" + info[2] + "';"
+ "input.value = '" + info[3] + "';";
break;
case "LINK":
command = "link.href = '" + info[1] + "';"
+ "link.type = '" + info[2] + "';"
+ "link.charset = '" + info[3] + "';";
break;
case "OPTION":
command = "option.text = '" + info[1] + "';"
+ "option.value = '" + info[2] + "';"
+ "option.index = '" + info[3] + "';";
break;
case "SELECT":
command = "select.type = '" + info[1] + "';"
+ "select.name = '" + info[2] + "';"
+ "select.size = '" + info[3] + "';";
break;
case "TABLE":
command = "table.summary = '" + info[1] + "';"
+ "table.caption = '" + info[2] + "';";
break;
case "TEXTAREA":
command = "window.location.name = '" + info[1] + "';"
+ "table.type = '" + info[2] + "';"
+ "table.value = '" + info[3] + "';";
break;
}
    alert(command);
}
