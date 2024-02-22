
let validFirstName
let validLastName
let validEmail
let validPhone
let validNumberOfSpaces
let validNumberOfBathrooms
let validNumberOfParkingSpaces
let validSpaceType
let validDimension

const validators = {
    "number": /^\+?(0|[1-9]\d*)$/gm,
    "nonEmpty": /^(?!\s*$).+$/gm,
    "surname": /^[a-zA-Z]{3,}$/gm, // at least 3 letters
    "phone": /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/igm, // romanian phone number
    "email": /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm, // email
}

window.onload = function() {
    this.validFirstName = false;
    this.validLastName = false;
    this.validPhone = false;
    this.validEmail = false;
    this.validNumberOfSpaces = false;
    this.validNumberOfBathrooms = false;
    this.validNumberOfParkingSpaces = true;
    this.validSpaceType = false;
    this.validDimension = false;

    document.getElementById("firstName").onblur = function() {
        onInputBlur(this, validators["surname"]);
        validateFirstName(this);
    }

    document.getElementById("lastName").onblur = function() {
        onInputBlur(this, validators["surname"]);
        validateLastName(this);
    }

    document.getElementById("email").onblur = function() {
        onInputBlur(this, validators["email"]);
        validateEmail(this);
    }

    document.getElementById("phone").onblur = function() {
        onInputBlur(this,validators["phone"]);
        validatePhone(this);
    }

    document.getElementById("numberOfSpaces").onblur = function() {
        onInputBlur(this,validators["number"]);
        validateNumberOfSpaces(this);
    }

    document.getElementById("numberOfBathrooms").onblur = function() {
        onInputBlur(this,validators["nonEmpty"]);
        validateNumberOfBathrooms(this);
    }

    document.getElementById("numberOfParkingSpaces").onblur = function() {
        onInputBlur(this,validators["number"]);
        validateNumberOfParkingSpaces(this);
    }

    document.getElementById("spaceType").onblur = function() {
        onInputBlur(this,validators["nonEmpty"]);
        validateSpaceType(this);
        console.log(this.val())
    }

    document.getElementById("spaceDimension").onblur = function() {
        onInputBlur(this,validators["nonEmpty"]);
        validateSpaceDimension(this);
        console.log(this.val())
    }

  
}


$(document).ready(function(){
    $("#parkingNumber").hide();
    document.getElementById("sendRequestButton").onclick = function(e){
        e.preventDefault();



        
            if(validFirstName && validLastName && validPhone && validEmail && validNumberOfSpaces && validNumberOfBathrooms && validNumberOfParkingSpaces && validSpaceType && validDimension) {
                console.log("valid");
                confirm('Listing successful! You will be contacted soon to provide more details');
                let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("list-your-space"))
                window.location.replace(currentPageBaseUrl + "home/home.html");
            } else {
                console.log("invalid");
                confirm('Please fill in all the fields correctly!');
                if (!validFirstName) {
                    document.getElementById("firstName").style.border = "2px solid red";
                }
                if (!validLastName) {
                    document.getElementById("lastName").style.border = "2px solid red";
                }
                if (!validPhone) {
                    document.getElementById("phone").style.border = "2px solid red";
                }
                if (!validEmail) {
                    document.getElementById("email").style.border = "2px solid red";
                }
                if (!validNumberOfSpaces) {
                    document.getElementById("numberOfSpaces").style.border = "2px solid red";
                }
                if (!validNumberOfBathrooms) {
                    document.getElementById("numberOfBathrooms").style.border = "2px solid red";
                }
                if(document.getElementById("parkingCheckbox").checked){
                    if (!validNumberOfParkingSpaces) {
                        document.getElementById("numberOfParkingSpaces").style.border = "2px solid red";
                    }
                }
               
                if (!validSpaceType) {
                    document.getElementById("spaceType").style.border = "2px solid red";
                }
                if (!validDimension) {
                    document.getElementById("spaceDimension").style.border = "2px solid red";
                }
               
            }
        }

});

function onInputBlur(input, regex) {
    if(!isValid(regex, input)) {
        input.style.border = "2px solid red";
    } else {
        input.style.border = "2px solid green";
    }
}

function validateFirstName(input){
    if(!isValid(validators["surname"], input)) {
        validFirstName = false;
    } else {
        validFirstName = true;
    }
}

function validateLastName(input){
    if(!isValid(validators["date"], input)) {
        validLastName = false;
    } else {
        validLastName = true;
    }
}

function validatePhone(input){
    if(!isValid(validators["phone"], input)) {
        validPhone = false;
    } else {
        validPhone = true;
    }
}

function validateEmail(input){
    if(!isValid(validators["email"], input)) {
        validEmail = false;
    } else {
        validEmail = true;
    }
}

function validateNumberOfSpaces(input){
    if(!isValid(validators["nonEmpty"], input)) {
        validNumberOfSpaces = false;
    } else {
        validNumberOfSpaces = true;
    }
}

function validateNumberOfBathrooms(input){
    if(!isValid(validators["nonEmpty"], input)) {
        validNumberOfBathrooms = false;
    } else {
        validNumberOfBathrooms = true;
    }
}
function validateNumberOfParkingSpaces(input){
    let check=document.getElementById("parkingCheckbox").checked
    if(check){
        if(!isValid(validators["number"], input)) {
            validNumberOfParkingSpaces = false;
        } else {
            validNumberOfParkingSpaces = true;
        }
    }
    
}

function validateSpaceType(input){
    if(!isValid(validators["nonEmpty"], input)) {
        validSpaceType = false;
    } else {
        validSpaceType = true;
    }
}

function validateSpaceDimension(input){
    if(!isValid(validators["nonEmpty"], input)) {
        validDimension = false;
    } else {
        validDimension = true;
    }
}

function isValid(regex, input) {
    let value = input.value;
    return value.match(regex);
}



function toggleParking(that) {
    if (that.checked == true) {
        $("#parkingNumber").show();
    } else {
        $("#parkingNumber").hide();
    }
}