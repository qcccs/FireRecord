var spans = document.getElementsByTagName("*");
if (window.attachEvent) {window.attachEvent('onload', your_function);}
else if (window.addEventListener) {window.addEventListener('load', your_function, false);}
else {document.addEventListener('load', your_function, false);} 
for(i=0;i<spans.length;i++)
    spans[i].addEventListener("click", this.doSomething);
function your_function()
{
alert("Done Loading!");
}
function doSomething(e)
{
var targ;
if (!e)
  {
  var e=window.event;
  }
if (e.target)
  {
  targ=e.target;
  }
else if (e.srcElement)
  {
  targ=e.srcElement;
  }
var tname;
var idname;

idname = targ.id;
tname = targ.tagName;
alert("You clicked on a " + tname + " element. Named "+ idname +".");
}
