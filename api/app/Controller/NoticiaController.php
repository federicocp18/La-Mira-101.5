<?php
	namespace Controller;
	
	use Exception;
	use Core\Route;
	use Core\View;
	use Model\Categoria;
	use Model\Noticia;
	use Model\Usuario;

	class NoticiaController{
		/** Trae 3 noticias de cada categoria. **/
		public function getThree(){
			try{
				$categorias = Categoria::getAll();
	
				$noticias = [];
	
				foreach($categorias as $categoria){
					$noticias_segun_categoria = Noticia::where('id_categoria', '=', $categoria->id_categoria);

					$noticias_segun_categoria = Noticia::limit($noticias_segun_categoria, 3);
					foreach($noticias_segun_categoria as $noticia){
						$noticias[] = $noticia;
					}
				}
				
				View::render([
					'status' => 1,
					'datos' => [
						'noticias' => $noticias,
					],
					'error' => 'Todo OK'
				]);
			}catch(Exception $excepcion){
				View::render([
					'status' => 0,
					'error' => $excepcion->getMessage()
				]);
			}
		}

		/** Trae todas las Noticas de una Categoria. **/
		public function getByCategoria(){
			$ruta = new Route();
			$id_categoria = $ruta->getParams('id_categoria');

			try{
				$categoria = new Categoria($id_categoria);
	
				$noticias = Noticia::where('id_categoria', '=', $categoria->id_categoria);
				
				View::render([
					'status' => 1,
					'datos' => [
						'noticias' => $noticias,
					],
					'error' => 'Todo OK'
				]);
			}catch(Exception $excepcion){
				View::render([
					'status' => 0,
					'error' => $excepcion->getMessage()
				]);
			}
		}

		/** Trae todas las Noticas de una Categoria. **/
		public function getOne(){
			$ruta = new Route();
			$id_noticia = $ruta->getParams('id_noticia');

			try{
				$noticia = new Noticia($id_noticia);
				
				View::render([
					'status' => 1,
					'datos' => [
						'noticia' => $noticia,
					],
					'error' => 'Todo OK'
				]);
			}catch(Exception $excepcion){
				View::render([
					'status' => 0,
					'error' => $excepcion->getMessage()
				]);
			}
		}

		/** Trae 3 noticias de cada categoria. **/
		public function getFive(){
			try{
				$noticias = Noticia::getAll();
				$noticias = Noticia::limit($noticias, 5);
				
				View::render([
					'status' => 1,
					'datos' => [
						'noticias' => $noticias,
					],
					'error' => 'Todo OK'
				]);
			}catch(Exception $excepcion){
				View::render([
					'status' => 0,
					'error' => $excepcion->getMessage()
				]);
			}
		}

		/** Trae 3 noticias de cada categoria. **/
		public function doCrear(){
			$datos = file_get_contents('php://input');
			$datos = json_decode($datos, true);

			// $reglas = Noticia::$reglas['crear'];
			
			try{
				// $validator = new Validator($datos, $reglas);

				if('' != $_FILES['imagen']['tmp_name']){
					$extension = pathinfo($_FILES['imagen']['name']);
					$extension = $extension['extension'];
					$erFoto = "/^(jpg|png|jpeg)$/i";
					$envio = preg_match_all($erFoto,$extension,$array);
					if(!$envio){
						View::render([
							'status' => 0,
							'error' => 'La imagen debe ser extension JPG/JPEG o PNG.'
						]);
						die();
					}
					
					$noticia = Noticia::getLast();
						
					$imagen = "'$noticia->id_noticia.$extension'";
					
					move_uploaded_file($_FILES['imagen']['tmp_name'], "../../../edificios/$idEdificio/$numero.$extension");
				}else{
					View::render([
						'status' => 0,
						'error' => 'La imagen es obligatoria.'
					]);
					die();
				}

				Noticia::doCreate($datos);
				
				View::render([
					'status' => 1,
					'message' => 'Noticia creada exitosamente',
					'error' => 'Todo OK'
				]);
			}catch(Exception $excepcion){
				View::render([
					'status' => 0,
					'error' => $excepcion->getMessage()
				]);
			}
		}
	}