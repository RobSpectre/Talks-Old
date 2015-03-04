function advanceNetworkChart(event) {
    var slide = Reveal.getCurrentSlide();
    if (event.fragment.id == "network-chart") {
        createNetworkChart(event);
        addNodes(50, 'developer');
    } else if (event.fragment.id == "network-chart-add-twilio") {
        addTwilio(); 
    } else if (event.fragment.id == "network-chart-add-devangels") {
        addDevangels();
        slide.network_chart.zoomExtent();
    } else if (event.fragment.id == "network-chart-activate-devangels") {
        var interval = setInterval( function() {
            for (i=0; i < slide.devangels.length; i++) {
                var random_id = randomIntegerBetweenValues(0, slide.node_index);
                slide.edges.add({
                    from: random_id,
                    to: slide.devangels[i], 
                });
                slide.edges.add({
                    from: random_id,
                    to: 'Twilio',
                });
            }
            slide.network_chart.zoomExtent();
        }, 1000);
        slide.interval = interval;
    } else if (event.fragment.id == "network-chart-stop-devangels") {
        clearInterval(slide.interval);
    } else {
        console.log(event.fragment.id);
    }
}

function retreatNetworkChart(event) {
    var slide = Reveal.getCurrentSlide();
    if (event.fragment.id == "network-chart") {
        console.log("Destroy a node.");
    } else {
        console.log(event.fragment.id);
    }
}


function createNetworkChart(event) {
    var options = {
        stabilize: false,
        width: 960,
        edges: {
            color: {
                color: 'white',
            },
            fontSize: 0,
            widthMin: 10,
            widthMax: 100
        },
        groups: {
            devangel: {
                image: "images/twilio/twilio_logo_blue.png",
                shape: "image",
                fontColor: "white",
                fontSize: 18,
                radius: 15
            },
            deveducator: {
                image: "images/twilio/twilio_logo_green.png",
                shape: "image",
                fontColor: "white",
                fontSize: 18,
                radius: 15
            },
            community: {
                image: "images/twilio/twilio_logo_yellow.png",
                shape: "image",
                fontColor: "white",
                fontSize: 18,
                radius: 15
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
                radius: 40,
                fontSize: 0
            },
            muggle: {
                shape: "square",
                color: {
                    border: "brown",
                    background: "brown",
                    highlight: {
                        border: "red",
                        background: "white"
                    }
                },
                fontSize: 0
            },
            customer: {
                image: "images/twilio/twilio_logo_red.png",
                shape: "image",
                radius: 15,
                fontSize: 0
            }
        }
    };

    var nodes = new vis.DataSet();
    var edges = new vis.DataSet();
    var data = {
        nodes: nodes,
        edges: edges,
    };

    var slide = Reveal.getCurrentSlide();
    slide.nodes = nodes;
    slide.edges = edges;

    var container = document.getElementById(event.fragment.id);

    var network = new vis.Network(container, data, options);

    slide.node_index = 1;
    slide.network_chart = network;

    return network;
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

function addNodes(count, type) {
    var slide = Reveal.getCurrentSlide();
    for (i=0; i < count; i++ ) {
        slide.node_index = slide.node_index + 1;
        id = slide.node_index;
        slide.nodes.add({
            id: id,
            group: type,
        });
    }
}

function addTwilio() {
    var slide = Reveal.getCurrentSlide();
    slide.nodes.add({
        id: 'Twilio',
        image: "images/twilio/twilio_logo_red_medium.png",
        shape: "image",
        fontSize: 0,
        radiusMin: 25,
        radiusMax: 100
    });
}

function addDevangels() {
    var slide = Reveal.getCurrentSlide();
    slide.devangels = ['Devin', 'Carter', 'Greg', 'Brent', 'Ricky', 'Matt', 'Marcos', 'Phil', 'Tony', 'Eva'];

    var twilio_node = slide.network_chart.getPositions('Twilio').Twilio;
    for (i=0; i < slide.devangels.length; i++) {
        var length = randomIntegerBetweenValues(700, 900);
        var coordinates = calculateRandomLocationBasedOnVector(twilio_node, length);
        slide.nodes.add({
            id: slide.devangels[i],
            x: coordinates.x,
            y: coordinates.y,
            group: 'devangel'
        });
    }
}

function addEducators() {
    var slide = Reveal.getCurrentSlide();
    slide.deveducators = ['Jarod', 'Kevin'];

    var twilio_node = slide.network_chart.getPositions('Twilio').Twilio;
    for (i=0; i < slide.deveducators.length; i++) {
        var length = randomIntegerBetweenValues(250, 400);
        var coordinates = calculateRandomLocationBasedOnVector(twilio_node, length);
        slide.nodes.add({
            id: slide.deveducators[i],
            x: coordinates.x,
            y: coordinates.y,
            group: 'deveducator'
        });
    }
}

function addCommunity() {
    var slide = Reveal.getCurrentSlide();
    slide.community = ['Kyle', 'Crowe'];

    var twilio_node = slide.network_chart.getPositions('Twilio').Twilio;
    for (i=0; i < slide.community.length; i++) {
        var length = randomIntegerBetweenValues(100, 200);
        var coordinates = calculateRandomLocationBasedOnVector(twilio_node, length);
        slide.nodes.add({
            id: slide.community[i],
            x: coordinates.x,
            y: coordinates.y,
            group: 'community'
        });
    }
}
