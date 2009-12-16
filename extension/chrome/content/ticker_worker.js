//
// ticker_worker.js
//
// This JavaScript code is run in a worker thread by the TripDub
// sample application.
//

// Establish a function that is run automatically every 10 minutes

var symbol = "";

function refreshInformation() {
  if (!symbol) {
    throw "No symbol set!";
  }

  var fullUrl =
    "http://quote.yahoo.com/d/quotes.csv?f=sl1d1t1c1ohgv&e=.csv&s=" + symbol;

//  postMessage(JSON.stringify({action:'log', data:'Test'}));
//  postMessage([1, 2, [3, 4, 5]]);

  function infoReceived()
  {
    var output = httpRequest.responseText;
    if (output) {
      postMessage(JSON.stringify({action:"update", data:output.trim()}));
    }
    httpRequest = null;
  }

  var httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", fullUrl, true);
  httpRequest.onload = infoReceived;
  httpRequest.send(null);
}

setInterval(function() {
  refreshInformation();
}, 10*60*1000);

onmessage = function(event) {
  if (event.data) {
    symbol = event.data.toUpperCase();
  }
  refreshInformation();
}
