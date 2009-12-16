/**
 * @fileoverview Contains the Module handling classes
 * @author ChrisWinberry
 * @version 0.8.0
 */

/*
function LogDefinedPath (id) {
	try {
		var path = Components.classes["@mozilla.org/file/directory_service;1"]
			.getService(Components.interfaces.nsIProperties)
			.get(id, Components.interfaces.nsIFile)
			.path;
		Log(id + ": " + path);
	} catch (ex) { Log("ERROR: " + ex); }
}
//*/

/*
LogDefinedPath("Home");
LogDefinedPath("TmpD");
LogDefinedPath("CurWorkD");
LogDefinedPath("Desk");
LogDefinedPath("CurProcD");
LogDefinedPath("XCurProcD");
LogDefinedPath("ComsD");
LogDefinedPath("ComsDL");
LogDefinedPath("ComRegF");
LogDefinedPath("XpcomLib");
LogDefinedPath("GreD");
LogDefinedPath("GreComsD");
LogDefinedPath("SysD");
LogDefinedPath("DrvD");
//*/

/**
 * Creates a new Module instance
 * @constructor
 * @class A module contains information (code base and handlers) regarding how to handle HTTP resource requests for a given resource path  
 * @param {String} id The unique identifier for the module (typically used to locate the pref branch that holds module settings for an extension)
 * @requires App
 * @requires VirtualPath
 */
function Module (id) {
	/** @ignore */
	this._Id = id;

	var tmpRoot = Components.classes["@mozilla.org/extensions/manager;1"]
		.createInstance(Components.interfaces.nsIExtensionManager)
		.getInstallLocation(this._Id);
	/** @ignore */
	this._root = ((tmpRoot != null) ?
		tmpRoot.getItemLocation(this._Id)
		:
		Components.classes["@mozilla.org/file/directory_service;1"]
			.getService(Components.interfaces.nsIProperties)
			.get("CurProcD", Components.interfaces.nsIFile)
		).path;

	/** @ignore */
	this._ContentPath = "/chrome/content/htdocs";
	/** @ignore */
	this._HandlerPath = "/chrome/content/handlers";
	/** @ignore */
	this._VirtualPath = "/";
	/** @ignore */
	this._Name = "Root Module";
	/** @ignore */
	this._Description = "This is root module and default handler";
	/** @ignore */
	this._InitPage = "";
	/** @ignore */
	this._HomePage = "";
	/** @ignore */
	this._Handler = "";

	/** @ignore */
	this._HandlerVirtualPath = VirtualPath.Generate(this._root + this._HandlerPath);
	/** @ignore */
	this._ContentVirtualPath = VirtualPath.Generate(this._root + this._ContentPath);
	/** @ignore */
	this._App = new App(this._ContentVirtualPath);
}

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
Module.prototype.Log = function Module__Log (data) { if (typeof Log == "function") { Log(data); } };

/**
 * Gets the unique identifier for the module
 * @type String
 */
Module.prototype.GetId = function Module__GetId () { return(this._Id); }
/**
 * The unique identifier for the module
 * @type String
 */
Module.prototype.__defineGetter__("Id", Module.prototype.GetId);

/**
 * Gets the folder path to where the servable content exists
 * @type String
 */
Module.prototype.GetContentPath = function Module__GetContentPath () { return(this._ContentPath); }
/**
 * The path folder where the servable content exists
 * @type String
 */
Module.prototype.__defineGetter__("ContentPath", Module.prototype.GetContentPath);

/**
 * Gets the file path to where the request handler is located
 * @type String
 */
Module.prototype.GetHandlerPath = function Module__GetHandlerPath () { return(this._HandlerPath); }
/**
 * The file path where the request handler is located
 * @type String
 */
Module.prototype.__defineGetter__("HandlerPath", Module.prototype.GetHandlerPath);

/**
 * Gets the App instance assigned to the module
 * @type App
 */
Module.prototype.GetApp = function Module__GetApp () { return(this._App); }
/**
 * The App instance assigned to the module
 * @type App
 */
Module.prototype.__defineGetter__("App", Module.prototype.GetApp);

/**
 * Gets a VirtualPath instance that uses the module's {@link #ContentPath} as its base
 * @type VirtualPath
 */
Module.prototype.GetHandlerVirtualPath = function Module__GetHandlerVirtualPath () { return(this._HandlerVirtualPath); }
/**
 * A VirtualPath instance that uses the module's {@link #ContentPath} as its base
 * @type VirtualPath
 */
Module.prototype.__defineGetter__("HandlerVirtualPath", Module.prototype.GetHandlerVirtualPath);

//TODO: use module manager to map multiple virtual paths into a single structure
/**
 * To Do
 * @constructor
 * @class ModuleManager
 * @requires Module
 */
function ModuleManager () {
	/** @ignore */
	this._modules = [];
}

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
ModuleManager.prototype.Log = function ModuleManager__Log (data) { if (typeof Log == "function") { Log(data); } };
