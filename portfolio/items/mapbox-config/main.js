// Initiate Map
mapboxgl.accessToken = config.accessToken;
const map = new mapboxgl.Map({
  container: "map", // container ID

  // Style
  style: config.startingStyle[2], // style URL
  projection: config.globeMode === true ? "globe" : config.globeMode === false ? "mercator" : config.globeMode, // Map Projection
  hash: config.hashMode, // Hash the URL

  // Location
  center: config.startingPos.center, // starting position [lng, lat]
  zoom: config.startingPos.zoom, // starting zoom
  pitch: config.startingPos.pitch, // Starting pitch
  bearing: config.startingPos.bearing, // Starting bearing
  bounds: config.startingPos.startBounds, // Starting bounds

  // INTERACTIVITY
  interactive: config.interactive, // Allow Movement

  // Move
  dragPan: config.interactiveOptions.move === false ? false : true, // Dragging

  // Zoom
  scrollZoom: config.interactiveOptions.zoom === false ? false : true, // Zoom with scroll
  doubleClickZoom: config.interactiveOptions.zoom === false ? false : true, // Double click to zoom
  boxZoom: config.interactiveOptions.zoom === false ? false : true, // Shift + click to Box Zoom
  // scrollZoom: config.interactiveOptions.zoom === false ? false : config.interactiveOptions.move === false && config.interactiveOptions.zoom === true ? false : true, // Zoom with scroll
  // doubleClickZoom: config.interactiveOptions.zoom === false ? false : config.interactiveOptions.move === false && config.interactiveOptions.zoom === true ? false : true, // Double click to zoom
  // boxZoom: config.interactiveOptions.zoom === false ? false : config.interactiveOptions.move === false && config.interactiveOptions.zoom === true ? false : true, // Shift + click to Box Zoom

  //Rotate & Pitch
  dragRotate: config.interactiveOptions.rotate === false ? false : true, // Allow for drag and rotate with left mouse (or ctrl + mouse)
  pitchWithRotate: config.interactiveOptions.pitch === false ? false : true, // Allow for pitch change with left mouse (or ctrl + mouse)
  touchPitch: config.interactiveOptions.pitch === false ? false : true, // Touch Pitch
  touchZoomRotate: config.interactiveOptions.zoom === false ? false : true, // Touch Zoom

  // Keyboard
  keyboard:
    config.interactiveOptions.move && config.interactiveOptions.zoom && config.interactiveOptions.rotate && config.interactiveOptions.pitch ? true : false, // Allow keyboard inputs (-/+ | Arrows | Shift+Arrows)

  // Other Interactive
  cooperativeGestures: config.interactiveOptions.cooperativeGestures, // Cmd + scroll to Zoom (Default: false)
  maxBounds: config.bounded, // Set the max bounds
  renderWorldCopies: config.renderWorldCopies, // Render Infinite Maps

  // For when need to hide labels under raster layer
  optimizeForTerrain: ((config.globeMode || config.terrainMode) && ((config.contours && config.contourOptions.forceOnTop) || (config.weather && config.weatherOptions.insertBehindLabels === false))) ? false : true,

  // OTHER NON CONFIG
  minZoom: config.minzoom ? config.minzoom : null, // Minimum zoom allowed
  maxZoom: config.maxzoom ? config.maxzoom : null, // Max zoom allowed
  maxPitch: config.maxpitch ? config.maxpitch : 85, // Max pitch (60 is optimized) (85 is maximum)
  logoPosition: config.logoPosition, // Mapbox logo location
  antialias: true, // Has to do with WebGL and 3D Buildings
  fitBoundsOptions: { padding: 20 }, // Options for when starting with bounds
  //   customAttribution:
  // '<a title="LinkedIn" href="https://www.linkedin.com/in/anthony-adam-psu/" target="_blank">Anthony Adam</a>',
  customAttribution: `<a title="Anthony Adam" href="https://www.linkedin.com/in/anthony-adam-psu/" target="_blank">
    <svg width="16px" height="16px" viewBox="2 4 48 48" style="vertical-align: middle;">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M20.9716667,33.5527338 L25.001,33.5527338 L25.001,27.1328007 C25.001,25.439485 25.3213333,23.7988354 27.4206667,23.7988354 C29.491,23.7988354 29.517,25.7351486 29.517,27.2404662 L29.517,33.5527338 L33.5506667,33.5527338 L33.5506667,26.4341413 C33.5506667,22.9381777 32.796,20.2505391 28.711,20.2505391 C26.7483333,20.2505391 25.432,21.3265278 24.8943333,22.3471839 L24.839,22.3471839 L24.839,20.5725357 L20.9716667,20.5725357 L20.9716667,33.5527338 Z M16.423,14.1202696 C15.1273333,14.1202696 14.0823333,15.1682587 14.0823333,16.4595785 C14.0823333,17.7508984 15.1273333,18.7992208 16.423,18.7992208 C17.7133333,18.7992208 18.761,17.7508984 18.761,16.4595785 C18.761,15.1682587 17.7133333,14.1202696 16.423,14.1202696 L16.423,14.1202696 Z M14.4026667,33.5527338 L18.4406667,33.5527338 L18.4406667,20.5725357 L14.4026667,20.5725357 L14.4026667,33.5527338 Z M9.76633333,40 C8.79033333,40 8,39.2090082 8,38.2336851 L8,9.76631493 C8,8.79065843 8.79033333,8 9.76633333,8 L38.234,8 C39.2093333,8 40,8.79065843 40,9.76631493 L40,38.2336851 C40,39.2090082 39.2093333,40 38.234,40 L9.76633333,40 Z" id="Shape" fill="#000000"></path>
        </g>
    </svg>Anthony Adam</a>`,
  attributionControl: config.includeAttribution, // Add attribution control (Default: true)
});

