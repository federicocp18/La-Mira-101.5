<?php
	namespace DB;

	use PDO;

	class DBConnection{
		/**
			* @var PDO
		**/
		private static $db;

		/**
			* Metodo constructor privado, permitiendo el singleton.
		**/
		private function __construct(){}

		/**
			* Retorna la conexion a la base de datos.
			*
			* @return PDO
		**/
		public static function getConeccion(){
			if(DBConnection::$db === null){
				$db_host = "localhost";
				
				/** ONLINE */
				// $db_user = "id3814125_juancruz";
				// $db_pass = "Juancu12";
				// $db_base = "id3814125_tb";

				/** LOCAL */
				$db_user = "root";
				$db_pass = "";
				$db_base = "lamira";
				
				$db_dsn = "mysql:host=$db_host;dbname=$db_base;charset=utf8";
				DBConnection::$db = new PDO($db_dsn, $db_user, $db_pass);
			}

			return DBConnection::$db;
		}
	}
