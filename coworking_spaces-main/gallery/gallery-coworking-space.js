$(document).ready(function(){
    $('.coworking-space-img').attr('src', localStorage.getItem('space-image'))
    localStorage.removeItem('space-image');

    $('#left-arrow').on( "click", function() {
        let firstImg = $('#img-0').attr('src')
        for (let i=0;i<4;i++){
            if(i===3){
                $('#img-' + i).attr('src', firstImg)
            }else{
                $('#img-' + i).attr('src', $('#img-' + (i+1)).attr('src'))
            }
        }
    });

    $('#right-arrow').on( "click", function() {
        let lastImg = $('#img-3').attr('src')
        for (let i=3;i>=0;i--){
            if(i===0){
                $('#img-' + i).attr('src', lastImg)
            }else{
                $('#img-' + i).attr('src', $('#img-' + (i-1)).attr('src'))
            }
        }
    });

    addReview('John Doe', 'Cozy, homey feeling', 'Laid-back, yet professional space, amazing view from the terrace with cozy atmosphere. Great bar/coffee area and very friendly staff. Plenty of amenities in the building and its surroundings.')
    addReview('Kimberly Müller', 'Great location and location', 'Comfort, tranquility, pleasant atmosphere. A place where you can organize as a personal and business event. Top location, internet ')

    if(localStorage.formData  !== undefined){
       let formData  = JSON.parse(localStorage.formData);
       addReview(formData[2].value, formData[0].value, formData[1].value)

        localStorage.removeItem('formData')
    }
});

function addReview(reviewerName, title, review){
    let rowDiv = document.createElement('div')
    rowDiv.className = 'row mt-3 ms-5 mb-5'

    let colDiv = document.createElement('div')
    colDiv.className = 'col-10 ms-5 border border-white p-5 d-inline'

    let rowDiv2 = document.createElement('div')
    rowDiv2.className = 'row'

    let nameDiv = document.createElement('div')
    nameDiv.className = 'icon-container col-2 mt-4 ms-3'

    let iconName = document.createElement('i')
    iconName.className = 'fa-solid fa-user fa-5x'

    let parName = document.createElement('p')
    parName.className = 'text-white mb-0 mt-3'
    parName.innerHTML = reviewerName

    let vrLineDiv = document.createElement('div')
    vrLineDiv.className = 'vr col-2 border-left'

    let reviewDiv = document.createElement('div')
    reviewDiv.className = 'col-7 text-white'

    let hTitle = document.createElement('h5')
    hTitle.className = 'text-white font-weight-bold'
    hTitle.innerHTML = title

    let firstStarIcon = document.createElement('i')
    firstStarIcon.className = 'fa-solid fa-star d-inline text-warning'

    let secondStarIcon = document.createElement('i')
    secondStarIcon.className = 'fa-solid fa-star d-inline text-warning'

    let thirdStarIcon = document.createElement('i')
    thirdStarIcon.className = 'fa-solid fa-star d-inline text-warning'

    let fourthStarIcon = document.createElement('i')
    fourthStarIcon.className = 'fa-solid fa-star d-inline text-warning'

    let reviewPar = document.createElement('p')
    reviewPar.className = 'text-white'
    reviewPar.innerHTML = review

    reviewDiv.appendChild(hTitle)
    reviewDiv.appendChild(firstStarIcon)
    reviewDiv.appendChild(secondStarIcon)
    reviewDiv.appendChild(thirdStarIcon)
    reviewDiv.appendChild(fourthStarIcon)
    reviewDiv.appendChild(reviewPar)

    nameDiv.appendChild(iconName)
    nameDiv.appendChild(parName)

    rowDiv2.appendChild(nameDiv)
    rowDiv2.appendChild(vrLineDiv)
    rowDiv2.appendChild(reviewDiv)

    colDiv.appendChild(rowDiv2)

    rowDiv.appendChild(colDiv)

    document.getElementById('reviews_container').appendChild(rowDiv)
}