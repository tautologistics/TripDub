/**
 * @fileoverview Contains the ConnectionHandler class
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new ConnectionHandler
 * @constructor
 * @class Handles incoming connections and their HTTP requests
 * @param {HttpServer} server HttpServer instance that needs to listen on a socket
 * @param {nsIServerSocket} socket The socket the {@link AsyncListener} is listening on
 * @param {nsISocketTransport} transport The connected socket transport
 * @param {nsIThread} parentThread The thread that the {@link HttpServer}/{@link AsyncListener} is running on
 * @requires HttpServer
 */
function ConnectionHandler (server, socket, transport, parentThread) {
	/** @ignore */
	this.server = server;
	/** @ignore */
	this.socket = socket;
	/** @ignore */
	this.transport = transport;
	/** @ignore */
	this.threaded = (parentThread != null);
	/** @ignore */
	this.request = new Request();
	/** @ignore */
	this.response = new Response(this);

	if (this.threaded) {
		/** @ignore */
		this.parentThread = parentThread;
		/** @ignore */
		this.thread = Components.classes["@mozilla.org/thread-manager;1"]
			.getService()
			.newThread(0);
		//this.thread.priority = -2;
		this.thread.dispatch(this, this.thread.DISPATCH_NORMAL);
	}
	else {
		/** @ignore */
		this.parentThread = null;
		/** @ignore */
		this.thread = null;
		this.run();
	}
}

/**
 * Thread used for synchronization of operation
 * @type nsIThread
 */
ConnectionHandler.SandboxExecThread = Components.classes["@mozilla.org/thread-manager;1"].getService().newThread(0);

ConnectionHandler.SandBoxes = [];
for (var i = 0; i < 200; i++) {
	ConnectionHandler.SandBoxes.push(new Components.utils.Sandbox('http://localhost:2323/'));
}

/**
 * Creates a sandbox using the thread {@link #SandboxExecThread} to prevent multiple simultaneous creation
 * @param String uri The URI to use when creating the sandbox
 * @type nsIXPCComponents_utils_Sandbox
 */
ConnectionHandler.GetSandbox = function ConnectionHandler__GetSandbox (uri) {
	if (ConnectionHandler.SandBoxes.length > 0)
		return(ConnectionHandler.SandBoxes.pop());

	return(ThreadJob.Call(
			ConnectionHandler.SandboxExecThread,
			false,
			function () { return(new Components.utils.Sandbox(uri)); },
			arguments
			));
}

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
ConnectionHandler.prototype.Log = function ConnectionHandler__Log (data) { if (typeof Log == "function") { Log(data); } };

/**
 * Writes the passed data to the connected HTTP client
 * @param {Object} data The data to write to the client
 * @type Boolean
 * @returns Indicates whether all the data was written
 */
ConnectionHandler.prototype.Write = function ConnectionHandler__Write (data) {
	var writeSize = 0;
	try {
		writeSize = this.outStream.write(data, data.length);
	} catch (ex) {
		this.log("ConnectionHandler::Write() Failed to write data\n" + ex);
		return(false);
	}

	return(data.length == writeSize);
}

/* Interface: nsIRunnable */
/** @ignore */
ConnectionHandler.prototype.run = function ConnectionHandler__run () {
	if (this.transport) {
		this.outStream = this.transport.openOutputStream(1, 0, 0);

		this.stream = this.transport.openInputStream(0, 0, 0);
		this.inStream = Components.classes["@mozilla.org/binaryinputstream;1"]
			.createInstance(Components.interfaces.nsIBinaryInputStream);
		this.inStream.setInputStream(this.stream);

		this.dataPump = Components.classes["@mozilla.org/network/input-stream-pump;1"]
			.createInstance(Components.interfaces.nsIInputStreamPump);
		this.dataPump.init(this.stream, -1, -1, 0, 0, false); //closeWhenDone?
		this.dataPump.asyncRead(this, null);
	}
}

