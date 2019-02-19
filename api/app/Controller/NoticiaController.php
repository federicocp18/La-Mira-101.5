<?php
	namespace Controller;
	
	use Exception;
	use Core\Route;
	use Core\View;
	use DB\DBConnection;
	use Model\Categoria;
	use Model\Noticia;
	use Model\Usuario;
	use PDO;

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

		/** Crea una noticia nueva. **/
		public function doCreate(){
			// $reglas = Noticia::$reglas['crear'];
			
			try{
				// $validator = new Validator($datos, $reglas);

				if(isset($_POST['archivo']) && $_POST['archivo'] == 1){
					if(isset($_FILES['ruta']['tmp_name']) && '' != $_FILES['ruta']['tmp_name']){
						$extension = pathinfo($_FILES['ruta']['name']);
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
						
						$db = DBConnection::getConeccion();
						$numero = $db->query("SHOW TABLE STATUS LIKE 'noticias'")->fetch(PDO::FETCH_ASSOC)['Auto_increment'];
						$ruta_img = "$numero.$extension";
						
						move_uploaded_file($_FILES['ruta']['tmp_name'], "../../public/img/noticias/$ruta_img");
					}else{
						View::render([
							'status' => 0,
							'error' => 'La imagen es obligatoria.'
						]);
						die();
					}
				}else{
					$ruta_img = $_POST['ruta'];
				}

				$newData = [
					'titulo' => $_POST['titulo'],
					'descripcion' => $_POST['descripcion'],
					'preview' => $_POST['preview'],
					'id_categoria' => $_POST['id_categoria'],
					'archivo' => $_POST['archivo'],
					'ruta' => $ruta_img
				];

				Noticia::create($newData);
				
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

		/** Edita una noticia. **/
		public function doEdit(){
			// $reglas = Noticia::$reglas['editar'];
			
			try{
				$ruta = new Route();
				$id_noticia = $ruta->getParams('id_noticia');
				$noticia = new Noticia($id_noticia);

				// $validator = new Validator($datos, $reglas);

				if(isset($_POST['archivo']) && $_POST['archivo'] == 1){
					if(isset($_FILES['ruta']['tmp_name']) && '' != $_FILES['ruta']['tmp_name']){
						$extension = pathinfo($_FILES['ruta']['name']);
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
							
						$numero = $noticia->id_noticia;
						$ruta_img = "$numero.$extension";
						
						unlink("../../public/img/noticias/$noticia->ruta");
						move_uploaded_file($_FILES['ruta']['tmp_name'], "../../public/img/noticias/$ruta_img");
					}else{
						$ruta_img = $noticia->ruta;
					}
				}else{
					$ruta_img = $_POST['ruta'];
				}

				$newData = [
					'titulo' => $_POST['titulo'],
					'descripcion' => $_POST['descripcion'],
					'preview' => $_POST['preview'],
					'id_categoria' => $_POST['id_categoria'],
					'archivo' => $_POST['archivo'],
					'ruta' => $ruta_img
				];

				$noticia->update($newData);
				
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

		/** Elimina una noticia. **/
		public function doDelete(){
			// $reglas = Noticia::$reglas['editar'];
			
			try{
				$ruta = new Route();
				$id_noticia = $ruta->getParams('id_noticia');
				$noticia = new Noticia($id_noticia);

				// $validator = new Validator($datos, $reglas);

				if($noticia->archivo == 1){
					unlink("../../public/img/noticias/$noticia->ruta");
				}

				$noticia->delete();
				
				View::render([
					'status' => 1,
					'message' => 'Noticia borrada exitosamente',
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