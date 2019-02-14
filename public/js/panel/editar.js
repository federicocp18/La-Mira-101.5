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
            document.querySelector('#formulario form textarea:first-of-type').innerHTML = noticia.preview;
            document.querySelector('#formulario form textarea:last-of-type').innerHTML = noticia.descripcion;
        },
        enviar: async function(id_noticia){
            let estatus = this.validar();
            if(estatus){
                let formData = new FormData(formulario.contenido);
                let respuesta = await api.sendData('/noticia/' + id_noticia + '/editar', formData);
                if(respuesta.status){
                    let categoria_seleccionada = document.querySelector('#categoria').value;
                    let categoria_nombre = categoria.obtener(categoria_seleccionada);
                    window.location.replace(route.url + '/panel_' + categoria_nombre.toLowerCase() + '.html');
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

    /** Carga la seccion deporte entera. */
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