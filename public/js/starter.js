    // from google maps api
    // create the map and place it on the page
    let map;
      function initMap() {
        navigator.geolocation.getCurrentPosition(function(location) {
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: latitude, lng: longitude},
          zoom: 17,
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

  if (navigator.geolocation) {
  console.log('Geolocation is supported!');
  }
  else {
    console.log('Geolocation is not supported for this Browser');
  }

  console.log('conneected');

  navigator.geolocation.getCurrentPosition(function(location) {

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

      let infoWindowContent =
         `<div class="info_content">
            <h3> Drop: ` + theDrop + `</h3>
            <form method="post" action="/drops/${drop_id}?_method=DELETE">
              <input type="submit" ` + disabled + ` name="delete" value="Delete drop" />
            </form>
          </div>`;

      infoWindow = new google.maps.InfoWindow({
          content: ''
      });

      marker = new google.maps.Marker({
          position: location,
          map: map,
          animation: google.maps.Animation.DROP
      });






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

        let dZone = new google.maps.Polygon({
            paths: dropZone,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });

        dZone.setMap(map);

        // console.log("success");
        for (let i = 0; i < data.length; i++) {
          theLat = data[i].latitude;
          theLng = data[i].longitude;
          theDrop = data[i].drop;
          drop_id = data[i].drop_id;
          let test = new google.maps.LatLng(theLat, theLng);
          let inDropZone = google.maps.geometry.poly.containsLocation ( test, dZone );
          console.log(inDropZone);
          if (inDropZone !== true) {
            theDrop = 'drop-by to view this drop';
            disabled = 'disabled';
          }else if (inDropZone) {
            disabled = '';
          }
          allMarkers = new google.maps.LatLng(theLat, theLng, theDrop, drop_id);

          addMarker(allMarkers);

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
    let maxCharacters = 54;
    let totalRemaining = 0;
    $('#drop').on('keyup', function() {
      let currentValue = $('#drop').val().length;
      totalRemaining = maxCharacters - currentValue;
      $("#remaining").text(totalRemaining);
      if (totalRemaining === 0) {
        // $("#drop").attr("disabled", "disabled");
        // console.log("you have ran out of characters")
      }
    })

  }); //navigator.geolocation.watchPosition

}); // End $(document).ready
