<?php
	namespace Functions;

	use Lcobucci\JWT\Builder;
	use Lcobucci\JWT\Parser;
	use Lcobucci\JWT\ValidationData;
	use Lcobucci\JWT\Signer\Hmac\Sha256;

	class Token{
		/** @var token **/
		private $token;
		
		/**
			* Constructor de Token.
			* 
			* @param int null|$id El ID del Usuario.
		**/
		public function __construct($id_usuario = null){
			if($id_usuario != null){
				$signer = new Sha256();
				$secret = 'NAFIE';
				
				$builder = new Builder();
				
				$builder->setIssuer('RadioLaMira');
				$builder->setExpiration(time() + 60 * 60 * 24);
				
				$builder->set('id_usuario', $id_usuario);
				
				$builder->sign($signer, $secret);
				
				$this->token = $builder->getToken();
			}
		}
		
		/**
			* Verifica el Token del Usuario.
			* 
			* @param string $oldToken El Token del Usuario.
		**/
		public static function verifica($oldToken){
			$signer = new Sha256();
			$secret = 'NAFIE';
			
			$parser = new Parser();
			$token = $parser->parse($oldToken);
			
			$data = new ValidationData();
			$data->setIssuer('RadioLaMira');
			
			if($token->validate($data) && $token->verify($signer, $secret)){
				return $token->getClaim('id_usuario');
			}else{
				throw new Exception('Token invalido.');
			}
		}
		
		/**
			* Retorna el Token del Usuario.
			* 
			* @return Token
		**/
		public function getToken(){
			return $this->token;
		}
	}