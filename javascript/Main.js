let directionsRenderer = null;
let map = null;
let latLng = { lat: 52.530959363794125, lng: -1.9049126170548054 };
let infoWindow;
directionsRenderer = new google.maps.DirectionsRenderer();
let service;
let googleSwitch = false;

let iconArr = [
  { url: "../icons/Venue.png", scaledSize: new google.maps.Size(30, 30) },
  {
    url: "../icons/PlaceToStay.png",
    scaledSize: new google.maps.Size(40, 40),
  },
  {
    url: "../icons/PlaceOfWorship.png",
    scaledSize: new google.maps.Size(30, 30),
  },
  { url: "../icons/Cafe.png", scaledSize: new google.maps.Size(40, 40) },
  { url: "../icons/Misc.png", scaledSize: new google.maps.Size(40, 40) },
  {
    url: "../icons/Restaurant.png",
    scaledSize: new google.maps.Size(30, 30),
  },
  {
    url: "../icons/ShoppingIcon.png",
    scaledSize: new google.maps.Size(30, 30),
  },
];

window.onload = () => {
  new google.maps.places.Autocomplete(start); // UNDER QUESTION
  new google.maps.places.Autocomplete(end); // UNDER QUESTION

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9.9,
    center: new google.maps.LatLng(52.530959363794125, -1.9049126170548054),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControlOptions: {
      mapTypeIds: ["roadmap", "satellite", "hide_poi"],
    },
  });

  iconArr = [
    { url: "../icons/Venue.png", scaledSize: new google.maps.Size(30, 30) },
    {
      url: "../icons/PlaceToStay.png",
      scaledSize: new google.maps.Size(40, 40),
    },
    {
      url: "../icons/PlaceOfWorship.png",
      scaledSize: new google.maps.Size(30, 30),
    },
    { url: "../icons/Cafe.png", scaledSize: new google.maps.Size(40, 40) },
    { url: "../icons/Misc.png", scaledSize: new google.maps.Size(40, 40) },
    {
      url: "../icons/Restaurant.png",
      scaledSize: new google.maps.Size(30, 30),
    },
    {
      url: "../icons/ShoppingIcon.png",
      scaledSize: new google.maps.Size(30, 30),
    },
  ];

  hidePointsOfInterest(map); // UNDER QUESTION

  infoWindow = new google.maps.InfoWindow();

  directionsRenderer.setMap(map);

  directionsRenderer.setPanel(document.getElementById("directions"));

  fetch("../json/DataSource.JSON")
    .then((response) => response.json())
    .then((data) => renderLocations(data, iconArr[0], map, infoWindow));
};

function getNearbyServicesMarkers(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    results.map((result) => {
      createMarker(result);
    });
  }
}

function getNearbyServicesMarkersLodging(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    results.map((result) => {
      createMarkerLodging(result);
    });
  }
}

function getNearbyServicesMarkersChurch(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    results.map((result) => {
      createMarkerChurch(result);
    });
  }
}

function getNearbyServicesMarkersCafe(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    results.map((result) => {
      createMarkerCafe(result);
    });
  }
}

function getNearbyServicesMarkersMisc(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    results.map((result) => {
      createMarkerMisc(result);
    });
  }
}

function getNearbyServicesMarkersRestaurant(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    results.map((result) => {
      createMarkerRestaurant(result);
    });
  }
}

function getNearbyServicesMarkersShop(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    results.map((result) => {
      createMarkerShop(result);
    });
  }
}

// function createMarker(place)
//     {
//         let icon;

//         let type = place.types[0]

//         if(place.business_status !== "CLOSED_TEMPORARILY")
//         {
//             if(type === "stadium")
//             {
//                 icon = iconArr[0];
//                 addMarker(place, icon);
//             }
//             else if(type === "lodging")
//             {
//                 icon = iconArr[1];
//                 addMarker(place, icon);