// Drag Panning Control
// map.dragPan.enable({
//   linearity: 0,
//   easing: (t) => t,
//   maxSpeed: 1400,
//   deceleration: 2500,
// });

// Center Zoom Lock
if (config.interactiveOptions.zoomCenterLock) {
  map.scrollZoom.disable();
  map.scrollZoom.enable({ around: "center" });
  map.touchZoomRotate.disable();
  map.touchZoomRotate.enable({ around: "center" });
}
// Disable touch rotation
if (config.interactiveOptions.rotate === false) map.touchZoomRotate.disableRotation();

// Set Location Helper Function
map.locationHelper = () => {
  const location = `\ncenter: [${map.getCenter().lng.toFixed(5)}, ${map.getCenter().lat.toFixed(5)}],\nzoom: ${map.getZoom().toFixed(2)},\npitch: ${map
    .getPitch()
    .toFixed(2)},\nbearing: ${map.getBearing().toFixed(2)},\n\n`;
  console.log(location);
};

// Set Cursor
// if (!config.mapCursor && !config.interactive) config.mapCursor = "none";
if (!config.mapCursor && config.showLocationHelper) config.mapCursor = "crosshair";
if (!config.mapCursor && config.mapOnClick == "flyTo") config.mapCursor = "pointer";

if (config.mapCursor) {
  map.getCanvas().style.cursor = config.mapCursor;
  map.on("dragend", (e) => {
    map.getCanvas().style.cursor = config.mapCursor;
  });
  map.on("dragstart", (e) => {
    map.getCanvas().style.cursor = "grabbing";
  });
}

