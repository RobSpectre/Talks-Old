function advanceFunnelChart(event) {
    var slide = Reveal.getCurrentSlide();
    if (event.fragment.id == 'funnel-chart') {
        funnel_chart = createFunnelChart(event.fragment, ['Awareness', 2000000]);
        slide.funnel_chart = funnel_chart;
    } else if (event.fragment.id == 'funnel-chart-add-understanding') {
        slide.funnel_chart.series[0].addPoint(['Understanding', 1000000]);
    } else if (event.fragment.id == 'funnel-chart-add-adoption') {
        slide.funnel_chart.series[0].addPoint(['Adoption', 20000]);
    } else if (event.fragment.id == 'funnel-chart-add-activation') {
        slide.funnel_chart.series[0].addPoint(['Activation', 20000]);
    }
}

function retreatFunnelChart(event) {
    var slide = Reveal.getCurrentSlide();
    if (event.fragment.id == 'funnel-chart') {
        slide.funnel_chart.destroy();
    } else if (event.fragment.id == 'funnel-chart-add-understanding') {
        slide.funnel_chart.series[0].data[1].remove();
    } else if (event.fragment.id == 'funnel-chart-add-adoption') {
        slide.funnel_chart.series[0].data[2].remove();
    } else if (event.fragment.id == 'funnel-chart-add-activation') {
        slide.funnel_chart.series[0].data[3].remove();
    }
}

function createFunnelChart(fragment, data) {
    var funnel_chart = new Highcharts.Chart({
        // Core Config
        chart: {
            type: 'funnel',
            renderTo: fragment.id,
            spacingRight: 100,
            spacingBottom: 25 
        },
        // Blank title above chart
        title: {
            text: ''
        },
        // Configure the appearance of the funnel layers
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    softConnector: true,
                    crop: false,
                    overflow: "none",
                    style: {"fontSize": "2.5em"}
                },
                neckWidth: '30%',
                neckHeight: '25%'
            }
        },
        legend: {
            enabled: false, 
        },
        series: [{
            name: "Funnel",
            data: [data] 
        }]
    });

    return funnel_chart;
}
