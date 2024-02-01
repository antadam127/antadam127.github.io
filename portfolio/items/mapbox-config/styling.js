let currentStyle = config.startingStyle;
let currentFog = "standard";

// Add Keyboard Listeners
if (config.fogStyleOptions.enableKeyboardFogToggling) {
  document.addEventListener("keydown", (e) => {
    if (e.key == "|") {
      for (let i = 0; i < allFogStyles.length; i++) {
        if (allFogStyles[i] == currentFog) {
          currentFog = allFogStyles[(i + 1) % allFogStyles.length];
          console.log(currentFog);
          map.setFog(fogStyles[currentFog]);
          return;
        }
      }
    }
  });
}

// Set Fog
function setFogStyle(style) {
  console.log("Fog Set:", config.fogStyle === "default" ? (style.length >= 4 ? style[3] : "standard") : config.fogStyle);
  if (config.fogStyle === "custom") {
    return;
  } else if (config.fogStyle === "default") {
    for (const s of allMapStyles) {
      if (s === style) {
        if (s.length > 3) {
          if (s[3] === "custom") return;
          else map.setFog(fogStyles[s[3]]);
        } else return;
        // } else map.setFog(fogStyles["standard"]);
        return;
      }
    }
  } else {
    map.setFog(fogStyles[config.fogStyle]);
  }
}

// Add Terrain
function addTerrain() {
  if (map.getStyle().terrain) {
    if (map.getStyle().terrain.exaggeration > 0) {
      console.log("Style Already Has Terrain - No Terrain Added");
      return;
    }
  }
  console.log(`Terrain Added - ${config.terrainOptions.exaggeration}x Exaggeration`);
  // Add Source
  map.addSource("mapbox-dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    tileSize: 512,
    maxzoom: 14,
  });
  // Add the DEM source as a terrain layer
  map.setTerrain({
    source: "mapbox-dem",
    exaggeration: config.terrainOptions.exaggeration, // 1.5 Default
  });
}

// Add Hillshading
function addHillshading() {
  // Find layers with hillshading
  const hillshadeLayers = map.getStyle().layers.filter((layer) => layer.id.includes("hillshad") || layer.type.includes("hillshad"));
  // Define possible entry points
  let layerIds = ["waterway-river-canal-shadow", "waterway", "water", "label"];
  if (hillshadeLayers.length > 0) layerIds = [hillshadeLayers[hillshadeLayers.length - 1].id];

  if (hillshadeLayers.length == 0 || (hillshadeLayers.length > 0 && config.hillshadeOptions.overrideExistingHillshade)) {
    // Add Source and Layer
    map.addSource("dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    });
    addLayerBelow(layerIds, {
      id: "hillshading-userAdded",
      source: "dem",
      type: "hillshade",
    });

    // Remove Previous hillshade layers
    for (const layer of hillshadeLayers) {
      map.removeLayer(layer.id);
    }

    if (hillshadeLayers.length == 0) console.log("Hillshade Layer Added");
    else console.log("Hillshade Layer Overriden");
  } else console.log("Hillshade Layer Not Overridden");
}

// Add Contours
function addContours() {
  // Find layer to insert below
  const layers = map.getStyle().layers;
  const contourLayers = layers.filter((layer) => layer.id.includes("contour") && (config.contourOptions.removeLabels || layer.type == "line"));
  let labelLayerId = ["hillshad", "label"];
  if (contourLayers.length > 0) labelLayerId = [contourLayers[0].id];
  if (config.contourOptions.forceOnTop) labelLayerId = [];

  if (contourLayers.length == 0 || (contourLayers.length > 0 && config.contourOptions.overrideExistingContours)) {
    // Add Source
    map.addSource("contours", {
      type: "vector",
      url: "mapbox://mapbox.mapbox-terrain-v2",
    });
    // AddLayer
    addLayerBelow(labelLayerId, {
      id: "contours-userAdded",
      type: "line",
      source: "contours",
      "source-layer": "contour",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": config.contourOptions.color,
        "line-width": config.contourOptions.lineWidth,
        "line-opacity": config.contourOptions.opacity,
        // 'line-gap-width': 1,
      },
    });

    // Remove Previous Contour layers
    for (const layer of contourLayers) {
      map.removeLayer(layer.id);
    }

    if (contourLayers.length == 0) console.log("Contour Layer Added");
    else console.log("Contour Layer Overriden");
  } else console.log("Contour Layer Not Overridden");
}

