mapboxgl.accessToken = "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw";
const mapC = new mapboxgl.Map({
    container: "map-c",
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
    // center: europeCenter,
    // center: [15, 50], // CZE
    center: [15.413, 49.835], // CZE
    // center: [13, 52],
    zoom: mapA.getZoom(),
    // bounds: [[-45.6609, 28.7565], [69.2504, 72.7065]],
    // bounds: [[-123.2168, 25.0310], [-70.8223, 49.5204]],
    // maxBounds: [[-123.2168, 25.0310], [-70.8223, 49.5204]],
    // zoom: 6,

    interactive: false, // dragPan: true, // scrollZoom: false, // doubleClickZoom: false, // boxZoom: false, // dragRotate: false, // pitchWithRotate: false, // touchPitch: false, // touchZoomRotate: false, // keyboard: false,
    // scrollZoom: false
});

// const europe = [[-55.630, 26.626], [65.473, 73.048]];
mapC.on('style.load', (e) => {
    // console.log(e);
    // console.log(mapC.getStyle().layers);
    // console.log(mapC.getStyle().sources);
    // console.log(mapC.getLayer('country-boundaries'));
    // console.log(mapC.getFilter('country-boundaries'));
    // mapC.setFilter('country-boundaries', null);
    // console.log(mapC.getFilter('country-boundaries'));

    // resetZoomC();
});
// mapC.on('resize', (e) => {
//     // console.log('resize');
//     resetZoomC();
// });
// function resetZoomC() {
//     mapC.setCenter(europeCenter);
//     const z = 1.12376 + 0.00295701 * document.getElementById('map-b').getBoundingClientRect().width;
//     mapC.setZoom(z);
// }

let bboxPadding = 150;
mapC.on('load', () => {
    // mapC.setZoom(mapA.getZoom());
    // console.log(mapC.getZoom());

    function setbbBoxPadding() {
        // Get the center coordinates of the div
        const divRect = document.getElementById('map-c').getBoundingClientRect();
        const r = divRect.width / 2;
        const h = 1.414 * r;
        bboxPadding = h - r;
        console.log('Setting bboxPadding:', bboxPadding);
    }
    setbbBoxPadding();
    // Event listener for map resize
    mapA.on('resize', (event) => {
        setbbBoxPadding();
    });

    mapC.addSource("countries", {
        type: 'vector',
        url: 'mapbox://antadam127.7qjvpjmo'
    });

    mapC.addLayer({
        id: "country-fills-userAdded",
        source: "countries",
        "source-layer": "ne_10m_admin_0_countries-0a88vy",
        type: "fill",
        paint: {
            "fill-color": '#f99080',
            'fill-opacity': 0.2,
            // 'fill-opacity': [
            //     'case',
            //     ['boolean', ['feature-state', 'hover'], false],
            //     1,
            //     0
            // ]
        },
    });
    mapC.addLayer({
        id: "country-outlines-userAdded",
        source: "countries",
        "source-layer": "ne_10m_admin_0_countries-0a88vy",
        type: "line",
        paint: {
            "line-color": '#fff',
            "line-opacity": 1,
            // "line-width": ["interpolate", ["linear"], ["zoom"], 4, 1, 8, 4],
            // "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 8, 2],
            "line-width": 0.5,
        },
    });

    // mapCsetCountry('CZ');
    mapCsetCountry('');
});

const markersB = []; // TEMP
function mapCsetCountry(newCountry) {
    const filt = ['==', 'ISO_A2_EH', newCountry];
    mapC.setFilter('country-fills-userAdded', filt);
    mapC.setFilter('country-outlines-userAdded', filt);
    const adj = 4; // The adjustment for the bounding boxes to add padding on the sides
    if (!boundingBoxAndCenters.hasOwnProperty(newCountry)) {
        startMapAGlobeMode();
        return;
    }
    globeMode = false;
    const bounds = [
        [boundingBoxAndCenters[newCountry][1][0] - adj, boundingBoxAndCenters[newCountry][1][1] - adj],
        [boundingBoxAndCenters[newCountry][1][2] + adj, boundingBoxAndCenters[newCountry][1][3] + adj]
    ];
    mapC.fitBounds(bounds,
        {
            padding: 0,
            // padding: 200, // Padding doesn't work for larger countries for some reason
            animate: false
        }
    );
    console.log('Fitting Bounds:', newCountry, "Zoom Level:", mapC.getZoom());

    setMapACenter(Object.keys(stateBoundingBoxAndCenters)[(Math.floor(Math.random() * 50))], true); // Gonna get rid of this
    // mapA.zoomTo(mapC.getZoom(), { // 
    //     duration: 200,
    // });
    mapA.easeTo({
        center: centerCoords,
        zoom: mapC.getZoom(),
        // duration: 500,
        // easing(t) {
        //     return t;
        // }
    });





    // // TEMP JUST TO MOVE THE MAP TO THE COUNTRY TO SHOW THAT THE SIZING IS CORRECT
    // setTimeout(() => {
    //     mapA.panTo(boundingBoxAndCenters[newCountry][2],
    //         // { duration: 5000 }
    //     );
    // },
    //     205);
    // // TEMP JUST TO MOVE THE MAP TO THE COUNTRY TO SHOW THAT THE SIZING IS CORRECT

    // TEMP SHOW BOUNDING BOXES
    if (false) {
        for (const m of markersB) m.remove();
        markersB.push(new mapboxgl.Marker({ scale: 0.3 })
            .setLngLat([boundingBoxAndCenters[newCountry][1][0] - adj, boundingBoxAndCenters[newCountry][1][1] - adj])
            .addTo(mapC));
        markersB.push(new mapboxgl.Marker({ scale: 0.3 })
            .setLngLat([boundingBoxAndCenters[newCountry][1][2] + adj, boundingBoxAndCenters[newCountry][1][3] + adj])
            .addTo(mapC));
        markersB.push(new mapboxgl.Marker({ scale: 0.3 })
            .setLngLat([boundingBoxAndCenters[newCountry][1][0] - adj, boundingBoxAndCenters[newCountry][1][3] + adj])
            .addTo(mapC));
        markersB.push(new mapboxgl.Marker({ scale: 0.3 })
            .setLngLat([boundingBoxAndCenters[newCountry][1][2] + adj, boundingBoxAndCenters[newCountry][1][1] - adj])
            .addTo(mapC));
        markersB.push(new mapboxgl.Marker({ scale: 0.3 })
            .setLngLat([boundingBoxAndCenters[newCountry][1][0] - adj, boundingBoxAndCenters[newCountry][1][1] - adj])
            .addTo(mapB));
        markersB.push(new mapboxgl.Marker({ scale: 0.3 })
            .setLngLat([boundingBoxAndCenters[newCountry][1][2] + adj, boundingBoxAndCenters[newCountry][1][3] + adj])
            .addTo(mapB));
        markersB.push(new mapboxgl.Marker({ scale: 0.3 })
            .setLngLat([boundingBoxAndCenters[newCountry][1][0] - adj, boundingBoxAndCenters[newCountry][1][3] + adj])
            .addTo(mapB));
        markersB.push(new mapboxgl.Marker({ scale: 0.3 })
            .setLngLat([boundingBoxAndCenters[newCountry][1][2] + adj, boundingBoxAndCenters[newCountry][1][1] - adj])
            .addTo(mapB));
    }
    // TEMP SHOW BOUNDING BOXES

}