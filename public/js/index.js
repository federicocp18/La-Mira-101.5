document.addEventListener('DOMContentLoaded', function(){
    let nacionales = {
        contenido: document.querySelector('#nacionales'),
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

    let locales = {
        contenido: document.querySelector('#locales'),
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

    let interior = {
        contenido: document.querySelector('#interior'),
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

    let sociales = {
        contenido: document.querySelector('#sociales'),
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

    let deportes = {
        contenido: document.querySelector('#deportes'),
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
            this.hide();
        },
    };

    /** Carga la home entera. */
    async function load(){
        respuesta = await api.getData('/home');
        if(respuesta.status){
            sesion.load();
            let noticias_nacionales = distinguir(respuesta.datos, '1');
            nacionales.load(noticias_nacionales);
            let noticias_locales = distinguir(respuesta.datos, '2');
            locales.load(noticias_locales);
            let noticias_interior = distinguir(respuesta.datos, '3');
            interior.load(noticias_interior);
            let noticias_economia = distinguir(respuesta.datos, '4');
            economia.load(noticias_economia);
            let noticias_politica = distinguir(respuesta.datos, '5');
            politica.load(noticias_politica);
            let noticias_sociales = distinguir(respuesta.datos, '6');
            sociales.load(noticias_sociales);
            let noticias_deportes = distinguir(respuesta.datos, '7');
            deportes.load(noticias_deportes);
            let noticias_seguridad = distinguir(respuesta.datos, '8');
            seguridad.load(noticias_seguridad);
            let noticias_comunitarios = distinguir(respuesta.datos, '9');
            comunitarios.load(noticias_comunitarios);
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
});