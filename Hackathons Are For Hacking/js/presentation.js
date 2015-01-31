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
    } else if (event.fragment.id.indexOf("network-chart") > -1 ) {
        advanceNetworkChart(event);
    } else {
        console.log(event.fragment.id);
    }
});

Reveal.addEventListener('fragmenthidden', function(event) {
    if (event.fragment.id.indexOf("funnel-chart") > -1 ) {
        retreatFunnelChart(event);
    } else if (event.fragment.id.indexOf("network-chart") > -1 ) {
        retreatNetworkChart(event);
    } else {
        console.log(event.fragment.id);
    }
});
