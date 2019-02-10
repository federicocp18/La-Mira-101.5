<?php
	spl_autoload_register(function($className){
		$filepath = __DIR__ . '/' . $className . ".php";
		$filepath = str_replace('\\', '/', $filepath);
		if(file_exists($filepath)) {
			require $filepath;
		}
	});
	session_start();