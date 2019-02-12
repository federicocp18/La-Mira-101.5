document.addEventListener('DOMContentLoaded', function(){    
    let acceder = {
        contenido: document.querySelector('#log_panel form'),
        boton: document.querySelector('#log_panel form input[type=submit]'),
        load: function(){
            this.boton.addEventListener('click', function(evento){
                evento.preventDefault();

                acceder.enviar();
            });
        },
        enviar: async function(){
            let formData = new FormData(acceder.contenido);
            let respuesta = await sendData('/login', formData);
            if(respuesta.status){
                localstorage.save('LaMiraToken', respuesta.token);
                window.location.replace(URL + '/panel_politica.html');
            }else{

            }
        },
    };

    /** Carga la seccion ver entera. */
    async function load(){
        if(localstorage.load('LaMiraToken')){
            let token = localstorage.load('LaMiraToken');
            let formData = new FormData();
            formData.append('token', token)
            let respuesta = await sendData('/verificar', formData);
            if(respuesta.status){
                window.location.replace(URL + '/panel_politica.html');
            }else{
                localstorage.remove('LaMiraToken');
                acceder.load();
            }
        }else{
            acceder.load();
        }
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