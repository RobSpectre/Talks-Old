function advanceNetworkChart(event) {
  var slide = Reveal.getCurrentSlide();
  var value = event.fragment.innerHTML;

  if (value !== '') {
    try {
      event.fragment.data = JSON.parse(value);
    } catch (e) {
      console.log("Failed to parse value for fragment: " + value);
    }
  } else {
    event.fragment.data = undefined;
  }

  if ($(event.fragment).hasClass('zoom')) {
    event.fragment.previous_state = {};
    event.fragment.previous_state.location = slide.network.getViewPosition();
    event.fragment.previous_state.zoom = slide.network.getScale();

    if (event.fragment.data === undefined) {
      var nodes = slide.nodes.getIds();
      slide.network.fit({ nodes: nodes, animation: true});
    } else if (event.fragment.data.type !== undefined) {
      if (event.fragment.data.zoom !== undefined) {
        var nodes_in_group = [];
        slide.nodes.forEach( function(node) {
          if (node.group == event.fragment.data.type) {
            nodes_in_group.push(node.id);
          }
        });

        if (event.fragment.data.zoom == 'random') {
          random_id = randomIntegerBetweenValues(0, (nodes_in_group.length - 1));
          slide.network.focus(nodes_in_group[random_id], {animation: true, scale: 0.8}); 
        } else {
          slide.network.fit({nodes: nodes_in_group});
        }
      }
    } else if (event.fragment.data.node !== undefined) {
      var zoom = event.fragment.data.zoom;
      slide.network.focus(event.fragment.data.node, {animation: true, scale: zoom});
    }
  } else if ($(event.fragment).hasClass('add')) {
    event.fragment.items = [];
    if ($(event.fragment).hasClass('node')) {
      if (event.fragment.data.constructor === Array) {
        event.fragment.data.forEach( function(item) {
          processNodeItem(event.fragment, item);
        });
      } else {
        processNodeItem(event.fragment, event.fragment.data);
      }
    } else if ($(event.fragment).hasClass('edge')) {
      if (event.fragment.data.interval !== undefined) {
        var interval = setInterval( function() {
          addEdges(event.fragment, event.fragment.data); 
        }, event.fragment.data.interval);
        slide.interval = interval;
      } else {
        addEdges(event.fragment, event.fragment.data);
      }
    } else {
      console.log("Unknown item to add to network chart: " + event.fragment.data);
    }
  } else if ($(event.fragment).hasClass('remove')) {
    console.log("TODO: add ability to remove nodes or edges.");
  } else if ($(event.fragment).hasClass('stop')) {
    clearInterval(slide.interval);
  } else {
    console.log("Did not recognize network fragment type.");
  }
}

function retreatNetworkChart(event) {
  var slide = Reveal.getCurrentSlide();

  if ($(event.fragment).hasClass('zoom')) {
    var zoom = {
      position: event.fragment.previous_state.location,
      scale: event.fragment.previous_state.zoom,
      animation: true
    };
    slide.network.moveTo(zoom);
  } else if ($(event.fragment).hasClass('add')) {
    if ($(event.fragment).hasClass('node')) {
      event.fragment.items.forEach( function(node) {
        slide.nodes.remove(node);
      });
    } else if ($(event.fragment).hasClass('edge')) {
      event.fragment.items.forEach( function(edge) {
        slide.edges.remove(edge);
      });
    }
  } else if ($(event.fragment).hasClass('stop')) {
    Reveal.prevFragment();
  } else if ($(event.fragment).hasClass('remove')) {
    console.log("TODO: readd nodes or edges taken away.");
  } else {
    console.log("Did not recognize network fragment type.");
  }
}

function processNetworkSlide(currentSlide) {
  var network_div = currentSlide.getElementsByClassName('network')[0];
  var value = network_div.innerHTML;

  try {
    networkOptions = JSON.parse(value);
  } catch(e) {
    networkOptions = undefined;
  }

  networkOptions = getNetworkOptions(networkOptions);

  network = createNetwork(network_div, networkOptions);
  currentSlide.network = network;
}

