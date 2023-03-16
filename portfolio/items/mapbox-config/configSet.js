// BLACK MARBLE
const config_blackMarble = {
  name: "Black Marble",
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
    // zoom: 2.3,
    zoom: 1.4,
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
  satelliteFade: 'marble', // false || true || 'marble'  // Add Satellite Fade on Zoom
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

// ROTATING GLOBE
const config_rotateGlobe = {
  name: "Rotating Globe",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: Mapbox_Satellite_Clear, // Satellite_Saturated_Clear, // random || style // Starting Style
  globeMode: true, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: false, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "northUp", // '' || 'reset' || 'northUp' || 'coord' || 'cam' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution

  // Starting Location
  startingPos: {
    center: [-96, 38.5], // Starting Position
    zoom: 4, // Starting Zoom
    pitch: 0, // Starting Pitch
    bearing: 0, // Starting Bearing
    startBounds: randomGlobe, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

  // Interactivity
  interactive: false, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: true, // true || false // Allow Rotation
    pitch: true, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
  },

  // VIEW OPTIONS
  searchbar: false, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search

    clearOnMapMove: true, // Clear when focus removed from search
    searchMarker: true, // Add Search Marker

    enableUserLocation: false, // Enable user location button
    collapseBar: true, // Collapse when not in use
    customLocation: false, // Customize location in CSS
  },

  styleSwitcher: false, // Add style swither radio buttons
  styleSwitcherOptions: {
    // 'styleOptions' list in data.js for convenience
    enableKeyboardShortcuts: true, // Enable Clycling on 'Enter' and 'Shift + Enter' and Random on 'Backspace'
  },

  directionControl: "", // 'top-left', // '' || 'top/bottom-left/right' // Add Direction Control
  navControl: "", //'top-right', // '' || 'top/bottom-left/right' // Add Navigation Control
  geoControl: "", //'bottom-right', // '' || 'top/bottom-left/right' // Add Geolocation Control
  scaleControl: "", //'bottom-left', // '' || 'top/bottom-left/right' // Add Scale Control

  // STYLE OPTIONS
  fogStyle: "default", // 'default': Changes w style, 'custom': fog is set directly by style, 'standard': Mapbox default (empty), OR 'EXPLICIT': Explicit style
  fogStyleOptions: {
    enableKeyboardFogToggling: false, // Enable Fog Toggle with " Shift + '\' " keyboard press
  },

  terrainMode: false, // Add 3D Terrain
  terrainOptions: {
    exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
  },

  hillshading: false, // Add Hillshading
  hillshadeOptions: {
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: false, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 0.6, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "#aaa", // Color (Default: '#aaa') (Alternate: '#d0b47c')
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
  },

  satelliteFade: false, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 9.75, //14.5, // Min satellite zoom level
    satelliteFadeamt: 0.25, // 1, // Fade amount for satellite
    removeLabels: true, // Keep or Remove Labels (Default: false)
  },

  bathymetry: false, // Add Ocean Bathymetry

  // LAYERS
  weather: true, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: "clouds", // Show Live Weather Radar

    showTemp: false, // true || false || 'top/bottom-left/right'
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
    startSpinning: true, // Start the Globe Spinning
    enableToggle: true, // Enable Toggle on 'Enter'
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
    countryColorization: "population", // 'color7' || 'population' || 'GDP' || 'economy' || 'income' || '' // Colorization
    countryOppacityZoomLevel: 0, // Zoom Oppacity (Default: 0)
    countryExtrude: "population", // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: nato, //nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: false, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: true, // false || true // Admin One Colorization
    adminOneExtrude: true, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 1, // Admin One Extrude Oppacity
    countryFilter: nato, // nato || ['USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: false, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: true, // false || true // Usa Counties Colorization
    usaCountiesExtrude: true, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
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
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1400, // false || NUM milliseconds // How many milliseconds between switching
  },
};

// ROTATING GLOBE
const config_rotateBluePlanet = {
  name: "NASA Blue Planet",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: Mapbox_Satellite_Clear, // Satellite_Saturated_Clear, // random || style // Starting Style
  globeMode: true, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: false, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "northUp", // '' || 'reset' || 'northUp' || 'coord' || 'cam' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution

  // Starting Location
  startingPos: {
    // center: [68, 35],
    center: [globePos, 35],
    zoom: 2.3,
    pitch: 0.0,
    bearing: 0.0,
    startBounds: false, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

  // Interactivity
  interactive: false, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: true, // true || false // Allow Rotation
    pitch: true, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
  },

  // VIEW OPTIONS
  searchbar: false, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search

    clearOnMapMove: true, // Clear when focus removed from search
    searchMarker: true, // Add Search Marker

    enableUserLocation: false, // Enable user location button
    collapseBar: true, // Collapse when not in use
    customLocation: false, // Customize location in CSS
  },

  styleSwitcher: false, // Add style swither radio buttons
  styleSwitcherOptions: {
    // 'styleOptions' list in data.js for convenience
    enableKeyboardShortcuts: true, // Enable Clycling on 'Enter' and 'Shift + Enter' and Random on 'Backspace'
  },

  directionControl: "", // 'top-left', // '' || 'top/bottom-left/right' // Add Direction Control
  navControl: "", //'top-right', // '' || 'top/bottom-left/right' // Add Navigation Control
  geoControl: "", //'bottom-right', // '' || 'top/bottom-left/right' // Add Geolocation Control
  scaleControl: "", //'bottom-left', // '' || 'top/bottom-left/right' // Add Scale Control

  // STYLE OPTIONS
  fogStyle: "default", // 'default': Changes w style, 'custom': fog is set directly by style, 'standard': Mapbox default (empty), OR 'EXPLICIT': Explicit style
  fogStyleOptions: {
    enableKeyboardFogToggling: false, // Enable Fog Toggle with " Shift + '\' " keyboard press
  },

  terrainMode: false, // Add 3D Terrain
  terrainOptions: {
    exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
  },

  hillshading: false, // Add Hillshading
  hillshadeOptions: {
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: false, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 0.6, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "#aaa", // Color (Default: '#aaa') (Alternate: '#d0b47c')
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
  },

  satelliteFade: false, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 9.75, //14.5, // Min satellite zoom level
    satelliteFadeamt: 0.25, // 1, // Fade amount for satellite
    removeLabels: true, // Keep or Remove Labels (Default: false)
  },

  bathymetry: false, // Add Ocean Bathymetry

  // LAYERS
  weather: false, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: "clouds", // Show Live Weather Radar

    showTemp: false, // true || false || 'top/bottom-left/right'
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
    startSpinning: true, // Start the Globe Spinning
    enableToggle: true, // Enable Toggle on 'Enter'
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
    countryColorization: "population", // 'color7' || 'population' || 'GDP' || 'economy' || 'income' || '' // Colorization
    countryOppacityZoomLevel: 0, // Zoom Oppacity (Default: 0)
    countryExtrude: "population", // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: nato, //nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: false, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: true, // false || true // Admin One Colorization
    adminOneExtrude: true, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 1, // Admin One Extrude Oppacity
    countryFilter: nato, // nato || ['USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: false, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: true, // false || true // Usa Counties Colorization
    usaCountiesExtrude: true, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
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
    enable: true, // Enable Blue Planet
    startMonth: Math.floor(Math.random() * 12), // 1 - 12 (Default: 12) // Month of Imagery
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1800, // false || NUM milliseconds // How many milliseconds between switching
    resolution: "med", // 'high', 'med', 'low' (Default: 'med')
  },
};

