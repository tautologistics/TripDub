/**
 * @fileoverview Contains the Request Class
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new Request instance
 * @constructor
 * @class Represents an HTTP request message
 * @requires Headers
 * @requires Querystring
 * @requires Cookies
 */
function Request () {
	/** @ignore */
	this._headersComplete = false;

	/** @ignore */
	this._RawRequest = "";
	/** @ignore */
	this._RawHeaders = "";
	/** @ignore */
	this._Headers = new Headers();
	/** @ignore */
	this._RawQuerystring = "";
	/** @ignore */
	this._Querystring = new Querystring();
	/** @ignore */
	this._RawBody = "";
	/** @ignore */
	this._Form = new Querystring();
	/** @ignore */
	this._Cookies = new Cookies(); //TODO: Cookies

	/** @ignore */
	this._Method = "GET";
	/** @ignore */
	this._Url = "/";
	/** @ignore */
	this._HttpVersion = "HTTP/1.0";
	/** @ignore */
	this._Path = "/";
	/** @ignore */
	this._CurrentPath = "/";
}

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
Request.prototype.Log = function Request__Log (data) { if (typeof Log == "function") { Log(data); } };

/**
 * Gets the raw HTTP request as sent by the client
 * @type String
 */
Request.prototype.GetRawRequest = function Request__GetRawRequest () { return(this._RawRequest); }
/**
 * The raw HTTP request as sent by the client
 * @type String
 */
Request.prototype.__defineGetter__("RawRequest", Request.prototype.GetRawRequest);

/**
 * Gets the headers collection for the request
 * @type Headers
 */
Request.prototype.GetHeaders = function Request__GetHeaders () { return(this._Headers); }
/**
 * The headers collection for the request
 * @type Headers
 */
Request.prototype.__defineGetter__("Headers", Request.prototype.GetHeaders);

/**
 * Gets the raw headers as sent by the client
 * @type String
 */
Request.prototype.GetRawHeaders = function Request__GetRawHeaders () { return(this._RawHeaders); }
/**
 * The raw headers as sent by the client
 * @type String
 */
Request.prototype.__defineGetter__("RawHeaders", Request.prototype.GetRawHeaders);

/**
 * Gets the querystring (GET) data
 * @type Querystring
 */
Request.prototype.GetQuerystring = function Request__GetQuerystring () { return(this._Querystring); }
/**
 * The querystring (GET) data
 * @type Querystring
 */
Request.prototype.__defineGetter__("Querystring", Request.prototype.GetQuerystring);

/**
 * Gets the raw querystring (GET) as sent by the client
 * @type String
 */
Request.prototype.GetRawQuerystring = function Request__GetRawQuerystring () { return(this._RawQuerystring); }
/**
 * The raw querystring (GET) as sent by the client
 * @type String
 */
Request.prototype.__defineGetter__("RawQuerystring", Request.prototype.GetRawQuerystring);

/**
 * Gets the request (POST) body data
 * @type Querystring
 */
Request.prototype.GetForm = function Request__GetForm () { return(this._Form); }
/**
 * The request (POST) body data
 * @type Querystring
 */
Request.prototype.__defineGetter__("Form", Request.prototype.GetForm);

/**
 * Gets the raw request (POST) body data
 * @type String
 */
Request.prototype.GetRawBody = function Request__GetRawBody () { return(this._RawBody); }
/**
 * The raw request (POST) body data
 * @type String
 */
Request.prototype.__defineGetter__("RawBody", Request.prototype.GetRawBody);

/**
 * Gets the cookies collection for the request
 * @type Cookies
 */
Request.prototype.GetCookies = function Request__GetCookies () { return(this._Cookies); }
/**
 * The cookies collection for the request
 * @type Cookies
 */
Request.prototype.__defineGetter__("Cookies", Request.prototype.GetCookies);

/**
 * Gets the request method
 * @type String
 */
Request.prototype.GetMethod = function Request__GetMethod () { return(this._Method); }
/**
 * The request method
 * @type String
 */
Request.prototype.__defineGetter__("Method", Request.prototype.GetMethod);

/**
 * Gets the URL (path + querystring) of the request
 * @type String
 */
