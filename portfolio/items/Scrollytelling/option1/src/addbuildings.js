// Add 3D Buildings
function add3DBuildings() {
    const opacity = 0.55; // Default: 0.6
    const insertBehindLabels = true;
    const heightMultiplier = 1;

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
    const buildingLayers = layers.filter((layer) => insertBehindLabels && layer.type === "symbol" && layer.layout["text-field"]);
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
                "fill-extrusion-color": '#aaa',
                // "fill-extrusion-color":
                //     config.buildingOptions.color == "height"
                //         ? [
                //             "interpolate",
                //             ["linear"],
                //             ["get", "height"],
                //             0,
                //             colorScales[0][0],
                //             !isNaN(config.buildingOptions.heightCap) ? config.buildingOptions.heightCap : 420,
                //             colorScales[0][1],
                //         ]
                //         : config.buildingOptions.color == "type"
                //             ? buildingTypeColorization
                //             : config.buildingOptions.color,

                // Proper exstruion seems broken
                "fill-extrusion-height": [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15, 0, 15.05, ['*', ['get', 'height'], heightMultiplier]
                ],
                // "fill-extrusion-height": config.buildingOptions.interpolateHeight
                //     ? [
                //         "interpolate",
                //         ["exponential", config.buildingOptions.interpolateHeight[1]],
                //         ["zoom"],
                //         15,
                //         0,
                //         config.buildingOptions.interpolateHeight[0],
                //         ["get", "height"],
                //     ]
                //     : ["get", "height"],

                "fill-extrusion-base": [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15, 0, 15.05, ['*', ['get', 'min_height'], heightMultiplier]
                ],
                // "fill-extrusion-base": config.buildingOptions.interpolateHeight
                //     ? [
                //         "interpolate",
                //         ["exponential", config.buildingOptions.interpolateHeight[1]],
                //         ["zoom"],
                //         15,
                //         0,
                //         config.buildingOptions.interpolateHeight[0],
                //         ["get", "min_height"],
                //     ]
                //     : ["get", "min_height"],

                "fill-extrusion-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    15,
                    0,
                    15.25, // or 15.15
                    opacity,
                ],
            },
        },
        labelLayerId
    );
    console.log("3D Buildings Added -", insertBehindLabels ? "Beneath Labels" : "In Front of Labels");

    // Set Dynamic Height Scale
    // const rangeMultiplier = 1; // SET top range multiplier
    // let currentMax = null;
    // if (config.buildingOptions.color === "height" && config.buildingOptions.heightCap === "dynamic") {
    //     function getMaxHeight() {
    //         const features = map.queryRenderedFeatures({ layers: ["3d-buildings-userAdded"] });
    //         if (features.length > 0) {
    //             const heights = Array.from(features, (f) => f.properties.height);
    //             const maxHeight = Math.max(...heights);
    //             // heights.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
    //             // const maxHeight = heights[0];
    //             return Math.round(maxHeight * rangeMultiplier);
    //         } else return false;
    //     }
    //     function setPaintHeight(ht) {
    //         if (ht && ht !== currentMax) {
    //             currentMax = ht;
    //             console.log("repaint");
    //             map.setPaintProperty("3d-buildings-userAdded", "fill-extrusion-color", [
    //                 "interpolate",
    //                 ["linear"],
    //                 ["get", "height"],
    //                 0,
    //                 colorScales[0][0],
    //                 currentMax,
    //                 colorScales[0][1],
    //             ]);
    //             $("#maxHeightLabel").text(`${currentMax}m`);
    //         }
    //     }
    //     map.on("load", () => {
    //         setPaintHeight(getMaxHeight());
    //         map.on("moveend", () => {
    //             setPaintHeight(getMaxHeight());
    //         });
    //     });
    // }

    // // Show Popup?
    // const popup = new mapboxgl.Popup({
    //     closeButton: config.buildingOptions.showPopupOn === "hover" ? false : true,
    //     focusAfterOpen: false,
    //     closeOnClick: config.buildingOptions.showPopupOn === "click" && config.buildingOptions.setZoomOnClick ? false : true,
    // });
    // map.on("zoomstart", () => {
    //     popup.remove();
    // });
    // if (config.buildingOptions.showPopupOn) {
    //     function addToMap(e) {
    //         popup
    //             .setLngLat([e.lngLat.lng, e.lngLat.lat])
    //             .setHTML(
    //                 `<div style="padding: 12px; text-align: center; min-width: 110px"><h2 style='margin-top: 10px'>${e.features[0].properties.type[0].toUpperCase() + e.features[0].properties.type.slice(1).replace(":part", "")
    //                 }</h2><p style='margin-bottom: 0'>${e.features[0].properties.height + "m | " + (e.features[0].properties.height * 3.28084).toFixed(1) + "ft"
    //                 }</p><p style='margin-top: 0; margin-bottom: 6px;'>${Math.round(e.features[0].properties.height / 3)} stories</p></div>`
    //             )
    //             .addTo(map);
    //     }
    //     setupMouseHoverAndClick(
    //         "composite",
    //         "building",
    //         "3d-buildings-userAdded",
    //         (e) => {
    //             // console.log(e.features[0].properties);
    //             // console.log(e.features[0].properties.type);
    //             // console.log(e.features[0].properties.height + "m | " + (e.features[0].properties.height * 3.28084).toFixed(2) + "ft");
    //             if (config.buildingOptions.showPopupOn === "click") addToMap(e);
    //         },
    //         (e) => {
    //             if (config.buildingOptions.showPopupOn === "hover") addToMap(e);
    //         },
    //         () => {
    //             if (config.buildingOptions.showPopupOn === "hover") popup.remove();
    //         }
    //     );
    // }
    // // Remove if zoom out
    // if (config.buildingOptions.showPopupOn === "click") {
    //     if (config.buildingOptions.setZoomOnClick) map.doubleClickZoom.disable(); // Disable double click to zoom
    //     map.on("moveend", () => {
    //         if (popup.isOpen()) if (map.getZoom() < 15.25) popup.remove();
    //     });
    // }

    // // Fly to 15.25 zoom on click
    // if (config.buildingOptions.setZoomOnClick) {
    //     map.on("click", (e) => {
    //         if (config.buildingOptions.showPopupOn === "click") {
    //             // Get layers under click when showPopupOn 'click' is active
    //             const layers = Array.from(map.queryRenderedFeatures(e.point), (feat) => feat.layer.id);
    //             if (!layers.includes("3d-buildings-userAdded")) {
    //                 // If not clicking on a building, and if popup is not open, then fly
    //                 if (popup.isOpen()) popup.remove();
    //                 else map.flyTo({ center: [e.lngLat.lng, e.lngLat.lat], zoom: 15.25 });
    //             }
    //         } else map.flyTo({ center: [e.lngLat.lng, e.lngLat.lat], zoom: 15.25 });
    //     });
    // }

    // setLight("viewport", "#fff", 0.5);
}
if (config.use3dBuildings) {
    map.on("load", function () {
        add3DBuildings();
    });
}