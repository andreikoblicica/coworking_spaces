let validDate

window.onload = function() {
    this.validDate = false;

    document.getElementById("dateInput").onblur = function() {
        validateDate(this);
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

$(document).ready(function(){
    $('#searchButton').click(function (){
        if (validDate == false) {
            if(confirm("Please pick a date in the future!")){
                let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("memberships-form.html"))
                window.location.replace(currentPageBaseUrl + "memberships-form.html");
            }
            
        } else {
            let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("memberships"))
            window.location.replace(currentPageBaseUrl + "suggested-spaces/suggested-spaces.html");
        }
    })
});