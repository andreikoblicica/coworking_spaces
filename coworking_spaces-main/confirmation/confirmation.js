const validators = {
    "name": /^[a-zA-Z]{3,}$/gm, // at least 3 letters
    "telephone": /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/igm, // romanian phone number
    "address": /^[a-zA-Z0-9\s,'-]*$/gm, // address
    "city": /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/gm, // city
    "credit card": /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/gm, // credit card
    "cvv": /^[0-9]{3,4}$/gm, // cvv
    "expiration date": /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/gm, // expiration date
}

let validName = false;
let validPhone = false;
let validAddress = false;
let validCity = false;
let validCreditCard = true;
let validCvv = true;
let validExpirationDate = true;
let validCountry = false;
let creditSelected = true;

window.onload = function() {
    document.getElementById("nameInput").onblur = function() {
        onInputBlur(this, validators["name"]);
        validateName(this);
    }

    document.getElementById("phoneInput").onblur = function() {
        onInputBlur(this, validators["telephone"]);
        validatePhone(this);
    }

    document.getElementById("addressInput").onblur = function() {
        onInputBlur(this, validators["address"]);
        validateAddress(this);
    }

    document.getElementById("cityInput").onblur = function() {
        onInputBlur(this, validators["city"]);
        validateCity(this);
    }

    document.getElementById("cardNumberInput").onblur = function() {
        onInputBlur(this, validators["credit card"]);
        validateCreditCard(this);
    }

    document.getElementById("cvcInput").onblur = function() {
        onInputBlur(this, validators["cvv"]);
        validateCvv(this);
    }

    document.getElementById("cardExpirationInput").onblur = function() {
        onInputBlur(this, validators["expiration date"]);
        validateExpirationDate(this);
    }

    document.getElementById("countrySelect").onblur = function() {
        validateCountry(this);
    }
}


$(document).ready(function(){

    $("input[name$='payment']").click(function() {
        var test = $(this).val();

        if(test == "credit") {
            creditSelected = true;
        } else {
            creditSelected = false;
        }

        $("div.desc").hide();
        $("#cardDetails" + test).show();
    });

    $('#confirmPaymentBtn').click(function (){
        if (creditSelected) {
            if (!validName || !validPhone || !validAddress || !validCity || !validCreditCard || !validCvv || !validExpirationDate) {
                if(confirm('Please fill in all the fields correctly!')){
                    let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("confirmation.html"))
                    window.location.replace(currentPageBaseUrl + "confirmation.html");
                } 
            } else {
                if(confirm('Your payment has been accepted!')){
                    let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("confirmation"))
                    window.location.replace(currentPageBaseUrl + "home/home.html");
                }
            }
        } else {
            if (!validName || !validPhone || !validAddress || !validCity || !validCountry) {
                if(confirm('Please fill in all the fields correctly!')){
                    let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("confirmation.html"))
                    window.location.replace(currentPageBaseUrl + "confirmation.html");
                }
            } else {
                    if(confirm('Your payment has been accepted!')){
                        let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("confirmation"))
                        window.location.replace(currentPageBaseUrl + "home/home.html");
                    }
                }
        }
    });
});

function onInputBlur(input, regex) {
    if(!isValid(regex, input)) {
        input.style.border = "2px solid red";
    } else {
        input.style.border = "2px solid green";
    }
}

function isValid(regex, input) {
    let value = input.value;
    return value.match(regex);
}

function validateName(input) {
    if(!isValid(validators["name"], input)) {
        validName = false;
    } else {
        validName = true;
    }
}

function validatePhone(input) {
    if(!isValid(validators["telephone"], input)) {
        validPhone = false;
    } else {
        validPhone = true;
    }
}

function validateAddress(input) {
    if(!isValid(validators["address"], input)) {
        validAddress = false;
    } else {
        validAddress = true;
    }
}

function validateCity(input) {
    if(!isValid(validators["city"], input)) {
        validCity = false;
    } else {
        validCity = true;
    }
}

function validateCreditCard(input) {
    if(!isValid(validators["credit card"], input)) {
        validCreditCard = false;
    } else {
        validCreditCard = true;
    }
}

function validateCvv(input) {
    if(!isValid(validators["cvv"], input)) {
        validCvv = false;
    } else {
        validCvv = true;
    }
}

function validateExpirationDate(input) {
    if(!isValid(validators["expiration date"], input)) {
        validExpirationDate = false;
    } else {
        validExpirationDate = true;
    }
}

function validateCountry(input) {
    if(input.value == "Select country") {
        validCountry = false;
    } else {
        validCountry = true;
    }
}
