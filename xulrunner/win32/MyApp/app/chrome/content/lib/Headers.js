/**
 * @fileoverview Contains the classes for representing HTTP headers
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new ExHeadersAlreadyWritten instance
 * @constructor
 * @class An exception indicating that headers have already been written to the client.
 *  Thrown when an attempt to modify a headers collection occurs after the headers have been sent to the client
 */
function ExHeadersAlreadyWritten () {
	this.code = 1;
	this.msg = "Attempt to modify headers after they had already been sent";
}
/** @ignore */
ExHeadersAlreadyWritten.prototype.toString = function ExHeadersAlreadyWritten__toString () {
	return("[" + this.code + "] " +  this.msg);
}

/**
 * Creates a new Header instance
 * @constructor
 * @class Represents a single header in an HTTP request or response
 * @param {String} name Name of the header
 * @param {String} value The content of the header
 */
function Header (name, value) {
	/** @ignore */
	this._Name = name;
	/** @ignore */
	this._Value = value;
}

/** @ignore */
Header.prototype.toString = function Header__toString () {
	return(escape(this.GetName()) + ": " + Header.EscapeValue(this.GetValue()));
}

/** @ignore */
Header.EscapeName = function Header__EscapeName (value) {
	return(escape(value));
}

/** @ignore */
Header.EscapeValue = function Header__EscapeValue (value) {
	if (value == null)
		return("");
	return(value.toString().replace(/(\r\n|\r|\n)+/g, "$1 "));
}

/**
 * Gets the name of the header
 * @type String
 */
Header.prototype.GetName = function Header__GetName () { return(this._Name); }
/**
 * Sets the name of the header
 * @param {String} value The new name for the header
 */
Header.prototype.SetName = function Header__SetName (value) { this._Name = value; }
/**
 * The name of the header
 * @type String
 */
Header.prototype.__defineGetter__("Name", Header.prototype.GetName);
Header.prototype.__defineSetter__("Name", Header.prototype.SetName);

/**
 * Gets the content of the header
 * @type String
 */
Header.prototype.GetValue = function Header__GetValue () { return(this._Value); }
/**
 * Sets the content of the header
 * @param {String} value The new content for the header to contain
 */
Header.prototype.SetValue = function Header__SetValue (value) { this._Value = value; }
/**
 * The content of the header
 * @type String
 */
Header.prototype.__defineGetter__("Value", Header.prototype.GetValue);
Header.prototype.__defineSetter__("Value", Header.prototype.SetValue);

/**
 * Creates a new Headers instance
 * @constructor
 * @class Represents a collection of HTTP headers
 * @param {String} data An HTTP formatted header section to be parsed and loaded
 * @requires Header
 */
function Headers (data) {
	/** @ignore */
	this._HeadersSent = false;

	/** @ignore */
	this._Headers = {};
	if (data != null)
		this.Parse(data);
}

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
Headers.prototype.Log = function Headers__Log (data) { if (typeof Log == "function") { Log(data); } };

/**
 * Gets a flag indicating whether the headers have been sent to the client
 * @type Boolean
 */
Headers.prototype.GetHeadersSent = function Headers__GetHeadersSent () { return(this._HeadersSent); }
/**
 * Sets a flag indicating whether the headers have been sent to the client
 * @type Boolean
 */
Headers.prototype.SetHeadersSent = function Headers__SetHeadersSent (value) {
	this._HeadersSent = !!value || this._HeadersSent;
}
/**
 * A flag indicating whether the headers have been sent to the client
 * @type Boolean
 */
Headers.prototype.__defineGetter__("HeadersSent", Headers.prototype.GetHeadersSent);
Headers.prototype.__defineSetter__("HeadersSent", Headers.prototype.SetHeadersSent);

/**
 * Parses an HTTP formatted header section and loads all found headers into the collection
 * @param {String} data An HTTP formatted header section to be parsed and loaded
 */
Headers.prototype.Parse = function Headers__Parse (data) {
	var headerLines = (data instanceof Array) ? data : data.split(/(?:\r\n|\r|\n)/);

	while (headerLines.length > 0) {
		var header = headerLines.shift();
		if (header.length == 0)
			continue;
		var headerParts = header.split(':');
		var headerName = headerParts.shift();
		var headerValue = headerParts.join(':').replace(/^\s+/, '');
		while (headerLines.length > 0 && headerLines[0].match(/^\s/)) {
			headerValue += ' ' + headerLines.shift().replace(/^\s+/, '');
		}
		this.Add(headerName, headerValue);
	}
}

/** @ignore */
Headers.prototype.toString = function Headers__toString () {
	var headers = new Array();
	for (var key in this._Headers) {
		var headerSet = this._Headers[key];
		for (var i = 0; i < headerSet.length; i++) {
			headers.push(headerSet[i].toString());
		}
	}
	headers.push("");
	return(headers.join("\r\n"));
}

/**
 * Gets all headers that match the name specified
 * @param {String} name The header name to search for
 * @returns Header[]
 */
Headers.prototype.Get = function Headers__Get (name) {
	var newSet = new Array();

	var headerSet = this._Headers[name.toLowerCase()];
	if (headerSet != null)
		for (var i = 0; i < headerSet.length; i++)
			newSet.push(new Header(headerSet[i].GetName(), headerSet[i].GetValue()));

	return(newSet);
}

/**
 * Gets all headers found in the collection
 * @returns Header[]
 */
Headers.prototype.GetAll = function Headers__GetAll () {
	var newSet = new Array();

	for (var i = 0; i < this._Headers.length; i++)
		newSet.push(new Header(this._Headers[i].GetName(), this._Headers[i].GetValue()));

	return(newSet);
}

/** @ignore */
Headers.prototype.CheckIfOkToModify = function Headers__CheckIfOkToModify () {
	if (this._HeadersSent)
		throw new ExHeadersAlreadyWritten();
}

/**
 * Adds a header to the collection. Does not replace any existing headers with the same name
 * @param {String} name The name of the header
 * @param {String} value The header's content
 * @throws ExHeadersAlreadyWritten
 */
Headers.prototype.Add = function Headers__Add (name, value) {
	this.CheckIfOkToModify();
	if (this._Headers[name.toLowerCase()] == null)
		this.Set(name, value);
	else
		this._Headers[name.toLowerCase()].push(new Header(name, value));
}

/**
 * Adds a header to the collection. Replaces any existing headers with the same name
 * @param {String} name The name of the header
 * @param {String} value The header's content
 * @throws ExHeadersAlreadyWritten
 */
Headers.prototype.Set = function Headers__Set (name, value){
	this.CheckIfOkToModify();
	this._Headers[name.toLowerCase()] = new Array();
	this._Headers[name.toLowerCase()].push(new Header(name, value));
}

/**
 * Removes all headers from the collection that match the name specified
 * @param {String} name The header name to search for
 * @throws ExHeadersAlreadyWritten
 */
Headers.prototype.Remove = function Headers__Remove (name) {
	this.CheckIfOkToModify();
	delete this._Headers[name.toLowerCase()];
}

/**
 * Removes all headers from the collection
 * @throws ExHeadersAlreadyWritten
 */
Headers.prototype.Clear = function Headers__Clear () {
	this.CheckIfOkToModify();
	delete this._Headers[name.toLowerCase()];
}
