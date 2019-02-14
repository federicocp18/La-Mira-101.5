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
				
				try{
					/** LOCAL */
					$db_user = "root";
					$db_pass = "";
					$db_base = "lamira";
				
					$db_dsn = "mysql:host=$db_host;dbname=$db_base;charset=utf8";
					DBConnection::$db = new PDO($db_dsn, $db_user, $db_pass);
				}catch(PDOException $ex){
					/** ONLINE */
					$db_user = "u258049469_rlm";
					$db_pass = "lamirasql2019";
					$db_base = "u258049469_rlm";
					
					$db_dsn = "mysql:host=$db_host;dbname=$db_base;charset=utf8";
					DBConnection::$db = new PDO($db_dsn, $db_user, $db_pass);
				}
			}

			return DBConnection::$db;
		}
	}
