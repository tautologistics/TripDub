Response.ContentType = "text/plain";

//Response.Redirect("http://www.google.com/");
//Response.End();

Response.Log("ScriptHandler started");

Response.Write("Method: " + Request.Method + "\r\n");
Response.Write("Path: " + Request.Path + "\r\n");
Response.Write("Querystring: " + Request.Querystring + "\r\n");
Response.Write("Version: " + Request.HttpVersion + "\r\n");
Response.Write("\r\n");
Response.Write(Request.Headers + "\r\n");

Response.Write("typeof __start__: " + (typeof __start__) + "\r\n");

Response.StatusCode = 200;

Response.Cookies.Set("Foo", "abc123");
Response.Write("Request.Cookies.Get('Foo'): " + Request.Cookies.Get('Foo').Data + "\r\n");
Response.Cookies.Get("Foo").Path = "/";
Response.Cookies.Get("Foo").Domain = Request.Headers.Get("Host")[0].Value;

var vp = App.MapPath(Request, "/foo/bar.js");
//vp.AppendPath("../../../");
vp.AppendPath("/bar/taz.js");
Response.Write("vp: " + vp + "\r\n");
Response.Write("vp.VirtualPath: " + vp.VirtualPath + "\r\n");
Response.Write("vp.SystemPath: " + vp.SystemPath + "\r\n");

/*
Response.Write("A.B: " + (typeof A.B) + "\r\n");
A.B.Add("foo", "bar");
Response.Write("A.B.Get('foo').Name: " + A.B.Get('foo').Name + "\r\n");
Response.Write("A.B.Get('foo').Value: " + A.B.Get('foo').Value + "\r\n");
A.B.Get('foo').Value = "XXX";
Response.Write("A.B.Get('foo').Value: " + A.B.Get('foo').Value + "\r\n");
*/

/*
Response.End = function () {
	Response.Log("Faked Response.End()");
}
Response.End();

Response = new (function (oldResponse) {
	this.oldResponse = oldResponse;
	this.End = function () {
		this.oldResponse.Log("Faked Response");
	}
})(Response);
*/

/*
for (var key in Response) {
	try {
		Response.Write(key  + " = " + Response[key] + "\r\n");
	} catch (ex) { Response.Write("ERROR: " + ex + "\r\n"); }
}
*/

Response.Headers.Add("Foo", "bar!");

//var fileContents = read('/Users/chriswinberry/Documents/workspace_3.3/TripDub2/extension/chrome/content/handlers/ScriptHandler.js');
//var fileContents = read("c:\\temp\\TripDub2\\extension\\chrome\\content\\handlers\\ScriptHandler.js");
var fileContents = read("/handlers/ScriptHandler.js");
Response.Write(
	"fileContents:\r\n--------------------------------------------------\r\n" +
	fileContents +
	"\r\n--------------------------------------------------\r\n\r\n"
	);

Response.End();