// STYLE SWITCHER
const config_styleSwitcher = {
  name: "Style Viewer",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: random, //Mapbox_Satellite_Clear, //Cali_Terrain_Web, // random || style // Starting Style
  globeMode: true, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: false, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "northUp", // '' || 'reset' || 'northUp' || 'coord' || 'cam' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution

  // Starting Location
  startingPos: {
    center: [-96, 38.5], // Starting Position
    zoom: 4, // Starting Zoom
    pitch: 0, // Starting Pitch
    bearing: 0, // Starting Bearing
    startBounds: americaBounds, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

  // Interactivity
  interactive: true, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: true, // true || false // Allow Rotation
    pitch: true, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
  },

  // VIEW OPTIONS
  searchbar: false, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search

    clearOnMapMove: true, // Clear when focus removed from search
    searchMarker: true, // Add Search Marker

    enableUserLocation: false, // Enable user location button
    collapseBar: true, // Collapse when not in use
    customLocation: false, // Customize location in CSS
  },

  styleSwitcher: true, // Add style swither radio buttons
  styleSwitcherOptions: {
    // 'styleOptions' list in data.js for convenience
    enableKeyboardShortcuts: true, // Enable Clycling on 'Enter' and 'Shift + Enter' and Random on 'Backspace'
  },

  directionControl: "", // 'top-left', // '' || 'top/bottom-left/right' // Add Direction Control
  navControl: "", //'top-right', // '' || 'top/bottom-left/right' // Add Navigation Control
  geoControl: "", //'bottom-right', // '' || 'top/bottom-left/right' // Add Geolocation Control
  scaleControl: "", //'bottom-left', // '' || 'top/bottom-left/right' // Add Scale Control

  // STYLE OPTIONS
  fogStyle: "default", // 'default': Changes w style, 'custom': fog is set directly by style, 'standard': Mapbox default (empty), OR 'EXPLICIT': Explicit style
  fogStyleOptions: {
    enableKeyboardFogToggling: false, // Enable Fog Toggle with " Shift + '\' " keyboard press
  },

  terrainMode: false, // Add 3D Terrain
  terrainOptions: {
    exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
  },

  hillshading: false, // Add Hillshading
  hillshadeOptions: {
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: false, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 0.6, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "#aaa", // Color (Default: '#aaa') (Alternate: '#d0b47c')
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
  },

  satelliteFade: false, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 9.75, //14.5, // Min satellite zoom level
    satelliteFadeamt: 0.25, // 1, // Fade amount for satellite
    removeLabels: true, // Keep or Remove Labels (Default: false)
  },

  bathymetry: false, // Add Ocean Bathymetry

  // LAYERS
  weather: false, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: false, // Show Live Weather Radar

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
    countryColorization: "population", // 'color7' || 'population' || 'GDP' || 'economy' || 'income' || '' // Colorization
    countryOppacityZoomLevel: 0, // Zoom Oppacity (Default: 0)
    countryExtrude: "population", // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: nato, //nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: false, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: true, // false || true // Admin One Colorization
    adminOneExtrude: true, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 1, // Admin One Extrude Oppacity
    countryFilter: nato, // nato || ['USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: false, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: true, // false || true // Usa Counties Colorization
    usaCountiesExtrude: true, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
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
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1400, // false || NUM milliseconds // How many milliseconds between switching
  },
};

// WEATHER
const config_current_weather = {
  name: "Current Weather",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: North_Star_Web, // Cali_Terrain_Web, // random || style // Starting Style
  globeMode: true, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: false, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "flyTo", // '' || 'reset' || 'northUp' || 'coord' || 'cam' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution
  mapCursor: false, // false, "pointer", "crosshair", "default", "zoom-in", "zoom-out", "grab"

  // Starting Location
  startingPos: {
    center: [-96, 38.5], // Starting Position
    zoom: 4, // Starting Zoom
    pitch: 0, // Starting Pitch
    bearing: 0, // Starting Bearing
    startBounds: americaBounds, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

  // Interactivity
  interactive: true, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: false, // true || false // Allow Rotation
    pitch: false, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
  },

  // CORNER DESCRIPTIONS
  showCorners: true, // Active or disable all corners
  actionOnLoad: "close", // false || 'open' || 'close' // Open, Close, or Do Nothion on load
  cornerDesc: [
    {
      corner: "bottom-right", // 'top/bottom-left/right'
      htmlContent: "<div><h2>Current Weather</h2> <p>View Current Weather Radar</p><p>Hover Over Top Right to View More Info</p></div",
    },
  ],

  // VIEW OPTIONS
  searchbar: false, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search

    clearOnMapMove: true, // Clear when focus removed from search
    searchMarker: true, // Add Search Marker

    enableUserLocation: false, // Enable user location button
    collapseBar: true, // Collapse when not in use
    customLocation: false, // Customize location in CSS
  },

  styleSwitcher: false, // Add style swither radio buttons
  styleSwitcherOptions: {
    // 'styleOptions' list in data.js for convenience
    enableKeyboardShortcuts: true, // Enable Clycling on 'Enter' and 'Shift + Enter' and Random on 'Backspace'
  },

  directionControl: "", // 'top-left', // '' || 'top/bottom-left/right' // Add Direction Control
  navControl: "", //'top-right', // '' || 'top/bottom-left/right' // Add Navigation Control
  geoControl: "", //'bottom-right', // '' || 'top/bottom-left/right' // Add Geolocation Control
  scaleControl: "", //'bottom-left', // '' || 'top/bottom-left/right' // Add Scale Control

  // STYLE OPTIONS
  fogStyle: "night", // 'default': Changes w style, 'custom': fog is set directly by style, 'standard': Mapbox default (empty), OR 'EXPLICIT': Explicit style
  fogStyleOptions: {
    enableKeyboardFogToggling: false, // Enable Fog Toggle with " Shift + '\' " keyboard press
  },

  terrainMode: false, // Add 3D Terrain
  terrainOptions: {
    exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
  },

  hillshading: false, // Add Hillshading
  hillshadeOptions: {
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: false, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 0.6, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "#aaa", // Color (Default: '#aaa') (Alternate: '#d0b47c')
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
  },

  satelliteFade: false, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 9.75, //14.5, // Min satellite zoom level
    satelliteFadeamt: 0.25, // 1, // Fade amount for satellite
    removeLabels: true, // Keep or Remove Labels (Default: false)
  },

  bathymetry: false, // Add Ocean Bathymetry

  // LAYERS
  weather: true, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: "precipitation", // false, 'precipitation', 'clouds', 'temp', 'wind', 'pressure', 'precipitation_new', 'clouds_new', 'temp_new', 'wind_new', 'pressure_new' // Show Live Weather Radar

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
    countryColorization: "population", // 'color7' || 'population' || 'GDP' || 'economy' || 'income' || '' // Colorization
    countryOppacityZoomLevel: 0, // Zoom Oppacity (Default: 0)
    countryExtrude: "population", // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: nato, //nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: false, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: true, // false || true // Admin One Colorization
    adminOneExtrude: true, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 1, // Admin One Extrude Oppacity
    countryFilter: nato, // nato || ['USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: false, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: true, // false || true // Usa Counties Colorization
    usaCountiesExtrude: true, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
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
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1400, // false || NUM milliseconds // How many milliseconds between switching
  },
};