//             }
//             else if(type === "church")
//             {
//                 icon = iconArr[2];
//                 addMarker(place, icon);

//             }
//             else if(type === "restaurant")
//             {
//                 icon = iconArr[5];
//                 addMarker(place, icon);
//             }
//             else if(type === "cafe")
//             {
//                 icon = iconArr[3];
//                 addMarker(place, icon);
//             }
//             else if(type === "tourist_attraction")
//             {
//                 icon = iconArr[4];
//                 addMarker(place, icon);
//             }
//             else if(type === "supermarket")
//             {
//                 icon = iconArr[6];
//                 addMarker(place, icon);
//             }
//         }

//         // if(stadiumBool)
//         // {
//         //     icon = iconArr[2];
//         // }

//         function addMarker(place, icon){
//             console.log(place)

//             let marker = new google.maps.Marker({
//                 map: map,
//                 icon: icon,
//                 position: place.geometry.location
//             })

//             google.maps.event.addListener(marker, "click", () =>
//             {
//                 infoWindow.setContent(place.name)
//                 infoWindow.open(map, marker)
//             })
//         }

//     }

function createMarker(place) {
  addMarker(place, iconArr[0]);
}

function createMarkerChurch(place) {
  addMarker(place, iconArr[2]);
}

function createMarkerRestaurant(place) {
  addMarker(place, iconArr[5]);
}

function createMarkerCafe(place) {
  addMarker(place, iconArr[3]);
}

function createMarkerMisc(place) {
  addMarker(place, iconArr[4]);
}

function createMarkerShop(place) {
  addMarker(place, iconArr[6]);
}

function createMarkerLodging(place) {
  addMarker(place, iconArr[1]);
}

function addMarker(place, icon) {
  console.log(place);

  let marker = new google.maps.Marker({
    map: map,
    icon: icon,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infoWindow.setContent(place.name);
    infoWindow.open(map, marker);
  });
}

function getCurrentLocationAndZoom() {
  let location = map.getCenter();
  let zoom = map.getZoom();

  checkLocations(location, zoom);
}

function checkLocations(location, zoom) {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom,
    center: new google.maps.LatLng(location),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControlOptions: {
      mapTypeIds: ["roadmap", "satellite", "hide_poi"],
    },
  });

  hidePointsOfInterest(map);

  directionsRenderer.setMap(map);

  fetch("../json/DataSource.JSON")
    .then((response) => response.json())
    .then((data) => renderLocations(data, iconArr[0], map, infoWindow));

  if (document.getElementById("search").checked) {
    googleSwitch = true;
  } else {
    googleSwitch = false;
  }

  if (document.getElementById("hotels").checked) {
    fetch("../json/DataSource.JSON")
      .then((response) => response.json())
      .then((data) => renderSleepSpots(data, iconArr[1], map, infoWindow));
  }

  if (document.getElementById("holy").checked) {
    fetch("../json/DataSource.JSON")
      .then((response) => response.json())
      .then((data) => renderHolyPlaces(data, iconArr[2], map, infoWindow));
  }

  if (document.getElementById("cafe").checked) {
    fetch("../json/DataSource.JSON")
      .then((response) => response.json())
      .then((data) => renderCafes(data, iconArr[3], map, infoWindow));
  }

  if (document.getElementById("misc").checked) {
    fetch("../json/DataSource.JSON")
      .then((response) => response.json())
      .then((data) => renderMisc(data, iconArr[4], map, infoWindow));
  }

  if (document.getElementById("restaurants").checked) {
    fetch("../json/DataSource.JSON")
      .then((response) => response.json())
      .then((data) => renderRestaurants(data, iconArr[5], map, infoWindow));
  }

  if (document.getElementById("shops").checked) {
    fetch("../json/DataSource.JSON")
      .then((response) => response.json())
      .then((data) => renderShops(data, iconArr[6], map, infoWindow));
  }

  directionsRenderer.set("directions", null);
  calculateRoute();
}

