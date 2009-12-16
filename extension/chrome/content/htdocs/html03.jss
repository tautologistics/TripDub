<?js
require('lib/html.js', true);

Response.Write(
	H.HTML({onload: "alert('hi!');"},
		H.BODY({style: 'color:blue;'},
			H.H1("Header 1"),
			H.H2("Header 2"),
			"This is the body",
			H.HR(),
			H.FORM({method: 'get', action: 'html01.jss'},
				"Login: ",
				H.INPUT({type: 'text', name: 'login'}),
				H.BR(),
				"Password: ",
				H.INPUT({type: 'password', name: 'pass'}),
				H.BR(),
				H.INPUT({type: 'submit', value: ' Log In '})
				)
			),
			H.HR(),
			H.IIF((Request.Querystring.Get("login") != ""), [
				"Login: ", Request.Querystring.Get("login"), H.BR(),
				"Password: ", Request.Querystring.Get("pass"), H.BR(),
				H.HR()
				]),
			H.DIV({style: "width:50%; margin-left:50%; position:absolute; left:-12.5%; color:green;"},
				"This is some centered text in a div",
				H.UL(
					H.EACH(['One', 'Two', 'Three', 'Four', 'Five'],
						function (value) { return(H.LI(value)); })
					)
				),
				H.EACH([{name:'a', value:1}, {name:'b', value:2}, {name:'c', value:3}],
					function (value) { return(H.TEXT(H.B(value.name), ": ", H.I(value.value), H.BR())); }
				)
		)
	);
?>