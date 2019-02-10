var ORIGIN = location.origin;
if(ORIGIN == "http://localhost"){
    var URL = ORIGIN + '/La-Mira-101.5';
    var API = ORIGIN + '/La-Mira-101.5/api/public';
}else{
    var URL = ORIGIN + '';
    var API = ORIGIN + '';
}