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

    // Animate!
    airplane.animate({
        left: (-1 * airplane.width() )
    },{
        // duration: jetnoise.duration * 1000,
        duration: 15000,
        easing: "linear",
        start: function () {
                // Make the plane visible (should be hidden on page load)
                airplane.css("visibility","visible")
            },
        done: function () {
                // Make the plane visible (should be hidden on page load)
                airplane.css("visibility","hidden")
            }
    })

}


// alternative to DOMContentLoaded event
document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        console.log("Document reached complete state.")

        airplane=$("#airplane")

        // Fit airplane to client window size.
        // Will refit at every window resize.
        fitPlane(airplane)

        // Set up randomly timed fly bys
        // Every so much time, we roll a dice and see if a jet airplane
        // will bother your website reading.
        var flightInterval = window.setInterval(
                function() {
                    if (Math.random() > 0.8) {
                        flyBy(airplane)
                }
            },
            3000
        );
    }
};
