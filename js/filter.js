function filterEvents(filters, events) {
    var oldArray = events;
    var newArray = [];
    filters.forEach(filterElem => {
        oldArray.forEach(eventElem => {
            if(filterElem.applyFilter(eventElem)) {
                newArray.push(eventElem);
            }
        });
        oldArray = newArray;
        newArray = [];
    });
    return oldArray;
}

function DistaceFilter(maxDistance) {
    this.maxDistance = maxDistance;
    this.applyFilter = function (event) {
        var distance = distanceInKmBetweenEarthCoordinates(event.lat, event.lon);
        return distance <= maxDistance;
    };
}

function TypeFilter(types) {
    this.types = types;
    this.applyFilter = function (event) {
        return false;
    };
}

function DateFilter(from, to) {
    this.from = from;
    this.to = to;
    this.applyFilter = function (event) {
        return false;
    };
}

function testFilter() {
    var events = [{lon: 0, lat: 0.001}, {lon:100, lat:10}];
    var filters = [new DistaceFilter(0.12), new DistaceFilter(1120)];
    console.log(filterEvents(filters, events));
}