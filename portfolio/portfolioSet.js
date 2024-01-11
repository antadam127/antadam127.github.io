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
        percent: 92,
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
        percent: 91,
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
        title: 'NASA Satellite Raster Tiling',
        title2: 'NASA Black Marble Satellite Image Dataset',
        tags: ['GIS'],
        desc: 'This is a Mapbox Vizualization of the Earth at Night. The dataset is created with the NASA Visible Infrared Imaging Radiometer Suite (VIIRS) instrument, a component of the Suomi National Polar-orbiting Partnership (NPP) satellite.',
        desc2: 'This project utilizes Mapbox and the "Black Marble" external dataset provided by NASA. The imagery is provided in multiple images of the Earth so they had to be stitched together before they could be used. The raster image fades out as the user zooms in revealing daytime Satellite imagery. In another project I did a similar process with NASA data collected over the 12 months of the year and dynamically show them. That project can be viewed at the "Alternate Link" below.',
        skills: ['Javascript', 'Mapbox', 'HTML'],
        externalSite: 'items/mapbox-config/index-mapbox-config.html?c=black-marble',
        externalSite2: 'items/mapbox-config/index-mapbox-config.html?c=blue-planet-rotation',
        main: {
            type: 'iframe', // 'iframe', 'script'
            src: 'items/mapbox-config/index-mapbox-config.html?c=black-marble&iframe=true',
        }
    },
    {
        id: 'linkedin',
        title: 'LinkedIn Tech Industry Visualization',
        title2: 'Where are Penn State Technology Graduates Working?',
        tags: ['GIS', 'Scraped', 'Featured'],
        desc: 'This project vizualizes where Penn State alumni in the Tech Industry work.',
        desc2: `To visualize where Penn State Alumni work, I scraped LinkedIn using a Python script. This is a snapshot of the Penn State alumni base and includes about 1,000 individual datapoints. Once the data was secured I cleaned it into a usable format. I added some variablity to the location to increase the interest of the vizualization. For example, zoom into a large city like New York City... the variation seen here is purely random as the only location datapoint in most cases was "New York, NY" and without this variation all datapoints with the same label would clump to one spot. I used QGIS to check to make sure each datapoint was over land and not over rivers, lakes, or other water. Once each datapoint was valid I used Mapbox to visualize my fellow Alumni. (Since this project's creation the ability to pull a user's profile image from the web has been stopped by LinkedIn, that is why all profile images are default images.)`,
        skills: ['Python', 'Web Scraping', 'QGIS', 'Javascript', 'Mapbox', 'HTML'],
        externalSite: 'items/index-linkedin.html',
        main: {
            type: 'iframe', // 'iframe', 'script'
            src: 'items/index-linkedin.html?iframe=true',
        }
    },
    // {
    //     id: 'weather',
    //     title: 'Current Weather',
    //     title2: 'Black Marble',
    //     tags: ['GIS'],
    //     desc: 'This is a Mapbox Visualization using the NASA Visible Infrared Imaging Radiometer Suite (VIIRS) instrument, a component of the Suomi National Polar-orbiting Partnership (NPP) satellite. VIIRS consists of 22 spectral bands from the ultra-violet to the mid-infrared, one of which is able to observe nighttime lights, the day night band (DNB). DNB is a panchromatic band sensitive to visible and near-infrared wavelengths.',
    //     desc2: 'This project utilizes Mapbox and the external dataset provided by NASA. The raster image fades out as the user zooms in reveal the Satellite data.',
    //     skills: ['Javascript', 'Mapbox', 'HTML'],
    //     externalSite: 'items/mapbox-config/index-mapbox-config.html?c=current-weather',
    //     main: {
    //         type: 'iframe', // 'iframe', 'script'
    //         src: 'items/mapbox-config/index-mapbox-config.html?c=current-weather&iframe=true',
    //     }
    // },
    {
        id: 'globalsc',
        title: 'Global State College Website',
        title2: 'School Project Website',
        tags: ['Web/Dev', 'GIS'],
        desc: 'This project is a fully functioning website/blog created as an assignment for Professor Bill Zimmerman at Penn State. While at school in State College, I was able to try many different international cuisines with my friends. These blog posts document my findings and this was a very fun project to make. (Recomended to view in new tab by clicking "Visit Site".)',
        desc2: 'This website runs on Bootstrap which is the same framework used to create this portfolio. The filters and categories are all functional and are created programatically on site load. All data is stored locally in a json file. I used the same data to create a story project which can be viewed at the "Alternate Link".',
        skills: ['HTML', 'Bootstrap', 'Javascript'],
        externalSite: 'items/Global State College Blog/index.html',
        externalSite2: 'items/Scrollytelling/option2/index.html',
        main: {
            type: 'iframe', // 'iframe', 'script'
            src: 'items/Global State College Blog/index.html?iframe=true',
        }
    },
    // {
    //     id: 'globalmapstory',
    //     title: 'Global Map Story',
    //     title2: 'Black Marble',
    //     tags: ['GIS', 'Web/Dev'],
    //     desc: 'This is a Mapbox Visualization using the NASA Visible Infrared Imaging Radiometer Suite (VIIRS) instrument, a component of the Suomi National Polar-orbiting Partnership (NPP) satellite. VIIRS consists of 22 spectral bands from the ultra-violet to the mid-infrared, one of which is able to observe nighttime lights, the day night band (DNB). DNB is a panchromatic band sensitive to visible and near-infrared wavelengths.',
    //     desc2: 'This project utilizes Mapbox and the external dataset provided by NASA. The raster image fades out as the user zooms in reveal the Satellite data.',
    //     skills: ['Javascript', 'Mapbox', 'HTML'],
    //     externalSite: 'items/Scrollytelling/option2/index.html',
    //     main: {
    //         type: 'iframe', // 'iframe', 'script'
    //         src: 'items/Scrollytelling/option2/index.html?iframe=true',
    //     }
    // },
    {
        id: 'tensorflow',
        title: 'TensorFlow Image Recognition',
        title2: 'TensorFlow.js',
        tags: ['AI'],
        desc: "This project uses TensorFlow's pre trained image recognition model and the webcam to recognize images put in front of it.",
        desc2: 'TensorFlow.js is a machine learning library. It has various different pre trained models. I am using this model as is with no modifications. It will be interesting to use other TensorFlow models including image classification, object detection, speech recognition, text toxicity detection, and of course natural language processing in other projects.',
        skills: ['Javascript', 'TensorFlow.js', 'HTML'],
        externalSite: false,
        // externalSite: 'items/object classification/index.html',
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
        desc2: 'This project utilizes Deck.GL, which is a very powerful GIS visualization tool. Deck.gl is an open source project, originally created by Uber. It has some of the most advanced capabilities in the industry. While this visualization is interesting, it is also quite busy and Deck.GL is certainly capable of much more. Python was also used to scrape data from the web and combine sources to achieve a workable dataset. HTML and Javascript were combined to create a robust interaction interface.',
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
        title2: 'OpenAI API PDF Reader',
        tags: ['Web/Dev', 'AI'],
        desc: "This project uses the OpenAI API and is a fully functional chatbot. Upload a PDF and it will be able to parse and read the pdf and answer questions about it.",
        desc2: 'The chatbot is running on the GPT-3.5 model from OpenAI. It is constantly attempting to provide useful autofills on what the user might want to know. Press the tab key when the model has come up with a suggestion or start typing and then clear the input bar to generate a new suggestion.',
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
        title2: 'Soft Drink Sales Data Dashboard',
        tags: ['Tableau'],
        desc: "This project uses company data in a KPI Dashboard.",
        desc2: 'The data used here is dummy data on soft drink sales.',
        skills: ['Tableau'],
        externalSite: 'https://public.tableau.com/views/SoftDrinkData/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link',
        // externalSite2: 'items/Tableau/soft_drink_sales.csv',
        main: {
            type: 'script', // 'iframe', 'script'
            src: `<div class='tableauPlaceholder' id='viz1701844214187' style='position: relative'><noscript><a href='#'><img alt='Dashboard 1 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;So&#47;SoftDrinkData&#47;Dashboard1&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='SoftDrinkData&#47;Dashboard1' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;So&#47;SoftDrinkData&#47;Dashboard1&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /><param name='filter' value='publish=yes' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1701844214187');                    var vizElement = divElement.getElementsByTagName('object')[0];                    vizElement.style.minWidth='700px';vizElement.style.maxWidth='1500px';vizElement.style.width='100%';vizElement.style.minHeight='527px';vizElement.style.maxHeight='1027px';vizElement.style.height='100%';                    var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>`,
        }
    },
    {
        id: 'migrationtableau',
        title: 'Tableau Dashboard',
        title2: 'United States Internal Migration Analysis',
        tags: ['Tableau'],
        desc: "This project shows where people are moving to within the United States.",
        desc2: 'The data used here is the IRS reports for the years stated. This was a very large dataset that required a lot of work to get both directions working (Immigrating and emigrating). You can view the data at the "Alternate Link".',
        skills: ['Tableau', 'Python'],
        externalSite: 'https://public.tableau.com/views/USMigrationData/Dashboard12?:language=en-US&:display_count=n&:origin=viz_share_link',
        externalSite2: 'items/Tableau/irs_US_state_migraion_data.csv',
        main: {
            type: 'script', // 'iframe', 'script'
            src: `<div class='tableauPlaceholder' id='viz1704977063451' style='position: relative'><noscript><a href='#'><img alt='Dashboard 1 (2) ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;US&#47;USMigrationData&#47;Dashboard12&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='USMigrationData&#47;Dashboard12' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;US&#47;USMigrationData&#47;Dashboard12&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /><param name='filter' value='publish=yes' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1704977063451');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.minWidth='720px';vizElement.style.maxWidth='1800px';vizElement.style.width='100%';vizElement.style.minHeight='487px';vizElement.style.maxHeight='1500px';vizElement.style.height='100%';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.minWidth='720px';vizElement.style.maxWidth='1500px';vizElement.style.width='100%';vizElement.style.minHeight='487px';vizElement.style.maxHeight='787px';vizElement.style.height='100%';} else { vizElement.style.width='100%';vizElement.style.height='877px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>`
        }
    },
];

// Featured
let showFeatMode = false; // Show Featured Option?
let startOnFeatMode = false; // Start on Featured Option?

let includeFeat = false; // DONT TOUCH
portfolio.forEach(e => {
    if (!showFeatMode) e.tags = e.tags.filter(e => e !== 'Featured');
    e.tags.forEach(t => {
        if (t == 'Featured') includeFeat = true;
        else if (!filters.includes(t)) filters.push(t);
    });
});
filters.sort();
if (includeFeat && showFeatMode) filters.unshift('Featured'); // Adds 'Featured' to the begining
