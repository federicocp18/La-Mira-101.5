var api = {
    getData: function(ruta){
        console.log(route.api);
        return fetch(route.api + ruta)
            .then(respuesta => {
                return respuesta.json();
            }).catch(error => {
                console.log(error);
            })
    },
    sendData: async function (ruta, datos = null){
        if(datos !== null){
            return await fetch(route.api + ruta,{
                method: 'POST',
                body: datos,
            }).then(respuesta => {
                return respuesta.json();
            }).catch();
        }else{
            return await fetch(route.api + ruta,{
                method: 'DELETE',
            }).then(respuesta => {
                return respuesta.json();
            }).catch();
        }
    },
}