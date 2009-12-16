(function () {

	var vp = App.MapPath(Request, Request.Path);
	//Response.Write(vp.SystemPath + "\r\n");
	//Response.Write(vp.Exists + "\r\n");
	//Response.Write(vp.IsFile + "\r\n");
	//Response.Write(vp.IsDir + "\r\n");

	//TODO: default directory handler (indexer)
	if (vp.Exists) {
		if (vp.IsDir) {
			vp.AppendPath("index.jss"); //TODO: implement descending list of default pages
			if (vp.Exists) {
				Request.CurrentPath = vp.VirtualPath;
			}
		}
	}

	if (!vp.Exists) {
		Response.StatusCode = 404;
		Response.Write(
			"<html><head><title>" +
			Response.StatusCode +
			": " +
			Response.StatusMsg + 
			"</title></head><body><h1>" +
			Response.StatusCode +
			": " +
			Response.StatusMsg + 
			"</h1>The requested resource \"" +
			Request.CurrentPath +
			"\" does not exist</body></html>"
			);
		Response.End();
	}

	App.MapContentType(Request, Response);

	//CREATE  TABLE  IF NOT EXISTS "main"."access_log" ("module" VARCHAR NOT NULL , "timestamp" DATETIME NOT NULL  DEFAULT CURRENT_TIMESTAMP, "remote-addr" VARCHAR NOT NULL , "port" NUMERIC NOT NULL  DEFAULT 80, "method" VARCHAR NOT NULL , "path" VARCHAR, "query" VARCHAR, "sent" NUMERIC NOT NULL  DEFAULT 0, "recvd" NUMERIC NOT NULL  DEFAULT 0, "time-taken" NUMERIC NOT NULL  DEFAULT 0, "version" NUMERIC NOT NULL  DEFAULT 1, "agent" VARCHAR, "referrer" VARCHAR, "status" NUMERIC NOT NULL  DEFAULT 0)

	//var db = new App.OpenDatabase("system");

	/*
	if (!db.TableExists("access_log"))
		db.ExecNoQuery(
			"CREATE TABLE IF NOT EXISTS access_log ( " +
			"	module VARCHAR NOT NULL, " +
			"	timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
			"	remote-addr VARCHAR NOT NULL, " +
			"	method VARCHAR NOT NULL, " +
			"	path VARCHAR, " +
			"	query VARCHAR, " +
			"	sent NUMERIC NOT NULL DEFAULT 0, " +
			"	recvd NUMERIC NOT NULL DEFAULT 0, " +
			"	time-taken NUMERIC NOT NULL DEFAULT 0, " +
			"	version NUMERIC NOT NULL DEFAULT 1, " +
			"	agent VARCHAR, " +
			"	referrer VARCHAR, " +
			"	status NUMERIC NOT NULL DEFAULT 0 "+
			");"
			);
	*/

	/*
	var query = db.Prepare(
	//Response.Write(
		"INSERT INTO access_log ( " +
		"	module " +
		//"	module, \"remote-addr\", method, path, query, sent, " +
		//"	recvd, \"time-taken\", version, agent, referrer, status " +
		") VALUES ( " +
		"	? " +
		//"	?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? " +
		");"
		);
	//*/
	/*
	query.Exec(
		"module"
		//"module",
		//"127.0.0.1",
		//Request.Method,
		//Request.Path,
		//Request.RawQuerystring,
		//Request.RawRequest.length,
		//Response.ContentLength,
		//5,
		//Request.HttpVersion,
		//Request.Headers.Get("user-agent").length ? Request.Headers.Get("user-agent")[0].Value : "",
		//Request.Headers.Get("referer").length ? Request.Headers.Get("referer")[0].Value : "",
		//Request.StatusCode
		);
	query.Free();
	//*/

	//db.Close();

})();

//TODO: implement a proper caching/expiration engine
if ((/\.(gif|jpg|png|css|js|html)$/i).test(Request.CurrentPath)) {
	var exp = new Date();
	exp.setTime(exp.getTime() + 1800 * 1000);
	Response.Headers.Set("Expires", exp.toGMTString());
	Response.Headers.Set("Cache-Control", "max-age=" + (1800 + 1000));
}

require(Request.CurrentPath);