function renderLocations(locations, icon, map, infoWindow) {
  console.log("INSIDE FUNCTION");

  // NEW ADDITIONS

  if (googleSwitch) {
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location: latLng, // centre of the search
        radius: 5000, // radius (in metres) of the search
        type: "stadium",
      },
      getNearbyServicesMarkers
    );
  }

  //

  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  directionsRenderer.setPanel(document.getElementById("directions"));

  locations.venues.map((venue) => {
    let content;
    let result;
    let subResult;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // This is needed because if were rendering for example 6pm as the time, it will be rendered as 6.0, rather than 6.00
    function calcTime(time) {
      if (time.getMinutes() === 0) {
        return "00";
      } else {
        return time.getMinutes();
      }
    }

    result = venue.events
      .map(function (evnt, index) {
        // subResult maps out the variety of events taking place at the overall event, in a venue
        subResult = evnt.subEvents
          .map(function (subEv) {
            return `<li>${subEv}</li>`;
          })
          .join(""); // In filters, '' are used instead, Y?

        const ds = new Date(evnt.dateTimeStart);
        const de = new Date(evnt.dateTimeEnd);

        if (index === 0) {
          // The point of conditional statement -> line 64 -> in order for the bootstrap carousel to work properly, first class must have the active keyword, the rest should omit it
          return (
            `<div class="carousel-item active"> 
                                         <img src="../images/greySquare.png" alt="...">
                                         <div class="carousel-caption d-flex flex-column justify-content-center align-items-center d-md-block text-muted">
                                         <h2>${evnt.name}</h2>
                                         <p>${
                                           ds.getDate() +
                                           " " +
                                           months[ds.getMonth()]
                                         }</p>
                                         <p>${
                                           ds.getHours() +
                                           ":" +
                                           calcTime(ds) +
                                           " - " +
                                           de.getHours() +
                                           ":" +
                                           calcTime(de)
                                         }</p>
                                         
                                         <div style="height:130px;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;">
                                         <ul>` +
            subResult +
            `</ul>
                                         </div>
                                         </div>
      
      
                                          </div>`
          );
        } else {
          // The rest of the classes do not need the active keyword
          return (
            `<div class="carousel-item ">
                                         <img src="../images/greySquare.png" alt="...">
                                         <div class="carousel-caption d-flex flex-column justify-content-center align-items-center d-md-block text-muted ">
                                         <h2>${evnt.name}</h2>
                                         <p>${
                                           ds.getDate() +
                                           " " +
                                           months[ds.getMonth()]
                                         }</p>
                                         <p>${
                                           ds.getHours() +
                                           ":" +
                                           calcTime(ds) +
                                           " - " +
                                           de.getHours() +
                                           ":" +
                                           calcTime(de)
                                         }</p>
      
                                         <div style="height:130px;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;">
                                         <ul>` +
            subResult +
            `</ul>
                                         </div>
                                         </div>
                                         </div>`
          );
        }
      })
      .join("");

    //    <div class="carousel-item">
    //    <img src="..." alt="...">
    //    <div class="carousel-caption d-none d-md-block">
    //      <h5>...</h5>
    //      <p>...</p>
    //    </div>
    //  </div>

    if (venue.venue === true) {
      // all objects inside the json files have (should have at least) a boolean "venue" field
      //The reason for this -> venues have events, and the custom content for venues should show these events
      // but places of worship, hotels, shops... would have their custom content rendered differently
      let tel = "";
      if (venue.phone != "") {
        tel = `<p>${"Tel: " + venue.phone}</p>`;
      } else {
        tel = `<p>No phone available</p>`;
      }

      let site = "";
      if (venue.website != "") {
        // site = `<p>${"Website: " + venue.website}</p>`;
        site = `<a href="${venue.website}" target="_blank" >View Website</a>`;
      } else {
        site = `<p>No Website available</p>`;
      }
      console.log(site);

      let img = "";
      if (venue.image != "") {
        img = `<img src="${"../images/" + venue.image}"></img>`;
      } else {
        img = ``;
      }

      let wChair = "";
      if (venue.wheelchair) {
        wChair = `<p>Wheelchair friendly</p>`;
      } else {
        wChair = `<p>Not suitable for Wheelchairs</p>`;
      }

      content =
        `<div>` +
        `<div id="venue_info">` +
        img +
        `
                                      <h1>${venue.name}</h1>
                                      ` +
        tel +
        site +
        wChair +
        `
                                      </div>
                                      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                  <div class="carousel-inner d-flex">` +
        result +
        `
                                  </div>
                                  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                      <span class="sr-only">Previous</span>
                                  </a>
                                  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                      <span class="sr-only">Next</span>
                                  </a>
                                  </div>
      
                                  </div>`;
    } else {
      content = `<div>
                                      <h1>Not A Venue Sorry</h1>
                                      </div>`;
    }

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(venue.latitude, venue.longitude),
      icon: icon,
      map: map,
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
  });
}

