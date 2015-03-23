// Reveal Setup
Reveal.initialize({
    controls: false,
    progress: true,
    history: true,
    overview: false,
    loop: false,
    transition: 'none'
});

// Fragment Routers
Reveal.addEventListener('fragmentshown', function(event) {
    if ($(event.fragment).hasClass("funnel")) {
        advanceFunnelChart(event);
    } else if ($(event.fragment).hasClass("chart")) {
        advanceChart(event);
    } else if ($(event.fragment).hasClass("network")) {
        advanceNetworkChart(event);
    } else if ($(event.fragment).hasClass("map")) {
        advanceMap(event);
    } else {
        console.log("Did not recognize fragment type.");
    }
});

Reveal.addEventListener('fragmenthidden', function(event) {
    if ($(event.fragment).hasClass("funnel")) {
        retreatFunnelChart(event);
    } else if ($(event.fragment).hasClass("chart")) {
        retreatChart(event);
    } else if ($(event.fragment).hasClass("network")) {
        retreatNetworkChart(event);
    } else if ($(event.fragment).hasClass("map")) {
        retreatMap(event);
    } else {
        console.log("Did not recognize fragment type.");
    }
});

Reveal.addEventListener('slidechanged', function(event) {
    if (event.previousSlide.interval !== 'undefined') {
        clearInterval(event.previousSlide.interval);
    }

    if (event.currentSlide.className.indexOf("map") > -1 && typeof event.currentSlide.map === 'undefined') {
        processMapSlide(event.currentSlide);
    } else if (event.currentSlide.className.indexOf("network") > -1 && typeof event.currentSlide.network === 'undefined') {
        processNetworkSlide(event.currentSlide);
    } else if (event.currentSlide.className.indexOf("funnel") > -1 && typeof event.currentSlide.chart === 'undefined') {
        processFunnelChartSlide(event.currentSlide);
    } else if (event.currentSlide.className.indexOf("chart") > -1 && typeof event.currentSlide.chart === 'undefined') {
        processChartSlide(event.currentSlide);
    }
}, false);
