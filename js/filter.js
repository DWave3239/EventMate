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
        var result = false;
        types.forEach(element => {
            if(element.localeCompare(event.eventType))
                result =  true;
        });
        return result;
    };
}

function DateFilter(from, to) {
    this.from = from;
    this.to = to;
    this.applyFilter = function (event) {
        if(event.date > from && event.date < to)
            return false;
    };
}

function testFilter() { //TODO test date filter
    var events = [{lon: 0, lat: 0.001, eventType: "a"}, {lon:100, lat:10, eventType: "b"}];
    var filters = [new TypeFilter(["a", "c"]), new DistaceFilter(1120)];
    console.log(filterEvents(filters, events));
}