function renderSleepSpots(locations, icon, map, infoWindow) {
  console.log("INSIDE FUNCTION");
  console.log(locations);

  if (googleSwitch) {
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location: latLng, // centre of the search
        radius: 5000, // radius (in metres) of the search
        type: "lodging",
      },
      getNearbyServicesMarkersLodging
    );
  }

  locations.sleepSpots.map((shelter) => {
    let tel = "";
    if (shelter.Contact[0].Phone != "") {
      tel = `<p>${"Tel: " + shelter.Contact[0].Phone}</p>`;
      console.log(tel);
    } else {
      tel = `<p>No phone available</p>`;
    }

    let email = "";
    if (shelter.Contact[0].Gmail != "") {
      email = `<p>${shelter.Contact[0].Gmail}</p>`;
    } else {
      email = `<p>No email available</p>`;
    }

    let site = "";
    if (shelter.Website != "") {
      // site = `<p>${"Website: " + shelter.website}</p>`;
      site = `<a href="${shelter.Website}" target="_blank" >View Website</a>`;
    } else {
      site = `<p>No Website available</p>`;
    }

    let img = "";
    if (shelter.Image != "") {
      img = `<img src="${"../images/" + shelter.Image}"></img>`;
    } else {
      img = ``;
    }

    let rating = "";
    if (shelter.Rating > 0) {
      rating = `<p>${"Rating: " + shelter.Rating}</p>`;
      console.log(rating);
    } else {
      rating = `<p>No rating found</p>`;
    }

    let addr = "";
    if (shelter.Address != "") {
      addr = `<p>${shelter.Address}</p>`;
    } else {
      addr = `<p>No Address available</p>`;
    }

    let name = "";
    if (shelter.Name != "") {
      name = `<p>${shelter.Name}</p>`;
    } else {
      name = `<p>No Name available</p>`;
    }

    let type = "";
    if (shelter.Type != "") {
      type = `<p>${shelter.Type}</p>`;
    } else {
      type = `<p>No Type available</p>`;
    }

    let price = "";
    if (shelter.PricePerNight != "") {
      price = `<p>${"Price per night: " + shelter.PricePerNight}</p>`;
    } else {
      price = `<p>Price available on request</p>`;
    }

    let content =
      `<div>` +
      `<div id="venue_info">` +
      img +
      `
                                      <h1>${
                                        shelter.Name + " - " + shelter.Type
                                      }</h1>
                                      ` +
      addr +
      `<div class="d-flex">
                                      ${tel}<p>&nbsp&nbsp&nbsp&nbsp</p>${email} 
                                      </div>` +
      site +
      rating +
      `</div>
                                     </div>`;

    console.log(content);

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(shelter.Latitude, shelter.Longitude),
      icon: icon,
      map: map,
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
  });
}

