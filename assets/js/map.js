let enhanced = false;
if (true) {
  // let cachedMap = sessionStorage.getItem("map");
  // console.log(cachedMap);
  let moveonhover = true;

  window.addEventListener("load", () => {
    // CHECK FOR MOBILE
    var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);
    console.log(isMobile ? "Mobile Detected" : "Mobile Not Detected");
    if (isMobile) enhanced = false;
    console.log(enhanced ? "Displaying Enhanced Map" : "Displaying Basic Map");

    // ADD MAP
    mapboxgl.accessToken = "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw";
    const markerLocation = [-72.69086, 41.76458]; // Hartford
    const unenhancedBounds = [
      [-75.373, 40.0611],
      [-70.3778, 42.846],
    ]; // East Coast Bounds

    const st = Date.now();
    console.log("start");
    console.log(st);

    // if (cachedMap == null) {
    //   console.log("Initializing Map for Session");
    //   cachedMap = new mapboxgl.Map({
    //     container: "map",
    //     style: enhanced
    //       ? "mapbox://styles/antadam127/cl5ks9bcj002314rofs0vpzdq" /* Custom Clear */
    //       : "mapbox://styles/mapbox/light-v10" /* Mapbox Light */,
    //     // style: enhanced ? "mapbox://styles/antadam127/cl5ks9bcj002314rofs0vpzdq" /* Custom Clear */ : "mapbox://styles/mapbox/streets-v11" /* Mapbox Streets */,
    //     // style: enhanced ? "mapbox://styles/antadam127/cl5ks9bcj002314rofs0vpzdq" /* Custom Clear */ : "mapbox://styles/antadam127/cl5m6b2dd004q15pe5lcymeft" /* North Star */,
    //     // style: enhanced ? "mapbox://styles/antadam127/cl5ks9bcj002314rofs0vpzdq" /* Custom Clear */ : "mapbox://styles/antadam127/cl4yfem29005b15p9ltlrd9oy" /* Moonlight */,
    //     center: [-10, 45], // Atlantic Ocean Spin Starting Point
    //     zoom: 1.2,
    //     bounds: enhanced ? false : unenhancedBounds,
    //     projection: enhanced ? "globe" : "mercator",
    //     cooperativeGestures: true,
    //     attributionControl: false,
    //     logoPosition: "bottom-right",
    //     dragRotate: false,
    //     interactive: !enhanced,
    //   });
    //   sessionStorage.setItem("map", cachedMap);
    // } else console.log("Map Pulled From Session Cache");
    // const map = cachedMap;
    const map = new mapboxgl.Map({
      container: "map",
      style: enhanced
        ? "mapbox://styles/antadam127/cl5ks9bcj002314rofs0vpzdq" /* Custom Clear */
        : "mapbox://styles/mapbox/light-v10" /* Mapbox Light */,
      // style: enhanced ? "mapbox://styles/antadam127/cl5ks9bcj002314rofs0vpzdq" /* Custom Clear */ : "mapbox://styles/mapbox/streets-v11" /* Mapbox Streets */,
      // style: enhanced ? "mapbox://styles/antadam127/cl5ks9bcj002314rofs0vpzdq" /* Custom Clear */ : "mapbox://styles/antadam127/cl5m6b2dd004q15pe5lcymeft" /* North Star */,
      // style: enhanced ? "mapbox://styles/antadam127/cl5ks9bcj002314rofs0vpzdq" /* Custom Clear */ : "mapbox://styles/antadam127/cl4yfem29005b15p9ltlrd9oy" /* Moonlight */,
      center: [-10, 45], // Atlantic Ocean Spin Starting Point
      zoom: 1.2,
      bounds: enhanced ? false : unenhancedBounds,
      projection: enhanced ? "globe" : "mercator",
      cooperativeGestures: true,
      attributionControl: false,
      logoPosition: "bottom-right",
      dragRotate: false,
      interactive: !enhanced,
    });

    // console.log(map);

    console.log("next");
    console.log(Date.now() - st);

    // Disable touch rotation when mobile
    if (!enhanced) map.touchZoomRotate.disableRotation();

    // ADD MARKER(s)
    // const locations =
    const marker = new mapboxgl.Marker({
      color: "#3FB1CE",
      scale: 0.75,
      // rotationAlignment: "horizon",
    }).setLngLat(markerLocation);
    // .addTo(map);

    // SET UP ENHANCED MAP
    if (enhanced) {
      // SPIN THE GLOBE
      let oldLoc;
      const secondsPerRevolution = 240; // Default: 120
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;
      let userInteracting = false;
      let spinEnabled = true;
      function spinGlobe() {
        const zoom = map.getZoom();
        if (spinEnabled && !userInteracting && zoom == 1.2) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.getCenter();
          oldLoc = { lng: center.lng, lat: center.lat };
          center.lng -= distancePerSecond;
          map.easeTo({
            center,
            duration: 1000,
            easing: (n) => n,
          });
        }
      }
      map.on("moveend", () => {
        spinGlobe();
      });
      spinGlobe();

      if (moveonhover) {
        // FLY TO WHEN MOUSEOVER
        map.on("load", () => {
          console.log("load");
          console.log(Date.now() - st);

          map.on("mouseover", () => {
            map.flyTo({ center: markerLocation, zoom: 6 });
            // marker.addTo(map);
          });
          map.on("mouseout", () => {
            map.flyTo({ center: oldLoc, zoom: 1.2 });
            // marker.remove();
          });
        });
      }

      // SATELLITE AND LAYERS
      map.on("style.load", () => {
        console.log("style");
        console.log(Date.now() - st);

        map.setFog();
        // REVEAL LABELS (for use with custom "clear" style only)
        map.setLayoutProperty("admin-1-boundary", "visibility", "visible"); // State Boundaries
        map.setLayoutProperty("settlement-major-label", "visibility", "visible"); // Cities
        map.setLayoutProperty("state-label", "visibility", "visible"); // States

        // ADD SATELLITE
        const zoomLevel = 5.5; // Satellite Transition Zoom Level
        map.addSource("sat", {
          type: "raster",
          url: "mapbox://mapbox.satellite",
          tileSize: 256,
        });
        map.addLayer(
          {
            id: "satellite-userAdded",
            source: "sat",
            type: "raster",
            paint: {
              "raster-opacity": ["interpolate", ["linear"], ["zoom"], zoomLevel - 1.5, 1, zoomLevel, 0],
              "raster-saturation": ["interpolate", ["linear"], ["zoom"], 1.2, 0, zoomLevel - 1.5, -1],
              // "raster-saturation": 0, // 0: Regular Saturation | -1: Black & White
            },
          },
          null
        );
      });
    } else {
      // NOT ENHANCED
      map.on("click", () => {
        map.fitBounds(unenhancedBounds);
      });
      map.on("touchstart", () => {
        map.fitBounds(unenhancedBounds);
      });
    }
  });
}
