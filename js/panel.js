document.addEventListener('DOMContentLoaded', function(){   
    let panel = {
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

                        let p = document.createElement('p');
                        p.innerHTML = data[posicion].categoria.nombre;
                        td5.appendChild(p);
                    
                    let td6 = document.createElement('td');
                    tr.appendChild(td6);

                        let a1 = document.createElement('a');
                        a1.href = '#';
                        a1.innerHTML = 'Editar';
                        td6.appendChild(a1);

                        let a2 = document.createElement('a');
                        a2.href = '#';
                        a2.innerHTML = 'Borrar';
                        td6.appendChild(a2);
            }
        },
    };

    /** Carga la seccion panel de noticias entera. */
    async function load(){
        respuesta = await getData('/panel');
        if(respuesta.status){
            panel.load(respuesta.datos.noticias);
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