/**
 * @fileoverview Contains the App class, which provides utility functions and app/session state
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new App
 * @constructor
 * @class Provides misc. utility functions and access to application/session state
 * @param {VirtualPath} virtualPath VirtualPath that represents the root folder for the application's files
 * @requires VirtualPath
 * @requires DbConnection
 */
function App (virtualPath) {
	/** @ignore */
	this._VirtualPath = virtualPath;
	/** @ignore */
	//https://developer.mozilla.org/En/Code_snippets/Miscellaneous
	this._OSCPU = Components.classes["@mozilla.org/network/protocol;1?name=http"]
		.getService(Components.interfaces.nsIHttpProtocolHandler).oscpu;
}

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
App.prototype.Log = function App__Log (data) { if (typeof Log == "function") { Log(data); } };

/** @ignore */
App._rng = Components.classes['@mozilla.org/security/random-generator;1']
	.getService(Components.interfaces.nsIRandomGenerator);

/**
 * Gets the virtualpath root for this app
 * @type VirtualPath
 */
App.prototype.GetVirtualPath = function App__GetVirtualPath () { return(App._VirtualPath); }
/**
 * The virtualpath root for this app
 * @type VirtualPath
 */
App.prototype.__defineGetter__("VirtualPath", App.prototype.GetVirtualPath);

/**
 * Get the full mapped path to a resource based on the current app's root
 * @param {Request} request Request object (used for calculating relative paths)
 * @param {String} path the absolute or relative path to map
 * @type VirtualPath
 */
App.prototype.MapPath = function App__MapPath (request, path) {
	var vp = new this._VirtualPath(request.GetPath());
	if (vp.IsFile)
		vp = vp.Parent;
	vp.AppendPath(path);
	return(vp);
}

/**
 * Gets the OSCPU identifier the app is currently running under
 * @type String
 */
App.prototype.GetOSCPU = function App__GetOSCPU () { return(this._OSCPU); }
/**
 * The OSCPU identifier the app is currently running under
 * @type String
 */
App.prototype.__defineGetter__("OSCPU", App.prototype.GetOSCPU);

/**
 * Generates a random number of "length" bytes long
 * @param String
 */
App.prototype.Rng = function App__Rng (length) {
	//https://developer.mozilla.org/En/Code_snippets/Miscellaneous
	var buffer = '';
	return(App._rng.generateRandomBytes(length, buffer));
}

/**
 * Determines the appropriate mime type for a given path and file extension
 * @param {String} path The path to inspect
 * @type String
 */
App.prototype.DetermineContentType = function App__DetermineContentType (path) {
	if (path == null || path.toString().indexOf('.') < 0)
		return("");

	switch (path.split(".").pop().toLowerCase()) {
		case "htm" :
		case "html" :
		case "jss" :
			return("text/html");
			break;
	
		case "css" :
			return("text/css");
			break;
	
		case "js" :
			return("application/x-javascript");
			break;
	
		case "jpg" :
		case "jpe" :
		case "jpeg" :
			return("image/jpeg");
			break;
	
		case "gif" :
			return("image/gif");
			break;
	
		case "png" :
			return("image/png");
			break;
	
		case "ico" :
			return("image/x-icon");
			break;
	
		case "gz" :
		case "gzip" :
			return("application/x-gzip");
			break;
	
		case "zip" :
			return("application/zip");
			break;
	
		case "log" :
		case "txt" :
			return("text/plain");
			break;
	
		case "pdf" :
			return("application/pdf");
			break;
	
		case "swf" :
			return("application/x-shockwave-flash");
			break;
	
		case "xml" :
		case "xsl" :
			return("text/xml");
			break;
			
		default :
			return("application/octet-stream");
			break;

	}
}

/**
 * Creates the appropriate Content-type header in a Response instance based on the file requested in a Request instance
 * @param {Request} Request Request instance to map from
 * @param {Response} Response Response instance to write the Content-type header to
 */
