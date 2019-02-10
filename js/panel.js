document.addEventListener('DOMContentLoaded', function(){
    /**
     * Obtiene un parametro GET de la ruta
     * 
     * @param {string} parameterName 
     */
    function findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
              tmp = item.split("=");
              if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }
    
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

    /** Carga la seccion ver entera. */
    async function load(){
        respuesta = await getData('/noticia/' + findGetParameter('noticia'));
        if(respuesta.status){
            ver.load(respuesta.datos.noticia);
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
});