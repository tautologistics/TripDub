<?js
Response.Log("xxx");
App.Foo = Response;
App.Foo = App.Foo;
Response.Log("yyy");
App.Foo.Write("Test");
Response.Log("zzz");
?>