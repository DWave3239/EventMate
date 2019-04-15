var x, message, lat, lon;
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