// Add Bathymetry Data
function addBathymetry() {
  const allLayers = map.getStyle().layers;

  // Find layers with hillshading
  const bathLayers = allLayers.filter((layer) => layer.id == "water" || layer.id == "water-depth" || layer.id.includes("bathymetry"));

  // Define possible entry points
  let layerIds = ["tunnel", "bridge", "water", "label"];
  if (bathLayers.length > 0) {
    // Find next layer
    for (let i = 0; i < allLayers.length; i++) {
      if (allLayers[i].id == bathLayers[bathLayers.length - 1].id) {
        if (i == allLayers.length - 1) layerIds = [""];
        else layerIds = [allLayers[i + 1].id];
        break;
      }
    }
  }

  // Add Source and Layer
  map.addSource("bathymetry", {
    type: "vector",
    url: "mapbox://mapbox.mapbox-bathymetry-v2",
  });
  addLayerBelow(layerIds, {
    id: "water-depth-userAdded",
    type: "fill",
    source: "bathymetry",
    "source-layer": "depth",
    // 'layout': {},
    paint: {
      "fill-color": ["interpolate", ["cubic-bezier", 0, 0.5, 1, 0.5], ["get", "min_depth"], 200, "#78bced", 9000, "#15659f"],
    },
  });

  console.log("Bathymetry Layer Added");
}

