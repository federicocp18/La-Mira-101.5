document.addEventListener('DOMContentLoaded', function(){
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

    /** Carga la seccion social entera. */
    async function load(){
        sesion.load();
        respuesta = await api.getData('/noticias/3');
        if(respuesta.status){
            social.load(respuesta.datos.noticias);
        }
    }

    load();
});