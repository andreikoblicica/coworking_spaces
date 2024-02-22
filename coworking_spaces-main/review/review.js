$(document).ready(function(){

    document.getElementById("reviewForm").onsubmit = function(e){
        e.preventDefault();

        let allRequiredFieldsAreValidated = validateFields();

        if(allRequiredFieldsAreValidated){
            $('#error_text').attr('hidden', true)
            $('#error_list').empty()

            var  formData = [];
            localStorage.removeItem('formData');
            formData.push({ name: 'title', value: $('#rating-title').val()});
            formData.push({ name: 'review', value: $('#review-text-area').val()});
            formData.push({ name: 'reviewerName', value: $('#reviewer-name').val()});
            localStorage.formData = JSON.stringify(formData);

            if(confirm('Your review has been posted! Thank you for your feedback!')){
                let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("review"))
                window.location.replace(currentPageBaseUrl + "gallery/gallery-coworking-space.html");
            }
        }else{
            $('#error_text').attr('hidden', false)
        }
    }

    selectJustOneRating('overall-rating')
    selectJustOneRating('location-rating')
    selectJustOneRating('wifi-rating')
    selectJustOneRating('productivity-rating')
    selectJustOneRating('comfort-rating')
    selectJustOneRating('social-rating')
    selectJustOneRating('amenities-rating')
});

function selectJustOneRating(inputClass){
    let ratingInputs = document.getElementsByClassName(inputClass);
    for(let i=0;i<ratingInputs.length;i++){
        ratingInputs[i].addEventListener('click', function () {
            let id = ratingInputs[i].id
            let idx = id.split('-')[2]

            for (let j=0;j<5;j++){
                if(j !== parseInt(idx)){
                    $('#' + inputClass + '-' + j).prop('checked', false)
                }
            }
        });
    }
}

function validateFields(){
    let overallRating = validateRatingRadioButtons('overall-rating', 'overall rating')
    let locationRating = validateRatingRadioButtons('location-rating', 'location rating')
    let wifiRating = validateRatingRadioButtons('wifi-rating', 'wifi rating')
    let productivityRating = validateRatingRadioButtons('productivity-rating', 'productivity rating')
    let comfortRating = validateRatingRadioButtons('comfort-rating', 'comfort rating')
    let socialRating = validateRatingRadioButtons('social-rating', 'social rating')
    let amenitiesRating = validateRatingRadioButtons('amenities-rating', 'amenities rating')

    let reviewerName = true
    if($('#reviewer-name').val() === ''){
        reviewerName = false
        let el = document.createElement('li')
        el.innerHTML = 'Name'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    let title = true
    if($('#rating-title').val() === ''){
        title = false
        let el = document.createElement('li')
        el.innerHTML = 'Title'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    let review = true
    if($('#review-text-area').val() === ''){
        review = false
        let el = document.createElement('li')
        el.innerHTML = 'Review'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    let opinion = true
    if(!($('#opinion-checkbox').is(':checked'))){
        opinion = false
        let el = document.createElement('li')
        el.innerHTML = 'Coworker promise'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    return overallRating && locationRating && wifiRating && productivityRating && comfortRating &&
        socialRating && amenitiesRating && title && review && opinion && reviewerName;

}

function validateRatingRadioButtons(inputClass, inputName){
    let ratingInputs = document.getElementsByClassName(inputClass);
    let checked = false;

    for(let i=0;i<ratingInputs.length;i++){
        if($('#' + inputClass + '-' + i).is(':checked')){
            checked = true
        }
    }

    if(!checked){
        let el = document.createElement('li')
        el.innerHTML = inputName
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    return checked;
}