<?js include("inc/header.js"); ?>
<?js
Response.ContentType = "text/plain";

Response.Write("This is the index page!\r\n\r\n");

Response.Write("Current Path: " + Request.CurrentPath + "\r\n");

Response.Write("Method: " + Request.Method + "\r\n");
Response.Write("Path: " + Request.Path + "\r\n");
Response.Write("Querystring: " + Request.Querystring + "\r\n");
Response.Write("Version: " + Request.HttpVersion + "\r\n");
Response.Write("\r\n");
Response.Write(Request.Headers + "\r\n");
?>
<?js include("/inc/footer.js"); ?>
<?js Response.End(); ?>
