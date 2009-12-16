/**
 * @fileoverview Contains the Cookie and Cookies collection classes
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new cookie
 * @constructor
 * @class Represents a single request or response cookie
 * @param {String} name Name of the cookie being created
 * @requires Querystring
 */
function Cookie (name) {
	/** @ignore */
	this._Name = name;
	/** @ignore */
	this._Data = new Querystring();
	/** @ignore */
	this._Domain = "";
	/** @ignore */
	this._Path = "";
	/** @ignore */
	this._Secure = false;
	/** @ignore */
	this._Expires = 0;
}

/**
 * Gets the current name of the cookie
 * @type String 
 */
Cookie.prototype.GetName = function Cookie__GetName () { return(this._Name); }
/**
 * The cookie's name
 * @type String
 */
Cookie.prototype.__defineGetter__("Name", Cookie.prototype.GetName);

/**
 * Gets the cookie's data
 * @type Querystring 
 */
Cookie.prototype.GetData = function Cookie__GetData () { return(this._Data); }
/**
 * Sets the cookie's data
 * @param {String|Querystring} value Any string (querystring formatted or not) or a Querystring instance 
 */
Cookie.prototype.SetData = function Cookie__SetData (value) { this._Data.Parse(value); }
/**
 * The cookie's data
 * @type Querystring
 */
Cookie.prototype.__defineGetter__("Data", Cookie.prototype.GetData);
Cookie.prototype.__defineSetter__("Data", Cookie.prototype.SetData);

/**
 * Gets the cookie's data as originally formatted
 * @type String
 */
Cookie.prototype.GetRawData = function Cookie__GetRawData () { return(this._Data.toString()); }
/**
 * Sets the cookie's data exactly as formatted
 * @param {String} value Raw cookie data
 */
Cookie.prototype.SetRawData = function Cookie__SetRawData (value) { this._Data.Parse(value); }
/**
 * The cookie's unformatted raw data
 * @type String
 */
Cookie.prototype.__defineGetter__("RawData", Cookie.prototype.GetRawData);
Cookie.prototype.__defineSetter__("RawData", Cookie.prototype.SetRawData);

/**
 * Gets the cookie's path
 * @type String
 */
Cookie.prototype.GetPath = function Cookie__GetPath () { return(this._Path); }
/**
 * Sets the cookie's path
 * @param {String} value Cookie path
 */
Cookie.prototype.SetPath = function Cookie__SetPath (value) { this._Path = value; }
/**
 * The cookie's path
 * @type String
 */
Cookie.prototype.__defineGetter__("Path", Cookie.prototype.GetPath);
Cookie.prototype.__defineSetter__("Path", Cookie.prototype.SetPath);

/**
 * Gets the cookie's domain
 * @type String
 */
Cookie.prototype.GetDomain = function Cookie__GetDomain () { return(this._Domain); }
/**
 * Sets the cookie's domain
 * @param {String} value Cookie domain
 */
Cookie.prototype.SetDomain = function Cookie__SetDomain (value) { this._Domain = value; }
/**
 * The cookie's domain
 * @type String
 */
Cookie.prototype.__defineGetter__("Domain", Cookie.prototype.GetDomain);
Cookie.prototype.__defineSetter__("Domain", Cookie.prototype.SetDomain);

/**
 * Gets value indicating if cookie is secure
 * @type Boolean
 */
Cookie.prototype.GetSecure = function Cookie__GetSecure () { return(this._Secure); }
/**
 * Sets value indicating if cookie is secure
 * @param {Boolean} value Flag indicating cookie is secure or not
 */
Cookie.prototype.SetSecure = function Cookie__SetSecure (value) { this._Secure = !!value; }
/**
 * Flag indicating if cookie is secure
 * @type Boolean
 */
Cookie.prototype.__defineGetter__("Secure", Cookie.prototype.GetSecure);
Cookie.prototype.__defineSetter__("Secure", Cookie.prototype.SetSecure);

/**
 * Gets the cookie's expiration date as unix timestamp
 * @type Int
 */
Cookie.prototype.GetExpiresEpoch = function Cookie__GetExpiresEpoch () { return(this._Expires); }
/**
 * Sets the cookie's expiration date as unix timestamp
 * @param {Int} value Cookie expiration time (for session cookies pass 0 or null)
 */
Cookie.prototype.SetExpiresEpoch = function Cookie__SetExpiresEpoch (value) { this._ExpiresEpoch = value; }
/**
 * The cookie's expiration as unix timestamp
 * @type Int
 */
