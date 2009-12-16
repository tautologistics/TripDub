/**
 * @fileoverview Contains the GenThread class
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new GenThread instance
 * @deprecated
 * @constructor
 * @class Represents a new thread to do some chunk of work
 * @param {String} id Id of the thread/job to run
 * @param {Function} code Code to execute in the worker thread
 */
function GenThread (id, code) {
	/** @ignore */
	this.id = id;
	/** @ignore */
	this.code = code;
}

/** @ignore */
GenThread.prototype.run = function GenThread__run () {
	try {
		// This is where we react to the completion of the working thread.
		//Log('Thread ' + this.id + ' finished with data: ' + this.data);
		this.code();
	} catch(err) {
		Components.utils.reportError(err);
	}
}

/** @ignore */
GenThread.prototype.QueryInterface = function GenThread__QueryInterface (iid) {
	if (
		!iid.equals(Components.interfaces.nsIRunnable)
		||
		!iid.equals(Components.interfaces.nsISupports)
		) {
		throw(Components.results.NS_ERROR_NO_INTERFACE);
	}

	return(this);
}
