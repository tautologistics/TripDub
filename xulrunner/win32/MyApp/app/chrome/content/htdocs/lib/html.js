function ElementRender () {
	var name = arguments.callee.caller.name.toLowerCase();
	var noTag = name == "_content_";
	var content = [];
	for (var i = 0; i < arguments.length; i++)
		content.push(arguments[i]);
	var attribs = ((typeof content[0]) == "object") ? content.shift() : null;

	var buffer = [];

	if (!noTag) {
		buffer.push('<');
		buffer.push(name);
		for (var key in attribs) {
			buffer.push(' ');
			buffer.push(key);
			buffer.push('="');
			buffer.push(attribs[key]);
			buffer.push('"');
		}
	}
	if (!noTag && (content == null || content == '')) {
		buffer.push(' /');
	} else {
		if (!noTag)
			buffer.push('>');
		for (var i = 0; i < content.length; i++) {
			if (content[i] instanceof Array)
				for (var j = 0; j < content[i].length; j++)
					buffer.push(content[i][j]);
			else
			buffer.push(content[i]);
		}
		if (!noTag) {
			buffer.push('</');
			buffer.push(name);
		}
	}
	if (!noTag)
		buffer.push('>');

	return(buffer.join(''));
}
function _CONTENT_(){ return (ElementRender.apply(null, arguments)); }
function A(){ return (ElementRender.apply(null, arguments)); }
function ABBR(){ return (ElementRender.apply(null, arguments)); }
function ACRONYM(){ return (ElementRender.apply(null, arguments)); }
function ADDRESS(){ return (ElementRender.apply(null, arguments)); }
function APPLET(){ return (ElementRender.apply(null, arguments)); }
function AREA(){ return (ElementRender.apply(null, arguments)); }
function B(){ return (ElementRender.apply(null, arguments)); }
function BASE(){ return (ElementRender.apply(null, arguments)); }
function BASEFONT(){ return (ElementRender.apply(null, arguments)); }
function BDO(){ return (ElementRender.apply(null, arguments)); }
function BIG(){ return (ElementRender.apply(null, arguments)); }
function BLOCKQUOTE(){ return (ElementRender.apply(null, arguments)); }
function BODY(){ return (ElementRender.apply(null, arguments)); }
function BR(){ return (ElementRender.apply(null, arguments)); }
function BUTTON(){ return (ElementRender.apply(null, arguments)); }
function CAPTION(){ return (ElementRender.apply(null, arguments)); }
function CENTER(){ return (ElementRender.apply(null, arguments)); }
function CITE(){ return (ElementRender.apply(null, arguments)); }
function CODE(){ return (ElementRender.apply(null, arguments)); }
function COL(){ return (ElementRender.apply(null, arguments)); }
function COLGROUP(){ return (ElementRender.apply(null, arguments)); }
function DD(){ return (ElementRender.apply(null, arguments)); }
function DEL(){ return (ElementRender.apply(null, arguments)); }
function DIR(){ return (ElementRender.apply(null, arguments)); }
function DIV(){ return (ElementRender.apply(null, arguments)); }
function DFN(){ return (ElementRender.apply(null, arguments)); }
function DL(){ return (ElementRender.apply(null, arguments)); }
function DT(){ return (ElementRender.apply(null, arguments)); }
function EM(){ return (ElementRender.apply(null, arguments)); }
function FIELDSET(){ return (ElementRender.apply(null, arguments)); }
function FONT(){ return (ElementRender.apply(null, arguments)); }
function FORM(){ return (ElementRender.apply(null, arguments)); }
function FRAME(){ return (ElementRender.apply(null, arguments)); }
function FRAMESET(){ return (ElementRender.apply(null, arguments)); }
function H1(){ return (ElementRender.apply(null, arguments)); }
function H2(){ return (ElementRender.apply(null, arguments)); }
function H3(){ return (ElementRender.apply(null, arguments)); }
function H4(){ return (ElementRender.apply(null, arguments)); }
function H5(){ return (ElementRender.apply(null, arguments)); }
function H6(){ return (ElementRender.apply(null, arguments)); }
function HEAD(){ return (ElementRender.apply(null, arguments)); }
function HR(){ return (ElementRender.apply(null, arguments)); }
function HTML(){ return (ElementRender.apply(null, arguments)); }
function I(){ return (ElementRender.apply(null, arguments)); }
function IFRAME(){ return (ElementRender.apply(null, arguments)); }
function IMG(){ return (ElementRender.apply(null, arguments)); }
function INPUT(){ return (ElementRender.apply(null, arguments)); }
function INS(){ return (ElementRender.apply(null, arguments)); }
function ISINDEX(){ return (ElementRender.apply(null, arguments)); }
function KBD(){ return (ElementRender.apply(null, arguments)); }
function LABEL(){ return (ElementRender.apply(null, arguments)); }
function LEGEND(){ return (ElementRender.apply(null, arguments)); }
function LI(){ return (ElementRender.apply(null, arguments)); }
function LINK(){ return (ElementRender.apply(null, arguments)); }
function MAP(){ return (ElementRender.apply(null, arguments)); }
function MENU(){ return (ElementRender.apply(null, arguments)); }
function META(){ return (ElementRender.apply(null, arguments)); }
function NOFRAMES(){ return (ElementRender.apply(null, arguments)); }
function NOSCRIPT(){ return (ElementRender.apply(null, arguments)); }
function OBJECT(){ return (ElementRender.apply(null, arguments)); }
function OL(){ return (ElementRender.apply(null, arguments)); }
function OPTGROUP(){ return (ElementRender.apply(null, arguments)); }
function OPTION(){ return (ElementRender.apply(null, arguments)); }
function P(){ return (ElementRender.apply(null, arguments)); }
function PARAMS(){ return (ElementRender.apply(null, arguments)); }
function PRE(){ return (ElementRender.apply(null, arguments)); }
function Q(){ return (ElementRender.apply(null, arguments)); }
function S(){ return (ElementRender.apply(null, arguments)); }
function SAMP(){ return (ElementRender.apply(null, arguments)); }
function SCRIPT(){ return (ElementRender.apply(null, arguments)); }
function SELECT(){ return (ElementRender.apply(null, arguments)); }
function SMALL(){ return (ElementRender.apply(null, arguments)); }
function SPAN(){ return (ElementRender.apply(null, arguments)); }
function STRIKE(){ return (ElementRender.apply(null, arguments)); }
function STRONG(){ return (ElementRender.apply(null, arguments)); }
function STYLE(){ return (ElementRender.apply(null, arguments)); }
function SUB(){ return (ElementRender.apply(null, arguments)); }
function SUP(){ return (ElementRender.apply(null, arguments)); }
function TABLE(){ return (ElementRender.apply(null, arguments)); }
function TBODY(){ return (ElementRender.apply(null, arguments)); }
function TD(){ return (ElementRender.apply(null, arguments)); }
function TEXTAREA(){ return (ElementRender.apply(null, arguments)); }
function TFOOT(){ return (ElementRender.apply(null, arguments)); }
function TH(){ return (ElementRender.apply(null, arguments)); }
function THEAD(){ return (ElementRender.apply(null, arguments)); }
function TITLE(){ return (ElementRender.apply(null, arguments)); }
function TR(){ return (ElementRender.apply(null, arguments)); }
function TT(){ return (ElementRender.apply(null, arguments)); }
function U(){ return (ElementRender.apply(null, arguments)); }
function UL(){ return (ElementRender.apply(null, arguments)); }
function VAR(){ return (ElementRender.apply(null, arguments)); }
function XMP(){ return (ElementRender.apply(null, arguments)); }
function IIF () {
	return(
		(((typeof arguments[0]) == "function") ? arguments[0]() : !!arguments[0]) ?
			arguments[1] : ((arguments.length == 2) ? null : arguments[2])
		);
}
function EACH (list, func) {
	var buffer = [];

	for (var key in list)
		buffer.push(func(list[key]));

	return(buffer.join(''));
}
