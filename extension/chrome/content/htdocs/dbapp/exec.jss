<?js
require('/lib/Serializer.js', true);
//require('/lib/SerializerJS.js', true);
require('/lib/SerializerXML.js', true);

var schema = (Request.Querystring.Get("schema") != null) ? Request.Querystring.Get("schema") : "";
var db = App.OpenDatabase(schema);

var sql = Request.RawBody;
var dbquery = db.Prepare(sql);
var result = dbquery.Exec();

result.query = sql;

try {
	var objSerializer = new JSSerializer();
	objSerializer.Prefs.SmartIndent = true;
	objSerializer.Prefs.ShowLineBreaks = true;
	objSerializer.Prefs.ShowTypes = true;
	objSerializer.Types.UseNull = true;
	objSerializer.Types.UseUndefined = true;
	objSerializer.Types.UseArray = true;
	objSerializer.Types.UseObject = true;
	objSerializer.Types.UseBoolean = true;
	objSerializer.Types.UseDate = true;
	objSerializer.Types.UseError = true;
	objSerializer.Types.UseFunction = true;
	objSerializer.Types.UseNumber = true;
	objSerializer.Types.UseRegExp = true;
	objSerializer.Types.UseString = true;
	objSerializer.Types.UseUserDefined = true;
	objSerializer.Types.UseObjectsForUserDefined = true;
	objSerializer.CheckInfiniteLoops = true;
	objSerializer.MaxDepth = 3;
	objSerializer.Serialize(result);
	Response.Write(objSerializer.GetXMLString('sqldata'));
} catch (e) { response.write(e); }

dbquery.Free();
dbquery = null;
db.Close();
db = null;

?>