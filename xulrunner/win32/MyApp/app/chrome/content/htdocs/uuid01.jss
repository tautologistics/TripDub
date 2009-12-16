<?js

Response.ContentType = "text/plain";
Response.Write(App.GenUUID() + "\r\n");
Response.Write(App.GenUUID().replace(/[{}\-]/g, '') + "\r\n");

?>