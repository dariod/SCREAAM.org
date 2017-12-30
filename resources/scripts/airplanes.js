var airplane
var flightInterval

$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 500);
});


$(window).bind('resizeEnd', function() {
    fitPlane(airplane);
});

function fitPlane(airplane) {
    if ( window.innerWidth > window.innerHeight ) {
        // If window is wider than taller, fit airplane height
        $("#airplane svg").height("94vh")
        $("#airplane").css("top","3vh")
    } else {
        // If window is taller than wider, fit airplane width
        $("#airplane svg").width("94vw")
        $("#airplane").css("top",(window.innerHeight - $("#airplane svg").height) / 2 + "px")
    }
}

// function flyBy(airplane, jetnoise) {
function flyBy(airplane) {

    if (airplane.is(':animated')) {
        // There is already an airplane passing by.
        // No need to trigger another one.
        return
    }

    // Set up airplane initial position
    airplane.offset({
            left: document.body.clientWidth,
        })

    // bufferSound
    bufferSound()

    // Animate!
    airplane.animate({
        left: (-1 * airplane.width() )
    },{
        // duration: jetnoise.duration * 1000,
        duration: webkitJetNoise.source.buffer.duration * 1000,
        easing: "linear",
        start: function () {
                console.log("Animation start.")
                // Make the plane visible (should be hidden on page load)
                airplane.css("visibility","visible")
                playSound(webkitJetNoise.source)
            },
        done: function () {
                console.log("Animation stop.")
                // Make the plane visible (should be hidden on page load)
                airplane.css("visibility","hidden")
            }
    })

}

// This is part of Safari sound handling

var webkitJetNoise = {
    audioContext: null,
    buffer: null,
    source: null
}


// progress on transfers from the server to the client (downloads)
function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
    // ...
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}

function transferComplete(evt) {
  console.log("The transfer is complete.");
}

function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
}

function stashDownloadedSound(event) {
    webkitJetNoise.buffer = event.target.response
    console.log("The jet noise sound transfer is complete.")
}

function bufferSound() {
    webkitJetNoise.source = webkitJetNoise.audioContext.createBufferSource()
    webkitJetNoise.source.buffer = webkitJetNoise.audioContext.createBuffer(webkitJetNoise.buffer, false)
    webkitJetNoise.source.connect(webkitJetNoise.audioContext.destination)
}

function playSound(source) {
    source.start()
}

// Init sound for Safari
if('webkitAudioContext' in window) {

    webkitJetNoise.audioContext = new webkitAudioContext();


    // Buffer the sound`
    request = new XMLHttpRequest();
    request.open('GET', '/resources/audio/jetNoise.mp3', true);
    request.responseType = 'arraybuffer';
    request.addEventListener('load', stashDownloadedSound, false);
    // request.addEventListener("load", transferComplete);
    request.addEventListener("progress", updateProgress);
    request.addEventListener("error", transferFailed);
    request.addEventListener("abort", transferCanceled);
    request.send();

}


// alternative to DOMContentLoaded event
document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        console.log("Document reached complete state.")

        airplane=$("#airplane")

        // Fit airplane to client window size.
        // Will refit at every window resize.
        fitPlane(airplane)

        // The below does not work on Safari:
        //
        // jetNoise = document.createElement('audio');
        // jetNoise.setAttribute('src', 'resources/audio/jetNoise.mp3');
        // jetNoise.setAttribute('preload', 'auto');
        // jetNoise.setAttribute('type', 'audio/mpeg')
        // jetNoise.setAttribute('id', 'jetnoise');



        // Set up randomly timed fly bys
        // Every so much time, we roll a dice and see if a jet airplane
        // will bother your website reading.
        var flightInterval = window.setInterval(
                function() {
                    if (Math.random() > 0.4) {
                        flyBy(airplane)
                }
            },
            3000
        );
    }
};
