//const Cc = Components.classes;
//const Ci = Components.interfaces;

function Log (data) {
	//postMessage(JSON.stringify({action:"log", data:data}));
}

Log("started");

for (var key in navigator) {
	try {
		Log(key + " : "  + navigator[key])
	} catch (ex) { Log("error: " + ex); }
}

//function AsyncListener (socket) {
function AsyncListener () {
	//socket.asyncListen(this);
}
AsyncListener.prototype.log = function AsyncListener$log (data) { Log(data); }
AsyncListener.prototype.QueryInterface = function AsyncListener$QueryInterface (aIID) {
	if (
		!aIID.equals(Components.interfaces.nsISupports)
		&&
		!aIID.equals(Components.interfaces.nsIServerSocketListener)
		)
		throw(Components.results.NS_ERROR_NO_INTERFACE);

	return(this);
}
AsyncListener.prototype.onSocketAccepted = function AsyncListener$onSocketAccepted (socket, transport) {
	Log("onSocketAccepted");
}
AsyncListener.prototype.onStopListening = function AsyncListener$onStopListening (socket, status) {
	Log("onStopListening");
}

function Server () {
	/***************************************************/
	var serverPort = 2323;
	var serverLocalOnly = true;

	this.serverSocket = Components.classes["@mozilla.org/network/server-socket;1"]
		.createInstance(Components.interfaces.nsIServerSocket);

	this.log = Log;

	this.QueryInterface = function Server$QueryInterface (aIID) {
		if (
			!aIID.equals(Components.interfaces.nsISupports)
			&&
			!aIID.equals(Components.interfaces.nsIServerSocketListener)
			)
			throw(Components.results.NS_ERROR_NO_INTERFACE);
	
		return(this);
	}

	/* Interface: nsIServerSocketListener */
	this.onSocketAccepted = function Server$onSocketAccepted (socket, transport) {
		Log("onSocketAccepted");
		//new TripDubConnectionHandler(this, socket, transport);
	}

	this.onStopListening = function Server$onStopListening (socket, status) {
		Log("onStopListening");
	}

	this.serverSocket.init(serverPort, serverLocalOnly, -1);
	//this.listener = new AsyncListener(this.serverSocket);
	this.listener = new AsyncListener();
	//this.serverSocket.asyncListen(this);
	this.serverSocket.asyncListen(this.listener);

	Log("Service instance created");

	/***************************************************/
}

var server = new Server();


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
                        Log('xgetting stream: '+this.data);
                  },
                };

                var pump = Components.
                  classes["@mozilla.org/network/input-stream-pump;1"].
                        createInstance(Components.interfaces.nsIInputStreamPump);
                pump.init(stream, -1, -1, 0, 0, true);
                pump.asyncRead(dataListener,null);

      } catch(ex2){ Log("::"+ex2); }
    },

    onStopListening : function(socket, status){}
  };

  try {
    serverSocket = Components.classes["@mozilla.org/network/server-socket;1"]
		.createInstance(Components.interfaces.nsIServerSocket);
    serverSocket.init(7055,false,-1);
    serverSocket.asyncListen(listener);
  } catch(ex){ Log(ex); }

  Log("xStarted");
}

function stopSocket()
{
  if (serverSocket) serverSocket.close();
  Log("xStopped");
}

startSocket();

Log("loaded");

