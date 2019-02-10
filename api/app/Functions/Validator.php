<?php
	namespace TB\Functions;
	
	use Exception;
	use TB\Model\Color;
	use TB\Model\Mensaje;
	use TB\Model\Tipografia;
	use TB\Model\Usuario;
	
	class Validator{
		/** @var array Los campos a validar. */
		private $campos = [];
		
		/** 
			* @var array Las reglas de validación. Deben ser un array de strings, donde el string sea el nombre de la validación a realizar.
			* En caso de requerir datos extra (como 'min'), se indican con un ":" seguido del valor, ej: "min:3".
			* Pueden incluirse múltiples reglas de validación, separadas con | (pipe).
		**/
		private $reglas = [];
		
		/** @var array Los mensajes de error, en caso de existir. */
		private $errores = [];
		
		/** @var array Los campos vacios validos. */
		private $vacio = [];
		
		/**
			* Validator constructor.
			* @param array $campos Los campos a validar.
			* @param array $reglas Las reglas de validacion.
			* @throws Exception
		**/
		public function __construct(array $campos, array $reglas){
			$this->campos = $campos;
			
			$this->reglas = $reglas;

			$this->validar();
				
			if($this->fails()){
				throw new Exception(json_encode($this->getErrores()));
			}
		}
		
		/** Valida que los $fields cumplan las $rules especificadas. */
		public function validar(){
			foreach($this->reglas as $indice => $valor){
				// Explotamos las reglas, por si se incluyeron más de una para este campo.
				$reglas = explode('|', $valor);

				foreach($reglas as $regla){
					// Llamamos a un método que ejecute la regla.
					$this->ejecutador($regla, $indice);
				}
			}
		}

		/**
			* Ejecuta la regla de validación indicada.
			*
			* @param string $regla La regla de validacion.
			* @param string $campo El campo a validar.
		**/
		public function ejecutador($regla, $campo){
			// Explotamos por ":", en caso de que la regla de validación lleve datos extras (como "min").
			$datosRegla = explode(':', $regla);
			// Armamos el nombre del método de validación. Todos los métodos de validación los definimos con _ para
			// diferenciarlos del resto.
			$regla = '_' . $datosRegla[0];

			// Ejecutamos el método de la regla.
			if(count($datosRegla) === 2){
				$delimitador = $datosRegla[1];
				
				$this->{$regla}($campo, $delimitador);
			}else{
				$this->{$regla}($campo);
			}
		}

		/**
			* Agrega un mensaje de error.
			*
			* @param string $campo El campo con error.
			* @param string $mensaje El mensaje del error.
		**/
		public function addError($campo, $mensaje){
			$this->errores[$campo] = $mensaje;
		}

		/**
			* Indica si los datos fallaron la validación.
			*
			* @return bool
		**/
		public function fails(){
			return count($this->errores) !== 0;
		}
		
		/**
			* Valida que el campo no esté vacío.
			*
			* @param mixed $campo El campo a validar.
			* @return bool
		**/
		private function _required($campo){
			if(!$this->getVacio($campo)){
				if(empty($this->campos[$campo])){
					$this->addError($campo, 'El ' . $campo . ' no debe estar vacío.');
				}
			}
		}
		
		/**
			* Valida que el campo exista dentro de la tabla $table.
			*
			* @param mixed $campo El campo a validar.
			* @param int $tabla La tabla.
			* @return bool
		**/
		private function _exists($campo, $tabla){
			if(!$this->getVacio($campo)){
				$contenido = $this->campos[$campo];
				
				if($tabla === 'usuarios'){
					if(!Usuario::getOne($contenido)){
						$this->addError($campo, 'El ' . $campo . ' no existe.');
					}
				}else if($tabla === 'mensajes'){
					if(!Mensaje::getOne($contenido)){
						$this->addError($campo, 'El ' . $campo . ' no existe.');
					}
				}else if($tabla === 'tipografias'){
					if(!Tipografia::getOne($contenido)){
						$this->addError($campo, 'El ' . $campo . ' no existe.');
					}
				}else if($tabla === 'colores'){
					if(!Color::getOne($contenido)){
						$this->addError($campo, 'El ' . $campo . ' no existe.');
					}
				}
			}
		}
		
		/**
			* Valida que el campo tenga al menos $chars caracteres.
			*
			* @param mixed $campo El campo a validar.
			* @param int $cantidad La cantidad de caracteres.
			* @return bool
		**/
		private function _min($campo, $cantidad){
			if(!$this->getVacio($campo)){
				$contenido = $this->campos[$campo];
				
				if(strlen($contenido) < $cantidad){
					$this->addError($campo, 'El campo: "' . $campo . '" debe tener al menos ' . $cantidad . ' caracteres de longitud.');
				}
			}
		}
		
		/**
			* Valida que el campo no tenga mas de $chars caracteres.
			*
			* @param mixed $campo El campo a validar.
			* @param int $cantidad La cantidad de caracteres.
			* @return bool
		**/
		private function _max($campo, $cantidad){
			if(!$this->getVacio($campo)){
				$contenido = $this->campos[$campo];
				
				if(strlen($contenido) < $cantidad){
					$this->addError($campo, 'El campo: "' . $campo . '" no debe superar los ' . $cantidad . ' caracteres de longitud.');
				}
			}
		}
		
		/**
			* Valida que el campo exista dentro de la tabla $table.
			*
			* @param mixed $campo El campo a validar.
			* @param int $tabla La tabla.
			* @return bool
		**/
		private function _unique($campo, $tabla){
			if(!$this->getVacio($campo)){
				$contenido = $this->campos[$campo];
				
				if($tabla === 'usuarios'){
					if(Usuario::getOne($contenido)){
						$this->addError($campo, 'El ' . $campo . ' ya esta en uso.');
					}
				}
			}
		}
		
		/**
			* Valida que el campo exista dentro de la tabla $table.
			*
			* @param mixed $campo El campo a validar.
			* @param int $tabla La tabla.
			* @return bool
		**/
		private function _confirmed($campo){
			if(!$this->getVacio($campo)){
				$contenido = $this->campos[$campo];
				
				$repeticion = $this->campos['repeat'];
				
				if($contenido != $repeticion){
					$this->addError($campo, 'El ' . $campo . ' y la repeticion son distintas.');
				}
			}
		}
		
		/**
			* Valida que el campo pueda ser vacio.
			*
			* @param mixed $campo El campo a validar.
			* @param int $tabla La tabla.
			* @return bool
		**/
		private function _nullable($campo){
			if(empty($this->campos[$campo])){
				$this->setVacio($campo);
			}
		}
		
		/** @return array **/
		public function getErrores(){
			return $this->errores;
		}
		
		/** @return array **/
		public function setVacio($campo){
			$this->vacio[$campo] = true;
		}
		
		/** @return array **/
		public function getVacio($campo){
			if(isset($this->vacio[$campo])){
				return true;
			}else{
				return false;
			}
		}
	}