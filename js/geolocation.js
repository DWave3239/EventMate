var x, message, lat, lon;
var apiKey = "1457ea73a4146f";
function getLocation() {
  x = document.getElementById("map");
  lat = 0;
  lon = 0;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    iqwerty.toast.Toast("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    getCity(lat, lon);
    distanceInKmBetweenEarthCoordinates(0,0);
}

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        message = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        message = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        message = "An unknown error occurred."
        break;
    }
    iqwerty.toast.Toast(message);
} 

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}
  
function distanceInKmBetweenEarthCoordinates(lat2, lon2) {
    var earthRadiusKm = 6371;
  
    var dLat = degreesToRadians(lat2-lat);
    var dLon = degreesToRadians(lon2-lon);
  
    var lat1 = degreesToRadians(lat);
    lat2 = degreesToRadians(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    iqwerty.toast.Toast(earthRadiusKm * c + 'km');
    return earthRadiusKm * c;
}

function setLocation(newLat, newLon) { 
    //if locationing does not work it is possible to set the coordinates manualy
    lat = newLat;
    lon = newLon;
}

function getCoordinates(query) {
    var list = document.getElementById("locations");
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.locationiq.com/v1/autocomplete.php?key="+apiKey+"&q="+query+"&limit=4&normalizecity=1&accept-language=de",
        "method": "GET"
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        var options='';
        for(var i = 0; i < response.size; i++)
            options += '<option value="'+response[i].address.city+'"/>';
        list.innerHTML = options;
      });      
}

function getCoordinatesOfAddress(street, postalcode, city) {
  var list = document.getElementById("locations");
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://eu1.locationiq.com/v1/search.php?key="+apiKey+"&street="+street+"&city="+city+"&postalcode="+postalcode+"&format=json&accept-language=de",
      "method": "GET"
    }
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      //TODO write in DB
    });      
}

function getCity(latCity, lonCity) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://eu1.locationiq.com/v1/reverse.php?key="+apiKey+"&lat="+latCity+"&lon="+lonCity+"&zoom=10&format=json&accept-language=de",
        "method": "GET"
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        document.getElementById('locationName').value = response.display_name;
      });    
}
/*
//Search ********************************************************** 
// Initialize an empty map without layers (invisible map)
var map = L.map('map', {
    center: [40.7259, -73.9805], // Map loads with this location as center
    zoom: 12,
    scrollWheelZoom: true,
    zoomControl: false,
    attributionControl: false,
});

//Geocoder options
var geocoderControlOptions = {
    bounds: false,          //To not send viewbox
    markers: false,         //To not add markers when we geocoder
    attribution: null,      //No need of attribution since we are not using maps
    expanded: true,         //The geocoder search box will be initialized in expanded mode
    panToPoint: false       //Since no maps, no need to pan the map to the geocoded-selected location
}

//Initialize the geocoder
var geocoderControl = new L.control.geocoder(apiKey, geocoderControlOptions).addTo(map).on('select', function (e) {
    displayLatLon(e.feature.feature.display_name, e.latlng.lat, e.latlng.lng);
});
*/
