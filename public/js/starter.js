    // from google maps api
    // create the map and place it on the page
    var map;
      function initMap() {
        navigator.geolocation.getCurrentPosition(function(location) {
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: latitude, lng: longitude},
          zoom: 12,
          panControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT
          },
          zoomControl: true,
          zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.RIGHT_CENTER
      },
          scaleControl: true
        });
      });
    };


$('document').ready(function() {

console.log('conneected');
$('#button').click(function() {
  console.log('clicked');
  navigator.geolocation.getCurrentPosition(function(location) {
  let latitudeFlag = location.coords.latitude;
  let longitudeFlag = location.coords.longitude;
    console.log(location);

    console.log('latitude: ' + latitudeFlag);
    console.log('longitude: ' + longitudeFlag);
    var marker = new google.maps.Marker({
        position: {lat: latitudeFlag, lng: longitudeFlag},
        map: map,
        title: 'You are here'
      });

    let latInput = $('<input class="coords" name="latitude">').val(latitudeFlag);
    let longInput = $('<input class="coords" name="longitude">').val(longitudeFlag);
    $('form').append(latInput, longInput);

  });

});


});
