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
App.prototype.GetVirtualPath = function App__GetVirtualPath () { return(this._VirtualPath); }
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
			return("application/xml");
			break;

		case ".3gp" :
				return("video/3gpp");
				break;

		case ".a" :
				return("application/octet-stream");
				break;

		case ".ai" :
				return("application/postscript");
				break;

		case ".aif" :
				return("audio/x-aiff");
				break;

		case ".aiff" :
				return("audio/x-aiff");
				break;

		case ".asc" :
				return("application/pgp-signature");
				break;

		case ".asf" :
				return("video/x-ms-asf");
				break;

		case ".asm" :
				return("text/x-asm");
				break;

		case ".asx" :
				return("video/x-ms-asf");
				break;

		case ".atom" :
				return("application/atom+xml");
				break;

		case ".au" :
				return("audio/basic");
				break;

		case ".avi" :
				return("video/x-msvideo");
				break;

		case ".bat" :
				return("application/x-msdownload");
				break;

		case ".bin" :
				return("application/octet-stream");
				break;

		case ".bmp" :
				return("image/bmp");
				break;

		case ".bz2" :
				return("application/x-bzip2");
				break;

		case ".c" :
				return("text/x-c");
				break;

		case ".cab" :
				return("application/vnd.ms-cab-compressed");
				break;

		case ".cc" :
				return("text/x-c");
				break;

		case ".chm" :
				return("application/vnd.ms-htmlhelp");
				break;

		case ".class" :
				return("application/octet-stream");
				break;

		case ".com" :
				return("application/x-msdownload");
				break;

		case ".conf" :
				return("text/plain");
				break;

		case ".cpp" :
				return("text/x-c");
				break;

		case ".crt" :
				return("application/x-x509-ca-cert");
				break;

		case ".csv" :
				return("text/csv");
				break;

		case ".cxx" :
				return("text/x-c");
				break;

		case ".deb" :
				return("application/x-debian-package");
				break;

		case ".der" :
				return("application/x-x509-ca-cert");
				break;

		case ".diff" :
				return("text/x-diff");
				break;

		case ".djv" :
				return("image/vnd.djvu");
				break;

		case ".djvu" :
				return("image/vnd.djvu");
				break;

		case ".dll" :
				return("application/x-msdownload");
				break;

		case ".dmg" :
				return("application/octet-stream");
				break;

		case ".doc" :
				return("application/msword");
				break;

		case ".dot" :
				return("application/msword");
				break;

		case ".dtd" :
				return("application/xml-dtd");
				break;

		case ".dvi" :
				return("application/x-dvi");
				break;

		case ".ear" :
				return("application/java-archive");
				break;

		case ".eml" :
				return("message/rfc822");
				break;

		case ".eps" :
				return("application/postscript");
				break;

		case ".exe" :
				return("application/x-msdownload");
				break;

		case ".f" :
				return("text/x-fortran");
				break;

		case ".f77" :
				return("text/x-fortran");
				break;

		case ".f90" :
				return("text/x-fortran");
				break;

		case ".flv" :
				return("video/x-flv");
				break;

		case ".for" :
				return("text/x-fortran");
				break;

		case ".gem" :
				return("application/octet-stream");
				break;

		case ".gemspec" :
				return("text/x-script.ruby");
				break;

		case ".h" :
				return("text/x-c");
				break;

		case ".hh" :
				return("text/x-c");
				break;

		case ".ics" :
				return("text/calendar");
				break;

		case ".ifb" :
				return("text/calendar");
				break;

		case ".iso" :
				return("application/octet-stream");
				break;

		case ".jar" :
				return("application/java-archive");
				break;

		case ".java" :
				return("text/x-java-source");
				break;

		case ".jnlp" :
				return("application/x-java-jnlp-file");
				break;

		case ".json" :
				return("application/json");
				break;

		case ".m3u" :
				return("audio/x-mpegurl");
				break;

		case ".m4v" :
				return("video/mp4");
				break;

		case ".man" :
				return("text/troff");
				break;

		case ".mathml" :
				return("application/mathml+xml");
				break;

		case ".mbox" :
				return("application/mbox");
				break;

		case ".mdoc" :
				return("text/troff");
				break;

		case ".me" :
				return("text/troff");
				break;

		case ".mid" :
				return("audio/midi");
				break;

		case ".midi" :
				return("audio/midi");
				break;

		case ".mime" :
				return("message/rfc822");
				break;

		case ".mml" :
				return("application/mathml+xml");
				break;

		case ".mng" :
				return("video/x-mng");
				break;

		case ".mov" :
				return("video/quicktime");
				break;

		case ".mp3" :
				return("audio/mpeg");
				break;

		case ".mp4" :
				return("video/mp4");
				break;

		case ".mp4v" :
				return("video/mp4");
				break;

		case ".mpeg" :
				return("video/mpeg");
				break;

		case ".mpg" :
				return("video/mpeg");
				break;

		case ".ms" :
				return("text/troff");
				break;

		case ".msi" :
				return("application/x-msdownload");
				break;

		case ".odp" :
				return("application/vnd.oasis.opendocument.presentation");
				break;

		case ".ods" :
				return("application/vnd.oasis.opendocument.spreadsheet");
				break;

		case ".odt" :
				return("application/vnd.oasis.opendocument.text");
				break;

		case ".ogg" :
				return("application/ogg");
				break;

		case ".p" :
				return("text/x-pascal");
				break;

		case ".pas" :
				return("text/x-pascal");
				break;

		case ".pbm" :
				return("image/x-portable-bitmap");
				break;

		case ".pem" :
				return("application/x-x509-ca-cert");
				break;

		case ".pgm" :
				return("image/x-portable-graymap");
				break;

		case ".pgp" :
				return("application/pgp-encrypted");
				break;

		case ".pkg" :
				return("application/octet-stream");
				break;

		case ".pl" :
				return("text/x-script.perl");
				break;

		case ".pm" :
				return("text/x-script.perl-module");
				break;

		case ".pnm" :
				return("image/x-portable-anymap");
				break;

		case ".ppm" :
				return("image/x-portable-pixmap");
				break;

		case ".pps" :
				return("application/vnd.ms-powerpoint");
				break;

		case ".ppt" :
				return("application/vnd.ms-powerpoint");
				break;

		case ".ps" :
				return("application/postscript");
				break;

		case ".psd" :
				return("image/vnd.adobe.photoshop");
				break;

		case ".py" :
				return("text/x-script.python");
				break;

		case ".qt" :
				return("video/quicktime");
				break;

		case ".ra" :
				return("audio/x-pn-realaudio");
				break;

		case ".rake" :
				return("text/x-script.ruby");
				break;

		case ".ram" :
				return("audio/x-pn-realaudio");
				break;

		case ".rar" :
				return("application/x-rar-compressed");
				break;

		case ".rb" :
				return("text/x-script.ruby");
				break;

		case ".rdf" :
				return("application/rdf+xml");
				break;

		case ".roff" :
				return("text/troff");
				break;

		case ".rpm" :
				return("application/x-redhat-package-manager");
				break;

		case ".rss" :
				return("application/rss+xml");
				break;

		case ".rtf" :
				return("application/rtf");
				break;

		case ".ru" :
				return("text/x-script.ruby");
				break;

		case ".s" :
				return("text/x-asm");
				break;

		case ".sgm" :
				return("text/sgml");
				break;

		case ".sgml" :
				return("text/sgml");
				break;

		case ".sh" :
				return("application/x-sh");
				break;

		case ".sig" :
				return("application/pgp-signature");
				break;

		case ".snd" :
				return("audio/basic");
				break;

		case ".so" :
				return("application/octet-stream");
				break;

		case ".svg" :
				return("image/svg+xml");
				break;

		case ".svgz" :
				return("image/svg+xml");
				break;

		case ".t" :
				return("text/troff");
				break;

		case ".tar" :
				return("application/x-tar");
				break;

		case ".tbz" :
				return("application/x-bzip-compressed-tar");
				break;

		case ".tci" :
				return("application/x-topcloud");
				break;

		case ".tcl" :
				return("application/x-tcl");
				break;

		case ".tex" :
				return("application/x-tex");
				break;

		case ".texi" :
				return("application/x-texinfo");
				break;

		case ".texinfo" :
				return("application/x-texinfo");
				break;

		case ".text" :
				return("text/plain");
				break;

		case ".tif" :
				return("image/tiff");
				break;

		case ".tiff" :
				return("image/tiff");
				break;

		case ".torrent" :
				return("application/x-bittorrent");
				break;

		case ".tr" :
				return("text/troff");
				break;

		case ".vcf" :
				return("text/x-vcard");
				break;

		case ".vcs" :
				return("text/x-vcalendar");
				break;

		case ".vrml" :
				return("model/vrml");
				break;

		case ".war" :
				return("application/java-archive");
				break;

		case ".wav" :
				return("audio/x-wav");
				break;

		case ".wma" :
				return("audio/x-ms-wma");
				break;

		case ".wmv" :
				return("video/x-ms-wmv");
				break;

		case ".wmx" :
				return("video/x-ms-wmx");
				break;

		case ".wrl" :
				return("model/vrml");
				break;

		case ".wsdl" :
				return("application/wsdl+xml");
				break;

		case ".xbm" :
				return("image/x-xbitmap");
				break;

		case ".xhtml" :
				return("application/xhtml+xml");
				break;

		case ".xls" :
				return("application/vnd.ms-excel");
				break;

		case ".xpm" :
				return("image/x-xpixmap");
				break;

		case ".xslt" :
				return("application/xslt+xml");
				break;

		case ".yaml" :
				return("text/yaml");
				break;

		case ".yml" :
				return("text/yaml");
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

