Response.ContentType = "text/html";

if (!Response.Ended) {
	if (!Response.Headers.HeadersSent) {
		if (Response.Buffer) 
			Response.Clear();
		Response.StatusCode = 500;
	}
	Response.Write("<html><head><title>Server Error</title></head><body><h1>500: Server Error</h1><pre>" + PageException + "</pre></body></html>");
}

Response.End();