function renderHolyPlaces(locations, icon, map, infoWindow) {
  console.log("INSIDE FUNCTION");
  console.log(locations);

  if (googleSwitch) {
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location: latLng, // centre of the search
        radius: 5000, // radius (in metres) of the search
        type: "church",
      },
      getNearbyServicesMarkersChurch
    );
  }

  locations.PlacesOfWorship.map((pow) => {
    let tel = "";
    if (pow.Telephone != "") {
      tel = `<p>${"Tel: " + pow.Telephone}</p>`;
    } else {
      tel = `<p>No phone available</p>`;
    }

    let email = "";
    if (pow.Email != "") {
      email = `<p>${pow.Email}</p>`;
    } else {
      email = `<p>No email available</p>`;
    }

    let site = "";
    if (pow.Website != "") {
      // site = `<p>${"Website: " + shelter.website}</p>`;
      site = `<a href="${pow.Website}" target="_blank" >View Website</a>`;
    } else {
      site = `<p>No Website available</p>`;
    }

    let img = "";
    if (pow.Image != "") {
      img = `<img src="${"../images/" + pow.Image}"></img>`;
    } else {
      img = ``;
    }

    let rating = "";
    if (pow.Rating > 0) {
      rating = `<p>${"Rating: " + pow.Rating}</p>`;
    } else {
      rating = `<p>No rating found</p>`;
    }

    let addr = "";
    if (pow.Address != "") {
      addr = `<p>${pow.Address}</p>`;
    } else {
      addr = `<p>No Address available</p>`;
    }

    let name = "";
    if (pow.Name != "") {
      name = `<p>${pow.Name}</p>`;
    } else {
      name = `<p>No Name available</p>`;
    }

    let type = "";
    if (pow.Type != "") {
      type = `<p>${pow.Type}</p>`;
    } else {
      type = `<p>No Type available</p>`;
    }

    let content =
      `<div>` +
      `<div id="venue_info">` +
      img +
      `
                                      <h1>${pow.Name}</h1>
                                      ` +
      addr +
      `<div class="d-flex">
                                      ${tel}<p>&nbsp&nbsp&nbsp&nbsp</p>${email} 
                                      </div>` +
      site +
      rating +
      `</div>
                                     </div>`;

    console.log(content);

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(pow.Latitude, pow.Longitude),
      icon: icon,
      map: map,
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
  });
}

