/**
 * @fileoverview Contains the classes for DB access
 * @author ChrisWinberry
 * @version 0.8.0
 */

/**
 * Creates a new DbColumn
 * @constructor
 * @class Represents a column of a DB table
 * @param {Hash} row {@link DbQuery} result row containing information about a table column
 */
function DbColumn (row) {
	/** @ignore */
	this._Name = row["name"];
	/** @ignore */
	this._Type = row["type"].toLowerCase();
	/** @ignore */
	this._Id = row["cid"];
	/** @ignore */
	this._Default = (row["dflt_value"] != null) ? row["dflt_value"] : "";
	/** @ignore */
	this._Primary = (row["pk"] == 1);
	/** @ignore */
	this._Nullable = (row["notnull"] == 1);
}

/**
 * Gets the name of the column
 * @type String
 */
DbColumn.prototype.GetName = function DbColumn__GetName () { return(this._Name); }
/**
 * The name of the column
 * @type String
 */
DbColumn.prototype.__defineGetter__("Name", DbColumn.prototype.GetName);

/**
 * Gets the data type of the column
 * @type String
 */
DbColumn.prototype.GetType = function DbColumn__GetType () { return(this._Type); }
/**
 * The data type of the column
 * @type String
 */
DbColumn.prototype.__defineGetter__("Type", DbColumn.prototype.GetType);

/**
 * Gets the ID of the column
 * @type Int
 */
DbColumn.prototype.GetId = function DbColumn__GetId () { return(this._Id); }
/**
 * The ID of the column
 * @type Int
 */
DbColumn.prototype.__defineGetter__("Id", DbColumn.prototype.GetId);

/**
 * Gets the default value of the column
 * @type Object
 */
DbColumn.prototype.GetDefault = function DbColumn__GetDefault () { return(this._Default); }
/**
 * The default value of the column
 * @type Object
 */
DbColumn.prototype.__defineGetter__("Default", DbColumn.prototype.GetDefault);

/**
 * Gets a flag indicating if the column is the primary key
 * @type Boolean
 */
DbColumn.prototype.GetPrimary = function DbColumn__GetPrimary () { return(this._Primary); }
/**
 * Flag indicating if the column is the primary key
 * @type Boolean
 */
DbColumn.prototype.__defineGetter__("Primary", DbColumn.prototype.GetPrimary);

/**
 * Gets a flag indicating if the column is nullable
 * @type Boolean
 */
DbColumn.prototype.GetNullable = function DbColumn__GetNullable () { return(this._Nullable); }
/**
 * Flag indicating if the column is nullable
 * @type Boolean
 */
DbColumn.prototype.__defineGetter__("Nullable", DbColumn.prototype.GetNullable);

/**
 * Creates a new DbTable instance and loads the properties for the specified table name
 * @constructor
 * @class Represents a table in a DB
 * @param {String} name Name of the table
 * @param {DbConnection} db The DB connection to use for querying the table properties
 * @requires DbColumn
 */
function DbTable (name, db) {
	/** @ignore */
	this._Name = name;
	/** @ignore */
	this._Columns = [];

	var query = db.Prepare("PRAGMA TABLE_INFO('" + this._Name + "')");
	var results = query.Exec();
	for (var i = 0; i < results.length; i++)
		this._Columns[this._Columns.length] = new DbColumn(results[i]);

	query.Free();
}

/**
 * Gets the name of the table
 * @type String
 */
DbTable.prototype.GetName = function DbTable__GetName () { return(this._Name); }
/**
 * The name of the table
 * @type String
 */
DbTable.prototype.__defineGetter__("Name", DbTable.prototype.GetName);

/**
 * Gets the list of columns in the table
 * @type DbColumn[]
 */
DbTable.prototype.GetColumns = function DbTable__GetColumns () { return(this._Columns); }
/**
 * The list of columns in the table
 * @type DbColumn[]
 */
DbTable.prototype.__defineGetter__("Columns", DbTable.prototype.GetColumns);

/**
 * Creates a new DbQuery instance containing a prepared query
 * @constructor
 * @class Represents a prepared DB query
 * @param {DbConnection} dbConn The DB connection to use for executing the query
 * @param {String} sql The SQL statement to be executed
 */
function DbQuery (dbConn, sql) {
	/** @ignore */
	this._conn = dbConn;
	/** @ignore */
	this._sql = sql;
	/** @ignore */
	this._query = this._conn.createStatement(this._sql);
}

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
DbQuery.prototype.Log = function DbQuery__Log (data) { if (typeof Log == "function") { Log(data); } };

/**
 * Gets the SQL statement to be executed
 * @type String
 */
DbQuery.prototype.GetStatement = function DbTable__GetStatement () { return(this._sql); }
/**
 * The SQL statement to be executed
 * @type String
 */
