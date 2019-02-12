document.addEventListener('DOMContentLoaded', function(){
    let politica = {
        contenido: document.querySelector('#politica'),
        load: function(data){
            for(let posicion in data){
                let a = document.createElement('a');
                a.href = 'ver.html?noticia=' + data[posicion].id_noticia;
                this.contenido.appendChild(a);

                    let article = document.createElement('article');
                    a.appendChild(article);

                        let picture = document.createElement('picture');
                        article.appendChild(picture);

                            let img = document.createElement('img');
                            img.src = 'img/noticias/' + data[posicion].imagen;
                            img.alt = data[posicion].titulo;
                            picture.appendChild(img);

                            let h3 = document.createElement('h3');
                            h3.innerHTML = data[posicion].titulo;
                            picture.appendChild(h3);

                            let p = document.createElement('p');
                            p.innerHTML = data[posicion].preview;
                            picture.appendChild(p);
            }
        },
    };

    let economia = {
        contenido: document.querySelector('#economia'),
        load: function(data){
            for(let posicion in data){
                let a = document.createElement('a');
                a.href = 'ver.html?noticia=' + data[posicion].id_noticia;
                this.contenido.appendChild(a);

                    let article = document.createElement('article');
                    a.appendChild(article);

                        let picture = document.createElement('picture');
                        article.appendChild(picture);

                            let img = document.createElement('img');
                            img.src = 'img/noticias/' + data[posicion].imagen;
                            img.alt = data[posicion].titulo;
                            picture.appendChild(img);

                            let h3 = document.createElement('h3');
                            h3.innerHTML = data[posicion].titulo;
                            picture.appendChild(h3);

                            let p = document.createElement('p');
                            p.innerHTML = data[posicion].preview;
                            picture.appendChild(p);
            }
        },
    };

    let social = {
        contenido: document.querySelector('#social'),
        load: function(data){
            for(let posicion in data){
                let a = document.createElement('a');
                a.href = 'ver.html?noticia=' + data[posicion].id_noticia;
                this.contenido.appendChild(a);

                    let article = document.createElement('article');
                    a.appendChild(article);

                        let picture = document.createElement('picture');
                        article.appendChild(picture);

                            let img = document.createElement('img');
                            img.src = 'img/noticias/' + data[posicion].imagen;
                            img.alt = data[posicion].titulo;
                            picture.appendChild(img);

                            let h3 = document.createElement('h3');
                            h3.innerHTML = data[posicion].titulo;
                            picture.appendChild(h3);

                            let p = document.createElement('p');
                            p.innerHTML = data[posicion].preview;
                            picture.appendChild(p);
            }
        },
    };

    let deporte = {
        contenido: document.querySelector('#deporte'),
        load: function(data){
            for(let posicion in data){
                let a = document.createElement('a');
                a.href = 'ver.html?noticia=' + data[posicion].id_noticia;
                this.contenido.appendChild(a);

                    let article = document.createElement('article');
                    a.appendChild(article);

                        let picture = document.createElement('picture');
                        article.appendChild(picture);

                            let img = document.createElement('img');
                            img.src = 'img/noticias/' + data[posicion].imagen;
                            img.alt = data[posicion].titulo;
                            picture.appendChild(img);

                            let h3 = document.createElement('h3');
                            h3.innerHTML = data[posicion].titulo;
                            picture.appendChild(h3);

                            let p = document.createElement('p');
                            p.innerHTML = data[posicion].preview;
                            picture.appendChild(p);
            }
        },
    };

    let seguridad = {
        contenido: document.querySelector('#seguridad'),
        load: function(data){
            for(let posicion in data){
                let a = document.createElement('a');
                a.href = 'ver.html?noticia=' + data[posicion].id_noticia;
                this.contenido.appendChild(a);

                    let article = document.createElement('article');
                    a.appendChild(article);

                        let picture = document.createElement('picture');
                        article.appendChild(picture);

                            let img = document.createElement('img');
                            img.src = 'img/noticias/' + data[posicion].imagen;
                            img.alt = data[posicion].titulo;
                            picture.appendChild(img);

                            let h3 = document.createElement('h3');
                            h3.innerHTML = data[posicion].titulo;
                            picture.appendChild(h3);

                            let p = document.createElement('p');
                            p.innerHTML = data[posicion].preview;
                            picture.appendChild(p);
            }
        },
    };

    let comunitarios = {
        contenido: document.querySelector('#comunitarios'),
        load: function(data){
            for(let posicion in data){
                let a = document.createElement('a');
                a.href = 'ver.html?noticia=' + data[posicion].id_noticia;
                this.contenido.appendChild(a);

                    let article = document.createElement('article');
                    a.appendChild(article);

                        let picture = document.createElement('picture');
                        article.appendChild(picture);

                            let img = document.createElement('img');
                            img.src = 'img/noticias/' + data[posicion].imagen;
                            img.alt = data[posicion].titulo;
                            picture.appendChild(img);

                            let h3 = document.createElement('h3');
                            h3.innerHTML = data[posicion].titulo;
                            picture.appendChild(h3);

                            let p = document.createElement('p');
                            p.innerHTML = data[posicion].preview;
                            picture.appendChild(p);
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
            this.hide();
        },
    };

    /** Carga la home entera. */
    async function load(){
        respuesta = await getData('/home');
        if(respuesta.status){
            sesion.load();
            let politicas = distinguir(respuesta.datos, '1');
            politica.load(politicas);
            let economias = distinguir(respuesta.datos, '2');
            economia.load(economias);
            let sociales = distinguir(respuesta.datos, '3');
            social.load(sociales);
            let deportes = distinguir(respuesta.datos, '4');
            deporte.load(deportes);
            let seguridades = distinguir(respuesta.datos, '5');
            seguridad.load(seguridades);
            let comunitario = distinguir(respuesta.datos, '6');
            comunitarios.load(comunitario);
        }
    }

    /**
     * Diferenciar las noticias recibidas.
     * 
     * @param {Noticia[]} data 
     * @param {string} id_categoria 
     */
    function distinguir(data, id_categoria){
        let noticias = [];
        for(let posicion in data.noticias){
            if(data.noticias[posicion].categoria.id_categoria == id_categoria){
                noticias.push(data.noticias[posicion]);
            }
        }
        return noticias;
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