Request.prototype.GetUrl = function Request__GetUrl () { return(this._Url); }
/**
 * The URL (path + querystring) of the request
 * @type String
 */
Request.prototype.__defineGetter__("Url", Request.prototype.GetUrl);

/**
 * Gets the version of the HTTP request
 * @type Float
 */
Request.prototype.GetHttpVersion = function Request__GetHttpVersion () { return(this._HttpVersion); }
/**
 * The version of the HTTP request
 * @type Float
 */
Request.prototype.__defineGetter__("HttpVersion", Request.prototype.GetHttpVersion);

/**
 * Gets the path portion of the HTTP request
 * @type String
 */
Request.prototype.GetPath = function Request__GetPath () { return(this._Path); }
/**
 * The path portion of the HTTP request
 * @type String
 */
Request.prototype.__defineGetter__("Path", Request.prototype.GetPath);

/**
 * Gets the current path as the HTTP server maps it
 * @type String
 */
Request.prototype.GetCurrentPath = function Request__GetCurrentPath () { return(this._CurrentPath); }
/**
 * Sets the current path as the HTTP server maps it
 * @type String
 */
Request.prototype.SetCurrentPath = function Request__SetCurrentPath (value) { this._CurrentPath = value; }
/**
 * The current path as the HTTP server maps it
 * @type String
 */
Request.prototype.__defineGetter__("CurrentPath", Request.prototype.GetCurrentPath);
Request.prototype.__defineSetter__("CurrentPath", Request.prototype.SetCurrentPath);

/**
 * Gets the length of the request body
 * @type Integer
 */
Request.prototype.GetContentLength = function Request__GetContentLength () {
	var headers = this.GetHeaders().Get("Content-length");
	return((headers.length > 0) ? headers[0].GetValue() : 0);
}
/**
 * The length of the request body
 * @type Integer
 */
Request.prototype.__defineGetter__("ContentLength", Request.prototype.GetContentLength);

/**
 * Gets the MIME type of the request
 * @type String
 */
Request.prototype.GetContentType = function Request__GetContentType () {
	var headers = this.GetHeaders().Get("Content-type");
	return((headers.length > 0) ? headers[0].GetValue() : "");
}
/**
 * The MIME type of the request
 * @type String
 */
Request.prototype.__defineGetter__("ContentType", Request.prototype.GetContentType);

/** @ignore */
Request.prototype.ParseChunk = function Request__ParseChunk (data) {
	if (data != null && data.length) {
		this._RawRequest += data;
	}
	if (!this._RawRequest.match(/(\r\n\r\n|\r\r|\n\n)/)) {
		return(false);
	}

	if (!this._headersComplete) {
		[this._RawHeaders, this._RawBody] = this._RawRequest.split(/(?:\r\n\r\n|\r\r|\n\n)/);

		var headers = this._RawHeaders.split(/(?:\r\n|\r|\n)/);
		if (!headers.length)
			throw(new Exception("Unable to find headers in request [[" + this._RawHeaders + "]]"));
	
		[this._Method, this._Url, this._HttpVersion] = headers.shift().split(/\s+/);
		if (this._Method == null || this._Url == null || this._HttpVersion == null)
			throw("Unable to find request method and url [["+ headers[0] +"]]");

		this._Method = this._Method.toUpperCase();

		if (this._Url.indexOf("?") > 0) {
			[this._Path, this._RawQuerystring] = this._Url.split(/\?/);
		}
		else {
			this._Path = this._Url;
			this._RawQuerystring = "";
		}
		this._CurrentPath = this._Path;
		this.GetQuerystring().Parse(this._RawQuerystring);

		this.GetHeaders().Parse(headers);

		this.GetCookies().Parse(this.GetHeaders());

		this._headersComplete = true;
	}
	else {
		this._RawBody += sData;
	}

	if (
		(this._Method == "POST")
		&&
		(this.GetContentLength() <= this._RawBody.length)
		&&
		(this.ContentType.toLowerCase().indexOf("application/x-www-form-urlencoded") > -1)
		){
		this.GetForm().Parse(this._RawBody);
	}

	return(
		this._headersComplete &&
		(
			this.GetContentLength() == 0
			||
			this.GetContentLength() <= this._RawBody.length
			)
		);
}
