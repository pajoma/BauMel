



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

}

  

if (Meteor.isServer) {
  Meteor.startup(function() {
    // initially load data into database
    var callback = BauMel.DAO.Features.loadFeaturesIntoDB; 
    var baustellen = loadDataInto(callback);
  });

  Meteor.methods({
    loadFeatures: function(dateTo) {
      return BauMel.DAO.Features.findFeaturesByDate(new Date().valueOf(), dateTo); 
    }, 
    geocodeAddress: function(data) {
      console.log("New Geocoding request for "+data.street+" "+data.number); 

      return {
        result: [50.922389, 6.955778]
      }; 


    }
  });
}