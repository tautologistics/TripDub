<?js
include("inc/header.js");

Response.Write(App.ReadNetFile("http://www.google.com/"));

include("/inc/footer.js");
Response.End();
?>