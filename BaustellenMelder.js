Features = new Mongo.Collection("features");




if (Meteor.isClient) {

  Template.map.rendered = function() {

    // create Leaflet map 
    var map = BauMel.Maps.prepareMap();

    // get JSON from server
    var year = new Date().valueOf() + 31556952000; 
    Meteor.call('loadFeatures', year, function(error, response) {
      // and load into map
      BauMel.Maps.showBaustellen(response);
    });



  };

  Template.map.helpers({


  });



  Template.menu.events({
    'click .7days': function() {
      Meteor.call('loadFeatures', new Date().valueOf() + 604800000, function(error, response) {
        BauMel.Maps.showBaustellen(response);
      });
    },
    'click  .30days': function() {
      Meteor.call('loadFeatures', new Date().valueOf() + 2592000000, function(error, response) {
        BauMel.Maps.showBaustellen(response);
      });
    },
    'click  .3months': function() {
      Meteor.call('loadFeatures', new Date().valueOf() + 7776000000, function(error, response) {
        BauMel.Maps.showBaustellen(response);
      });
    },  'click  .1year': function() {
      Meteor.call('loadFeatures', new Date().valueOf() + 31556952000, function(error, response) {
        BauMel.Maps.showBaustellen(response);
      });
    },
    'click  .dialog-about': function() {
      var msg = "Der Baustellen-Melder für Köln zeigt ihnen die in der nächsten Zeit geplanten Baustellen im Stadtgebiet und zum Teil darüber hinaus."
      var title = "Was ist der Baustellen-Melder?";
      bootbox.dialog({
        message: msg,
        title: title,
        buttons: {
          success: {
            label: "Toll",
            className: "btn-success"
          }
        }
      })
    },
    'click  .dialog-how': function() {
      var msg = "Sie können sich über neue Baustellen benachrichtigen lassen. Diese Funktion ist derzeit noch nicht implementiert.";
      var title = "Wie funktionieren Benachrichtungen?";
      bootbox.dialog({
        message: msg,
        title: title,
        buttons: {
          success: {
            label: "Alles klar",
            className: "btn-success"
          }
        }
      })
    },
  });


}

if (Meteor.isServer) {
  Meteor.startup(function() {

    Features._ensureIndex( { 'id': 1 });

    // initially load data into database
    var loadFeaturesIntoDB = function(featureCollection) {

      featureCollection.features.forEach(function(feature) {
        Features.insert({
          id: feature.properties["OBJECTID"],
          datumVon: feature.properties["DATUM_VON"],
          datumBis: feature.properties["DATUM_BIS"],
          feature: feature
        });
      });
    }

    var baustellen = loadDataInto(loadFeaturesIntoDB);

  });



  Meteor.methods({
    loadFeatures: function(dateTo) {
      var cursor = Features.find({
        $and: [{
          datumVon: {
            $gte: new Date().valueOf() - 604800000
          }
          }, {
          datumBis: {
            $lte: dateTo
          }
        }]
      }, {
        fields: {
          datumVon: 0,
          datumBis: 0,
          id: 0,
          _id: 0
        }
      });

      var featureCollection = {
        type: "FeatureCollection",
        features: new Array()
      };
      cursor.forEach(function(post) {
        featureCollection.features.push(post.feature)
      });
      return featureCollection;
    }

  });
}