// const europeCenter = [5.478, 52.691];
const europeCenter = [4, 52.5];

mapboxgl.accessToken = "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw";
const mapB = new mapboxgl.Map({
    container: "map-b",
    // style: "mapbox://styles/antadam127/cls4bem1m021801qsbfme3pus",
    style: 'mapbox://styles/antadam127/cls8ptavf02kg01p21olffbwq', // Blank Map
    // logoPosition: 'bottom-left',
    // customAttribution: `<a title="Anthony Adam" href="https://www.linkedin.com/in/anthony-adam-psu/" target="_blank">
    // <svg width="16px" height="16px" viewBox="2 4 48 48" style="vertical-align: middle;">
    //     <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    //         <path d="M20.9716667,33.5527338 L25.001,33.5527338 L25.001,27.1328007 C25.001,25.439485 25.3213333,23.7988354 27.4206667,23.7988354 C29.491,23.7988354 29.517,25.7351486 29.517,27.2404662 L29.517,33.5527338 L33.5506667,33.5527338 L33.5506667,26.4341413 C33.5506667,22.9381777 32.796,20.2505391 28.711,20.2505391 C26.7483333,20.2505391 25.432,21.3265278 24.8943333,22.3471839 L24.839,22.3471839 L24.839,20.5725357 L20.9716667,20.5725357 L20.9716667,33.5527338 Z M16.423,14.1202696 C15.1273333,14.1202696 14.0823333,15.1682587 14.0823333,16.4595785 C14.0823333,17.7508984 15.1273333,18.7992208 16.423,18.7992208 C17.7133333,18.7992208 18.761,17.7508984 18.761,16.4595785 C18.761,15.1682587 17.7133333,14.1202696 16.423,14.1202696 L16.423,14.1202696 Z M14.4026667,33.5527338 L18.4406667,33.5527338 L18.4406667,20.5725357 L14.4026667,20.5725357 L14.4026667,33.5527338 Z M9.76633333,40 C8.79033333,40 8,39.2090082 8,38.2336851 L8,9.76631493 C8,8.79065843 8.79033333,8 9.76633333,8 L38.234,8 C39.2093333,8 40,8.79065843 40,9.76631493 L40,38.2336851 C40,39.2090082 39.2093333,40 38.234,40 L9.76633333,40 Z" id="Shape" fill="#000000"></path>
    //     </g>
    // </svg>Anthony Adam</a>`,
    attributionControl: false,

    // center: [-97.01958, 38.66197],
    center: europeCenter,
    // center: [13, 52],
    // zoom: 1,
    // bounds: [[-45.6609, 28.7565], [69.2504, 72.7065]],
    // bounds: [[-123.2168, 25.0310], [-70.8223, 49.5204]],
    // maxBounds: [[-123.2168, 25.0310], [-70.8223, 49.5204]],
    // zoom: 6,

    interactive: false, // dragPan: true, // scrollZoom: false, // doubleClickZoom: false, // boxZoom: false, // dragRotate: false, // pitchWithRotate: false, // touchPitch: false, // touchZoomRotate: false, // keyboard: false,
    // projection: 'mercator', // COMMENT OUT
});

// const europe = [[-55.630, 26.626], [65.473, 73.048]];
mapB.on('style.load', (e) => {
    // console.log(e);
    // console.log(mapB.getStyle().layers);
    // console.log(mapB.getStyle().sources);
    // console.log(mapB.getLayer('country-boundaries'));
    // console.log(mapB.getFilter('country-boundaries'));
    // mapB.setFilter('country-boundaries', null);
    // console.log(mapB.getFilter('country-boundaries'));

    resetZoomB();
});
mapB.on('resize', (e) => {
    // console.log('resize');
    resetZoomB();
});
function resetZoomB() {
    mapB.setCenter(europeCenter);
    const z = 1.12376 + 0.00295701 * document.getElementById('map-b').getBoundingClientRect().width;
    mapB.setZoom(z);
}

let hoveredPolygonId = null;
mapB.on('load', () => {
    mapB.addSource("countries", {
        type: 'vector',
        url: 'mapbox://antadam127.7qjvpjmo'
    });

    mapB.addLayer({
        id: "country-fills-userAdded",
        source: "countries",
        "source-layer": "ne_10m_admin_0_countries-0a88vy",
        type: "fill",
        paint: {
            "fill-color": '#f99080',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
            ]
        },
    });
    mapB.addLayer({
        id: "country-outlines-userAdded",
        source: "countries",
        "source-layer": "ne_10m_admin_0_countries-0a88vy",
        type: "line",
        paint: {
            "line-color": '#fff',
            "line-opacity": 1,
            "line-width": ["interpolate", ["linear"], ["zoom"], 4, 1, 8, 4],
        },
    });

    mapB.setFilter('country-fills-userAdded', ['all', ['==', 'CONTINENT', 'Europe'], ['!=', 'ISO_A3', 'RUS']]);
    mapB.setFilter('country-outlines-userAdded', ['all', ['==', 'CONTINENT', 'Europe'], ['!=', 'ISO_A3', 'RUS']]);

    mapB.on('mousemove', 'country-fills-userAdded', (e) => {
        if (e.features.length > 0) {
            if (hoveredPolygonId !== null) {
                mapB.setFeatureState(
                    { source: 'countries', sourceLayer: 'ne_10m_admin_0_countries-0a88vy', id: hoveredPolygonId },
                    { hover: false }
                );
            }
            hoveredPolygonId = e.features[0].id;
            mapB.setFeatureState(
                { source: 'countries', sourceLayer: 'ne_10m_admin_0_countries-0a88vy', id: hoveredPolygonId },
                { hover: true }
            );
        }
    });
    mapB.on('mouseleave', 'country-fills-userAdded', () => {
        if (hoveredPolygonId !== null) {
            mapB.setFeatureState(
                { source: 'countries', sourceLayer: 'ne_10m_admin_0_countries-0a88vy', id: hoveredPolygonId },
                { hover: false }
            );
        }
        hoveredPolygonId = null;
    });

    mapB.on('click', 'country-fills-userAdded', (e) => {
        // console.log(e.features[0].properties);
        mapCsetCountry(e.features[0].properties.ISO_A2_EH);
    });


    // TEMP COUNTRY CENTERS
    // const markers = [];
    // for (const c of europeanCountriesA2) {
    //     console.log(c)
    //     if (boundingBoxAndCenters.hasOwnProperty(c)) {
    //         markers.push(new mapboxgl.Marker()
    //             .setLngLat(boundingBoxAndCenters[c][2])
    //             .addTo(mapB));
    //     }
    // }
    // TEMP COUNTRY CENTERS

});
