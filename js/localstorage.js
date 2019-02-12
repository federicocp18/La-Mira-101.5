var localstorage = {
    load: function(name){
        let datos;
        if(localStorage.getItem(name)){
            return JSON.parse(localStorage.getItem(name));
        }else{
            return false;
        }
    },
    save: function(name, object){
        localStorage.setItem(name, JSON.stringify(object));
    },
    remove: function(name){
        localStorage.removeItem(name);
    },
};