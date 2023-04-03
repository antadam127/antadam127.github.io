const NBA_DATA = "nba_data.geojson";
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw";
let clicked = false;

// Fetch NBA data
async function fetchNBAData() {
  console.log("Fetching NBA data...");
  const response = await fetch(NBA_DATA);
  const data = await response.json();
  console.log("NBA data fetched successfully.");
  return data;
}

// Create arcs for players' paths
function createArcs(players) {
  console.log("Creating arcs for players' paths...");
  const arcs = players.features
    .map((player) => {
      const coordinates = player.geometry.coordinates;
      const birth_coords = coordinates[0];
      const college_coords = coordinates[1];
      const team_coords = coordinates[2];
      return [
        {
          from: birth_coords,
          to: college_coords,
          properties: player.properties,
          direction: "college",
        },
        {
          from: college_coords,
          to: team_coords,
          properties: player.properties,
          direction: "team",
        },
      ];
    })
    .flat();
  console.log("Arcs created.");
  return arcs;
}

// Create college data
function createCollegeData(players) {
  console.log("Creating college data...");
  const collegeData = {};
  players.features.forEach((player) => {
    const college = player.properties.college;
    const college_coords = player.geometry.coordinates[1];

    if (!collegeData[college]) {
      collegeCols[college] = getRandomColor();
      collegeData[college] = {
        coordinates: college_coords,
        count: 0,
        // color: getColor(college),
        color: collegeCols[college],
      };
    }
    collegeData[college].count++;
  });
  console.log("College data created.");
  return Object.keys(collegeData).map((key) => ({
    name: key,
    coordinates: collegeData[key].coordinates,
    count: collegeData[key].count,
    color: collegeData[key].color,
  }));
}

// Create team data
function createTeamData(players) {
  console.log("Creating team data...");
  const teamData = {};
  players.features.forEach((player) => {
    const team = player.properties.team_abbreviation;
    const team_coords = player.geometry.coordinates[2];

    if (!teamData[team]) {
      teamData[team] = {
        coordinates: team_coords,
        count: 0,
        // color: [128, 128, 128],
        // color: getRandomColor(),
        // color: getTeam(team)[3],
      };
    }
    teamData[team].count++;
  });
  console.log("Team data created.");
  return Object.keys(teamData).map((key) => ({
    name: key,
    coordinates: teamData[key].coordinates,
    count: teamData[key].count,
    color: teamData[key].color,
  }));
}

// Create hometown data
function createHomeData(players) {
  console.log("Creating hometown data...");
  const homeData = {};
  players.features.forEach((player) => {
    const home = player.properties.birth_city + ", " + player.properties.birth_state;
    const home_coords = player.geometry.coordinates[0];

    if (!homeData[home]) {
      homeData[home] = {
        coordinates: home_coords,
        count: 0,
        color: [128, 128, 128],
        // color: getRandomColor(),
      };
    }
    homeData[home].count++;
  });
  console.log("Hometown data created.");
  return Object.keys(homeData).map((key) => ({
    name: key,
    coordinates: homeData[key].coordinates,
    count: homeData[key].count,
    color: homeData[key].color,
  }));
}

