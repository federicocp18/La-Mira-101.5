document.addEventListener('DOMContentLoaded', function(){
    
    let politica = {
        contenido: document.querySelector('#tabla_noticias table'),
        load: function(data){
            for(let posicion in data){
                let tr = document.createElement('tr');
                this.contenido.appendChild(tr);

                    let td1 = document.createElement('td');
                    td1.innerHTML = data[posicion].titulo;
                    tr.appendChild(td1);
                    
                    let td2 = document.createElement('td');
                    tr.appendChild(td2);

                        let img = document.createElement('img');
                        img.src = 'img/noticias/' + data[posicion].imagen;
                        img.alt = data[posicion].titulo;
                        td2.appendChild(img);

                    let td3 = document.createElement('td');
                    td3.innerHTML = data[posicion].preview;
                    tr.appendChild(td3);
                    
                    let td4 = document.createElement('td');
                    td4.innerHTML = data[posicion].descripcion;
                    tr.appendChild(td4);
                    
                    let td5 = document.createElement('td');
                    tr.appendChild(td5);

                        let a1 = document.createElement('a');
                        a1.href = 'formulario.html?noticia=' + data[posicion].id_noticia;
                        a1.innerHTML = 'Editar';
                        td5.appendChild(a1);

                        let a2 = document.createElement('a');
                        a2.href = '#';
                        a2.innerHTML = 'Borrar';
                        a2.dataset.id_noticia = data[posicion].id_noticia;
                        td5.appendChild(a2);
            }
        },
    };
    
    let botones = {
        load: function(){
            let links = document.querySelectorAll('a[data-id_noticia]');
            for(let i = 0; i < links.length; i++){
                links[i].addEventListener('click', function(evento){
                    evento.preventDefault();

                    botones.eliminar(this.dataset.id_noticia);
                });
            }
        },
        eliminar: async function(id_noticia){
            let respuesta = await sendData('/noticia/' + id_noticia + '/eliminar');
            if(respuesta.status){
                let tr = document.querySelector('a[data-id_noticia="' + id_noticia + '"]').parentNode.parentNode;
                politica.contenido.removeChild(tr);
            }else{
                console.log(respuesta.error);
            }
        },
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

    /** Carga la seccion politica entera. */
    async function load(){
        if(localstorage.load('LaMiraToken')){
            let token = localstorage.load('LaMiraToken');
            let formData = new FormData();
            formData.append('token', token)
            let respuesta = await sendData('/verificar', formData);
            if(respuesta.status){
                sesion.load();
                respuesta = await getData('/noticias/1');
                if(respuesta.status){
                    politica.load(respuesta.datos.noticias);
                }
                botones.load();
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
    async function sendData(ruta, BODY = null){
        if(BODY !== null){
            return await fetch(API + ruta,{
                method: 'POST',
                body: BODY,
            }).then(respuesta => {
                return respuesta.json();
            }).catch();
        }else{
            return await fetch(API + ruta,{
                method: 'DELETE',
            }).then(respuesta => {
                return respuesta.json();
            }).catch();
        }
    }
});