function processNodeItem(fragment, node_item) {
  if (node_item.type == 'Twilio') {
    item = addTwilio();
    fragment.items.push(item);        
  } else if (node_item.type == 'devangels') {
    items = addDevangels();
    fragment.items = fragment.items.concat(items);
  } else if (node_item.type == 'educators') {
    items = addEducators();
    fragment.items = fragment.items.concat(items);
  } else if (node_item.type == 'community') {
    items = addCommunity();
    fragment.items = fragment.items.concat(items);
  } else {
    items = addNodes(node_item.type, node_item.quantity);
    fragment.items = fragment.items.concat(items);
  }
}

function createNetwork(container, options) {
  var nodes = new vis.DataSet();
  var edges = new vis.DataSet();
  var data = {
    nodes: nodes,
    edges: edges,
  };

  var slide = Reveal.getCurrentSlide();
  slide.nodes = nodes;
  slide.edges = edges;

  var network = new vis.Network(container, data, options);

  slide.node_index = 1;
  slide.network_chart = network;

  return network;
}

function getNetworkOptions(networkOptions) {
  var networkDefaults = {

    autoResize: false,
    edges: {
      color: {
        color: 'white',
      },
      font: "0",
      length: 200,
      scaling: {
        min: 10,
        max: 100
      }
    },
    groups: {
      devangel: {
        image: "images/twilio/twilio_logo_blue.png",
        shape: "image",
        font: "14px arial white",
        size: 15,
        fixed: true
      },
      educator: {
        image: "images/twilio/twilio_logo_green.png",
        shape: "image",
        font: "14px arial white",
        size: 15,
        fixed: true
      },
      community: {
        image: "images/twilio/twilio_logo_yellow.png",
        shape: "image",
        font: "14px arial white",
        size: 15,
        fixed: true
      },
      developer: {
        shape: "circle",
        color: {
          border: "#a7a5a5",
          background: "#a7a5a5",
          highlight: {
            border: "red",
            background: "white"
          }
        },
        size: 10,
        font: "0px arial white"
      },
      muggle: {
        shape: "box",
        color: {
          border: "brown",
          background: "brown",
          highlight: {
            border: "red",
            background: "white"
          }
        },
        size: 10,
        font: {
          size: "0"
        }
      },
      customer: {
        image: "images/twilio/twilio_logo_red.png",
        shape: "image",
        size: 15,
        font: {
          size: "0"
        }
      }
    }
  };

  if (typeof networkOptions === 'undefined') {
    return networkDefaults;
  } else {
    return $.extend({}, networkDefaults, networkOptions);
  }

}

