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
            let formData = new FormData(formulario.contenido);
            let respuesta = await sendData('/noticia/crear', formData);
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
                formulario.load();
                respuesta = await getData('/categorias');
                if(respuesta.status){
                    categoria.load(respuesta.datos.categorias);
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