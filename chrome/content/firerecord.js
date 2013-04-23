var recordingx = false;
var path = null;


window.addEventListener("load", function load(event) {
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    firerecord.init();
}, false);
    
var firerecord = function () {
    var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    return {
        init: function () {
            var appcontent = document.getElementById("appcontent");   // browser
            if (appcontent) {
                appcontent.addEventListener("DOMContentLoaded", firerecord.run, true);
            }
        },
        running: function (){
            if(recordingx){
                recordingx = false;
                alert("Stop Listen");
	    		
                //document.location.reload();
                //closes all tabs on firefox.
            }
            else{
                recordingx = true;
                alert("Start Listen");
                //createFile("Initialize New Test File");
                firerecord.run();
            }
			
        },	
        file: function(){
			const nsIFilePicker = Components.interfaces.nsIFilePicker;

            var fp = Components.classes["@mozilla.org/filepicker;1"]
				           .createInstance(nsIFilePicker);
            fp.init(window, "Dialog Title", nsIFilePicker.modeOpen);
            fp.appendFilters(nsIFilePicker.filterAll | nsIFilePicker.filterText);

            var rv = fp.show();
            if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
                var file = fp.file;
                // Get the path as string. Note that you usually won't 
                // need to work with the string paths.
                path = fp.file.path;
                // work with returned nsILocalFile...
			  
            }
        },
        run : function () {
            var head = content.document.getElementsByTagName("head")[0],
				style = content.document.getElementById("link-target-finder-style"),
				all = content.document.getElementsByTagName("*"),
                foundElements = 0;

            var info = new Array(); // Made this global
            var Recording = true;   // Just need this until we finish with the the buttons.

            if (!style) {
                style = content.document.createElement("link");
                style.id = "link-target-finder-style";
                style.type = "text/css";
                style.rel = "stylesheet";
                style.href = "chrome://firerecord/skin/skin.css";
                head.appendChild(style);
            }

            // Find all elements attributes and add a listener	
            //-----------------------------------------------------------
            // Add author(s) to this section. Who did this? David and Peter?
            // Vastly simplified by Peter
            if(recordingx){
                for (var i = 0; i < all.length; ++i) {
                    var elm = all[i];
                    elm.addEventListener("click", handleEvent, false);
                    elm.className += ((elm.className.length > 0) ? " " : "") + "link-target-finder-selected";
                }
            }
            //----------------------------------------------------------------
            
        }


    };

    //Need to add author to this part...
    //Need to add author to this part...
    function handleEvent(e) {
        var targ;
        if (!e) {
            var e = window.event;
        }
        if (e.target) {
            targ = e.target;
        }
        else if (e.srcElement) {
            targ = e.srcElement;
        }
        var contents = "script_click(script_find(" + targ.tagName + ", " + targ.getAttribute("id") + ", " + targ.getAttribute("name") + "));\n";
        alert(contents);
        appendFile(contents);
        e.cancelBubble = true;
    };

}();
function createFile(contents) {
	
    alert("created File");
    var file1 = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    file1.initWithPath("C:\\test\\" + "test.txt"); 
    //alert("create file nullcheck" +file1.toString());
    var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
    // use 0x02 | 0x10 to open file for appending.
    foStream.init(file1, 0x02 | 0x08 | 0x20, 438, 0);
    var converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"].
					createInstance(Components.interfaces.nsIConverterOutputStream);
    converter.init(foStream, "UTF-8", 0, 0);
    converter.writeString(contents.toString());
    converter.close(); // this closes foStream
}

function appendFile(contents) {

    alert("appended File");
    var file1 = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    file1.initWithPath(path); 
    //alert("append file nullcheck: "+file1.toString());
    var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
    // use 0x02 | 0x10 to open file for appending.
    foStream.init(file1, 0x02 | 0x10, 438, 0);
    var converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"].
					createInstance(Components.interfaces.nsIConverterOutputStream);
    converter.init(foStream, "UTF-8", 0, 0);
	
    converter.writeString(contents);
    converter.close();
}
function handleType(e) {
    var targ;
    if (!e) {
        var e = window.event;
    }
    if (e.target) {
        targ = e.target;
    }
    else if (e.srcElement) {
        targ = e.srcElement;
    }
    alert("Type Changed");
    e.cancelBubble = true;
}
