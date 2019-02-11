<?php
	namespace Model;
	
	use Exception;
	use JsonSerializable;
	use PDO;
	use DB\DBConnection;
	use Model\Categoria;
	use Model\Usuario;

	class Noticia implements JsonSerializable{
		/** @var int **/
		public $id_noticia;
		
		/** @var string **/
		public $titulo;
		
		/** @var string **/
		public $descripcion;
		
		/** @var Categoria **/
		public $categoria;
		
		/** @var string **/
		public $preview;
		
		/** @var string **/
		public $imagen;
		
		public static $reglas = [
			'create' => [
				'id_color' => 'required|exists:colores',
				'id_tipografia' => 'required|exists:tipografias',
				'mensaje' => 'required'
			],'respond' => [
				'id_color' => 'required|exists:colores',
				'id_respuesta' => 'required|exists:mensajes',
				'id_tipografia' => 'required|exists:tipografias',
				'mensaje' => 'required'
			],'edit' => [
				'id_color' => 'required|exists:colores',
				'id_tipografia' => 'required|exists:tipografias',
				'mensaje' => 'required'
			],'charlar' => [
				'id_color' => 'required|exists:colores',
				'id_chat' => 'required|exists:chats',
				'id_tipografia' => 'required|exists:tipografias',
				'mensaje' => 'required'
			]
		];
		
		public function __construct($id_noticia = null){
			if($id_noticia != null){
				$db = DBConnection::getConeccion();
				
				$query = "SELECT * FROM noticias WHERE id_noticia = ? LIMIT 1";
				
				$stmt = $db->prepare($query);
				
				$stmt->execute([$id_noticia]);
				
				$noticia = $stmt->fetch();
				
				if($noticia['id_noticia'] != null){
					$this->cargarDatos($noticia);
				}else{
					throw new Exception('Categoria inexistente.');
				}
			}
		}
		
		public function jsonSerialize(){
			return [
				'id_noticia'	=> $this->id_noticia,
				'titulo'		=> $this->titulo,
				'descripcion'	=> $this->descripcion,
				'categoria'		=> $this->categoria,
				'preview'		=> $this->preview,
				'imagen'		=> $this->imagen,
			];
		}
		
		public function cargarDatos($fila){
			$this->id_noticia	= $fila['id_noticia'];
			$this->titulo		= $fila['titulo'];
			$this->descripcion	= $fila['descripcion'];
			$this->categoria 	= new Categoria($fila['id_categoria']);
			$this->preview		= $fila['preview'];
			$this->imagen		= $fila['imagen'];
		}
		
		public static function where($campo, $diferenciador, $comparador){
			$db = DBConnection::getConeccion();
				
			$query = "SELECT * FROM noticias WHERE $campo $diferenciador ? ORDER BY id_noticia DESC";
			
			$stmt = $db->prepare($query);
			
			$stmt->execute([$comparador]);
			
			$salida = [];

			while($noticia = $stmt->fetch(PDO::FETCH_ASSOC)){
				$objeto = new Noticia;
				$objeto->cargarDatos($noticia);
				$salida[] = $objeto;
			}
			
			return $salida;
		}
		
		public static function limit($array, $cantidad){
			$posicion = 0;

			$salida = [];

			foreach($array as $noticia){
				$posicion++;
				if($posicion <= $cantidad){
					$salida[] = $noticia;
				}
			}

			return $salida;
		}
		
		/**
			* Obtiene todas los Mensajes.
			* 
			* @return Mensaje[]
		**/
		public static function getAll(){
			$db = DBConnection::getConeccion();
				
			$query = "SELECT * FROM noticias ORDER BY id_noticia DESC";
			
			$stmt = $db->prepare($query);
			
			$stmt->execute();
			
			$salida = [];

			while($noticia = $stmt->fetch(PDO::FETCH_ASSOC)){
				$objeto = new Noticia;
				$objeto->cargarDatos($noticia);
				$salida[] = $objeto;
			}
			
			return $salida;
		}
		
		public static function create($datos){
			$db = DBConnection::getConeccion();
			
			$query = "INSERT INTO noticias (titulo, descripcion, id_categoria, preview, imagen) VALUES (:titulo, :descripcion, :id_categoria, :preview, :imagen)";
				
			$stmt = $db->prepare($query);
			
			$stmt->execute([
				':titulo'		=> $datos['titulo'],
				':descripcion'		=> $datos['descripcion'],
				':id_categoria'		=> $datos['id_categoria'],
				':preview'			=> $datos['preview'],
				':imagen'			=> $datos['imagen']
			]);
			
			if(!$stmt->rowCount()){
				throw new Exception('Error al subir la noticia.');
			}
		}
		
		public function update($datos){
			$db = DBConnection::getConeccion();
			
			$query = "UPDATE noticias SET titulo = :titulo, id_categoria = :id_categoria, preview = :preview, descripcion = :descripcion, imagen = :imagen WHERE id_noticia = $this->id_noticia";
			
			$stmt = $db->prepare($query);
			
			$stmt->execute([
				':titulo'		=> $datos['titulo'],
				':id_categoria'=> $datos['id_categoria'],
				':preview'		=> $datos['preview'],
				':descripcion'		=> $datos['descripcion'],
				':imagen'		=> $datos['imagen']
			]);
			
			if(!$stmt->rowCount()){
				throw new Exception('No hiciste ningun cambio.');
			}
		}
		
		public function delete(){
			$db = DBConnection::getConeccion();
			
			$query = "DELETE FROM noticias WHERE id_noticia = $this->id_noticia";
			
			$stmt = $db->prepare($query);
			
			$stmt->execute([]);
			
			$fila = $stmt->fetch(PDO::FETCH_ASSOC);
			
			if(!$stmt->rowCount()){
				throw new Exception('Error al borrar la noticia.');
			}
		}
		
		public static function last(){
			$db = DBConnection::getConeccion();
			
			$query = "SELECT * FROM noticias ORDER BY id_noticia DESC";
				
			$stmt = $db->prepare($query);
				
			$stmt->execute([]);
			
			$noticia = $stmt->fetch();
			
			if($noticia['id_noticia'] != null){
				return new Noticia($noticia['id_noticia']);
			}else{
				throw new Exception('No hay noticias subidas.');
			}
		}
	}