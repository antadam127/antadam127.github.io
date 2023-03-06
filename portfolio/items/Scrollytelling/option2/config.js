const customMarker = {
    color: '#1e407c', // '#375686', // '#3FB1CE',
    scale: 1, // 0.75,
}

const config = {
    accessToken: 'pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw',

    // Base Style
    startingStyle: Mapbox_Streets,
    // startingStyle: Le_Shine_Web, // Mapbox_Satellite_Streets, // Pencil_Web, // Minimo_Web, // Le_Shine_Web, // Moonlight, // North_Star_Web, // random || style // Starting Style
    globeMode: true, // Globe or Mercator

    // Start Location
    startingPos: [-96, 38.5], // Starting Position
    startingZoom: 4, // Starting Zoom
    startingBearing: 0, // Starting Bearing
    startingPitch: 0, // Starting Pitch

    // OR Start Bounds
    startOnBounds: false, // false || bounds ([[],[]]) (americaBounds) // Ignores startingPos/Pitch/Bearing/Zoom ^^

    // Map Variables
    hashMode: false, // Hash the URL
    resetOnClick: true, // Reset View on Click

    // Interactivity
    interactive: false, // false for no interactivity at all
    interactiveOptions: {
        move: true, // 'soft', // true || 'soft' || false // Allow Movement
        zoom: true, // false, // true || 'soft' || false // Allow Zoom
        rotate: true, // 'soft', // 'soft' || true || false // Allow Rotation
        pitch: true, // 'soft', // 'soft' || true || false // Allow Pitch

        cooperativeGestures: false, // Cmd + scroll to Zoom (Default: false)
        bounded: false, // false || bounds [[],[]] // Sets boundaries for user
    },

    // VIEW OPTIONS
    scrollytelling: true, // Enable Scrollytelling
    searchbar: false, // Add Searchbar
    styleSwitcher: false, // Add style swither radio buttons
    // enableIsochrone: false, // Enable Isochrone Radius

    searchbarOptions: {
        placeholderText: 'Search', // Place Holder Text
        proximitySearch: false, // Prioritize results by general map area or search global every time
        allowReverseGeocode: true, // Allow coordinate search    

        clearOnMapMove: true, // Clear when focus removed from search
        searchMarker: true, // Add Search Marker

        enableUserLocation: false, // Enable user location button
        collapseBar: true, // Collapse when not in use

        customLocation: false, // Customize location in CSS
    },

    styleSwitcherOptions: {
        // 'styleOptions' list in data.js for convenience
        enableKeyboardShortcuts: true, // Enable Clycling on 'Enter' and 'Shift + Enter' and Random on 'Backspace'
    },

    isochroneOptions: {
        autoFitToArea: true, // Auto fit area
        removeeIsoOnMove: false, // Remove area on marker move    
    },

    // STYLE OPTIONS
    fogStyle: 'default', // 'default': Changes w style, 'custom': fog is set directly by style, 'standard': Mapbox default (empty), OR 'EXPLICIT': Explicit style
    terrainMode: false,  // Add 3D Terrain
    hillshading: false, // Add Hillshading
    contours: false, // Add contours
    bathymetry: false, // Add Ocean Bathymetry

    buildings3D: true, // Add 3D Buildings
    satelliteFade: false, // Add Satellite Fade on Zoom

    fogStyleOptions: {
        enableKeyboardFogToggling: true, // Enable Fog Toggle with " Shift + '\' " keyboard press
    },

    terrainOptions: {
        exaggeration: 1.5, // Terrain Exaggeration (Default: 1.5)
    },

    hillshadeOptions: {
        overrideExistingHillshade: true, // Remove Existing Hillshade or Keep current
    },

    contourOptions: {
        overrideExistingContours: true, //Remove Existing Contours
        removeLabels: false, // Remove Existing Contour Labels
        color: 'black', // Line Color (Default: '#877b59')
        lineWidth: 1, // Line Width (Default: 1)
        opacity: 1, // Line Opacity (Default: 1)
    },

    buildingOptions: {
        oppacity3D: 0.55, // 3D Building opacity (Default: 0.6)
        insertBehindLabels: true, // Insert Behind labels
    },

    satelliteFadeOptions: {
        satelliteMinzoom: 14.5, // Min satellite zoom level
        satelliteFadeamt: 1, // Fade amount for satellite    
    }
}
