<?php
	namespace TB\Functions;
	
	use Exception;
	use TB\Model\Compartir;
	use TB\Model\Likes;
	use TB\Model\Mensaje;
	
	class Ordenador{
		/** @var array El array a ordenar. */
		private $array_inicial = [];
		
		/** @var string El campo por el cual ordenar. */
		private $campo;
		
		/** @var SORT_ASC|SORT_DESC El formato de ordenamiento. */
		private $orden;
		
		/**
			* Ordenador constructor.
			* @param array $array_inicial El array a ordenar.
			* @param string $campo El campo por el cual ordenar.
			* @param SORT_ASC|SORT_DESC $orden El formato de ordenamiento.
		**/
		public function __construct($array_inicial, $campo, $orden = SORT_ASC){
			$this->array_inicial = $array_inicial;
			
			$this->campo = $campo;

			$this->orden = $orden;
			
			$this->ordenar();
		}
		
		/** Ordena el $array_inicial. */
		public function ordenar(){
			$array_auxiliar = array();
			
			$campo_auxiliar = $this->campo;
			
			foreach($this->array_inicial as $indice => $valor){
				if($campo_auxiliar == 'fecha'){
					$array_auxiliar[$indice] = $valor->getFecha();
				}else{
					$array_auxiliar[$indice] = $valor->$campo_auxiliar;
				}
				
				$array_auxiliar[$indice] = strtolower($array_auxiliar[$indice]);
			}
			
			array_multisort($array_auxiliar, $this->orden, $this->array_inicial);
		}
		
		/** @return array **/
		public function getArray(){
			return $this->array_inicial;
		}
	}