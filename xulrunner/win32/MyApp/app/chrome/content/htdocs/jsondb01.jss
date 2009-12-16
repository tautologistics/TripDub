<?js
//TODO: transactions
//TODO: track last insert id
//TODO: return boolean for ExecNoQuery
//TODO: arraystring for QS

//http://localhost:2323/jsondb01.jss?db=foo&res=y&q=SELECT+name,+value+FROM+Test_Table_01

Response.ContentType = "application/x-javascript";
//Response.ContentType = "text/plain";

var output = {
	exception: null,
	results: null,
	schema: "",
	query: "",
	params: []
};

Response.Write(Request.Querystring.Get("params") + "\r\n");

try {
	var optDb = Request.Querystring.Get("db");
	var optQuery = Request.Querystring.Get("q");
	var optResults = Request.Querystring.Get("res") == "y";
	
	output.schema = optDb;
	output.query = optQuery;

//	Response.Write("DB: " + optDb + "\n");
//	Response.Write("Results: " + optResults + "\n");
//	Response.Write("Query: " + optQuery + "\n");

	var db = App.OpenDatabase(optDb);
	var results = false;
	if (optResults) {
		//TODO: separate parameters
		var query = db.Prepare(optQuery);
		results = query.Exec();
		query.Free();
	} else {
		//results = db.ExecNoQuery(optQuery);
		db.ExecNoQuery(optQuery);
		results = true;
	}
	output.results = results;
} catch (ex) {
	output.exception = App.CopyException(ex);
}
Response.Write(App.ObjectToJSON(output));
?>
<?js Response.End(); ?>