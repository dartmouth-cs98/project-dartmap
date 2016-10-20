var overlay1;
var overlay2;
var overlay3;
var overlays = [];
var map;
var memorialFieldX = 43.701394;
var memorialFieldY = -72.284448;
var collisX = 43.702732;
var collisY = -72.290032;
var thayerX = 43.704252;
var thayerY = -72.294903;

var eventImages = {
  'SPORT': './images/sports_icon.png',
  'GROUP': './images/group_icon.png',
};

USGSOverlay.prototype = new google.maps.OverlayView();

// Initialize the map and the custom overlay.
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.703337, lng: -72.288578},
    zoom: 16
  });
  google.maps.event.addListener(map, 'dragstart', function() {
    var parent = document.getElementsByTagName('body')[0];
    var popups = document.getElementsByClassName("popup");
    while (popups.length > 0) {
      parent.removeChild(popups[popups.length - 1]);
    }
  });

  var memorialFieldBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(memorialFieldX - .0002, memorialFieldY - .0003),
      new google.maps.LatLng(memorialFieldX + .0002, memorialFieldY + .0003));
  description1 = 'Football Game @1pm<br>Memorial Field';
  overlay1 = new USGSOverlay(memorialFieldBounds, map, description1, 'SPORT');

  var collisBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(collisX - .0002, collisY - .0003),
      new google.maps.LatLng(collisX + .0002, collisY + .0003));
  description2 = 'Super Smash Bros @2pm<br>Collis';
  overlay2 = new USGSOverlay(collisBounds, map, description2, 'GROUP');

  var thayerBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(thayerX - .0002, thayerY - .0003),
      new google.maps.LatLng(thayerX + .0002, thayerY + .0003));
  description3 = 'Hackathon @3pm<br>Thayer';
  overlay3 = new USGSOverlay(thayerBounds, map, description3, 'GROUP');
  overlays.push(overlay1, overlay2, overlay3);
}

/** @constructor */
function USGSOverlay(bounds, map, description, eventType) {

  // Initialize all properties.
  this.bounds_ = bounds;
  this.image_ = eventImages[eventType];
  this.map_ = map;
  this.description_ = description;
  this.eventType_ = eventType;

  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Create event item for the event menu.
  this.eventItem_ = document.createElement('div');
  this.eventItem_.className = 'event-item';
  var eventImg = document.createElement('img');
  eventImg.src = this.image_;
  this.eventItem_.appendChild(eventImg);
  this.eventItem_.innerHTML += ' ' + this.description_;
  document.getElementById('event-menu').appendChild(this.eventItem_);

  // Explicitly call setMap on this overlay.
  this.setMap(map);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
USGSOverlay.prototype.onAdd = function() {
  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  // Create the img element and attach it to the div.
  var img = document.createElement('img');
  img.src = this.image_;
  img.className = "mapImage";

  div.addEventListener("click", function() {
    createPopup(div.getBoundingClientRect(), this.description_);
  }.bind(this));
  div.appendChild(img);

  this.div_ = div;
  this.eventItem_.addEventListener("click", function() {
    createPopup(div.getBoundingClientRect(), this.description_);
  }.bind(this));

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
  panes.overlayMouseTarget.appendChild(div);
  google.maps.event.addDomListener(div, 'click', function (event) {
    google.maps.event.trigger(this, 'click');
  }.bind(this));
};

USGSOverlay.prototype.draw = function() {

  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's div to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
USGSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};

google.maps.event.addDomListener(window, 'load', initMap);

function createPopup(rect, description) {
  var offsetX = 30;
  var offsetY = 30;
  var popupDiv = document.createElement('div');
  popupDiv.className = 'popup';
  document.getElementsByTagName('body')[0].appendChild(popupDiv);
  popupDiv.style.position = 'absolute';
  popupDiv.style.left = (rect.left + offsetX) + 'px';
  popupDiv.style.top = (rect.top + offsetY) + 'px';
  popupDiv.innerHTML = description;
}
function removeOverlays() {
  for (var i = 0; i < overlays.length; i++){
    overlays[i].setMap(null);
  }
}
function restoreOverlays() {
  for (var i = 0; i < overlays.length; i++){
    overlays[i].setMap(map);
  }
}