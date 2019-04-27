function orderEvents(orderFunctions, events) {
    orderFunctions.forEach(orderFunction => {
      events.sort(orderFunction);
    });
    return events;
}

function orderByDistance(a, b) {
    return distanceInKmBetweenEarthCoordinates(a.lat, a.lon)-distanceInKmBetweenEarthCoordinates(b.lat, b.lon);
}

function orderByPopularity(a, b) {
    return b.commitments - a.commitments
}

function testOrder() { //DistanceOrder and Popularity order works
    var events = [{lon: 0, lat: 0.001, commitments: 10}, {lon:100, lat:10, commitments: 10}, {lon: 0, lat: 0.001, commitments: 1001},{lon: 0, lat: 0.002, commitments: 110}, {lon:100, lat:12, commitments: 10}, {lon: 0, lat: 1.001, commitments: 100}];
    var filters = [orderByDistance, orderByPopularity];
    console.log(orderEvents(filters, events));
}