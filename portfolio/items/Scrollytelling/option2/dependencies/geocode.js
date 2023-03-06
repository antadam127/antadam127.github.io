// Create Custom Geocoder only for explicitly using CSS
function createCustomGeocoder() {
  const el = document.createElement('div');
  el.id = 'geocoder';
  el.className = 'custom-geocoder';
  el.appendChild(createSearchbar().onAdd(map));
  $('#map-wrap').append(el);
}

// Create a Search Bar
function createSearchbar() {
  // Create coordinate Decoder
  const coordinatesGeocoder = function (query) {
    if (config.searchbarOptions.allowReverseGeocode) {
      let switchCoords = false;
      let matches = query.match(
        /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
      );
      if (!matches) {
        switchCoords = true;
        matches = query.match(
          /^[ ]*(?:Lng: )?(-?\d+\.?\d*)[, ]+(?:Lat: )?(-?\d+\.?\d*)[ ]*$/i
        );
      }
      if (!matches) return null;

      function coordinateFeature(lng, lat) {
        return {
          center: [lng, lat],
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          place_name: 'Lat: ' + Math.round(lat * 100000) / 100000 + ' Lng: ' + Math.round(lng * 100000) / 100000,
          place_type: ['coordinate'],
          properties: {},
          type: 'Feature'
        };
      }
      const coord1 = Number(matches[1]);
      const coord2 = Number(matches[2]);
      const geocodes = [];
      if ((coord1 < -90 || coord1 > 90) && (coord2 < -90 || coord2 > 90)) return null;
      if (coord1 < -90 || coord1 > 90) geocodes.push(coordinateFeature(coord1, coord2));
      if (coord2 < -90 || coord2 > 90) geocodes.push(coordinateFeature(coord2, coord1));
      if (geocodes.length === 0) {
        if (!switchCoords) geocodes.push(coordinateFeature(coord2, coord1));
        else geocodes.push(coordinateFeature(coord1, coord2));
      }
      return geocodes;
    } else return null;
  };

  // Define Geocoder
  const newGeocoder = new MapboxGeocoder({
    accessToken: config.accessToken, // Mapbox token
    mapboxgl: mapboxgl, // Mapbox object

    placeholder: config.searchbarOptions.placeholderText, // Placeholder text
    marker: (config.searchbarOptions.searchMarker && !config.enableIsochrone) ? customMarker : false, // Display marker
    limit: 5, // Amounts to return (defualt 5)

    // types: 'country', // Comma seperated types to return 'country,region,postcode,district,place,locality,neighborhood,address,poi'

    collapsed: config.searchbarOptions.collapseBar, // Collapse search bar
    clearOnBlur: config.searchbarOptions.clearOnMapMove, // Clear when focus removed from search
    clearAndBlurOnEsc: true, // Clear when escape key pressed

    enableGeolocation: config.searchbarOptions.enableUserLocation, // Enable user geolocation
    addressAccuracy: 'address', // 'street' || 'place' // Geolocation accuracy

    reverseGeocode: config.searchbarOptions.allowReverseGeocode, // Allow Latitude and Longitude searches
    localGeocoder: config.searchbarOptions.coordinatesGeocoder,
    enableEventLogging: false, // Disable Mapbox usage statistics

    trackProximity: config.searchbarOptions.proximitySearch, // Localize results to general map area
    // countries: 'us', // Limit to country

    // proximity: { longitude: -72.690, latitude: 41.764 }, // Prefer points around this point (trackProximity must be false)
    // bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Hard boundary for search area [minLon,minLat,maxLon,maxLat]

    // routing: true, // Specify whether to request additional metadata about the recommended navigation destination corresponding to the feature or not. Only applicable for address features. (default false)
  });
  // What to do when result returned
  newGeocoder.on('result', (e) => {
    if (config.enableIsochrone) {
      getIso(e.result.geometry.coordinates[1], e.result.geometry.coordinates[0]);
    }
  });
  console.log('Geocoder Created', config.searchbarOptions.customLocation ? '- Custom Initialized' : ' ');
  return newGeocoder;
}
