const scrollConfig = {
    // Theme
    showMarkers: true, // Show Markers
    theme: 'dark', // 'light' || 'dark' // Theme
    inset: false, // false || 'light' || 'dark' // Show inset map
    insetGlobe: false, // true || false || 'opposite' || 'match' // match or opposite map projection

    defaultSide: 'right', // 'left' || 'right' 
    overlay: false, // Overlay or not

    // Title
    title: 'Global State College',
    subtitle: 'Explore the various Global Food options in State College, PA',
    footer: 'Source: source citations, etc. <br> Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',

    // Chapters
    chapters: [
    //     {
    //         alignment: 'left', // optional: 'left' || 'right' // Only for overlay
    //         title: 'Chapter Title',
    //         image: '', // optional image URL
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

    //         location: {
    //             bearing: -17.6,
    //             center: [-122.407702, 37.793244],
    //             zoom: 15.5,
    //             pitch: 45
    //         },
    //         mapAnimation: 'flyTo',
    //         rotateAnimation: false,
    //         onChapterEnter: [
    //             // {
    //             //     layer: 'layer-name',
    //             //     opacity: 1,
    //             //     duration: 1000,
    //             // }
    //         ],
    //         onChapterExit: [
    //             // {
    //             //     layer: 'layer-name',
    //             //     opacity: 0,
    //             // }
    //         ],
    //         hidden: false,
    //     },
    //     {
    //         title: 'coit-tower',
    //         location: {
    //             center: [-122.4063694, 37.802396],
    //             bearing: 27,
    //             zoom: 17.5,
    //             pitch: 90,
    //         }
    //     },
    //     {
    //         title: 'north-beach',
    //         location: {
    //             bearing: 27,
    //             center: [-122.4169511, 37.8047288],
    //             zoom: 16,
    //             pitch: 40
    //         }
    //     },
    //     {
    //         title: 'fishermans-wharf',
    //         location: {
    //             bearing: 90,
    //             center: [-122.4253858, 37.8081269],
    //             zoom: 16,
    //             pitch: 0
    //         }
    //     },
    //     {
    //         title: 'nob-hill',
    //         location: {
    //             bearing: 27,
    //             center: [-122.4204894, 37.7929521],
    //             zoom: 16,
    //             pitch: 40,
    //         }
    //     },
    //     {
    //         title: 'fairmont',
    //         location: {
    //             bearing: 90,
    //             center: [-122.412633, 37.7923939],
    //             zoom: 17,
    //             pitch: 60
    //         }
    //     },
    //     {
    //         title: 'ferry-building',
    //         location: {
    //             bearing: 120,
    //             center: [-122.3955095, 37.7955745],
    //             zoom: 17.3,
    //             pitch: 60
    //         }
    //     },
    //     {
    //         title: 'market-street',
    //         location: {
    //             bearing: 90,
    //             center: [-122.4025016, 37.789555],
    //             zoom: 14.3,
    //             pitch: 20
    //         }
    //     }
    ]
}

// Set config starting location
// if (config.scrollytelling) {
//     config.startingPos = scrollConfig.chapters[0].location.center;
//     config.startingZoom = scrollConfig.chapters[0].location.zoom;
//     config.startingBearing = scrollConfig.chapters[0].location.bearing;
//     config.startingPitch = scrollConfig.chapters[0].location.pitch;
// }