document.addEventListener('DOMContentLoaded', function(){
    /**
     * Obtiene un parametro GET de la ruta
     * 
     * @param {string} parameterName 
     */
    function findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
              tmp = item.split("=");
              if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }

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
            let formData = new FormData(formulario.contenido);
            let respuesta = await sendData('/noticia/' + id_noticia + '/editar', formData);
            if(respuesta.status){
                let categoria_seleccionada = document.querySelector('#categoria').value;
                let categoria_nombre = categoria.obtener(categoria_seleccionada);
                window.location.replace(URL + '/panel_' + categoria_nombre + '.html');
            }else{
                console.log(respuesta.error);
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
                let respuesta = await sendData('/verificar', formData);
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
            window.location.replace(URL + '/acceder.html');
        },
    };

    /** Carga la seccion deporte entera. */
    async function load(){
        if(localstorage.load('LaMiraToken')){
            let token = localstorage.load('LaMiraToken');
            let formData = new FormData();
            formData.append('token', token)
            let respuesta = await sendData('/verificar', formData);
            if(respuesta.status){
                sesion.load();
                respuesta = await getData('/noticia/' + findGetParameter('noticia'));
                if(respuesta.status){
                    formulario.load(respuesta.datos.noticia);
                }
                respuesta2 = await getData('/categorias');
                if(respuesta2.status){
                    categoria.load(respuesta2.datos.categorias, respuesta.datos.noticia);
                }
            }else{
                localstorage.remove('LaMiraToken');
                window.location.replace(URL + '/acceder.html');
            }
        }else{
            window.location.replace(URL + '/acceder.html');
        }
    }

    load();

    /**
     * Obtiene datos de la API.
     * 
     * @param {string} ruta 
     */
    function getData(ruta){
        return fetch(API + ruta)
            .then(respuesta => {
                return respuesta.json();
            }).catch(error => {
                console.log(error);
            })
    }

    /**
     * Envia datos a la API.
     * 
     * @param {string} ruta 
     * @param {FormData} BODY 
     */
    async function sendData(ruta, BODY){
        return await fetch(API + ruta,{
            method: 'POST',
            body: BODY,
        }).then(respuesta => {
            return respuesta.json();
        }).catch();
    }
});