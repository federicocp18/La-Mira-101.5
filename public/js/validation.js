var validation = {
    required: function(input){
        if(input != ''){
            return {
                'status' : 1,
                'message' : 'Todo OK'
            };
        }else{
            return {
                'status' : 0,
                'message' : 'El dato es obligatorio.'
            };
        }
    },
    max: function(input, number){
        if(input.length <= number){
            return {
                'status' : 1,
                'message' : 'Todo OK'
            };
        }else{
            return {
                'status' : 0,
                'message' : 'El dato no debe ser mayor a ' + number + '.'
            };
        }
    },
    min: function(input, number){
        if(input.length >= number){
            return {
                'status' : 1,
                'message' : 'Todo OK'
            };
        }else{
            return {
                'status' : 0,
                'message' : 'El dato no debe ser menor a ' + number + '.'
            };
        }
    },
    confirmed: function(input, checked){
        if(input == checked){
            return {
                'status' : 1,
                'message' : 'Todo OK'
            };
        }else{
            return {
                'status' : 0,
                'message' : 'Los datos no coinciden.'
            };
        }
    },
    numeric: function(input){
        if(typeof input == Number){
            return {
                'status' : 1,
                'message' : 'Todo OK'
            };
        }else{
            return {
                'status' : 0,
                'message' : 'El dato debe ser un valor numerico.'
            };
        }
    },
};