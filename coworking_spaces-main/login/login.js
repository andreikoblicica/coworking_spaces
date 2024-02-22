$(document).ready(function(){

    document.getElementById("loginForm").onsubmit = function(e){
        e.preventDefault();

        localStorage.setItem('loggedInUserEmail', $('#email').val());

        let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("login"))
        window.location.replace(currentPageBaseUrl + "home/home.html");
    }
});
