// Define Tilesets
const Tiles = {
  TIME_ZONES: 'mapbox://antadam127.142r7jdg',
  COUNTRIES: 'mapbox://antadam127.7qjvpjmo',
  ADMIN_ONE: 'mapbox://antadam127.5j1xrq5t',
  USA_COUNTIES: 'mapbox://antadam127.dxvrpiet',
}

// Define Styles
const Mapbox_Streets = [0, 'Street', 'mapbox://styles/mapbox/streets-v12'];
const Mapbox_Outdoors = [1, 'Outdoors', 'mapbox://styles/mapbox/outdoors-v12', 'day'];
const Layered_Outdoors_No_Hillshading = [10, 'Topography', 'mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g', 'day'];
const Layered_Hillshading_Demo = [12, 'Terrain', 'mapbox://styles/antadam127/cl5gh13uw000515mqv9y7emit', 'day'];
const Layered_Contour_Demo = [13, 'Contours', 'mapbox://styles/antadam127/cl5gh49id002315o52g9q0fq3', 'day'];
const Mapbox_Light = [2, 'Light', 'mapbox://styles/mapbox/light-v11', 'dayBright'];
const Mapbox_Dark = [3, 'Dark', 'mapbox://styles/mapbox/dark-v11', 'night'];
const Mapbox_Satellite_Streets = [5, 'Satellite', 'mapbox://styles/mapbox/satellite-streets-v12'];
const Layered_Satellite_Less_Labels = [11, 'Satellite (No City Labels)', 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y', 'space'];
const Mapbox_Satellite_Clear = [4, 'Satellite (Clear)', 'mapbox://styles/mapbox/satellite-v9', 'space'];
const Mapbox_Navigation_Day = [6, 'Navigation', 'mapbox://styles/mapbox/navigation-day-v1', 'dayBright'];
const Mapbox_Navigation_Night = [7, 'Navigation (Night)', 'mapbox://styles/mapbox/navigation-night-v1', 'night'];
const Moonlight = [8, 'Moonlight', 'mapbox://styles/antadam127/cl4yfem29005b15p9ltlrd9oy', 'space'];
const Moonlight_No_Labels = [9, 'Moonlight (Clear)', 'mapbox://styles/antadam127/cl4yjh0sd000115mnv3lowqwo', 'space'];
const Mapbox_Bathymetry = [14, 'Bathymetry', 'mapbox://styles/antadam127/cl5klbztx001g14jh6d0v0l6r', 'dayBright'];
const Clear_Light = [15, 'Clear', 'mapbox://styles/antadam127/cl5ks9bcj002314rofs0vpzdq', 'dayBright'];
const North_Star_Web = [16, 'North Star', 'mapbox://styles/antadam127/cl5m6b2dd004q15pe5lcymeft'];
const Mineral_Web = [17, 'Mineral', 'mapbox://styles/antadam127/cl5m6bsvi003516nyf96gv0v7'];
const Cali_Terrain_Web = [18, 'Cali Terrain', 'mapbox://styles/antadam127/cl5m6exed000914pbecmiw3jh', 'space'];
const Le_Shine_Web = [19, 'Le Shine', 'mapbox://styles/antadam127/cl5m6f4he008914ptbtszn1pm'];
const Standard_Textured_Web = [20, 'Standard Textured', 'mapbox://styles/antadam127/cl5m67jod001f15mm3uvnq0bf', 'day'];
const Minimo_Web = [21, 'Minimo', 'mapbox://styles/antadam127/cl5m69f5b003214ninu2bpe0c'];
const Frank_Web = [22, 'Frank', 'mapbox://styles/antadam127/cl5m671b1004a14owdr6m5j4s'];
const Bubble_Web = [23, 'Bubble', 'mapbox://styles/antadam127/cl5m66hm9000816l6gb6q0l7z', 'sunset'];
const Blueprint_Web = [24, 'Blueprint', 'mapbox://styles/antadam127/cl5m668v5003416nyp7lt28i7', 'space'];
const Pencil_Web = [25, 'Pencil', 'mapbox://styles/antadam127/cl5m730r3001514mkb8xhqolh'];
const Treasure_Web = [26, 'Treasure', 'mapbox://styles/antadam127/cl5m7488u008a14ptci3cqfqh', 'sunset'];
const Decimal_Web = [27, 'Decimal', 'mapbox://styles/antadam127/cl5m74tqa003616ny2ijuen33', 'space'];
const Eighties_Web = [28, "80's 8-Bit", 'mapbox://styles/antadam127/cl5m75zlm004b14ow9jmzhy2e', 'space'];
const Picture_Book_Web = [29, 'Picture Book', 'mapbox://styles/antadam127/cl5m7birl003314nildoyar2q', 'dayBright'];
const Satellite_Saturated_Clear = [30, 'Satellite Saturated (Clear)', 'mapbox://styles/antadam127/cl5n09zdb009b14ptd5u9o4m0', 'space'];
const Upside_Down_Web = [31, 'Upside Down', 'mapbox://styles/antadam127/cl5m7cd48000514s241wjk1jq', 'night'];
const Custom_Map = [32, 'My Custom', 'mapbox://styles/antadam127/cl5m8oyet006514l1mwq008sm', 'custom'];

const allMapStyles = [Mapbox_Streets, Mapbox_Outdoors, Mapbox_Light, Mapbox_Dark, Mapbox_Satellite_Clear, Mapbox_Satellite_Streets, Mapbox_Navigation_Day, Mapbox_Navigation_Night, Moonlight, Moonlight_No_Labels, Layered_Outdoors_No_Hillshading, Layered_Satellite_Less_Labels, Layered_Hillshading_Demo, Layered_Contour_Demo, Mapbox_Bathymetry, Clear_Light, North_Star_Web, Mineral_Web, Cali_Terrain_Web, Le_Shine_Web, Standard_Textured_Web, Minimo_Web, Frank_Web, Bubble_Web, Blueprint_Web, Pencil_Web, Treasure_Web, Decimal_Web, Eighties_Web, Picture_Book_Web, Satellite_Saturated_Clear, Upside_Down_Web, Custom_Map];

const styleOptions = [-1]; // [0, 2, 3, 1, 10, 5, 8]; // [-1] - All | [] - None | [0,1,2...] // Radio Button Items

// Define Fog Properties
fogStyles = {
  standard: {},
  dayBright: {
    'horizon-blend': 0.3,
    'color': 'white',
    'high-color': '#add8e6',
    'space-color': '#d8f2ff',
    'star-intensity': 0.0
  },
  day: {
    'horizon-blend': 0.2,
    'color': '#f8f0e3',
    'high-color': '#add8e6',
    'space-color': '#d8f2ff',
    'star-intensity': 0.0
  },
  sunset: {
    "range": [0.8, 8],
    "color": "#dc9f9f",
    "horizon-blend": 0.5,
    "high-color": "#245bde",
    "space-color": "#000000",
    "star-intensity": 0.15
  },
  night: {
    'range': [1, 6],
    'horizon-blend': 0.3,
    'color': '#242B4B',
    'high-color': '#161B36',
    'space-color': '#0B1026',
    'star-intensity': 0.8
  },
  space: {
    'color': 'rgba(186, 210, 235, 0.25]]])', // Lower atmosphere
    'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
    'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
    'space-color': 'rgb(11, 11, 25)', // Background color
    'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
  },
}

const allFogStyles = ['standard', 'dayBright', 'day', 'sunset', 'night', 'space'];


// Define extra
const random = 'random';
const americaBounds = [
  [-124.609, 24.528], // southwestern corner
  [-66.871, 49.388] // northeastern corner
]