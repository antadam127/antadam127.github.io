function addMapillary() {
  // Add a new vector tile source with ID 'mapillary'.
  map.addSource("mapillary", {
    type: "vector",
    tiles: [`https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=${config.streetviewOptions.mapillaryAccessToken}`],
  });
  // Overview
  map.addLayer(
    {
      id: "mapillary-overview",
      source: "mapillary",
      "source-layer": "overview",
      type: "circle",
      minzoom: 0,
      maxzoom: 6,
      paint: {
        "circle-opacity": 0.6,
        "circle-radius": 2,
        "circle-color": "rgb(53, 175, 109)",
        // 'circle-color': [
        //     'case',
        //     ['==', ['get', 'is_pano'], true], 'rgb(255, 25, 45)',
        //     'rgb(255, 175, 109)'
        // ],
      },
    }
    // 'road-label' // Arrange our new layer beneath this layer
  );
  // Sequence
  map.addLayer(
    {
      id: "mapillary-sequence",
      source: "mapillary",
      "source-layer": "sequence",
      type: "line",
      minzoom: 6,
      maxzoom: 15, // 15
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-opacity": 0.6,
        "line-width": 2,
        "line-color": "rgb(153, 75, 109)",
        // 'line-color': [
        //     'case',
        //     ['==', ['get', 'is_pano'], true], 'rgb(255, 25, 45)',
        //     'rgb(53, 175, 109)'
        // ],
      },
    }
    // 'road-label' // Arrange our new layer beneath this layer
  );

  // Set up mouse events
  setupMouseHoverAndClick(
    "mapillary",
    "overview",
    "mapillary-overview",
    (e) => {
      console.log("overview");
      clickFunc(e);
    },
    (e) => {
      hoverFunc(e);
    },
    (e) => {
      leaveFunc();
    }
  );
  setupMouseHoverAndClick(
    "mapillary",
    "sequence",
    "mapillary-sequence",
    (e) => {
      console.log("sequence");
      clickFunc(e);
    },
    (e) => {
      hoverFunc(e);
    },
    (e) => {
      leaveFunc();
    }
  );

  function clickFunc(e) {
    const feat = returnFeature(e.features, false);
    // console.log(feat.properties);
    getImage(feat.properties.id);
  }

  // Popup setup
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    focusAfterOpen: false,
  });
  map.on("zoomstart", () => {
    popup.remove();
  });
  // const imgLoader = document.createElement('img');
  // imgLoader.id = 'imgLoader';
  // imgLoader.src = 'https://countryflagsapi.com/png/us';
  // imgLoader.onload = console.log(imgLoader.src);
  // $('body').append(imgLoader);

  function hoverFunc(e) {
    // console.log(e.features);
    const feat = returnFeature(e.features, true);
    // console.log(feat.properties)

    let image_id = feat.properties.id;
    if (feat.properties.image_id) image_id = feat.properties.image_id;

    // console.log(image_id)

    setHoverImage(image_id, e);
  }

  function leaveFunc() {
    popup.remove();
  }

  function returnFeature(features, dontPreferPano) {
    // Get Newest Pano
    let latestTime = 0;
    let isPreferred = false;
    let feature = features[0];
    for (const f of features) {
      if (f.properties.is_pano == (dontPreferPano == true ? false : true)) {
        if (isPreferred == false) {
          isPreferred = true;
          latestTime = f.properties.captured_at;
          feature = f;
        } else {
          if (latestTime < f.properties.captured_at) {
            latestTime = f.properties.captured_at;
            feature = f;
          }
        }
      } else {
        if (isPreferred == false) {
          if (latestTime < f.properties.captured_at) {
            latestTime = f.properties.captured_at;
            feature = f;
          }
        }
      }
    }
    return feature;
  }

  const imageList = [];
  const loading = document.createElement("img");
  loading.src = "https://www.wpfaster.org/wp-content/uploads/2013/06/loading-gif.gif";
  loading.width = 256;

  async function setHoverImage(id, e) {
    const coordinates = [e.lngLat.lng, e.lngLat.lat];
    popup.setLngLat(coordinates).addTo(map);
    // popup.setDOMContent(loading);

    await fetch(`https://graph.mapillary.com/${id}?access_token=${config.streetviewOptions.mapillaryAccessToken}&fields=thumb_256_url`)
      .then((response) => {
        return response.json(); // data into json
      })
      .then((data) => {
        // console.log(data);
        // const width = 256;
        // const innerHTML = `<img src="${data.thumb_256_url}" width="${width}" />`;

        imageList.push(data.thumb_256_url);
        const imgLoader = document.createElement("img");
        imgLoader.src = data.thumb_256_url;
        imgLoader.onload = () => {
          // console.log(imageList.length);
          // console.log(data.thumb_256_url);
          let count = 0;
          for (let i = imageList.length - 1; i >= 0; i--) {
            count++;
            if (data.thumb_256_url == imageList[i]) break;
          }
          console.log(count);

          if (data.thumb_256_url == imageList[imageList.length - 1]) {
            // console.log(imageList.length);
            popup.setDOMContent(imgLoader);
          } else {
            popup.setDOMContent(loading);
          }
        };
        // imgLoader.addEventListner('load', popup.setDOMContent(imgLoader);
        // imgLoader.onload = popup.setHTML(innerHTML).addTo(map);

        // popup.setHTML(innerHTML).addTo(map);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getImage(id) {
    await fetch(
      `https://graph.mapillary.com/${id}?access_token=${config.streetviewOptions.mapillaryAccessToken}&fields=camera_type,captured_at,compass_angle,computed_altitude,computed_compass_angle,computed_geometry,computed_rotation,exif_orientation,geometry,height,thumb_256_url,thumb_1024_url,thumb_2048_url,thumb_original_url,sequence,width,detections`
    )
      .then((response) => {
        return response.json(); // data into json
      })
      .then((data) => {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
