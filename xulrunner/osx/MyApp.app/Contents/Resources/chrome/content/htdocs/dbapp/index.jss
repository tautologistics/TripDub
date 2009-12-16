<?js
	var keyword = (Request.Querystring.Get("keyword") != null) ? Request.Querystring.Get("keyword") : "";
	var fileLang = "";

	require('./config.jss');

	if (!include("./lang/" + fileLang))
		require("./lang/default.jss");

	var schema = (Request.Querystring.Get("schema") != null) ? Request.Querystring.Get("schema") : "";
?>
<html>
<head>
<!--
	WWW SQL Designer, (C) 2005-2007 Ondra Zara, o.z.fw@seznam.cz
	Version: 1.3.2

    This file is a main part of WWW SQL Designer.

    WWW SQL Designer is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    WWW SQL Designer is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WWW SQL Designer; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA	
-->

	<title>SQL Designer</title>
	<link rel="stylesheet" type="text/css" href="styles/style.css" />
	<script language="javascript">
		var schema = "<?js= schema; ?>";
	</script>
	<script type="text/javascript" src="js/main.js"></script>      <!-- hlavni skript -->
	<script type="text/javascript" src="js/settings.js"></script>  <!-- globalni nastaveni -->
	<script type="text/javascript" src="styles/style.js"></script> <!-- globalni nastaveni -->
	<script type="text/javascript" src="js/generic.js"></script>   <!-- funkce nezavisle na projektu -->
	<script type="text/javascript" src="js/ajax.js"></script>      <!-- ajax -->
	<script type="text/javascript" src="js/sql_types.js"></script> <!-- sql datove typy -->
	<script type="text/javascript" src="js/objects.js"></script>   <!-- deklarace objektu -->
	<script type="text/javascript" src="js/animator.js"></script>  <!-- animovane pridani/ubrani radku -->
	<script type="text/javascript" src="js/io.js"></script>  	   <!-- import/export -->
	<script type="text/javascript" src="/lib/Serializer.js"></script>			<!-- serializer -->
	<script type="text/javascript" src="/lib/SerializerJS.js"></script>			<!-- serializer -->
	<script type="text/javascript" src="/lib/SerializerXML.js"></script>		<!-- serializer -->
	
</head>

