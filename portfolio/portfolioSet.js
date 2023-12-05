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
        percent: 96,
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
    {
        id: 'nbaanalysis',
        title: 'NBA Player Movement',
        title2: 'NBA Analysis',
        tags: ['GIS', 'Scraped'],
        desc: "This project was inspired by MARCH MADNESS. I found it interesting to compare NBA Players' Hometowns, Colleges, and most recent NBA Teams to view the players' paths across the country.",
        desc2: 'This project utilizes Deck.GL, which is a very powerful GIS visualization tool. Deck.gl is an open source project, originally sponsored by Uber. It has some of the most advanced capabilities in the industry. While this visualization is interesting, Deck.GL is certainly capable of much more. Python was also used to scrape data from the web and combine sources to achieve a workable dataset.',
        skills: ['Javascript', 'Mapbox', 'Deck.GL', 'Python', 'HTML'],
        externalSite: 'items/NBA Analysis/index.html',
        main: {
            type: 'iframe', // 'iframe', 'script'
            src: 'items/NBA Analysis/index.html?iframe=true',
        }
    },
    {
        id: 'openai',
        title: 'OpenAI PDF Reader & Chatbot',
        title2: 'OpenAI  API PDF Reader',
        tags: ['Web/Dev', 'AI'],
        desc: "This project was inspired by MARCH MADNESS. I found it interesting to compare NBA Players' Hometowns, Colleges, and most recent NBA Teams to view the players' paths across the country.",
        desc2: 'This project utilizes Deck.GL, which is a very powerful GIS visualization tool. Deck.gl is an open source project, originally sponsored by Uber. It has some of the most advanced capabilities in the industry. While this visualization is interesting, Deck.GL is certainly capable of much more. Python was also used to scrape data from the web and combine sources to achieve a workable dataset.',
        skills: ['Javascript', 'OpenAI', 'API Management', 'HTML'],
        externalSite: 'items/gpt chatbot/index.html',
        main: {
            type: 'iframe', // 'iframe', 'script'
            src: 'items/gpt chatbot/index.html?iframe=true',
        }
    },
    {
        id: 'softdrinktableau',
        title: 'Tableau Dashboard',
        title2: 'Soft Drink Sales Dashboard',
        tags: ['Tableau'],
        desc: "LOREM",
        desc2: 'IPSUM',
        skills: ['Tableau'],
        externalSite: 'https://public.tableau.com/views/SoftDrinkData/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link',
        main: {
            type: 'script', // 'iframe', 'script'
            src: `<div class='tableauPlaceholder' id='viz1701743790100' style='position: relative'><noscript><a href='#'><img alt='Dashboard 1 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;So&#47;SoftDrinkData&#47;Dashboard1&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='SoftDrinkData&#47;Dashboard1' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;So&#47;SoftDrinkData&#47;Dashboard1&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /><param name='filter' value='publish=yes' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1701743790100');                    var vizElement = divElement.getElementsByTagName('object')[0];                    vizElement.style.minWidth='900px';vizElement.style.maxWidth='1500px';vizElement.style.width='100%';vizElement.style.minHeight='527px';vizElement.style.maxHeight='1027px';vizElement.style.height='100%';                    var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>`,
        }
    },
];

portfolio.forEach(e => {
    e.tags.forEach(t => {
        if (!filters.includes(t)) filters.push(t);
    });
});
filters.sort();