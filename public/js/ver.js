document.addEventListener('DOMContentLoaded', function(){
    let ver = {
        contenido: document.querySelector('#ver_contenido'),
        load: function(data){
            let article = document.createElement('article');
            this.contenido.appendChild(article);

                let picture = document.createElement('picture');
                article.appendChild(picture);

                    let h2 = document.createElement('h2');
                    h2.innerHTML = data.titulo;
                    picture.appendChild(h2);

                    let img = document.createElement('img');
                    img.src = 'img/noticias/' + data.imagen;
                    img.alt = data.titulo;
                    picture.appendChild(img);

                    let p = document.createElement('p');
                    p.innerHTML = data.descripcion;
                    picture.appendChild(p);
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

    /** Carga la seccion ver entera. */
    async function load(){
        sesion.load();
        respuesta = await api.getData('/noticia/' + route.findGetParameter('noticia'));
        if(respuesta.status){
            ver.load(respuesta.datos.noticia);
        }
    }

    load();
});