<?js
require('lib/html.js', true);

//*
Response.Write(
	HTML({onload: "alert('hi!');"},
		BODY({style: 'color:blue;'},
			H1("Header 1"),
			H2("Header 2"),
			"This is the body",
			HR(),
			FORM({method: 'get', action: 'html01.jss'},
				"Login: ",
				INPUT({type: 'text', name: 'login'}),
				BR(),
				"Password: ",
				INPUT({type: 'password', name: 'pass'}),
				BR(),
				INPUT({type: 'submit', value: ' Log In '})
				)
			),
			HR(),
			IIF((Request.Querystring.Get("login") != ""), [
				"Login: ", Request.Querystring.Get("login"), BR(),
				"Password: ", Request.Querystring.Get("pass"), BR(),
				HR()
				]),
			DIV({style: "width:50%; margin-left:50%; position:absolute; left:-12.5%; color:green;"},
				"This is some centered text in a div",
				UL(
					EACH(['One', 'Two', 'Three', 'Four', 'Five'],
						function (value) { return(LI(value)); })
					)
				),
				EACH([{name:'a', value:1}, {name:'b', value:2}, {name:'c', value:3}],
					function (value) { return(_CONTENT_(B(value.name), ": ", I(value.value), BR())); }
				)
		)
	);
//*/
?>