function renderMisc(locations, icon, map, infoWindow) {
  console.log("INSIDE FUNCTION");
  console.log(locations);

  if (googleSwitch) {
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location: latLng, // centre of the search
        radius: 5000, // radius (in metres) of the search
        type: "tourist_attraction",
      },
      getNearbyServicesMarkersMisc
    );
  }

  locations.Misc.map((latte) => {
    let tel = "";
    if (latte.Telephone != "") {
      tel = `<p>${"Tel: " + latte.Telephone}</p>`;
    } else {
      tel = `<p>No phone available</p>`;
    }

    let email = "";
    if (latte.Email != "") {
      email = `<p>${latte.Email}</p>`;
    } else {
      email = `<p>No email available</p>`;
    }

    let site = "";
    if (latte.Website != "") {
      // site = `<p>${"Website: " + shelter.website}</p>`;
      site = `<a href="${latte.Website}" target="_blank" >View Website</a>`;
    } else {
      site = `<p>No Website available</p>`;
    }

    let img = "";
    if (latte.Image != "") {
      img = `<img src="${"../images/" + latte.Image}"></img>`;
    } else {
      img = ``;
    }

    let rating = "";
    if (latte.Rating > 0) {
      rating = `<p>${"Rating: " + latte.Rating}</p>`;
    } else {
      rating = `<p>No rating found</p>`;
    }

    let addr = "";
    if (latte.Address != "") {
      addr = `<p>${latte.Address}</p>`;
    } else {
      addr = `<p>No Address available</p>`;
    }

    let name = "";
    if (latte.Name != "") {
      name = `<p>${latte.Name}</p>`;
    } else {
      name = `<p>No Name available</p>`;
    }

    let type = "";
    if (latte.Type != "") {
      type = `<p>${latte.Type}</p>`;
    } else {
      type = `<p>No Type available</p>`;
    }

    let openingHours = "";
    if (latte.OpeningHours.length > 0) {
      let start = `<div class="d-flex flex-column justify-content-center align-items-center">`;
      let innerStuff = latte.OpeningHours.map((day) => {
        return `<ul class="d-flex justify-content-center align-items-center ">
                                              <li id="whiteLi">${
                                                day.Day +
                                                "&nbsp&nbsp" +
                                                day.Open +
                                                "&nbsp-&nbsp" +
                                                day.Close
                                              }</li>
                                              </ul>`;
      }).join("");
      let end = `</div>`;
      openingHours = start + innerStuff + end;
    } else {
      openingHours = `<p>Working hours not available</p>`;
    }

    let content =
      `<div>` +
      `<div id="venue_info">` +
      img +
      `
                                      <h1>${latte.Name}</h1>
                                      ` +
      addr +
      `<div class="d-flex">
                                      ${tel}<p>&nbsp&nbsp&nbsp&nbsp</p>${email} 
                                      </div>` +
      site +
      rating +
      openingHours +
      `</div>
                                     </div>`;

    console.log(content);

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(latte.Latitude, latte.Longitude),
      icon: icon,
      map: map,
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
  });
}

function renderCafes(locations, icon, map, infoWindow) {
  console.log("INSIDE FUNCTION");
  console.log(locations);

  if (googleSwitch) {
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location: latLng, // centre of the search
        radius: 5000, // radius (in metres) of the search
        type: "cafe",
      },
      getNearbyServicesMarkersCafe
    );
  }

  locations.Cafe.map((latte) => {
    let tel = "";
    if (latte.Telephone != "") {
      tel = `<p>${"Tel: " + latte.Telephone}</p>`;
    } else {
      tel = `<p>No phone available</p>`;
    }

    let email = "";
    if (latte.Email != "") {
      email = `<p>${latte.Email}</p>`;
    } else {
      email = `<p>No email available</p>`;
    }

    let site = "";
    if (latte.Website != "") {
      // site = `<p>${"Website: " + shelter.website}</p>`;
      site = `<a href="${latte.Website}" target="_blank" >View Website</a>`;
    } else {
      site = `<p>No Website available</p>`;
    }

    let img = "";
    if (latte.Image != "") {
      img = `<img src="${"../images/" + latte.Image}"></img>`;
    } else {
      img = ``;
    }

    let rating = "";
    if (latte.Rating > 0) {
      rating = `<p>${"Rating: " + latte.Rating}</p>`;
    } else {
      rating = `<p>No rating found</p>`;
    }

    let addr = "";
    if (latte.Address != "") {
      addr = `<p>${latte.Address}</p>`;
    } else {
      addr = `<p>No Address available</p>`;
    }

    let name = "";
    if (latte.Name != "") {
      name = `<p>${latte.Name}</p>`;
    } else {
      name = `<p>No Name available</p>`;
    }

    let type = "";
    if (latte.Type != "") {
      type = `<p>${latte.Type}</p>`;
    } else {
      type = `<p>No Type available</p>`;
    }

    let openingHours = "";
    if (latte.OpeningHours.length > 0) {
      let start = `<div class="d-flex flex-column justify-content-center align-items-center">`;
      let innerStuff = latte.OpeningHours.map((day) => {
        return `<ul class="d-flex justify-content-center align-items-center ">
                                              <li id="whiteLi">${
                                                day.Day +
                                                "&nbsp&nbsp" +
                                                day.Open +
                                                "&nbsp-&nbsp" +
                                                day.Close
                                              }</li>
                                              </ul>`;
      }).join("");
      let end = `</div>`;
      openingHours = start + innerStuff + end;
    } else {
      openingHours = `<p>Working hours not available</p>`;
    }

    let content =
      `<div>` +
      `<div id="venue_info">` +
      img +
      `
                                      <h1>${latte.Name}</h1>
                                      ` +
      addr +
      `<div class="d-flex">
                                      ${tel}<p>&nbsp&nbsp&nbsp&nbsp</p>${email} 
                                      </div>` +
      site +
      rating +
      openingHours +
      `</div>
                                     </div>`;

    console.log(content);

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(latte.Latitude, latte.Longitude),
      icon: icon,
      map: map,
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
  });
}

