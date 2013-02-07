/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
FBL.ns(function() { with (FBL) {
// Panel
var panelName = "firerecord";

/**
 * @panel This panel integrates with Firebug Inspector API and provides own logic
 * and display of custom information for links. This code serves as an example of
 * how to properly use and implement Inspector.
 */
function FireRecordPanel() {}
FireRecordPanel.prototype = extend(Firebug.Panel,
/** @lends LinkInspectorPanel */
{
    name: panelName,
    title: "Trial by Fire",
    inspectable: true,
    inspectHighlightColor: "red",

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function()
    {
        Firebug.Panel.initialize.apply(this, arguments);

        Firebug.Inspector.addListener(this);
    },

    destroy: function(state)
    {
        Firebug.Panel.destroy.apply(this, arguments);

        Firebug.Inspector.removeListener(this);
    },

    show: function(state)
    {
        Firebug.Panel.show.apply(this, arguments);

        FireRecordPlate.defaultContent.replace({}, this.panelNode);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Inspector API implementation

    startInspecting: function()
    {
        if (FBTrace.DBG_FIRERECORD)
            FBTrace.sysout("fire_record; startInspecting()");
    },

    inspectNode: function(node)
    {
        if (FBTrace.DBG_FIRERECORD)
            FBTrace.sysout("fire_record; inspectNode(node: " + node.tagName + ")");

        FireRecordPlate.tName.replace({object: node}, this.panelNode);
    },

    stopInspecting: function(node, canceled)
    {
        if (FBTrace.DBG_FIRERECORD)
            FBTrace.sysout("fire_record; stopInspecting(node: " + node.tagName +
                ", canceled: " + canceled + ")");

        if (canceled)
            return;

        if (node.href.indexOf("http") != 0)
            return;

        FireRecordPlate.linkPreview.replace({object: node}, this.panelNode);
    },

    supportsObject: function(object, type)
    {
        if (object instanceof Element)
        {
            if (object.tagName.toLowerCase() == "a"){
                return 1;
	    }
            if (object.tagName.toLowerCase() == "button"){
                return 1;
            }
            if (object.tagName.toLowerCase() == "img"){
                return 1;
            }
            if (object.tagName.toLowerCase() == "input"){
                return 1;
            }
        }

        return 0;
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Inspector Listener

    onStartInspecting: function(context)
    {
        if (FBTrace.DBG_FIRERECORD)
            FBTrace.sysout("fire_record; Listener.onStartInspecting(context: " +
                context.getTitle() + ")");
    },

    onInspectNode: function(context, node)
    {
        if (FBTrace.DBG_FIRERECORD)
            FBTrace.sysout("fire_record; Listener.onInspectNode(context: " +
                context.getTitle() + ", node: " + node.tagName + ")");
    },

    onStopInspecting: function(context, node, canceled)
    {
        if (FBTrace.DBG_FIRERECORD)
            FBTrace.sysout("fire_record; Listener.onStopInspecting(context: " +
                context.getTitle() + ", node: " + node.tagName + ", canceled: " +
                canceled + ")");
    }
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

var FireRecordPlate = domplate(
{
    tName:
        DIV({"class": "tName"}, "$object.id" ),

    linkPreview:
        IFRAME({"class": "linkPreview", "src": "$object.href"}),

    defaultContent:
        DIV({"class": "defaultContent"},
            "Use Trial by Fire to record DOM events for later playback."
        )
});

// ********************************************************************************************* //
// Module & Customizing Tracing

/**
 * @module The module object isn't really neccessary for the Inspector API. It serves
 * only to support Firebug tracing console, which is useful when debugging inspector
 * features.
 */
Firebug.FireRecordModule = extend(Firebug.Module,
/** @lends Firebug.FireRecordModule */
{
    initialize: function()
    {
        Firebug.Module.initialize.apply(this, arguments);

        if (Firebug.TraceModule)
            Firebug.TraceModule.addListener(this);
    },

    shutdown: function()
    {
        Firebug.Module.shutdown.apply(this, arguments);

        if (Firebug.TraceModule)
            Firebug.TraceModule.removeListener(this);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Trace Listener

    onLoadConsole: function(win, rootNode)
    {
        appendStylesheet(rootNode.ownerDocument, "chrome://firerecord/skin/inspector.css");
    },

    onDump: function(message)
    {
        var index = message.text.indexOf("fire_record;");
        if (index == 0)
        {
            message.text = message.text.substr("fire_record;".length);
            message.text = trim(message.text);
            message.type = "DBG_FIRERECORD";
        }
    }
});


// Registration

Firebug.registerPanel(FireRecordPanel);
Firebug.registerModule(Firebug.FireRecordModule);
Firebug.registerStylesheet("chrome://firerecord/skin/inspector.css");


}});