
function Log (data) {
	var prefix = arguments.callee.name;
	if (arguments.callee != null && arguments.callee.caller != null) {
		if (!(new RegExp("(\\$|__)?" + arguments.callee.name + "$", "gi")).test(arguments.callee.caller.name)) {
			prefix = arguments.callee.caller.name.replace(/([a-z0-9])(\$|__)([a-z0-9])/ig, "$1.$3") + "(" +  arguments.callee.caller.arguments.length + ")";
		} else {
			if (arguments.callee.caller.caller != null) {
				prefix = arguments.callee.caller.caller.name.replace(/([a-z0-9])(\$|__)([a-z0-9])/ig, "$1.$3") + "(" +  arguments.callee.caller.caller.arguments.length + ")";
			}
		}
	}
	
//	var currentThread = Components.classes["@mozilla.org/thread-manager;1"]
//		.getService()
//		.currentThread;

	Components.classes["@mozilla.org/consoleservice;1"]
		.getService(Components.interfaces.nsIConsoleService)
//		.logStringMessage('(' + currentThread.priority + ') [' + prefix + ']: ' + data);
		.logStringMessage('[' + prefix + '] ' + data);
}

function LoadScript (script, context) {
//	Log("LoadScript: " + script);
	if (context == null)
		context = this;

	try {
		//Components.utils.import(script, context);
		Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
			.getService(Components.interfaces.mozIJSSubScriptLoader)
			.loadSubScript(script, context);
	} catch (ex) {
		Log("Error: " + ex);
		return(false);
	}

	return(true);
}

/*
LoadScript("chrome://myapp/content/lib/HttpServer.js");
//*/
//*
LoadScript("chrome://myapp/content/lib/Utility.js");
LoadScript("chrome://myapp/content/lib/AsyncListener.js");
LoadScript("chrome://myapp/content/lib/HttpServer.js");
LoadScript("chrome://myapp/content/lib/ThreadJob.js");
LoadScript("chrome://myapp/content/lib/ThreadSuicide.js");
LoadScript("chrome://myapp/content/lib/ConnectionHandler.js");
LoadScript("chrome://myapp/content/lib/VirtualPath.js");
LoadScript("chrome://myapp/content/lib/App.js");
LoadScript("chrome://myapp/content/lib/Module.js");
LoadScript("chrome://myapp/content/lib/Headers.js");
LoadScript("chrome://myapp/content/lib/Querystring.js");
LoadScript("chrome://myapp/content/lib/Cookies.js");
LoadScript("chrome://myapp/content/lib/Request.js");
LoadScript("chrome://myapp/content/lib/Response.js");
LoadScript("chrome://myapp/content/lib/Database.js");
//*/

(function () {
	var ioService = Components.classes["@mozilla.org/network/io-service;1"]
		.getService(Components.interfaces.nsIIOService2);
	
	try {
		ioService.manageOfflineStatus = false;
		ioService.offline = false;
		Log("Offline mode: " + ioService.offline);
	} catch (ex) {
		Log("Error: " + ex);
	}
})();

function MainThread (threadID, result) {
	this.threadID = threadID;
	this.result = result;
}

MainThread.prototype = {
	run: function() {
		try {
			// This is where we react to the completion of the working thread.
			alert('Thread ' + this.threadID + ' finished with result: ' + this.result);
		} catch(err) {
			Components.utils.reportError(err);
		}
	},

	QueryInterface: function(iid) {
		if (iid.equals(Components.interfaces.nsIRunnable) ||
			iid.equals(Components.interfaces.nsISupports)) {
			return(this);
		}

		throw Components.results.NS_ERROR_NO_INTERFACE;
	}
}

function WorkingThread (threadID, number) {
	this.threadID = threadID;
	this.number = number;
	this.result = 0;
}

WorkingThread.prototype = {
	run: function() {
		try {
			// This is where the working thread does its processing work.
			for (var i = 0; i<= this.number; i++) {
				this.result += i;
			}

			// When it's done, call back to the main thread to let it know
			// we're finished.
			var threadMgr = Components.classes["@mozilla.org/thread-manager;1"].getService();
			var mainThread = threadMgr.mainThread;
			var currentThread = threadMgr.currentThread;
			mainThread.dispatch(
				new MainThread(this.threadID, this.result),
				currentThread.DISPATCH_NORMAL
				);
		} catch(err) {
			Components.utils.reportError(err);
		}
	},

	QueryInterface: function(iid) {
		if (iid.equals(Components.interfaces.nsIRunnable) ||
			iid.equals(Components.interfaces.nsISupports)) {
			return(this);
		}

		throw Components.results.NS_ERROR_NO_INTERFACE;
	}
}

