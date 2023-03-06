// Initiate Map
mapboxgl.accessToken = config.accessToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID

    // Config
    style: config.startingStyle[2], // style URL
    projection: config.globeMode ? 'globe' : 'mercator',
    center: config.startingPos, // starting position [lng, lat]
    zoom: config.startingZoom, // starting zoom
    bearing: config.startingBearing, // Starting bearing
    pitch: config.startingPitch, // Starting pitch
    hash: config.hashMode, // Hash the URL

    // Interactivity
    interactive: config.interactive, // Allow Movement

    dragPan: config.interactiveOptions.move === false ? false : true, // Dragging

    scrollZoom: config.interactiveOptions.zoom === false ? false : true, // Zoom with scroll
    doubleClickZoom: config.interactiveOptions.zoom === false ? false : true, // Double click to zoom
    boxZoom: config.interactiveOptions.zoom === false ? false : true, // Shift + click to Box Zoom

    dragRotate: config.interactiveOptions.rotate === false ? false : true, // Allow for drag and rotate with left mouse (or ctrl + mouse)
    pitchWithRotate: config.interactiveOptions.pitch === false ? false : true, // Allow for pitch change with left mouse (or ctrl + mouse)

    keyboard: (config.interactiveOptions.move &&
        config.interactiveOptions.zoom &&
        config.interactiveOptions.rotate &&
        config.interactiveOptions.pitch ? true : false), // Allow keyboard inputs (-/+ | Arrows | Shift+Arrows)

    touchPitch: config.interactiveOptions.pitch === false ? false : true, // Touch Pitch
    touchZoomRotate: config.interactiveOptions.rotate === false ? false : true, // Touch Zoom

    cooperativeGestures: config.interactiveOptions.cooperativeGestures, // Cmd + scroll to Zoom (Default: false)
    maxBounds: config.interactiveOptions.bounded, // Set the max bounds

    // More
    minZoom: 0, // Minimum zoom allowed
    renderWorldCopies: false, // Render Infinite Maps (Useful for zoomed out flat map visualization)

    // Other
    logoPosition: config.scrollytelling ? 'bottom-left' : 'bottom-right', // Mapbox logo location
    attributionControl: false, // Remove attribution
    antialias: true, // Has to do with WebGL and 3D Buildings
});


// Map Events

map.on('click', (e) => {
    e.preventDefault();
    // console.log(e.lngLat.lat.toFixed(3), e.lngLat.lng.toFixed(3));
    if (config.enableIsochrone) getIso(e.lngLat.lat, e.lngLat.lng);
    else if (config.resetOnClick && !config.enableCountries) resetMap();
});

map.on('resize', (e) => {
    console.log('Map Resized');
});

map.on('style.load', () => {
    console.log('Style Loaded:', currentStyle[1]);
    if (config.startOnBounds && !config.hashMode && !config.scrollytelling) resetMap(true);
    softMovementSetup();
    if (!config.scrollytelling) softMoveLocationSet();

    // Styles
    setFogStyle(currentStyle); // Set Fog
    if (config.terrainMode) addTerrain(); // Add Terrain
    if (config.hillshading) addHillshading(); // Add Hillshading
    if (config.contours) addContours(); // Add Contours
    if (config.bathymetry) addBathymetry(); // Add Bathymetry
    if (config.satelliteFade) addSatellite(); // Add Satellite Fade
    if (config.buildings3D) add3DBuildings(); // Add 3D Buildings

    // Layers
    // if (showTimeZones) addTimeZones(); // Add Time Zones
    // if (enableCountries) addCountryData(); // Add Country Data
    // if (enableAdminOne) addAdminOneData(); // Add State and Provinces
    // if (enableCounties) addUSACounties(); // Add USA Counties
    // if (enableIsochrone) isoSetup(); // Enable Isochrone Map
});


// Search bar
if (config.searchbar) {
    if (!config.searchbarOptions.customLocation) map.addControl(createSearchbar());
    else createCustomGeocoder();
}

// Style Switcher
if (config.styleSwitcher) addStyleSwitcher();
    