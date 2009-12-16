
(function () {

	// This is needed because item.constructor becomes inaccessible,
	//  meaning (item instanceof Array) is always false
	function isArray (item) {
		if ((typeof item) != "object")
			return(false);
		if ((typeof item.length) != "number")
			return(false);
		if ((typeof item.join) != "function")
			return(false);
		if ((typeof item.push) != "function")
			return(false);
		if ((typeof item.pop) != "function")
			return(false);
		if ((typeof item.shift) != "function")
			return(false);
		if ((typeof item.unshift) != "function")
			return(false);
		return(true);
	}

	function WrapFunction (context, functionName) {
		return(function () {
			var retVal = context[functionName].apply(context, arguments);
			if (retVal == null) {
				return(null);
			}

			if (isArray(retVal)) {
				var tmpArray = retVal;
				retVal = new Array();
				for (var i = 0; i < tmpArray.length; i++)
					if ((!(tmpArray[i] instanceof SandBoxer)) && ((typeof tmpArray[i]) == "object"))
						retVal[i] = new SandBoxer(tmpArray[i]);
					else
						retVal[i] = tmpArray[i];
			}
			else if ((typeof retVal) == "object") {
				if (!(retVal instanceof SandBoxer))
					retVal = new SandBoxer(retVal);
			}

			return(retVal);
		});
	}

	function WrapProperty (context, functionName) {
		return(function () {
			var retVal = context[functionName].apply(context, arguments);
			//var keys = [];
			//for (var key in retVal)
			//	keys.push(key);
			//log("DEB: " + functionName + " : " + (retVal instanceof Array) + " : " + retVal + " : " + keys.join(","));
			//if (functionName == "Get")
			//	log(retVal[0].GetValue());
			if (retVal instanceof Array) {
				var tmpArray = retVal;
				retVal = [];
				for (var i = 0; i < tmpArray.length; i++)
					if (!(tmpArray[i] instanceof SandBoxer))
						retVal[i] = new SandBoxer(tmpArray[i]);
			}
			else if ((typeof retVal) == "object") {
				if (!(retVal instanceof SandBoxer))
					retVal = new SandBoxer(retVal);
			}
			return(retVal);
		});
	}

	function SandBoxer (original) {
		//TODO: check for __sandboxed__ before wrapping
		//this.__sandboxed__ = true;
		for (var key in original) {
			try {
				//TODO: Implement WrapProperty (or just block access to raw properties?)
				if (key.indexOf("_") != 0)
					this[key] = original[key];
				if ((typeof original[key]) == "function") {
					this[key] = WrapFunction(original, key);
				}
				/*
				else {
					if ((typeof original[key]) == "object") {
						//TODO: recurse through properties
						Response.Log("Property: " + key + " : " + (typeof original[key]));
					}
				}
				*/
				/*
				else {
					//this[key] = original[key];
				}
				*/
			} catch (ex) {
				var getKey = "Get" + key;
				if ((original[getKey] != null) && ((typeof original[getKey]) == "function"))
					this.__defineGetter__(key, WrapFunction(original, getKey));
	
				var setKey = "Set" + key;
				if ((original[setKey] != null) && ((typeof original[setKey]) == "function"))
					this.__defineSetter__(key, WrapFunction(original, setKey));
			}
		}
	}

	for (var key in this) {
		try {
			if ((typeof this[key]) == "object") {
				if (!(this[key] instanceof SandBoxer))
					this[key] = new SandBoxer (this[key]);
			}
		} catch (ex) { Response.Log("SANDBOXER ERROR: " + ex + "\r\n"); }
	}

})();
