var validation = {
    required: function(input){
        if(input != ''){
            return {
                'status' : 0,
                'message' : 'Todo OK'
            };
        }else{
            return {
                'status' : 1,
                'message' : 'El dato es oblogatorio.'
            };
        }
    },
    max: function(input, number){
        if(input.length <= number){
            return {
                'status' : 0,
                'message' : 'Todo OK'
            };
        }else{
            return {
                'status' : 1,
                'message' : 'El dato no debe ser mayor a ' + number + '.'
            };
        }
    },
    min: function(input, number){
        if(input.length >= number){
            return {
                'status' : 0,
                'message' : 'Todo OK'
            };
        }else{
            return {
                'status' : 1,
                'message' : 'El dato no debe ser menor a ' + number + '.'
            };
        }
    },
    confirmed: function(input, checked){
        if(input == checked){
            return {
                'status' : 0,
                'message' : 'Todo OK'
            };
        }else{
            return {
                'status' : 1,
                'message' : 'Los datos no coinciden.'
            };
        }
    },
    numeric: function(input){
        if(typeof input == number){
            return {
                'status' : 0,
                'message' : 'Todo OK'
            };
        }else{
            return {
                'status' : 1,
                'message' : 'El dato debe ser un valor numerico.'
            };
        }
    },
};