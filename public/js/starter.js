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
    // console.log('accuracy ' + location.coords.accuracy);


  });

});




});
