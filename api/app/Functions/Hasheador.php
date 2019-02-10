<?php
	namespace TB\Functions;
	
	class Hasheador{
		/**
			* Hashea y retorna una clave con password_hash.
			*
			* @return string $clave
		**/
		public static function hashea($clave){
			return password_hash($clave, PASSWORD_DEFAULT);
		}

		/**
			* Verifica y retorna si la clave coincide con el hash, con password_verify.
			*
			* @return boolean $clave
		**/
		public static function verifica($clave,$hash){
			return password_verify($clave, $hash);
		}
	}