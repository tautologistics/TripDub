/**
 * @fileoverview Contains the HttpServer class
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new HttpServer instance
 * @constructor
 * @class The top-level class the represents an HTTP server
 * @param {Integer} port The port number to listen for incoming requests on
 * @param {Boolean} localOnly Indicates whether to only listen to requests originating from the same machine
 * @param {Boolean} threaded Indicates whether to use threads separate from the current one for accepting and handling HTTP requests 
 */
function HttpServer (port, localOnly, threaded) {
	/** @ignore */
	this.port = port;
	/** @ignore */
	this.localOnly = !!localOnly;
	/** @ignore */
	this.threaded = !!threaded;
	/** @ignore */
	this.thread = null;
	/** @ignore */
	this.running = false;
	/** @ignore */
	this.socket = null;
}

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
HttpServer.Log = function HttpServer__Log (data) { if (typeof Log == "function") { Log(data); } };
/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
HttpServer.prototype.Log = function (data) { return(HttpServer.Log(data)); };

/** @ignore */
HttpServer.LoadScript = function HttpServer__LoadScript (script, context) {
	//HttpServer.Log("HttpServer.LoadScript: " + script);
	if (context == null)
		context = this;

	try {
		Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
			.getService(Components.interfaces.mozIJSSubScriptLoader)
			.loadSubScript(script, context);
	} catch (ex) {
		HttpServer.Log("HttpServer.LoadScript:Error: " + ex);
		return(false);
	}

	return(true);
}

/** @ignore */
HttpServer.prototype.QueryInterface = function HttpServer__QueryInterface (aIID) {
	if (
		!aIID.equals(Components.interfaces.nsISupports)
		&&
		!aIID.equals(Components.interfaces.nsIServerSocketListener)
		)
		throw(Components.results.NS_ERROR_NO_INTERFACE);

	return(this);
}

/**
 * Stops the server from listening for requests
 */
HttpServer.prototype.Stop = function HttpServer__Stop () {
	if (!this.running)
		return;

	this.Log("Server stopping");

	this.running = false;

	if (this.socket != null) {
		try {
			this.socket.close();
		} catch (ex) { this.Log("Error: " + ex); }
		this.socket = null;
	}

	if (this.thread != null) {
		try {
			this.thread.shutdown();
		} catch (ex) { this.Log("Error: " + ex); }
		this.thread = null;
	}

	this.Log("Server stopped");
}

/**
 * Stops the server and the starts it again
 */
HttpServer.prototype.Restart = function HttpServer__Restart () {
	this.Log("Server restarting");

	this.Stop();
	this.Start();
}

/**
 * Causes the server to start listening for requests and handle them
 */
HttpServer.prototype.Start = function HttpServer__Start () {
	if (this.running)
		return;

	if (this.threaded) {
		this.thread = Components.classes["@mozilla.org/thread-manager;1"]
			.getService()
			.newThread(0);
		//this.thread.priority = -1;
		//this.thread.dispatch(this, this.thread.DISPATCH_NORMAL);
		//TODO: see if DISPATCH_SYNC fixes bad connection error on startup
		this.thread.dispatch(this, this.thread.DISPATCH_SYNC);
	}
	else {
		this.run();
	}
}

/** @ignore */
HttpServer.prototype.ListenerStopped = function HttpServer__ListenerStopped () {
	if (this.running)
		this.Restart();
}

/* Interface: nsIRunnable */
/** @ignore */
HttpServer.prototype.run = function HttpServer__run () {
	this.Log("Server starting [port:" + this.port + " | local:" + this.localOnly + " | threaded:" + this.threaded + "]");

	this.socket = Components.classes["@mozilla.org/network/server-socket;1"]
		.createInstance(Components.interfaces.nsIServerSocket);
	this.socket.init(this.port, this.localOnly, -1);

	this.listener = new AsyncListener(this, this.socket, this.threaded);
	
	this.running = true;

	this.Log("Server started");
}

/** @ignore */
HttpServer.prototype.QueryInterface = function HttpServer__QueryInterface (iid) {
	if (
		!iid.equals(Components.interfaces.nsIRunnable)
		||
		!iid.equals(Components.interfaces.nsIServerSocketListener)
		||
		!iid.equals(Components.interfaces.nsISupports)
		) {
		throw(Components.results.NS_ERROR_NO_INTERFACE);
	}

	return(this);
}

/*
HttpServer.LoadScript("chrome://tripdub/content/lib/Utility.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/AsyncListener.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/ThreadJob.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/ThreadSuicide.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/ConnectionHandler.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/VirtualPath.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/App.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/Module.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/Headers.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/Querystring.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/Cookies.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/Request.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/Response.js");
HttpServer.LoadScript("chrome://tripdub/content/lib/Database.js");
//*/
