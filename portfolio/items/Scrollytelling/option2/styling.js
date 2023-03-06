let currentStyle = config.startingStyle;
let currentFog = 'standard';

// Add Keyboard Listeners
if (config.fogStyleOptions.enableKeyboardFogToggling) {
    document.addEventListener('keydown', (e) => {
        if (e.key == '|') {
            for (let i = 0; i < allFogStyles.length; i++) {
                if (allFogStyles[i] == currentFog) {
                    currentFog = allFogStyles[(i + 1) % allFogStyles.length];
                    console.log(currentFog);
                    map.setFog(fogStyles[currentFog]);
                    return;
                }
            }
        }
    });
}

// Set Fog
function setFogStyle(style) {
    console.log('Fog Set:', config.fogStyle === 'default' ? style.length >= 4 ? style[3] : 'standard' : config.fogStyle);
    if (config.fogStyle === 'custom') {
        return;
    } else if (config.fogStyle === 'default') {
        for (const s of allMapStyles) {
            if (s === style) {
                if (s.length > 3) {
                    if (s[3] === 'custom') return;
                    else map.setFog(fogStyles[s[3]]);
                } else map.setFog(fogStyles['standard']);
                return;
            }
        }
    } else {
        map.setFog(fogStyles[config.fogStyle]);
    }
}

// Add Terrain
function addTerrain() {
    console.log(`Terrain Added - ${config.terrainOptions.exaggeration}x Exaggeration`);
    if (map.getStyle().terrain) {
        console.log('Style Already Has Terrain');
        return;
    }
    // Add Source
    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
    });
    // Add the DEM source as a terrain layer
    map.setTerrain({
        'source': 'mapbox-dem',
        'exaggeration': config.terrainOptions.exaggeration // 1.5 Default
    });
}

// Add Layer Function
function addLayerBelow(layersAbove, newLayer, exactMatch) {
    // Find layer to insert below
    const layers = map.getStyle().layers;
    let layerId = null;
    if (layersAbove[0] !== '') {
        for (const layer of layersAbove) {
            const matchingLayers = layers.filter(
                (l) => exactMatch ? l.id == layer : l.id.includes(layer)
            );
            if (matchingLayers.length > 0) {
                layerId = matchingLayers[0].id;
                break;
            }
        }
    }
    // Add Layer
    map.addLayer(newLayer, layerId);
}

// Add Hillshading
function addHillshading() {
    // Find layers with hillshading
    const hillshadeLayers = map.getStyle().layers.filter(
        (layer) => layer.id.includes('hillshad') || layer.type.includes('hillshad')
    )
    // Define possible entry points
    let layerIds = ['waterway-river-canal-shadow', 'waterway', 'water', 'label'];
    if (hillshadeLayers.length > 0) layerIds = [hillshadeLayers[hillshadeLayers.length - 1].id];

    if (hillshadeLayers.length == 0 || (hillshadeLayers.length > 0 && config.hillshadeOptions.overrideExistingHillshade)) {
        // Add Source and Layer
        map.addSource('dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1'
        });
        addLayerBelow(layerIds, {
            'id': 'hillshading-userAdded',
            'source': 'dem',
            'type': 'hillshade'
        });

        // Remove Previous hillshade layers
        for (const layer of hillshadeLayers) {
            map.removeLayer(layer.id);
        }

        if (hillshadeLayers.length == 0) console.log('Hillshade Layer Added');
        else console.log('Hillshade Layer Overriden');
    } else console.log('Hillshade Layer Not Overridden');

}

// Add Contours
function addContours() {
    // Find layer to insert below
    const layers = map.getStyle().layers;
    const contourLayers = layers.filter(
        (layer) => layer.id.includes('contour') && (config.contourOptions.removeLabels || layer.type == 'line')
    );
    let labelLayerId = ['hillshad', 'label'];
    if (contourLayers.length > 0) labelLayerId = [contourLayers[0].id];

    if (contourLayers.length == 0 || (contourLayers.length > 0 && config.contourOptions.overrideExistingContours)) {
        // Add Source
        map.addSource('contours', {
            type: 'vector',
            url: 'mapbox://mapbox.mapbox-terrain-v2'
        });
        // AddLayer
        addLayerBelow(labelLayerId, {
            'id': 'contours-userAdded',
            'type': 'line',
            'source': 'contours',
            'source-layer': 'contour',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': config.contourOptions.color,
                'line-width': config.contourOptions.lineWidth,
                'line-opacity': config.contourOptions.opacity,
                // 'line-gap-width': 2,
            }
        });

        // Remove Previous Contour layers
        for (const layer of contourLayers) {
            map.removeLayer(layer.id);
        }

        if (contourLayers.length == 0) console.log('Contour Layer Added');
        else console.log('Contour Layer Overriden');
    } else console.log('Contour Layer Not Overridden');

}

