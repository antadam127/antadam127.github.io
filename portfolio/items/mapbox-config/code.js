// Get Random Style
function getRandomStyle() {
  let style = allMapStyles[Math.floor(Math.random() * allMapStyles.length)];
  if (config.styleSwitcher && styleOptions.length > 1) style = allMapStyles[styleOptions[Math.floor(Math.random() * styleOptions.length)]];
  return style;
}
if (config.startingStyle === "random") config.startingStyle = getRandomStyle();

// Reset Map
function resetMap() {
  if (config.startingPos.startBounds) {
    map.fitBounds(config.startBounds, { padding: 20 });
    map.once("moveend", () => {
      northUp();
    });
  } else {
    map.flyTo({
      center: config.startingPos.center,
      zoom: config.startingPos.zoom,
      pitch: config.startingPos.pitch,
      bearing: config.startingPos.bearing,
    });
  }
}

// Fly To
function flyToLoc(e) {
  map.flyTo({ center: [e.lngLat.lng, e.lngLat.lat] });
}

// North Up
function northUp(instant) {
  if (instant) {
    map.setBearing(0);
    map.setPitch(0);
  } else {
    map.flyTo({
      pitch: 0,
      bearing: 0,
    });
  }
}

// Add Link Stylesheet for Directions and Geocoder
if (config.directionControl) {
  const element = document.createElement("link");
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("type", "text/css");
  element.setAttribute("href", "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css");
  document.getElementsByTagName("head")[0].appendChild(element);

  if (config.searchbar) {
    console.log("Searchbar and Directions cannot coexist - Directions added");
    config.searchbar = false;
  }
} else if (config.searchbar) {
  const element = document.createElement("link");
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("type", "text/css");
  element.setAttribute("href", "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css");
  document.getElementsByTagName("head")[0].appendChild(element);
}

// Setup Location Helper
function setupLocationHelper() {
  const target = document.createElement("div");
  target.id = "location-target";
  target.innerHTML = '<svg height="6" width="6"><circle cx="3"cy="3" r="2" stroke="black" /></svg>';
  target.style = "position: absolute;top: 0;bottom: 0;width: 100%;display: flex;justify-content: center;align-items: center;pointer-events: none;";
  $("body").append(target);

  const el = document.createElement("div");
  el.id = "position";
  el.style =
    "position: absolute;top: 0;height: 125px;width: 300px;background-color: #fff;padding: 15px;margin: 10px;font-family: 'Courier New', Courier, monospace;";
  $("body").append(el);

  var position = document.getElementById("position");

  var updatePosition = function () {
    const bounds = map.getBounds();
    var settings =
      "center: [" +
      map.getCenter().lng.toFixed(5) +
      ", " +
      map.getCenter().lat.toFixed(5) +
      "],\n" +
      "zoom: " +
      map.getZoom().toFixed(2) +
      ",\n" +
      "pitch: " +
      map.getPitch().toFixed(2) +
      ",\n" +
      "bearing: " +
      map.getBearing().toFixed(2) +
      ",\n\n" +
      `[[${bounds._sw.lng.toFixed(4)},${bounds._sw.lat.toFixed(4)}],\n[${bounds._ne.lng.toFixed(4)},${bounds._ne.lat.toFixed(4)}]]`;

    position.innerText = settings;
  };

  map.on("load", () => {
    updatePosition();
  });
  map.on("move", () => {
    updatePosition();
  });
}
