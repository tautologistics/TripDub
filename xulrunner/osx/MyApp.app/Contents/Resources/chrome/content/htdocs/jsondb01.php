<?php

class TripDubDatabase {
	const BASEURL		= 'http://localhost:2323/jsondb01.jss?';
	const KEY_ACCESSID	= 'key';
	const KEY_SCHEMA	= 'db';
	const KEY_RESULTS	= 'res';
	const KEY_QUERY		= 'q';

	private $accessId = '123';

	public function __construct ($schema) {
		$this->schema		= $schema;
	}

	public function Connect () {
	}

	public function Close () {
	}

	public function Exec ($query) {
		$url =
			self::BASEURL
			. self::KEY_ACCESSID . "=" . $this->accessId
			. "&" . self::KEY_SCHEMA . "=" . $this->schema
			. "&" . self::KEY_RESULTS . "=y"
			. "&" . self::KEY_QUERY . "=" . urlencode($query)
			;
		$json = file_get_contents($url);
		return(json_decode($json, true));
	}

	public function ExecNoQuery ($query) {
		$url =
			self::BASEURL
			. self::KEY_ACCESSID . "=" . $this->accessId
			. "&" . self::KEY_SCHEMA . "=" . $this->schema
			. "&" . self::KEY_RESULTS . "=n"
			. "&" . self::KEY_QUERY . "=" . urlencode($query)
			;
		$json = file_get_contents($url);
		return(json_decode($json, true));
	}

}

$db = new TripDubDatabase("foo");
$result = $db->Exec('SELECT name, value FROM Test_Table_01');
var_dump($result);

$result = $db->ExecNoQuery('UPDATE Test_Table_01 SET name = name WHERE name != name');
var_dump($result);

?>