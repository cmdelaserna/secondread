var map;
  function init(){
    // initiate leaflet map
    map = new L.Map('cartodb-map', { 
      center: [40.4342354,-3.69],
      zoom: 15
    })

     //  L.tileLayer('http://a.tiles.mapbox.com/v3/carlosmartinezserna.map-4490mhf2/{z}/{x}/{y}.png', {
     //   attribution: 'MapBox'
     // }).addTo(map);


    // calles Madrid
    // var layerUrl = 'http://2read.cartodb.com/api/v1/viz/11336/viz.json';
    // var layerOptions = {
    //   tile_style: "#{{table_name}}{line-width:0.5;line-color:#ccc;} ",
    // }

    // cartodb.createLayer(map, layerUrl, layerOptions)
    //  .on('done', function(layer) {
    //   map.addLayer(layer);
    //   layer.interaction.remove();
    //   layer.interaction = null;
    // }).on('error', function() {
    //   //log the error
    // });

    // secciones censales
    var layer2Url = 'http://2read.cartodb.com/api/v1/viz/11338/viz.json';
    var layerOptions = {
              query: "SELECT * FROM {{table_name}}",
              tile_style: "#{{table_name}}{line-color:#e26262;line-width:2;polygon-opacity:0;line-dasharray:3,3;} ",
              interactivity: "cartodb_id, the_geom"

    }

    cartodb.createLayer(map, layer2Url, layerOptions)
     .on('done', function(layer) {
      map.addLayer(layer);
      layer.interaction.remove();
      layer.interaction = null;
    }).on('error', function() {
      //log the error
    });

    // áreas sanitarias
    var layer3Url = 'http://2read.cartodb.com/api/v1/viz/11321/viz.json';
    var layerOptions = {
              query: "SELECT * FROM {{table_name}}",
              tile_style: "#{{table_name}}{line-color:#85c5d3;line-width:5;opacity:0.7;polygon-opacity:0;polygon-fill:#85c5d3;} #{{table_name}}::labels [zoom>12]{text-name: [desbdt];text-face-name: 'DejaVu Sans Book';text-size: 11;text-fill: #333;text-allow-overlap: true;text-halo-fill: #FFF;text-halo-radius: 1;text-dy: -10;}",
              interactivity: "cartodb_id, the_geom"
    }

    cartodb.createLayer(map, layer3Url, layerOptions)
     .on('done', function(layer) {
      map.addLayer(layer);
      layer.interaction.remove();
      layer.interaction = null;
    }).on('error', function() {
      //log the error
    });

     // prueba toggle
    var layer4Url = 'http://2read.cartodb.com/api/v1/viz/10657/viz.json';
    var layerOptions = {
              query: "SELECT * FROM {{table_name}}",
              tile_style: "#{{table_name}}{ line-color: #FFF;line-opacity: 0.8;line-width: 1;polygon-opacity: 0.5;line-dasharray:2,2;}",
              interactivity: "cartodb_id, the_geom"
    }

    // cartodb.createLayer(map, layer4Url, layerOptions)
    //  .on('done', function(layer) {
    //   map.addLayer(layer);
    //   layer.interaction.remove();
    //   layer.interaction = null;
    // }).on('error', function() {
    //   //log the error
    // });

  }
