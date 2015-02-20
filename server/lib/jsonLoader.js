(function() {


  "use strict";

  var root;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  var fetchData = function(callback) {
      var url = 'http://geoportal1.stadt-koeln.de/ArcGIS/rest/services/WebVerkehr_DataOSM/MapServer/0/query?text=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=objectid%20is%20not%20null&time=&returnCountOnly=false&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outSR=4326&outFields=*&f=json';
      var data;

      HTTP.get(url, function(err, res) {
        var esriJson = EJSON.parse(res.content);
        var geoJSON = convertData(esriJson);

        console.log("response: " + geoJSON);
        callback(geoJSON);

      });



    }
    /*
        $.ajax({
          url: url,
          dataType: 'jsonp',
          error: function(xhr, status, error) {
            alert(error.message);
          },
          success: jsonpCallback
        });*/

  var convertData = function(esriJson) {
    var converter = esriConverter();
    return converter.toGeoJson(esriJson);
  }

  var loadDataInto = function(callback) {
    fetchData(callback);
  }

  if (typeof define === 'function') {
    var module = {
      loadDataInto: loadDataInto
    };

    define([], function() {

      return module;

    });
  } else {
    root.loadDataInto = loadDataInto;
  }

}).call(this);