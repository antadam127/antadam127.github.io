if (config.scrollytelling) {
  // Add Inset
  let insetMap;
  if (scrollConfig.inset) {
    $("<div id='mapInset'></div>").insertAfter("#map");

    insetMap = new mapboxgl.Map({
      container: 'mapInset', // container id
      style: `mapbox://styles/mapbox/${scrollConfig.inset}-v10`,
      center: scrollConfig.chapters[0].location.center,
      zoom: 3,
      hash: false,
      interactive: false,
      attributionControl: false,
      projection: scrollConfig.insetGlobe === 'match' ? config.globeMode ? 'globe' : 'mercator' : scrollConfig.insetGlobe === 'opposite' ? !config.globeMode ? 'globe' : 'mercator' : scrollConfig.insetGlobe ? 'globe' : 'mercator',
    });

    //Helper functions for insetmap
    let initLoad = true;
    function getInsetBounds() {
      let bounds = map.getBounds();

      let boundsJson = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  bounds._sw.lng,
                  bounds._sw.lat
                ],
                [
                  bounds._ne.lng,
                  bounds._sw.lat
                ],
                [
                  bounds._ne.lng,
                  bounds._ne.lat
                ],
                [
                  bounds._sw.lng,
                  bounds._ne.lat
                ],
                [
                  bounds._sw.lng,
                  bounds._sw.lat
                ]
              ]
            ]
          }
        }]
      }

      if (initLoad) {
        addInsetLayer(boundsJson);
        initLoad = false;
      } else {
        updateInsetLayer(boundsJson);
      }

    }

    // Set up inset bounds connnection
    function addInsetLayer(bounds) {
      insetMap.addSource('boundsSource', {
        'type': 'geojson',
        'data': bounds
      });

      insetMap.addLayer({
        'id': 'boundsLayer',
        'type': 'fill',
        'source': 'boundsSource', // reference the data source
        'layout': {},
        'paint': {
          'fill-color': '#fff', // blue color fill
          'fill-opacity': 0.2
        }
      });
      // // Add a black outline around the polygon.
      insetMap.addLayer({
        'id': 'outlineLayer',
        'type': 'line',
        'source': 'boundsSource',
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 1
        }
      });
    }

    // Update inset bounds
    function updateInsetLayer(bounds) {
      insetMap.getSource('boundsSource').setData(bounds);
    }

    map.on("load", () => {
      console.log('MAP LOAD');
      // As the map moves, grab and update bounds in inset map.
      if (scrollConfig.inset) {
        map.on('move', getInsetBounds);
      }
    });
    insetMap.on('load', () => {
      console.log('INSET LOAD');
    })

  }

  // Show Markers
  let marker;
  if (scrollConfig.showMarkers) {
    marker = new mapboxgl.Marker(customMarker);
    marker.setLngLat(scrollConfig.chapters[0].location.center).addTo(map);
  }


  // Create HTML
  if (scrollConfig.overlay) {
    $("#map-wrap").append("<div id='story'></div>");
  }
  else {
    $("#mapbox-wrap").append("<div id='side-wrap'></div>");

    // Navigation
    $("#side-wrap").append("<div id='nav-wrap'></div>");
    const sideWrap = document.getElementById('side-wrap');
    sideWrap.classList.add(scrollConfig.theme)
    sideWrap.classList.add(scrollConfig.defaultSide)

    $("#nav-wrap").append("<div id='nav-inner'></div>");

    // Features
    $("#side-wrap").append("<div id='feature-wrap'></div>");
    $("#feature-wrap").append("<div id='intro-section'></div>");

    // Intro Section
    const introSection = document.getElementById('intro-section');

    if (scrollConfig.title) {
      const el = document.createElement('h1');
      el.innerHTML = scrollConfig.title;
      introSection.appendChild(el);
    }
    if (scrollConfig.subtitle) {
      const el = document.createElement('p');
      el.innerHTML = scrollConfig.subtitle;
      introSection.appendChild(el);
    }

    const navInner = document.getElementById('nav-inner');
    const featureWrap = document.getElementById('feature-wrap');

    // Add Chapters and Nav
    scrollConfig.chapters.forEach((chapter, i) => {
      // Set scrollConfig id
      chapter.id = `chapter-${i + 1}`;

      // Nav Buttons
      const elNav = document.createElement('a');
      elNav.setAttribute('id', `nav-chapter-${i + 1}`);
      elNav.setAttribute('href', `#chapter-${i + 1}`);
      elNav.classList.add('nav-item');
      navInner.appendChild(elNav);

      // Chapters
      const elChap = document.createElement('div');
      elChap.setAttribute('id', `chapter-${i + 1}`);
      elChap.classList.add('chapter');

      if (chapter.title) {
        const heading = document.createElement('h1');
        heading.classList.add('heading');
        heading.innerHTML = `<span class='number'>${i < 9 ? '0' : ''}${i + 1}</span>${chapter.title}`;
        elChap.appendChild(heading);
      }

      if (chapter.image) {
        const img = document.createElement("img");
        img.src = chapter.image;
        elChap.appendChild(img);
      }

      if (chapter.description) {
        const content = document.createElement('p');
        content.innerHTML = chapter.description;
        elChap.appendChild(content);
      }

      featureWrap.appendChild(elChap);

    });

  }














  const layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity'],
    'heatmap': ['heatmap-opacity']
  }

  function setLayerOpacity(layer) {
    let paintProps = layerTypes[map.getLayer(layer.layer).type];
    paintProps.forEach(function (prop) {
      let options = {};
      if (layer.duration) {
        let transitionProp = prop + "-transition";
        options = {
          "duration": layer.duration
        };
        map.setPaintProperty(layer.layer, transitionProp, options);
      }
      map.setPaintProperty(layer.layer, prop, layer.opacity, options);
    });
  }



  // On every scroll event, check which element is on screen
  document.getElementById('feature-wrap').addEventListener('scroll', () => {
    let chapters = scrollConfig.chapters;
    // console.log(chapters);
    for (let i = Object.keys(chapters).length - 1; i >= 0; i--) {
      let chapterId = chapters[i].id;
      // console.log(chapterId);
      if (isElementOnScreen(chapterId)) {
        setActiveChapter(chapterId, i);
        break;
      }
    }
  });

  let activeId = null;

  function setActiveChapter(id, idx) {
    if (id === activeId) return;

    chapterTransition(scrollConfig.chapters[idx]);

    document.getElementById(id).classList.add('active');
    document.getElementById('nav-' + id).classList.add('nav-active');

    if (activeId) {
      document.getElementById(activeId).classList.remove('active');
      document.getElementById('nav-' + activeId).classList.remove('nav-active');
      let chapter = scrollConfig.chapters.find(chap => chap.id === activeId);
      if (chapter.onChapterExit) {
        if (chapter.onChapterExit.length > 0) chapter.onChapterExit.forEach(setLayerOpacity);
      }
    }

    activeId = id;
  }

  function isElementOnScreen(id) {
    let element = document.getElementById(id);
    let bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight - 300;
  }

  function chapterTransition(chapter) {
    let loc = chapter.location;
    console.log('soft set', chapter.id);
    softMoveLocationSet(loc)
    // map.flyTo(loc);
    map[chapter.mapAnimation || 'flyTo'](loc);

    if (scrollConfig.inset) {
      insetMap.flyTo({
        center: loc.center,
        zoom: (loc.zoom < 5) ? 0 : (loc.zoom > 14) ? 9 : 3,
      });
    }
    if (scrollConfig.showMarkers) {
      marker.setLngLat(chapter.location.center);
    }
    if (chapter.onChapterEnter) {
      if (chapter.onChapterEnter.length > 0) chapter.onChapterEnter.forEach(setLayerOpacity);
    }
    if (chapter.callback) {
      window[chapter.callback]();
    }
    if (chapter.rotateAnimation) {
      map.once('moveend', () => {
        const rotateNumber = map.getBearing();
        map.rotateTo(rotateNumber + 180, {
          duration: 60000,
          easing: function (t) {
            return t;
          }
        });
      });
    }

  }



}