function randomIntegerBetweenValues(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateRandomLocationBasedOnVector(origin_node, length) {
  // Calculate random angle from origin node
  var angle = randomIntegerBetweenValues(0, 360); 

  // Calculate coordinates
  var x = origin_node.x + Math.cos(angle) * length;
  var y = origin_node.y + Math.sin(angle) * length;

  return {x: x, y: y};
}

function addNodes(type, count) {
  var slide = Reveal.getCurrentSlide();
  nodes = [];
  for (i=0; i < count; i++ ) {
    slide.node_index = slide.node_index + 1;
    id = slide.node_index;
    slide.nodes.add({
      id: id,
      group: type,
    });
    nodes.push(id);
  }
  return nodes;
}

function addEdges(fragment, options) {
  var slide = Reveal.getCurrentSlide();

  if (options.from_group !== 'undefined') {
    addEdgesFromGroup(fragment, options);
  } else if (options.constructor === Array) {
    options.forEach( function(item) {
      addEdge(fragment, item.from, item.to, item.type);
    });
  } else {
    addEdge(fragment, options.from, options.to, options.type);
  }
}

function addEdge(fragment, to, from, type) {
  var slide = Reveal.getCurrentSlide();

  var id = false;
  if (type == 'educator') {
    id = slide.edges.add({
      from: from,
      to: to,
      color: '#e12127',
      width: 10,
    });
    fragment.items.push(id);
  } else if (type == 'community') {
    id = slide.edges.add({
      from: from,
      to: to,
      color: '#54c3c2',
      width: 5,
    });
    fragment.items.push(id);
  } else if (type == 'devangel') {
    id = slide.edges.add({
      from: from,
      to: to,
    });
    fragment.items.push(id);

    twilio_id = slide.edges.add({
      from: from,
      to: 'Twilio'
    });
    fragment.items.push(twilio_id);
  } else {
    id = slide.edges.add({
      from: from,
      to: to
    });
    fragment.items.push(id);
  }
}

function addEdgesFromGroup(fragment, options) {
  var slide = Reveal.getCurrentSlide();

  var nodes_from_group = [];
  var nodes_to_group = [];

  slide.nodes.forEach( function(node) {
    if (node.group == options.from_type) {
      nodes_from_group.push(node.id);
    } 
    if (node.group == options.to_type) {
      nodes_to_group.push(node.id);
    }
  });

  if (nodes_from_group.length === 0) {
    nodes_from_group = [options.from];
  }
  if (nodes_to_group.length === 0) {
    nodes_to_group = [options.to];
  }

  if (options.random !== undefined) {
    random_from_id = randomIntegerBetweenValues(0, (nodes_from_group.length - 1));
    random_to_id = randomIntegerBetweenValues(0, (nodes_to_group.length - 1));

    addEdge(fragment, nodes_from_group[random_from_id], nodes_to_group[random_to_id], options.type);
  } else {
    var edges = nodes_from_group.forEach( function(from_node) {
      nodes_to_group.forEach( function(to_node) {
        addEdge(fragment, from_node, to_node, options.type);
      });
    });
  }
}

function addTwilio() {
  var slide = Reveal.getCurrentSlide();
  slide.nodes.add({
    id: 'Twilio',
    image: "images/twilio/twilio_logo_red_medium.png",
    shape: "image",
    font: "0 arial white",
    size: 75,
    fixed: true
  });

  return 'Twilio';
}

function addDevangels() {
  var slide = Reveal.getCurrentSlide();
  slide.devangels = ['Devin', 'Greg', 'Brent', 'Ricky', 'Matt', 'Marcos', 'Phil', 'Nikita', 'Sam', 'Dominik'];

  var twilio_node = slide.network_chart.getPositions('Twilio').Twilio;
  for (i=0; i < slide.devangels.length; i++) {
    var length = randomIntegerBetweenValues(800, 900);
    var coordinates = calculateRandomLocationBasedOnVector(twilio_node, length);
    slide.nodes.add({
      id: slide.devangels[i],
      label: slide.devangels[i],
      x: coordinates.x,
      y: coordinates.y,
      group: 'devangel'
    });
  }

  return slide.devangels;
}

function addEducators() {
  var slide = Reveal.getCurrentSlide();
  slide.educators = ['Kevin', 'David', 'Andrew'];

  var twilio_node = slide.network_chart.getPositions('Twilio').Twilio;
  for (i=0; i < slide.educators.length; i++) {
    var length = randomIntegerBetweenValues(500, 600);
    var coordinates = calculateRandomLocationBasedOnVector(twilio_node, length);
    slide.nodes.add({
      id: slide.educators[i],
      label: slide.educators[i],
      x: coordinates.x,
      y: coordinates.y,
      group: 'educator'
    });
  }

  return slide.educators;
}

function addCommunity() {
  var slide = Reveal.getCurrentSlide();
  slide.community = ['Kyle', 'Megan', 'Ricky'];

  var twilio_node = slide.network_chart.getPositions('Twilio').Twilio;
  for (i=0; i < slide.community.length; i++) {
    var length = randomIntegerBetweenValues(100, 200);
    var coordinates = calculateRandomLocationBasedOnVector(twilio_node, length);
    slide.nodes.add({
      id: slide.community[i],
      label: slide.community[i],
      x: coordinates.x,
      y: coordinates.y,
      group: 'community'
    });
  }

  return slide.community;
}