// Search bar
if (config.searchbar) {
  // Add the dependencies
  $.when(
    $.getScript('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js'),
    $('<link>', { rel: 'stylesheet', type: 'text/css', href: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css' }).appendTo('head')
  ).done(() => {
    console.log('Geocoder resources loaded.');
    if (!config.searchbarOptions.customLocation) map.addControl(createSearchbar(), "top-right");
    else createCustomGeocoder();
  });
}

// Controls
if (config.navControl) map.addControl(new mapboxgl.NavigationControl(), config.navControl);
if (config.geoControl) map.addControl(new mapboxgl.GeolocateControl(), config.geoControl);
if (config.scaleControl) map.addControl(new mapboxgl.ScaleControl({ maxWidth: 80, unit: "imperial" }), config.scaleControl);
if (config.directionControl) {
  const directions = new MapboxDirections({
    accessToken: config.accessToken,
    alternatives: config.directionControlOptions.showAltRoutes, // Show alternative routes
    unit: "imperial",
    profile: `mapbox/${config.directionControlOptions.startingProfile}`,
    controls: {
      instructions: config.directionControlOptions.showInstructions === false ? false : true, // Show Intsructions
    },
    // flyTo: false,
    // interactive: false,
  });
  map.addControl(directions, config.directionControl);

  // Optional Prefilled Origin and Dest
  if (config.directionControlOptions.optionalOrigin || config.directionControlOptions.optionalDestination) {
    map.on("load", () => {
      if (config.directionControlOptions.optionalOrigin) directions.setOrigin(config.directionControlOptions.optionalOrigin);
      if (config.directionControlOptions.optionalDestination) directions.setDestination(config.directionControlOptions.optionalDestination);
      // Waypoints
      // directions.addWaypoint(0, [-77.81032, 40.78184]); // .addWaypoint(index, [lng, lat]);
      // directions.setWaypoint(0, [-77.68385, 40.77806]); // .setWaypoint(index, [lng, lat]);
      // directions.removeWaypoint(0); // .removeWaypoint(index);
    });
  }

  // Set Instruction Panel to appear on hover
  if (config.directionControlOptions.showInstructions === "hover") {
    directions.on("route", (e) => {
      // console.log(e);
      $(".mapbox-directions-instructions").hide();
      // $(".mapbox-directions-route-summary").hover(() => {
      //   $(".mapbox-directions-instructions").slideDown(200);
      // });
      // $(".directions-control-directions").hover(null, () => {
      //   $(".mapbox-directions-instructions").slideUp(200);
      // });
    });
    $(".directions-control-instructions").hover(
      () => {
        $(".mapbox-directions-instructions").slideDown(200);
      },
      () => {
        $(".mapbox-directions-instructions").slideUp(200);
      }
    );

  }
}

// Style Switcher
if (config.styleSwitcher) addStyleSwitcher();

// Location Helper
if (config.showLocationHelper) setupLocationHelper();

// Map Load
map.on("load", () => {
  console.log("Map Loaded");
});

// Style Load
map.on("style.load", () => {
  console.log("Style Loaded:", currentStyle[1]);

  // Styles
  setFogStyle(currentStyle); // Set Fog
  if (config.terrainMode) addTerrain(); // Add Terrain
  if (config.hillshading) addHillshading(); // Add Hillshading
  if (config.contours) addContours(); // Add Contours
  if (config.bathymetry) addBathymetry(); // Add Bathymetry
  if (config.satelliteFade) addSatellite(); // Add Satellite Fade
  if (config.buildings3D) add3DBuildings(); // Add 3D Buildings

  // Layers
  if (config.weather) addWeather(); // Add Weather
  if (config.streetview) addMapillary(); // Add Mapillary
  if (config.countries.enable) addCountryData(); // Add Country Data
  if (config.adminOne.enable) addAdminOneData(); // Add State and Provinces
  if (config.usaCounties.enable) addUSACounties(); // Add USA Counties
  if (config.timeZones.enable) addTimeZones(); // Add Time Zones

  if (config.urbanAreas.enable) addUrbanAreas(); // Add Urban Areas
  if (config.populatedPlaces.enable) addPopulatedPlaces(); // Add Populated Places
  if (config.bluePlanet.enable) addBluePlanet(); // Add Blue Planet
});

// Click Event Listener
map.on("click", (e) => {
  e.preventDefault();
  if (config.interactive) {
    if (config.mapOnClick == "coord") console.log("[" + e.lngLat.lng.toFixed(3) + ", " + e.lngLat.lat.toFixed(3) + "]");
    else if (config.mapOnClick == "reset") resetMap();
    else if (config.mapOnClick == "northUp") northUp();
    else if (config.mapOnClick == "flyTo") flyToLoc(e);
    else if (config.mapOnClick == "cam") {
      // const center =
      // const bearing =
    }
  }
});
