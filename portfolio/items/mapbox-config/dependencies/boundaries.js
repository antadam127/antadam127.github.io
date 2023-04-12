// Set up Colors
const redBlue = [
  "rgb(103, 0, 31)",
  "rgb( 178, 24, 43)",
  "rgb( 214, 96, 77)",
  "rgb( 244, 165, 130)",
  "rgb( 253, 219, 199)",
  "rgb( 209, 229, 240)",
  "rgb( 146, 197, 222)",
  "rgb( 67, 147, 195)",
  "rgb( 33, 102, 172)",
  "rgb( 5, 48, 97)",
];
const colorPallet = ["#bc2b66", "#3b80ea", "#53a83c", "#ee9235", "#d95436", "#6640b8", "#469ca4", "#efebce", "#323031"];
const colorPalletExtend = [
  "#c0392b",
  "#e74c3c",
  "#d35400",
  "#e67e22",
  "#f39c12",
  "#f1c40f",
  "#1abc9c",
  "#16a085",
  "#2ecc71",
  "#27ae60",
  "#3498db",
  "#2980b9",
  "#9b59b6",
  "#8e44ad",
];
const timeZonePallet = ["#ee9b00", "#ae2012", "#e9d8a6", "#a3a6ce"];
const colorScales = [
  ["#eff3ff", "#08519c"],
  ["#d7e1ee", "#991f17"],
  ["#fff", "#000"],
  ["#F5FFF4", "#646880"],
  [redBlue[9], redBlue[0]],
];
const highlightRed = "#e74c3c";
const baseOppacityFadeAmt = 0.25;

// Add Time Zone Data
function addTimeZones() {
  map.addSource("timezones", {
    type: "vector",
    url: config.tiles.timeZones,
  });
  map.addLayer({
    id: "timezones-userAdded",
    source: "timezones",
    "source-layer": "ne_10m_time_zones-1s9jht",
    type: "line",
    paint: {
      "line-color": "#7F3121",
      "line-width": ["interpolate", ["linear"], ["zoom"], 2, 0.5, 7, 5],
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 0, 0.75, 6, 0.25],
    },
  });
  if (config.timeZones.timeZoneFills) {
    const off = Math.floor(Math.random() * 4);
    map.addLayer(
      {
        id: "timezones-fill-userAdded",
        source: "timezones",
        "source-layer": "ne_10m_time_zones-1s9jht",
        type: "fill",
        paint: {
          "fill-opacity": 0.25,
          "fill-color": {
            property: "map_color8",
            stops: [
              [1, timeZonePallet[(0 + off) % 4]],
              [2, timeZonePallet[(1 + off) % 4]],
              [3, timeZonePallet[(2 + off) % 4]],
              [4, timeZonePallet[(3 + off) % 4]],
              [5, timeZonePallet[(0 + off) % 4]],
              [6, timeZonePallet[(1 + off) % 4]],
              [7, timeZonePallet[(2 + off) % 4]],
              [8, timeZonePallet[(3 + off) % 4]],
            ],
          },
        },
      },
      "timezones-userAdded"
    );
  }
}

