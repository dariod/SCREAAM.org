var jetNoise
var airplane

function flyBy(airplane, jetnoise) {

    // Set up airplane initial position
    airplane.offset({
            left: document.body.clientWidth
        })

    // Make the plane visible (should be hidden on page load)
    airplane.css("visibility","visible")

    // Animate!

        airplane.animate({
            left: (-1 * airplane.width() )
        },{
            duration: jetnoise.duration * 1000,
            easing: "linear",
            start: function() {
                    jetnoise.play()
                },
            stop: function() {
                    jetnoise.currentTime = 0;
                }
        })

}

// alternative to DOMContentLoaded event
document.onreadystatechange = function() {
    if (document.readyState === "interactive") {
        console.log("Document reached interactive state.")

        // Setup audio
        console.log("Setting up audio.")
        jetNoise = document.createElement('audio');
        jetNoise.setAttribute('src', 'resources/audio/jetNoise.mp3');
        jetNoise.setAttribute('id', 'jetnoise');

        airplane=$("#airplane")
    }
};
