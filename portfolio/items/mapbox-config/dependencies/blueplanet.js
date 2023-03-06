function addBluePlanet() {
  let month = config.bluePlanet.startMonth;

  // Add Source or Sources
  if (
    config.bluePlanet.enableCyclingOnKeypress ||
    config.bluePlanet.autoCycling
  ) {
    for (let m = 1; m <= 12; m++) {
      addBluePlanetSource(m);
    }
  } else addBluePlanetSource(month);

  // Set Layer Func
  const maxZoom = 5;
  const fadeAmt = 0.5;
  function setLayer(month) {
    map.addLayer(
      {
        id: `blue-planet-${month % 2}-userAdded`,
        source: `blue-planet-${month}`,
        type: "raster",
        maxzoom: maxZoom,
        paint: {
          "raster-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            maxZoom - fadeAmt,
            1,
            maxZoom,
            0,
          ],
          "raster-opacity-transition": { duration: 2000 },
        },
      },
      null
    );
    console.log(`Blue Planet Layer - Month: ${month}`);
    // console.log(`blue-planet-${month % 2}-userAdded`);
  }

  // Add Click Cycling
  if (
    config.bluePlanet.enableCyclingOnKeypress ||
    config.bluePlanet.autoCycling
  ) {
    // Set Inital Background
    setLayer(month - 1 > 0 ? month - 1 : 12);
    let myInterval;
    // Cycle Function
    function cycle(dir) {
      month += dir;
      if (month > 12) month = 1;
      else if (month < 1) month = 12;
      map.removeLayer(`blue-planet-${month % 2}-userAdded`);
      setLayer(month);
    }
    // Setup Enter Press
    if (config.bluePlanet.enableCyclingOnKeypress) {
      document.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
          cycle(e.shiftKey ? -1 : 1);
        }
      });
    }
    // Define Auto Cycling
    if (config.bluePlanet.autoCycling) {
      //   map.on("sourcedata", (e) => {
      //     console.log(e.isSourceLoaded);
      //   });
      map.on("load", () => {
        myInterval = setInterval(() => {
          if (map.getZoom() < maxZoom) cycle(1);
        }, config.bluePlanet.autoCycling);
      });
      document.addEventListener("keydown", (e) => {
        if (e.key == "Backspace") {
          if (myInterval === false) {
            myInterval = setInterval(() => {
              cycle(1);
            }, config.bluePlanet.autoCycling);
            console.log("Cycling Resumed");
          } else {
            clearInterval(myInterval);
            myInterval = false;
            console.log("Cycling Paused");
          }
        }
      });
    }
  }

  // Set Initial Layer
  setLayer(month);
}

// Add Source
function addBluePlanetSource(month) {
  map.addSource(`blue-planet-${month}`, {
    type: "raster",
    url: bluePlanetURLs[month],
    // tileSize: 64, // High Res
    // tileSize: 256, // Lower Res
    tileSize:
      config.bluePlanet.resolution == "high"
        ? 64
        : config.bluePlanet.resolution == "med"
          ? 256
          : config.bluePlanet.resolution == "low"
            ? 512
            : false,
  });
}
