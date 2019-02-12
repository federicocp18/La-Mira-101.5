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
            let estatus = acceder.validar();
            if(estatus){
                let formData = new FormData(acceder.contenido);
                let respuesta = await api.sendData('/login', formData);
                if(respuesta.status){
                    localstorage.save('LaMiraToken', respuesta.token);
                    window.location.replace(route.url + '/panel_politica.html');
                }else{
    
                }
            }
        },
        validar : function(){
            let nombre = document.querySelector('input[type=text]');
            let clave = document.querySelector('input[type=password]');

            let enviar = true;
            let respuesta = validation.required(nombre.value);
            if(!respuesta.status){
                enviar = false;
            }

            respuesta = validation.required(clave.value);
            if(!respuesta.status){
                enviar = false;
            }

            if(enviar){
                return true;
            }else{
                return false;
            }
        },
    };

    /** Carga la seccion ver entera. */
    async function load(){
        if(localstorage.load('LaMiraToken')){
            let token = localstorage.load('LaMiraToken');
            let formData = new FormData();
            formData.append('token', token)
            let respuesta = await api.sendData('/verificar', formData);
            if(respuesta.status){
                window.location.replace(route.url + '/panel_politica.html');
            }else{
                localstorage.remove('LaMiraToken');
                acceder.load();
            }
        }else{
            acceder.load();
        }
    }

    load();
});