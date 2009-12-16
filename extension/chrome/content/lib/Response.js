/**
 * @fileoverview Contains the Response Class
 * @author ChrisWinberry
 * @version 0.8.0
 */

//TODO: Use XPCSafeJSObjectWrapper to protect data being written

/**
 * Creates a new ExResponseEnd instance
 * @constructor
 * @class An exception indicating that the processing of the response to the client is done
 */
function ExResponseEnd () {
	/** @ignore */
	this.code = 1;
	/** @ignore */
	this.msg = "Response ended";
}
/** @ignore */
ExResponseEnd.prototype.toString = function ExResponseEnd__toString () {
	return("[" + this.code + "] " +  this.msg);
}

/**
 * Creates a new Response instance
 * @constructor
 * @class Represents an HTTP response message
 * @requires Headers
 * @requires Querystring
 * @requires Cookies
 * @requires ExResponseEnd
 */
function Response (connHandler) {
	/** @ignore */
	this._connHandler = connHandler;
	/** @ignore */
	this._output = [];

	/** @ignore */
	this._Ended = false;
	/** @ignore */
	this._Cookies = new Cookies(); //TODO: copy Request.Cookies and track changes
	/** @ignore */
	this._Buffer;
	/** @ignore */
	this.SetBuffer(true);
	/** @ignore */
	this._Headers = new Headers(); //TODO: Warn when headers modified after sending
	/** @ignore */
	this._ContentLength;
	/** @ignore */
	this.SetContentLength(0);
	/** @ignore */
	this._StatusCode;
	/** @ignore */
	this._StatusMsg;
	/** @ignore */
	this.SetStatusCode(200);
	/** @ignore */
	this.SetContentType("text/html");
}

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
Response.prototype.Log = function Response__Log (data) { if (typeof Log == "function") { Log(data); } };

/** @ignore */
Response.StatusMessages = {
	0: "Wat?",
	200: "OK",
	301: "Moved Permanently",
	302: "Found",
	304: "Not Modified",
	400: "Bad Request",
	401: "Unauthorized",
	403: "Forbidden",
	404: "Not Found",
	405: "Method Not Allowed",
	500: "Internal Server Error",
	501: "Not Implemented",
	503: "Service Unavailable",
	505: "HTTP Version Not Supported"
};

/**
 * Gets the flag indicating whether the processing of the response is done
 * @type Boolean
 */
Response.prototype.GetEnded = function Response__GetEnded () { return(this._Ended); }
/**
 * Flag indicating whether the processing of the response is done
 * @type Boolean
 */
Response.prototype.__defineGetter__("Ended", Response.prototype.GetEnded);

/**
 * Gets the response cookie collection
 * @type Cookies
 */
Response.prototype.GetCookies = function Response__GetCookies () { return(this._Cookies); }
/**
 * The response cookie collection
 * @type Cookies
 */
Response.prototype.__defineGetter__("Cookies", Response.prototype.GetCookies);

/**
 * Gets the flag indicating whether response data is written immediately to the client (false) or buffered (false)
 * @type Boolean
 */
Response.prototype.GetBuffer = function Response__GetBuffer () { return(this._Buffer); }
/**
 * Sets the flag indicating whether response data is written immediately to the client (false) or buffered (false)
 * @param {Boolean} value Value to set the flag to
 */
Response.prototype.SetBuffer = function Response__SetBuffer (value) { this._Buffer = !!value; }
/**
 * Flag indicating whether response data is written immediately to the client (false) or buffered (false)
 * @type Boolean
 */
Response.prototype.__defineGetter__("Buffer", Response.prototype.GetBuffer);
Response.prototype.__defineSetter__("Buffer", Response.prototype.SetBuffer);

/**
 * Gets the response headers collection
 * @type Headers
 */
Response.prototype.GetHeaders = function Response__GetHeaders () { return(this._Headers); }
/**
 * The response headers collection
 * @type Headers
 */
Response.prototype.__defineGetter__("Headers", Response.prototype.GetHeaders);

/**
 * Gets the numeric value of the HTTP response status
 * @type Integer
 */
Response.prototype.GetStatusCode = function Response__GetStatusCode () { return(this._StatusCode); }
/**
 * Sets the numeric value of the HTTP response status. Setting this value also modifies the {@link #StatusMsg}
 * @type Integer
 */
Response.prototype.SetStatusCode = function Response__SetStatusCode (value) {
	this._StatusCode = value;
	this.SetStatusMsg(Response.StatusMessages[(Response.StatusMessages[value] == null) ? 0 : value]);
}
/**
 * The numeric value of the HTTP response status. Setting this value also modifies the {@link #StatusMsg}
 * @type Integer
 */
Response.prototype.__defineGetter__("StatusCode", Response.prototype.GetStatusCode);
Response.prototype.__defineSetter__("StatusCode", Response.prototype.SetStatusCode);

/**
 * Gets the text description of the HTTP response status
 * @type String
 */
Response.prototype.GetStatusMsg = function Response__GetStatusMsg () { return(this._StatusMsg); }
/**
 * Sets the text description of the HTTP response status
 * @param {String} value The value to set the status message to
 */
