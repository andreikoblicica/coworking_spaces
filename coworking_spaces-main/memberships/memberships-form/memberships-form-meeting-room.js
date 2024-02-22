const validators = {
    "surname": /^[a-zA-Z]{3,}$/gm, // at least 3 letters
    "telephone": /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/igm, // romanian phone number
    "email": /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm, // email
}

let validFirstName
let validLastName
let validPhone
let validEmail
let validMessage
let validDate
let validNoOfSeats
let membershipPicked

window.onload = function() {
    this.validFirstName = false;
    this.validLastName = false;
    this.validPhone = false;
    this.validEmail = false;
    this.validMessage = true;
    this.validDate = true;
    this.validNoOfSeats = true;
    this.membershipPicked = false;

    document.getElementById("firstNameInput").onblur = function() {
        onInputBlur(this, validators["surname"]);
        validateFirstName(this);
    }

    document.getElementById("lastNameInput").onblur = function() {
        onInputBlur(this, validators["surname"]);
        validateLastName(this);
    }

    document.getElementById("phoneInput").onblur = function() {
        onInputBlur(this, validators["telephone"]);
        validatePhone(this);
    }

    document.getElementById("emailInput").onblur = function() {
        onInputBlur(this, validators["email"]);
        validateEmail(this);
    }

    document.getElementById("messageTextArea").onblur = function() {
        if (this.value.length > 500 || this.value.length < 1) {
            this.style.border = "2px solid red";
        } else {
            this.style.border = "2px solid green";
        }
        validateMessage(this);
    }

    document.getElementById("dateInput").onblur = function() {
        validateDate(this);
    }

    document.getElementById("seatSelect").onblur = function() {
        validateNoOfSeats(this);
    }
}

$(document).ready(function(){
    $("html,body").scrollTop(450);
    $("#ifMembership").show();

    $('#contactButton').click(function (){
        if (membershipPicked) {
            if(validFirstName && validLastName && validPhone && validEmail && validMessage && validDate && validNoOfSeats) {
                console.log("valid");
                if(confirm('Your request has been registered successfully!')){
                    let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("contact"))
                    window.location.replace(currentPageBaseUrl + "home/home.html");
                }
            } else {
                console.log("invalid");
                confirm('Please fill in all the fields correctly!');
                if (!validFirstName) {
                    document.getElementById("firstNameInput").style.border = "2px solid red";
                }
                if (!validLastName) {
                    document.getElementById("lastNameInput").style.border = "2px solid red";
                }
                if (!validPhone) {
                    document.getElementById("phoneInput").style.border = "2px solid red";
                }
                if (!validEmail) {
                    document.getElementById("emailInput").style.border = "2px solid red";
                }
                if (!validMessage) {
                    document.getElementById("messageTextArea").style.border = "2px solid red";
                }
                if (!validDate) {
                    document.getElementById("dateInput").style.border = "2px solid red";
                }
                if (!validNoOfSeats) {
                    document.getElementById("seatSelect").style.border = "2px solid red";
                }
            }
        } else {
            if(validFirstName && validLastName && validPhone && validEmail && validMessage) {
                console.log("valid");
                if(confirm('Your request has been registered successfully!')){
                    let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("contact"))
                    window.location.replace(currentPageBaseUrl + "home/home.html");
                }
            } else {
                console.log("invalid");
                confirm('Please fill in all the fields correctly!');
                if (!validFirstName) {
                    document.getElementById("firstNameInput").style.border = "2px solid red";
                }
                if (!validLastName) {
                    document.getElementById("lastNameInput").style.border = "2px solid red";
                }
                if (!validPhone) {
                    document.getElementById("phoneInput").style.border = "2px solid red";
                }
                if (!validEmail) {
                    document.getElementById("emailInput").style.border = "2px solid red";
                }
                if (!validMessage) {
                    document.getElementById("messageTextArea").style.border = "2px solid red";
                }
            }
        }
        
    })
});

function membershipCheck(that) {
    if (that.value == "3") {
        $("#ifMembership").show();
    } else if(that.value == "4") {
        $("#ifMembership").show();
    } else {
        $("#ifMembership").hide();
    }
}

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

function validateFirstName(input) {
    if(!isValid(validators["surname"], input)) {
        validFirstName = false;
    } else {
        validFirstName = true;
    }
}

function validateLastName(input) {
    if(!isValid(validators["surname"], input)) {
        validLastName = false;
    } else {
        validLastName = true;
    }
}

function validatePhone(input) {
    if(!isValid(validators["telephone"], input)) {
        validPhone = false;
    } else {
        validPhone = true;
    }
}

function validateEmail(input) {
    if(!isValid(validators["email"], input)) {
        validEmail = false;
    } else {
        validEmail = true;
    }
}

function validateMessage(input) {
    if (input.value == "") {
        validMessage = false;
    } else {
        validMessage = true;
    }
}

function validateNoOfSeats(input) {
    let value = input.value;
    console.log(value);
    if(input.value == "Number of Seats") {
        validNoOfSeats = false;
        input.style.border = "2px solid red";
    } else {
        validNoOfSeats = true;
        input.style.border = "2px solid green";
    }
}

function validateDate(input) {
    
    let date = new Date(input.value);

    let today = new Date();
    let pickedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if(pickedDate < today) {
        alert("Please pick a date in the future!");
        input.style.border = "2px solid red";
        validDate = false;
    } else {
        input.style.border = "2px solid green";
        validDate = true;
    }
}