// Add 3D Buildings
function add3DBuildings() {
  // Check if Style contains Composite
  let ctn = false;
  for (const source in map.getStyle().sources) {
    if (source == "composite") {
      ctn = true;
      break;
    }
  }
  if (!ctn) {
    console.log("Failed to Import 3D Buildings - Does Not Exist in Style");
    return;
  }

  // Set up mouse click action

  // Insert the layer beneath any symbol layer.
  const layers = map.getStyle().layers;
  const buildingLayers = layers.filter((layer) => config.buildingOptions.insertBehindLabels && layer.type === "symbol" && layer.layout["text-field"]);
  let labelLayerId = null;
  if (buildingLayers.length > 0) labelLayerId = buildingLayers[0].id;
  // Change Flat Building layer zoom levels
  // map.setPaintProperty('building', 'fill-color', buildingTypeColorization);
  // map.setPaintProperty('building', 'fill-opacity', 1);
  // map.setLayerZoomRange('building', 0);
  // Add 3D layer
  if (map.getStyle().layers.filter((layer) => layer.id == "3d-buildings-userAdded").length > 0) map.removeLayer("3d-buildings-userAdded");
  map.addLayer(
    {
      id: "3d-buildings-userAdded",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        // Height is in meters
        "fill-extrusion-color":
          config.buildingOptions.color == "height"
            ? [
              "interpolate",
              ["linear"],
              ["get", "height"],
              0,
              colorScales[0][0],
              !isNaN(config.buildingOptions.heightCap) ? config.buildingOptions.heightCap : 420,
              colorScales[0][1],
            ]
            : config.buildingOptions.color == "type"
              ? buildingTypeColorization
              : config.buildingOptions.color,

        // Proper exstruion seems broken
        "fill-extrusion-height": config.buildingOptions.interpolateHeight
          ? [
            "interpolate",
            ["exponential", config.buildingOptions.interpolateHeight[1]],
            ["zoom"],
            15,
            0,
            config.buildingOptions.interpolateHeight[0],
            ["get", "height"],
          ]
          : ["get", "height"],
        "fill-extrusion-base": config.buildingOptions.interpolateHeight
          ? [
            "interpolate",
            ["exponential", config.buildingOptions.interpolateHeight[1]],
            ["zoom"],
            15,
            0,
            config.buildingOptions.interpolateHeight[0],
            ["get", "min_height"],
          ]
          : ["get", "min_height"],

        "fill-extrusion-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.25, // or 15.15
          config.buildingOptions.oppacity3D ? config.buildingOptions.oppacity3D : 0.6,
        ],
      },
    },
    labelLayerId
  );
  console.log("3D Buildings Added -", config.buildingOptions.insertBehindLabels ? "Beneath Labels" : "In Front of Labels");

  // Set Dynamic Height Scale
  const rangeMultiplier = 1; // SET top range multiplier
  let currentMax = null;
  if (config.buildingOptions.color === "height" && config.buildingOptions.heightCap === "dynamic") {
    function getMaxHeight() {
      const features = map.queryRenderedFeatures({ layers: ["3d-buildings-userAdded"] });
      if (features.length > 0) {
        const heights = Array.from(features, (f) => f.properties.height);
        const maxHeight = Math.max(...heights);
        // heights.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
        // const maxHeight = heights[0];
        return Math.round(maxHeight * rangeMultiplier);
      } else return false;
    }
    function setPaintHeight(ht) {
      if (ht && ht !== currentMax) {
        currentMax = ht;
        console.log("repaint");
        map.setPaintProperty("3d-buildings-userAdded", "fill-extrusion-color", [
          "interpolate",
          ["linear"],
          ["get", "height"],
          0,
          colorScales[0][0],
          currentMax,
          colorScales[0][1],
        ]);
        $("#maxHeightLabel").text(`${currentMax}m`);
      }
    }
    map.on("load", () => {
      setPaintHeight(getMaxHeight());
      map.on("moveend", () => {
        setPaintHeight(getMaxHeight());
      });
    });
  }

  // Show Popup?
  const popup = new mapboxgl.Popup({
    closeButton: config.buildingOptions.showPopupOn === "hover" ? false : true,
    focusAfterOpen: false,
    closeOnClick: config.buildingOptions.showPopupOn === "click" && config.buildingOptions.setZoomOnClick ? false : true,
  });
  map.on("zoomstart", () => {
    popup.remove();
  });
  if (config.buildingOptions.showPopupOn) {
    function addToMap(e) {
      popup
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .setHTML(
          `<div style="padding: 12px; text-align: center; min-width: 110px"><h2 style='margin-top: 10px'>${e.features[0].properties.type[0].toUpperCase() + e.features[0].properties.type.slice(1).replace(":part", "")
          }</h2><p style='margin-bottom: 0'>${e.features[0].properties.height + "m | " + (e.features[0].properties.height * 3.28084).toFixed(1) + "ft"
          }</p><p style='margin-top: 0; margin-bottom: 6px;'>${Math.round(e.features[0].properties.height / 3)} stories</p></div>`
        )
        .addTo(map);
    }
    setupMouseHoverAndClick(
      "composite",
      "building",
      "3d-buildings-userAdded",
      (e) => {
        // console.log(e.features[0].properties);
        // console.log(e.features[0].properties.type);
        // console.log(e.features[0].properties.height + "m | " + (e.features[0].properties.height * 3.28084).toFixed(2) + "ft");
        if (config.buildingOptions.showPopupOn === "click") addToMap(e);
      },
      (e) => {
        if (config.buildingOptions.showPopupOn === "hover") addToMap(e);
      },
      () => {
        if (config.buildingOptions.showPopupOn === "hover") popup.remove();
      }
    );
  }
  // Remove if zoom out
  if (config.buildingOptions.showPopupOn === "click") {
    if (config.buildingOptions.setZoomOnClick) map.doubleClickZoom.disable(); // Disable double click to zoom
    map.on("moveend", () => {
      if (popup.isOpen()) if (map.getZoom() < 15.25) popup.remove();
    });
  }

  // Fly to 15.25 zoom on click
  if (config.buildingOptions.setZoomOnClick) {
    map.on("click", (e) => {
      if (config.buildingOptions.showPopupOn === "click") {
        // Get layers under click when showPopupOn 'click' is active
        const layers = Array.from(map.queryRenderedFeatures(e.point), (feat) => feat.layer.id);
        if (!layers.includes("3d-buildings-userAdded")) {
          // If not clicking on a building, and if popup is not open, then fly
          if (popup.isOpen()) popup.remove();
          else map.flyTo({ center: [e.lngLat.lng, e.lngLat.lat], zoom: 15.25 });
        }
      } else map.flyTo({ center: [e.lngLat.lng, e.lngLat.lat], zoom: 15.25 });
    });
  }

  setLight("viewport", "#fff", config.buildingOptions.lightIntensity);
}

