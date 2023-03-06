const customMarker = {
  color: "#3FB1CE",
  scale: 0.75,
};

let config = {
  name: "Test Config",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: Layered_Satellite_Less_Labels, // random || style // Starting Style
  globeMode: true, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: false, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "", // '' || 'reset' || 'northUp' || 'coord' || 'flyTo' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution
  mapCursor: false, // Default: false, "pointer", "crosshair", "default", "zoom-in", "zoom-out", Explicit Default: "grab"

  // Starting Location
  startingPos: {
    // center: [-96, 38.5], // Starting Position
    // zoom: 4, // Starting Zoom
    // pitch: 0, // Starting Pitch
    // bearing: 0, // Starting Bearing
    // startBounds: americaBounds, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
    center: [globePos, 35],
    zoom: 2.3,
    pitch: 0.0,
    bearing: 0.0,
  },
  showLocationHelper: false, // Show Location Helper

  minzoom: false, // min zoom // Default: false || zoomLevel (Default: 0) (Always Show Buildings: 15.25)
  maxzoom: false, // max zoom // Default: false || zoomLevel (Default: 22)
  maxpitch: false, // max pitch // Default: false || pitchLevel (Default/Max: 85) (Optimized for labels and buildings: 60)

  // Interactivity
  interactive: true, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: true, // true || false // Allow Rotation
    pitch: true, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
    zoomCenterLock: false, // false || true (default: false) // Lock zoom to center of map
  },

  // CORNER DESCRIPTIONS
  showCorners: false, // Active or disable all corners
  actionOnLoad: 'open', // false || 'open' || 'close' // Open, Close, or Do Nothion on load
  cornerDesc: [
    {
      corner: "bottom-left", // 'top/bottom-left/right'
      htmlContent: "<p>The Nato Countries</p> <p>Zoom in for GDP</p>", // index number (To specify in Code) || direct html content
    },
  ],

  // VIEW OPTIONS
  searchbar: false, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search
    instantFly: true, // Instant Jump or Fly to (Default: false)

    clearOnMapMove: true, // Clear when focus removed from search
    searchMarker: false, // Add Search Marker

    enableUserLocation: false, // Enable user location button
    collapseBar: true, // Collapse when not in use
    customLocation: false, // Customize location in CSS
  },

  styleSwitcher: false, // Add style swither radio buttons
  styleSwitcherOptions: {
    // 'styleOptions' list in data.js for convenience
    enableKeyboardShortcuts: true, // Enable Clycling on 'Enter' and 'Shift + Enter' and Random on 'Backspace'
  },

  navControl: "", //'top-right', // '' || 'top/bottom-left/right' // Add Navigation Control
  geoControl: "", //'bottom-right', // '' || 'top/bottom-left/right' // Add Geolocation Control
  scaleControl: "", //'bottom-left', // '' || 'top/bottom-left/right' // Add Scale Control
  directionControl: "", // 'top-left', // '' || 'top/bottom-left/right' // Add Direction Control
  directionControlOptions: {
    startingProfile: "driving", // 'driving' || 'walking' || 'cycling' || 'driving-traffic'
    showAltRoutes: true, // true || false // Show Alternative Routes
    showInstructions: "hover", // true || 'hover' || false // Show Instruction Panel
    optionalOrigin: false, // false || textString: ('Hartford, CT') || lngLat: "lon,lat" (find nearest structure) [lon, lat] (exact) // Sets the Origin
    optionalDestination: false, // false || textString: ('Hartford, CT') || lngLat: "lon,lat" (find nearest structure) [lon, lat] (exact) // Sets the Destination
  },

  // STYLE OPTIONS
  fogStyle: "default", // 'none' || 'default': Changes w style || 'custom': fog is set directly by style || 'standard': Mapbox default (empty) || 'EXPLICIT': Explicit style
  fogStyleOptions: {
    enableKeyboardFogToggling: false, // Enable Fog Toggle with " Shift + '\' " keyboard press
  },

  terrainMode: false, // Add 3D Terrain
  terrainOptions: {
    exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
  },

  hillshading: false, // Add Hillshading
  hillshadeOptions: {
    overrideExistingHillshade: true, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top // ** WARNING while true: render cache efficiency is not optimal (when in globeMode or terrain present) **
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: false, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 0.92, // 3D Building opacity (Default: 0.6) (0.92 good too)
    insertBehindLabels: true, // Insert Behind labels
    color: "#aaa", // Color (Default: '#aaa') || 'height' || 'type' || (Alternate: '#d0b47c')
    setZoomOnClick: false, // true || false // sets zoom to 15.25 when clicking map or if showPopupOn 'click' then sets zoom when not clicking building
    showPopupOn: false, // false || 'hover' || 'click' // Show Popup On
    lightIntensity: 0.5, // 0-1 // (Default: 0.5)
    interpolateHeight: [16, 1 / 1000000], // Interpolate Height // false || [HEIGHT, EXPONENT] // (Default: false) (Good: [16, 1 / 1000000]) ([16, 10000]) ([18, 1000]) // Height minimum 16
    heightCap: "dynamic", // 'dynamic' || number (420 is Height of One World Trade Center) // Height of Top Range Number (meters)
    requestGeocodeZoomLevel: 15.25, // false || zoomLevel // Request geocode go to this zoom level
    // Set minzoom to 15.25 for always shown or to 15 for allowed remove
    // !!Always set max pitch to 60 when dealing with buildings
  },

  // SATELLITE & BLACKMARBLE
  satelliteFade: false, // false || true || 'marble'  // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 4.0, // false, 14.5, 9.75, 3.75, // false (Always shown) || zoomNumber (0-24) // Min satellite zoom level
    satelliteFadeamt: 4.0, // 1, // Fade amount for satellite
    reverseDirection: true, // true || false // (Default: false)
    insertBelow: false, // false (insert on top) || 'labels' || 'borders'
    satelliteSaturation: 0, // -1.0 - 1.0 (Default: 0) // Saturation (Not active for marbles)
    marbleOptions: {
      marble: 'blackMarble', // 'blackMarble' || 'blueMarble'
      resolution: "med", // 'high', 'med', 'low' (Default: 'med')
    },
  },

  bathymetry: false, // Add Ocean Bathymetry

  // LAYERS
  weather: false, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: "precipitation", // false, 'precipitation', 'clouds', 'temp', 'wind', 'pressure', 'precipitation_new', 'clouds_new', 'temp_new', 'wind_new', 'pressure_new' // Show Live Weather Radar
    insertBehindLabels: true, // Insert behind labels (Default: true) // ** WARNING while false: render cache efficiency is not optimal (when in globeMode or terrain present) **

    showTemp: true, // true || false || 'top/bottom-left/right'
    hoverDropdown: true, // Activate dropdown on temp hover
    hoverShowTarget: true, // Activate Target on hover

    pulseDotOnMove: {
      active: false, // Activate Pulsing dot
      radius: 150, // Radius in px (Default: 100)
      duration: 1000, // Duration in ms (Default: 1000)
      continuous: false, // Continuous or not (Default: false)
    },
  },

  streetview: false, // Add Mapillary Streetview
  streetviewOptions: {
    mapillaryAccessToken: "MLY|7987216781292167|74ae0d0cfe0d46fdcf0a9fb141634cce",
    showImageOnHover: true, // Show image on hover
  },

  // SPIN
  spin: {
    startSpinning: false, // Start the Globe Spinning
    secondsPerRevolution: 120, // (Default: 120) Complete a revolution every X seconds at low zoom levels
    maxSpinZoom: 5, // (Default: 5) No spinning past X zoom level
    slowSpinZoom: 3, // (Default: 3) Start slowing spin speed past level X

    enableToggle: false, // Enable Toggle on 'Enter'
  },

  // BOUNDARIES
  tiles: {
    timeZones: "mapbox://antadam127.142r7jdg",
    countries: "mapbox://antadam127.7qjvpjmo",
    adminOne: "mapbox://antadam127.5j1xrq5t",
    usaCounties: "mapbox://antadam127.dxvrpiet",
    urbanAreas: "mapbox://antadam127.bexpi1tg",
    populatedPlaces: "mapbox://antadam127.czs3fwmt",
  },
  timeZones: {
    enable: false, // Add Time Zones
    timeZoneFills: true, // Fill Time Zones
  },
  countries: {
    enable: false, // Enable countries
    drawBoarders: true, // true || 'white' // Draw Boarders
    zoomOnClick: false, // Zoom to Country on Click
    highlightOnHover: true, // Highlight on Hover
    showPopupOn: "", // 'hover' || 'click' || '' // Popup
    popupInfo: "population", // 'population' || 'GDP' || 'economy' || 'income' || '' // **Optional** Shouldn't be used when Colorization or Extrude are on
    countryColorization: "", // 'color7' || 'population' || 'GDP' || 'economy' || 'income' || '' // Colorization
    countryOppacityZoomLevel: 0, // Zoom Oppacity Fading Level Begin (Default: 0)
    countryExtrude: '', // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: false, //nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: false, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: false, // false || true // Admin One Colorization
    adminOneOppacityZoomLevel: 2, // Zoom Oppacity (Default: 2)
    adminOneExtrude: false, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 1, // Admin One Extrude Oppacity
    countryFilter: false, // nato || ['USA', 'CAN', 'MEX'] || ['exclude', 'USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: false, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: false, // false || true // Usa Counties Colorization
    usaCountiesExtrude: false, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "#e74c3c", // Fill Color ('clear'|| 'rgba(0,0,0,0.2)' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: 'clear', // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
    zoomOnClick: false, // Zoom to area on click
  },
  populatedPlaces: {
    enable: false, //  Enable populated places
    highlightOnHover: true, // Highlight on Hover
    radius: 1,
    color: "#e74c3c", // '#333'
    strokeWid: 1,
    strokeCol: 1,
  },

  // BLUE PLANET
  bluePlanet: {
    enable: false, // Enable Blue Planet
    startMonth: Math.floor(Math.random() * 12), // 1 - 12 (Default: 12) // Month of Imagery
    removeLabels: false, // Keep or Remove Labels (Default: false)
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter) // (Increased Cache)
    autoCycling: false, // false || NUM milliseconds (1400) // How many milliseconds between switching // (Increased Cache)
    resolution: "high", // 'high', 'med', 'low' (Default: 'med')
  },

};
