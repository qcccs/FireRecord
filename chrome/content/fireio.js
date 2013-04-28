
var io = {
openPath : function(){
		alert("test2");
	
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
			  var path = fp.file.path;
			  // work with returned nsILocalFile...
			  
			}
			return path;
		},
appendPath: function (path, contents) 
{
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
},

newPath: function() {	
	const nsIFilePicker = Components.interfaces.nsIFilePicker;

var fp = Components.classes["@mozilla.org/filepicker;1"]
	           .createInstance(nsIFilePicker);
fp.init(window, "Dialog Title", nsIFilePicker.modeSave);
fp.appendFilters(nsIFilePicker.filterAll | nsIFilePicker.filterText);

var rv = fp.show();
if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
  var file = fp.file;
  // Get the path as string. Note that you usually won't 
  // need to work with the string paths.
 var path = fp.file.path;
  // work with returned nsILocalFile...
  
}
return path;
},
}
