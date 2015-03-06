BauMel.Geocoder = {
	/** Leaflet Map Objject */
	map: NaN, 

	showDialog: function() {
		Blaze.render(Template.dialogGeocodeAddress, document.body); 
	}, 

	geocodeAddress: function(street, number) {

		//L.Control.geocoder().addTo(this.map); 

		Meteor.call('geocodeAddress', {street: street, number: number}, function(error, response) {
	      // and load into map
    	  // BauMel.Maps.showBaustellen(response);
    	  console.log("Geocoding response: "+response); 

    	  // add geocoded response to map

    	  BauMel.Subscribe.addAddressCoordinates(response); 
    	});



	}, 

	setMap: function(map) {
		this.map = map; 
	}
}



// server side methods for geocoding
/*
if (Meteor.isServer) {
 
  Meteor.methods({
    geocodeAddress: function(data) {
    	console.log("New Geocoding request for "+data.street+" "+data.number); 

    	return {
    		result: [50.922389, 6.955778]
    	}; 


    }
  });
}
*/