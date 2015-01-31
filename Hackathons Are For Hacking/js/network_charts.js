function advanceNetworkChart(event) {
    var slide = Reveal.getCurrentSlide();
    if (event.fragment.id == "network-chart-intro") {
        createNetworkChart(event);
        addNodes(100, 'developer');
    } else if (event.fragment.id == "network-chart-intro-add-twilio") {
        addTwilio(); 
    } else if (event.fragment.id == "network-chart-intro-add-devangel") {
        addDevangel("Rob");
        slide.network_chart.zoomExtent();
    } else if (event.fragment.id == "network-chart-intro-activate-devangel") {
        var interval = setInterval( function() {
            var random_id = randomIntegerBetweenValues(0, slide.node_index);
            slide.edges.add({
                from: random_id,
                to: 'Rob', 
            });
            slide.edges.add({
                from: random_id,
                to: 'Twilio',
            });
            slide.network_chart.zoomExtent();
        }, 200);
        slide.interval = interval;
    } else if (event.fragment.id == "network-chart-intro-stop-devangel") {
        clearInterval(slide.interval);
        slide.network_chart.focusOnNode('Twilio', {scale: 0.8});
    } else if (event.fragment.id == "network-chart-awareness") {
        createNetworkChart(event);
        addNodes(100, 'developer');
    } else if (event.fragment.id == "network-chart-awareness-add-twilio") {
        addTwilio(); 
    } else if (event.fragment.id == "network-chart-awareness-add-devangel") {
        addDevangel("Rob");
        slide.network_chart.zoomExtent();
    } else if (event.fragment.id == "network-chart-awareness-activate-twilio") {
        slide.aware_edges = [];
        for (i=0; i < slide.node_index; i++) {
            edge = slide.edges.add({
                from: i,
                to: 'Twilio',
            });
            slide.aware_edges.push(edge);
        }
        var interval = setInterval( function() {
            var random_edge = randomIntegerBetweenValues(0, slide.aware_edges.length);
            edge = slide.aware_edges[random_edge];
            slide.edges.remove(edge);
        }, 200);
        slide.interval = interval;
    } else if (event.fragment.id == "network-chart-awareness-zoom-twilio") {
        clearInterval(slide.interval);
        slide.network_chart.focusOnNode('Twilio', {scale: 0.8});
    } else if (event.fragment.id == "network-chart-awareness-zoom-out") {
        slide.network_chart.zoomExtent();
    } else if (event.fragment.id == "network-chart-awareness-zoom-devangel") {
        slide.network_chart.focusOnNode('Rob', {scale: 0.8});
    } else if (event.fragment.id == "network-chart-giveaway") {
        createNetworkChart(event);
        addNodes(100, 'developer');
    } else if (event.fragment.id == "network-chart-giveaway-add-twilio") {
        addTwilio(); 
    } else if (event.fragment.id == "network-chart-giveaway-add-devangel") {
        addDevangel("Rob");
        slide.network_chart.zoomExtent();
    } else if (event.fragment.id == "network-chart-giveaway-activate-devangel") {
        interested = slide.node_index * 0.25
        slide.interested_nodes = []
        slide.interested_edges = []
        for (i=0; i < interested; i++) {
            edge = slide.edges.add({
                from: i,
                to: 'Rob',
            });
            slide.interested_nodes.push(i);
            slide.interested_edges.push(edge);
        }
        var interval = setInterval( function() {
            var random_node = randomIntegerBetweenValues(0, slide.interested_nodes.length);
            node = slide.interested_nodes[random_node];
            slide.edges.add({
                from: node,
                to: 'Twilio'
            });
        }, 1000);
        slide.interval = interval;
        slide.network_chart.focusOnNode('Rob', {scale: 0.5});
    } else if (event.fragment.id == "network-chart-giveaway-stop-devangel") {
        clearInterval(slide.interval);
        slide.network_chart.focusOnNode('Rob', {scale: 0.8});
    } else if (event.fragment.id == "network-chart-giveaway-winner") {
        var random_node = randomIntegerBetweenValues(0, slide.interested_nodes.length);
        slide.winner = slide.interested_nodes[random_node];
        slide.edges.add({
            from: slide.winner,
            to: 'Rob',
            color: 'red',
            width: 10
        });
    } else if (event.fragment.id == "network-chart-giveaway-winner-side-effect") {
        slide.edges.add({
            from: slide.winner,
            to: 'Twilio',
            width: 5
        });
    } else if (event.fragment.id == "network-chart-giveaway-loser") {
        for (i=0; i < slide.interested_edges.length; i++) {
           slide.edges.remove(slide.interested_edges[i]);
        }
    } else if (event.fragment.id == "network-chart-giveaway-zoom-twilio") {
        slide.network_chart.focusOnNode('Twilio', {scale: 0.8});
    } else if (event.fragment.id == "network-chart-giveaway-zoom-out") {
        slide.network_chart.zoomExtent();
    } else if (event.fragment.id == "network-chart-hacking") {
        createNetworkChart(event);
        addNodes(100, 'developer');
    } else if (event.fragment.id == "network-chart-hacking-add-twilio") {
        addTwilio(); 
    } else if (event.fragment.id == "network-chart-hacking-add-devangel") {
        addDevangel("Rob");
        slide.network_chart.zoomExtent();
    } else if (event.fragment.id == "network-chart-hacking-activate-devangel") {
        slide.network_chart.focusOnNode('Rob', {scale: 0.6});
        slide.networked_nodes = [];
        var interval = setInterval( function() {
            var random_id = randomIntegerBetweenValues(0, slide.node_index);
            slide.edges.add({
                from: random_id,
                to: 'Rob', 
                color: 'red',
                width: 10
            });
            slide.networked_nodes.push(random_id);
            slide.edges.add({
                from: random_id,
                to: 'Twilio',
                width: 5 
            });
        }, 1200);
        slide.interval = interval;
    } else if (event.fragment.id == "network-chart-hacking-stop-devangel") {
        clearInterval(slide.interval);
        slide.network_chart.focusOnNode('Twilio', {scale: 0.7});
    } else if (event.fragment.id == "network-chart-hacking-network") {
        var interval = setInterval( function() {
            var random_id = randomIntegerBetweenValues(0, slide.node_index);
            var random_networked_node = randomIntegerBetweenValues(0, slide.networked_nodes.length);
            slide.edges.add({
                from: random_networked_node,
                to: random_id, 
                color: 'blue',
                width: 5
            });
            slide.edges.add({
                from: random_id,
                to: 'Twilio',
                color: 'blue',
                width: 5 
            });
            slide.network_chart.zoomExtent();
        }, 400);
        slide.interval = interval;
    } else if (event.fragment.id == "network-chart-hacking-stop-network") {
        clearInterval(slide.interval);
    } else if (event.fragment.id == "network-chart-hacking-zoom-twilio") {
        slide.network_chart.focusOnNode('Twilio', {scale: 0.4});
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

function addDevangel(name) {
    var slide = Reveal.getCurrentSlide(); 
    var twilio_node = slide.network_chart.getPositions('Twilio').Twilio;

    var length = randomIntegerBetweenValues(700, 900);
    var coordinates = calculateRandomLocationBasedOnVector(twilio_node, length);

    slide.nodes.add({
        id: name,
        x: coordinates.x,
        y: coordinates.y,
        group: 'devangel'
    });

    if (slide.devangels == undefined) {
        slide.devangels = [name];
    } else {
        slide.push(name);
    }
}

function addDevangels() {
    devangels = ['Devin', 'Carter', 'Greg', 'Brent', 'Ricky', 'Matt', 'Marcos', 'Phil', 'Tony', 'Eva'];

    for (i=0; i < devangels.length; i++) {
        addDevangel(devangels[i]);
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
