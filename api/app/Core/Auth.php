<?php
	namespace Core;
	
	use Exception;
	use PDO;
	use DB\DBConnection;
	use Functions\Hasheador;
	use Model\Usuario;

	class Auth{
		/** @var Usuario **/
		private $usuario;

		/** @var array Las reglas de la validación. **/
		public static $reglas = [
			'login' => [
				'clave' => 'required|min:4',
				'email' => 'required|exists:usuarios'
			],
		];
		
		public static function attemptLogin($datos){
			$db = DBConnection::getConeccion();
				
			$query = "SELECT * FROM usuarios WHERE nombre = ? AND clave = ? LIMIT 1";
				
			$stmt = $db->prepare($query);
			
			$stmt->execute([$datos['nombre'], $datos['clave']]);
			
			$usuario = $stmt->fetch();
			
			if($usuario['id_usuario'] !== null){
				$auth = new Auth();
				$auth->cargarDatos($usuario);
				return $auth;
			}else{
				return false;
			}
		}
		
		public function cargarDatos($fila){
			$this->usuario	= new Usuario($fila['id_usuario']);
		}
		
		public function exit(){
			$this->usuario = null;
		}
		
		public function id(){
			return $this->usuario->id_usuario;
		}
	}