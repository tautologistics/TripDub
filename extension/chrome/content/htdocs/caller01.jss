<?js
Response.ContentType = "text/plain";

function HttpServer$Log () {
	Log("test");
}

function Log (msg) {
	var prefix = arguments.callee.name;
	if (arguments.callee != null && arguments.callee.caller != null) {
		if (!(new RegExp("\\$?" + arguments.callee.name + "$", "gi")).test(arguments.callee.caller.name)) {
			Response.Write("a");
			prefix = arguments.callee.caller.name + "(" +  arguments.callee.caller.arguments.length + ")";
		} else {
			if (arguments.callee.caller.caller != null) {
				Response.Write("b");
				prefix = arguments.callee.caller.caller.name + "(" +  arguments.callee.caller.caller.arguments.length + ")";
			}
		}
	}
	Response.Write("[" + prefix + "] " + msg + "\r\n");
}

function Foo (msg) {
	HttpServer$Log(msg);
}

Foo(1);

?>