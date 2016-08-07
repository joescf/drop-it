    // from google maps api
    var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.7628, lng: -74.0059},
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
      }


$('document').ready(function() {

console.log('conneected');

$('#button').click(function() {
  console.log('clicked');
  navigator.geolocation.getCurrentPosition(function(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
    console.log(location);

    console.log('latitude: ' + latitude);
    console.log('longitude: ' + longitude);
    var marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: map,
        title: 'Hello World!'
      });
    // console.log('accuracy ' + location.coords.accuracy);
  });

});


});