// NATO MEMBERS
const config_natoMembers = {
  name: "Nato Members",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: Mapbox_Satellite_Clear, // Mapbox_Light, // North_Star_Web, // random || style // Starting Style
  globeMode: true, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: false, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "", // '' || 'reset' || 'northUp' || 'coord' || 'cam' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution

  // Starting Location
  startingPos: {
    center: [-34.02284, 62.22881],
    zoom: 2.38,
    pitch: 25.5,
    bearing: 0.0,
    startBounds: false, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

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

  // VIEW OPTIONS
  searchbar: false, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search

    clearOnMapMove: true, // Clear when focus removed from search
    searchMarker: true, // Add Search Marker

    enableUserLocation: false, // Enable user location button
    collapseBar: true, // Collapse when not in use
    customLocation: false, // Customize location in CSS
  },

  styleSwitcher: false, // Add style swither radio buttons
  styleSwitcherOptions: {
    // 'styleOptions' list in data.js for convenience
    enableKeyboardShortcuts: true, // Enable Clycling on 'Enter' and 'Shift + Enter' and Random on 'Backspace'
  },

  directionControl: "", // 'top-left', // '' || 'top/bottom-left/right' // Add Direction Control
  navControl: "", //'top-right', // '' || 'top/bottom-left/right' // Add Navigation Control
  geoControl: "", //'bottom-right', // '' || 'top/bottom-left/right' // Add Geolocation Control
  scaleControl: "", //'bottom-left', // '' || 'top/bottom-left/right' // Add Scale Control

  // STYLE OPTIONS
  fogStyle: "default", // 'default': Changes w style, 'custom': fog is set directly by style, 'standard': Mapbox default (empty), OR 'EXPLICIT': Explicit style
  fogStyleOptions: {
    enableKeyboardFogToggling: false, // Enable Fog Toggle with " Shift + '\' " keyboard press
  },

  terrainMode: false, // Add 3D Terrain
  terrainOptions: {
    exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
  },

  hillshading: false, // Add Hillshading
  hillshadeOptions: {
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: false, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 0.6, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "#aaa", // Color (Default: '#aaa') (Alternate: '#d0b47c')
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
  },

  satelliteFade: false, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 0.1, //14.5, // Min satellite zoom level
    satelliteFadeamt: 0.1, // 1, // Fade amount for satellite
    removeLabels: false, // Keep or Remove Labels (Default: false)
    satelliteSaturation: -0.7, // -1.0 - 1.0 (Default: 0) // Saturation
  },

  bathymetry: false, // Add Ocean Bathymetry

  // LAYERS
  weather: false, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: true, // Show Live Weather Radar

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
    enable: true, // Enable countries
    drawBoarders: true, // true || 'white' // Draw Boarders
    zoomOnClick: false, // Zoom to Country on Click
    highlightOnHover: true, // Highlight on Hover
    showPopupOn: "hover", // 'hover' || 'click' || '' // Popup
    popupInfo: "population", // 'population' || 'GDP' || 'economy' || 'income' || '' // **Optional** Shouldn't be used when Colorization or Extrude are on
    countryColorization: "", // 'color7' || 'population' || 'GDP' || 'economy' || 'income' || '' // Colorization
    countryOppacityZoomLevel: 3, // Zoom Oppacity
    countryExtrude: "", // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: false, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: true, // false || true // Admin One Colorization
    adminOneOppacityZoomLevel: 3.5, // Zoom Oppacity
    adminOneExtrude: true, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 0.85, // Admin One Extrude Oppacity
    countryFilter: nato, // nato || ['USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: false, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: true, // false || true // Usa Counties Colorization
    usaCountiesExtrude: true, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
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
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1400, // false || NUM milliseconds // How many milliseconds between switching
  },
};