// Add Light (Affects Extrusions)
function setLight(anchor, color, intensity, position) {
  map.setLight({
    anchor: anchor ? anchor : "viewport", // 'viewport' || 'map' // Default 'viewport'
    color: color ? color : "#fff", // Default '#ffffff
    intensity: intensity ? intensity : 0.5, // 0-1 // Default 0.5
    position: position ? position : [1.15, 210, 30], // [r radial coordinate, a azimuthal angle, p polar angle] where r indicates the distance from the center of the base of an object to its light, a indicates the position of the light relative to 0° (0° when light.anchor is set to viewport corresponds to the top of the viewport, or 0° when light.anchor is set to map corresponds to due north, and degrees proceed clockwise), and p indicates the height of the light (from 0°, directly above, to 180°, directly below).
  });
}

// Add Satellite Imagery
function addSatellite() {
  const minzoom = config.satelliteFadeOptions.satelliteMinzoom;
  const fadeamt = config.satelliteFadeOptions.satelliteFadeamt;
  const reverse = config.satelliteFadeOptions.reverseDirection;

  // Find layer to insert below
  const layers = map.getStyle().layers;
  const labelLayers = layers.filter((layer) => layer.type === "symbol" && layer.layout["text-field"]);
  let labelLayerId = null;
  if (config.satelliteFadeOptions.insertBelow) {
    let layerArr = [];
    if (config.satelliteFadeOptions.insertBelow === 'labels') layerArr = labelLayers;
    else if (config.satelliteFadeOptions.insertBelow === 'borders') layerArr = layers.filter((layer) => layer["source-layer"] === "admin");
    if (layerArr.length > 0) labelLayerId = layerArr[0].id;
  }
  // Hide labels if needed
  if (labelLayerId === null && labelLayers.length > 0) {
    labelLayers.forEach((lay) => {
      if (minzoom === false) map.removeLayer(lay.id);
      else map.setLayerZoomRange(lay.id, config.satelliteFadeOptions.reverseDirection ? minzoom : 0, config.satelliteFadeOptions.reverseDirection ? 24 : minzoom);
    });
  }

  // Add Source
  if (config.satelliteFade === 'marble') {
    if (config.satelliteFadeOptions.marbleOptions.marble === 'blackMarble') {
      map.addSource(`black-marble`, {
        type: "raster",
        url: blackMarbleURL,
        tileSize:
          config.satelliteFadeOptions.marbleOptions.resolution === "high"
            ? 64
            : config.satelliteFadeOptions.marbleOptions.resolution === "med"
              ? 256
              : config.satelliteFadeOptions.marbleOptions.resolution === "low"
                ? 512
                : false,
      });
    }
  } else {
    // Add SATELLITE Source
    map.addSource("sat", {
      type: "raster",
      url: "mapbox://mapbox.satellite",
      tileSize: 256,
    });
  }

  // Add Layer
  let layerId, layerSource;
  if (config.satelliteFade === 'marble') {
    if (config.satelliteFadeOptions.marbleOptions.marble === 'blackMarble') {
      layerId = 'black-marble-userAdded';
      layerSource = 'black-marble';
    }
  } else {
    layerId = "satellite-userAdded";
    layerSource = "sat";

  }
  map.addLayer(
    {
      id: layerId,
      source: layerSource,
      type: "raster",
      // minzoom: reverse ? "" : minzoom ? minzoom : 14.5,
      // maxzoom: !reverse ? "" : minzoom ? minzoom : 14.5,
      paint: {
        "raster-opacity": minzoom ? [
          "interpolate",
          ["linear"],
          ["zoom"],
          minzoom ? minzoom : 14.5,
          reverse ? 1 : 0,
          minzoom ? minzoom + (fadeamt ? fadeamt : 2) : 16.5,
          reverse ? 0 : 1,
        ] : 1,
        "raster-saturation": !config.satelliteFade === 'marble' && config.satelliteFadeOptions.satelliteSaturation ? config.satelliteFadeOptions.satelliteSaturation : 0,
      },
    },
    labelLayerId
  );
  console.log((config.satelliteFade === 'marble' ? config.satelliteFadeOptions.marbleOptions.marble + ' Set Up' : 'Satellite Fade Set Up') + ` - Min Zoom Level: ${minzoom === false ? 'Full Cover' : minzoom}`);

  // For use with Mapbox Satellite Streets - Filters everything except city labels and borders
  // const arr4 = ['black-marble-userAdded', 'background', 'satellite', 'admin-1-boundary-bg', 'admin-0-boundary-bg', 'admin-1-boundary', 'admin-0-boundary', 'admin-0-boundary-disputed', 'settlement-major-label', 'settlement-minor-label'];
  // console.log(arr4);
  // for (const a of map.getStyle().layers.map(e => e.id).filter(item => !arr4.includes(item))) map.setLayoutProperty(a, 'visibility', 'none');

  // addCityLabels();
}

