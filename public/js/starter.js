    // from google maps api
    // create the map and place it on the page
    let map;
      function initMap() {
        navigator.geolocation.getCurrentPosition(function(location) {
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: latitude, lng: longitude},
          zoom: 19,
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
  navigator.geolocation.watchPosition(function(location) {
  let latitudeFlag = location.coords.latitude;
  let longitudeFlag = location.coords.longitude;
    // console.log(location);
    // console.log(google);

    let latInput = $('<input class="coords" name="latitude">').val(latitudeFlag);
    let longInput = $('<input class="coords" name="longitude">').val(longitudeFlag);
    $('form').append(latInput, longInput);

// The following functions was taken from the following website
// http://stackoverflow.com/questions/7701077/add-marker-function-with-google-maps-api

  function addMarker(location) {

  //    let dropMarkers = new google.maps.Polygon({
  //   paths: [
  //     new google.maps.LatLng(25.774, -80.190),
  //     new google.maps.LatLng(18.466, -66.118),
  //     new google.maps.LatLng(32.321, -64.757)
  //   ]
  // });

    // console.log('latitude: ' + latitudeFlag);
    // console.log('longitude: ' + longitudeFlag);
      let infoWindowContent =
          '<div class="info_content">' +
          '<h3> Drop: '+ theDrop + '</h3>' +
          `<form method="post" action="/drops/${drop_id}?_method=DELETE">
            <input type="submit" name="delete" value="Delete drop" />`
          '</form>' +
          '</div>';


      infoWindow = new google.maps.InfoWindow({
        content: ''
      });
      marker = new google.maps.Marker({
          position: location,
          map: map,
          title: theDrop,

      });



      console.log('location', location)
      console.log('location-len', location.length)

      for (let i = 0; i < location.length; i++) {
      let currentLat = theLats[i];
      let currentLng = theLngs[i];
      console.log(currentLat);
      console.log(result)
      }

      google.maps.event.addListener( marker, 'click', function() {
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
       let dropZone = [
    {lat: latitudeFlag + .001, lng: longitudeFlag + .001},
    {lat: latitudeFlag + .001, lng: longitudeFlag - .001},
    {lat: latitudeFlag - .001, lng: longitudeFlag - .001},
    {lat: latitudeFlag - .001, lng: longitudeFlag + .001},


  ];
let bermudaTriangle = new google.maps.Polygon({
    paths: dropZone,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  bermudaTriangle.setMap(map);


        console.log("success");
        for (let i = 0; i < data.length; i++) {
          theLat = data[i].latitude;
          theLng = data[i].longitude;
          theDrop = data[i].drop;
          drop_id = data[i].drop_id;
          allMarkers = new google.maps.LatLng(theLat, theLng, theDrop, drop_id);
          let test = new google.maps.LatLng(theLat, theLng);

          addMarker(allMarkers);
      let result = google.maps.geometry.poly.containsLocation ( test, bermudaTriangle );
      console.log(result)
          // console.log(allMarkers);
        }

      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        // console.log("complete");
      });
    };
  TestMarker();
//countdown
  let maxCharacters = 50;
  let totalRemaining = 0;
  $('#drop').on('keyup', function() {
    let currentValue = $('#drop').val().length;
    totalRemaining = maxCharacters - currentValue;
    $("#remaining").text(totalRemaining);
  if (totalRemaining === 0) {
    $("#drop").attr("disabled", "disabled");
    console.log("you have ran out of characters")
  }
  })




















  });


});
