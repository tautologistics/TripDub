<?js
var path = App.MapPath(Request, Request.Path);
?>

path.BasePath = <?js= path.BasePath; ?><br />
path.VirtualSeparator = <?js= path.VirtualSeparator; ?><br />
path.VirtualRoot = <?js= path.VirtualRoot; ?><br />
path.SystemSeparator = <?js= path.SystemSeparator; ?><br />
path.SystemRoot = <?js= path.SystemRoot; ?><br />
path.VirtualPath = <?js= path.VirtualPath; ?><br />

<?js Response.End(); ?>