// DEFINE KEYBOARD
// document.addEventListener("keydown", (e) => {
//   // console.log(e.key);
//   // if (e.key == ' ') {
//   // }
// });

// map.on('load', () => {
//     map.on('mousedown', (e) => {
//         console.log(e);
//     });

//     map.on('mouseup', (e) => {
//         console.log(e);
//     });
// });

// function cameraTesting() {
//     const camera = map.getFreeCameraOptions();

//     const position = [138.72649, 35.33974];
//     const altitude = 3000;

//     camera.position = mapboxgl.MercatorCoordinate.fromLngLat(position, altitude);
//     camera.lookAtPoint([138.73036, 35.36197]);

//     map.setFreeCameraOptions(camera);
// }

// map.on('load', (e) => {
//     cameraTesting();
// });

// SPIN
if (config.spin.startSpinning || config.spin.enableToggle) {
  map.on("load", () => {
    let spinEnabled = config.spin.startSpinning;

    // The following values can be changed to control rotation speed:

    // At low zooms, complete a revolution every two minutes.
    const secondsPerRevolution = config.spin.secondsPerRevolution;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = config.spin.maxSpinZoom;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = config.spin.slowSpinZoom;

    let userInteracting = false;

    function spinGlobe() {
      const zoom = map.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          // Slow spinning at higher zooms
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    if (config.interactive) {
      // Pause spinning on interaction
      map.on("mousedown", () => {
        userInteracting = true;
      });

      // Restart spinning the globe when interaction is complete
      map.on("mouseup", () => {
        userInteracting = false;
        spinGlobe();
      });

      // These events account for cases where the mouse has moved
      // off the map, so 'mouseup' will not be fired.
      map.on("dragend", () => {
        userInteracting = false;
        spinGlobe();
      });
      map.on("pitchend", () => {
        userInteracting = false;
        spinGlobe();
      });
      map.on("rotateend", () => {
        userInteracting = false;
        spinGlobe();
      });
    }

    // When animation is complete, start spinning if there is no ongoing interaction
    map.on("moveend", () => {
      spinGlobe();
    });

    function toggleSpin(exp) {
      if (exp !== undefined) spinEnabled = exp;
      else spinEnabled = !spinEnabled;
      console.log(spinEnabled ? "Spinning" : "Stopped Spinning");
      if (spinEnabled) {
        spinGlobe();
      } else {
        map.stop(); // Immediately end ongoing animation
      }
    }

    // Keyboard Toggle
    if (config.spin.enableToggle || config.spin.enableTurbo) {
      document.addEventListener("keydown", (e) => {
        if (e.key == "Enter") toggleSpin();
      });
    }

    if (spinEnabled) toggleSpin(spinEnabled);
  });
}

// CORNER DESCRIPTION SET UP
if (config.showCorners && config.cornerDesc) {
  console.log("Showing Corner Descriptions");
  for (let i = 0; i < config.cornerDesc.length; i++) {
    const desc = config.cornerDesc[i];
    let content = desc.htmlContent;
    let contentIndex = false;

    // INDEX SPECIFIC CONTENT //
    if (!isNaN(content)) {
      contentIndex = content;
      if (contentIndex == 1000)
        content = `<div style='color:white;' > <div style='font-size:0.75rem; text-align:right'></div> <h2 style='margin-top:10px'>Building Heights</h2> <div style='width:220px; height:8px; background: linear-gradient(to right, ${
          colorScales[0][0]
        }, ${colorScales[0][1]});'></div><span>0m</span><span id='maxHeightLabel' style='position:absolute;padding:0 25px;right:0;'>${
          !isNaN(config.buildingOptions.heightCap) ? config.buildingOptions.heightCap : ''
        }m</span></div>`;
      if (contentIndex == 1001)
        content = `<h2>Colorization</h2>
      <form id="colorization">
      <input type="radio" id="height" name="height" value="height" checked>
      <label for="height">Height</label><br>
      <input type="radio" id="type" name="type" value="type">
      <label for="type">Type</label><br><br>
      </form>`;
    }
    // INDEX SPECIFIC CONTENT //

    // Create Corners With Content
    $("body").append(
      $(`
        <div class="corner-description c-d-b-${desc.corner}" area-expanded="false">
          <button id="cd${i}" class="corner-description-button">
            <svg width="12" height="12" viewbox="0 0 12 12" style="fill: #003755" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1V0H0v12h1V1" fill-rule="nonzero"></path>
            </svg>
          </button>
          <div class="corner-description-content">
            ${content}
          </div>
        </div>
      `)
    );

    // Determine What Action On Load
    if (config.actionOnLoad) {
      const offset = 80; // Offset time when exist multiple corners
      let delay = config.actionOnLoad === "close" ? 400 : 250; // Delay time for Open on load
      map.on("load", () => {
        // if (config.actionOnLoad === "close") { // To open first on load // Either Or **
        //   $(`#cd${i}`).click(); // Open imediately on load
        //   delay = 1200; // Delay time for Open on load
        // }
        // Set a delay
        setTimeout(() => {
          $(`#cd${i}`).click();
        }, delay + offset * i);
      });
    }

    // MORE INDEX SPECIFIC CODE //
    if (contentIndex == 1001) {
      $("#height").click(() => {
        console.log("aa");
        console.log($("#height").prop("checked"));
        if (!$(this).prop("checked")) {
          config.buildingOptions.color = "height";
          config.buildingOptions.showPopupOn = "click";
          console.log("a");
          add3DBuildings();
        }
        $("#type").prop("checked", false);
        $(this).prop("checked", true);
      });
      $("#type").click(() => {
        if (!$(this).prop("checked")) {
          config.buildingOptions.color = "type";
          config.buildingOptions.showPopupOn = "hover";
          add3DBuildings();
        }
        $("#height").prop("checked", false);
        $(this).prop("checked", true);
      });
    }
    // MORE INDEX SPECIFIC CODE //
  }

  // Set Up Corner Basic Click Functionality
  $(".corner-description-button").click(function () {
    $(this)
      .parent()
      .attr("area-expanded", $(this).parent().attr("area-expanded") == "true" ? "false" : "true");
  });
  if (config.actionOnLoad === "close") $(`.corner-description-button`).click(); // To open first immediately // Either Or **
}
