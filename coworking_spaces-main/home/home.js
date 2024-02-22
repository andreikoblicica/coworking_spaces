const adminEmail = 'admin@gmail.com'

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
    this.validMessage = false;
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
        onInputBlur(this, validators["surname"]);
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
    $("#ifMembership").hide();

    if(localStorage.getItem('loggedInUserEmail') === adminEmail){
        $('#add_coworking_space_btn').attr('hidden', false)
    }else{
        $('#add_coworking_space_btn').attr('hidden', true)
    }

    console.log(localStorage.getItem('loggedInUserEmail'));

    $('#contactButton').click(function (){
        if (membershipPicked) {
            if(validFirstName && validLastName && validPhone && validEmail && validMessage && validDate && validNoOfSeats) {
                console.log("valid");
                if(confirm('Your request has been registered successfully!')){
                    let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("contact"))
                    window.location.replace(currentPageBaseUrl + "home.html");
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
                    window.location.replace(currentPageBaseUrl + "home.html");
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
    if (that.value == "2" || that.value == "3") {
        $("#ifMembership").show();
        membershipPicked = true;
    } else {
        $("#ifMembership").hide();
        membershipPicked = false;
    }
}

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initAutocomplete() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: "roadmap",
    });
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            // Create a marker for each place.
            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

window.initAutocomplete = initAutocomplete;

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
    if(!isValid(validators["surname"], input)) {
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
