
let validStartDate
let validEndDate
let validDurationValue
let validDurationType
let validSpaceType
let validDimension

const validators = {
    "date":/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/gm,
    "number": /^\+?(0|[1-9]\d*)$/gm,
    "nonEmpty": /^(?!\s*$).+$/gm
}

window.onload = function() {
    this.validStartDate = false;
    this.validEndDate = false;
    this.validDurationValue = false;
    this.validDurationType = false;
    this.validSpaceType = false;
    this.validDimension = false;


    document.getElementById("startDate").onblur = function() {
        onInputBlur(this, validators["date"]);
        validateStartDate(this);
    }

    document.getElementById("endDate").onblur = function() {
        onInputBlur(this, validators["date"]);
        validateEndDate(this);
    }

    document.getElementById("durationValue").onblur = function() {
        onInputBlur(this, validators["number"]);
        validateDurationValue(this);
    }

    document.getElementById("durationType").onblur = function() {
        onInputBlur(this,validators["nonEmpty"]);
        validateDurationType(this);
    }

    document.getElementById("spaceType").onblur = function() {
        onInputBlur(this,validators["nonEmpty"]);
        validateSpaceType(this);
    }

    document.getElementById("spaceDimension").onblur = function() {
        onInputBlur(this,validators["nonEmpty"]);
        validateSpaceDimension(this);
    }

  
}


$(document).ready(function(){

    document.getElementById("searchButton").onclick = function(e){
        e.preventDefault();


            if(validStartDate && validEndDate && validDurationValue && validDurationType && validSpaceType && validDimension) {
                console.log("valid");
                let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("find-your-space"))
                window.location.replace(currentPageBaseUrl + "suggested-spaces/suggested-spaces.html");
            } else {
                console.log("invalid");
                confirm('Please fill in all the fields correctly!');
                if (!validStartDate) {
                    document.getElementById("startDate").style.border = "2px solid red";
                }
                if (!validEndDate) {
                    document.getElementById("endDate").style.border = "2px solid red";
                }
                if (!validDurationValue) {
                    document.getElementById("durationValue").style.border = "2px solid red";
                }
                if (!validDurationType) {
                    document.getElementById("durationType").style.border = "2px solid red";
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

function validateStartDate(input){
    if(!isValid(validators["date"], input)) {
        validStartDate = false;
    } else {
        validStartDate = true;
    }
}

function validateEndDate(input){
    if(!isValid(validators["date"], input)) {
        validEndDate = false;
    } else {
        validEndDate = true;
    }
}

function validateDurationValue(input){
    if(!isValid(validators["number"], input)) {
        validDurationValue = false;
    } else {
        validDurationValue = true;
    }
}

function validateDurationType(input){
    if(!isValid(validators["nonEmpty"], input)) {
        validDurationType = false;
    } else {
        validDurationType = true;
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

