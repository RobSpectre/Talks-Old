function advanceMap(event) {
  var slide = Reveal.getCurrentSlide();
  var value = event.fragment.innerHTML;

  try {
    data = JSON.parse(value);
  } catch (e) {
    console.log("Failed to parse value for fragment: " + value);
  }

  if ($(event.fragment).hasClass('zoom')) {
    event.fragment.previous_state = {};
    event.fragment.previous_state.location = slide.map.getCenter();
    event.fragment.previous_state.zoom = slide.map.getZoom();
    zoomToLocation(data.location, data.zoom);
  } else if ($(event.fragment).hasClass('marker')) {
    event.fragment.markers = [];

    if (data.constructor === Array) {
      data.forEach(function(marker) {
        addMarker(marker.location, marker.style, function(point) {
          event.fragment.markers.push(point);
        });   
      });
    } else {
      addMarker(data.location, data.style, function(marker) {
        event.fragment.markers.push(marker);
      });   
    }
  } else {
    console.log("Unknown fragment class for: " + event.fragment.id);
  }
}

function retreatMap(event) {
  var slide = Reveal.getCurrentSlide();

  if ($(event.fragment).hasClass('zoom')) {
    slide.map.panTo(event.fragment.previous_state.location);
    slide.map.setZoom(event.fragment.previous_state.zoom);
  } else if ($(event.fragment).hasClass('marker')) {
    event.fragment.markers.forEach(function(marker) {
      marker.setMap(null); 
    });
  } else {
    console.log("Unknown fragment class for: " + event.fragment.id);
  }
}

function processMapSlide(currentSlide) {
  var map_div = currentSlide.getElementsByClassName('map')[0];
  var value = map_div.innerHTML;

  try {
    mapOptions = JSON.parse(value);
  } catch(e) {
    mapOptions = undefined;
  }

  mapOptions = getMapOptions(mapOptions);

  if (typeof mapOptions.location != 'undefined') {
    return getLatLng(mapOptions.location, function(point) {
      mapOptions.center = point;
      map = createMap(map_div, mapOptions);
      currentSlide.map = map;
    });
  } else {
    map = createMap(map_div, mapOptions);
    currentSlide.map = map;
  }
}

function createMap(map_div, mapOptions) {
  var styledMap = new google.maps.StyledMapType(map_styles, {name: "Styled Map"});

  var map = new google.maps.Map(map_div, mapOptions);

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  return map;
}

function getMapOptions(mapOptions) {
  var mapDefaults = {
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

  if (typeof mapOptions === 'undefined') {
    return mapDefaults;
  } else {
    return $.extend({}, mapDefaults, mapOptions);
  }
}

function addMarker(location, marker_style, callback) {
  slide = Reveal.getCurrentSlide();
  // Get LatLng point object based on location.
  lat_lng = getLatLng(location, function(point) {
    marker_style = getMarkerStyle(marker_style);

    // Set marker
    var marker = new google.maps.Marker({
      position: point,
      map: slide.map,
      animation: google.maps.Animation.DROP,
      icon: marker_style 
    });

    if (callback && typeof callback === "function") {
      callback(marker);
    }

    return marker;
  });
}

function zoomToLocation(location, zoom_level, callback) {
  slide = Reveal.getCurrentSlide();

  lat_lng = getLatLng(location, function(point) {
    slide.map.panTo(point);
    slide.map.setZoom(zoom_level);
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
  var point = false;
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
    point = new google.maps.LatLng(location[0], location[1]); 
    if (callback && typeof callback === "function") {
      callback(point);
    }
    return point;
  } else {
    point = "Could not find location: " + location;
    if (callback && typeof callback === "function") {
      callback(point);
    }
    return point;
  }
}

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

var map_styles = [
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
