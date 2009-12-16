/**
 * @fileoverview Contains the Querystring class
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new Querystring instance
 * @constructor
 * @class A collection of name/value pairs that can parse from an HTTP querystring format string and also serialize to one
 * @param {String} data The querystring formatted data to parse and load into the collection
 */
function Querystring (data) {
	if (data != null)
		this.Parse(data);
	else
		/** @ignore */
		this._pairs = {};
}

/**
 * Parses an HTTP querystring formatted string and loads it into the collection
 * @param {String} data The querystring formatted data to parse and load into the collection
 */
Querystring.prototype.Parse = function Querystring__Parse (data) {
	this._pairs = {};

	if (data == null)
		return;

	var pairs = data.split(/&/);
	while (pairs.length > 0) {
		var pair = pairs.shift();
		if (pair == "")
			continue;
		var parts = pair.split(/=/);
		if (parts.length == 1)
			parts[1] = "";
		//TODO: refactor unescaping
		var name = unescape(parts.shift().replace(/\+/g, ' '));
		var value = unescape(parts.join('=').replace(/\+/g, ' '));
		this._pairs[name] = value;
	}
}

/** @ignore */
Querystring.prototype.toString = function Querystring__toString () {
	var pairs = [];
	for (var key in this._pairs) {
		//TODO: refactor escaping
		if (this._pairs[key] == "")
			pairs.push(escape(key).replace(/ /g, '+'));
		else
			pairs.push(escape(key).replace(/ /g, '+') + "=" + escape(this._pairs[key]).replace(/ /g, '+'));
	}
	return(pairs.join("&"));
}

/**
 * Gets the value for the specified name
 * @param {String} name The name to fetch the value for
 */
Querystring.prototype.Get = function Querystring__Get (name) {
	return((this._pairs[name] == null) ? "" : this._pairs[name]);
}

/**
 * Assigns a value to the specified name
 * @param {String} name The name to assign the value to
 * @param {String} value The value to assign to the name
 */
Querystring.prototype.Set = function Querystring__Set (name, value){
	this._pairs[name] = value;
}

/**
 * Removes a name/value pair from the collection
 * @param {String} name Name of the pair to remove
 */
Querystring.prototype.Remove = function Querystring__Remove (name){
	delete this._pairs[name];
}

/**
 * Clears all name/value pairs from the collection
 */
Querystring.prototype.Clear = function Querystring__Clear (name){
	delete this._pairs[name];
}