// USA STATES
const config_usaStates = {
  name: "US States",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: Picture_Book_Web, // Mapbox_Light, // North_Star_Web, // random || style // Starting Style
  globeMode: true, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: false, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "", // '' || 'reset' || 'northUp' || 'coord' || 'cam' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution

  // Starting Location
  startingPos: {
    center: [-95.317, 42.84142],
    zoom: 3.29,
    pitch: 47.37,
    bearing: -24.72,
    startBounds: false, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

  // Interactivity
  interactive: true, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: true, // true || false // Allow Rotation
    pitch: true, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
  },

  // VIEW OPTIONS
  searchbar: false, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search

    clearOnMapMove: true, // Clear when focus removed from search
    searchMarker: true, // Add Search Marker

    enableUserLocation: false, // Enable user location button
    collapseBar: true, // Collapse when not in use
    customLocation: false, // Customize location in CSS
  },

  styleSwitcher: false, // Add style swither radio buttons
  styleSwitcherOptions: {
    // 'styleOptions' list in data.js for convenience
    enableKeyboardShortcuts: true, // Enable Clycling on 'Enter' and 'Shift + Enter' and Random on 'Backspace'
  },

  directionControl: "", // 'top-left', // '' || 'top/bottom-left/right' // Add Direction Control
  navControl: "", //'top-right', // '' || 'top/bottom-left/right' // Add Navigation Control
  geoControl: "", //'bottom-right', // '' || 'top/bottom-left/right' // Add Geolocation Control
  scaleControl: "", //'bottom-left', // '' || 'top/bottom-left/right' // Add Scale Control

  // STYLE OPTIONS
  fogStyle: "sunset", // 'default': Changes w style, 'custom': fog is set directly by style, 'standard': Mapbox default (empty), OR 'EXPLICIT': Explicit style
  fogStyleOptions: {
    enableKeyboardFogToggling: false, // Enable Fog Toggle with " Shift + '\' " keyboard press
  },

  terrainMode: false, // Add 3D Terrain
  terrainOptions: {
    exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
  },

  hillshading: false, // Add Hillshading
  hillshadeOptions: {
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: false, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 0.6, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "#aaa", // Color (Default: '#aaa') (Alternate: '#d0b47c')
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
  },

  satelliteFade: false, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 9.75, //14.5, // Min satellite zoom level
    satelliteFadeamt: 0.25, // 1, // Fade amount for satellite
    removeLabels: true, // Keep or Remove Labels (Default: false)
  },

  bathymetry: false, // Add Ocean Bathymetry

  // LAYERS
  weather: false, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: true, // Show Live Weather Radar

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
    countryColorization: "", // 'color7' || 'population' || 'GDP' || 'economy' || 'income' || '' // Colorization
    countryOppacityZoomLevel: 0, // Zoom Oppacity (Default: 0)
    countryExtrude: "", // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: nato, //nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: true, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: true, // false || true // Admin One Colorization
    adminOneOppacityZoomLevel: 2, // Zoom Oppacity (Default: 2)
    adminOneExtrude: true, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 1, // Admin One Extrude Oppacity
    countryFilter: ["USA"], // nato || ['USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: false, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: true, // false || true // Usa Counties Colorization
    usaCountiesExtrude: true, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
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
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1400, // false || NUM milliseconds // How many milliseconds between switching
  },
};

// COUNTRY POPULATIONS
const config_countryPopulations = {
  name: "Country Populations",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: Mapbox_Light, // North_Star_Web, // random || style // Starting Style
  globeMode: true, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: false, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "northUp", // '' || 'reset' || 'northUp' || 'coord' || 'cam' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution

  // Starting Location
  startingPos: {
    center: [12.07562, 51.30121],
    zoom: 3.54,
    pitch: 40.37,
    bearing: -25.44,
    startBounds: false, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

  // Interactivity
  interactive: true, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: true, // true || false // Allow Rotation
    pitch: true, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
  },

  // VIEW OPTIONS
  searchbar: false, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search

    clearOnMapMove: true, // Clear when focus removed from search
    searchMarker: true, // Add Search Marker

    enableUserLocation: false, // Enable user location button
    collapseBar: true, // Collapse when not in use
    customLocation: false, // Customize location in CSS
  },

  styleSwitcher: false, // Add style swither radio buttons
  styleSwitcherOptions: {
    // 'styleOptions' list in data.js for convenience
    enableKeyboardShortcuts: true, // Enable Clycling on 'Enter' and 'Shift + Enter' and Random on 'Backspace'
  },

  directionControl: "", // 'top-left', // '' || 'top/bottom-left/right' // Add Direction Control
  navControl: "", //'top-right', // '' || 'top/bottom-left/right' // Add Navigation Control
  geoControl: "", //'bottom-right', // '' || 'top/bottom-left/right' // Add Geolocation Control
  scaleControl: "", //'bottom-left', // '' || 'top/bottom-left/right' // Add Scale Control

  // STYLE OPTIONS
  fogStyle: "default", // 'default': Changes w style, 'custom': fog is set directly by style, 'standard': Mapbox default (empty), OR 'EXPLICIT': Explicit style
  fogStyleOptions: {
    enableKeyboardFogToggling: false, // Enable Fog Toggle with " Shift + '\' " keyboard press
  },

  terrainMode: false, // Add 3D Terrain
  terrainOptions: {
    exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
  },

  hillshading: false, // Add Hillshading
  hillshadeOptions: {
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: false, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 0.6, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "#aaa", // Color (Default: '#aaa') (Alternate: '#d0b47c')
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
  },

  satelliteFade: false, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 9.75, //14.5, // Min satellite zoom level
    satelliteFadeamt: 0.25, // 1, // Fade amount for satellite
    removeLabels: true, // Keep or Remove Labels (Default: false)
  },

  bathymetry: true, // Add Ocean Bathymetry

  // LAYERS
  weather: false, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: true, // Show Live Weather Radar

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
    enable: true, // Enable countries
    drawBoarders: true, // true || 'white' // Draw Boarders
    zoomOnClick: false, // Zoom to Country on Click
    highlightOnHover: true, // Highlight on Hover
    showPopupOn: "hover", // 'hover' || 'click' || '' // Popup
    countryColorization: "population", // 'color7' || 'population' || 'GDP' || 'economy' || 'income' || '' // Colorization
    countryOppacityZoomLevel: 0, // Zoom Oppacity (Default: 0)
    countryExtrude: "population", // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: false, //nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: false, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: true, // false || true // Admin One Colorization
    adminOneOppacityZoomLevel: 2, // Zoom Oppacity (Default: 2)
    adminOneExtrude: true, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 1, // Admin One Extrude Oppacity
    countryFilter: ["USA"], // nato || ['USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: false, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: true, // false || true // Usa Counties Colorization
    usaCountiesExtrude: true, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
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
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1400, // false || NUM milliseconds // How many milliseconds between switching
  },
};

