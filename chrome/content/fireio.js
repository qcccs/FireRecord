/*
@author David Westgate, Rylan Doherty
@fileOverview The Input/Output functions of firerecord. Setting Path, creating files, and reading files
*/
var io = {
	/*
	@description sets the paths of the script  
	@return path of script selected
	@see <a href="https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIFilePicker"> Mozilla Developer Network Example </a>
	*/
    openPath: function () {
        const
        nsIFilePicker = Components.interfaces.nsIFilePicker;
        var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
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
	/*
	@description appends script by contents of event click
	@see <a href="https://developer.mozilla.org/en-US/docs/Code_snippets/File_I_O"> Mozilla Developer Network Example </a>
	*/
    appendPath: function (path, contents) {
        
        var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
        file.initWithPath(path);
        // alert("append file nullcheck: "+file1.toString());
        var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
        // use 0x02 | 0x10 to open file for appending.
        foStream.init(file, 0x02 | 0x10, 438, 0);
        var converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"].createInstance(Components.interfaces.nsIConverterOutputStream);
        converter.init(foStream, "UTF-8", 0, 0);
        converter.writeString(contents);
        converter.close();
    },
	/*
	@description sets path to address of a new file
	@return path of new file
	@see <a href="https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsIFilePicker"> Mozilla Developer Network Example </a>
	*/
    newPath: function (path) {
        const
        nsIFilePicker = Components.interfaces.nsIFilePicker;
        var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
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
	/*
	@description creates new file from path of newPath
	@see <a href="https://developer.mozilla.org/en-US/docs/Code_snippets/File_I_O"> Mozilla Developer Network Example </a>
	*/
    createFile: function (path) {
        
        var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
        file.initWithPath(path);
        var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
        // use 0x02 | 0x10 to open file for appending.
        foStream.init(file, 0x02 | 0x08 | 0x20, 438, 0);
        var converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"].createInstance(Components.interfaces.nsIConverterOutputStream);
        converter.init(foStream, "UTF-8", 0, 0);
        converter.close(); // this closes foStream
    },
	/*
	@description gets an entire script into an array, seperated by lines
	@return array of lines
	@see <a href="https://developer.mozilla.org/en-US/docs/Code_snippets/File_I_O"> Mozilla Developer Network Example </a>
	*/
    getScript: function (path) {
        // open an input stream from file
        var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
        file.initWithPath(path);
        var istream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
        istream.init(file, 0x01, 0444, 0);
        istream.QueryInterface(Components.interfaces.nsILineInputStream);
        // read lines into array
        var line = {}, lines = [],
            hasmore;
        do {
            hasmore = istream.readLine(line);
            lines.push(line.value);
        } while (hasmore);
        istream.close();
        return lines;
    }
}
