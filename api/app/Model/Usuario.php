<?php
	namespace Model;
	
	use Exception;
	use JsonSerializable;
	use PDO;
	use DB\DBConnection;
	use Functions\Hasheador;

	class Usuario implements JsonSerializable{
		/** @var int **/
		public $id_usuario;
		
		/** @var string **/
		public $email;
		
		/** @var string **/
		public $nombre;
		
		/** @var string **/
		public $clave;
			
		/** @var array Las reglas de la validación. **/
		public static $reglas = [
			'login' => [
				'clave' => 'required|min:4',
				'email' => 'required|exists:usuarios'
			],'register' => [
				'clave' => 'required|min:4|confirmed',
				'email' => 'required|unique:usuarios',
				'nombre' => 'required|min:2'
			],'edit' => [
				'nombre' => 'required|min:2'
			]
		];
		
		/**
			* Constructor de usuario, ya sea por id o por email y contraseña.
			* 
			* @param null|int $id_usuario EL ID del Usuario.
			* @param null|array $datos Los datos del Usuario a crear.
			* @throws Exception
		**/
		public function __construct($id_usuario = null){
			if($id_usuario != null){
				$db = DBConnection::getConeccion();
				
				$query = "SELECT * FROM usuarios WHERE id_usuario = ? LIMIT 1";
				
				$stmt = $db->prepare($query);
				
				$stmt->execute([$id_usuario]);
				
				$usuario = $stmt->fetch();
				
				if($usuario['id_usuario'] != null){
					$this->cargarDatos($usuario);
				}else{
					throw new Exception('Usuario inexistente.');
				}
			}
		}
		
		/** Implementacion del metodo jsonSerialize. **/
		public function jsonSerialize(){
			return [
				'id_usuario'	=> $this->id_usuario,
				'email'			=> $this->email,
				'nombre'		=> $this->nombre
			];
		}
		
		/**
			* Carga los datos del nuevo Usuario con los datos enviados.
			* 
			* @param array $fila Los datos del Usuario a settear.
		**/
		public function cargarDatos($fila){
			$this->id_usuario	= $fila['id_usuario'];
			$this->email		= $fila['email'];
			$this->nombre		= $fila['nombre'];
			$this->clave		= $fila['clave'];
		}
	}