// COUNTRY COUNTRY GDPS
const config_countryGDPs = {
  name: "Country GDPs",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: Mapbox_Light, // North_Star_Web, // random || style // Starting Style
  globeMode: true, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: false, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "northUp", // '' || 'reset' || 'northUp' || 'coord' || 'cam' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution

  // Starting Location
  startingPos: {
    center: [7.20405, 45.42053],
    zoom: 1.98,
    pitch: 0.0,
    bearing: 0.0,
    startBounds: false, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

  // Interactivity
  interactive: true, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: true, // true || false // Allow Rotation
    pitch: true, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
  },

  // VIEW OPTIONS
  searchbar: false, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search

    clearOnMapMove: true, // Clear when focus removed from search
    searchMarker: true, // Add Search Marker

    enableUserLocation: false, // Enable user location button
    collapseBar: true, // Collapse when not in use
    customLocation: false, // Customize location in CSS
  },

  styleSwitcher: false, // Add style swither radio buttons
  styleSwitcherOptions: {
    // 'styleOptions' list in data.js for convenience
    enableKeyboardShortcuts: true, // Enable Clycling on 'Enter' and 'Shift + Enter' and Random on 'Backspace'
  },

  directionControl: "", // 'top-left', // '' || 'top/bottom-left/right' // Add Direction Control
  navControl: "", //'top-right', // '' || 'top/bottom-left/right' // Add Navigation Control
  geoControl: "", //'bottom-right', // '' || 'top/bottom-left/right' // Add Geolocation Control
  scaleControl: "", //'bottom-left', // '' || 'top/bottom-left/right' // Add Scale Control

  // STYLE OPTIONS
  fogStyle: "default", // 'default': Changes w style, 'custom': fog is set directly by style, 'standard': Mapbox default (empty), OR 'EXPLICIT': Explicit style
  fogStyleOptions: {
    enableKeyboardFogToggling: false, // Enable Fog Toggle with " Shift + '\' " keyboard press
  },

  terrainMode: false, // Add 3D Terrain
  terrainOptions: {
    exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
  },

  hillshading: false, // Add Hillshading
  hillshadeOptions: {
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: false, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 0.6, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "#aaa", // Color (Default: '#aaa') (Alternate: '#d0b47c')
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
  },

  satelliteFade: false, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 9.75, //14.5, // Min satellite zoom level
    satelliteFadeamt: 0.25, // 1, // Fade amount for satellite
    removeLabels: true, // Keep or Remove Labels (Default: false)
  },

  bathymetry: true, // Add Ocean Bathymetry

  // LAYERS
  weather: false, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: true, // Show Live Weather Radar

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
    enable: true, // Enable countries
    drawBoarders: true, // true || 'white' // Draw Boarders
    zoomOnClick: false, // Zoom to Country on Click
    highlightOnHover: true, // Highlight on Hover
    showPopupOn: "hover", // 'hover' || 'click' || '' // Popup
    countryColorization: "GDP", // 'color7' || 'population' || 'GDP' || 'economy' || 'income' || '' // Colorization
    countryOppacityZoomLevel: 0, // Zoom Oppacity (Default: 0)
    countryExtrude: "", // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: false, //nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: false, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: true, // false || true // Admin One Colorization
    adminOneOppacityZoomLevel: 2, // Zoom Oppacity (Default: 2)
    adminOneExtrude: true, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 1, // Admin One Extrude Oppacity
    countryFilter: ["USA"], // nato || ['USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: false, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: true, // false || true // Usa Counties Colorization
    usaCountiesExtrude: true, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
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
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1400, // false || NUM milliseconds // How many milliseconds between switching
  },
};

// COUNTIES AND ADMINS
const config_usaCountiesAndAdminOne = {
  name: "US Counties",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: Clear_Light, // random || style // Starting Style
  globeMode: false, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: false, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "northUp", // '' || 'reset' || 'northUp' || 'coord' || 'cam' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution

  // Starting Location
  startingPos: {
    center: [7.20405, 45.42053],
    zoom: 1.98,
    pitch: 0.0,
    bearing: 0.0,
    startBounds: americaBounds, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

  // Interactivity
  interactive: true, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: false, // true || false // Allow Rotation
    pitch: false, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
  },

  // VIEW OPTIONS
  searchbar: false, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search

    clearOnMapMove: true, // Clear when focus removed from search
    searchMarker: true, // Add Search Marker

    enableUserLocation: false, // Enable user location button
    collapseBar: true, // Collapse when not in use
    customLocation: false, // Customize location in CSS
  },

  styleSwitcher: false, // Add style swither radio buttons
  styleSwitcherOptions: {
    // 'styleOptions' list in data.js for convenience
    enableKeyboardShortcuts: true, // Enable Clycling on 'Enter' and 'Shift + Enter' and Random on 'Backspace'
  },

  directionControl: "", // 'top-left', // '' || 'top/bottom-left/right' // Add Direction Control
  navControl: "", //'top-right', // '' || 'top/bottom-left/right' // Add Navigation Control
  geoControl: "", //'bottom-right', // '' || 'top/bottom-left/right' // Add Geolocation Control
  scaleControl: "", //'bottom-left', // '' || 'top/bottom-left/right' // Add Scale Control

  // STYLE OPTIONS
  fogStyle: "default", // 'default': Changes w style, 'custom': fog is set directly by style, 'standard': Mapbox default (empty), OR 'EXPLICIT': Explicit style
  fogStyleOptions: {
    enableKeyboardFogToggling: false, // Enable Fog Toggle with " Shift + '\' " keyboard press
  },

  terrainMode: false, // Add 3D Terrain
  terrainOptions: {
    exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
  },

  hillshading: false, // Add Hillshading
  hillshadeOptions: {
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: false, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 0.6, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "#aaa", // Color (Default: '#aaa') (Alternate: '#d0b47c')
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
  },

  satelliteFade: false, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 9.75, //14.5, // Min satellite zoom level
    satelliteFadeamt: 0.25, // 1, // Fade amount for satellite
    removeLabels: true, // Keep or Remove Labels (Default: false)
  },

  bathymetry: true, // Add Ocean Bathymetry

  // LAYERS
  weather: false, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: true, // Show Live Weather Radar

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
    showPopupOn: "hover", // 'hover' || 'click' || '' // Popup
    countryColorization: "GDP", // 'color7' || 'population' || 'GDP' || 'economy' || 'income' || '' // Colorization
    countryOppacityZoomLevel: 0, // Zoom Oppacity (Default: 0)
    countryExtrude: 250000, // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: false, //nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: true, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: false, // false || true // Admin One Colorization
    adminOneOppacityZoomLevel: 2, // Zoom Oppacity (Default: 2)
    adminOneExtrude: false, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 1, // Admin One Extrude Oppacity
    countryFilter: ["exclude", "USA"], // nato || ['USA', 'CAN', 'MEX'] || ['exclude', 'USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: true, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: false, // false || true // Usa Counties Colorization
    usaCountiesExtrude: false, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
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
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1400, // false || NUM milliseconds // How many milliseconds between switching
  },
};

