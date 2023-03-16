const skills = [
    {
        skill: 'Python',
        percent: 92,
        link: 'https://www.python.org/'
    },
    {
        skill: 'Javascript',
        percent: 96,
        link: 'https://developer.mozilla.org/en-US/docs/Web/javascript'
    },
    {
        skill: 'Web Scraping',
        percent: 84,
    },
    {
        skill: 'SQL',
        percent: 82,
        link: 'https://dev.mysql.com/doc/'
    },
    {
        skill: 'HTML',
        percent: 85,
        link: ''
    },
    {
        skill: 'TensorFlow.js',
        percent: 68,
        link: 'https://www.tensorflow.org/js'
    },
    {
        skill: 'Tableau',
        percent: 93,
        link: 'https://www.tableau.com/'
    },
    {
        skill: 'Plotly',
        percent: 84,
        link: 'https://plotly.com/'
    },
    {
        skill: 'D3.js',
        percent: 88,
        link: 'https://d3js.org/'
    },
    {
        skill: 'Mapbox GL.js',
        percent: 90,
        link: 'https://www.mapbox.com/mapbox-gljs'
    },
    {
        skill: 'RapidMiner Studio',
        percent: 86,
        link: 'https://rapidminer.com/platform/'
    },
];

const portfolio_old_for_reference = [
    {
        name: "Country Populations",
        image: "country-populations.jpg",
        url: "more/portfolio/mapbox/index.html?c=country-populations",
        description: "Map of Country Populations",
        tags: ["mapbox"],
    },
    {
        name: "Urban Areas",
        image: "urban-areas.jpg",
        url: "more/portfolio/mapbox/index.html?c=urban-areas",
        description: "Map of Urban Areas around the World",
        tags: ["mapbox"],
    },
    {
        name: "Portfolio Item",
        image: "",
        url: "",
        description: "",
        tags: ["html"],
    },
    {
        name: "Another Item",
        image: "",
        url: "",
        description: "",
        tags: ["html"],
    },
    {
        name: "Different Title",
        image: "",
        url: "",
        description: "",
        tags: ["wordpress", "html"],
    },
    {
        name: "Different Title!!!!",
    },
    {
        name: "Different Title",
        image: "",
        url: "",
        description: "",
        tags: ["wordpress", "html"],
    },
];

// const filters = ["GIS", "Web Scraped"];
const filters = [];

