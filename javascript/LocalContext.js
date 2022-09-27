function displayMap() {
  const StadiumLocation = { lat: 48.9246424638541, lng: 2.360121582999939 };
  displayLocalContextMap(StadiumLocation, 3000);
}

function displayLocalContextMap(StadiumLocation, metres) {
  const METRES_TO_DEGREES = 0.00000909091;
  const degrees = metres * METRES_TO_DEGREES;

  const bounds = {
    north: StadiumLocation.lat + degrees,
    south: StadiumLocation.lat - degrees,
    west: StadiumLocation.lng - degrees,
    east: StadiumLocation.lng + degrees,
  };

  const localContextMapView = new google.maps.localContext.LocalContextMapView({
    element: document.getElementById("map"),
    placeTypePreferences: [
      { type: "cafe", weight: 3 },
      { type: "tourist_attraction", weight: 1 },
      { type: "bank", weight: 2 },
      { type: "pharmacy", weight: 3 },
      { type: "restaurant", weight: 3 },
    ],
    maxPlaceCount: 24,
    locationRestriction: bounds,
    directionsOptions: { origin: StadiumLocation },
  });

  let localContextMap = localContextMapView.map;

  localContextMap.setOptions({
    center: StadiumLocation,
    zoom: 14,
  });

  new google.maps.Marker({
    position: StadiumLocation,
    map: localContextMap,
    icon: "../icons/Venue.png",
    zIndex: 30,
    title: "Stade de France",
  });
}
