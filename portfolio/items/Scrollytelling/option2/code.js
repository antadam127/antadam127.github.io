// Get Random Style
function getRandomStyle() {
  let style = allMapStyles[Math.floor(Math.random() * allMapStyles.length)];
  if (config.styleSwitcher && styleOptions.length > 1)
    style = allMapStyles[styleOptions[Math.floor(Math.random() * styleOptions.length)]];
  return style;
}
if (config.startingStyle === 'random') config.startingStyle = getRandomStyle();

// Reset Map
function resetMap(instant) {
  if (config.startOnBounds) {
    if (instant) northUp(true);
    map.once('moveend', () => { northUp(); });
    map.fitBounds(config.startOnBounds, { padding: 20, animate: instant ? false : true });
    // softMoveLocationSet();
  } else {
    softMoveLocationSet({
      center: config.startingPos,
      zoom: config.startingZoom,
      pitch: config.startingPitch,
      bearing: config.startingBearing,
    });
    map.flyTo({
      center: config.startingPos,
      zoom: config.startingZoom,
      pitch: config.startingPitch,
      bearing: config.startingBearing,
    });
  }
}

// Reset Angles
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

// Soft Movement Setup
let shouldMove, flyAttributes;

function softMoveLocationSet(location) {
  console.log('Soft move set');
  // Call to set location (explicitly or where camera is now)
  flyAttributes = {};

  if (!location) {
    location = {
      center: map.getCenter(),
      zoom: map.getZoom(),
      bearing: map.getBearing(),
      pitch: map.getPitch(),
    };
  }

  if (config.interactiveOptions.move !== true) {
    flyAttributes.center = location.center;
  }
  if (config.interactiveOptions.zoom !== true) {
    flyAttributes.zoom = location.zoom;
  }
  if (config.interactiveOptions.rotate !== true) {
    flyAttributes.bearing = location.bearing;
  }
  if (config.interactiveOptions.pitch !== true) {
    flyAttributes.pitch = location.pitch;
  }
}

function softMovementSetup() {
  // Call Once
  shouldMove = false;

  if (config.interactiveOptions.move === 'soft' ||
    config.interactiveOptions.zoom === 'soft' ||
    config.interactiveOptions.rotate === 'soft' ||
    config.interactiveOptions.pitch === 'soft') {
    map.on('moveend', () => {
      if (shouldMove) map.flyTo(flyAttributes);
      shouldMove = false;
    });
  }

  if (config.interactiveOptions.move === 'soft') {
    map.on('dragstart', () => { shouldMove = true; });
  }
  if (config.interactiveOptions.zoom) {
    map.on('zoomstart', () => { shouldMove = true; });
  }
  if (config.interactiveOptions.rotate === 'soft') {
    map.on('rotatestart', () => { shouldMove = true; });
  }
  if (config.interactiveOptions.pitch === 'soft') {
    map.on('pitchstart', () => { shouldMove = true; });
  }
  // boxzoomstart, start
}
