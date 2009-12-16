/**
 * @fileoverview Contains the AsyncListener class
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new AsyncListener
 * @constructor
 * @class An asynchronous socket listener that triggers on incoming connections
 * @param {HttpServer} server HttpServer instance that needs to listen on a socket
 * @param {nsIServerSocket} socket The socket to listen on
 * @param {Boolean} threaded Indicates whether each incoming connection should be handled in their own thread 
 * @requires HttpServer
 */
function AsyncListener (server, socket, threaded) {
	/** @ignore */
	this.server = server;
	socket.asyncListen(this);
	/** @ignore */
	this.threaded = !!threaded;
	/** @ignore */
	this.thread = (!this.threaded) ? null :
		Components.classes["@mozilla.org/thread-manager;1"]
			.getService()
			.currentThread;
}

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
AsyncListener.prototype.Log = function AsyncListener__Log (data) { if (typeof Log == "function") { Log(data); } };

/** @ignore */
AsyncListener.prototype.QueryInterface = function AsyncListener__QueryInterface (aIID) {
	if (
		!aIID.equals(Components.interfaces.nsISupports)
		&&
		!aIID.equals(Components.interfaces.nsIServerSocketListener)
		)
		throw(Components.results.NS_ERROR_NO_INTERFACE);

	return(this);
}

/** @ignore */
AsyncListener.prototype.onSocketAccepted = function AsyncListener__onSocketAccepted (socket, transport) {
	//this.Log("onSocketAccepted");
	new ConnectionHandler(this.server, socket, transport, this.thread);
}

/** @ignore */
AsyncListener.prototype.onStopListening = function AsyncListener__onStopListening (socket, status) {
	//TODO: allow subscription to this event to know when the open socket gets forced closed
	try {
		//socket.close();
		this.Log("onStopListening: " + status);
		this.server.ListenerStopped();
	} catch (ex) { this.Log("Error: " + ex); }
}
