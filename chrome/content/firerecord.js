var recordingx = false;
var path = null;
var loadx = null;
var page = null;

window.addEventListener("load", function load(event) {
	window.removeEventListener("load", load, false); // remove listener, no
														// longer needed
	firerecord.init();
}, false);

var firerecord = function() {
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefBranch);
	return {
		init : function() {
			getBrowser().addEventListener("load", function() {
				alert("loaded");
			});
			var appcontent = document.getElementById("appcontent"); // browser
			if (appcontent) {
				appcontent.addEventListener("DOMContentLoaded", firerecord.run,
						true);
			}
		},

		// Rylan
		running : function() {
			if (recordingx) {
				recordingx = false;
				alert("Stop Listen");
				openUILinkIn(window.content.location.href, "current");
				// document.location.reload();
				// closes all tabs on firefox.
			} else {
				recordingx = true;
				alert("Start Listen");
				// createFile("Initialize New Test File");
				firerecord.run();
			}
		},
		openfile : function() {
			path = io.openPath();
		},
		newfile : function() {
			path = io.newPath();
			io.createFile(path);
		},
		// rylan
		/*
		 * file: function(){ const nsIFilePicker =
		 * Components.interfaces.nsIFilePicker;
		 * 
		 * var fp = Components.classes["@mozilla.org/filepicker;1"]
		 * .createInstance(nsIFilePicker); fp.init(window, "Dialog Title",
		 * nsIFilePicker.modeOpen); fp.appendFilters(nsIFilePicker.filterAll |
		 * nsIFilePicker.filterText);
		 * 
		 * var rv = fp.show(); if (rv == nsIFilePicker.returnOK || rv ==
		 * nsIFilePicker.returnReplace) { var file = fp.file; // Get the path as
		 * string. Note that you usually won't // need to work with the string
		 * paths. path = fp.file.path; // work with returned nsILocalFile...
		 *  } },
		 */

		// rylan
		checkpage : function(readloc) {
			page = window.content.location.href;
			if (page != readloc) {
				openUILinkIn(readloc, "current");

			}
		},

		// rylan and David
		playback : function() {
		var playThis = io.getLine(path);
		var line1 = new Array();
		var line2 = new Array();
			for(var i = 0; i < playThis.length; i+=2)
			{
			line1 = playThis[i];
			line2  = playThis[i+1].split(' :: ');
			
			//alert(line1.toString());
			//alert(line2.toString());
			setTimeout(function() {
				firerecord.checkpage(line1);
			}, 5000);
			setTimeout(function() {
				firerecord.fire(line2[0], line2[1], line2[2], line2[3], line2[4]);
			}, 8000);
			// setTimeout(function(){firerecord.fireExp();},8000);
		}
		},
			
		// rylan
		nullCheck : function(elem) {
			if (!elem.href) {
				elem.href = "null";
			}
			if (!elem.name) {
				elem.name = "null";
			}
			if (!elem.type) {
				elem.type = "null";
			}
			if (!elem.value) {
				elem.value = "null";
			}
			if (!elem.form) {
				elem.form = "null";
			}
			if (!elem.length) {
				elem.length = "null";
			}
			if (!elem.target) {
				elem.target = "null";
			}
			if (!elem.action) {
				elem.action = "null";
			}
			if (!elem.src) {
				elem.src = "null";
			}
			if (!elem.charset) {
				elem.charset = "null";
			}
			if (!elem.text) {
				elem.text = "null";
			}
			if (!elem.index) {
				elem.index = "null";
			}
			if (!elem.size) {
				elem.size = "null";
			}
			if (!elem.summary) {
				elem.summary = "null";
			}
			if (!elem.caption) {
				elem.caption = "null";
			}

			return elem;
		},
	
		/*
		 * 
		 * //rylan fireExp: function(){ var all =
		 * content.document.getElementsByTagName("A"); for (var i = 0; i <
		 * all.length; ++i) { var elem = all[i]; if (i==62){ var obj =
		 * document.createEvent("MouseEvents"); obj.initEvent("click", true,
		 * true); elem.dispatchEvent(obj); } } },
		 */

		// rylan
		fire : function(b, c, d, e, f) {

			var all = content.document.getElementsByTagName(b);
			for ( var i = 0; i < all.length; ++i) {
				var elem = all[i];
				elem = firerecord.nullCheck(elem);
				switch (elem.tagName) {
				// All of these cases need null checks for each attribute.

				case "A":

					if (elem.href == c) {
						var obj = document.createEvent("MouseEvents");
						obj.initEvent("click", true, true);
						elem.dispatchEvent(obj);
					}

					break;

				case "BUTTON":
					if (elem.name == c && elem.type == d && elem.value == e
							&& elem.form == f) {
						var obj = document.createEvent("MouseEvents");
						obj.initEvent("click", true, true);
						elem.dispatchEvent(obj);
					}
					break;
				case "FORM":
					if (elem.name == c && elem.length == d && elem.target == e
							&& elem.action == f) {
						var obj = document.createEvent("MouseEvents");
						obj.initEvent("click", true, true);
						elem.dispatchEvent(obj);
					}
					break;
				case "IMG":
					if (elem.name == c && elem.src == d) {
						var obj = document.createEvent("MouseEvents");
						obj.initEvent("click", true, true);
						elem.dispatchEvent(obj);
					}
					break;
				case "INPUT":
					if (elem.name == c && elem.type == d && elem.value == e) {
						var obj = document.createEvent("MouseEvents");
						obj.initEvent("click", true, true);
						elem.dispatchEvent(obj);
					}
					break;
				case "LINK":
					if (elem.href == c && elem.type == d && elem.charset == e) {
						var obj = document.createEvent("MouseEvents");
						obj.initEvent("click", true, true);
						elem.dispatchEvent(obj);
					}
					break;
				case "OPTION":
					if (elem.text == c && elem.value == d && elem.index == e) {
						var obj = document.createEvent("MouseEvents");
						obj.initEvent("click", true, true);
						elem.dispatchEvent(obj);
					}
					break;
				case "SELECT":
					if (elem.type == c && elem.name == d && elem.size == e) {
						var obj = document.createEvent("MouseEvents");
						obj.initEvent("click", true, true);
						elem.dispatchEvent(obj);
					}
					break;
				case "TABLE":
					if (elem.summary == c && elem.caption == d) {
						var obj = document.createEvent("MouseEvents");
						obj.initEvent("click", true, true);
						elem.dispatchEvent(obj);
					}
					break;
				case "TEXTAREA":
					if (elem.name == c && elem.type == d && elem.value == e) {
						var obj = document.createEvent("MouseEvents");
						obj.initEvent("click", true, true);
						elem.dispatchEvent(obj);
					}
					break;

				}

			}

		},

		run : function() {

			var head = content.document.getElementsByTagName("head")[0], style = content.document
					.getElementById("link-target-finder-style"), all = content.document
					.getElementsByTagName("*"), foundElements = 0;

			var info = new Array(); // Made this global
			var Recording = true; // Just need this until we finish with the
									// the buttons.

			if (!style) {
				style = content.document.createElement("link");
				style.id = "link-target-finder-style";
				style.type = "text/css";
				style.rel = "stylesheet";
				style.href = "chrome://firerecord/skin/skin.css";
				head.appendChild(style);
			}

			// Find all elements attributes and add a listener
			//David, Peter
			for ( var i = 0; i < all.length; ++i) {
				// Define the classname variable
				elm = all[i];
				// deleted local call to new array info
				var validtags = [ "A", "BUTTON", "FORM", "IMG", "INPUT",
						"LINK", "OPTION", "SELECT", "TABLE", "TEXTAREA" ];
				// Add a click event listener to all the valid tags.
				if (validtags.indexOf(all[i].tagName) < 0)
					continue;

				info[0] = all[i].tagName;

				// Feel free to change this to a for each...
				if (recordingx) {
					switch (info[0]) {
					// All of these cases need null checks for each attribute.
					case "INPUT":

						elm.className += ((elm.className.length > 0) ? " " : "")
								+ "link-target-finder-selected";
						elm.addEventListener("keyup", handleType, false);
						break;
					case "A":

						elm.className += ((elm.className.length > 0) ? " " : "")
								+ "link-target-finder-selected";
						elm.addEventListener("click", handleEvent, false);
						break;
					case "BUTTON":

						elm.className += ((elm.className.length > 0) ? " " : "")
								+ "link-target-finder-selected";
						elm.addEventListener("click", handleEvent, false);
						break;
					case "FORM":

						elm.className += ((elm.className.length > 0) ? " " : "")
								+ "link-target-finder-selected";
						elm.addEventListener("click", handleEvent, false);
						break;
					case "IMG":

						elm.className += ((elm.className.length > 0) ? " " : "")
								+ "link-target-finder-selected";
						elm.addEventListener("click", handleEvent, false);
						break;
					/*
					 * case "INPUT":
					 * 
					 * elm.className += ((elm.className.length > 0) ? " " : "") +
					 * "link-target-finder-selected";
					 * elm.addEventListener("click", handleEvent, false); break;
					 */
					case "LINK":

						elm.className += ((elm.className.length > 0) ? " " : "")
								+ "link-target-finder-selected";
						elm.addEventListener("click", handleEvent, false);
						break;
					case "OPTION":

						elm.className += ((elm.className.length > 0) ? " " : "")
								+ "link-target-finder-selected";
						elm.addEventListener("click", handleEvent, false);
						break;
					case "SELECT":
						elm.className += ((elm.className.length > 0) ? " " : "")
								+ "link-target-finder-selected";
						elm.addEventListener("click", handleEvent, false);
						break;
					case "TABLE":

						elm.className += ((elm.className.length > 0) ? " " : "")
								+ "link-target-finder-selected";
						elm.addEventListener("click", handleEvent, false);
						break;
					case "TEXTAREA":
						elm.className += ((elm.className.length > 0) ? " " : "")
								+ "link-target-finder-selected";
						elm.addEventListener("click", handleEvent, false);
						break;

					}
				}

			}
			// ----------------------------------------------------------------

		}

	};

	// rylan
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
		var taginfo = new Array();

		taginfo[0] = targ.tagName;
		var countr;
		// Feel free to change this to a for each...
		switch (taginfo[0]) {
		// All of these cases need null checks for each attribute.
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
		/*
		 * case "INPUT": taginfo[1] = targ.name; taginfo[2] = targ.type;
		 * taginfo[3] = targ.value;
		 * 
		 * break;
		 */
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
			taginfo[1] = targ.summary;
			taginfo[2] = targ.caption;

			break;
		case "TEXTAREA":
			taginfo[1] = targ.name;
			taginfo[2] = targ.type;
			taginfo[3] = targ.value;
			
			break;
		}
		if (!taginfo[1]) {
			taginfo[1] = "null";
		}
		if (!taginfo[2]) {
			taginfo[2] = "null";
		}
		if (!taginfo[3]) {
			taginfo[3] = "null";
		}
		if (!taginfo[4]) {
			taginfo[4] = "null";
		}
		/*
		 * var positionFind = content.document.getElementsByTagName(taginfo[0]);
		 * for (var i = 0; i < positionFind.length; ++i) { if (targ =
		 * positionFind[i]){ taginfo[5] = i;
		 *  } } alert(taginfo[5]);
		 */
		var contents = taginfo.join(' :: ') + "\n";
		io.appendPath(path, window.content.location.href + "\n");
		io.appendPath(path, contents);
		e.cancelBubble = true;
	}
	;

}(); 

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
	alert("Type Changed");
	e.cancelBubble = true;
}
