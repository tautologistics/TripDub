/**
 * @fileoverview Contains the ThreadSuicide class
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new ThreadSuicide instance
 * @constructor
 * @class Provides a way to exit a thread
 * @param {nsIThread} mainThread The thread to run under while killing the current thread
 */
function ThreadSuicide (mainThread) {
	/** @ignore */
	this.currentThread = Components.classes["@mozilla.org/thread-manager;1"]
		.getService()
		.currentThread;
	while (this.currentThread.hasPendingEvents())
		this.currentThread.processNextEvent(false);
	mainThread.dispatch(this, mainThread.DISPATCH_NORMAL);
}

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
ThreadSuicide.prototype.Log = function ThreadSuicide__Log (data) { if (typeof Log == "function") { Log(data); } };

/** @ignore */
ThreadSuicide.prototype.run = function ThreadSuicide__run () {
	try {
		this.currentThread.shutdown();
	} catch(err) {
		this.Log("ERROR: " + err);
	}
}

/** @ignore */
ThreadSuicide.prototype.QueryInterface = function ThreadSuicide__QueryInterface (iid) {
	if (iid.equals(Components.interfaces.nsIRunnable) ||
		iid.equals(Components.interfaces.nsISupports)) {
		return(this);
	}

	throw Components.results.NS_ERROR_NO_INTERFACE;
}
