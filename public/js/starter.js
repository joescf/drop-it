    // from google maps api
    // create the map and place it on the page
    let map;
      function initMap() {
        navigator.geolocation.getCurrentPosition(function(location) {
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: latitude, lng: longitude},
          zoom: 21,
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
// $('#button').click(function() {
  console.log('clicked');
  navigator.geolocation.getCurrentPosition(function(location) {
  let latitudeFlag = location.coords.latitude;
  let longitudeFlag = location.coords.longitude;
    console.log(location);
    console.log(google);

    let latInput = $('<input class="coords" name="latitude">').val(latitudeFlag);
    let longInput = $('<input class="coords" name="longitude">').val(longitudeFlag);
    $('form').append(latInput, longInput);

// The following functions was taken from the following website
// http://stackoverflow.com/questions/7701077/add-marker-function-with-google-maps-api


  function addMarker(location) {
    const infoWindowContent =
        '<div class="info_content">' +
        '<h3> Drop: '+ theDrop + '</h3>' +
        '<form action="delete">' +
          '<input type="submit" name="delete" value="Delete drop" />'
        '</form>' +
        '</div>';
      console.log(theDrop)
      infoWindow = new google.maps.InfoWindow({
        content: ''
      })
      marker = new google.maps.Marker({
          position: location,
          map: map,
          title: theDrop,

      });
      google.maps.event.addListener( marker, 'click', function() {
        console.log(theDrop)
        infoWindow.setContent( infoWindowContent );
        infoWindow.open( map, this );
      });
  };


   function TestMarker() {

      $.ajax({
        url: '/drops',
        type: 'GET',
        dataType: 'json',
        data: {latitude: '',
               longitude: ''},
      })
      .done(function(data) {
        console.log("success");
        for (let i = 0; i < data.length; i++) {
          theLats = data[i].latitude;
          theLngs = data[i].longitude;
          theDrop = data[i].drop;
          allMarkers = new google.maps.LatLng(theLats, theLngs, theDrop);
          addMarker(allMarkers);
        }

      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });
    }
    TestMarker();


  });

// });

});
