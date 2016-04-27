var map;
var currentLocation = {
  lat: 45.4,
  lng: -122.7
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: currentLocation
  });

  navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    map.setCenter(pos);
  })

  var input = document.getElementById('search');

  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener('place_changed', function () {
    var place = autocomplete.getPlace();

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      map.setZoom(16)
      map.setCenter(place.geometry.location)
    }
  })

}
