function advanceMap(event) {
    var slide = Reveal.getCurrentSlide();

    if (event.fragment.id == 'map-add-marker') {
        marker = addMarker("Brooklyn NY",
                           getMarkerStyle('twilio_red'),
                           slide.map,
                           function(marker) {
                               slide.ny_marker = marker;
                           });
    } else if (event.fragment.id == 'map-zoom-us') {
        zoomToLocation("United States", 4, slide.map);
    } else if (event.fragment.id == 'map-zoom-world') {
        zoomToLocation([0, 0], 2, slide.map);
    } else {
        console.log(event);
    }
}

function retreatMap(event) {
    var slide = Reveal.getCurrentSlide();

    if (event.fragment.id == 'map-add-marker') {
        slide.ny_marker.setMap(null);
    } else if (event.fragment.id == 'map-zoom-us') {
        zoomToLocation("Brooklyn NY", 7, slide.map);
    } else if (event.fragment.id == 'map-zoom-world') {
        zoomToLocation("United States", 4, slide.map);
    } else {
        console.log(event);
    }
}

function createMap(mapOptions) {
    // Map styles
    var styles = [
      {
        "featureType": "road",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "poi",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "water",
        "stylers": [
          { "color": "#dadada" }
        ]
      },{
        "featureType": "landscape",
        "stylers": [
          { "color": "#fbe6e6" }
        ]
      }
    ];

    if (typeof mapOptions === "undefined") {
        var mapOptions = {
            zoom: 7,
            center: new google.maps.LatLng(40.7142, -74.0064),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            scrollwheel: false,
            draggable: true,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: true,
            disableDoubleClickZoom: false
        };
    }

    var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

    var map = new google.maps.Map(document.getElementsByClassName('map')[0], mapOptions);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
    
    return map;
}

// Custom marker styles
function getMarkerStyle(icon) {
    var icon_paths = {
        'twilio_red': '/images/twilio/twilio_logo_red.png',
        'twilio_blue': '/images/twilio/twilio_logo_blue.png',
        'twilio_green': '/images/twilio/twilio_logo_green.png',
        'twilio_purple': '/images/twilio/twilio_logo_purple.png',
        'twilio_brown': '/images/twilio/twilio_logo_brown.png',
        'twilio_yellow': '/images/twilio/twilio_logo_yellow.png'
    };

    marker_style = {
        url: icon_paths[icon],
        size: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 20)
    };

    return marker_style;
}


function addMarker(location, marker_style, map, callback) {
    // Get LatLng point object based on location.
    lat_lng = getLatLng(location, function(point) {
        // Set marker
        var marker = new google.maps.Marker({
            position: point,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: marker_style 
        });

        if (callback && typeof callback === "function") {
            callback(marker);
        }

        return marker;
    });
}

function zoomToLocation(location, zoom_level, map, callback) {
    lat_lng = getLatLng(location, function(point) {
        map.panTo(point);
        map.setZoom(zoom_level);
        if (callback && typeof callback === "function") {
            callback(point);
        }
    });
    return lat_lng;
}

function getLatLng(location, callback) {
    // Get LatLng Point object based on various input.
    // Accepts a string location to search (e.g. "Brooklyn NY")
    // or an Array with latLng (eg. [40.7142, -74.0064])
    if (typeof location === 'string') {
        geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address': location}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var point = results[0].geometry.location;
                if (callback && typeof callback === "function") {
                    callback(point);
                }
            }
        });
    } else if (Object.prototype.toString.call(location) === '[object Array]') {
        var point = new google.maps.LatLng(location[0], location[1]); 
        if (callback && typeof callback === "function") {
            callback(point);
        }
        return point;
    } else {
        var point = "Could not find location: " + location;
        if (callback && typeof callback === "function") {
            callback(point);
        }
        return point;
    }
}
