function HTMLResult () {}
HTMLResult.prototype = new Array;
HTMLResult.prototype.toString = function HTMLResult__toString () {
	return(this.join(''));
}

function HTMLRender () { }
HTMLRender.Elements = [
	'TEXT', 'A', 'ABBR', 'ACRONYM', 'ADDRESS', 'APPLET', 'AREA', 'B', 'BASE', 'BASEFONT', 'BDO', 'BIG',
	'BLOCKQUOTE', 'BODY', 'BR', 'BUTTON', 'CAPTION', 'CENTER', 'CITE', 'CODE', 'COL', 'COLGROUP', 'DD',
	'DEL', 'DIR', 'DIV', 'DFN', 'DL', 'DT', 'EM', 'FIELDSET', 'FONT', 'FORM', 'FRAME', 'FRAMESET', 'H1',
	'H2', 'H3', 'H4', 'H5', 'H6', 'HEAD', 'HR', 'HTML', 'I', 'IFRAME', 'IMG', 'INPUT', 'INS', 'ISINDEX',
	'KBD', 'LABEL', 'LEGEND', 'LI', 'LINK', 'MAP', 'MENU', 'META', 'NOFRAMES', 'NOSCRIPT', 'OBJECT',
	'OL', 'OPTGROUP', 'OPTION', 'P', 'PARAMS', 'PRE', 'Q', 'S', 'SAMP', 'SCRIPT', 'SELECT', 'SMALL',
	'SPAN', 'STRIKE', 'STRONG', 'STYLE', 'SUB', 'SUP', 'TABLE', 'TBODY', 'TD', 'TEXTAREA', 'TFOOT',
	'TH', 'THEAD', 'TITLE', 'TR', 'TT', 'U', 'UL', 'VAR', 'XMP'
	];
(function () {
	for (var key in HTMLRender.Elements) {
		var funcName = HTMLRender.Elements[key];
		HTMLRender[funcName] = function () {
			var args = [].slice.call(arguments);
			args.unshift(funcName);
			return(HTMLRender.Render.apply(null, args));
		}
	}
})();
HTMLRender.Render = function HTMLRender__Render () {
	var content = [].slice.call(arguments);
	var name = content.shift().toLowerCase();
	var noTag = name == "text";
	var attribs = (((typeof content[0]) == "object") && !(content[0] instanceof HTMLResult)) ? content.shift() : null;

	var buffer = new HTMLResult();

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

	return(buffer);
}
HTMLRender.IIF = function HTMLRender__IIF () {
	return(
		(((typeof arguments[0]) == "function") ? arguments[0]() : !!arguments[0]) ?
			arguments[1] : ((arguments.length == 2) ? null : arguments[2])
		);
}
HTMLRender.EACH = function HTMLRender__EACH (list, func) {
	var buffer = new HTMLResult();

	for (var key in list)
		buffer.push(func(list[key]));

	return(buffer);
}
var H = HTMLRender;