const portfolio = [
    {
        id: 'blackmarble',
        title: 'Earth At Night',
        title2: 'Black Marble',
        tags: ['GIS'],
        desc: 'This is a Mapbox Visualization using the NASA Visible Infrared Imaging Radiometer Suite (VIIRS) instrument, a component of the Suomi National Polar-orbiting Partnership (NPP) satellite. VIIRS consists of 22 spectral bands from the ultra-violet to the mid-infrared, one of which is able to observe nighttime lights, the day night band (DNB). DNB is a panchromatic band sensitive to visible and near-infrared wavelengths.',
        desc2: 'This project utilizes Mapbox and the external dataset provided by NASA. The raster image fades out as the user zooms in reveal the Satellite data.',
        skills: ['Javascript', 'Mapbox', 'HTML'],
        externalSite: 'items/mapbox-config/index-mapbox-config.html?c=black-marble',
        main: {
            type: 'iframe', // 'iframe', 'script'
            src: 'items/mapbox-config/index-mapbox-config.html?c=black-marble&iframe=true',
        }
    },
    {
        id: 'linkedin',
        title: 'LinkedIn Visualization',
        title2: 'Penn State Graduates Technology Industry LinkedIn Visualization',
        tags: ['GIS', 'Scraped'],
        desc: 'This is a Mapbox Visualization using the NASA Visible Infrared Imaging Radiometer Suite (VIIRS) instrument, a component of the Suomi National Polar-orbiting Partnership (NPP) satellite. VIIRS consists of 22 spectral bands from the ultra-violet to the mid-infrared, one of which is able to observe nighttime lights, the day night band (DNB). DNB is a panchromatic band sensitive to visible and near-infrared wavelengths.',
        desc2: 'This project utilizes Mapbox and the external dataset provided by NASA. The raster image fades out as the user zooms in reveal the Satellite data.',
        skills: ['Web Scraping', 'Javascript', 'Mapbox', 'HTML'],
        externalSite: 'items/index-linkedin.html',
        main: {
            type: 'iframe', // 'iframe', 'script'
            src: 'items/index-linkedin.html?iframe=true',
        }
    },
    {
        id: 'weather',
        title: 'Current Weather',
        title2: 'Black Marble',
        tags: ['GIS'],
        desc: 'This is a Mapbox Visualization using the NASA Visible Infrared Imaging Radiometer Suite (VIIRS) instrument, a component of the Suomi National Polar-orbiting Partnership (NPP) satellite. VIIRS consists of 22 spectral bands from the ultra-violet to the mid-infrared, one of which is able to observe nighttime lights, the day night band (DNB). DNB is a panchromatic band sensitive to visible and near-infrared wavelengths.',
        desc2: 'This project utilizes Mapbox and the external dataset provided by NASA. The raster image fades out as the user zooms in reveal the Satellite data.',
        skills: ['Javascript', 'Mapbox', 'HTML'],
        externalSite: 'items/mapbox-config/index-mapbox-config.html?c=current-weather',
        main: {
            type: 'iframe', // 'iframe', 'script'
            src: 'items/mapbox-config/index-mapbox-config.html?c=current-weather&iframe=true',
        }
    },
    {
        id: 'globalsc',
        title: 'Global State College',
        title2: 'Black Marble',
        tags: ['Web/Dev'],
        desc: 'This is a Mapbox Visualization using the NASA Visible Infrared Imaging Radiometer Suite (VIIRS) instrument, a component of the Suomi National Polar-orbiting Partnership (NPP) satellite. VIIRS consists of 22 spectral bands from the ultra-violet to the mid-infrared, one of which is able to observe nighttime lights, the day night band (DNB). DNB is a panchromatic band sensitive to visible and near-infrared wavelengths.',
        desc2: 'This project utilizes Mapbox and the external dataset provided by NASA. The raster image fades out as the user zooms in reveal the Satellite data.',
        skills: ['Javascript', 'Mapbox', 'HTML'],
        externalSite: 'items/Global State College Blog/index.html',
        main: {
            type: 'iframe', // 'iframe', 'script'
            src: 'items/Global State College Blog/index.html?iframe=true',
        }
    },
    {
        id: 'globalmapstory',
        title: 'Global Map Story',
        title2: 'Black Marble',
        tags: ['GIS', 'Web/Dev'],
        desc: 'This is a Mapbox Visualization using the NASA Visible Infrared Imaging Radiometer Suite (VIIRS) instrument, a component of the Suomi National Polar-orbiting Partnership (NPP) satellite. VIIRS consists of 22 spectral bands from the ultra-violet to the mid-infrared, one of which is able to observe nighttime lights, the day night band (DNB). DNB is a panchromatic band sensitive to visible and near-infrared wavelengths.',
        desc2: 'This project utilizes Mapbox and the external dataset provided by NASA. The raster image fades out as the user zooms in reveal the Satellite data.',
        skills: ['Javascript', 'Mapbox', 'HTML'],
        externalSite: 'items/Scrollytelling/option2/index.html',
        main: {
            type: 'iframe', // 'iframe', 'script'
            src: 'items/Scrollytelling/option2/index.html?iframe=true',
        }
    },
    {
        id: 'tensorflow',
        title: 'TensorFlow Image Recognition',
        title2: 'Black Marble',
        tags: ['AI'],
        desc: 'This is a Mapbox Visualization using the NASA Visible Infrared Imaging Radiometer Suite (VIIRS) instrument, a component of the Suomi National Polar-orbiting Partnership (NPP) satellite. VIIRS consists of 22 spectral bands from the ultra-violet to the mid-infrared, one of which is able to observe nighttime lights, the day night band (DNB). DNB is a panchromatic band sensitive to visible and near-infrared wavelengths.',
        desc2: 'This project utilizes Mapbox and the external dataset provided by NASA. The raster image fades out as the user zooms in reveal the Satellite data.',
        skills: ['Javascript', 'Mapbox', 'HTML'],
        externalSite: false,
        main: {
            type: 'iframe', // 'iframe', 'script'
            src: 'items/object classification/index.html?iframe=true',
        }
    },
];

portfolio.forEach(e => {
    e.tags.forEach(t => {
        if (!filters.includes(t)) filters.push(t);
    });
});
filters.sort();