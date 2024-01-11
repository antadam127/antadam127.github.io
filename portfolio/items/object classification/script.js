const confidence = 0.5; // Default: 0.66;
const onlyOneMode = false; // Default: false
const fullscreenMode = iFrameView ? true : false;
let multiplier = 1; // Standard is 640x480

const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');

// Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}

// If webcam supported, add event listener to button for when user
// wants to activate it to call enableCam function which we will 
// define in the next step.
if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
}

// Enable the live webcam view and start classification.
function enableCam(event) {
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
        return;
    }

    // Hide the button once clicked.
    event.target.classList.add('removed');

    // FOR FULLSCREEN
    if (fullscreenMode) {
        document.getElementById('background').style.visibility = 'visible';
        document.getElementById('background').style.opacity = 1;
        liveView.classList.add('fullscreen');
        function setMult() {
            const hMult = window.innerWidth / 640;
            const vMult = window.innerHeight / 480;
            multiplier = hMult < vMult ? hMult : vMult;
            video.width = 640 * multiplier;
            video.height = 480 * multiplier;
            if (hMult > vMult) {
                liveView.style = `left: ${(window.innerWidth - (640 * multiplier)) / 2}px`;
            } else liveView.style = 'left: 0';
        }
        setMult();
        window.addEventListener('resize', setMult);
    } else multiplier = 1;

    // getUsermedia parameters to force video but not audio.
    const constraints = {
        video: true
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
    });
}

// Store the resulting model in the global scope of our app.
var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
cocoSsd.load().then(function (loadedModel) {
    model = loadedModel;
    // Show demo section now model is ready to use.
    demosSection.classList.remove('invisible');
});

var children = [];

function predictWebcam() {
    // Now let's start classifying a frame in the stream.
    model.detect(video).then(function (predictions) {
        // Remove any highlighting we did previous frame.
        for (let i = 0; i < children.length; i++) {
            liveView.removeChild(children[i]);
        }
        children.splice(0);

        // Now lets loop through predictions and draw them to the live view if
        // they have a high confidence score.
        for (let n = 0; n < predictions.length; n++) {
            // If we are over 66% sure we are sure we classified it right, draw it!
            if (predictions[n].score > confidence) {
                const p = document.createElement('p');
                p.innerText = predictions[n].class + ' - with '
                    + Math.round(parseFloat(predictions[n].score) * 100)
                    + '% confidence.';

                // p.style = 'margin-left: ' + (multiplier * predictions[n].bbox[0]) + 'px; margin-top: '
                //     + (multiplier * predictions[n].bbox[1] - 10) + 'px; width: '
                //     + (multiplier * predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';
                p.style = 'margin-right: ' + (multiplier * predictions[n].bbox[0]+(liveView.offsetWidth - video.width)) + 'px; margin-top: '
                    + (multiplier * predictions[n].bbox[1] - 10) + 'px; width: '
                    + (multiplier * predictions[n].bbox[2] - 10) + 'px; top: 0; right: 0;';

                const highlighter = document.createElement('div');
                highlighter.setAttribute('class', 'highlighter');
                // highlighter.style = 'left: ' + (multiplier * predictions[n].bbox[0]) + 'px; top: '
                //     + (multiplier * predictions[n].bbox[1]) + 'px; width: '
                //     + (multiplier * predictions[n].bbox[2]) + 'px; height: '
                //     + (multiplier * predictions[n].bbox[3]) + 'px;';
                highlighter.style = 'right: ' + (multiplier * predictions[n].bbox[0]+(liveView.offsetWidth - video.width)) + 'px; top: '
                    + (multiplier * predictions[n].bbox[1]) + 'px; width: '
                    + (multiplier * predictions[n].bbox[2]) + 'px; height: '
                    + (multiplier * predictions[n].bbox[3]) + 'px;';

                liveView.appendChild(highlighter);
                liveView.appendChild(p);
                children.push(highlighter);
                children.push(p);
            }
            if (onlyOneMode) break;
        }

        // Call this function again to keep predicting when the browser is ready.
        window.requestAnimationFrame(predictWebcam);
    });
}
