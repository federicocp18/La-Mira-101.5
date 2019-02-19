document.addEventListener('DOMContentLoaded', function(){
    let formulario = {
        contenido: document.querySelector('#formulario form'),
        boton: document.querySelector('#formulario form input[type=submit]'),
        load: function(){
            this.boton.addEventListener('click', function(evento){
                evento.preventDefault();

                formulario.enviar();
            });
        },
        enviar: async function(){
            let estatus = this.validar();
            if(estatus){
                let formData = new FormData(formulario.contenido);
                let respuesta = await api.sendData('/noticia/crear', formData);
                if(respuesta.status){
                    let categoria_seleccionada = document.querySelector('#categoria').value;
                    let categoria_nombre = categoria.obtener(categoria_seleccionada);
                    window.location.replace(route.url + '/panel_' + categoria_nombre.toLowerCase() + '.html');
                }else{
                    console.log(respuesta);
                }
            }
        },
        validar : function(){
            let titulo = document.querySelector('input[name=titulo]');
            let ruta = document.querySelector('input[name=ruta]');
            let preview = document.querySelector('textarea[name=preview]');
            let descripcion = document.querySelector('textarea[name=descripcion]');
            let archivo = document.querySelector('select[name=archivo]');

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

            respuesta = validation.required(ruta.value);
            if(!respuesta.status){
                enviar = false;
                ruta.nextElementSibling.innerHTML = respuesta.message;
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

            respuesta = validation.required(archivo.value);
            if(!respuesta.status){
                enviar = false;
                archivo.nextElementSibling.innerHTML = respuesta.message;
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
        load: function(data){
            categoria.data = data
            for(let posicion in data){
                let option = document.createElement('option');
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
        load: function(){
            this.contenido.addEventListener('change', function(evento){
                archivo.cambiarArchivo(this.value);
            });
        },
        cambiarArchivo: function(tipo){
            if(tipo == 1){
                this.texto.innerHTML = 'Imagen';
                this.ruta.type = 'file';
            }else if(tipo == 2){
                this.texto.innerHTML = 'Video';
                this.ruta.type = 'text';
                this.ruta.placeholder = 'Link al video';
            }else{
                this.texto.innerHTML = 'Audio';
                this.ruta.type = 'text';
                this.ruta.placeholder = 'Link al audio';
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
                formulario.load();
                archivo.load();
                respuesta = await api.getData('/categorias');
                if(respuesta.status){
                    categoria.load(respuesta.datos.categorias);
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