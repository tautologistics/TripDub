<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Serialize 01</title>
</head>
<body>

<?js
require('/lib/Serializer.js', true);
require('/lib/SerializerJS.js', true);
require('/lib/SerializerXML.js', true);

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
?>
<script language="JavaScript">
	<?js objSerializer.Serialize(Request); ?>
	var <?js= objSerializer.GetJSString('request'); ?>
</script>

<h2>Server side "request" object</h2>
<?js
	Response.Write('<b>method:</b> ' + Request.Method.toUpperCase() + "<br>");
	Response.Write('<b>url:</b> ' + Request.Url + "<br>");
	Response.Write('<b>user-agent:</b> ' + Request.Headers.Get('user-agent') + "<br>");
?>

<h2>Client side "request" object</h2>
<script language="JavaScript">
	document.write('<b>method:</b> ' + Request.Method.toUpperCase() + "<br>");
	document.write('<b>url:</b> ' + Request.Url + "<br>");
	document.write('<b>user-agent:</b> ' + Request.Headers.Get('user-agent') + "<br>");
</script>

<h2>Serialized object as JS</h2>
<textarea wrap="off" style="height:200px; width:99%;"><?js= objSerializer.GetJSString('request'); ?></textarea>

<h2>Serialized object as XML</h2>
<textarea wrap="off" style="height:200px; width:99%;"><?js
		objSerializer.Prefs.ShowTypes = false;
		objSerializer.Types.UseNull = false;
		objSerializer.Types.UseUndefined = false;
		objSerializer.Types.UseObject = false;
		objSerializer.Types.UseFunction = false;
		objSerializer.Types.UseRegExp = false;
		objSerializer.Types.UseUserDefined = false;
		objSerializer.Types.UseObjectsForUserDefined = false;
		objSerializer.Serialize(Request);
		Response.Write(objSerializer.GetXMLString('request'));
	?></textarea>

</body>
</html>