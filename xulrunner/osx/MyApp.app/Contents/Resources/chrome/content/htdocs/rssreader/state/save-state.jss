<?js
var cookies = Request.Cookies.GetAll();
for (var i = 0; i < cookies.length; i++) {
	Response.Log(i + " : " + cookies[i]);
}
?>