// URBAN AREAS
const config_urbanAreas = {
  name: "Urban Areas",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: Minimo_Web, // random || style // Starting Style
  globeMode: false, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: true, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "coord", // '' || 'reset' || 'northUp' || 'coord' || 'cam' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution

  // Starting Location
  startingPos: {
    center: [7.20405, 45.42053],
    zoom: 1.98,
    pitch: 0.0,
    bearing: 0.0,
    startBounds: americaBounds, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

  // Interactivity
  interactive: true, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: false, // true || false // Allow Rotation
    pitch: false, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
  },

  // VIEW OPTIONS
  searchbar: false, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search

    clearOnMapMove: true, // Clear when focus removed from search
    searchMarker: true, // Add Search Marker

    enableUserLocation: false, // Enable user location button
    collapseBar: true, // Collapse when not in use
    customLocation: false, // Customize location in CSS
  },

  styleSwitcher: false, // Add style swither radio buttons
  styleSwitcherOptions: {
    // 'styleOptions' list in data.js for convenience
    enableKeyboardShortcuts: true, // Enable Clycling on 'Enter' and 'Shift + Enter' and Random on 'Backspace'
  },

  directionControl: "", // 'top-left', // '' || 'top/bottom-left/right' // Add Direction Control
  navControl: "", //'top-right', // '' || 'top/bottom-left/right' // Add Navigation Control
  geoControl: "", //'bottom-right', // '' || 'top/bottom-left/right' // Add Geolocation Control
  scaleControl: "", //'bottom-left', // '' || 'top/bottom-left/right' // Add Scale Control

  // STYLE OPTIONS
  fogStyle: "default", // 'default': Changes w style, 'custom': fog is set directly by style, 'standard': Mapbox default (empty), OR 'EXPLICIT': Explicit style
  fogStyleOptions: {
    enableKeyboardFogToggling: false, // Enable Fog Toggle with " Shift + '\' " keyboard press
  },

  terrainMode: false, // Add 3D Terrain
  terrainOptions: {
    exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
  },

  hillshading: false, // Add Hillshading
  hillshadeOptions: {
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: false, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 0.6, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "#aaa", // Color (Default: '#aaa') (Alternate: '#d0b47c')
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
  },

  satelliteFade: true, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 10.75, //14.5, // Min satellite zoom level
    satelliteFadeamt: 0.25, // 1, // Fade amount for satellite
    removeLabels: false, // Keep or Remove Labels (Default: false)
  },

  bathymetry: true, // Add Ocean Bathymetry

  // LAYERS
  weather: false, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: true, // Show Live Weather Radar

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
    showPopupOn: "hover", // 'hover' || 'click' || '' // Popup
    countryColorization: "GDP", // 'color7' || 'population' || 'GDP' || 'economy' || 'income' || '' // Colorization
    countryOppacityZoomLevel: 0, // Zoom Oppacity (Default: 0)
    countryExtrude: 250000, // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
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
    countryFilter: ["exclude", "USA"], // nato || ['USA', 'CAN', 'MEX'] || ['exclude', 'USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
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
    enable: true, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
    zoomOnClick: true, // Zoom to area on click
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
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1400, // false || NUM milliseconds // How many milliseconds between switching
  },
};

// STATE COLLEGE DIRECTIONS
const config_stateCollegeDirections = {
  name: "Directions",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: Mapbox_Outdoors, // North_Star_Web, // random || style // Starting Style
  globeMode: false, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: false, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "", // '' || 'reset' || 'northUp' || 'coord' || 'flyTo' || 'cam' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution
  mapCursor: false, // Default: false, "pointer", "crosshair", "default", "zoom-in", "zoom-out", Explicit Default: "grab"

  // Starting Location
  startingPos: {
    center: [-96, 38.5], // Starting Position
    zoom: 4, // Starting Zoom
    pitch: 0, // Starting Pitch
    bearing: 0, // Starting Bearing
    startBounds: americaBounds, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

  // Interactivity
  interactive: true, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: true, // true || false // Allow Rotation
    pitch: true, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
  },

  // VIEW OPTIONS
  searchbar: false, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search

    clearOnMapMove: true, // Clear when focus removed from search
    searchMarker: true, // Add Search Marker

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
  directionControl: "top-left", // 'top-left', // '' || 'top/bottom-left/right' // Add Direction Control
  directionControlOptions: {
    startingProfile: "driving", // 'driving' || 'walking' || 'cycling' || 'driving-traffic'
    showAltRoutes: true, // true || false // Show Alternative Routes
    showInstructions: "hover", // true || 'hover' || false // Show Instruction Panel
    optionalOrigin: "Old Main, Penn State University, State College, Pennsylvania 16801, United States", // false || textString ('Hartford, CT) || [lon, lat] // Sets the Origin
    optionalDestination: "-77.76498,40.75141", // false || textString: ('Hartford, CT') || lngLat: "lon,lat" (find nearest structure) [lon, lat] (exact) // Sets the Destination
    // optionalDestination: "Mount Nittany Station 2, on Mt Nittany, Boalsburg, Pennsylvania 16827, United States", // false || textString ('Hartford, CT) || [lon, lat] // Sets the Destination
  },

  // STYLE OPTIONS
  fogStyle: "default", // 'default': Changes w style, 'custom': fog is set directly by style, 'standard': Mapbox default (empty), OR 'EXPLICIT': Explicit style
  fogStyleOptions: {
    enableKeyboardFogToggling: false, // Enable Fog Toggle with " Shift + '\' " keyboard press
  },

  terrainMode: true, // Add 3D Terrain
  terrainOptions: {
    exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
  },

  hillshading: false, // Add Hillshading
  hillshadeOptions: {
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: false, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 0.6, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "#aaa", // Color (Default: '#aaa') (Alternate: '#d0b47c')
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
  },

  satelliteFade: false, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 9.75, //14.5, // Min satellite zoom level
    satelliteFadeamt: 1.25, // 1, // Fade amount for satellite
    removeLabels: true, // Keep or Remove Labels (Default: false)
  },

  bathymetry: false, // Add Ocean Bathymetry

  // LAYERS
  weather: false, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: "precipitation", // false, 'precipitation', 'clouds', 'temp', 'wind', 'pressure', 'precipitation_new', 'clouds_new', 'temp_new', 'wind_new', 'pressure_new' // Show Live Weather Radar

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
    countryColorization: "", // 'color7' || 'population' || 'GDP' || 'economy' || 'income' || '' // Colorization
    countryOppacityZoomLevel: 0, // Zoom Oppacity (Default: 0)
    countryExtrude: "", // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: nato, //nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: false, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: true, // false || true // Admin One Colorization
    adminOneOppacityZoomLevel: 2, // Zoom Oppacity (Default: 2)
    adminOneExtrude: true, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 1, // Admin One Extrude Oppacity
    countryFilter: ["USA"], // nato || ['USA', 'CAN', 'MEX'] || ['exclude', 'USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: false, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: true, // false || true // Usa Counties Colorization
    usaCountiesExtrude: true, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
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
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1400, // false || NUM milliseconds // How many milliseconds between switching
    resolution: "med", // 'high', 'med', 'low' (Default: 'med')
  },
};

