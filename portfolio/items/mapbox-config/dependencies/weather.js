// Add Weather
let tickOffset = false;
function addWeather() {
    if (config.weatherOptions.showRadar) addRadar();
    if (config.weatherOptions.showTemp) addWeatherDomEl();
    if (config.weatherOptions.pulseDotOnMove.active) addDot();

    if (config.weatherOptions.showTemp || config.weatherOptions.pulseDotOnMove.active) {
        map.on('moveend', () => {
            getWeather();
        });
        // Get Weather
        getWeather(); // Initial Call
        async function getWeather() {
            const coords = map.getCenter();

            // Change Pulse Location
            if (config.weatherOptions.pulseDotOnMove.active) {
                tickOffset = false;
                map.getSource('dot-point').setData({
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [coords.lng, coords.lat]
                        }
                    }]
                });
                if (map.getLayer('layer-with-pulsing-dot') == undefined) {
                    map.addLayer({
                        'id': 'layer-with-pulsing-dot',
                        'type': 'symbol',
                        'source': 'dot-point',
                        'layout': {
                            'icon-image': 'pulsing-dot'
                        }
                    });
                }
            }

            if (config.weatherOptions.showTemp) {
                // Get Weather Data
                const query = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${config.weatherOptions.weatherAPIKey}&units=${config.weatherOptions.fahrenheit ? 'imperial' : 'metric'}`, {
                    method: 'GET'
                });
                // Search by city: 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}'
                // Forcast: 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

                const data = await query.json();

                const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                const city = data.name;
                const country = data.sys.country;
                const cityCountry = city + (country === undefined || country === 'US' ? '' : ', ' + country);
                const temp = data.main.temp;
                const tempString = temp.toFixed(2) + '°' + (config.weatherOptions.fahrenheit ? 'F' : 'C');
                const feelsLike = data.main.feels_like;
                const weather = data.weather[0].main;
                const description = data.weather[0].description;
                const cloudCover = data.clouds;
                const prevRain = data.rain;
                const prevSnow = data.snow;
                const sunrise = data.sys.sunrise;
                const sunset = data.sys.sunset;

                // console.log('WEATHER');
                // console.log(cityCountry);
                // console.log(temp);
                // console.log(tempString);
                // console.log(weather);
                // console.log(description);
                // console.log(iconUrl);

                const leftSide = true;
                const sz = 36; // 45;
                const imgTag = `<img src="${iconUrl}" alt="" width="${sz}" height="${sz}" />`;
                $('#temperature').html((leftSide ? imgTag : '') + `<span style="padding: 4px ${leftSide ? '8' : '2'}px 4px ${!leftSide ? '8' : '2'}px">` + tempString + '</span>' + (!leftSide ? imgTag : ''));

                const onHover = `<div>${cityCountry}</div><div>${description}</div>`;
                $('#hovertemp').html(onHover);
            }
        }
    }
}

// Add Dom element
function addWeatherDomEl() {
    const el = document.createElement('div');
    el.id = 'temperature';
    el.className = 'temperature-container';

    let corner = 'top:10px;right:10px;'; // 'top-right' (default)
    if (config.weatherOptions.showTemp == 'top-left') corner = 'top:10px;left:10px;';
    if (config.weatherOptions.showTemp == 'bottom-left') corner = 'bottom:10px;left:10px;';
    if (config.weatherOptions.showTemp == 'bottom-right') corner = 'bottom:10px;right:10px;';
    el.setAttribute('style', corner);

    $('body').append(el);

    // Hover Dropdown
    const elHov = document.createElement('div');
    elHov.id = 'hovertemp';
    elHov.className = 'hovertemp-container';

    let hovPos = 'top:46px; right:10px; text-align:right';
    if (config.weatherOptions.showTemp == 'top-left') hovPos = 'top:46px; left:10px; text-align:left';
    if (config.weatherOptions.showTemp == 'bottom-left') hovPos = 'bottom:46px; left:10px; text-align:left';
    if (config.weatherOptions.showTemp == 'bottom-right') hovPos = 'bottom:46px; right:10px; text-align:right';
    elHov.setAttribute('style', hovPos);

    // Set up center target
    if (config.weatherOptions.hoverShowTarget) {
        const target = document.createElement('div');
        target.id = 'center-target';
        // target.innerHTML = '<svg height="6" width="6"><circle cx="3" cy="3" r="2" stroke="black" /></svg>';
        const sz = 18;
        target.innerHTML = `<svg height="${sz}" width="${sz}"><circle cx="${sz / 2}" cy="${sz / 2}" r="${(sz / 2) - 1}" fill="none" stroke="#333" stroke-width="1.5" opacity="0.8" /><circle cx="${sz / 2}" cy="${sz / 2}" r="${0.7 * ((sz / 2) - 1)}" fill="none" stroke="#333" stroke-width="1.5" opacity="0.8" /></svg>`;
        $('body').append(target);
        $("#center-target").hide();
    }

    // Set up hovering callbacks
    if (config.weatherOptions.hoverDropdown || config.weatherOptions.hoverShowTarget) {
        $(".temperature-container").hover(
            () => {
                if (config.weatherOptions.hoverDropdown) $(".hovertemp-container").slideDown(80);
                if (config.weatherOptions.hoverShowTarget) $("#center-target").fadeIn(100);
            }, () => {
                if (config.weatherOptions.hoverDropdown) $(".hovertemp-container").slideUp(200);
                if (config.weatherOptions.hoverShowTarget) $("#center-target").fadeOut(200);
            });
    }

    $('body').append(elHov);

}

// Add Pulsing Dot
function addDot() {
    const size = 2 * config.weatherOptions.pulseDotOnMove.radius;
    const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),
        onAdd: function () {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },
        render: function () {
            if (tickOffset === false) tickOffset = performance.now();
            const tick = performance.now() - tickOffset;
            // const tick = performance.now();
            const duration = config.weatherOptions.pulseDotOnMove.duration;
            // const t = (tick % duration) / duration;
            const t = tick > duration ? 1 : (tick % duration) / duration;
            // console.log(t, tick, performance.now(), tickOffset);

            const innerRatio = 0.3; // Default: 0.3
            const radius = (size / 2) * innerRatio;
            const outerRadius = (size / 2) * (1 - innerRatio) * t + radius;

            const context = this.context;

            // Draw the outer circle.
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2
            );
            context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
            context.fill();

            // // Draw the inner circle.
            // context.beginPath();
            // context.arc(
            //     this.width / 2,
            //     this.height / 2,
            //     radius,
            //     0,
            //     Math.PI * 2
            // );
            // // Draw Fill
            // context.fillStyle = 'rgba(255, 100, 100, 1)';
            // context.fill();
            // // Draw Stroke
            // context.strokeStyle = 'white';
            // context.lineWidth = 2 + 4 * (1 - t);
            // context.stroke();

            // Update this image's data with data from the canvas.
            this.data = context.getImageData(0, 0, this.width, this.height).data;

            // Continuously repaint the map, resulting in the smooth animation of the dot.
            map.triggerRepaint();

            // Return `true` to let the map know that the image was updated.
            if (tick >= duration) {
                tickOffset = false;
                if (config.weatherOptions.pulseDotOnMove.continuous) tickOffset = false;
                else map.removeLayer('layer-with-pulsing-dot');
                return false;
            } else return true;
        }
    };

    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    map.addSource('dot-point', {
        'type': 'geojson',
        'data': {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [0, 0]
                }
            }]
        }
    });
}

// Add Radar
async function addRadar() {
    const layers_new = ['precipitation_new', 'clouds_new', 'temp_new', 'wind_new', 'pressure_new'];
    const layers = ['precipitation', 'clouds', 'temp', 'wind', 'pressure'];
    let layer = config.weatherOptions.showRadar;
    if (config.weatherOptions.showRadar === true) layer = 'precipitation';

    // Insert the layer beneath any symbol layer.
    const buildingLayers = map.getStyle().layers.filter((layer) => layer.type === "symbol" && layer.layout["text-field"]);
    let labelLayerId = null;
    if (config.weatherOptions.insertBehindLabels && buildingLayers.length > 0) labelLayerId = buildingLayers[0].id;

    // To Check for Tomorrow API 
    const tomorrowAPIKey = 'HdFB47bsDIZ77lv7mD6QriQxV5ugKL2q';
    const testAPI = await fetch(`https://api.tomorrow.io/v4/timelines?location=0,0&fields=temperature&timesteps=1h&units=metric&apikey=${tomorrowAPIKey}`, {
        method: 'GET'
    });

    if (testAPI.status == 429) {
        console.log('API LIMIT REACHED | FREE VERSION USED');
        map.addSource('radar', {
            'type': 'raster',
            'tiles': [`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${config.weatherOptions.weatherAPIKey}`],
            'tileSize': 256,
            // 'tileSize': 128,
        });

        // `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${config.weatherOptions.weatherAPIKey}`
        map.addLayer(
            {
                'id': 'radar-layer-userAdded',
                'type': 'raster',
                'source': 'radar',
                // 'paint': {
                //     'raster-hue-rotate': 0,
                // },

                // 'paint': {
                //     'raster-opacity': 0.6;
                //     'raster-scaling': lanczos;
                //     'raster-colorizer-default-mode': linear;
                //     'raster-colorizer-default-color': transparent;
                //     'raster-colorizer-stops':
                //     stop(0, rgba(225, 200, 100, 0)),
                //     stop(0.1, rgba(200, 150, 150, 0)),
                //     stop(0.2, rgba(150, 150, 170, 0)),
                //     stop(0.5, rgba(120, 120, 190, 0)),
                //     stop(1, rgba(110, 110, 205, 0.3)),
                //     stop(10, rgba(80,80, 225, 0.7)),
                //     stop(140, rgba(20, 20, 255, 0.9));
                // },
                // 0.000005:#FEF9CA; 0.000009:#B9F7A8; 0.000014:#93F57D; 0.000023:#78F554; 0.000046:#50B033; 0.000092:#387F22; 0.000231:#204E11; 0.000463:#F2A33A; 0.000694:#E96F2D; 0.000926:#EB4726; 0.001388:#B02318; 0.002315:#971D13; 0.023150:#090A08;
            }, labelLayerId
        );
    } else {
        const DATA_FIELD = 'precipitationIntensity';
        const TIMESTAMP = (new Date()).toISOString();
        map.addSource('radar', {
            'type': 'raster',
            'tiles': [`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${DATA_FIELD}/${TIMESTAMP}.png?apikey=${tomorrowAPIKey}`],
            'tileSize': 256,
        });
        map.addLayer({
            'id': 'radarTomorrow-layer-userAdded',
            'type': 'raster',
            'source': 'radar',
        }, labelLayerId);

    }
}