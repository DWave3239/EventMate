var x, lat, lon, responseTemp;
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
    var message;
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
    //iqwerty.toast.Toast(earthRadiusKm * c + 'km');
    return earthRadiusKm * c;
}

function setLocation(newLat, newLon) { 
    //if locationing does not work it is possible to set the coordinates manualy
    lat = newLat;
    lon = newLon;
}

var timestamp, oldTimestamp;
var interval;
var globalQuery;

function setLocationInterval() {
  timestamp = 0;
  oldTimestamp = 0;
  interval = setInterval(autocomplete, 150);
}

function clearLocationInterval() {
  clearInterval(interval);
}

function autocomplete() {
    if(timestamp == oldTimestamp || Date.now() - timestamp < 300) return;
    oldTimestamp = timestamp;
    var list = document.getElementById("result");
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.locationiq.com/v1/autocomplete.php?key="+apiKey+"&q="+globalQuery+"&limit=5&normalizecity=1&accept-language=de",
        "method": "GET"
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        responseTemp = response;
        var options='';
        for(var i = 0; i < response.length; i++)
            options += '<div class="resultEntry" onclick="clickLocation(this)" id="'+i+'">'+response[i].display_name+'</div>';
        list.innerHTML = options;
      });      
}

function updateQuery(query) {
  globalQuery = query;
  timestamp = Date.now();
}

function clickLocation(item) { //TODO
  document.getElementById("result").innerHTML = "";
  document.getElementById("locationName").value = responseTemp[$(item).attr("id")].display_name;
  lat = responseTemp[$(item).attr("id")].lat;
  lon = responseTemp[$(item).attr("id")].lon;
}

function getCoordinatesOfAddress(street, postalcode, city) {
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