function renderRestaurants(locations, icon, map, infoWindow) {
  console.log("INSIDE FUNCTION");
  console.log(locations);

  if (googleSwitch) {
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location: latLng, // centre of the search
        radius: 5000, // radius (in metres) of the search
        type: "restaurant",
      },
      getNearbyServicesMarkersRestaurant
    );
  }

  locations.Restaurants.map((latte) => {
    let tel = "";
    if (latte.Telephone != "") {
      tel = `<p>${"Tel: " + latte.Telephone}</p>`;
    } else {
      tel = `<p>No phone available</p>`;
    }

    let email = "";
    if (latte.Email != "") {
      email = `<p>${latte.Email}</p>`;
    } else {
      email = `<p>No email available</p>`;
    }

    let site = "";
    if (latte.Website != "") {
      // site = `<p>${"Website: " + shelter.website}</p>`;
      site = `<a href="${latte.Website}" target="_blank" >View Website</a>`;
    } else {
      site = `<p>No Website available</p>`;
    }

    let img = "";
    if (latte.Image != "") {
      img = `<img src="${"../images/" + latte.Image}"></img>`;
    } else {
      img = ``;
    }

    let rating = "";
    if (latte.Rating > 0) {
      rating = `<p>${"Rating: " + latte.Rating}</p>`;
    } else {
      rating = `<p>No rating found</p>`;
    }

    let addr = "";
    if (latte.Address != "") {
      addr = `<p>${latte.Address}</p>`;
    } else {
      addr = `<p>No Address available</p>`;
    }

    let name = "";
    if (latte.Name != "") {
      name = `<p>${latte.Name}</p>`;
    } else {
      name = `<p>No Name available</p>`;
    }

    let type = "";
    if (latte.Type != "") {
      type = `<p>${latte.Type}</p>`;
    } else {
      type = `<p>No Type available</p>`;
    }

    let openingHours = "";
    if (latte.OpeningHours.length > 0) {
      let start = `<div class="d-flex flex-column justify-content-center align-items-center">`;
      let innerStuff = latte.OpeningHours.map((day) => {
        return `<ul class="d-flex justify-content-center align-items-center ">
                                              <li id="whiteLi">${
                                                day.Day +
                                                "&nbsp&nbsp" +
                                                day.Open +
                                                "&nbsp-&nbsp" +
                                                day.Close
                                              }</li>
                                              </ul>`;
      }).join("");
      let end = `</div>`;
      openingHours = start + innerStuff + end;
    } else {
      openingHours = `<p>Working hours not available</p>`;
    }

    let content =
      `<div>` +
      `<div id="venue_info">` +
      img +
      `
                                      <h1>${latte.Name}</h1>
                                      ` +
      addr +
      `<div class="d-flex">
                                      ${tel}<p>&nbsp&nbsp&nbsp&nbsp</p>${email} 
                                      </div>` +
      site +
      rating +
      openingHours +
      `</div>
                                     </div>`;

    console.log(content);

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(latte.Latitude, latte.Longitude),
      icon: icon,
      map: map,
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
  });
}

