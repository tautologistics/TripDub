function Log (data) {
	var currentThread = Components.classes["@mozilla.org/thread-manager;1"]
		.getService()
		.currentThread;

	Components.classes["@mozilla.org/consoleservice;1"]
		.getService(Components.interfaces.nsIConsoleService)
		.logStringMessage('(' + currentThread.priority + ') Log: ' + data);
}

Log("Hello");
