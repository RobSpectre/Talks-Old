function processCustomSlide(currentSlide) {
  slide = currentSlide;
  chart_div = slide.getElementsByTagName('div')[0];
  id = chart_div.getAttribute('id');

  if (id == "reference") {
    slide.chart = createChart(id);
  } else if (id == "network") {
    processNetworkChart(currentSlide);
  }
}

function advanceCustom(event) {
  var slide = Reveal.getCurrentSlide();
  var chart_div = slide.getElementsByTagName('div')[0];
  var id = chart_div.getAttribute('id');

  if (id == "reference") {
    advanceReferenceSlide(slide, event);
  } else if (id == "network") {
    advanceNetworkSlide(slide, event);
  }
}

function retreatCustom(event) {
  var slide = Reveal.getCurrentSlide();
  var chart_div = slide.getElementsByTagName('div')[0];
  var id = chart_div.getAttribute('id');

  if (id == "reference") {
    retreatReferenceSlide(slide, event);
  } else if (id == "network") {
    retreatNetworkSlide(slide, event);
  }
}

function advanceReferenceSlide(slide, event) {
  if (event.fragment.id == "global_2000") {
    slide.chart.load({
      columns: [
        ['ICBC', 0, 44.2],
        ['China Construction Bank', 0, 36.4],
        ['Agricultural Bank of China', 0, 28.8],
        ['Berkshire Hathaway', 0, 24.1],
        ['JPMorgan Chase', 0, 23.5]
      ]});
  } else if (event.fragment.id == "global_2000_stacked") {
    slide.chart.groups([['ICBC', 'China Construction Bank', 'Agricultural Bank of China', 'Berkshire Hathaway', 'JPMorgan Chase']]);
  } else if (event.fragment.id == "apple") {
    slide.chart.groups([['ICBC', 'China Construction Bank', 'Agricultural Bank of China', 'Berkshire Hathaway', 'JPMorgan Chase'], ['Apple', 'Samsung', 'Microsoft', 'Google', 'Amazon', 'Facebook', 'IBM', 'Cisco', 'General Electric', 'Disney', 'Boeing', 'Coca-Cola', 'Toyota', 'New York Yankees 2000-2016']]);
    slide.chart.load({
      columns: [
        ['Apple', 0, 0, 53.7]
      ]
    });
  } else if (event.fragment.id == "samsung") {
    slide.chart.load({
      columns: [['Samsung', 0, 0, 16.5]]
    });
  } else if (event.fragment.id == "microsoft") {
    slide.chart.load({
      columns: [['Microsoft', 0, 0, 10.2]]
    });
  } else if (event.fragment.id == "google") {
    slide.chart.load({
      columns: [['Google', 0, 0, 17]]
    });
  } else if (event.fragment.id == "ibm" ){
    slide.chart.load({
      columns: [['IBM', 0, 0, 12.9]]
    });
  } else if (event.fragment.id == "cisco" ) {
    slide.chart.load({
      columns: [['Cisco', 0, 0, 10.3]]
    });
  } else if (event.fragment.id == "general-electric") {
    slide.chart.load({
      columns: [['General Electric', 0, 0, 1.7]]
    });
  } else if (event.fragment.id == "disney") {
    slide.chart.load({
      columns: [['Disney', 0, 0, 9.1]]
    });
  } else if (event.fragment.id == "boeing") {
    slide.chart.load({
      columns: [['Boeing', 0, 0, 5.2]]
    });
  } else if (event.fragment.id == "coke") {
    slide.chart.load({
      columns: [['Coca-Cola', 0, 0, 7.3]]
    });
  } else if (event.fragment.id == "toyota") {
    slide.chart.load({
      columns: [['Toyota', 0, 0, 19.3]]
    });
  } else if (event.fragment.id == "yankees") {
    slide.chart.load({
      columns: [['New York Yankees 2000-2016', 0, 0, 3.1]]
    });
  } else if (event.fragment.id == "guide" ) {
      slide.chart.ygrids.add({value: 150});
  }
}