/** @ignore */
ConnectionHandler.prototype.__read__ = function ConnectionHandler____read__ (filepath) {
	if ((typeof filepath == "string") || (filepath instanceof String)) {
		var oFile = Components.classes["@mozilla.org/file/local;1"]
			.createInstance(Components.interfaces.nsILocalFile);
		//oFile.initWithPath(filepath);
		oFile.initWithPath(this.App.MapPath(this.Request, filepath).GetSystemPath());
		filepath = oFile;
	}
	if (!(filepath instanceof Components.interfaces.nsILocalFile))
		throw "Parameter \"filepath\" is of an unexpected type (" + (typeof filepath) + ")";

	if (!filepath.exists() || !filepath.isFile())
		throw "Unable to load file \"" + filepath.path + "\"";

	var fileStream = Components.classes["@mozilla.org/network/file-input-stream;1"].
		createInstance(Components.interfaces.nsIFileInputStream);
	fileStream.init(filepath, 1, 0, false);
	var fileBinStream = Components.classes["@mozilla.org/binaryinputstream;1"].
		createInstance(Components.interfaces.nsIBinaryInputStream);
	fileBinStream.setInputStream(fileStream);
	var fileContents = fileBinStream.readBytes(filepath.fileSize);

	filepath = null;
	fileBinStream = null;
	fileStream.close();
	fileStream = null;

	return(fileContents);
}

