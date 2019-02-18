DROP DATABASE IF EXISTS lamira;
CREATE DATABASE lamira;
USE lamira;

CREATE TABLE categorias(
	id_categoria INT(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	nombre VARCHAR(50)
)ENGINE=innoDB;

CREATE TABLE usuarios( 
	id_usuario INT(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	correo VARCHAR(70) NOT NULL UNIQUE,
	clave VARCHAR(100) NOT NULL,
	nombre VARCHAR(50)
)ENGINE=innoDB;

CREATE TABLE noticias(
	id_noticia INT(1) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
	titulo VARCHAR(255) NOT NULL,
	descripcion TEXT NOT NULL,
	preview VARCHAR(255) NOT NULL,
	archivo INT(1),
	ruta TEXT NOT NULL,
	id_categoria INT(10) UNSIGNED,
	FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=innoDB;

INSERT INTO
	usuarios (correo,clave,nombre)
VALUES
	('admin@admin.com',md5('admin'),'admin');

INSERT INTO 
	categorias (id_categoria, nombre)
VALUES
	(1, 'Nacionales'),
	(2, 'Locales'),
	(3, 'Interior'),
	(4, 'Economía'),
	(5, 'Política'),
	(6, 'Sociales'),
	(7, 'Deportes');
	
INSERT INTO 
	noticias (id_noticia, titulo, descripcion, preview, archivo, ruta, id_categoria)
VALUES
	(1, 'Noticia Nacional 1.', 'Descripcion de noticia.', 'Preview de noticia.', 1, '1.jpg', 1),
	(2, 'Noticia Nacional 2.', 'Descripcion de noticia.', 'Preview de noticia.', 2, 'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY', 1),
	(3, 'Noticia Nacional 3.', 'Descripcion de noticia.', 'Preview de noticia.', 3, 'https://www.computerhope.com/jargon/m/example.mp3', 1),
	(4, 'Noticia Local 1.', 'Descripcion de noticia.', 'Preview de noticia.', 2, 'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY', 2),
	(5, 'Noticia Local 2.', 'Descripcion de noticia.', 'Preview de noticia.', 1, '1.jpg', 2),
	(6, 'Noticia Local 3.', 'Descripcion de noticia.', 'Preview de noticia.', 1, '1.jpg', 2),
	(7, 'Noticia Local 4.', 'Descripcion de noticia.', 'Preview de noticia.', 3, 'https://www.computerhope.com/jargon/m/example.mp3', 2),
	(8, 'Noticia Interior 1.', 'Descripcion de noticia.', 'Preview de noticia.', 3, 'https://www.computerhope.com/jargon/m/example.mp3', 3),
	(9, 'Noticia Interior 2.', 'Descripcion de noticia.', 'Preview de noticia.', 2, 'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY', 3),
	(10, 'Noticia Economía 1.', 'Descripcion de noticia.', 'Preview de noticia.', 1, '1.jpg', 4),
	(11, 'Noticia Política 1.', 'Descripcion de noticia.', 'Preview de noticia.', 2, 'https://www.youtube.com/embed/tgbNymZ7vqY', 5),
	(12, 'Noticia Política 2.', 'Descripcion de noticia.', 'Preview de noticia.', 2, 'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY', 5),
	(13, 'Noticia Política 1.', 'Descripcion de noticia.', 'Preview de noticia.', 2, 'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY'
'https://www.youtube.com/embed/tgbNymZ7vqY', 5),
	(14, 'Noticia Social 1.', 'Descripcion de noticia.', 'Preview de noticia.', 1, '1.jpg', 6),
	(15, 'Noticia Deporte 1.', 'Descripcion de noticia.', 'Preview de noticia.', 1, '1.jpg', 7),
	(16, 'Noticia Deporte 2.', 'Descripcion de noticia.', 'Preview de noticia.', 3, 'https://www.computerhope.com/jargon/m/example.mp3', 7);