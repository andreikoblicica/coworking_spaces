$(document).ready(function(){
    if(localStorage.spaceFormData !== undefined){
        let spaceDataForm = JSON.parse(localStorage.spaceFormData)

        $('#space_name').text(spaceDataForm[0].value)
        $('#space_name_input').val(spaceDataForm[0].value)
        $('#space_location').text(spaceDataForm[1].value)
        $('#space_location_input').val(spaceDataForm[1].value)
        $('#space_description').text(spaceDataForm[2].value)
        $('#space_description_input').val(spaceDataForm[2].value)
        $('#space_img').attr('src','../gallery/images/' + spaceDataForm[7].value)
        $('#space_dimension_input').val(spaceDataForm[3].value)
        $('#space_type_input').val(spaceDataForm[4].value)
        $('#space_capacity_input').val(spaceDataForm[5].value)
        $('#space_bathrooms_input').val(spaceDataForm[6].value)

        $('#space_amenities_list').empty()
        insertAmenity(spaceDataForm[8].value, 'Desks')
        insertAmenity(spaceDataForm[9].value, 'Internet')
        insertAmenity(spaceDataForm[10].value, 'Conference Rooms')
        insertAmenity(spaceDataForm[11].value, 'Recreation Room')
        insertAmenity(spaceDataForm[12].value, 'Kitchen')
        insertAmenity(spaceDataForm[13].value, 'Parking')

        checkAmenity(spaceDataForm[8].name, spaceDataForm[8].value)
        checkAmenity(spaceDataForm[9].name, spaceDataForm[9].value)
        checkAmenity(spaceDataForm[10].name, spaceDataForm[10].value)
        checkAmenity(spaceDataForm[11].name, spaceDataForm[11].value)
        checkAmenity(spaceDataForm[12].name, spaceDataForm[12].value)
        checkAmenity(spaceDataForm[13].name, spaceDataForm[13].value)
    }

    document.getElementById("edit_space_form").onsubmit = function(e){
        e.preventDefault();

        let allRequiredFieldsAreValidated = validateFields();

        if(allRequiredFieldsAreValidated) {
            $('#error_text').attr('hidden', true)
            $('#error_list').empty()

            var formData = [];
            let imgStorageVal = JSON.parse(localStorage.spaceFormData)[7].value
            localStorage.removeItem('spaceFormData');
            formData.push({name: 'name', value: $('#space_name_input').val()});
            formData.push({name: 'location', value: $('#space_location_input').val()});
            formData.push({name: 'description', value: $('#space_description_input').val()});
            formData.push({name: 'dimension', value: $('#space_dimension_input').val()});
            formData.push({name: 'type', value: $('#space_type_input').val()});
            formData.push({name: 'capacity', value: $('#space_capacity_input').val()});
            formData.push({name: 'bathrooms', value: $('#space_bathrooms_input').val()});

            let imgVal = $('#customFile').val().split("\\")[2]
            if(imgVal){
                formData.push({name: 'picture', value: $('#customFile').val().split("\\")[2]});
            }else{
                formData.push({name: 'picture', value: imgStorageVal});
            }

            formData.push({name: 'desks', value: $('#desks').is(':checked')});
            formData.push({name: 'internet', value: $('#internet').is(':checked')});
            formData.push({name: 'conference_rooms', value: $('#conference_rooms').is(':checked')});
            formData.push({name: 'recreation_room', value: $('#recreation_room').is(':checked')});
            formData.push({name: 'kitchen', value: $('#kitchen').is(':checked')});
            formData.push({name: 'parking', value: $('#parking').is(':checked')});

            localStorage.spaceFormData = JSON.stringify(formData);

            if (confirm('Your coworking space has been edited!')) {
                let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("edit-space"))
                window.location.replace(currentPageBaseUrl + "/gallery/gallery.html");
            }
        }else{
            $('#error_text').attr('hidden', false)
        }
    }

    $('#deleteButton').on( "click", function() {
        if(confirm('Are you sure?')){
            localStorage.removeItem('spaceFormData')
            alert('This coworking space has been deleted successfully!')
            let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("edit-space"))
            window.location.replace(currentPageBaseUrl + "/gallery/gallery.html");
        }
    });
})

function validateFields(){
    let name = true
    if($('#space_name_input').val() === ''){
        name = false
        let el = document.createElement('li')
        el.innerHTML = 'Name'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    let location = true
    if($('#space_location_input').val() === ''){
        location = false
        let el = document.createElement('li')
        el.innerHTML = 'Location'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    let description = true
    if($('#space_description_input').val() === ''){
        description = false
        let el = document.createElement('li')
        el.innerHTML = 'Description'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    let dimension = true
    if($('#space_dimension_input').val() === ''){
        dimension = false
        let el = document.createElement('li')
        el.innerHTML = 'Dimension'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    let type = true
    if ($('#space_type_input').val() === ''){
        type = false
        let el = document.createElement('li')
        el.innerHTML = 'Space type'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    let capacity = true
    if($('#space_capacity_input').val() === ''){
        capacity = false
        let el = document.createElement('li')
        el.innerHTML = 'Capacity'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    let bathrooms = true
    if($('#space_bathrooms_input').val() === ''){
        bathrooms = false
        let el = document.createElement('li')
        el.innerHTML = 'Number of bathrooms'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    return name && location && description && dimension && type && capacity && bathrooms
}

function insertAmenity(amenityExists, amenityName){
    if(amenityExists){
        let amenity = document.createElement('li')
        amenity.innerHTML = amenityName
        document.getElementById('space_amenities_list').appendChild(amenity)
    }
}

function checkAmenity(amenityId, amenityExists){
    $('#' + amenityId).prop('checked', amenityExists)
}