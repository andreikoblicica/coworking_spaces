$(document).ready(function(){

    document.getElementById("add_space_form").onsubmit = function(e){
        e.preventDefault();

        let allRequiredFieldsAreValidated = validateFields();

            if(allRequiredFieldsAreValidated) {
                $('#error_text').attr('hidden', true)
                $('#error_list').empty()

                var formData = [];
                localStorage.removeItem('spaceFormData');
                formData.push({name: 'name', value: $('#space_name').val()});
                formData.push({name: 'location', value: $('#space_location').val()});
                formData.push({name: 'description', value: $('#space_description').val()});
                formData.push({name: 'dimension', value: $('#space_dimension').val()});
                formData.push({name: 'type', value: $('#space_type').val()});
                formData.push({name: 'capacity', value: $('#space_capacity').val()});
                formData.push({name: 'bathrooms', value: $('#space_nr_of_bathrooms').val()});
                formData.push({name: 'picture', value: $('#space_picture').val().split("\\")[2]});

                formData.push({name: 'desks', value: $('#desks').is(':checked')});
                formData.push({name: 'internet', value: $('#internet').is(':checked')});
                formData.push({name: 'conference_rooms', value: $('#conference_rooms').is(':checked')});
                formData.push({name: 'recreation_room', value: $('#recreation_room').is(':checked')});
                formData.push({name: 'kitchen', value: $('#kitchen').is(':checked')});
                formData.push({name: 'parking', value: $('#parking').is(':checked')});

                localStorage.spaceFormData = JSON.stringify(formData);

                if (confirm('Your coworking space has been posted!')) {
                    let currentPageBaseUrl = window.location.href.substring(0, window.location.href.indexOf("add-space"))
                    window.location.replace(currentPageBaseUrl + "gallery/gallery.html");
                }
            }else{
                $('#error_text').attr('hidden', false)
            }
        }

});

function validateFields(){
    let name = true
    if($('#space_name').val() === ''){
        name = false
        let el = document.createElement('li')
        el.innerHTML = 'Name'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    let location = true
    if($('#space_location').val() === ''){
        location = false
        let el = document.createElement('li')
        el.innerHTML = 'Location'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)    }

    let description = true
    if($('#space_description').val() === ''){
        description = false
        let el = document.createElement('li')
        el.innerHTML = 'Description'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)    }

    let dimension = true
    if($('#space_dimension').val() === ''){
        dimension = false
        let el = document.createElement('li')
        el.innerHTML = 'Dimension'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)    }

    let type = true
    if($('#space_type').val() === ''){
        type = false
        let el = document.createElement('li')
        el.innerHTML = 'Space type'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)    }

    let capacity = true
    if ($('#space_capacity').val() === ''){
        capacity = false
        let el = document.createElement('li')
        el.innerHTML = 'Capacity'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)    }

    let bathrooms = true
    if($('#space_nr_of_bathrooms').val() === ''){
        bathrooms = false
        let el = document.createElement('li')
        el.innerHTML = 'Number of bathrooms'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)    }

    let picture = true
    if($('#space_picture').val() === ''){
        picture = false
        let el = document.createElement('li')
        el.innerHTML = 'Picture'
        el.className = 'ms-5'
        document.getElementById('error_list').appendChild(el)
    }

    return name && location && description && dimension && type && capacity && bathrooms && picture
}