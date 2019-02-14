var route = {
    origen: location.origin,
    url: '/La-Mira-101.5/public',
    api: '/La-Mira-101.5/api/public',
    load: function(){
        console.log(this.origin);
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