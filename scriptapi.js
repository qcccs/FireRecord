function script_fire_event(element, type) {
    //Todo - https://developer.mozilla.org/en-US/docs/DOM/document.createEvent
    if (element.fireEvent) {
        element.fireEvent('on' + type);
    } else {
        var obj = document.createEvent('Event');
        obj.initEvent(type, true, true);
        element.dispatchEvent(obj);
    }
}
function script_find_element(id) {
    //Todo - Add parameters for rest of stuff
    return document.getElementById(id);
}