//   USEFUL PROPERTIES ADMIN0
// Code - ADM0_A3
//
// Name - ADMIN
// Long Name - FORMAL_EN [BLANKS]
// Shorter Name - BRK_NAME
// Abbreviation - ABBREV
// Names Sortable - NAME_SORT
//
// Continent - CONTINENT
// Subregion in Continent - SUBREGION
//
// Economy - ECONOMY
// GDP - GDP_MD | GDP_YEAR
// Income - INCOME_GRP
//
// Population - POP_EST | POP_YEAR
// Population Rank - POP_RANK
//
// Wikidata - WIKIDATAID
//
//
// Color Values
// MAPCOLOR7
// MAPCOLOR8
// MAPCOLOR9
// MAPCOLOR13
//
// Label Values
// LABEL_X
// LABEL_Y
// Add countries
function addCountryData() {
  map.addSource("countries", {
    type: "vector",
    url: config.tiles.countries,
  });

  // Add Country Fills
  const off = Math.floor(Math.random() * 7);
  const colorScaleIndex = 0;
  const ranges = {
    colorScale: {
      light: colorScales[colorScaleIndex][0],
      dark: colorScales[colorScaleIndex][1],
    },
    population: {
      tag: "POP_EST",
      interpolation: ["linear"],
      min: 0,
      max: 150000000,
      extrudeInterpolation: ["exponential", 0.99999999],
      extrudeMin: 0,
      extrudeMax: 2000000000,
      extrudeMaxHeight: 1200000,
    },
    GDP: {
      tag: "GDP_MD",
      interpolation: ["exponential", 0.999999],
      min: 0,
      max: 21000000,
      extrudeInterpolation: ["exponential", 0.9999999],
      extrudeMin: 0,
      extrudeMax: 21000000,
      extrudeMaxHeight: 3600000,
    },
    economy: {
      tag: "ECONOMY",
      interpolation: ["linear"],
      min: 1,
      max: 7,
      extrudeInterpolation: ["linear"],
      extrudeMin: 1,
      extrudeMax: 7,
      extrudeMaxHeight: 1000000,
      reverseScale: true,
      matchSet: [
        "match",
        ["get", "ECONOMY"],
        "1. Developed region: G7",
        1,
        "2. Developed region: nonG7",
        2,
        "3. Emerging region: BRIC",
        3,
        "4. Emerging region: MIKT",
        4,
        "5. Emerging region: G20",
        5,
        "6. Developing region",
        6,
        "7. Least developed region",
        7,
        0,
      ],
    },
    income: {
      tag: "INCOME_GRP",
      interpolation: ["linear"],
      min: 1,
      max: 5,
      extrudeInterpolation: ["linear"],
      extrudeMin: 1,
      extrudeMax: 5,
      extrudeMaxHeight: 1000000,
      reverseScale: true,
      matchSet: [
        "match",
        ["get", "INCOME_GRP"],
        "1. High income: OECD",
        1,
        "2. High income: nonOECD",
        2,
        "3. Upper middle income",
        3,
        "4. Lower middle income",
        4,
        "5. Low income",
        5,
        5,
      ],
    },
  };

  const fillColor =
    config.countries.countryColorization == "color7"
      ? [
        "case",
        ["==", ["get", "MAPCOLOR7"], 1],
        colorPallet[(0 + off) % 7],
        ["==", ["get", "MAPCOLOR7"], 2],
        colorPallet[(1 + off) % 7],
        ["==", ["get", "MAPCOLOR7"], 3],
        colorPallet[(2 + off) % 7],
        ["==", ["get", "MAPCOLOR7"], 4],
        colorPallet[(3 + off) % 7],
        ["==", ["get", "MAPCOLOR7"], 5],
        colorPallet[(4 + off) % 7],
        ["==", ["get", "MAPCOLOR7"], 6],
        colorPallet[(5 + off) % 7],
        ["==", ["get", "MAPCOLOR7"], 7],
        colorPallet[(6 + off) % 7],
        "#000",
      ]
      : config.countries.countryColorization
        ? [
          "interpolate",
          ranges[config.countries.countryColorization].interpolation,
          ranges[config.countries.countryColorization].matchSet
            ? ranges[config.countries.countryColorization].matchSet
            : ["get", ranges[config.countries.countryColorization].tag],
          ranges[config.countries.countryColorization].min,
          ranges[config.countries.countryColorization].reverseScale ? ranges.colorScale.dark : ranges.colorScale.light,
          ranges[config.countries.countryColorization].max,
          ranges[config.countries.countryColorization].reverseScale ? ranges.colorScale.light : ranges.colorScale.dark,
        ]
        : config.countries.highlightOnHover
          ? ["case", ["boolean", ["feature-state", "hover"], false], "rgba(0,0,0,0.2)", "rgba(0,0,0,0)"]
          : "rgba(0,0,0,0)";

  map.addLayer({
    id: "country-fills-userAdded",
    source: "countries",
    "source-layer": "ne_10m_admin_0_countries-0a88vy",
    type: "fill",
    paint: {
      // 'fill-outline-color': '#333',
      "fill-color": fillColor,
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        config.countries.countryOppacityZoomLevel ? config.countries.countryOppacityZoomLevel : 0,
        0,
        (config.countries.countryOppacityZoomLevel ? config.countries.countryOppacityZoomLevel : 0) + baseOppacityFadeAmt,
        config.countries.highlightOnHover && config.countries.countryColorization ? ["case", ["boolean", ["feature-state", "hover"], false], 1.2, 1] : 1,
      ],
    },
  });

  // Add Borders
  if (config.countries.drawBoarders && !config.countries.countryExtrude) {
    map.addLayer({
      id: "country-outlines-userAdded",
      source: "countries",
      "source-layer": "ne_10m_admin_0_countries-0a88vy",
      type: "line",
      paint: {
        "line-color": config.countries.drawBoarders == "white" ? "#fff" : "#333",
        "line-opacity": 1,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4, 1, 8, 4],
      },
    });
  }

  // Add Minor Islands
  if (config.countries.drawBoarders || config.countries.filter) {
    map.addSource("minor-islands", {
      type: "vector",
      url: "mapbox://antadam127.85e842sp",
    });
    map.addLayer({
      id: "minor-islands-fills-userAdded",
      source: "minor-islands",
      "source-layer": "ne_10m_minor_islands-cnfa9z",
      type: "fill",
      paint: {
        "fill-color":
          config.countries.filter && config.countries.filterBkgCol ? config.countries.filterBkgCol : config.countries.drawBoarders == "white" ? "#fff" : "#333",
      },
    });
    if (config.countries.filter && config.countries.filterBkgCol) {
      map.addLayer({
        id: "minor-islands-borders-userAdded",
        source: "minor-islands",
        "source-layer": "ne_10m_minor_islands-cnfa9z",
        type: "line",
        paint: {
          "line-color": config.countries.filterBkgCol,
          "line-width": 4,
        },
      });
    }
  }

  // SET FILTER
  if (config.countries.filter && config.countries.filterBkgCol) {
    if (config.countries.filter.length > 0) {
      // Add Water Blanks Source
      map.addSource("country-water-filter-blanks", {
        type: "vector",
        url: "mapbox://antadam127.2llii2o0",
      });
      // Add Water Layer
      map.addLayer({
        id: "country-water-filter-blanks-userAdded",
        source: "country-water-filter-blanks",
        "source-layer": "ne_10m_ocean-72mexl",
        type: "fill",
        paint: {
          "fill-color": config.countries.filterBkgCol,
        },
      });
      // Add Countries Layer
      map.addLayer({
        id: "country-filter-blanks-userAdded",
        source: "countries",
        "source-layer": "ne_10m_admin_0_countries-0a88vy",
        type: "fill",
        paint: {
          "fill-color": config.countries.filterBkgCol,
        },
      });
      // Add Country Borders
      map.addLayer({
        id: "country-filter-blanks-borders-userAdded",
        source: "countries",
        "source-layer": "ne_10m_admin_0_countries-0a88vy",
        type: "line",
        paint: {
          "line-color": config.countries.filterBkgCol,
          "line-width": 1.5,
        },
      });

      // Set Filter
      const filt = ["all"];
      for (const code of config.countries.filter) {
        filt.push(["!=", ["get", "ADM0_A3"], code]);
      }
      map.setFilter("country-filter-blanks-userAdded", filt);
      map.setFilter("country-filter-blanks-borders-userAdded", filt);
    }
  }

  // Country Fill Extrusion
  if (config.countries.countryExtrude) {
    if (config.countries.countryColorization) {
      setLight("viewport", "#fff", 0.5); // Add light for extrusions
      map.addLayer({
        id: "country-extrusions-userAdded",
        source: "countries",
        "source-layer": "ne_10m_admin_0_countries-0a88vy",
        type: "fill-extrusion",
        paint: {
          "fill-extrusion-height": isNaN(config.countries.countryExtrude)
            ? [
              "interpolate",
              ranges[config.countries.countryExtrude].extrudeInterpolation,
              ranges[config.countries.countryExtrude].matchSet
                ? ranges[config.countries.countryExtrude].matchSet
                : ["get", ranges[config.countries.countryExtrude].tag],
              ranges[config.countries.countryExtrude].extrudeMin,
              ranges[config.countries.countryExtrude].reverseScale ? ranges[config.countries.countryExtrude].extrudeMaxHeight : 0,
              ranges[config.countries.countryExtrude].extrudeMax,
              ranges[config.countries.countryExtrude].reverseScale ? 0 : ranges[config.countries.countryExtrude].extrudeMaxHeight,
            ]
            : config.countries.countryExtrude,
          "fill-extrusion-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            config.countries.countryOppacityZoomLevel,
            0,
            config.countries.countryOppacityZoomLevel + baseOppacityFadeAmt,
            config.countries.countryExtrudeOppacity,
          ],
          // 'fill-extrusion-color': fillColor,
          "fill-extrusion-color":
            config.countries.highlightOnHover && config.countries.countryColorization
              ? ["case", ["boolean", ["feature-state", "hover"], false], highlightRed, fillColor]
              : fillColor,
        },
      });
    } else console.log("Country Colorization Required for Extrusion");
  }

  // Set up EXSTRUSION Filter
  if (config.countries.filter) {
    if (config.countries.filter.length > 0) {
      const filt = ["in", ["get", "ADM0_A3"], ["literal", config.countries.filter]];
      map.setFilter("country-fills-userAdded", filt);
      if (config.countries.countryExtrude) map.setFilter("country-extrusions-userAdded", filt);
      if (config.countries.drawBoarders && !config.countries.countryExtrude) map.setFilter("country-outlines-userAdded", filt);
    }
  }

  // Define popup
  const countryPopup = new mapboxgl.Popup({
    closeButton: false,
    focusAfterOpen: false,
    closeOnClick: config.countries.showPopupOn === "hover" ? false : true,
  });
  map.on("zoomstart", () => {
    countryPopup.remove();
  });

  function returnPopupHTML(feature) {
    const imgWid = 180;
    const props = feature.properties;
    let popupLabels = "";
    // console.log(props);
    const align = "center"; // 'center' || 'left'
    if (config.countries.countryColorization || config.countries.popupInfo) {
      const labl = config.countries.popupInfo ? config.countries.popupInfo : config.countries.countryColorization;
      popupLabels = `<div style="font-family: 'Oswald',sans-serif; text-align:${align};">${labl}:  ${labl == "population" ? "" : "$"}${props[
        ranges[labl].tag
      ].toLocaleString("en-US")}</div>`;
    }
    if (config.countries.countryExtrude && !config.countries.popupInfo)
      if (isNaN(config.countries.countryExtrude) && config.countries.countryColorization != config.countries.countryExtrude)
        popupLabels =
          popupLabels +
          `<div style="font-family: 'Oswald',sans-serif; text-align:${align};">${config.countries.countryExtrude}:  ${config.countries.countryExtrude == "population" ? "" : "$"
          }${props[ranges[config.countries.countryExtrude].tag].toLocaleString("en-US")} <small>(extrusion)</small></div>`;

    let countryNameHTML = "";
    if (true) countryNameHTML = `<div style="font-family: 'Oswald',sans-serif; font-size:larger; text-align:center;">${props.ADMIN}</div>`;

    // return `<img onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png'" src="https://countryflagsapi.com/png/${props.ADM0_A3}" alt="${props.ABBREV}" width="${imgWid}"/>${countryNameHTML}${popupLabels}`;
    // return `<img onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png'" src="https://flagcdn.com/h120/${props.ISO_A2_EH.toLowerCase()}.png" alt="${props.ABBREV}" width="${imgWid}"/>${countryNameHTML}${popupLabels}`;
    // return `<img id="flagImg" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png" alt="${props.ABBREV}" width="${imgWid}" onload="(function() { const flagUrl = 'https://flagcdn.com/h120/${props.ISO_A2_EH.toLowerCase()}.png'; const img = new Image(); img.onload = () => { document.getElementById('flagImg').src = img.src; }; img.onerror = () => {}; img.src = flagUrl; })()"/>${countryNameHTML}${popupLabels}`;
    // return `<img id="flagImg-${props.ISO_A2_EH}" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png" alt="${props.ABBREV}" width="${imgWid}" onload="(function() { const flagUrl = 'https://flagcdn.com/h120/${props.ISO_A2_EH.toLowerCase()}.png'; const img = new Image(); img.onload = () => { if (document.getElementById('flagImg-${props.ISO_A2_EH}')) { document.getElementById('flagImg-${props.ISO_A2_EH}').src = img.src; } }; img.onerror = () => {}; img.src = flagUrl; })()"/>${countryNameHTML}${popupLabels}`;
    return `<div class="fi fi-${props.ISO_A2_EH.toLowerCase()}" style="width: ${imgWid}px; height: ${imgWid * (3 / 4)}px; margin-left: 3px; margin-right: 3px; margin-bottom: 3px;" ></div>${countryNameHTML}${popupLabels}`;
    // return `<h1>${feature.properties.ADMIN}</h1>`;
  }
  // Set up mouse
  if (config.countries.highlightOnHover || config.countries.showPopupOn || config.countries.zoomOnClick)
    setupMouseHoverAndClick(
      "countries",
      "ne_10m_admin_0_countries-0a88vy",
      config.countries.countryExtrude ? "country-extrusions-userAdded" : "country-fills-userAdded",
      (e) => {
        // Click
        const feature = e.features[0];
        // console.log(feature.properties);
        console.log(feature.properties.ADM0_A3);

        if (config.countries.showPopupOn === "click") {
          countryPopup.setLngLat([feature.properties.LABEL_X, feature.properties.LABEL_Y]).setHTML(returnPopupHTML(feature)).addTo(map);
        }
        if (config.countries.zoomOnClick) {
          map.flyTo({
            center: [feature.properties.LABEL_X, feature.properties.LABEL_Y],
            // zoom: feature.properties.MAX_LABEL-feature.properties.MIN_LABEL,
            zoom: feature.properties.MIN_LABEL,
            pitch: 0,
            bearing: 0,
          });
        }
      },
      (e) => {
        // Hover
        if (config.countries.showPopupOn === "hover") {
          const feature = e.features[0];
          countryPopup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(returnPopupHTML(feature)).addTo(map);
        }
      },
      (e) => {
        // Leave
        if (config.countries.showPopupOn === "hover") countryPopup.remove();
      }
    );
}

