function advancePyramidChart(event) {
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
  slide.pyramid_chart.series[0].addPoint(data); 
  event.fragment.row_name = data.id;
}

function retreatPyramidChart(event) {
  var slide = Reveal.getCurrentSlide();
  var value = event.fragment.innerHTML;

  slide.pyramid_chart.get(event.fragment.row_name).remove();
}

function processPyramidChartSlide(currentSlide) {
  var chart_div = currentSlide.getElementsByTagName('div')[0];
  var id = chart_div.getAttribute('id');
  var value = chart_div.innerHTML;

  if (value === 'undefined') {
    data = [];
  } else {
    data = JSON.parse(value);
  }

  pyramid_chart = createPyramidChart(id, data);
  currentSlide.pyramid_chart = pyramid_chart;
}

function createPyramidChart(id, data, text) {
  if (text === 'undefined') {
    text = '';
  }

  if (data === 'undefined') {
    data = [];
  }

  var pyramid_chart = new Highcharts.Chart({
    // Core Config
    chart: {
      type: 'pyramid',
      renderTo: id,
      spacingRight: 100,
      spacingBottom: 25 
    },
    // Blank title above chart
    title: {
      text: ''
    },
    // Configure the appearance of the pyramid layers
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
      }
    },
    legend: {
      enabled: false, 
    },
    series: [{
      name: "Pyramid",
      data: data
    }]
  });
  return pyramid_chart;
}

