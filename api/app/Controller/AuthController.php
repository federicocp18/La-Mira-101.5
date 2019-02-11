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
		public function doLogin(){
			// $reglas = Usuario::$reglas['login'];
			
			try{
				// $validator = new Validator($datos, $reglas);

				$newData = [
					'nombre' => $_POST['nombre'],
					'clave' => md5($_POST['clave'])
				];
				
				if(Auth::attemptLogin($newData)){
					$auth = Auth::attemptLogin($newData);
				}else{
					View::render([
						'status' => 0,
						'message' => 'Usuario o Contraseña incorrectos.'
					]);
					die();
				}

				$token = new Token($auth->id());
				$tokenGenerado = $token->getToken();
				
				View::render([
					'status'	=> 1,
					'message'	=> 'Se ha logueado correctamente.',
					'token'		=> strval($tokenGenerado)
				]);
			}catch(Exception $excepcion){
				View::render([
					'status' => 0,
					'message' => Auth::attemptLogin($newData)
				]);
			}
		}

		/** Intenta desloguear a un Usuario. **/
		public function doLogout(){
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