DbQuery.prototype.__defineGetter__("Statement", DbQuery.prototype.GetStatement);

/**
 * Executes the prepared SQL statement using any arguments passed in as parameterized values
 * @type Object[][]
 */
DbQuery.prototype.Exec = function DbQuery__Exec (/* n arguments */) {
	var self = this;
	return(
		ThreadJob.Call(
			DbConnection.ExecThread,
			false,
			function (args) { return(self.__Exec__(args)); },
			arguments
			)
		);
}

/**
 * Executes the prepared SQL statement asynchronously using any arguments passed in as parameterized values.
 */
DbQuery.prototype.ExecAsync = function DbQuery__ExecAsync (/* n arguments */) {
	var self = this;
	ThreadJob.Call(
		DbConnection.ExecThread,
		true,
		function (args) { self.__Exec__(args); },
		arguments
		);
}

//DbQuery.prototype.Exec = function DbQuery__Exec (/* n arguments */) {
//	for (var i = 0; i < arguments.length; i++) {
//		if (arguments[i] == null)
//			this._query.bindNullParameter(i);
//		else if (typeof(arguments[i]) == "string")
//			this._query.bindUTF8StringParameter(i, arguments[i]);
//		else if (typeof(arguments[i]) == "number")
//			if (parseInt(arguments[i]) != parseFloat(arguments[i]))
//				this._query.bindDoubleParameter(i, arguments[i]);
//			else
//				this._query.bindInt32Parameter(i, arguments[i]);
//		else
//			this._query.bindUTF8StringParameter(i, arguments[i].toString()); // bindBlobParameter ??? 
//	}
//	
//	var result = [];
//	while (this._query.executeStep()) {
//		var row = [];
//		for(var i = 0; i < this._query.columnCount; i++)
//			row[this._query.getColumnName(i)] = this._query.getUTF8String(i);
//		result.push(row);
//	}
//
//	this._query.reset();
//
//	return(result);
//}
/** @ignore */
DbQuery.prototype.__Exec__ = function DbQuery____Exec__ (args) {
	try {
		for (var i = 0; i < args.length; i++) {
			if (args[i] == null)
				this._query.bindNullParameter(i);
			else if (typeof(args[i]) == "string")
				this._query.bindUTF8StringParameter(i, args[i]);
			else if (typeof(args[i]) == "number")
				if (parseInt(args[i]) != parseFloat(args[i]))
					this._query.bindDoubleParameter(i, args[i]);
				else
					this._query.bindInt32Parameter(i, args[i]);
			else
				this._query.bindUTF8StringParameter(i, args[i].toString()); // bindBlobParameter ??? 
		}

		var result = [];
		while (this._query.executeStep()) {
			var row = [];
			for(var i = 0; i < this._query.columnCount; i++)
				row[this._query.getColumnName(i)] = this._query.getUTF8String(i);
			result.push(row);
		}

		this._query.reset();

		return(result);
	} catch (ex) {
		//this.Log("ERROR: " + ex);
		throw ex;
		//return([]);
	}
}

/**
 * Frees the prepared query resource. Should be called when done using an instance
 */
DbQuery.prototype.Free = function DbQuery__Free () {
	this._query.reset();
}

/**
 * Creates a new DbConnection instance and opens the named DB
 * @constructor
 * @class Represents a DB connections
 * @param {String} name Name of the DB to connect to
 * @requires DbQuery
 * @requires DbTable
 */
function DbConnection (name) {
	/*
	this.currentThread = Components.classes["@mozilla.org/thread-manager;1"]
		.getService()
		.currentThread;
	while (this.currentThread.hasPendingEvents())
		this.currentThread.processNextEvent(false);
	mainThread.dispatch(this, mainThread.DISPATCH_NORMAL);
	*/
	/** @ignore */
	this._Name = name;
	/** @ignore */
	this._connection = null;
	this.Open();
}

/** @ignore */
DbConnection.FileExtension = "sqlite";
/** @ignore */
DbConnection.FolderName = "TripDubDatabases";
/** @ignore */
DbConnection.ExecThread = Components.classes["@mozilla.org/thread-manager;1"].getService().newThread(0);
/** @ignore */
//DbConnection.ExecThread.priority = -3; //TODO: remove this

/**
 * Logs data to the console
 * @param {Object} data Data to be logged to the console
 */
DbConnection.prototype.Log = function DbConnection__Log (data) { if (typeof Log == "function") { Log(data); } };

/**
 * Gets the folder where databases are written to
 * @type nsIFile
 */
DbConnection.SchemaFolder = function DbConnection__SchemaFolder () {
	var path = Components.classes["@mozilla.org/file/directory_service;1"]
		.getService(Components.interfaces.nsIProperties)
		.get("ProfD", Components.interfaces.nsIFile);
	path.append(DbConnection.FolderName);
	return(path);
}

