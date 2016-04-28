function showSection(toShow) {
  ['search', 'map', 'hash'].forEach(function(section) {
    $('#' + section).toggle(section === toShow)
  })
}

function init() {
  showSection('search')
  var autocomplete = new google.maps.places.Autocomplete($('#search input')[0])

  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace()

    $('#map input').val(place.name);
    showSection('map')
    var map = new google.maps.Map($('#map div')[0])

    var location = {
      name: place.name,
      geo: {
        lat: place.geometry.location.lat(),
        long: place.geometry.location.lng()
      }
    }

    $('#map button').click(function () {
      console.log(`Posting location: ${JSON.stringify(location)}`)

      $.ajax({
        url: '/locations',
        type: 'POST',
        data: JSON.stringify(location),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
          console.log(`POST successful. Response: ${JSON.stringify(data)}`)
          $('#hash span').text(data.hash)
          showSection('hash')
        }
      })
    })

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport)
    } else {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      })
      map.setZoom(14)
      map.setCenter(place.geometry.location)
    }
  })

}