//   USEFUL PROPERTIES ADMIN1
// Code - adm1_code
// Country Code - adm0_a3
// Country Name - admin
//
// Name - name [BLANKS] - Most Reliable
// Longer Name - gn_name [BLANKS]
// Full Name & Country - woe_label [BLANKS]
// Type of Region (State/Province/Department) - type_en [BLANKS]
// Region within country - region [BLANKS]
//
// Wikidata - wikidataid
// wikipedia - wikipedia [BLANKS]
//
// Location Values:
// latitude
// longitude
//
// Zoom Levels:
// datarank
// labelrank
// max_label
// min_label
// min_zoom
// scalerank
// Add States and Provinces
function addAdminOneData() {
  map.addSource("admin-one", {
    type: "vector",
    url: config.tiles.adminOne,
  });

  // Add Admin One Fills
  const off = Math.floor(Math.random() * 9);
  const fillColor = config.adminOne.highlightOnHover
    ? ["case", ["boolean", ["feature-state", "hover"], false], "rgba(0,0,0,0.2)", "rgba(0,0,0,0)"]
    : "rgba(0,0,0,0)";

  map.addLayer({
    id: "admin-one-fills-userAdded",
    source: "admin-one",
    "source-layer": "ne_10m_admin_1_states_provinc-011wwf",
    type: "fill",
    paint: {
      // 'fill-opacity': 1,
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        config.adminOne.adminOneOppacityZoomLevel,
        0,
        config.adminOne.adminOneOppacityZoomLevel + baseOppacityFadeAmt,
        config.adminOne.highlightOnHover ? ["case", ["boolean", ["feature-state", "hover"], false], 1.2, 1] : 1,
      ],
      // 'fill-color': fillColor,

      "fill-color": config.adminOne.adminOneColorization
        ? ["to-color", ["at", ["%", ["+", off, ["get", "ne_id"]], 13], ["literal", colorPalletExtend]]]
        : fillColor,
      "fill-outline-color": config.adminOne.drawBoarders ? "#333" : "rgba(0,0,0,0)",
    },
  });

  // Admin One Fill Extrusion
  if (config.adminOne.adminOneExtrude) {
    setLight("viewport", "#fff", 0.5); // Add light for extrusions
    map.addLayer({
      id: "adminOne-extrusions-userAdded",
      source: "admin-one",
      "source-layer": "ne_10m_admin_1_states_provinc-011wwf",
      type: "fill-extrusion",
      paint: {
        "fill-extrusion-height":
          config.adminOne.adminOneExtrude === true
            ? ["interpolate", ["linear"], ["%", ["+", Math.floor(Math.random() * 100), ["get", "woe_id"]], 100], 0, 0, 100, 650000]
            : config.adminOne.adminOneExtrude,
        "fill-extrusion-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          config.adminOne.adminOneOppacityZoomLevel,
          0,
          config.adminOne.adminOneOppacityZoomLevel + baseOppacityFadeAmt,
          config.adminOne.adminOneExtrudeOppacity,
        ],
        // 'fill-extrusion-color': fillColor,
        // 'fill-extrusion-color': config.adminOne.adminOneColorization ? ['to-color', ['at', ['%', ['+', off, ['get', 'ne_id']], 13], ['literal', colorPalletExtend]]] : fillColor,
        "fill-extrusion-color":
          config.adminOne.highlightOnHover && config.adminOne.adminOneColorization
            ? [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              highlightRed,
              ["to-color", ["at", ["%", ["+", off, ["get", "ne_id"]], 13], ["literal", colorPalletExtend]]],
            ]
            : config.adminOne.adminOneColorization
              ? ["to-color", ["at", ["%", ["+", off, ["get", "ne_id"]], 13], ["literal", colorPalletExtend]]]
              : fillColor,
      },
    });
  }

  // Set up Mouse
  if (config.adminOne.highlightOnHover || config.adminOne.zoomOnClick)
    setupMouseHoverAndClick(
      "admin-one",
      "ne_10m_admin_1_states_provinc-011wwf",
      config.adminOne.adminOneExtrude ? "adminOne-extrusions-userAdded" : "admin-one-fills-userAdded",
      (e) => {
        // Click
        const feature = e.features[0];
        // console.log(feature.properties);
        console.log(feature.properties);
        if (config.adminOne.zoomOnClick) {
          map.flyTo({
            center: [feature.properties.longitude, feature.properties.latitude],
            zoom: (feature.properties.max_label + feature.properties.min_label) / 2,
            pitch: 0,
            bearing: 0,
          });
        }
      },
      (e) => {
        // Hover
      },
      (e) => {
        // Leave
      }
    );

  // Set up Filter
  if (config.adminOne.countryFilter) {
    if (config.adminOne.countryFilter.length > 0) {
      let filt = ["in", ["get", "adm0_a3"], ["literal", config.adminOne.countryFilter]];
      if (config.adminOne.countryFilter[0] === "exclude") {
        config.adminOne.countryFilter.splice(0, 1);
        filt = ["!", ["in", ["get", "adm0_a3"], ["literal", config.adminOne.countryFilter]]];
      }
      map.setFilter("admin-one-fills-userAdded", filt);
      if (config.adminOne.adminOneExtrude) map.setFilter("adminOne-extrusions-userAdded", filt);
    }
  }
}

