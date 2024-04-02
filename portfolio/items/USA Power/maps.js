// GLOBAL USED FOR BOTH Map.js FILES
const consoleLog = false; // MOD
const reducePerformace = false; // MOD: default false (remember this is directly setting the location instead of using an easing function so keeping it on might actually feel more responsive, more testing needed on other cpus)
const europeanCountries = ["ALB", "AND", "ARM", "AUT", "BLR", "BEL", "BIH", "BGR", "HRV", "CYP", "CZE", "DNK", "EST", "FRO", "FIN", "FRA", "GEO", "DEU", "GIB", "GRC", "HUN", "ISL", "IRL", "IMN", "ITA", "XKX", "LVA", "LIE", "LTU", "LUX", "MKD", "MLT", "MDA", "MCO", "MNE", "NLD", "NOR", "POL", "PRT", "ROU", "RUS", "SMR", "SRB", "SVK", "SVN", "ESP", "SWE", "CHE", "TUR", "UKR", "GBR", "VAT"];
const europeanCountriesA2 = ["AL", "AD", "AM", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FO", "FI", "FR", "GE", "DE", "GI", "GR", "HU", "IS", "IE", "IM", "IT", "XK", "LV", "LI", "LT", "LU", "MK", "MT", "MD", "MC", "ME", "NL", "NO", "PL", "PT", "RO", "RU", "SM", "RS", "SK", "SI", "ES", "SE", "CH", "TR", "UA", "GB", "VA"];
// GLOBAL USED FOR BOTH Map.js FILES


// const centerCoords = [-97.01958, 38.66197]
// const centerCoords = [-100, 30];
// const centerCoords = [-72.69, 41.77]; // CT
const centerCoords = [-77.803, 40.875]; // PA
// const centerCoords = [-39.6111, 35.4959];

// Create the Map
mapboxgl.accessToken = "pk.eyJ1IjoiYW50YWRhbTEyNyIsImEiOiJjbDI2ZGJnN2wyaW5qM2JxZHVmZTJjNm8zIn0.4aMtEeYWx4hxIVKRrqsqWw";
const mapA = new mapboxgl.Map({
    container: "map-a",
    style: "mapbox://styles/antadam127/clryi80p3017f01p10qoo5uty",
    // logoPosition: 'bottom-left',
    // customAttribution: `<a title="Anthony Adam" href="https://www.linkedin.com/in/anthony-adam-psu/" target="_blank">
    // <svg width="16px" height="16px" viewBox="2 4 48 48" style="vertical-align: middle;">
    //     <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    //         <path d="M20.9716667,33.5527338 L25.001,33.5527338 L25.001,27.1328007 C25.001,25.439485 25.3213333,23.7988354 27.4206667,23.7988354 C29.491,23.7988354 29.517,25.7351486 29.517,27.2404662 L29.517,33.5527338 L33.5506667,33.5527338 L33.5506667,26.4341413 C33.5506667,22.9381777 32.796,20.2505391 28.711,20.2505391 C26.7483333,20.2505391 25.432,21.3265278 24.8943333,22.3471839 L24.839,22.3471839 L24.839,20.5725357 L20.9716667,20.5725357 L20.9716667,33.5527338 Z M16.423,14.1202696 C15.1273333,14.1202696 14.0823333,15.1682587 14.0823333,16.4595785 C14.0823333,17.7508984 15.1273333,18.7992208 16.423,18.7992208 C17.7133333,18.7992208 18.761,17.7508984 18.761,16.4595785 C18.761,15.1682587 17.7133333,14.1202696 16.423,14.1202696 L16.423,14.1202696 Z M14.4026667,33.5527338 L18.4406667,33.5527338 L18.4406667,20.5725357 L14.4026667,20.5725357 L14.4026667,33.5527338 Z M9.76633333,40 C8.79033333,40 8,39.2090082 8,38.2336851 L8,9.76631493 C8,8.79065843 8.79033333,8 9.76633333,8 L38.234,8 C39.2093333,8 40,8.79065843 40,9.76631493 L40,38.2336851 C40,39.2090082 39.2093333,40 38.234,40 L9.76633333,40 Z" id="Shape" fill="#000000"></path>
    //     </g>
    // </svg>Anthony Adam</a>`,
    attributionControl: false,

    // center: [-97.01958, 38.66197],
    // zoom: 3.9,

    // bounds: [[-123.2168, 25.0310], [-70.8223, 49.5204]],
    // maxBounds: [[-123.2168, 25.0310], [-70.8223, 49.5204]],

    center: centerCoords,
    // zoom: 6,
    zoom: 5,

    
    interactive: false, // dragPan: true, // scrollZoom: false, // doubleClickZoom: false, // boxZoom: false, // dragRotate: false, // pitchWithRotate: false, // touchPitch: false, // touchZoomRotate: false, // keyboard: false,
    // scrollZoom: false,
    // doubleClickZoom: false,
    // boxZoom: false,
    // dragRotate: false,
    // pitchWithRotate: false,
    // touchPitch: false,
    // touchZoomRotate: false,
    // keyboard: false,
});

// function resetZoom() {
//     mapA.setZoom(0.183121 + 0.00285062 * document.getElementById('map-a').getBoundingClientRect().width);
// }
// resetZoom();

if (true) mapA.on('style.load', (event) => {
    // Define Vars
    let timeoutId, dest;
    let targetDist = 0; // Start 0
    let bearing = 0; // Start 0
    let outBounds = true; // Start true
    let canMove = false; // Start false

    // Values that will be set on start and reset on a resize
    let divRect, divCenterX, divCenterY, moveMaxDistPixels, targetMaxDistMiles;
    function resizeValues() {
        // Get the center coordinates of the div
        divRect = document.getElementById('map-a').getBoundingClientRect();
        divCenterX = divRect.width / 2;
        divCenterY = divRect.height / 2;
        // SET VALUES
        moveMaxDistPixels = (divRect.width < divRect.height ? divRect.width : divRect.height) / 2; // MOD: the pixel radius of the mouse movement

        // SET MILE RADIUS
        targetMaxDistMiles = 150; // 800; // MOD: the mile radius of target movement
        // targetMaxDistMiles = 2000; // 800; // MOD: the mile radius of target movement

        // SET ZOOM LEVEL
        // mapA.setZoom(0.183121 + 0.00285062 * document.getElementById('map-a').getBoundingClientRect().width); // Show Full Earth Zoom Level

    }
    resizeValues();

    // Event listener for map resize
    mapA.on('resize', (event) => {
        if (consoleLog) console.log('MAP RESIZED');
        resizeValues();
    });

    // Event listener for mousemove (only movement over the map)
    mapA.on('mousemove', (event) => {
        // Get mouse coordinates
        const mouseX = event.point.x;
        const mouseY = event.point.y;

        // Calculate the angle or bearing
        const deltaX = mouseX - divCenterX;
        const deltaY = mouseY - divCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const degrees = angle * (180 / Math.PI);

        // Calculate the mouuse distance to center, check if within bounds
        const mouseDist = Math.sqrt((mouseX - divRect.width / 2) ** 2 + (mouseY - divRect.height / 2) ** 2);
        const withinBounds = mouseDist < moveMaxDistPixels;

        // Calculate the mile distance it should be away from
        if (withinBounds) targetDist = easeInOutCubic(null, mouseDist, 0, targetMaxDistMiles, moveMaxDistPixels); // MOD: the easing function used to translate mouse distance to mile distance

        // Create Destination point with Turf
        const point = turf.point(centerCoords);
        if (withinBounds) bearing = degrees + 90;
        const destination = turf.destination(point, targetDist, bearing, { units: 'miles' });
        dest = destination;

        const dur = 150; // 100; // MOD: the duration of the movement that occurs when mouse first enters circle
        if (withinBounds && outBounds) {
            if (consoleLog) console.log('IN ONCE');
            // Move the map to the target point, likely on the edge, when the mouse first enters circle
            // mapA.easeTo({ center: destination.geometry.coordinates, duration: dur });
            mapA.easeTo({
                center: destination.geometry.coordinates,
                duration: dur,
                easing(t) {
                    return easeOutBack(null, t, 0, 1, 1);
                }
            });
            canMove = destination;
            // Allow for movement when the above ease ends, unless...
            timeoutId = setTimeout(() => {
                // const dd = turf.distance(canMove, dest, { units: 'miles' });
                // if (consoleLog) console.log('IN ONCE - CAN MOVE', dd.toFixed(2));
                if (consoleLog) console.log('IN ONCE - CAN MOVE');
                // Move the map to the current target if the target has not been interupted and mouse movement has occured after original set destination, any movement during the following ease will take over and set the map to that location
                // DO NOT NEED THIS ANYMORE because if standard moving is done with an ease function it will by default smoothly transition to its target
                if (reducePerformace) {
                    mapA.easeTo({ center: dest.geometry.coordinates, duration: 80 }); // 25 // 3000 // MOD: the arbitrary time that the secondary ease function should take to reset the location in the event that the mouse is withing the mileRadiusMultiplier radius and is not in the exact spot as its previous destination
                    // mapA.panTo(dest.geometry.coordinates);
                    // mapA.setCenter(dest.geometry.coordinates);
                }
                canMove = 'move';
            }, dur + 1);
        }
        if (!outBounds && canMove !== 'move') {
            // While the above ease is firing (first one with duration "dur"), check the distance between its target and current mouse location
            const d = turf.distance(canMove, destination, { units: 'miles' });
            // if (consoleLog) console.log('CHECKING DIST:', d.toFixed(2));
            // ...unless, If the distance is too great then snap the map directly to the mouses location and allow for movement, also clear the timeout to prevent canMove from being change out of turn
            const mileRadiusMultiplier = reducePerformace ? 0.25 : 0.45; // 0.33; // MOD: the multiplier applied to the radius of miles that interupts the above easing function and snaps the mouse location, arbitrary value
            if (d > targetMaxDistMiles * mileRadiusMultiplier) {
                if (consoleLog) console.log('INTERUPTING - CAN MOVE');
                if (timeoutId) clearTimeout(timeoutId);
                // Again once this is triggered it shouuld by default move to the target location smoothly
                canMove = 'move';
            }
        }
        // Once the mouse leaves the circle (but is still within the map rectangle) clear the canMove timeout and reset the map
        if (!withinBounds) {
            if (!outBounds) {
                if (consoleLog) console.log('OUT ONCE (A)');
                if (timeoutId) clearTimeout(timeoutId);
                outBounds = true;
                resetMap();
            }
        } else outBounds = false;

        // If withinBounds and canMove then physically move the center of the map to the correct location
        if (withinBounds && canMove === 'move') {
            // if (consoleLog) console.log('MOVING');
            if (!reducePerformace) {
                mapA.easeTo({
                    center: destination.geometry.coordinates,
                    duration: 25, // MOD: the duration used for all basic movement. Not much testing done on this
                    easing(t) {
                        return easeOutExpo(null, t, 0, 1, 1); // MOD: the easing function for basic movement 
                    }
                });
            } else mapA.setCenter(destination.geometry.coordinates);
        }
    });
    // Event listener for mouse out (fired when mouse leaves the map) (might also fire if leaves the layer? problems occured when using markers and mouse went over marker)
    mapA.on('mouseout', (event) => {
        // Once the mouse leaves the circle (and is not within the map rectangle) clear the canMove timeout and reset the map
        // mapA.setCenter(centerCoords);
        if (!outBounds) {
            if (consoleLog) console.log('OUT ONCE (B)');
            if (timeoutId) clearTimeout(timeoutId);
            outBounds = true;
            resetMap();
        }
    });
    function resetMap() {
        // Reset the map to the center coordinates using the specialized bounce ease function
        // mapA.flyTo({ center: centerCoords });
        // mapA.easeTo({ center: centerCoords });
        // mapA.panTo(centerCoords);
        mapA.easeTo({
            center: centerCoords,
            duration: 750, // MOD: the time to return the map to the center
            easing(t) {
                return easeOutElastic(null, t, 0, 1, 1); // MOD: the easing function used to return map to the center
            }
        });
    }
});




// mapA.on('load', () => {
// var lineStrings = turf.randomLineString(25, {bbox: [-180, -90, 180, 90]})
// console.log(lineStrings)

// var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], { name: 'line 1' });
// var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], { name: 'line 2' });
// console.log(linestring1)







// setTimeout(()=>{mapA.panBy([1000,0])},3000);

// panBy with an animation of 5 seconds.
// map.panBy([-1025, 38], { duration: 5000 });
// map.panBy([1025, 38]);
// map.panTo([-74, 38]);
// map.zoomTo(8);
// map.zoomTo(8, {
//     duration: 2000,
//     offset: [100, 50]
// });
// map.fitBounds([[-79, 43], [-73, 45]], {
//     padding: { padding: 10, linear: false }
// });
// map.easeTo({center: [-114, 38], zoom: 9, duration: 5000});
// map.easeTo({
//     center: [-114, 38],
//     zoom: 9,
//     speed: 0.2,
//     curve: 1,
//     duration: 5000,
//     easing(t) {
//         return t;
//     }
// });
// map.flyTo({center:[-114, 38]});
// setTimeout(()=>{map.flyTo({center:[-114, 38]})},6000);
// map.flyTo({
//     center: [-114, 38],
//     zoom: 9,
//     speed: 0.2,
//     curve: 1,
//     easing(t) {
//         return t;
//     }
// });
// });