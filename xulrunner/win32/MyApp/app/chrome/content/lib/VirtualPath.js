/**
 * @fileoverview Contains the VirtualPath-related classes
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new VirtualPath instance
 * @constructor
 * @class Provides a way to map absolute and relative "virtual" paths to a real base path 
 * @param {String} path The path to act as the base of the virtual path. This path will be relative to an absolute base path, which for this class is the system root
 */
function VirtualPath (path) {
	/** @ignore */
	this._path = this.GetVirtualRoot();
	if (path != null && path != "")
		this.InitPath(path);
	/** @ignore */
	this._BasePath = this.GetSystemRoot();
}

/**
 * Generates a {@link VirtualPath} subclass that uses the basePath parameter as the absolute base path
 * @param {String} basePath The path to use as the absolute base path when creating instances of the subclass
 * @type VirtualPath
 */
VirtualPath.Generate = function VirtualPath__Generate (basePath) {
	function ProxyObject () { }
	ProxyObject.prototype = VirtualPath.prototype;

	/** @ignore */
	function VirtualPathProgeny (path) {
		VirtualPath.call(this, path);
		this._BasePath = this.SystemNormalize(basePath);
	}

	var proxy = new ProxyObject();
	proxy.constructor = VirtualPathProgeny;

	/** @ignore */
	VirtualPathProgeny.baseConstructor = VirtualPath;
	/** @ignore */
	VirtualPathProgeny.prototype = proxy;
	/** @ignore */
	VirtualPathProgeny.prototype._base = VirtualPath;

	return(VirtualPathProgeny);
}

/** @ignore */
VirtualPath._VirtualSeparator = "/";

/** @ignore */
VirtualPath._VirtualRoot = "/";

/** @ignore */
VirtualPath._SystemSeparator = Components.classes["@mozilla.org/file/directory_service;1"]
	.getService(Components.interfaces.nsIProperties)
	.get('DefProfRt', Components.interfaces.nsILocalFile)
	.path.match('/') ? '/' : '\\';

/** @ignore */
VirtualPath._SystemRoot = Components.classes["@mozilla.org/file/directory_service;1"]
	.getService(Components.interfaces.nsIProperties)
	.get('DefProfRt', Components.interfaces.nsILocalFile)
	.path.match(/^([\w]\:\\|\/|\\)/i)[0]; //FIXME: find a better path type to use due to "./profile" failing

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
VirtualPath.prototype.Log = function VirtualPath__Log (data) { if (typeof Log == "function") { Log(data); } };

VirtualPath.prototype.GetBasePath = function VirtualPath__GetBasePath () { return(this._BasePath); }
VirtualPath.prototype.__defineGetter__("BasePath", VirtualPath.prototype.GetBasePath);

VirtualPath.prototype.GetVirtualSeparator = function VirtualPath__GetVirtualSeparator () { return(VirtualPath._VirtualSeparator); }
VirtualPath.prototype.SetVirtualSeparator = function VirtualPath__SetVirtualSeparator (value) { VirtualPath._VirtualSeparator = value; }
VirtualPath.prototype.__defineGetter__("VirtualSeparator", VirtualPath.prototype.GetVirtualSeparator);
VirtualPath.prototype.__defineSetter__("VirtualSeparator", VirtualPath.prototype.SetVirtualSeparator);

VirtualPath.prototype.GetVirtualRoot = function VirtualPath__GetVirtualRoot () { return(VirtualPath._VirtualRoot); }
VirtualPath.prototype.SetVirtualRoot = function VirtualPath__SetVirtualRoot (value) { VirtualPath._VirtualRoot = value; }
VirtualPath.prototype.__defineGetter__("VirtualRoot", VirtualPath.prototype.GetVirtualRoot);
VirtualPath.prototype.__defineSetter__("VirtualRoot", VirtualPath.prototype.SetVirtualRoot);

VirtualPath.prototype.GetSystemSeparator = function VirtualPath__GetSystemSeparator () { return(VirtualPath._SystemSeparator); }
VirtualPath.prototype.SetSystemSeparator = function VirtualPath__SetSystemSeparator (value) { VirtualPath._SystemSeparator = value; }
VirtualPath.prototype.__defineGetter__("SystemSeparator", VirtualPath.prototype.GetSystemSeparator);
VirtualPath.prototype.__defineSetter__("SystemSeparator", VirtualPath.prototype.SetSystemSeparator);

