/**
 * @fileoverview Contains the ThreadJob class, which provides a simple way to execute code on other threads
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new ThreadJob instance; Do not use this, instead use the static method {@link #Call}
 * @constructor
 * @class Provides a simple way to execute code on other threads (a)synchronously
 * @param {Function} func The function to execute
 * @param {Object[]} args An array of arguments to pass to the function
 * @see #Call
 */
//TODO: https://developer.mozilla.org/en/nsIPipe
function ThreadJob (func, args) {
	/** @ignore */
	this._func = func;
	/** @ignore */
	this._args = args;
	/** @ignore */
	this._Result = null;
	/** @ignore */
	this._Exception = false;
	/** @ignore */
	this._Complete = false;
}

/** @ignore */
ThreadJob.CopyArgs = function ThreadJob__CopyArgs (args) {
	var newArgs = [];

	for (var i = 0; i < args.length; i++)
		newArgs.push(args[i]);

	return(newArgs);
}

/**
 * Calls the passed function on another thread (a)synchronously
 * @param {nsIThread} thread The thread to execute the code on
 * @param {Boolean} async A flag indicating whether to execute the function synchronously (False) or asynchronously (True)
 * @param {Function} func The function to execute
 * @param {Object} arg1_N Optional argument(s) to pass to the function being executed
 * @type Object
 * @returns When the function is called synchronously the return value of the called function is returned
 */
ThreadJob.Call = function ThreadJob__Call (thread, async, func /*, n arguments */) {
	var args = ThreadJob.CopyArgs(arguments);
	args.shift();
	args.shift();
	args.shift();
	var job = new ThreadJob(func, args);
	thread.dispatch(job, !!async ? thread.DISPATCH_NORMAL : thread.DISPATCH_SYNC);
	return(job.GetResult());
}

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
ThreadJob.prototype.Log = function ThreadJob__Log (data) { if (typeof Log == "function") { Log(data); } };

/**
 * Gets the flag indicating whether the called function threw an exception. If there was an exception it will be stored in {@link #Result}
 * @type Boolean 
 */
ThreadJob.prototype.GetException = function ThreadJob__GetException () { return(this._Exception); }
/**
 * Flag indicating whether the called function threw an exception. If there was an exception it will be stored in {@link #Result}
 * @type Boolean 
 */
ThreadJob.prototype.__defineGetter__("Exception", ThreadJob.prototype.GetException);

/**
 * Gets the return value of the executed function
 * @type Object 
 */
ThreadJob.prototype.GetResult = function ThreadJob__GetResult () {
	if (this.GetException())
		throw Utility.CopyException(this._Result);
	return(this._Result);
}
/**
 * The return value of the executed function
 * @type Object 
 */
ThreadJob.prototype.__defineGetter__("Result", ThreadJob.prototype.GetResult);

/**
 * Gets the flag indicating whether the called function has completed
 * @type Boolean 
 */
ThreadJob.prototype.GetComplete = function ThreadJob__GetComplete () { return(this._Complete); }
/**
 * Flag indicating whether the called function has completed
 * @type Boolean 
 */
ThreadJob.prototype.__defineGetter__("Complete", ThreadJob.prototype.GetComplete);

/** @ignore */
ThreadJob.prototype.run = function ThreadJob__run () {
	try {
		this._Result = this._func.apply(this, this._args);
		this._Complete = true;
	} catch (err) {
		this.Log("ThreadJob.run Error: " + err);
		this._Exception = true;
		this._Result = err;
	}
}

/** @ignore */
ThreadJob.prototype.QueryInterface = function ThreadJob__QueryInterface (iid) {
	if (iid.equals(Components.interfaces.nsIRunnable) ||
		iid.equals(Components.interfaces.nsISupports)) {
		return(this);
	}

	throw Components.results.NS_ERROR_NO_INTERFACE;
}
