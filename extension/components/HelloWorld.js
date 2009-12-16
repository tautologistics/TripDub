Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

function HelloWorld() { }

HelloWorld.prototype = {
  classDescription: "My Hello World Javascript XPCOM Component",
  classID:          Components.ID("B7E0D3EF-6D53-4301-AAEB-2D5BAC90C3F9"),
  contractID:       "@dietrich.ganx4.com/helloworld;1",
  QueryInterface: XPCOMUtils.generateQI([Components.interfaces.nsIHelloWorld]),
  hello: function() { return "Hello World!"; }
};
var components = [HelloWorld];
function NSGetModule(compMgr, fileSpec) {
  return XPCOMUtils.generateModule(components);
}
