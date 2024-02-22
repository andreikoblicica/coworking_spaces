const validators = {
    "email": /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm, // email
}

$(document).ready(function(){

    document.getElementById("signupForm").onsubmit = function(e){
        e.preventDefault();

        errors = document.createElement("div");

        email = document.getElementById("email")
        if (!isValid(email, validators["email"])) {
            error = document.createElement('li')
            error.innerHTML = "Invalid email"
            errors.appendChild(error)
        }

        password = document.getElementById("password")
        confirmPassword = document.getElementById("confirmPassword")

        if(password.value.length < 8) {
            error = document.createElement('li')
            error.innerHTML = "Password must be at least 8 characters"
            errors.appendChild(error)
        } else {
            if (password.value != confirmPassword.value) {
                error = document.createElement('li')
                error.innerHTML = "Passwords do not match"
                errors.appendChild(error)
            }
        }

        errors_par = document.createElement('p')
        errors_par.id = 'errors'
        if(errors.childNodes.length > 0) {
            errors_par.appendChild(errors)
            document.getElementById("errors").replaceWith(errors_par)
        } else {
            let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("signup"))
            window.location.replace(currentPageBaseUrl + "home/home.html");
        }
    }

});

function isValid(input, regex) {
    let value = input.value;
    return value.match(regex);
}

