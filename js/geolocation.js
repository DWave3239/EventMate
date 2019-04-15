var x, message, lat, long;
function getLocation() {
  x = document.getElementById("map");
  lat = 0;
  long = 0;
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
    long = position.coords.longitude;
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

function calcDistance(latEvent, longEvent) {
    
}
