<?php
	use Core\Route;

	// Route::addRoute('METODO', 'RUTA + {id}', 'CONTROLLER@FUNCION');

	/** NoticiaController */
	Route::addRoute('GET', '/home', 'NoticiaController@getThree');

	Route::addRoute('GET', '/noticias/{id_categoria}', 'NoticiaController@getByCategoria');

	Route::addRoute('GET', '/noticia/{id_noticia}', 'NoticiaController@getOne');

	Route::addRoute('POST', '/noticia/crear', 'NoticiaController@doCreate');

	Route::addRoute('POST', '/noticia/{id_noticia}/editar', 'NoticiaController@doEdit');

	Route::addRoute('DELETE', '/noticia/{id_noticia}/eliminar', 'NoticiaController@doDelete');

	/** AuthController */
	Route::addRoute('POST', '/login', 'AuthController@doLogin');

	Route::addRoute('POST', '/verificar', 'AuthController@verifyToken');

	Route::addRoute('GET', '/logout', 'AuthController@doLogout');

	/** AuthController */
	Route::addRoute('GET', '/categorias', 'CategoriaController@getAll');