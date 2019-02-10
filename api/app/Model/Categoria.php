<?php
	namespace Model;
	
	use Exception;
	use JsonSerializable;
	use PDO;
	use DB\DBConnection;

	class Categoria implements JsonSerializable{
		/** @var int **/
		public $id_categoria;
		
		/** @var string **/
		public $nombre;
		
		/** @var Noticia[] **/
		public $noticias;
		
		/**
			* Constructor de Categoria.
			* 
			* @param null|int $id_categoria El ID de la categoria
		**/
		public function __construct($id_categoria = null){
			if($id_categoria != null){
				$db = DBConnection::getConeccion();
				
				$query = "SELECT * FROM categorias WHERE id_categoria = ? LIMIT 1";
				
				$stmt = $db->prepare($query);
				
				$stmt->execute([$id_categoria]);
				
				$categoria = $stmt->fetch();
				
				if($categoria['id_categoria'] != null){
					$this->cargarDatos($categoria);
				}else{
					throw new Exception('Categoria inexistente.');
				}
			}
		}
		
		/** Implementacion del metodo jsonSerialize. **/
		public function jsonSerialize(){
			return [
				'id_categoria' => $this->id_categoria,
				'nombre'		=> $this->nombre
			];
		}
		
		/** Carga los datos de la nueva categoria con los datos enviados. **/
		public function cargarDatos($fila){
			$this->id_categoria = $fila['id_categoria'];
			$this->nombre		= $fila['nombre'];
		}
		
		/**
			* Obtiene todas los Mensajes.
			* 
			* @return Mensaje[]
		**/
		public static function getAll(){
			$db = DBConnection::getConeccion();
				
			$query = "SELECT * FROM categorias";
			
			$stmt = $db->prepare($query);
			
			$stmt->execute();
			
			$salida = [];

			while($categoria = $stmt->fetch(PDO::FETCH_ASSOC)){
				$objeto = new Categoria;
				$objeto->cargarDatos($categoria);
				$salida[] = $objeto;
			}
			
			return $salida;
		}
	}