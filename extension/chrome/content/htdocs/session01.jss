<?js
Response.ContentType = 'text/plain';

var sessionId = Request.Cookies.Get('__session__').Data;;
if (sessionId == '') {
	sessionId = App.GenUUID().replace(/[{}\-]/g, '');
	Response.Cookies.Set('__session__', sessionId);
	Response.Cookies.Get('__session__').Path = '/';
}
?>
Session: <?js= sessionId; ?>
Cookies
------------------
<?js
var cookies = Request.Cookies.GetAll();
for (var key in cookies) {
	?> * <?js= cookies[key].Name; ?> = <?js= cookies[key].Data; ?>
<?js }

?>