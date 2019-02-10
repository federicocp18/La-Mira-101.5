DROP DATABASE IF EXISTS lamira;
CREATE DATABASE lamira;
USE lamira;

CREATE TABLE categorias( 
	id_categoria INT(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	nombre VARCHAR(50)
)ENGINE=innoDB;

CREATE TABLE usuarios( 
	id_usuario INT(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
	email VARCHAR(70) NOT NULL UNIQUE,
	clave VARCHAR(100) NOT NULL,
	nombre VARCHAR(50)
)ENGINE=innoDB;

CREATE TABLE noticias( 
	id_noticia INT(1) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
	titulo VARCHAR(255) NOT NULL,
	descripcion VARCHAR(255) NOT NULL,
	preview VARCHAR(255) NOT NULL,
	imagen VARCHAR(255) NOT NULL,
	id_categoria INT(10) UNSIGNED,
	FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=innoDB;

INSERT INTO 
	categorias (id_categoria, nombre)
VALUES
	(1, 'Politica'),
	(2, 'Economia'),
	(3, 'Social'),
	(4, 'Deporte'),
	(5, 'Seguridad'),
	(6, 'Comunitarios');
	
INSERT INTO 
	noticias (id_noticia, titulo, descripcion, preview, imagen, id_categoria)
VALUES
	(1, 'Noticia Politica 1.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 1),
	(2, 'Noticia Politica 2.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 1),
	(3, 'Noticia Politica 3.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 1),
	(4, 'Noticia Economia 1.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 2),
	(5, 'Noticia Economia 2.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 2),
	(6, 'Noticia Economia 3.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 2),
	(7, 'Noticia Social 1.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 3),
	(8, 'Noticia Social 2.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 3),
	(9, 'Noticia Social 3.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 3),
	(10, 'Noticia Politica 4.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 1),
	(11, 'Noticia Deporte 1.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 4),
	(12, 'Noticia Deporte 2.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 4),
	(13, 'Noticia Deporte 3.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 4),
	(14, 'Noticia Seguridad 1.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 5),
	(15, 'Noticia Seguridad 2.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 5),
	(16, 'Noticia Seguridad 3.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 5),
	(17, 'Noticia Comunitarios 1.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 6),
	(18, 'Noticia Comunitarios 2.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 6),
	(19, 'Noticia Comunitarios 3.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 6),
	(20, 'Noticia Seguridad 4.', 'Preview de noticia random.', 'Preview de noticia random.', '1.jpg', 5);