// BUILDING HEIGHTS
const config_building_heights = {
  name: "Building Heights",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: Mapbox_Light, // Cali_Terrain_Web, // North_Star_Web, // random || style // Starting Style
  globeMode: false, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
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
    center: [-73.97708, 40.76096],
    zoom: 15.25,
    pitch: 60.0,
    bearing: 169.16,
    // startBounds: americaBounds, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

  // minzoom: 15.25, // min zoom // false || zoomLevel (Default: 0) (Always Show Buildings: 15.25)
  maxzoom: false, // max zoom // false || zoomLevel (Default: 22)
  maxpitch: 60, // max pitch // false || pitchLevel (Default/Max: 85) (Optimized for labels and buildings: 60)

  // Interactivity
  interactive: true, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: true, // true || false // Allow Rotation
    pitch: true, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
  },

  // CORNER DESCRIPTIONS
  showCorners: true, // Active or disable all corners
  actionOnLoad: "open", // false || 'open' || 'close' // Open, Close, or Do Nothion on load
  cornerDesc: [
    {
      corner: "bottom-right", // 'top/bottom-left/right'
      htmlContent: 1000,
    },
    // {
    //   corner: "bottom-left", // 'top/bottom-left/right'
    //   htmlContent: 1001,
    // },
  ],

  // VIEW OPTIONS
  searchbar: true, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search
    instantFly: false, // Instant Jump or Fly to (Default: false)

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
    optionalOrigin: false, // false || textString ('Hartford, CT) || [lon, lat] // Sets the Origin
    optionalDestination: false, // false || textString ('Hartford, CT) || [lon, lat] // Sets the Destination
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
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: true, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 1, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "height", // Color (Default: '#aaa') || 'height' || 'type' || (Alternate: '#d0b47c')
    setZoomOnClick: true, // true || false // sets zoom to 15.25 when clicking map or if showPopupOn 'click' then sets zoom when not clicking building
    showPopupOn: "click", // false || 'hover' || 'click' // Show Popup On
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
    interpolateHeight: [16, 1 / 1000000], // Interpolate Height // false || [HEIGHT, EXPONENT] // (Default: false (no animation)) (Good: [16, 1 / 1000000]) (Linear: [16, 1]) ([16, 10000]) ([18, 1000]) // Height minimum 16
    requestGeocodeZoomLevel: 15.25, // false || zoomLevel (Default: 15.25) // Request geocode go to this zoom level
    heightCap: "dynamic", // Default: 420 (Height of One World Trade Center) || number // Height of Top Range Number (meters)
    // Set minzoom to 15.25 for always shown or to 15 for allowed remove
  },

  satelliteFade: false, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 9.75, //14.5, // Min satellite zoom level
    satelliteFadeamt: 1, // 1, // Fade amount for satellite
    reverseDirection: true, // true || false // (Default: false)
    removeLabels: true, // Keep or Remove Labels (Default: false)
    satelliteSaturation: 0, // -1.0 - 1.0 (Default: 0) // Saturation
  },

  bathymetry: false, // Add Ocean Bathymetry

  // LAYERS
  weather: false, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: "precipitation", // false, 'precipitation', 'clouds', 'temp', 'wind', 'pressure', 'precipitation_new', 'clouds_new', 'temp_new', 'wind_new', 'pressure_new' // Show Live Weather Radar

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
    countryExtrude: "", // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: nato, //nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: false, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: true, // false || true // Admin One Colorization
    adminOneOppacityZoomLevel: 2, // Zoom Oppacity (Default: 2)
    adminOneExtrude: true, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 1, // Admin One Extrude Oppacity
    countryFilter: ["USA"], // nato || ['USA', 'CAN', 'MEX'] || ['exclude', 'USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: false, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: true, // false || true // Usa Counties Colorization
    usaCountiesExtrude: true, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
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
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1400, // false || NUM milliseconds // How many milliseconds between switching
    resolution: "med", // 'high', 'med', 'low' (Default: 'med')
  },
};

