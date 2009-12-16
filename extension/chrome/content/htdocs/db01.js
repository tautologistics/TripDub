<?js require("inc/header.js", false); ?>
<?js
Response.ContentType = "text/plain";
Response.Write("Current Path: " + Request.CurrentPath + "\r\n");

Response.Write("Method: " + Request.Method + "\r\n");
Response.Write("Path: " + Request.Path + "\r\n");
Response.Write("Querystring: " + Request.Querystring + "\r\n");
Response.Write("Version: " + Request.HttpVersion + "\r\n");
Response.Write("\r\n");
Response.Write(Request.Headers + "\r\n");

try {
	var db = App.OpenDatabase("foo");
	Response.Write("db.Name: " + db.Name + "\r\n");
	
	//Response.Write("db.ThreadTest(): " + db.ThreadTest(1, 2) + "\r\n");
	
	var schemas = db.Schemas;
	Response.Write("schemas.length: " + schemas.length + "\r\n");
	for (var i = 0; i < schemas.length; i++)
		Response.Write(i + " : " + schemas[i] + "\r\n");

	Response.Write(
		"Create Table: " + 
		db.ExecNoQuery("CREATE TABLE 'Test_Table_01' ('id' INTEGER AUTO_INCREMENT, 'name' VARCHAR NOT NULL, 'value' VARCHAR, PRIMARY KEY ('id'));") +
		"\r\n"
		);

	Response.Write("TableExists(test_table_01): " + db.TableExists("test_table_01") + "\r\n");
	Response.Write("TableExists(test_table_02): " + db.TableExists("test_table_02") + "\r\n");
	var date = new Date();
	for (var key in date)
		Response.Write("DEB: " + key + " : " + date[key] + "\r\n");

	var tables = db.Tables;
	for (var i = 0; i < tables.length; i++) {
		Response.Write(tables[i].Name + "\r\n");
		for (var j = 0; j < tables[i].Columns.length; j++) {
			Response.Write("  " + tables[i].Columns[j].Name + "\r\n");
			Response.Write("    Type: " + tables[i].Columns[j].Type + "\r\n");
			Response.Write("    Id: " + tables[i].Columns[j].Id + "\r\n");
			Response.Write("    Default: " + tables[i].Columns[j].Default + "\r\n");
			Response.Write("    Primary: " + tables[i].Columns[j].Primary + "\r\n");
			Response.Write("    Nullable: " + tables[i].Columns[j].Nullable + "\r\n");
			Response.Write("\r\n");
		}
	}

	var query
	query = db.Prepare("INSERT INTO Test_Table_01 (name, value) VALUES (?, ?)");
	query.Exec("a", 1);
	query.Exec("b", 2);
	query.Exec("c", 3);
	query.Free();

	query = db.Prepare("SELECT id, name, value FROM Test_Table_01");
	var results = query.Exec();
	for (var i = 0; i < results.length; i++)
		Response.Write(i + " : " + results[i]["name"] +  " = " + results[i]["value"] + "\r\n");
	
} catch (ex) {
	Response.Log("ERROR: " + ex);
}
?>
<?js include("/inc/footer.js"); ?>
<?js Response.End(); ?>