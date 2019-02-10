<?php
	date_default_timezone_set("America/Argentina/Buenos_Aires");
	
	use Core\App;
	require '../app/autoload.php';
	require '../app/routes.php';
	require '../vendor/autoload.php';

	$ruta = realpath(__DIR__ . '/../');
	$app = new App($ruta);