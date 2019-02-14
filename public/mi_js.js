var aparecer=false;
var d = document;
var menu = d.getElementById('menu');
var desplegable = d.getElementById('desplegable');
var desplegable_conten = d.getElementById('desplegable_conten');
menu.onclick = function(){
	desplegar();
};
desplegable.onclick = function(){
	cerrar();
};
var desplegar = function(){
	if(aparecer==false){
	desplegable.style.right = 0;
	desplegable_conten.style.right = 0;
	desplegable.style.animation = "desplegable1 0.4s";
	aparecer=true;
	}
};
var cerrar = function(){
	if(aparecer==true){
	desplegable.style.right = -100+"vw";
	desplegable_conten.style.right = -100+"vw";
	desplegable.style.animation = "desplegable2 0.4s";
	aparecer=false;
	}
};

$(window).load(function() {
    $(".loader").fadeOut("slow");
});






