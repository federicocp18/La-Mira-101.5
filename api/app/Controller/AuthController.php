<?php
	namespace Controller;
	
	use Exception;
	use Core\Auth;
	use Core\Route;
	use Core\View;
	use DB\DBConnection;
	use Model\Usuario;
	use Functions\Token;
	use Functions\Validator;

	class AuthController{
		/** Intenta loguear a un Usuario. **/
		public function login(){
			$datos = file_get_contents('php://input');
			$datos = json_decode($datos, true);
			
			// $reglas = Usuario::$reglas['login'];
			
			try{
				// $validator = new Validator($datos, $reglas);
				
				if(!Auth::attemptLogin($datos)){
					View::render([
						'status' => 0,
						'message' => 'Correo o Contraseña incorrectos.'
					]);
					die();
				}

				$token = new Token(Auth::id());
				$tokenGenerado = $token->getToken();
				
				View::render([
					'status'	=> 1,
					'message'	=> 'Se ha logueado correctamente.',
					'token'		=> strval($tokenGenerado)
				]);
			}catch(Exception $excepcion){
				View::render([
					'status' => 0,
					'message' => $excepcion->getMessage()
				]);
			}
		}

		/** Intenta desloguear a un Usuario. **/
		public function logout(){
			try{
				Auth::exit();
				
				View::render([
					'status'	=> 1,
					'message'	=> 'Se ha deslogueado correctamente.',
					'token'		=> strval($tokenGenerado)
				]);
			}catch(Exception $excepcion){
				View::render([
					'status' => 0,
					'message' => $excepcion->getMessage()
				]);
			}
		}
	}