//   USEFUL PROPERTIES USA COUNTIES
// NAME
// NAME_ALT (Name + 'County')
// REGION (State)
// WIKIDATAID
// latitude
// longitude
// Add USA Counties
function addUSACounties() {
  map.addSource("usa-counties", {
    type: "vector",
    url: config.tiles.usaCounties,
  });

  const off = Math.floor(Math.random() * 13);
  const fillColor = config.usaCounties.highlightOnHover
    ? ["case", ["boolean", ["feature-state", "hover"], false], "rgba(0,0,0,0.2)", "rgba(0,0,0,0)"]
    : "rgba(0,0,0,0)";
  const minZoomLevel = config.usaCounties.fadeInZoomLevel;

  map.addLayer({
    id: "usa-counties-fills-userAdded",
    source: "usa-counties",
    "source-layer": "ne_10m_admin_2_counties-c14uuq",
    type: "fill",
    minzoom: minZoomLevel,
    paint: {
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        minZoomLevel,
        0,
        minZoomLevel + baseOppacityFadeAmt,
        config.usaCounties.highlightOnHover
          ? ["case", ["boolean", ["feature-state", "hover"], false], 1.2, 1]
          : config.usaCounties.usaCountiesColorization
            ? 1
            : 0.8,
      ],
      "fill-outline-color": "#333333",
      "fill-color": config.usaCounties.usaCountiesColorization
        ? ["to-color", ["at", ["%", ["+", off, ["get", "NE_ID"]], 13], ["literal", colorPalletExtend]]]
        : fillColor,
    },
  });

  // USA Counties Fill Extrusion
  if (config.usaCounties.usaCountiesExtrude) {
    setLight("viewport", "#fff", 0.5); // Add light for extrusions
    map.addLayer({
      id: "usa-counties-extrusions-userAdded",
      source: "usa-counties",
      "source-layer": "ne_10m_admin_2_counties-c14uuq",
      type: "fill-extrusion",
      paint: {
        "fill-extrusion-height":
          config.usaCounties.usaCountiesExtrude === true
            ? ["interpolate", ["linear"], ["%", ["+", Math.floor(Math.random() * 100), ["get", "NE_ID"]], 100], 0, 0, 100, 250000]
            : config.usaCounties.usaCountiesExtrude,
        "fill-extrusion-opacity": ["interpolate", ["linear"], ["zoom"], 2, 0, 2 + baseOppacityFadeAmt, 1],
        "fill-extrusion-color":
          config.usaCounties.highlightOnHover && config.usaCounties.usaCountiesColorization
            ? [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              highlightRed,
              ["to-color", ["at", ["%", ["+", off, ["get", "NE_ID"]], 13], ["literal", colorPalletExtend]]],
            ]
            : config.usaCounties.usaCountiesColorization
              ? ["to-color", ["at", ["%", ["+", off, ["get", "NE_ID"]], 13], ["literal", colorPalletExtend]]]
              : fillColor,
      },
    });
  }

  if (config.usaCounties.highlightOnHover)
    setupMouseHoverAndClick(
      "usa-counties",
      "ne_10m_admin_2_counties-c14uuq",
      config.usaCounties.usaCountiesExtrude ? "usa-counties-extrusions-userAdded" : "usa-counties-fills-userAdded",
      (e) => {
        // Click
        console.log(e.features[0].properties);
        // console.log(e.features[0].properties.NAME_ALT);
      },
      (e) => {
        // Hover
      },
      (e) => {
        // Leave
      }
    );
}