/**
 * Gets a list of the names of existing databases found in the {@link #SchemaFolder}
 * @type String[] 
 */
DbConnection.GetSchemas = function DbConnection__GetSchemas () {
	var file = DbConnection.SchemaFolder();
	var dirEntries = file.directoryEntries;
	var reStorage = new RegExp("(.+)\\." + DbConnection.FileExtension + "$", "i");
	var dbs = [];
	while (dirEntries.hasMoreElements()) {
		var dirEntry = dirEntries.getNext().QueryInterface(Components.interfaces.nsIFile);
		if (!dirEntry.isDirectory()) {
			var found = reStorage.exec(dirEntry.leafName);
			if (found)
				dbs.push(found[1]);
		}
	}

	return(dbs);
}

/**
 * Gets the name of the database
 * @type String
 */
DbConnection.prototype.GetName = function DbConnection__GetName () { return(this._Name); }
/**
 * The name of the database
 * @type String
 */
DbConnection.prototype.__defineGetter__("Name", DbConnection.prototype.GetName);

/**
 * Gets the folder where databases are written to
 * @type nsIFile
 */
DbConnection.prototype.SchemaFolder = DbConnection.SchemaFolder;

/**
 * Gets a list of the names of existing databases found in the {@link #SchemaFolder}
 * @type String[]
 */
DbConnection.prototype.GetSchemas = DbConnection.GetSchemas//(){};
/**
 * A list of the names of existing databases found in the {@link #SchemaFolder}
 * @type String[] 
 */
DbConnection.prototype.__defineGetter__("Schemas", DbConnection.prototype.GetSchemas);

/**
 * Opens a connection to the database. It is already called in the constructor but is useful if {@link #Close} has been called
 */
DbConnection.prototype.Open = function DbConnection__Open () {
	try {
		var path = this.SchemaFolder(); // ???
		path.append(this.GetName() + "." + DbConnection.FileExtension);
		this._connection = Components.classes["@mozilla.org/storage/service;1"]
			.getService(Components.interfaces.mozIStorageService)
			.openDatabase(path);
	} catch (ex) {
		this._connection = null;
		throw "Failed to create/open the database";
	}
}

/**
 * Closes the connection to the database
 */
DbConnection.prototype.Close = function DbConnection__Close () {
	this._connection = null;
}

/**
 * Gets a list of the tables that exist in the database
 * @type DbTable[]
 */
DbConnection.prototype.GetTables = function DbConnection__GetTables () {
	var tables = [];

	var query = this.Prepare("SELECT * FROM sqlite_master WHERE type = 'table'");
	var results = query.Exec();
	for (var i = 0; i < results.length; i++) {
		var row = results[i];
		tables[tables.length] = new DbTable(row["tbl_name"], this);
	}
	query.Free();

	return(tables);
}
/**
 * A list of the tables that exist in the database
 * @type DbTable[]
 */
DbConnection.prototype.__defineGetter__("Tables", DbConnection.prototype.GetTables);

/**
 * Checks if a specific table exists in the database
 * @param {String}  name The name of the table to check for
 * @type Boolean
 */
DbConnection.prototype.TableExists = function DbConnection__TableExists (name) {
	var tables = this.GetTables();

	for (var i = 0; i < tables.length; i++)
		if (tables[i].GetName().toLowerCase() == name.toLowerCase())
			return(true);

	return(false);
}

/**
 * Executes a statement without any result set
 * @param {String} sql The SQL statement to be executed
 */
DbConnection.prototype.ExecNoQuery = function DbConnection__ExecNoQuery (sql) {
	//TODO: add support for parameterization of values (like prepared statements)
	return(this.__ExecNoQuery__(sql, false));
}

/**
 * Asynchronously executes a statement without any result set
 * @param {String} sql The SQL statement to be executed
 */
DbConnection.prototype.ExecNoQueryAsync = function DbConnection__ExecNoQueryAsync (sql) {
	return(this.__ExecNoQuery__(sql, true));
}

/** @ignore */
DbConnection.prototype.__ExecNoQuery__ = function DbConnection____ExecNoQuery__ (sql, async) {
	if (sql == null || sql == '')
		throw "SQL statement is null or empty";

	//TODO: see if this can return true/false
	var self = this;
	return(ThreadJob.Call(
		DbConnection.ExecThread,
		!!async,
		function (sql) { return(self._connection.executeSimpleSQL(sql)); },
		[sql]
		));
}

/**
 * Prepares a SQL statement for execution
 * @param {String} sql The SQL statement to be executed
 * @type DbQuery
 */
DbConnection.prototype.Prepare = function DbConnection__Prepare (sql) {
	if (sql == null || sql == '')
		throw "SQL statement is null or empty";

	return(new DbQuery(this._connection, sql));
}