// BUILDING TYPES
const config_building_types = {
  name: "Building Types",
  accessToken: "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw",

  // Basic Funcationality
  startingStyle: Mapbox_Light, // Cali_Terrain_Web, // North_Star_Web, // random || style // Starting Style
  globeMode: false, // Globe (true) || Mercator (false) || 'naturalEarth', 'equalEarth', 'equirectangular', 'winkelTripel', 'lambertConformalConic', 'albers'
  renderWorldCopies: true, // Render Infinite Maps (Default: true) (Useful for zoomed out flat map visualization)
  hashMode: false, // Hash the URL
  bounded: false, // false || bounds [[],[]] // Sets movement boundaries for user
  mapOnClick: "", // '' || 'reset' || 'northUp' || 'coord' || 'flyTo' // Map Click Action
  logoPosition: "bottom-left", // 'top/bottom-left/right' // Mapbox Logo Position
  includeAttribution: true, // Include Attribution
  mapCursor: false, // Default: false, "pointer", "crosshair", "default", "zoom-in", "zoom-out", Explicit Default: "grab"

  // Starting Location
  startingPos: {
    center: [-77.86146, 40.79187],
    zoom: 15.25,
    pitch: 60.0,
    bearing: 0.0,
    startBounds: false, // false || [[],[]] // OVERRIDES STARTING pos/pitch/bearing/zoom // Starting boundaries (Ex: americaBounds)
  },
  showLocationHelper: false, // Show Location Helper

  // minzoom: 15.25, // min zoom // false || zoomLevel (Default: 0) (Always Show Buildings: 15.25)
  maxzoom: false, // max zoom // false || zoomLevel (Default: 22)
  maxpitch: 60, // max pitch // false || pitchLevel (Default/Max: 85) (Optimized for labels and buildings: 60)

  // Interactivity
  interactive: true, // false for no interactivity at all
  interactiveOptions: {
    move: true, // true || false // Allow Movement
    zoom: true, // true || false // Allow Zoom
    rotate: true, // true || false // Allow Rotation
    pitch: true, // true || false // Allow Pitch

    cooperativeGestures: false, // Require Cmd + scroll to Zoom (Default: false)
  },

  // CORNER DESCRIPTIONS
  cornerDesc: [
    {
      corner: "top-right", // 'top/bottom-left/right'
      htmlContent: "<p>The Nato Countries</p> <p>Zoom in for GDP</p>",
    },
  ],

  // VIEW OPTIONS
  searchbar: true, // Add Searchbar
  searchbarOptions: {
    placeholderText: "Search", // Place Holder Text
    proximitySearch: false, // Prioritize results by general map area or search global every time
    allowReverseGeocode: true, // Allow coordinate search
    instantFly: false, // Instant Jump or Fly to (Default: false)

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
    optionalOrigin: false, // false || textString ('Hartford, CT) || [lon, lat] // Sets the Origin
    optionalDestination: false, // false || textString ('Hartford, CT) || [lon, lat] // Sets the Destination
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
    overrideExistingHillshade: false, // Remove Existing Hillshade or Keep current
  },

  contours: false, // Add contours
  contourOptions: {
    overrideExistingContours: true, //Remove Existing Contours
    removeLabels: false, // Remove Existing Contour Labels
    forceOnTop: false, // Force Contours on Top
    color: "#333", // Line Color (Default: '#877b59')
    lineWidth: 1, // Line Width (Default: 1)
    opacity: 1, // Line Opacity (Default: 1)
  },

  buildings3D: true, // Add 3D Buildings
  buildingOptions: {
    oppacity3D: 1, // 3D Building opacity (Default: 0.6)
    insertBehindLabels: false, // Insert Behind labels
    color: "type", // Color (Default: '#aaa') || 'height' || 'type' || (Alternate: '#d0b47c')
    showPopupOn: "hover", // false || 'hover' || 'click' // Show Popup On
    lightIntensity: 0.6, // 0-1 // (Default: 0.5)
    interpolateHeight: [16, 1 / 1000000], // Interpolate Height // false || [HEIGHT, EXPONENT] // (Default: false (no animation)) (Good: [16, 1 / 1000000]) (Linear: [16, 1]) ([16, 10000]) ([18, 1000]) // Height minimum 16
    requestGeocodeZoomLevel: 15.25, // false || zoomLevel // Request geocode go to this zoom level
    heightCap: 420, // Default: 420 (Height of One World Trade Center) || otherNumber // Height of Top Range Number (meters) for 'height' colorization
    // Set minzoom to 15.25 for always shown or to 15 for allowed remove
    // Always set max pitch to 60 when dealing with buildings
  },

  satelliteFade: false, // Add Satellite Fade on Zoom
  satelliteFadeOptions: {
    satelliteMinzoom: 9.75, //14.5, // Min satellite zoom level
    satelliteFadeamt: 1, // 1, // Fade amount for satellite
    reverseDirection: true, // true || false // (Default: false)
    removeLabels: true, // Keep or Remove Labels (Default: false)
    satelliteSaturation: 0, // -1.0 - 1.0 (Default: 0) // Saturation
  },

  bathymetry: false, // Add Ocean Bathymetry

  // LAYERS
  weather: false, // Add Weather
  weatherOptions: {
    // Documentation: 'https://openweathermap.org/api'
    weatherAPIKey: "ecc25565b4fe8bc58f10225f90abb3cc",
    fahrenheit: true, // Fahrenheit or Metric

    showRadar: false, // false, 'precipitation', 'clouds', 'temp', 'wind', 'pressure', 'precipitation_new', 'clouds_new', 'temp_new', 'wind_new', 'pressure_new' // Show Live Weather Radar

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
    countryExtrude: "", // '' || 250000 || 'population' || 'GDP' || 'economy' || 'income' // Extrusion (number: flat, string: exp)
    countryExtrudeOppacity: 1, // Country Extrude Oppacity
    filter: nato, //nato, // false || [] || ['USA', 'FRA', 'DEU'] || nato // Only show country (3-Digit Codes)
    filterBkgCol: "#080b15", // '#000' || '#080b15 // Filter Background Color
  },
  adminOne: {
    enable: false, // Enable States and Provinces
    drawBoarders: true, // Draw Boarders
    zoomOnClick: false, // Zoom to Admin1 on Click
    highlightOnHover: true, // Highlight on Hover
    adminOneColorization: true, // false || true // Admin One Colorization
    adminOneOppacityZoomLevel: 2, // Zoom Oppacity (Default: 2)
    adminOneExtrude: true, // false || 80000 || true // Extrusion
    adminOneExtrudeOppacity: 1, // Admin One Extrude Oppacity
    countryFilter: ["USA"], // nato || ['USA', 'CAN', 'MEX'] || ['exclude', 'USA', 'CAN', 'MEX'] || [] // Country Filter (3-Digit Codes)
  },
  usaCounties: {
    enable: false, // Enable USA Counties
    highlightOnHover: true, // Highlight on Hover
    usaCountiesColorization: true, // false || true // Usa Counties Colorization
    usaCountiesExtrude: true, // false || 80000 || true // Extrusion
    fadeInZoomLevel: 2, //5.5, // Fade In Zoom Level (Default: 4)
  },

  // DATASET LAYERS
  urbanAreas: {
    enable: false, // Highlight Urban Areas
    fillColor: "rgba(0,0,0,0.2)", // Fill Color ('clear' || 'rgba(0,0,0,0.3)' || '#e74c3c')
    highlightOnHover: "clear", // false || true || 'clear' // Highlight on Hover
    drawBoarders: true, // true || 'white' || false // Draw Boarders
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
    enableCyclingOnKeypress: false, // Enable Cycle Rotation (Press Enter)
    autoCycling: 1400, // false || NUM milliseconds // How many milliseconds between switching
    resolution: "med", // 'high', 'med', 'low' (Default: 'med')
  },
};

// --------------------------

// ALL CONFIGS
const allConfigSets = {
  "globe-rotation": config_rotateGlobe,
  "blue-planet-rotation": config_rotateBluePlanet,
  "style-switcher": config_styleSwitcher,
  "current-weather": config_current_weather,
  "nato-members": config_natoMembers,
  "us-states": config_usaStates,
  "country-populations": config_countryPopulations,
  "country-GDPs": config_countryGDPs,
  "us-counties": config_usaCountiesAndAdminOne,
  "urban-areas": config_urbanAreas,
  "directions": config_stateCollegeDirections,
  "building-heights": config_building_heights,
  "building-types": config_building_types,
  "black-marble": config_blackMarble,
};

// CHECK URL PARAMETERS
(function setConfig() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("c")) {
    const con = urlParams.get("c");
    console.log('urlParams Detected: ' + con);
    if (allConfigSets.hasOwnProperty(con)) config = allConfigSets[con];
  } else console.log('TEST CONFIG');
})();

// SET MANUALLY
// config = config_current_weather;
// config = config_natoMembers;
// config = config_countryPopulations;
// config = config_usaCountiesAndAdminOne;
// config = config_urbanAreas;
// config = config_stateCollegeDirections; // Must find a way to add geocoder or direction API only when needed
// config = config_building_heights; // Must find a way to add geocoder or direction API only when needed
// config = config_building_types; // Must find a way to add geocoder or direction API only when needed
// config = config_blackMarble; // Add Minimo City Labels
// ADD THE PSU LINKEDIN MAP

// Set Manual Attributes
// config.hashMode = true;
// config.showLocationHelper = true;

// SET DOCUMENT TITLE
if (config.name) document.title = config.name;