// Add Urban Areas
function addUrbanAreas() {
  map.addSource("urban-areas", {
    type: "vector",
    url: config.tiles.urbanAreas,
  });

  const highlightOpacity = config.urbanAreas.highlightOnHover
    ? ["case", ["boolean", ["feature-state", "hover"], false], config.urbanAreas.highlightOnHover == "clear" ? 0 : 1.4, 1]
    : 1;

  map.addLayer({
    id: "urban-areas-userAdded",
    source: "urban-areas",
    "source-layer": "ne_10m_urban_areas-5uo8ca",
    type: "fill",
    paint: {
      "fill-opacity": ["interpolate", ["linear"], ["zoom"], 2, 0, 3, highlightOpacity],
      "fill-color": config.urbanAreas.fillColor == "clear" ? "rgba(0,0,0,0)" : config.urbanAreas.fillColor,
    },
  });

  // Add Borders
  if (config.countries.drawBoarders) {
    map.addLayer({
      id: "urban-areas-outlines-userAdded",
      source: "urban-areas",
      "source-layer": "ne_10m_urban_areas-5uo8ca",
      type: "line",
      paint: {
        "line-color": config.urbanAreas.drawBoarders == "white" ? "#fff" : "#333",
        "line-opacity": 1,
        "line-width": ["interpolate", ["linear"], ["zoom"], 4, 1, 8, 2],
      },
    });
  }

  // Set up Mouse
  if (config.adminOne.highlightOnHover)
    setupMouseHoverAndClick(
      "urban-areas",
      "ne_10m_urban_areas-5uo8ca",
      "urban-areas-userAdded",
      (e) => {
        // Click
        if (config.urbanAreas.zoomOnClick) {
          const feature = e.features[0];
          const coords = [];
          for (const c of feature.geometry.coordinates) {
            if (isFinite(c[0][0])) coords.push(...c);
            else {
              for (const cc of c) {
                if (isFinite(cc[0][0])) coords.push(...cc);
              }
            }
          }
          const lons = coords.map((c) => c[0]);
          const lats = coords.map((c) => c[1]);
          const maxLon = Math.max.apply(Math, lons);
          const minLon = Math.min.apply(Math, lons);
          const maxLat = Math.max.apply(Math, lats);
          const minLat = Math.min.apply(Math, lats);
          map.fitBounds(
            [
              [minLon, minLat], // southwestern corner of the bounds
              [maxLon, maxLat], // northeastern corner of the bounds
            ],
            {
              padding: 30,
            }
          );
        }
      },
      (e) => {
        // Hover
      },
      (e) => {
        // Leave
      }
    );
}

// Add Populated Places
function addPopulatedPlaces() {
  map.addSource("populated-places", {
    type: "vector",
    url: config.tiles.populatedPlaces,
  });

  const fillColor = config.populatedPlaces.highlightOnHover
    ? ["case", ["boolean", ["feature-state", "hover"], false], "#333", config.populatedPlaces.color]
    : config.populatedPlaces.color;

  map.addLayer({
    id: "populated-places-userAdded",
    source: "populated-places",
    "source-layer": "ne_10m_populated_places-bx0zm1",
    type: "circle",
    paint: {
      "circle-opacity": 1,
      "circle-radius": 3,
      "circle-color": fillColor,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#333",
      "circle-pitch-alignment": "map",
    },
  });

  // Set up Mouse
  if (config.adminOne.highlightOnHover)
    setupMouseHoverAndClick(
      "populated-places",
      "ne_10m_populated_places-bx0zm1",
      "populated-places-userAdded",
      (e) => {
        // Click
        const feature = e.features[0];
        console.log(feature.properties.NAME);
      },
      (e) => {
        // Hover
      },
      (e) => {
        // Leave
      }
    );
}
