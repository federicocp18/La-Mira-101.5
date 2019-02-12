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

		/** Verifica que el usuario logueado sea el correcto. **/
		public function verifyToken(){
			try{
				$token = new Token();
				$id_usuario = $token->verifica(strval($_POST['token']));
				$usuario = new Usuario($id_usuario);
				
				View::render([
					'status'	=> 1,
					'message'	=> 'Usuario correcto.'
				]);
			}catch(Exception $excepcion){
				View::render([
					'status' => 0,
					'message' => $excepcion->getMessage()
				]);
			}
		}
	}