<?js
if (schema != '') {
?>

<body onload="load('<?js= schema; ?>')">
	<div id="root">
		<div id="bar"> <!-- navigacni lista nahore -->
			<div id="shadow"> <!-- stin listy na jejim spodku -->
			</div>
			<div id="table_admin">
				<div id="table_admin_label"><?js= lang['table']['title']; ?></div>
				<label for="table_name" id="table_name_label"><?js= lang['table']['name']; ?></label>
				<div id="table_add_button" class="button"><?js= lang['table']['add']; ?></div>
				<div id="table_del_button" class="button"><?js= lang['table']['delete']; ?></div>
				<div id="table_move_button" class="button"><?js= lang['table']['align']; ?></div>
				<div id="table_clear_button" class="button"><?js= lang['table']['clear']; ?></div>
				<input type="text" id="table_name" />
			</div>
			<div id="row_admin">
				<div id="row_admin_label"><?js= lang['row']['title']; ?></div>
				<label for="row_name" id="row_name_label"><?js= lang['row']['name']; ?></label>
				<div id="row_add_button" class="button"><?js= lang['row']['add']; ?></div>
				<div id="row_del_button" class="button"><?js= lang['row']['delete']; ?></div>
				<div id="row_up_button" class="button"><?js= lang['row']['up']; ?></div>
				<div id="row_down_button" class="button"><?js= lang['row']['down']; ?></div>
				<input type="text" id="row_name" />
				
				<input type="radio" id="row_primary" title="Primary Key" />
				<label for="row_primary" id="row_primary_label" title="Primary Key">PK</label>

				<label for="row_index" id="row_index_label" title="Index" >IDX</label>
				<input type="checkbox" id="row_index" title="Index" />

				<label for="row_notnull" id="row_notnull_label" title="Not NULL" >NN</label>
				<input type="checkbox" id="row_notnull" title="Not NULL" />

				<label for="row_default" id="row_default_label"><?js= lang['row']['default']; ?></label>
				<input type="text" id="row_default" />

				<label for="row_type" id="row_type_label"><?js= lang['row']['type']; ?></label>
				<select id="row_type" /></select>

				<div id="row_spec_1">(</div>
				<input type="text" id="row_spec" /></select>
				<div id="row_spec_2">)</div>
			</div>

			<div id="io_admin">
				<div id="io_admin_label"><?js= lang['io']['title']; ?></div>
				<label for="io_select" id="io_select_label"><?js= lang['io']['method']; ?></label>
				<div id="io_button" class="button"><?js= lang['io']['go']; ?></div>
				<div id="io_settings_button" class="button"><?js= lang['io']['settings']['title']; ?></div>
				<select id="io_select">
					<option selected="selected" value="db_import"><?js= lang['io']['settings']['db_import']; ?></option>
					<option selected="selected" value="db_export"><?js= lang['io']['settings']['db_export']; ?></option>
					<option value="xml_out"><?js= lang['io']['settings']['xml_out']; ?></option>
					<option value="xml_in"><?js= lang['io']['settings']['xml_in']; ?></option>
					<option value="db_out"><?js= lang['io']['settings']['db_out']; ?></option>
					<option value="db_out_as"><?js= lang['io']['settings']['db_out_as']; ?></option>
					<option value="db_in"><?js= lang['io']['settings']['db_in']; ?></option>
					
					<!----------  CODE BEGIN  ---------->

					<option value="show_keywords"><?js= lang['io']['settings']['show_keywords']; ?></option>
					<option value="print_view"><?js= lang['io']['settings']['print_view']; ?></option>
					
					<!----------  CODE END  ---------->

					<option value="mssql"><?js= lang['io']['settings']['mssql']; ?></option>
					<option value="mysql"><?js= lang['io']['settings']['mysql']; ?></option>
					<option value="propel"><?js= lang['io']['settings']['propel']; ?>	</option>
					<option value="oci"><?js= lang['io']['settings']['oci']; ?></option>
					<option selected="selected" value="postgresql"><?js= lang['io']['settings']['postgresql']; ?></option>
				</select>
			</div>
			<div id="position" style="padding-left:580px;"></div>
		</div>
		<script language="Javascript">
			function toggleQueryExec () {
				var hide = (document.getElementById('queryExecConsole').style.display != 'none');
				document.getElementById('queryExec').style.zIndex = 1000;
				document.getElementById('queryExec').style.height = hide ? "18px" : "300px";
				document.getElementById('queryExecConsole').style.display = hide ? "none" : "block";
			}
			function exec_sql (data) {
				//var dataDisplay = apply_xslt(data, "xml2result.xsl");
				//document.getElementById('queryExecResults').innerHTML = dataDisplay;
				//apply_xslt(data, "xml2result.xsl", function (data) { document.getElementById('queryExecResults').innerHTML = data; });
				document.getElementById('queryExecResults').innerHTML = apply_xslt(data, "xml2result.xsl");
			}
			function queryExecSubmit (e) {
				if (e.keyCode != 13)
					return;
				var query = document.getElementById('queryExecPrompt').value.toString();
				ajax_command(POST, "exec.jss?schema=" + schema, function () { return(query); }, exec_sql);
				//ajax_command(POST, "exec.jss?schema=" + schema, function () { return(query); }, function (data) { exec_sql(data); });
			}
		</script>
		<div id="queryExec" class="table">
			<div id="queryExecConsole" style="display:none;">
				<div id="queryExecResults">
				</div>
				<input id="queryExecPrompt" type="text" name="query" onkeypress="queryExecSubmit(event);" value="SELECT * FROM sqlite_master WHERE type = 'table'" />
			</div>
			<div id="queryExecTitle">
				<a href="#" onclick="toggleQueryExec(); return(false);">QUERIES</a>
			</div>
		</div>
		<div id="map"> <!-- experimentalni mapa -->
			<div id="map_"> <!-- cervene okenko v experimentalni mape -->
			</div>
		</div>
		<div id="io">
			<textarea id="area"></textarea>
			<input id="import" value="<?js= lang['io']['load']; ?>" type="button" />
			<input id="close" value="<?js= lang['io']['close']; ?>" type="button" onclick="javascript:document.getElementById('io').style.display='none'" />
		</div>
	</div>

<?js
} else {
?>

<h1>Select or create a schema:</h1>
<ul>
	<form>
	<li>
		<input type="text" name="schema" size="30" onfocus="this.value = '';" value="Enter a new schema name here">
		<input type="button" value="Create" onclick="window.location = '?schema=' + this.form.schema.value;">
	</li>
	</form>
<?js
	var schemas = App.ListDatabases();
	for (var i = 0; i < schemas.length; i++) {
		?>
		<li><a href="?schema=<?js= schemas[i]; ?>"><?js= schemas[i]; ?></a></li>
		<?js
	}
?>
</ul>
<?js
}
?>
</body>
</html>