function renderShops(locations, icon, map, infoWindow) {
  console.log("INSIDE FUNCTION");
  console.log(locations);

  if (googleSwitch) {
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location: latLng, // centre of the search
        radius: 5000, // radius (in metres) of the search
        type: "supermarket",
      },
      getNearbyServicesMarkersShop
    );
  }

  locations.Shops.map((latte) => {
    let tel = "";
    if (latte.Telephone != "") {
      tel = `<p>${"Tel: " + latte.Telephone}</p>`;
    } else {
      tel = `<p>No phone available</p>`;
    }

    let email = "";
    if (latte.Email != "") {
      email = `<p>${latte.Email}</p>`;
    } else {
      email = `<p>No email available</p>`;
    }

    let site = "";
    if (latte.Website != "") {
      // site = `<p>${"Website: " + shelter.website}</p>`;
      site = `<a href="${latte.Website}" target="_blank" >View Website</a>`;
    } else {
      site = `<p>No Website available</p>`;
    }

    let img = "";
    if (latte.Image != "") {
      img = `<img src="${"../images/" + latte.Image}"></img>`;
    } else {
      img = ``;
    }

    let rating = "";
    if (latte.Rating > 0) {
      rating = `<p>${"Rating: " + latte.Rating}</p>`;
    } else {
      rating = `<p>No rating found</p>`;
    }

    let addr = "";
    if (latte.Address != "") {
      addr = `<p>${latte.Address}</p>`;
    } else {
      addr = `<p>No Address available</p>`;
    }

    let name = "";
    if (latte.Name != "") {
      name = `<p>${latte.Name}</p>`;
    } else {
      name = `<p>No Name available</p>`;
    }

    let type = "";
    if (latte.Type != "") {
      type = `<p>${latte.Type}</p>`;
    } else {
      type = `<p>No Type available</p>`;
    }

    let openingHours = "";
    if (latte.OpeningHours.length > 0) {
      let start = `<div class="d-flex flex-column justify-content-center align-items-center">`;
      let innerStuff = latte.OpeningHours.map((day) => {
        return `<ul class="d-flex justify-content-center align-items-center ">
                                              <li id="whiteLi">${
                                                day.Day +
                                                "&nbsp&nbsp" +
                                                day.Open +
                                                "&nbsp-&nbsp" +
                                                day.Close
                                              }</li>
                                              </ul>`;
      }).join("");
      let end = `</div>`;
      openingHours = start + innerStuff + end;
    } else {
      openingHours = `<p>Working hours not available</p>`;
    }

    let content =
      `<div>` +
      `<div id="venue_info">` +
      img +
      `
                                      <h1>${latte.Name}</h1>
                                      ` +
      addr +
      `<div class="d-flex">
                                      ${tel}<p>&nbsp&nbsp&nbsp&nbsp</p>${email} 
                                      </div>` +
      site +
      rating +
      openingHours +
      `</div>
                                     </div>`;

    console.log(content);

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(latte.Latitude, latte.Longitude),
      icon: icon,
      map: map,
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
  });
}

function hidePointsOfInterest(map) {
  let styles = [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ];

  let styledMapType = new google.maps.StyledMapType(styles, {
    name: "POI Hidden",
    alt: "Hide Points of Interest",
  });
  map.mapTypes.set("hide_poi", styledMapType);

  map.setMapTypeId("hide_poi");
}

function calculateRoute() {
  let start = document.getElementById("start").value;
  let end = document.getElementById("end").value;
  let travelMode = document.getElementById("travelMode").value;

  console.log(start);
  console.log(end);
  console.log(travelMode);

  if (start === "" || end === "") {
    return;
  }
  if (travelMode === "Wipe") {
    console.log("WIPE IN PROGRESS");
    directionsRenderer.set("directions", null);
  } else {
    let request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode[travelMode],
    };

    console.log(request);

    let directionsService = new google.maps.DirectionsService();
    directionsService.route(request, (route, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(route);
      } else {
        console.log(route);
      }
    });
  }
}