Response.prototype.SetStatusMsg = function Response__SetStatusMsg (value) { this._StatusMsg = value; }
/**
 * Text description of the HTTP response status
 * @type String
 */
Response.prototype.__defineGetter__("StatusMsg", Response.prototype.GetStatusMsg);
Response.prototype.__defineSetter__("StatusMsg", Response.prototype.SetStatusMsg);

/**
 * Gets the MIME type of the response content
 * @type String
 */
Response.prototype.GetContentType = function Response__GetContentType () { return(this.GetHeaders().Get("Content-type")[0].value); }
/**
 * Sets the MIME type of the response content. Setting this value modifies the {@link #Headers} collection by adding/modifying the "Content-type" header
 * @param {String} value The MIME type to set the "Content-type" header to
 */
Response.prototype.SetContentType = function Response__SetContentType (value) { this.GetHeaders().Set("Content-type", value); }
/**
 * The MIME type of the response content. Changing this value modifies the {@link #Headers} collection by adding/modifying the "Content-type" header
 * @type String
 */
Response.prototype.__defineGetter__("ContentType", Response.prototype.GetContentType);
Response.prototype.__defineSetter__("ContentType", Response.prototype.SetContentType);

//TODO: add Expires and CacheControl helper properties

/**
 * Gets the current length of the response body
 * @type Integer
 */
Response.prototype.GetContentLength = function Response__GetContentLength () { return(this._ContentLength); }
/**
 * Sets the current length of the response body. Setting this value modifies the {@link #Headers} collection by adding/modifying the "Content-length" header
 * @param {Integer} value The value to set the "Content-length" header to
 */
Response.prototype.SetContentLength = function Response__SetContentLength (value) { this._ContentLength = value; }
/**
 * The current length of the response body. Changing this value modifies the {@link #Headers} collection by adding/modifying the "Content-length" header
 * @type Integer
 */
Response.prototype.__defineGetter__("ContentLength", Response.prototype.GetContentLength);
Response.prototype.__defineSetter__("ContentLength", Response.prototype.SetContentLength);

/**
 * Creates an HTTP redirect response (302) for the client. Calling this value modifies the {@link #Headers} collection by adding/modifying/removing the "Location" header
 * @param {String} location The URL to redirect the client to. If this value is null then the redirect is canceled ("Location" header removed and {@link #StatusCode} set to 200)
 */
Response.prototype.Redirect = function Response__Redirect (location) {
	if (this._Ended)
		return;

	if (location != null) {
		this.GetHeaders().Set("Location", location);
		this.SetStatusCode(302);
	} else {
		this.GetHeaders().Remove("Location");
		this.SetStatusCode(200);
	}
}

/**
 * Ends the current response processing, flushes any buffered response to the client, and returns control to the server/handler
 * @throws ExResponseEnd
 */
Response.prototype.End = function Response__End () {
	if (this._Ended)
		return;

	if (!this.GetHeaders().GetHeadersSent())
		this.GetHeaders().Set("Content-length", this.GetContentLength());

	this._Ended = true;

	this.Flush();

	throw new ExResponseEnd();
}

/**
 * Writes the provided data to the response body. If {@link #Buffer} is set to True then it is appended to the buffer, otherwise it is written directly to the client
 * @param {String} data The data to write to the response body
 */
Response.prototype.Write = function Response__Write (data) {
	if (this._Ended)
		return; //TODO: Throw exception?

	if (data == null)
		return;

	if (data != null && (typeof data.toString) == 'function')
		this.SetContentLength(this.GetContentLength() + data.toString().length);

	if (this.GetBuffer()) {
		this._output.push(data);
	}
	else {
		this.Flush();
		this._connHandler.Write(data);
	}
}

/**
 * Forces any data in the buffer to be immediately written to the client 
 */
Response.prototype.Flush = function Response__Flush () {
	// TODO: Warn when headers are set after being sent
	if (!this.GetHeaders().GetHeadersSent()) {
		if (!this._Ended)
			this.GetHeaders().Add("Connection", "close");
		this._connHandler.Write(this.RenderHeaders());
		this.GetHeaders().SetHeadersSent(true);
	}

	if (this._output.length) {
		this._connHandler.Write(this._output.join(''));
		this._output = new Array();
	}
}

/**
 * Clears any data still in the buffer
 */
Response.prototype.Clear = function Response__Clear () {
	if (this._Ended)
		return; //TODO: Throw exception?

	this._output = new Array();
}

/** @ignore */
Response.prototype.RenderStatus = function Response__RenderStatus () {
	//TODO: Handle 1.0 vs 1.1 correctly
	return(
		"HTTP/1.1 "
		+ this.GetStatusCode()
		+ " "
		+ this.GetStatusMsg()
		+ "\r\n"
		);
}

/** @ignore */
Response.prototype.RenderHeaders = function Response__RenderHeaders () {
	this.GetCookies().Write(this.GetHeaders());
	return(this.RenderStatus() + this.GetHeaders() + "\r\n");
}