let currentNBAid = false;
function updateImage(nbaId) {
  let done = !currentNBAid ? "now" : false;
  currentNBAid = nbaId;
  const img = document.getElementById("player-image");
  if (!nbaId) {
    img.style.display = "none";
    return;
  } else img.style.display = "block";
  if (false) return; // To Stop Images From Being Loaded
  const defaultImg = "https://ignite.gleague.nba.com/images/silhouette-player.png";
  const newURL = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${nbaId}.png`;
  if (img.src === newURL) return;

  if (currentNBAid === nbaId || done === "now") {
    setTimeout(
      () => {
        if ((!done || done === "now") && currentNBAid === nbaId) {
          img.src = defaultImg;
          img.classList.add("darken"); // Darken
        }
      },
      done === "now" ? 0 : 500
    );
  }
  //   img.src = defaultImg;
  //   img.classList.add("darken"); // Darken
  const newImage = new Image();
  newImage.onload = function () {
    if (currentNBAid === nbaId) {
      img.src = newURL;
      img.classList.remove("darken"); // Restore
      done = true;
    }
  };
  newImage.onerror = function () {
    if (currentNBAid === nbaId) {
      img.classList.remove("darken"); // Restore
      img.src = defaultImg;
      done = true;
    }
  };
  newImage.src = newURL;
}
updateImage(false);
console.log("Updating image...");

// Main function
fetchNBAData().then((data) => {
  console.log("Processing data...");
  const fullData = data;

  function changeArcData(active, start, end) {
    const features = fullData.features;
    let newArray;
    // if (start === false) newArray = features.filter((feature) => parseInt(feature.properties.season.slice(-2)) === end);
    // else if (start === true) newArray = features;
    // else newArray = features.filter((feature) => parseInt(feature.properties.season.slice(-2)) <= end && parseInt(feature.properties.season.slice(-2)) >= end);

    newArray = features.filter(
      (feature) =>
        (start === 1960 && end === 2020 ? true : parseInt(feature.properties.draft_year) >= start && parseInt(feature.properties.draft_year) <= end) && (active ? feature.properties.season.slice(-2) === "22" : true)
    );
    console.log("Data Changed - New Length: " + newArray.length);
    return {
      features: newArray,
    };
  }

  let draftLow = 1960;
  let draftHigh = 2020;
  let isCurrent = false;

  // Check Box
  const checkbox = document.getElementById("current-players-filter");
  checkbox.addEventListener("change", () => {
    const current = checkbox.checked;
    isCurrent = current;
    console.log("Updating draft years...");
    setArcs(changeArcData(current, draftLow, draftHigh));
  });

  // Slider
  yearSlider.noUiSlider.on("change", function (values, handle) {
    if (handle === 0 && parseInt(values[handle].slice(-2)) > 18 && parseInt(values[handle].slice(-2)) < 25) {
      yearSlider.noUiSlider.set([2018, draftHigh]);
      values[0] = "'18";
    } else if (handle === 1 && parseInt(values[handle].slice(-2)) < 63 && parseInt(values[handle].slice(-2)) > 25) {
      yearSlider.noUiSlider.set([draftLow, 1963]);
      values[1] = "'63";
    }
    const yearLow = stringToYear(values[0]);
    const yearHigh = stringToYear(values[1]);
    if (yearLow !== draftLow || yearHigh !== draftHigh) {
      draftLow = yearLow;
      draftHigh = yearHigh;
      document.getElementById("draft-low").innerHTML = yearLow === 1960 && yearHigh === 2020 ? "" : yearLow;
      document.getElementById("draft-high").innerHTML = yearLow === 1960 && yearHigh === 2020 ? "Anytime" : "-" + yearHigh;
      console.log("Updating draft years...");
      setArcs(changeArcData(isCurrent, draftLow, draftHigh));
    }
  });

  setArcs(changeArcData(isCurrent, draftLow, draftHigh));
});

function setArcs(data) {
  const players = data;
  const arcs = createArcs(players);
  const collegeData = createCollegeData(players);
  const teamData = createTeamData(players);
  const homeData = createHomeData(players);
  console.log("Data processing complete.");

  // Store the related arcs in a new variable
  let relatedArcs = [];
  let collegeHighlight = false;
  let teamHighlight = false;
  let homeHighlight = false;

  //   Update the arcs based on the hovered item
  function updateArcs(newRelatedArcs, specific_player) {
    relatedArcs = newRelatedArcs.map((arc) => arc.properties.player_name);

    const idArcs = newRelatedArcs.map((arc) => arc.properties.player_id);
    document.querySelectorAll('#player-list li').forEach((item) => {
      const playerId = item.getAttribute('data-player-id');
      if (idArcs.includes(playerId)) {
        item.classList.add('highlight');
      } else {
        item.classList.remove('highlight');
      }
    });

    collegeHighlight = newRelatedArcs.length > 0 ? newRelatedArcs[0].properties.college : false;
    teamHighlight = newRelatedArcs.length > 0 ? newRelatedArcs[0].properties.team_abbreviation : false;
    homeHighlight = newRelatedArcs.length > 0 ? `${newRelatedArcs[0].properties.birth_city}, ${newRelatedArcs[0].properties.birth_state}` : false;
    const newLayers = getLayers(specific_player);
    deckgl.setProps({
      layers: newLayers,
    });
  }

  deckgl.setProps({
    onClick: (info, event) => {
      if (!info.object) {
        clicked = false;
        document.getElementById("tooltip").style.display = "none";
        updateImage(false);
        updateArcs([]);
      }
    },
  });

  const cornerTooltip = true;
  const lt = 136;
  const tp = 36;
  function arcOnHover(info) {
    if (clicked) return;
    const tooltip = document.getElementById("tooltip");
    const object = info.object;
    if (object) {
      const properties = object.properties;
      tooltip.innerHTML = `<b>${properties.player_name}</b><br>Hometown: ${properties.birth_city}, ${properties.birth_state}<br>College: ${properties.college}<br>Team: ${getTeam(properties.team_abbreviation)[0]} ${properties.season ? `('${properties.season.slice(-2)})` : ""
        }`;
      tooltip.style.display = "block";
      //   tooltip.style.left = cornerTooltip ? 6 + "px" : info.x + "px";
      //   tooltip.style.top = cornerTooltip ? 6 + "px" : info.y + "px";
      tooltip.style.left = cornerTooltip ? lt + "px" : info.x + "px";
      tooltip.style.top = cornerTooltip ? tp + "px" : info.y + "px";
      const newArcs = arcs.filter((arc) => arc.properties.player_name === object.properties.player_name);
      updateArcs(newArcs);
      //   updateArcs(
      //     arcs.filter((arc) => arc.properties.college === object.properties.college),
      //     object.properties.player_name
      //   );
      updateImage(object.properties.player_id.toString());
    } else {
      tooltip.style.display = "none";
      updateImage(false);
      updateArcs([]);
    }
  }

  function collegeOnHover(info) {
    if (clicked) return;
    const tooltip = document.getElementById("tooltip");
    const object = info.object;
    if (object) {
      tooltip.innerHTML = `<b>${object.name}</b><br>Players: ${object.count}`;
      tooltip.style.display = "block";
      //   tooltip.style.left = cornerTooltip ? 6 + "px" : info.x + "px";
      //   tooltip.style.top = cornerTooltip ? 6 + "px" : info.y + "px";
      tooltip.style.left = cornerTooltip ? 6 + "px" : info.x + "px";
      tooltip.style.top = cornerTooltip ? 6 + "px" : info.y + "px";
      updateArcs(arcs.filter((arc) => arc.properties.college === object.name));
    } else {
      tooltip.style.display = "none";
      updateImage(false);
      updateArcs([]);
    }
  }

  function homeOnHover(info) {
    if (clicked) return;
    const tooltip = document.getElementById("tooltip");
    const object = info.object;
    if (object) {
      tooltip.innerHTML = `<b>${object.name}</b><br>Players: ${object.count}`;
      tooltip.style.display = "block";
      //   tooltip.style.left = cornerTooltip ? 6 + "px" : info.x + "px";
      //   tooltip.style.top = cornerTooltip ? 6 + "px" : info.y + "px";
      tooltip.style.left = cornerTooltip ? 6 + "px" : info.x + "px";
      tooltip.style.top = cornerTooltip ? 6 + "px" : info.y + "px";
      updateArcs(arcs.filter((arc) => arc.properties.birth_city + ", " + arc.properties.birth_state === object.name));
    } else {
      tooltip.style.display = "none";
      updateImage(false);
      updateArcs([]);
    }
  }

  function teamOnHover(info) {
    if (clicked) return;
    const tooltip = document.getElementById("tooltip");
    const object = info.object;
    if (object) {
      tooltip.innerHTML = `<b>${getTeam(object.name)[0]}</b><br>${getTeam(object.name)[1]}`;
      tooltip.style.display = "block";
      //   tooltip.style.left = cornerTooltip ? 6 + "px" : info.x + "px";
      //   tooltip.style.top = cornerTooltip ? 6 + "px" : info.y + "px";
      tooltip.style.left = cornerTooltip ? 6 + "px" : info.x + "px";
      tooltip.style.top = cornerTooltip ? 6 + "px" : info.y + "px";
      updateArcs(arcs.filter((arc) => arc.properties.team_abbreviation === object.name));
    } else {
      tooltip.style.display = "none";
      updateImage(false);
      updateArcs([]);
    }
  }

  function adjustCol(col, val) {
    return col + (255 - col) * val;
  }

  function getLayers(specific_player) {
    const val = 0.9;
    const standardOpacity = 0.6;
    const lowOpacity = 0.04; // 0.15;
    return [

      new deck.ScatterplotLayer({
        id: "hometown-circles",
        data: homeData,
        getPosition: (d) => d.coordinates,
        getFillColor: (d) => d.color,
        // getRadius: (d) => 10000, // 15000,
        getRadius: (d) => {
          return d.name === homeHighlight ? 40000 : 10000;
        },
        updateTriggers: {
          getRadius: [homeHighlight],
        },
        pickable: true,
        stroked: false,
        lineWidthMinPixels: 1,
        onHover: homeOnHover,
        onClick: (info) => {
          clicked = false;
          homeOnHover(info);
          clicked = true;
        },
      }),
      new deck.ScatterplotLayer({
        id: "college-circles",
        data: collegeData,
        getPosition: (d) => d.coordinates,
        getFillColor: (d) => d.color,
        // getRadius: (d) => 2000 + d.count * 200, // 20000 + d.count * 2000,
        // getRadius: (d) => (specific_player ? (d.properties.player_name === specific_player ? 40000 : 2000) : relatedArcs.includes(d.properties.player_name) ? 40000 : 2000), // NOT WORKING, SHOULD INCREASE RADIUS WHEN SELECTED
        getRadius: (d) => {
          return d.name === collegeHighlight ? 100000 : 10000;
        },
        updateTriggers: {
          getRadius: [collegeHighlight],
        },
        pickable: true,
        stroked: false,
        lineWidthMinPixels: 1,
        onHover: collegeOnHover,
        onClick: (info) => {
          clicked = false;
          collegeOnHover(info);
          clicked = true;
        },
      }),

      new deck.IconLayer({
        id: "team-logos",
        data: teamData,
        getPosition: (d) => d.coordinates,
        getIcon: (d) => ({
          //   url: teamIcons.find((icon) => icon.name === d.name).url,
          url: getTeam(d.name)[2],
          width: 128,
          height: 128,
          anchorY: 64,
        }),
        getSize: (d) => (d.name === teamHighlight ? 75 : 15),
        updateTriggers: {
          getSize: [teamHighlight],
        },
        billboard: [false, false, false], // Make the icons lay flat on the ground
        pickable: true,
        onHover: teamOnHover,
        onClick: (info) => {
          clicked = false;
          teamOnHover(info);
          clicked = true;
        },
      }),
      new deck.ArcLayer({
        id: "player-paths",
        data: arcs,
        getSourcePosition: (d) => d.from,
        getTargetPosition: (d) => d.to,
        // getSourceColor: (d) => getColor(d.properties.college),
        // getTargetColor: (d) => getColor(d.properties.college),
        getSourceColor: (d) => {
          const color = getColor(d.properties.college);
          //   if (relatedArcs.length !== 0 && d.direction == "college") {
          //     color[0] = adjustCol(color[0], val);
          //     color[1] = adjustCol(color[1], val);
          //     color[2] = adjustCol(color[2], val);
          //   }
          const opacity = relatedArcs.length === 0 ? standardOpacity : relatedArcs.includes(d.properties.player_name) ? 1 : lowOpacity;
          return [color[0], color[1], color[2], 255 * opacity];
        },
        getTargetColor: (d) => {
          const color = getColor(d.properties.college);
          //   if (relatedArcs.length !== 0 && d.direction !== "college") {
          //     color[0] = adjustCol(color[0], val);
          //     color[1] = adjustCol(color[1], val);
          //     color[2] = adjustCol(color[2], val);
          //   }
          const opacity = relatedArcs.length === 0 ? standardOpacity : relatedArcs.includes(d.properties.player_name) ? 1 : lowOpacity;
          return [color[0], color[1], color[2], 255 * opacity];
        },
        getWidth: (d) => (specific_player ? (d.properties.player_name === specific_player ? 4 : 1.5) : relatedArcs.includes(d.properties.player_name) ? 4 : 1.5),
        // getWidth: 2,
        pickable: true,
        updateTriggers: {
          getWidth: [relatedArcs],
          getSourceColor: [relatedArcs],
          getTargetColor: [relatedArcs],
        },
        onHover: arcOnHover,
        onClick: (info) => {
          clicked = false;
          arcOnHover(info);
          clicked = true;
        },
      }),
      //   new deck.ScatterplotLayer({
      //     id: "team-circles",
      //     data: teamData,
      //     getPosition: (d) => d.coordinates,
      //     getFillColor: (d) => d.color,
      //     // getRadius: (d) => 2000, //20000,
      //     getRadius: (d) => {
      //       return d.name === teamHighlight ? 80000 : 10000;
      //     },
      //     updateTriggers: {
      //       getRadius: [teamHighlight],
      //     },
      //     pickable: true,
      //     stroked: false,
      //     lineWidthMinPixels: 1,
      //     onHover: teamOnHover,
      //     onClick: (info) => {
      //       clicked = false;
      //       teamOnHover(info);
      //       clicked = true;
      //     },
      //   }),
    ];
  }

  // Add the list of players
  const playerList = document.getElementById("player-list");
  // Clear the list
  playerList.querySelectorAll("li").forEach((li) => li.remove());
  // Rearrange and sort player names
  const sortedPlayers = players.features
    .map((player) => {
      const name = player.properties.player_name;
      const nameParts = name.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");
      const displayName = `${lastName}, ${firstName}`;
      return [displayName, player.properties.player_id.toString()];
    })
    .sort();
  // Create and append list items
  sortedPlayers.forEach((items) => {
    const listItem = document.createElement("li");
    listItem.textContent = items[0];
    listItem.setAttribute("data-player-id", items[1]);
    listItem.addEventListener("mouseover", (event) => {
      const info = { object: players.features.filter((player) => player.properties.player_id.toString() === items[1])[0] };
      arcOnHover(info);
      // listItem.classList.add("highlight");
    });
    // Add a hover remove event listener
    listItem.addEventListener("mouseout", (event) => {
      if (!clicked) {
        document.getElementById("tooltip").style.display = "none";
        updateImage(false);
        updateArcs([]);
        // listItem.classList.remove("highlight");
      }
    });
    listItem.addEventListener("click", (event) => {
      const info = { object: players.features.filter((player) => player.properties.player_id.toString() === items[1])[0] };
      clicked = false;
      arcOnHover(info);
      clicked = true;
    });
    playerList.appendChild(listItem);
  });

  return updateArcs([]);
}

console.log("Initializing deck.gl map...");
const deckgl = new deck.DeckGL({
  container: "container",
  mapboxApiAccessToken: MAPBOX_ACCESS_TOKEN,
  initialViewState: {
    latitude: 42, // 39.5,
    longitude: -90, // -98.35,
    zoom: 3,
    bearing: 0,
    pitch: 45,
  },
  controller: true,
  layers: [], //getLayers(),
  //   onClick: (info, event) => {
  //     if (!info.object) {
  //       clicked = false;
  //       document.getElementById("tooltip").style.display = "none";
  //         updateArcs([]); // THIS IS NOT WORKING
  //     }
  //   },
});
console.log("Deck.gl map initialized.");

// SLIDER
const yearSlider = document.getElementById("year-slider");
noUiSlider.create(yearSlider, {
  range: {
    min: 1960,
    max: 2020,
  },
  step: 1,
  start: [1960, 2020],
  format: {
    to: function (value) {
      return "'" + Math.round(value).toString().substr(-2);
    },
    from: function (value) {
      return Number(value);
    },
  },
  tooltips: true,
  pips: {
    mode: "count",
    values: 7,
    density: 2,
    stepped: true,
  },
});
function stringToYear(st) {
  const num = parseInt(st.slice(1, 3));
  return num + (num < 30 ? 2000 : 1900);
}