function retreatReferenceSlide(slide, event) {
  if (event.fragment.id == "global_2000") {
    slide.chart.unload({ids: ['ICBC', 'China Construction Bank', 'Agricultural Bank of China', 'Berkshire Hathaway', 'JPMorgan Chase']});
  } else if (event.fragment.id == "global_2000_stacked") {
    slide.chart.groups([[]]);
  } else if (event.fragment.id == "apple") {
    slide.chart.unload({ids: "Apple"});
  } else if (event.fragment.id == "samsung") {
    slide.chart.unload({ids: 'Samsung'});
  } else if (event.fragment.id == "microsoft") {
    slide.chart.unload({ids: 'Microsoft'});
  } else if (event.fragment.id == "google") {
    slide.chart.unload({ids: 'Google'});
  } else if (event.fragment.id == "ibm" ){
    slide.chart.unload({ids: 'IBM'});
  } else if (event.fragment.id == "cisco" ) {
    slide.chart.unload({ids: 'Cisco'});
  } else if (event.fragment.id == "general-electric") {
    slide.chart.unload({ids: 'General Electric'});
  } else if (event.fragment.id == "disney") {
    slide.chart.unload({ids: 'Disney'});
  } else if (event.fragment.id == "boeing") {
    slide.chart.unload({ids: 'Boeing'});
  } else if (event.fragment.id == "coke") {
    slide.chart.unload({ids: 'Coca-Cola'});
  } else if (event.fragment.id == "toyota") {
    slide.chart.unload({ids: 'Toyota'});
  } else if (event.fragment.id == "yankees") {
    slide.chart.unload({ids: 'New York Yankees 2000-2016'});
  } else if (event.fragment.id == "guide" ) {
      slide.chart.ygrids.remove({value: 150});
  }
}

function advanceNetworkSlide(slide, event) {
  if (event.fragment.id == "highlight-important") {
    var nodes = getRandomNetworkNodes(3);
    slide.important_nodes = nodes;

    nodes.forEach(function(node) {
      slide.nodes.update({ id: node, group: "important"});
    }); 
  } else if (event.fragment.id == "convert-to-number") {
    slide.nodes.getIds().forEach(function(id) {
      slide.nodes.update({ id: id, group: "number"});
    });
  } else if (event.fragment.id == "remove-edges") {
    slide.edges.getIds().forEach(function(edge) {
      slide.edges.remove({id: edge});
    });
  }
}

function retreatNetworkSlide(slide, event) {
  if (event.fragment.id == "highlight-important") {
    slide.important_nodes.forEach(function(node) {
      slide.nodes.update({ id: node, group: "number"});
    });
    slide.important_nodes = [];
  } else if (event.fragment.id == "convert-to-number") {
    var counter = 0;
    slide.nodes.getIds().forEach(function(id) {
      if (counter == 0) {
        slide.nodes.update({id: id, group: "tmobile"});
      } else if (counter == 1) {
        slide.nodes.update({id: id, group: "google"});
      } else {
        slide.nodes.update({id: id, group: "verizon"});
      }
      counter++;
    });
  } else if (event.fragment.id == "remove-edges") {
    slide.nodes.getIds().forEach(function(node) {
      slide.edges.add({
        from: node,
        to: node + 1
      });  
    });    
  }
}

function createChart(id) {
  return c3.generate({
    bindto: "#" + id,
    data: {
      columns: [
        ['Human Trafficking', 150]
      ],
      type: 'bar'
    }, 
    axis: {
        y: {
          label: {
            text: "Profit in Billions of USD",
            position: "outer-middle"
          }
        }
    }
  });
}

function getRandomNetworkNodes(count) {
  var slide = Reveal.getCurrentSlide();
  var nodes = new Array();

  for(i=0; i < count; i++) {
    var random = slide.nodes.getIds()[Math.floor(Math.random()*slide.nodes.length)];
    nodes.push(random);
  }

  return nodes;
}
