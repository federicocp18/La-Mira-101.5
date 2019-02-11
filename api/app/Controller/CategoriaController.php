<?php
	namespace Controller;
	
	use Exception;
	use Core\Route;
	use Core\View;
	use Model\Categoria;

	class CategoriaController{
		/** Trae todas las categorias. **/
		public function getAll(){
			try{
				$categorias = Categoria::getAll();
				
				View::render([
					'status' => 1,
					'datos' => [
						'categorias' => $categorias,
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
	}