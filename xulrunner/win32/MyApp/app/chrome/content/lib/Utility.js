/**
 * @fileoverview Contains the Utility class, which is a catchall for helpful functions
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Does nothing
 * @constructor
 * @class A collection of helpful functions that don't fit elsewhere
 */
function Utility () {};

/**
 * Clones an exception and makes sure it has value toString() method
 * @param {Object} ex The exception to copy
 * @type Object
 */
Utility.CopyException = function Utility$CopyException(ex){
	var newEx = {};

	for (var key in ex) {
		if ((typeof ex[key]) != "function") {
			newEx[key] = ex[key];
		}
	}
	var toString = ex.toString();
	newEx.toString = function () { return(toString); }

	return(newEx);
}

//TODO: add datetime util to make HTTP formatted timestamps (for cookies and expiration headers)
