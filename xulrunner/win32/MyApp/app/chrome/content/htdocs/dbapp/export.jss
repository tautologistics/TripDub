
<?js

/* 
	OpenLink ODBC/Virtuoso branch, import schema from existing database
*/


/* CHANGE THIS TO REFLECT YOUR ODBC SETTINGS: */
	var schema = (request.querystring["schema"] != null) ? request.querystring["schema"] : "";
	conn = new DbConnection(schema);
/**/


/* CONVERSION ARRAYS */

eval(request.rawBody);

var tables = conn.tables();

//response.write(request.rawBody);
//response.write(sql_data.length);

for (var i = 0; i < tables.length; i++) {
	var table = tables[i];

	if (sql_data[table.name] == null) {
		var sql = "DROP TABLE IF EXISTS " + table.name;
		response.write(sql + "\n");
		response.write("Result: " + conn.execNoResult(sql) + "\n");
	}
}

tables = conn.tables();

for (var table_name in sql_data) {
	var table = sql_data[table_name];
	var found = false;

	for (var i = 0; i < tables.length; i++) {
		if (tables[i].name == table_name) {
			found = true;
			break;
		}
	}

	if (!found) {
		var sql = "CREATE TABLE " + table['name'] + "(";
		var sql_col = "";
		for (var col_name in table.cols) {
			var col = table.cols[col_name];
			sql_col += "\n" + ((sql_col != "") ? ", " : "") + col.name + " " + col.type
			if (col.defVal != '')
				sql_col += " DEFAULT " + col.defVal + " ";
			if (col.pk)
				 sql_col += " PRIMARY KEY AUTOINCREMENT ";
			if (col.nn)
				 sql_col += " NOT NULL ";
		}
		sql += sql_col + "\n)";

		response.write(sql + "\n");
		response.write("Result: " + conn.execNoResult(sql) + "\n");
	}
}

for (var i = 0; i < tables.length; i++) {
	var table = tables[i];

	if (sql_data[table.name] == null) break;
	var alter_table = sql_data[table.name];

	for (var col_name in alter_table.cols) {
		var col = alter_table.cols[col_name];

		var found = false;

		for (var j = 0; j < table.cols.length; j++) {
			if (table.cols[j].name == col.name) {
				found = true;
				break;
			}
		}
		
		if (!found) {
			var sql = "ALTER TABLE " + table.name + " ADD COLUMN " + col.name + " " + col.type
			response.write("DEB: " + col.defVal + ":" + (col.defVal != '' || col.defVal != 0) + "\n");
			if (col.defVal != '')
				sql += " DEFAULT " + col.defVal + " ";
			if (col.pk)
				 sql += " PRIMARY KEY AUTOINCREMENT ";
			if (col.nn)
				 sql += " NOT NULL ";
			response.write(sql + "\n");
			response.write("Result: " + conn.execNoResult(sql) + "\n");
		}

	}

}

conn.close();
conn = null;

?>
UPDATED!