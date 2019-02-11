document.addEventListener('DOMContentLoaded', function(){
    let botones = {
        load: function(){
            let links = document.querySelectorAll('a[data-id_noticia]');
            console.log(links);
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

    /** Carga la seccion deporte entera. */
    async function load(){
        botones.load();
    }

    load();

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