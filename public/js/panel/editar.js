document.addEventListener('DOMContentLoaded', function(){
    let formulario = {
        contenido: document.querySelector('#formulario form'),
        boton: document.querySelector('#formulario form input[type=submit]'),
        load: function(noticia){
            this.boton.addEventListener('click', function(evento){
                evento.preventDefault();

                formulario.enviar(noticia.id_noticia);
            });
            document.querySelector('#formulario form input[type=text]').value = noticia.titulo;
            document.querySelector('#formulario form textarea[name=preview]').innerHTML = noticia.preview;
            document.querySelector('#formulario form textarea[name=descripcion]').innerHTML = noticia.descripcion;
        },
        enviar: async function(id_noticia){
            let estatus = this.validar();
            if(estatus){
                let formData = new FormData(formulario.contenido);
                let respuesta = await api.sendData('/noticia/' + id_noticia + '/editar', formData);
                if(respuesta.status){
                    let categoria_nombre;

                    let categoria_seleccionada = document.querySelector('#categoria').value;
                    switch(categoria_seleccionada){
                        case '1':
                            categoria_nombre = 'nacionales';
                        break;
                        case '2':
                            categoria_nombre = 'locales';
                        break;
                        case '3':
                            categoria_nombre = 'interior';
                        break;
                        case '4':
                            categoria_nombre = 'economia';
                        break;
                        case '5':
                            categoria_nombre = 'politica';
                        break;
                        case '6':
                            categoria_nombre = 'social';
                        break;
                        case '7':
                            categoria_nombre = 'deportes';
                        break;
                    }
                    window.location.replace(route.url + '/panel_' + categoria_nombre + '.html');
                }else{
                    console.log(respuesta.error);
                }
            }
        },
        validar : function(){
            let titulo = document.querySelector('input[name=titulo]');
            let preview = document.querySelector('textarea[name=preview]');
            let descripcion = document.querySelector('textarea[name=descripcion]');

            let enviar = true;
            let respuesta = validation.required(titulo.value);
            if(!respuesta.status){
                enviar = false;
                titulo.nextElementSibling.innerHTML = respuesta.message;
            }else{
                respuesta = validation.max(titulo.value, 98);
                if(!respuesta.status){
                    enviar = false;
                    titulo.nextElementSibling.innerHTML = respuesta.message;
                }
            }

            respuesta = validation.required(preview.value);
            if(!respuesta.status){
                enviar = false;
                preview.nextElementSibling.innerHTML = respuesta.message;
            }else{
                respuesta = validation.max(preview.value, 230);
                if(!respuesta.status){
                    enviar = false;
                    preview.nextElementSibling.innerHTML = respuesta.message;
                }
            }

            respuesta = validation.required(descripcion.value);
            if(!respuesta.status){
                enviar = false;
                descripcion.nextElementSibling.innerHTML = respuesta.message;
            }

            if(enviar){
                return true;
            }else{
                return false;
            }
        },
    };
    
    let categoria = {
        contenido: document.querySelector('#categoria'),
        data: null,
        load: function(data, noticia){
            categoria.data = data
            for(let posicion in data){
                let option = document.createElement('option');
                if(noticia.categoria.id_categoria == data[posicion].id_categoria){
                    option.selected = true;
                }
                option.value = data[posicion].id_categoria;
                option.innerHTML = data[posicion].nombre;
                this.contenido.appendChild(option);
            }
        },
        obtener: function(id_categoria){
            for(let posicion in categoria.data){
                if(id_categoria == categoria.data[posicion].id_categoria){
                    return categoria.data[posicion].nombre;
                }
            }
        }
    };

    let sesion = {
        contenido: document.querySelector('#sesion'),
        load: async function(data){
            if(localstorage.load('LaMiraToken')){
                let token = localstorage.load('LaMiraToken');
                let formData = new FormData();
                formData.append('token', token)
                let respuesta = await api.sendData('/verificar', formData);
                if(respuesta.status){
                    this.show();
                    this.contenido.addEventListener('click', function(evento){
                        evento.preventDefault();

                        sesion.salir();
                    });
                }else{
                    localstorage.remove('LaMiraToken');
                    this.hide();
                }
            }else{
                this.hide();
            }
        },
        hide: function(){
            this.contenido.style.display = 'none';
        },
        show: function(){
            this.contenido.style.display = 'inline-block';
        },
        salir: async function(){
            localstorage.remove('LaMiraToken');
            window.location.replace(route.url + '/acceder.html');
        },
    };

    let archivo = {
        texto: document.querySelector('#ruta span'),
        ruta: document.querySelector('#ruta input'),
        contenido: document.querySelector('#archivo'),
        options: document.querySelectorAll('#archivo option'),
        load: function(noticia){
            for(let i = 1; i <= this.options.length; i++){
                if(i == noticia.archivo){
                    this.options[i - 1].selected = true;
                    this.cambiarArchivo(i, noticia);
                }
            }
            this.contenido.addEventListener('change', function(evento){
                archivo.cambiarArchivo(this.value, noticia);
            });
        },
        cambiarArchivo: function(tipo, noticia){
            if(tipo == 1){
                this.texto.innerHTML = 'Imagen';
                this.ruta.type = 'file';
                this.ruta.value = '';
            }else if(tipo == 2){
                this.texto.innerHTML = 'Video';
                this.ruta.type = 'text';
                this.ruta.placeholder = 'Link al video';
                this.ruta.value = '';
            }else{
                this.texto.innerHTML = 'Audio';
                this.ruta.type = 'text';
                this.ruta.placeholder = 'Link al audio';
                this.ruta.value = '';
            }
            if(noticia.archivo == tipo + '' && noticia.archivo != '1'){
                this.ruta.value = noticia.ruta;
            }
        },
    };

    /** Carga la seccion deportes entera. */
    async function load(){
        if(localstorage.load('LaMiraToken')){
            let token = localstorage.load('LaMiraToken');
            let formData = new FormData();
            formData.append('token', token)
            let respuesta = await api.sendData('/verificar', formData);
            if(respuesta.status){
                sesion.load();
                respuesta = await api.getData('/noticia/' + route.findGetParameter('noticia'));
                if(respuesta.status){
                    formulario.load(respuesta.datos.noticia);
                    archivo.load(respuesta.datos.noticia);
                }
                respuesta2 = await api.getData('/categorias');
                if(respuesta2.status){
                    categoria.load(respuesta2.datos.categorias, respuesta.datos.noticia);
                }
            }else{
                localstorage.remove('LaMiraToken');
                window.location.replace(route.url + '/acceder.html');
            }
        }else{
            window.location.replace(route.url + '/acceder.html');
        }
    }

    load();
});