var airplane
var flightInterval

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

    // Set the airplane SVG dimensions to fit the view
    $("#airplane").css("top","3vh")
    $("#airplane svg").height("94vh")

    // Make the plane visible (should be hidden on page load)
    airplane.css("visibility","visible")

    // Animate!
    airplane.animate({
        left: (-1 * airplane.width() )
    },{
        // duration: jetnoise.duration * 1000,
        duration: 15000,
        easing: "linear"
    })

}


// alternative to DOMContentLoaded event
document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        console.log("Document reached complete state.")

        airplane=$("#airplane")

        // Set up randomly timed fly bys
        // Every so much time, we roll a dice and see if a jet airplane
        // will bother your website reading.
        var flightInterval = window.setInterval(
                function() {
                    if (Math.random() > 0.5) {
                        flyBy(airplane)
                }
            },
            3000
        );
    }
};