/** @ignore */
ConnectionHandler.prototype.__parsecode__ = function ConnectionHandler____parsecode__ (code, writeFunc) {
	if (writeFunc == null || writeFunc == '')
		writeFunc = "Response.Write";

	var codeParsed = new Array();

	var codeParts = code.split(/<\?js\s*/);
	
	if (codeParts.length <= 1) {
		codeParsed.push(writeFunc + "(\"" + codeParts[0].replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t') + "\");\n");
	} else {
		for (var i = 0; i < codeParts.length; i++) {
			if (!codeParts[i].length) { continue; }

			isCodeEnd = (i == 0 || i == codeParts.length);

			codeSectionParts = codeParts[i].split(/\s*\?>/);
			if (isCodeEnd && codeSectionParts.length == 1) {
				codeSectionParts.unshift("");
			}
			//if (codeSectionParts.length != 2) { throw(new ExScriptParseError('Unmatched code block markers near: "' + ((codeParts[i].length > 128) ? (codeParts[i].substring(0, 128) + " ...") : codeParts[i]) + '"')); }
			if (codeSectionParts.length != 2) { throw 'Unmatched code block markers near: "' + ((codeParts[i].length > 128) ? (codeParts[i].substring(0, 128) + " ...") : codeParts[i]) + '"'; }

			if (codeSectionParts[0].length) {
				if (codeSectionParts[0].match(/^\s*\=/)) {
					//codeParsed += writeFunc + "(" + codeSectionParts[0].replace(/^\s*=\s*/, '').replace(/;+\s*$/, '') + ");\n";
					codeParsed[codeParsed.length] = writeFunc + "(" +
						codeSectionParts[0].replace(/^\s*=\s*/, '').replace(/;+\s*$/, '').replace(/Response.End\s*\(\s*\)/g, 'Response.End(); throw(new ExResponseEnd());') +
						");\n";
				} else {
					//codeParsed += codeSectionParts[0] + "\n";
					codeParsed[codeParsed.length] = codeSectionParts[0].replace(/Response.End\s*\(\s*\)/g, 'Response.End(); throw(new ExResponseEnd());') + "\n";
				}
			}

			if (codeSectionParts[1].length) {
				//TODO: find better replace/translate method
				//codeParsed += "response.write(\"" + codeSectionParts[1].replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t') + "\");\n";
				codeParsed[codeParsed.length] = writeFunc + "(\"" + codeSectionParts[1].replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t') + "\");\n";
			}
		}
	}

	return(codeParsed.join(''));
}

/** @ignore */
ConnectionHandler.prototype.__loadcode__ = function ConnectionHandler____loadcode__ (filepath, rawJs) {
	rawJs = !!rawJs;
	if (rawJs)
		return(this.read(filepath));
	else
		return(this.parsecode(this.read(filepath)));
}

/** @ignore */
//TODO: Use optional arguments for evalInSandbox()?
/*
 * https://developer.mozilla.org/En/Components.utils.evalInSandbox
 * As of Firefox 3.5/Gecko 1.9.1, it's possible to optionally specify the JS version, filename, and line number of the code being evaluated. For instance:
 * 		var x = Components.utils.evalInSandbox("let x = 1;", sandbox, "1.8", "http://foo.com/mycode.js", 25);
 * The above will execute code using JavaScript 1.8.  Any exceptions raised by the evaluated code will show as originating from the above URL.  The evaluated code is assumed to start at line 25 of the document at that URL.
 */
ConnectionHandler.prototype.__require__ = function ConnectionHandler____require__ (filepath, rawJs) {
	rawJs = !!rawJs;
	Components.utils.evalInSandbox(
		this.loadcode(filepath, rawJs),
		this);
}

/** @ignore */
//TODO: Use optional arguments for evalInSandbox()?
/*
 * https://developer.mozilla.org/En/Components.utils.evalInSandbox
 * As of Firefox 3.5/Gecko 1.9.1, it's possible to optionally specify the JS version, filename, and line number of the code being evaluated. For instance:
 * 		var x = Components.utils.evalInSandbox("let x = 1;", sandbox, "1.8", "http://foo.com/mycode.js", 25);
 * The above will execute code using JavaScript 1.8.  Any exceptions raised by the evaluated code will show as originating from the above URL.  The evaluated code is assumed to start at line 25 of the document at that URL.
 */
ConnectionHandler.prototype.__include__ = function ConnectionHandler____include__ (filepath, rawJs) {
	rawJs = !!rawJs;
	var code = "";
	try {
		code = this.loadcode(filepath, rawJs);
	} catch (ex) { }
	Components.utils.evalInSandbox(
		code,
		this);
}

/** @ignore */
ConnectionHandler.prototype.HandleRequest = function ConnectionHandler__HandleRequest () {
	//this.Log("[" + this.request.GetMethod() + "] " + this.request.GetPath() + ((this.request.GetQuerystring() == '') ? '' : '?' + this.request.GetQuerystring()));
	/*
	//CREATE  TABLE  IF NOT EXISTS "main"."access_log" ("module" VARCHAR NOT NULL , "timestamp" DATETIME NOT NULL  DEFAULT CURRENT_TIMESTAMP, "remote-addr" VARCHAR NOT NULL , "port" NUMERIC NOT NULL  DEFAULT 80, "method" VARCHAR NOT NULL , "path" VARCHAR, "query" VARCHAR, "sent" NUMERIC NOT NULL  DEFAULT 0, "recvd" NUMERIC NOT NULL  DEFAULT 0, "time-taken" NUMERIC NOT NULL  DEFAULT 0, "version" NUMERIC NOT NULL  DEFAULT 1, "agent" VARCHAR, "referrer" VARCHAR, "status" NUMERIC NOT NULL  DEFAULT 0)
	var db = new DbConnection("system");
	if (!db.TableExists("access_log"))
		db.ExecNoQuery(
			"CREATE TABLE 'access_log' ( " +
				"id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
				"access_time TIMESTAMP NOT NULL, " +
				"path VARCHAR NOT NULL, " +
				"query VARCHAR " +
				");"
			);
	var query = db.Prepare("INSERT INTO access_log (path, query) VALUES ('?', '?')");
	query.ExecAsync(this.request.GetPath(), this.request.GetQuerystring());
	query.Free();
	db.Close();
	*/
	
	//TODO: fix NS_ERROR_OUT_OF_MEMORY problem with evalInSandbox() calls
	//TODO: Use nsIDOMWindow or nsIPrincipal instead of URI?
	//https://developer.mozilla.org/en/Components.utils.evalInSandbox
	//http://www.oxymoronical.com/experiments/apidocs/platform/1.9.2a1pre/interface/nsIPrincipal
	/* [ConnectionHandler.HandleRequest(0)] ERROR Sending Error Page:
	 * 	[Exception... "Component returned failure code: 0x8007000e (NS_ERROR_OUT_OF_MEMORY) [nsIXPCComponents_Utils.evalInSandbox]"
	 * 	nsresult: "0x8007000e (NS_ERROR_OUT_OF_MEMORY)"
	 * 	location: "JS frame :: chrome://myapp/content/lib/ConnectionHandler.js :: ConnectionHandler__sandBox____start__ :: line 256"
	 * 	data: no]
	 */
	//var sandBox = new Components.utils.Sandbox("http://localhost:" + this.server.port + this.request.Url);
	//var sandBox = new Components.utils.Sandbox("http://localhost/");
	var sandBox = ConnectionHandler.GetSandbox("http://localhost/");
	try {
		var module = new Module("tripdub@chris.winberry.net");
		sandBox.App = module.App;
		sandBox.Request = this.request;
		sandBox.Response = this.response;
		sandBox.log = this.Log;
		sandBox.read = this.__read__;
		sandBox.parsecode = this.__parsecode__;
		sandBox.loadcode = this.__loadcode__;
		sandBox.require = this.__require__;
		sandBox.include = this.__include__;
		//TODO: load these into module members
		sandBox.__sandboxer__ = sandBox.read((new module.HandlerVirtualPath("SandBoxer.js")).GetLocalFile());
		sandBox.__scripthandler__ = sandBox.read((new module.HandlerVirtualPath("ScriptHandler.js")).GetLocalFile());

//		sandBox.__start__ = function ConnectionHandler__sandBox____start__ () {
//			var __sandboxer__ = this.__sandboxer__;
//			var __scripthandler__ = this.__scripthandler__;
//			delete this['__start__'];
//			delete this['__sandboxer__'];
//			delete this['__scripthandler__'];
//			this.Log("DEB: __sandboxer__");
//			Components.utils.evalInSandbox(
//				__sandboxer__,
//				this);
//			this.Log("DEB: __scripthandler__");
//			Components.utils.evalInSandbox(
//				__scripthandler__,
//				this);
//		}
//		Components.utils.evalInSandbox(
//			"__start__();",
//			sandBox);
//		Components.utils.evalInSandbox(
//				sandBox.read((new module.HandlerVirtualPath("SandBoxer.js")).GetLocalFile()),
//				sandBox);
//		Components.utils.evalInSandbox(
//				sandBox.read((new module.HandlerVirtualPath("ScriptHandler.js")).GetLocalFile()),
//				sandBox);
		Components.utils.evalInSandbox(
			sandBox.__sandboxer__,
			sandBox);
		Components.utils.evalInSandbox(
			sandBox.__scripthandler__,
			sandBox);
		//TODO: "require('../lib/SandBoxer.js'); require('../lib/ScriptHandler.js');"??

		this.response.End();
	} catch (ex) {
		if (ex instanceof ExResponseEnd) {
			//this.Log("Response.End() called");
		}
		else {
			//TODO: Temp/Debug
//			for (var key in ex) {
//				this.Log("DEB: "  + key + " =" + ex[key]);
//			}
//			this.Log("NS_ERROR_OUT_OF_MEMORY: " + ex.toString().indexOf("NS_ERROR_OUT_OF_MEMORY"));
//			this.Log("nsIXPCComponents_Utils.evalInSandbox: " + ex.toString().indexOf("nsIXPCComponents_Utils.evalInSandbox"));
			
			if ((ex.toString().indexOf("NS_ERROR_OUT_OF_MEMORY") >= 0) && (ex.toString().indexOf("nsIXPCComponents_Utils.evalInSandbox") >= 0)) {
				this.Log(sandBox.__sandboxer__);
			}
			this.Log("ERROR: " + ex);
			if (ex["QueryInterface"] != null)
				ex = {
					message: ex.message,
					fileName: ex.filename,
					lineNumber: ex.lineNumber,
					stack: "",
					name: ex.name,
					toString: function () { return(this.name + ": " + this.message); }
					};
			try {
				sandBox.PageException = ex;
				sandBox.__errorhandler__ = sandBox.read((new module.HandlerVirtualPath("ErrorHandler.js")).GetLocalFile());
				sandBox.__start__ = function ConnectionHandler__sandBox____start__ () {
					var __errorhandler__ = this.__errorhandler__;
					delete this['__start__'];
					delete this['__errorhandler__'];
					Components.utils.evalInSandbox(
						__errorhandler__,
						this);
				}
				Components.utils.evalInSandbox(
					"__start__();",
					sandBox);

				this.response.End();
			} catch (ex2) {
				if (!(ex2 instanceof ExResponseEnd)) {
					this.Log("ERROR Sending Error Page: " + ex2);
				}
			}
		}
	}
	sandBox = null;
}

/** @ignore */
ConnectionHandler.prototype.QueryInterface = function ConnectionHandler__QueryInterface (aIID) {
	if (
		!aIID.equals(Components.interfaces.nsIStreamListener)
		&&
		!aIID.equals(Components.interfaces.nsISupports)
		&&
		!aIID.equals(Components.interfaces.nsIRunnable)
		)
		throw(Components.results.NS_ERROR_NO_INTERFACE);

	return(this);
}

/* Interface: nsIStreamListener */
/** @ignore */
ConnectionHandler.prototype.onStartRequest = function ConnectionHandler__onStartRequest (request, context) {
	//this.Log("ConnectionHandler__onStartRequest");
}

/** @ignore */
ConnectionHandler.prototype.onStopRequest = function ConnectionHandler__onStopRequest (request, context, status) {
	//this.Log("ConnectionHandler__onStopRequest");
	if (this.threaded)
		new ThreadSuicide(this.parentThread);
}

/** @ignore */
ConnectionHandler.prototype.onDataAvailable = function ConnectionHandler__onDataAvailable (request, context, inputStream, offset, count) {
	try {
		var data = this.inStream.readBytes(this.inStream.available());
		if (this.request.ParseChunk(data)) {
			this.HandleRequest();
			this.inStream.close();
			this.outStream.close();
		}
		//TODO: Handle timeouts
		//TODO: Handle large bodies
	} catch (ex) { this.Log(ex); }
}
