function advanceFunnelChart(event) {
  var slide = Reveal.getCurrentSlide();
  var value = event.fragment.innerHTML;

  try {
    data = JSON.parse(value);
    data = {
      name: data[0],
      id: data[0],
      y: data[1]
    };
  } catch(e) {
    console.log("Could not read value of fragment id: " + event.fragment.id);
  }
  slide.funnel_chart.series[0].addPoint(data); 
  event.fragment.row_name = data.id;
}

function retreatFunnelChart(event) {
  var slide = Reveal.getCurrentSlide();
  var value = event.fragment.innerHTML;

  slide.funnel_chart.get(event.fragment.row_name).remove();
}

function processFunnelChartSlide(currentSlide) {
  var chart_div = currentSlide.getElementsByTagName('div')[0];
  var id = chart_div.getAttribute('id');
  var value = chart_div.innerHTML;

  if (value === 'undefined') {
    data = [];
  } else {
    data = JSON.parse(value);
  }

  funnel_chart = createFunnelChart(id, data);
  currentSlide.funnel_chart = funnel_chart;
}

function createFunnelChart(id, data, text) {
  if (text === 'undefined') {
    text = '';
  }

  if (data === 'undefined') {
    data = [];
  }

  var funnel_chart = new Highcharts.Chart({
    // Core Config
    chart: {
      type: 'funnel',
      renderTo: id,
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
      data: data
    }]
  });
  return funnel_chart;
}