App.prototype.MapContentType = function App__MapContentType (Request, Response) {
	Response.ContentType = this.DetermineContentType(Request.CurrentPath);
}

/**
 * Opens a database connection
 * @param {String} name Name of the database to open (connection string)
 * @type DbConnection
 */
App.prototype.OpenDatabase = function App__OpenDatabase (name) {
	return(new DbConnection(name));
}

/**
 * Lists all currently created databases. Names in this list can be used by {@link #OpenDatabase} to open the database
 * @type String[] 
 */
App.prototype.ListDatabases = function App__ListDatabases () {
	return(DbConnection.GetSchemas());
}

/**
 * Parses a JSON string and deserializes it to an Object instance
 * @param {String} json JSON string data to deserialize
 * @type Object
 */
App.prototype.JSONToObject = function App__JSONToObject (json) {
	return(Components.classes["@mozilla.org/dom/json;1"]
		.createInstance(Components.interfaces.nsIJSON)
		.decode(json));
}

/**
 * Serializes an Object instance to a JSON formatted String
 * @param {Object} obj Object instance to serialize
 * @type String
 */
App.prototype.ObjectToJSON = function App__ObjectToJSON (obj) {
	return(Components.classes["@mozilla.org/dom/json;1"]
		.createInstance(Components.interfaces.nsIJSON)
		.encode(obj));
}

/**
 * Clones an Exception instance
 * @param {Object} ex Exception to clone
 * @type Object
 */
App.prototype.CopyException = function App__CopyException (ex) {
	return(Utility.CopyException(ex));
}

/**
 * Generates a GUID in the format {xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx}
 * @type String
 */
App.prototype.GenUUID = function App__GenUUID () {
	return(Components.classes["@mozilla.org/uuid-generator;1"]
		.getService(Components.interfaces.nsIUUIDGenerator)
		.generateUUID()
		.toString()
		);
}

/** @ignore */
App.prototype.OpenNetFile = function App__OpenNetFile (url, depth) {
	if (depth == null)
		depth = 5;

	var ioService = Components.classes["@mozilla.org/network/io-service;1"].
		getService(Components.interfaces.nsIIOService);
	var oUrl = ioService.newURI(url, null, null);
	var channel = ioService.newChannelFromURI(oUrl);

	// TODO: check for other supported channel types
	if (!(channel instanceof Components.interfaces.nsIHttpChannel))
		throw("Unable to open file due to unsupported protocol/channel");

	var channelHttp = channel.QueryInterface(Components.interfaces.nsIHttpChannel);
	//channelHttp.referrer = oUrl;
	var inStream = Components.classes["@mozilla.org/binaryinputstream;1"].
		createInstance(Components.interfaces.nsIBinaryInputStream);
	inStream.setInputStream(channelHttp.open());
	if (!channelHttp.requestSucceeded) {
		if (channelHttp.responseStatus == "302" || channelHttp.responseStatus == "301")
			if (depth > 1)
				return(this.OpenNetFile(channelHttp.getResponseHeader("location"), depth - 1));
			else
				throw("Unable to load file due to redirection limit");
		else
			throw("Unable to load file due to failed request");
	}
	return({
		"channel" : channelHttp,
		"stream" : inStream
		});
}

/**
 * Reads the contents of a remote resource
 * @param {String} url URL of the remote resource to read
 * @type String
 */
App.prototype.ReadNetFile = function App__ReadNetFile (url) {
	var netFile;
	var sContent = "";

	try {
		// TODO: don't assume http channel
		netFile = this.OpenNetFile(url);
		if (!netFile.channel.requestSucceeded)
			throw("Unable to load file due to failed request");
		while (netFile.stream.available() || sContent.length < netFile.channel.contentLength) {
			sContent += netFile.stream.readBytes(netFile.stream.available());
		}
		netFile.stream.close();
		netFile.stream = null;
	} catch (ex) {
		if (netFile.stream != null) {
			netFile.stream.close();
			netFile.stream = null;
		}
		throw("Unable to load file");
	}

	return(sContent);
}