VirtualPath.prototype.GetSystemRoot = function VirtualPath__GetSystemRoot () { return(VirtualPath._SystemRoot); }
VirtualPath.prototype.SetSystemRoot = function VirtualPath__SetSystemRoot (value) { VirtualPath._SystemRoot = value; }
VirtualPath.prototype.__defineGetter__("SystemRoot", VirtualPath.prototype.GetSystemRoot);
VirtualPath.prototype.__defineSetter__("SystemRoot", VirtualPath.prototype.SetSystemRoot);

VirtualPath.prototype.GetVirtualPath = function VirtualPath__GetVirtualPath () { return(this._path); }
VirtualPath.prototype.__defineGetter__("VirtualPath", VirtualPath.prototype.GetVirtualPath);

VirtualPath.prototype.GetExists = function VirtualPath__GetExists () {
	return(this.GetLocalFile().exists());
}
VirtualPath.prototype.__defineGetter__("Exists", VirtualPath.prototype.GetExists);

VirtualPath.prototype.GetIsFile = function VirtualPath__GetIsFile () {
	try {
		return (this.GetLocalFile().isFile());
	} catch (ex) { return(false); }
}
VirtualPath.prototype.__defineGetter__("IsFile", VirtualPath.prototype.GetIsFile);

VirtualPath.prototype.GetIsDir = function VirtualPath__GetIsDir () {
	try {
		return (this.GetLocalFile().isDirectory());
	} catch (ex) { return(false); }
}
VirtualPath.prototype.__defineGetter__("IsDir", VirtualPath.prototype.GetIsDir);

VirtualPath.prototype.GetSystemPath = function VirtualPath__GetSystemPath () {
	//return(this.GetBasePath() + this.GetSystemSeparator() + this.SystemNormalize(this._path));
	return(this.GetBasePath() + this.SystemNormalize(this._path));
}
VirtualPath.prototype.__defineGetter__("SystemPath", VirtualPath.prototype.GetSystemPath);

VirtualPath.prototype.GetParent = function VirtualPath__GetParent () {
	var parent = new (this.constructor)();
	if (this._path != this.GetVirtualSeparator()) {
		var parts = this.VirtualNormalize(this._path).split(this.GetVirtualSeparator());
		parts.pop();
		parent.InitPath(parts.join(this.GetVirtualSeparator()));
	}
	return (parent);
}
VirtualPath.prototype.__defineGetter__("Parent", VirtualPath.prototype.GetParent);

VirtualPath.prototype.GetLocalFile = function VirtualPath__GetLocalFile () {
	var file = Components.classes["@mozilla.org/file/local;1"]
		.createInstance(Components.interfaces.nsILocalFile);

	file.initWithPath(this.GetSystemPath());

	return(file);
}
VirtualPath.prototype.__defineGetter__("LocalFile", VirtualPath.prototype.GetLocalFile);

VirtualPath.prototype.InitPath = function VirtualPath__InitPath (path) {
	if (path == null || path.length < 1)
		path = this.GetVirtualSeparator();

	//this._path = VirtualPath._VirtualSeparator + this.VirtualNormalize(path);
	this._path = this.GetVirtualSeparator() + this.VirtualNormalize(path).replace(/^(\/|\\)+/g, "");
}

VirtualPath.prototype.Clone = function VirtualPath__Clone () {
	var clone = new VirtualPath();
	clone.InitPath(this._path);
	return (clone);
}

VirtualPath.prototype.Normalize = function VirtualPath__Normalize (path, separator) {
	//return(path.replace(/(^(\/|\\)+|(\/|\\)+$)/g, "").replace(/(\/|\\)+/g, separator));
	return(path.replace(/(\/|\\)+/g, separator));
}

VirtualPath.prototype.VirtualNormalize = function VirtualPath__VirtualNormalize (path) {
	return(this.Normalize(path, this.GetVirtualSeparator()));
}

VirtualPath.prototype.SystemNormalize = function VirtualPath__SystemNormalize (path) {
	return(this.Normalize(path, this.GetSystemSeparator()));
}

VirtualPath.prototype.AppendPath = function VirtualPath__AppendPath (path) {
	var parts = this.VirtualNormalize(this._path).split(this.GetVirtualSeparator());
	var newParts = this.VirtualNormalize(path).split(this.GetVirtualSeparator());

	if (newParts.length > 0 && newParts[0] == "") {
		parts = newParts;
	}
	else {
		for (var i = 0; i < newParts.length; i++) {
			if (newParts[i] == "..") {
				if (parts.length > 0) {
					parts.pop();
				}
			}
			else if (newParts[i] != "." && newParts[i] != "") {
				parts.push(newParts[i]);
			}
		}
	}
	this.InitPath(parts.join(this.GetVirtualSeparator()));
}

VirtualPath.prototype.toString = function VirtualPath__toString () {
	return(this._path);
}
