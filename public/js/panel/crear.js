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
                    window.location.replace(route.url + '/panel_' + categoria_nombre + '.html');
                }else{
                    console.log(respuesta.error);
                }
            }
        },
        validar : function(){
            let titulo = document.querySelector('input[name=titulo]');
            let imagen = document.querySelector('input[name=imagen]');
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

            respuesta = validation.required(imagen.value);
            if(!respuesta.status){
                enviar = false;
                imagen.nextElementSibling.innerHTML = respuesta.message;
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

    /** Carga la seccion deporte entera. */
    async function load(){
        if(localstorage.load('LaMiraToken')){
            let token = localstorage.load('LaMiraToken');
            let formData = new FormData();
            formData.append('token', token)
            let respuesta = await api.sendData('/verificar', formData);
            if(respuesta.status){
                sesion.load();
                formulario.load();
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