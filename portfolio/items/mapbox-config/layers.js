// Add Layer Function
function addLayerBelow(layersAbove, newLayer, exactMatch) {
  // Find layer to insert below
  const layers = map.getStyle().layers;
  let layerId = null;
  if (layersAbove[0] !== "") {
    for (const layer of layersAbove) {
      const matchingLayers = layers.filter((l) => (exactMatch ? l.id == layer : l.id.includes(layer)));
      if (matchingLayers.length > 0) {
        layerId = matchingLayers[0].id;
        break;
      }
    }
  }
  // Add Layer
  map.addLayer(newLayer, layerId);
}

// Set up Mouse hovering on layer
const hoveredIDs = {}; // Initialize Hover IDs Container
function setupMouseHoverAndClick(source, sourceLayer, layer, clickFunction, hoverFunction, leaveFunction) {
  // Detect Mouse Movement
  map.on("mousemove", layer, (e) => {
    map.getCanvas().style.cursor = "pointer";

    // Reset Previously Hovered Feature
    if (hoveredIDs[layer]) {
      map.setFeatureState(
        {
          source: source,
          sourceLayer: sourceLayer,
          id: hoveredIDs[layer],
        },
        {
          hover: false,
        }
      );
    }
    // Get Hovered and Set Feature State
    if (e.features[0].id === undefined) e.features[0].id = Math.floor(Math.random() * 1000000000); // Assign ID if feature has no ID
    hoveredIDs[layer] = e.features[0].id; // Set Hover ID
    map.setFeatureState(
      {
        source: source,
        sourceLayer: sourceLayer,
        id: hoveredIDs[layer],
      },
      {
        hover: true,
      }
    );

    if (hoverFunction) hoverFunction(e); // Run hover if given
  });
  // Check Mouse Leave
  map.on("mouseleave", layer, (e) => {
    map.getCanvas().style.cursor = "";

    // Reset Previously Hovered Feature
    if (hoveredIDs[layer]) {
      map.setFeatureState(
        {
          source: source,
          sourceLayer: sourceLayer,
          id: hoveredIDs[layer],
        },
        {
          hover: false,
        }
      );
    }
    hoveredIDs[layer] = null; // Reset Hover ID

    if (leaveFunction) leaveFunction(e); // Run leave if given
  });
  // Set up Mouse Click
  if (clickFunction) map.on("click", layer, clickFunction);
}
