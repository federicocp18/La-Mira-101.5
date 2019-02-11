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

    /** Carga la seccion deporte entera. */
    async function load(){
        formulario.load();
        respuesta = await getData('/categorias');
        if(respuesta.status){
            categoria.load(respuesta.datos.categorias);
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