var route = {
    origen: location.origin,
    url: '/La-Mira-101.5',
    api: '/La-Mira-101.5/api/public',
    load: function(){
        if(this.origen != "http://localhost"){
            this.url = this.origen + '';
            this.api = this.origen + '';
        }
    },
    findGetParameter: function(parameterName){
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
    },
};

route.load();