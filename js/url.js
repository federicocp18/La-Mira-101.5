document.addEventListener('DOMContentLoaded', function(){
    const ORIGIN = window.location.origin;
    if(ORIGIN == "http://localhost"){
        const URL = ORIGIN + '/La-Mira-101.5';
        const API = ORIGIN + '/La-Mira-101.5/api/public';
    }
});