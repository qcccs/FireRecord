function analyze() {
    var all = document.getElementsByTagName("*");
    for (var i = 0; i < all.length; ++i) {
        var info = new Array();
        var validtags = ["A", "BUTTON", "FORM", "IMG", "INPUT", "LINK", "OPTION", "SELECT", "TABLE", "TEXTAREA"];
        if (validtags.indexOf(all[i].tagName) < 0) continue;
        info[0] = all[i].tagName;
        info[1] = all[i].getAttribute("id");
        info[2] = all[i].getAttribute("name");
        info[3] = all[i].getAttribute("class");
        info[4] = all[i].getAttribute("type");
        dostuff(info);
    }
}
function dostuff(info) {
    alert(JSON.stringify(info));
}
