<?php
	namespace Core;

	/**
		* Maneja la presentación de datos.
		* Class View
		* @package DaVinci\Core
	**/
	class View{
		/**
			* Renderiza la $data con formato JSON.
			* @param {mixed} $data
		**/
		public static function render($data){
			header('Content-Type: application/json; charset=utf-8');
			echo json_encode($data);
		}
	}