// Building Type Colorizations
// Basic Example
// const buildingTypeColorization = [
//   "case",
//   // ["in", ":part", ["get", "type"]],
//   // '#fff',
//   ["in", "house", ["get", "type"]],
//   colorPallet[0],
//   ["in", "school", ["get", "type"]],
//   colorPallet[1],
//   ["in", "building", ["get", "type"]],
//   colorPallet[2],
//   ["in", "apartments", ["get", "type"]],
//   colorPallet[3],
//   ["in", "university", ["get", "type"]],
//   colorPallet[4],
//   "#000",
// ]
// Correct Example
// const buildingTypeColorization = [
//   "case",
//   ["in", ["case", ["in", ":part", ["get", "type"]], ["slice", ["get", "type"], 0, -5], ["get", "type"]], ["literal", ["building"]]],
//   colorPallet[1],
//   "#000",
// ];

const buildingCategroies = {
  Building: ["#81c784", "building", "yes"],
  // Residential
  "High Residential": ["#388e3c", "residential", "apartments"],
  "Low Residential": [
    "#4caf50",
    "bungalow",
    "cabin",
    "detached",
    "ger",
    "house",
    "houseboat",
    "semidetached_house",
    "static_caravan",
    "terrace",
    "hut",
    "shed",
  ],
  // Industrial
  Industrial: ["#ff8f00", "industrial", "warehouse", "bakehouse", "container"],
  // Commercial/Retail
  // Retail
  Retail: ["#03a9f4", "retail", "supermarket", "kiosk"],
  // Commercial
  Hotel: ["#00695c", "hotel"],
  Commercial: ["#1976d2", "commercial", "office"],
  // Education
  "Higher Education": ["#fdd835", "dormitory", "college", "university"],
  Education: ["#ffeb3b", "kindergarten", "school"],
  // Government/Civic
  Hospital: ["#ff80ab", "hospital"],
  "Government/Civic": ["#d84315", "fire_station", "government", "civic", "public"],
  Military: ["#bf360c", "barracks", "bunker", "military"],
  Sports: ["#ef6c00", "grandstand", "pavilion", "riding_hall", "sports_hall", "stadium"],
  // Transportation
  Transportation: ["#e91e63", "train_station", "transportation", "hangar", "carport", "garage", "garages", "parking", "bridge"],
  // Religious
  Religious: ["#6a1b9a", "cathedral", "chapel", "church", "kingdom_hall", "monastery", "mosque", "presbytery", "religious", "shrine", "synagogue", "temple"],
  // Agriculture
  Agricultural: ["#795548", "barn", "conservatory", "cowshed", "farm_auxiliary", "greenhouse", "slurry_tank", "stable", "sty", "farm"],
  // Other
  "Power/technical buildings": ["#455a64", "digester", "service", "transformer_tower", "water_tower", "storage_tank", "silo"],
  "Other buildings": [
    "#78909c",
    "beach_hut",
    "castle",
    "construction",
    "gatehouse",
    "roof",
    "ruins",
    "stilt_house",
    "tent",
    "tree_house",
    "toilets",
    "user defined",
  ],
};
const buildingTypeColorization = ["case"];
for (const cat in buildingCategroies) {
  buildingTypeColorization.push(
    ["in", ["case", ["in", ":part", ["get", "type"]], ["slice", ["get", "type"], 0, -5], ["get", "type"]], ["literal", buildingCategroies[cat]]],
    buildingCategroies[cat][0]
  );
}
buildingTypeColorization.push("#000");

function addCityLabels() {
  // // map.setStyle('mapbox://styles/antadam127/clfiuvoh6007y01pc36lmkuja');
  // map.addSource('minimo-style-source', {
  //   type: 'raster',
  //   url: 'mapbox://styles/antadam127/clfiuvoh6007y01pc36lmkuja',
  // });


  // // Add only certain layers to the map
  // map.addLayer({
  //   id: 'layer1',
  //   type: 'fill',
  //   source: 'style-source',
  //   'source-layer': 'layer1-source-layer'
  // });

  // map.addLayer({
  //   id: 'layer2',
  //   type: 'line',
  //   source: 'style-source',
  //   'source-layer': 'layer2-source-layer'
  // });

}