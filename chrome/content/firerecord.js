var recordingx = false;

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
	    		firerecord.run();
	    	}
			
		},	
		file: function(){
			

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
            for (var i = 0; i < all.length; ++i) {
                //Define the classname variable
                elm = all[i];
                //deleted local call to new array info
                var validtags = ["A", "BUTTON", "FORM", "IMG", "INPUT", "LINK", "OPTION", "SELECT", "TABLE", "TEXTAREA"];
                //Add a click event listener to all the valid tags.
                if (validtags.indexOf(all[i].tagName) < 0) continue;
                    
                info[0] = all[i].tagName;

                //Feel free to change this to a for each...
                if(recordingx){
                switch (info[0]) {
                    //All of these cases need null checks for each attribute.
                    case "INPUT":
                     
                        elm.className += ((elm.className.length > 0) ? " " : "") + "link-target-finder-selected";
                        elm.addEventListener("click", handleType, false);
                        break;
                    case "A":
                       
                        elm.addEventListener("click", handleEvent);
                        elm.className += ((elm.className.length > 0) ? " " : "") + "link-target-finder-selected";
                        elm.addEventListener("click", handleEvent, false);
                        break;
                    case "BUTTON":
                       
                        elm.className += ((elm.className.length > 0) ? " " : "") + "link-target-finder-selected";
                        elm.addEventListener("click", handleEvent, false);
                        break;
                    case "FORM":
                       
                        elm.className += ((elm.className.length > 0) ? " " : "") + "link-target-finder-selected";
                        elm.addEventListener("click", handleEvent, false);
                        break;
                    case "IMG":
                       
                        elm.className += ((elm.className.length > 0) ? " " : "") + "link-target-finder-selected";
                        elm.addEventListener("click", handleEvent, false);
                        break;
                    case "INPUT":
                      
                        elm.className += ((elm.className.length > 0) ? " " : "") + "link-target-finder-selected";
                        elm.addEventListener("click", handleEvent, false);
                        break;
                    case "LINK":
                    
                        elm.className += ((elm.className.length > 0) ? " " : "") + "link-target-finder-selected";
                        elm.addEventListener("click", handleEvent, false);
                        break;
                    case "OPTION":
                       
                        elm.className += ((elm.className.length > 0) ? " " : "") + "link-target-finder-selected";
                        elm.addEventListener("click", handleEvent, false);
                        break;
                    case "SELECT":
                       
                        elm.className += ((elm.className.length > 0) ? " " : "") + "link-target-finder-selected";
                        elm.addEventListener("click", handleEvent, false);
                        break;
                    case "TABLE":
                        info[1] = all[i].getAttribute("summmary");
                        info[2] = all[i].getAttribute("caption");
                        elm.className += ((elm.className.length > 0) ? " " : "") + "link-target-finder-selected";
                        elm.addEventListener("click", handleEvent, false);
                        break;
                    case "TEXTAREA":
                        elm.className += ((elm.className.length > 0) ? " " : "") + "link-target-finder-selected";
                        elm.addEventListener("click", handleEvent, false);
                        break;

                }
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

        //---------------------------------------------------------------------

        //_____________________________________________________________________
        var tname;
        var taginfo = new Array();
        tname = targ.tagName;
        taginfo[0] = tname;
        
        //Feel free to change this to a for each...
        switch (tname) {
            //All of these cases need null checks for each attribute.
            
            case "A":
                taginfo[1] = targ.href;
              
                break;
            case "BUTTON":
                taginfo[1] = targ.name;
                taginfo[2] = targ.type;
                taginfo[3] = targ.value;
                taginfo[4] = targ.form;
                
                break;
            case "FORM":
                taginfo[1] = targ.name;
                taginfo[2] = targ.length;
                taginfo[3] = targ.target;
                taginfo[4] = targ.action;
                
                break;
            case "IMG":
                taginfo[1] = targ.name;
                taginfo[2] = targ.src;
                
                break;
            case "INPUT":
                taginfo[1] = targ.name;
                taginfo[2] = targ.type;
                taginfo[3] = targ.value;
                
                break;
            case "LINK":
                taginfo[1] = targ.href;
                taginfo[2] = targ.type;
                taginfo[3] = targ.charset;
                
                break;
            case "OPTION":
                taginfo[1] = targ.text;
                taginfo[2] = targ.value;
                taginfo[3] = targ.index;
                
                break;
            case "SELECT":
                taginfo[1] = targ.type;
                taginfo[2] = targ.name;
                taginfo[3] = targ.size;
                
                break;
            case "TABLE":
                taginfo[1] = targ.summmary;
                taginfo[2] = targ.caption;
                
                break;
            case "TEXTAREA":
                taginfo[1] = targ.name;
                taginfo[2] = targ.type;
                taginfo[3] = targ.value;
                
                break;

        }

        alert(window.content.location.href);
        if(!taginfo[1]){
        	taginfo[1]= "null";
        }
        if(!taginfo[2]){
        	taginfo[2]= "null";
        }
        if(!taginfo[3]){
        	taginfo[3]= "null";
        }
        if(!taginfo[4]){
        	taginfo[4]= "null";
        }
        alert("You clicked on a " + tname + " with info \n " + taginfo[1] + "\n"+ taginfo[2]+"\n"+taginfo[3]+"\n"+" saving... " + taginfo.join('::'));
        
        e.cancelBubble = true;

    };

}();
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
