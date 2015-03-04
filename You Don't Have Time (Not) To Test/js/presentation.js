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
    if (event.fragment.id.indexOf("funnel-chart") > -1 ) {
        advanceFunnelChart(event);
    } else if (event.fragment.id.indexOf("chart") > -1 ) {
        advanceChart(event);
    } else if (event.fragment.id.indexOf("network-chart") > -1 ) {
        advanceNetworkChart(event);
    } else if (event.fragment.id.indexOf("map") > -1 ) {
        advanceMap(event);
    } else {
        console.log(event.fragment.id);
    }
});

Reveal.addEventListener('fragmenthidden', function(event) {
    if (event.fragment.id.indexOf("funnel-chart") > -1 ) {
        retreatFunnelChart(event);
    } else if (event.fragment.id.indexOf("chart") > -1 ) {
        retreatChart(event);
    } else if (event.fragment.id.indexOf("network-chart") > -1 ) {
        retreatNetworkChart(event);
    } else if (event.fragment.id.indexOf("map") > -1 ) {
        retreatMap(event);
    } else {
        console.log(event.fragment.id);
    }
});

Reveal.addEventListener('slidechanged', function(event) {
    if (event.currentSlide.className.indexOf("map-slide") > -1 && typeof event.currentSlide.map === 'undefined') {
        map = createMap();
        event.currentSlide.map = map;
    } else if (event.currentSlide.className.indexOf("chart") > -1 && typeof event.currentSlide.chart === 'undefined') {
        processChartSlide(event.currentSlide);
    }
}, false);
