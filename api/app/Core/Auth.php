<?php
	namespace Core;
	
	use Exception;
	use JsonSerializable;
	use PDO;
	use DB\DBConnection;
	use Functions\Hasheador;
	use Model\Usuario;

	class Auth implements JsonSerializable{
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
				
			$query = "SELECT * FROM usuarios WHERE correo = ? AND clave = ? LIMIT 1";
				
			$stmt = $db->prepare($query);
			
			$stmt->execute([$datos['correo'], $datos['clave']]);
			
			$usuario = $stmt->fetch();
			
			if($usuario['id_usuario'] != null){
				$this->cargarDatos($usuario);
			}else{
				throw new Exception('Categoria inexistente.');
			}
		}
		
		public function cargarDatos($fila){
			$this->usuario	= $fila['usuario'];
		}
		
		public function exit(){
			$this->usuario = null;
		}
		
		public function id(){
			return $this->usuario->id_usuario;
		}
	}