// Add Bathymetry Data
function addBathymetry() {
    const allLayers = map.getStyle().layers;

    // Find layers with hillshading
    const bathLayers = allLayers.filter(
        (layer) => layer.id == 'water' || layer.id == 'water-depth' || layer.id.includes('bathymetry')
    )

    // Define possible entry points
    let layerIds = ['tunnel', 'bridge', 'water', 'label'];
    if (bathLayers.length > 0) {
        // Find next layer
        for (let i = 0; i < allLayers.length; i++) {
            if (allLayers[i].id == bathLayers[bathLayers.length - 1].id) {
                if (i == allLayers.length - 1) layerIds = [''];
                else layerIds = [allLayers[i + 1].id];
                break;
            }
        }
    }

    // Add Source and Layer
    map.addSource('bathymetry', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-bathymetry-v2'
    });
    addLayerBelow(layerIds, {
        'id': 'water-depth-userAdded',
        'type': 'fill',
        'source': 'bathymetry',
        'source-layer': 'depth',
        // 'layout': {},
        'paint': {
            'fill-color': [
                'interpolate',
                ['cubic-bezier', 0, 0.5, 1, 0.5],
                ['get', 'min_depth'],
                200,
                '#78bced',
                9000,
                '#15659f'
            ]
        }
    });

    console.log('Bathymetry Layer Added');
}

// Add 3D Buildings
function add3DBuildings() {
    const color = '#aaa';
    const heightMultiplier = 1;

    // Check if Style contains Composite
    let ctn = false;
    for (const source in map.getStyle().sources) {
        if (source == 'composite') {
            ctn = true;
            break;
        }
    }

    if (ctn) {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const buildingLayers = layers.filter(
            (layer) => config.buildingOptions.insertBehindLabels && layer.type === 'symbol' && layer.layout['text-field']
        );
        let labelLayerId = null;
        if (buildingLayers.length > 0) labelLayerId = buildingLayers[0].id;
        map.addLayer({
            'id': '3d-buildings-userAdded',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': color,
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15, 0, 15.05, ['*', ['get', 'height'], heightMultiplier]
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15, 0, 15.05, ['*', ['get', 'min_height'], heightMultiplier]
                ],
                'fill-extrusion-opacity': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15, 0, 15.25, config.buildingOptions.oppacity3D ? config.buildingOptions.oppacity3D : 0.6
                ]
            }
        },
            labelLayerId
        );
        console.log('3D Buildings Added -', config.buildingOptions.insertBehindLabels ? 'Beneath Labels' : 'In Front of Labels');
    } else console.log('Failed to Import 3D Buildings - Does Not Exist in Style')

}

// Add Satellite Imagery
function addSatellite() {
    const minzoom = config.satelliteFadeOptions.satelliteMinzoom;
    const fadeamt = config.satelliteFadeOptions.satelliteFadeamt;
    // Find layer to insert below
    const layers = map.getStyle().layers;
    const satLayers = layers.filter(
        (layer) => layer['source-layer'] === 'admin'
    );
    let labelLayerId = null;
    if (satLayers.length > 0) labelLayerId = satLayers[0].id;
    // Add Source
    map.addSource('sat', {
        'type': 'raster',
        'url': 'mapbox://mapbox.satellite',
        'tileSize': 256,
    });
    // Add Layer
    map.addLayer({
        'id': 'satellite-userAdded',
        'source': 'sat',
        'type': 'raster',
        'minzoom': minzoom ? minzoom : 14.5,
        'paint': {
            'raster-opacity': [
                'interpolate',
                ['linear'],
                ['zoom'],
                minzoom ? minzoom : 14.5,
                0,
                minzoom ? minzoom + (fadeamt ? fadeamt : 2) : 16.5,
                1
            ]
        }
    }, labelLayerId);
    console.log(`Satellite Fade Set Up - Zoom Level ${minzoom}`);
}
