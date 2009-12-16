<?js

/* 
	OpenLink ODBC/Virtuoso branch, import schema from existing database
*/


/* CHANGE THIS TO REFLECT YOUR ODBC SETTINGS: */
	var schema = (Request.Querystring.Get("schema") != null) ? Request.Querystring.Get("schema") : "";
	var conn = new App.OpenDatabase(schema);
/**/


/* CONVERSION ARRAYS */
var tmp_conv = new Array();
tmp_conv['Integer'] = new Array('NUMBER','NUMBERIC','DECIMAL','INTEGER','INT','INT4');
tmp_conv['Small Integer'] = new Array('SMALLINT','BOOLEAN','INT2','BOOL');
tmp_conv['Single precision'] = new Array('FLOAT','REAL','FLOAT4');
tmp_conv['Double precision'] = new Array('DOUBLE','DOUBLE PRECISION');
tmp_conv['String'] = new Array('CHARACTER','VARCHAR','CHAR','NCHAR','NVARCHAR','STRING');
tmp_conv['Text'] = new Array('TEXT','LONG VARCHAR','CLOB');
tmp_conv['Binary'] = new Array('VARBINARY','BINARY');
tmp_conv['Large binary'] = new Array('LONG VARBINARY','BLOB');
tmp_conv['Date'] = new Array('DATE');
tmp_conv['Time'] = new Array('TIME');
tmp_conv['Datetime'] = new Array('DATETIME');
tmp_conv['Timestamp'] = new Array('TIMESTAMP');
tmp_conv['XML'] = new Array('LONG XML');
tmp_conv['? UNKNOWN ?'] = new Array('','INTERVAL');
var conv = new Array();

function convert (type) {
	type = type.toUpperCase();
	if (conv[type] != null) {
		return conv[type];
	} else {
		return conv[''];
	}
}

function prepare_conversion () {
	for (var key in tmp_conv) {
		var arr = tmp_conv[key];
		for	(var i = 0; i < arr.length; i++) {
			conv[arr[i]] = key;
		}
	} /* foreach type */
}

function generate_xml (tables) {
	var out = 	'<' + '?xml version="1.0" ?' + '>' + "\n";
	out += '<!-- PHP/ODBC XML export -->' + "\n";
	out += '<sql>'+"\n";
	
	for (var i = 0; i < tables.length; i++) {
		var table = tables[i];

		out += "\t" + '<table title="' + table.Name +'" >' + "\n";
		for (var j = 0; j < table.Columns.length; j++) {
			var col = table.Columns[j];

			var str = '';
			if (!col.allowNull) {
				str += ' nn="nn"';
			}
			if (col.pk) {
				str += ' pk="pk"';
			}
			out += "\t\t" + '<row' + str + '>' + "\n";
			out += "\t\t\t" + '<title>' + col.Name + '</title>' + "\n";
			out += "\t\t\t" + '<default>' + col.Default + '</default>' + "\n";
			out += "\t\t\t" + '<type>' + convert(col.Type) + '</type>' + "\n";
			out += "\t\t" + '</row>' + "\n";
		}
		out += "\t" + '</table>' + "\n";
	} /* pokud tabulka existuje */
	out += '</sql>' + "\n";
	Response.Write(out);
}

prepare_conversion();

generate_xml(conn.Tables);

conn.Close();
conn = null;	
?>