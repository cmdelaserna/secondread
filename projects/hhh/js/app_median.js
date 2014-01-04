var map;
  function init(){
    // initiate leaflet map
    map = new L.Map('cartodb-map', { 
      center: [40.43,-3.65],
      zoom: 12,
      maxZoom: 14,
      minZoom: 11,
    })

     //  L.tileLayer('http://{s}.tiles.mapbox.com/v3/cartodb.map-u6vat89l/{z}/{x}/{y}.png', {
     //   attribution: 'MapBox'
     // }).addTo(map);

    //  outline * table: median_nh_data 
    var layerOutline= 'http://2read.cartodb.com/api/v1/viz/12840/viz.json';
    var layerOptions = {
              query: "SELECT * FROM {{table_name}}",
              tile_style: "#median_nh_data::outline{line-color:#333;line-width:0.1;line-join:round;}"
    }

    cartodb.createLayer(map, layerOutline, layerOptions)
     .on('done', function(layer) {
      map.addLayer(layer);
      layer.setOpacity(1);
      layer.setInteraction(false);
    }).on('error', function() {
      });

    // median-neighborhood
    var layerUrl = 'http://2read.cartodb.com/api/v1/viz/12840/viz.json';
    var layerOptions = {
              query:"SELECT * FROM {{table_name}} WHERE dist <= 515",
              tile_style:"#median_nh_data::outline{line-color:#333;line-width:2;line-join:round;line-dasharray:3,1}#median_nh_data{line-color: #f9f9f9;polygon-opacity: 1;polygon-comp-op: src-over;line-opacity: 1;line-dasharray:3,3;line-width: 0.5;line-join:round;}#median_nh_data [ dist <= 1165.25] {polygon-fill: #BD0026;}#median_nh_data [ dist <= 948.55] {polygon-fill: #F03B20;}#median_nh_data [ dist <= 731.85] {polygon-fill: #FD8D3C;}#median_nh_data [ dist <= 515] {polygon-fill: #FECC5C;}#median_nh_data [ dist <= 298] {polygon-fill: #FFFFB2;}#median_nh_data [ dist <= 172] {polygon-fill: #2B83BA;}"
    }

    var layers = [];

    cartodb.createLayer(map, layerUrl, layerOptions)
     .on('done', function(layer) {
      map.addLayer(layer);
      layer.setOpacity(0.9);
      layer.setInteraction(true);
      layers.push(layer);
    }).on('error', function() {
      });

    var LayerActions = {
      all: function(){
          layers[0].setOptions({
            query:"SELECT * FROM {{table_name}}",
            tile_style: "#median_nh_data::outline{line-color:#ededed;line-width:10;line-join:round;}#median_nh_data{line-color: #f9f9f9;polygon-opacity: 1;polygon-comp-op: src-over;line-opacity: 1;line-dasharray:3,3;line-width: 0.5;line-join:round;}#median_nh_data [ dist <= 1165.25] {polygon-fill: #BD0026;}#median_nh_data [ dist <= 948.55] {polygon-fill: #F03B20;}#median_nh_data [ dist <= 731.85] {polygon-fill: #FD8D3C;}#median_nh_data [ dist <= 515] {polygon-fill: #FECC5C;}#median_nh_data [ dist <= 298] {polygon-fill: #FFFFB2;}#median_nh_data [ dist <= 172] {polygon-fill: #2B83BA;}"
          });
          return true;
        },
      median: function(){
          layers[0].setOptions({
            query:"SELECT * FROM {{table_name}} WHERE dist <= 515",
            tile_style:"#median_nh_data::outline{line-color:#333;line-width:2;line-join:round;line-dasharray:3,1}#median_nh_data{line-color: #f9f9f9;polygon-opacity: 1;polygon-comp-op: src-over;line-opacity: 1;line-dasharray:3,3;line-width: 0.5;line-join:round;}#median_nh_data [ dist <= 1165.25] {polygon-fill: #BD0026;}#median_nh_data [ dist <= 948.55] {polygon-fill: #F03B20;}#median_nh_data [ dist <= 731.85] {polygon-fill: #FD8D3C;}#median_nh_data [ dist <= 515] {polygon-fill: #FECC5C;}#median_nh_data [ dist <= 298] {polygon-fill: #FFFFB2;}#median_nh_data [ dist <= 172] {polygon-fill: #2B83BA;}"
        });          
          return true;
        },
      clusters: function(){
          layers[0].setOptions({
          query:"SELECT dist, ST_Transform(ST_Buffer(ST_Centroid(the_geom)::geography, 0.80467*1000)::geometry,3857) as the_geom_webmercator FROM median_nh_data WHERE dist<172",
          tile_style: "#{{table_name}}{polygon-opacity:0.1;line-width: 3;line-color: #999;line-opacity: 1;polygon-comp-op: src-over;line-dasharray:3,1;polygon-fill:#2B83BA}"
        });
          return true;
        }
    }
    $('.button').click(function(){
      $('.button').removeClass('selected'); $(this).addClass('selected');
      LayerActions[$(this).attr('id')]();

    })

    // área de estudio
    // var layerArea = 'http://2read.cartodb.com/api/v1/viz/12826/viz.json';
    // var layerOptions = {
    //           query: "SELECT * FROM {{table_name}}",
    //           tile_style: "#{{table_name}}::outline{line-color:#333;line-width:3;line-join:round;line-dasharray:3,1}#{{table_name}}{polygon-fill:#4e9e16;polygon-opacity: 1;line-opacity:0;}",
    //           interactivity: "cartodb_id, the_geom"
    // }

    // cartodb.createLayer(map, layerArea, layerOptions)
    //  .on('done', function(layer) {
    //   map.addLayer(layer);
    //   layer.interaction.remove();
    //   layer.interaction = null;
    // }).on('error', function() {
    //   //log the error
    // });

    // área de estudio cluster
    var layerMiles = 'http://2read.cartodb.com/api/v1/viz/12853/viz.json';
    var layerOptions = {
              query: "SELECT * FROM {{table_name}}",
              tile_style: "#{{table_name}}{polygon-opacity:0;line-width: 3;line-color: #333;line-opacity: 1;polygon-comp-op: src-over;line-dasharray:3,1;polygon-fill:#2B83BA;}",
              interactivity: "cartodb_id, the_geom"
    }

    cartodb.createLayer(map, layerMiles, layerOptions)
     .on('done', function(layer) {
      map.addLayer(layer);
      layer.interaction.remove();
    }).on('error', function() {
      //log the error
    });

  }
