/*
@author Ian Hickey, Rylan Doherty, David Westgate, William Jellesma, Peter Atashian
@fileOverview The event listener, event handler, script writer, and script executer functions of firerecord

*/
var recording2 = false;
var path = null;
var page = null;
var i = 0;
var line1 = new Array();
var line2 = new Array();
var playThis;
var debugging = 0; //Turn on debugging by setting this to 1.
var lastPage = "";
/*
 * debug handles displaying popups for additional info 
 * needed for debugging purposes.
 * @arg debug string to display to in debug mode.
 */
var debug = function (debugString) {
    if (this.debugging == 1) { alert(debugString) }
    else { return 1; }
};
/*
 * Handles calling the init function on each page load.
 */
window.addEventListener("load", function load(event) {
    window.removeEventListener("load", load, false);
    firerecord.init();
}, false);

/*
 * Init checks that the dom is loaded an ready before calling run()
 */
var firerecord = function () {
    var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
    .getService(Components.interfaces.nsIPrefBranch);
    return {
        init: function () {
            var appcontent = document.getElementById("appcontent"); // browser
            if (appcontent) {
                appcontent.addEventListener("DOMContentLoaded", firerecord.run,
						true);
            }
        },
        /* 
        @author Rylan
		*/
        running: function () {
            if (recording2) {
                recording2 = false;
                alert("Recording Completed.");
                openUILinkIn(window.content.location.href, "current");
            } else {
                recording2 = true;
                alert("Recording On.");
                firerecord.run();
            }
        },
        openfile: function () {
            path = io.openPath();
        },
        newfile: function () {
            path = io.newPath();
            io.createFile(path);
        },

        /* 
		@author Rylan
		*/
        checkpage: function () {
            page = window.content.location.href;
            if (page == lastPage) {
                //do nothing
            }
            else if (page != line1) {
                openUILinkIn(line1, "current");
            }
            setTimeout(function () {
                firerecord.fire();
            }, 3000);//Change timeout to 3 seconds.
        },

        /* 
		@author Rylan, David
		*/
        playback: function () {
            i = 0;
            playThis = io.getScript(path);
            line1 = playThis[0];
            debug("Line 1 == " + line1);
            line2 = playThis[0 + 1].split(' :: ');
            debug("Line 2 == " + line2);
            //Keep a copy of the last address so we don't refresh the page in the middle of trying to login to a site etc.
            lastPage = line1;
            firerecord.checkpage();
        },

        /* 
         * This function  
		 *@author Rylan
		 */
        fire: function () {
            if (line2[0] == "key") {
                debug("Line2 does == [key]");
                var obj = document.createEvent("KeyboardEvent");
                obj.initKeyEvent('keypress', true, true, window, false, false, false, false, 8, 0);
                var keyResult = document.dispatchEvent(obj);
                debug(keyResult); //Display true or false depending on if another obj has overriden and canceled this event.

            }
            else {
                var all = content.document.getElementsByTagName(line2[1]);
                for (var n = 0; n < all.length; n++) {
                    var elem = all[n];
                    var searchCount = 0;
                    if (line2[0] == "click")
                        searchCount = 2;
                    else if (line2[0] == "type")
                        searchCount = 3;
                    var finding = false;
                    while (searchCount < line2.length) {
                        if (elem[line2[searchCount]] == line2[searchCount + 1]) {
                            finding = true;
                            searchCount += 2;
                        }
                        else {
                            finding = false;
                            break;
                        }
                    }
                    if (finding == true)
                        break;
                }
                if (finding == false) {
                    debug("Matching Element Not Found!");
                }
                else if (line2[0] == "click") {
                    var obj = document.createEvent("MouseEvents");
                    obj.initEvent("click", true, true);
                    elem.dispatchEvent(obj);
                }
                else if (line2[0] == "type")
                    elem.value = line2[2];
                i += 2
                if (i < playThis.length) {
                    line1 = playThis[i];
                    line2 = playThis[i + 1].split(' :: ');
                    setTimeout(function () {
                        firerecord.checkpage()
                    }, 3000);
                }
            }
        },
        /*
		@author David, Peter, Rylan, Ian
		@description Find all elements attributes and add a listener
        */
        run: function () {

            var head = content.document.getElementsByTagName("head")[0], style = content.document
					.getElementById("link-target-finder-style"), all = content.document
					.getElementsByTagName("*"), foundElements = 0;
            var Recording = true;
            var info = new Array();
            if (!style) {
                style = content.document.createElement("link");
                style.id = "link-target-finder-style";
                style.type = "text/css";
                style.rel = "stylesheet";
                style.href = "chrome://firerecord/skin/skin.css";
                head.appendChild(style);
            }

            if (recording2) {
                window.content.addEventListener("keyup", handleKey, false);
                for (var i = 0; i < all.length; ++i) {
                    elm = all[i];
                    var validtags = ["A", "BUTTON", "FORM", "IMG", "INPUT",
                                     "LINK", "OPTION", "SELECT", "SPAN", "TABLE", "TEXTAREA"];
                    info[0] = all[i].tagName;
                    if (validtags.indexOf(info[0]) == -1)
                        continue;
                    else {
                        if ((elm.type == "text" || elm.type == "password") && info[0] == "INPUT" || elm.type == "submit" || elm.type == "email") {
                            elm.className += ((elm.className.length > 0) ? " " : "")
                            + "link-target-finder-selected";
                            elm.addEventListener("change", handleType, false);
                        }
                        else {
                            elm.className += ((elm.className.length > 0) ? " " : "")
                            + "link-target-finder-selected";
                            elm.addEventListener("click", handleEvent, false);
                        }
                    }
                }
            }
        }
    };

    /* 
	@author Rylan
	@description handles click events
	*/
    function handleEvent(e) {
        var targ;
        if (!e) {
            var e = window.event;
        }
        if (e.target) {
            targ = e.target;
        } else if (e.srcElement) {
            targ = e.srcElement;
        }
        var eleArray = ["href", "name", "id", "type", "value",
                        "form", "length", "target", "action",
                        "src", "charset", "text", "index",
		                "caption", "selected", "size", "summary", "class"];
        var validtags = ["A", "BUTTON", "FORM", "IMG", "INPUT",
					     "LINK", "OPTION", "SELECT", "SPAN", "TABLE", "EM", "TEXTAREA"];
        var toWrite = new Array();
        toWrite[0] = "click";
        toWrite[1] = targ.tagName;
        var countWrite = 2;
        var eleCount = 0;
        var eleHolder;
        
        if (validtags.indexOf(toWrite[1]) == -1) {
            debug("No valid tags.");
        }
        else {

            // If we are dealing with a span and can't find the href
            // we need to look at the parent and get the link...
            // Need to add img to this as well if the image has no href of its own...
            if (toWrite[1] == "SPAN" || toWrite[1] == "EM") {
                //Find parent.
                debug("Finding Parent");
                var targP = targ.parentElement;
                //Loop through parents...
                try {
                    if (targP.tagName != "A") {
                        //Try a second time...
                        targP = targP.parentElement;
                    }
                } catch (e) {
                    debug("Couldn't find and parent with a link: " + e);
                }
                var targPtag = targP.tagName;
                debug("Found " + targPtag);
                toWrite[1] = targPtag;
                targ = targP;

            }
            while (eleCount < eleArray.length) {

                eleHolder = targ[eleArray[eleCount]];
                
                
                if (eleHolder) {
                    toWrite[countWrite] = eleArray[eleCount];
                    countWrite += 1;
                    toWrite[countWrite] = eleHolder;
                    countWrite += 1;
                }
                eleCount += 1;
            }

            var contents = toWrite.join(' :: ') + "\n";
            io.appendPath(path, window.content.location.href + "\n");
            debug(window.content.location.href + "\n");
            io.appendPath(path, contents);
            debug(contents);
            e.cancelBubble = true;
            toWrite = [];
        }


    }


}();
/*
@author Ian, Rylan
@description handles typing
*/
function handleType(e) {
    var targ;
    if (!e) {
        var e = window.event;
    }
    if (e.target) {
        targ = e.target;
    } else if (e.srcElement) {
        targ = e.srcElement;
    }
    var eleArray = ["href", "name", "id", "type", "form", "length",
		              "target", "action", "src", "charset", "text", "index",
		              "caption", "selected", "size", "summary", "class"];
    var validtags = ["A", "BUTTON", "FORM", "IMG", "INPUT",
				     "LINK", "OPTION", "SELECT", "SPAN", "TABLE", "TEXTAREA"];
    var toWrite = new Array();
    toWrite[0] = "type";
    toWrite[1] = targ.tagName;
    toWrite[2] = targ.value;
    var countWrite = 3;
    var eleCount = 0;
    var eleHolder;
    if (validtags.indexOf(toWrite[1]) == -1) {

    }
    else {
        while (eleCount < eleArray.length) {
            eleHolder = targ[eleArray[eleCount]];
            if (eleHolder) {
                toWrite[countWrite] = eleArray[eleCount];
                countWrite += 1;
                toWrite[countWrite] = eleHolder;
                countWrite += 1;
            }
            eleCount += 1;
        }
        if (targ.value) {
            var contents = toWrite.join(' :: ') + "\n";
            io.appendPath(path, window.content.location.href + "\n");
            io.appendPath(path, contents);
            e.cancelBubble = true;
            toWrite = [];
        }
    }
}
/*
@author Rylan
@description handles key events
*/
function handleKey(e) {

    if (!e) {
        var e = window.event;
    }
    if (e.target) {
        targ = e.target;
    } else if (e.srcElement) {
        targ = e.srcElement;
    }
    var validkeys = [13, 9];
    var keyHit = e ? e.which : window.event.keyCode;
    if (validkeys.indexOf(keyHit) == -1) {

    }
    else {

        var toWrite = new Array();
            toWrite[0] = "key";

        if (keyHit == 13) {
            toWrite[1] = "enter";
        }
        else if (keyHit == 9) {
            toWrite[1] = "tab";
        }
        var contents = toWrite.join(' :: ') + "\n";
        io.appendPath(path, window.content.location.href + "\n");
        io.appendPath(path, contents);
    }
}