Cookie.prototype.__defineGetter__("ExpiresEpoch", Cookie.prototype.GetExpiresEpoch);
Cookie.prototype.__defineSetter__("ExpiresEpoch", Cookie.prototype.SetExpiresEpoch);

/**
 * Gets the cookie's expiration date as GMT formatted string
 * @type String
 */
Cookie.prototype.GetExpiresDate = function Cookie__GetExpiresDate () {
	var exp = new Date();
	exp.setTime(this._Expires * 1000);
	return(exp.toGMTString());
}
/**
 * Sets the cookie's expiration time
 * @param {Date|String} value Cookie expiration time
 */
Cookie.prototype.SetExpiresDate = function Cookie__SetExpiresDate (value) {
	try {
		value = new Date(value);
		this._Expires = Math.round(value.getTime() / 1000.0);
	}
	catch (ex) { this._Expires = 0; }
}
/**
 * The cookie's expiration as a GMT formatted string
 * @type Date|String
 */
Cookie.prototype.__defineGetter__("ExpiresDate", Cookie.prototype.GetExpiresDate);
Cookie.prototype.__defineSetter__("ExpiresDate", Cookie.prototype.SetExpiresDate);

/**
 * Formats the cookie as a valid HTTP header value
 * @type String
 */
Cookie.prototype.toString = function Cookie__toString () {
	var retVal = escape(this._Name) + "=" + escape(this._Data.toString());
	//TODO: escape these?
	if (this._Path != "")
		retVal += "; path=" + this._Path;
	if (this._Domain != "")
		retVal += "; domain=" + this._Domain;
	if (this._Secure)
		retVal += "; secure=" + this._Secure;
	if (this._Expires > 0)
		retVal += "; expires=" + this.GetExpiresDate();

	return(retVal);
}

/**
 * Creates a new cookies collection
 * @constructor
 * @class Represents a collection of request or response cookies
 * @requires Cookie
 */
function Cookies () {
	/** @ignore */
 	this._cookies = [];
 }

/**
 * Parses an HTTP cookie header and loads the cookies into the collection
 * @param {Headers} headers Headers collection containing the cookie data to parse
 */
Cookies.prototype.Parse = function Cookies__Parse (headers) {
	//TODO: split this into a Cookie.Parse function
	var cookieHeaders = headers.Get("cookie");

	while (cookieHeaders.length) {
		var cookieHeader = cookieHeaders.shift();
		var cookies = cookieHeader.GetValue().split(/(?:;\s*)/);
		while (cookies.length) {
			var cookie = cookies.shift();
			var pieces = cookie.split(/=/);
			var key = unescape(pieces.shift());
			this.Set(key, unescape(pieces.join('=')));
		}
	}
}

/**
 * Writes out the cookie collection to a Headers collection
 * @param {Headers} headers Headers collection to add the cookie headers to
 */
Cookies.prototype.Write = function Cookies__Write (headers) {
	for (key in this._cookies) {
		headers.Add("Set-Cookie", this._cookies[key].toString());
	}
}

/**
 * Fetches a cookie from the collection. If the name is not found, a new cookie with that name is added to the collection and returned
 * @param {String} name The cookie name to search for
 * @type Cookie
 */
Cookies.prototype.Get = function Cookies__Get (name) {
	var key = name.toString().toLowerCase();
	var cookie = this._cookies[key]
	if (cookie == null) {
		cookie = new Cookie(name);
		this._cookies[key] = cookie
	}
	return(cookie);
}

/**
 * Fetches all the cookies in the collection
 * @type Cookies[]
 */
Cookies.prototype.GetAll = function Cookies__GetAll () {
	var newSet = new Array();

	for (var key in this._cookies)
		newSet.push(this._cookies[key]);

	return(newSet);
}

/**
 * Adds or replaces a cookie in the collection
 * @param {String} name Name of the cookie
 * @param {String|Cookie} value Cookie instance or HTTP header formatted cookie data
 * @type Cookie
 */
Cookies.prototype.Set = function Cookies__Set (name, value) {
	var cookie = this.Get(name);

	cookie.GetData().Parse(value);

	return(cookie);
}

//TODO: add Cookies.Add(<Cookie> cookie) [with a check for parameter type]

/**
 * Removes a cookie from the collection
 * @param {String} name Name of the cookie to remove
 */
Cookies.prototype.Remove = function Cookies__Remove (name) {
	delete this._cookies[name.toString().toLowerCase()];
}

/**
 * Clears all cookies from the collection
 */
Cookies.prototype.Clear = function Cookies__Clear () {
	this._cookies = [];
}