var TripDub = {
  prefs: null,
  tickerSymbol: "",
  worker: null,
  server: null,

  // Initialize the extension

	CreateWorker: function (id, sourceFile) {
		var self = this;

		var worker = new Worker(sourceFile);
		worker.onmessage = function (event) {
			self.WorkerMessageDispatch.call(self, worker, id, event);
		};
		worker.onerror = function (event) {
			self.Log.call(self, id + " : error : " + event.filename + "[" + event.lineno + "] : " + event.message);
		};
	},

  startup: function()
  {
  	try {
		//var background = Components.classes["@mozilla.org/thread-manager;1"].getService().newThread(0);
		//background.dispatch(new WorkingThread(1, 5000000), background.DISPATCH_NORMAL);
		this.server = new HttpServer(2323, true, true);
		//this.server = new HttpServer(2323, true, true);
		//this.server = new HttpServer(80, true, true);
		this.server.Start();
		document.getElementById("browser").loadURI("http://localhost:" + this.server.port + "/rssreader/", null, null);
	} catch (ex) {
		this.Log(ex);
	}

	/*
    // Register to receive notifications of preference changes

    this.prefs = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefService)
        .getBranch("tripdub.");
    this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
    this.prefs.addObserver("", this, false);

    this.tickerSymbol = this.prefs.getCharPref("symbol").toUpperCase();

    this.worker = new Worker("chrome://tripdub/content/ticker_worker.js");

    // Small little dance to get 'this' to refer to TripDub, not the
    // worker, when a message is received.
    var self = this;
    this.worker.onmessage = function(event) {
      self.onworkermessage.call(self, event);
    };

    this.worker.postMessage(this.tickerSymbol);

    //this.workerServer = this.CreateWorker("server", "chrome://tripdub/content/worker_server.js");
    */
  },

  // Clean up after ourselves and save the prefs

  shutdown: function()
  {
  	if (this.server != null)
  		this.server.Stop();
  	/*
    this.prefs.removeObserver("", this);
    */
  },

  // Called when events occur on the preferences

  observe: function(subject, topic, data)
  {
    if (topic != "nsPref:changed") {
      return;
    }

    switch(data) {
      case "symbol":
        this.tickerSymbol = this.prefs.getCharPref("symbol").toUpperCase();
        this.worker.postMessage(this.tickerSymbol);
        break;
    }
  },

  // Switches to watch a different stock, by symbol

  watchStock: function(newSymbol)
  {
    this.tickerSymbol = newSymbol.toUpperCase();
    this.prefs.setCharPref("symbol", newSymbol);
    this.worker.postMessage(this.tickerSymbol);
  },

  // Asks the worker to refresh our data

  refreshInformation: function()
  {
    // Empty message just means 'refresh'.
    this.worker.postMessage("");
  },

  // Called when the worker has updated data for display

	Log: function (data) {
		Log(data);
	},

	WorkerMessageDispatch: function (worker, id, event) {
		var msg = JSON.parse(event.data);
		if (msg.action == 'log') {
			this.Log(id + " : " + msg.data);
			return;
		}
	},

  onworkermessage: function(event)
  {
	var msg = JSON.parse(event.data);
	
	if (msg.action == 'log') {
		this.Log(msg.data);
	}
  	
    var stringsBundle = document.getElementById("tripdub-string-bundle");

    // Get the strings

    var changeString = stringsBundle.getString('changeString') + " ";
    var openString = stringsBundle.getString('openString') + " ";
    var lowString = stringsBundle.getString('lowString') + " ";
    var highString = stringsBundle.getString('highString') + " ";
    var volumeString = stringsBundle.getString('volumeString') + " ";

    // Build the tooltip string
    var fieldArray = msg.data.split(",");

    var samplePanel = document.getElementById('tripdub');
    samplePanel.label = this.tickerSymbol + ": " + fieldArray[1];
    samplePanel.tooltipText = changeString + fieldArray[4] + " | " +
        openString + fieldArray[5] + " | " +
        lowString + fieldArray[6] + " | " +
        highString + fieldArray[7] + " | " +
        volumeString + fieldArray[8];
  }
}

// Install load and unload handlers

window.addEventListener("load", function(e) { TripDub.startup(); }, false);
window.addEventListener("unload", function(e) { TripDub.shutdown(); }, false);
Log("TripDub Loaded");

/****************************************
var serverSocket;

function startSocket()
{
  var listener =
  {
    onSocketAccepted : function(socket, transport)
    {
      try {

                var transprop = '';
                transprop = 'received';

                var stream = transport.openInputStream(0,0,0);
                var instream = Components.classes["@mozilla.org/scriptableinputstream;1"]
                  .createInstance(Components.interfaces.nsIScriptableInputStream);
                instream.init(stream);

                var outstream = transport.openOutputStream(0,0,0);
                outstream.write(transprop,transprop.length);
                outstream.close();

                var dataListener = {
                  data : "",
                  onStartRequest: function(request, context){},
                  onStopRequest: function(request, context, status){
                        instream.close();
                        stream.close();
                        outstream.close();
                        //listener.finished(this.data);
                        //show_data(this.data);
                        show_data(this.data);
                  },
                  onDataAvailable: function(request, context, inputStream, offset, count) {
                        this.data += instream.read(count);
                        alert('getting stream: '+this.data);
                  },
                };

                var pump = Components.classes["@mozilla.org/network/input-stream-pump;1"].
                        createInstance(Components.interfaces.nsIInputStreamPump);
                pump.init(stream, -1, -1, 0, 0, true);
                pump.asyncRead(dataListener,null);

      } catch(ex2){ alert("::"+ex2); }
    },

    onStopListening : function(socket, status){}
  };

  try {
    serverSocket = Components.classes["@mozilla.org/network/server-socket;1"]
		.createInstance(Components.interfaces.nsIServerSocket);
    serverSocket.init(7055,false,-1);
    serverSocket.asyncListen(listener);
  } catch(ex){ alert(ex); }

  alert("Started");
}

function stopSocket()
{
  if (serverSocket) serverSocket.close();
  alert("Stopped");
}

startSocket();
****************************************/