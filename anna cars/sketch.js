// https://mappa.js.org/docs/getting-started.html

// Other possible interesting videos:
// Subscribers data: https://www.youtube.com/watch?v=Ae73YY_GAU8&feature=youtu.be
// Earthquake Data: https://www.youtube.com/watch?v=ZiYdOwOrGyc&t=1083s

// For integrating images: https://www.youtube.com/watch?v=FVYGyaxG4To
let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

let pathArrayOfPointsLat = [];
let pathArrayOfPointsLon = [];

let opathArrayOfPointsLat = [];
let opathArrayOfPointsLon = [];

let oopathArrayOfPointsLat = [];
let oopathArrayOfPointsLon = [];


let ooopathArrayOfPointsLat = [];
let ooopathArrayOfPointsLon = [];

let positionX = [];
let positionY = [];


// These are all our map options in a single JavaScript object
// We will access these map options with the DOT notation
let options = {
  lat: 42.94918116386573,
  lng: -78.82186040367509,
  zoom: 18,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

function preload() {

  firstPath = loadTable('Anna_cars_track_points.csv', 'csv', 'header');

}

function setup() {
  canvas = createCanvas(1000, 1000);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(clear);


  myMap.onChange(drawPath.bind(null, firstPath));
  myMap.onChange(drawLinePath.bind(null));

}


function drawPath(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'reclon'));
    const longitude = Number(path.getString(i, 'reclat'));

    pathArrayOfPointsLat[i] = latitude;
    pathArrayOfPointsLon[i] = longitude;

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);

      stroke('cyan');
      strokeWeight(0.5);
      ellipse(pos.x, pos.y, 1, 1)
    }
  }
}

function drawLinePath() {
  // clear();
  stroke('white');
  strokeWeight(0.2);

  if (pathArrayOfPointsLat.length > 0){
    noFill();


    beginShape();
    for (let i = 0; i < pathArrayOfPointsLat.length; i++) {
    var pos = myMap.latLngToPixel(pathArrayOfPointsLat[i], pathArrayOfPointsLon[i]);
    vertex(pos.x, pos.y);

    }

    endShape();

    // stroke('white');
    // strokeWeight(1);
    // ellipse(pos.x, pos.y, 1, 1)
  }
}
