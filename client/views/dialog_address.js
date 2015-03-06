Template.dialogGeocodeAddress.rendered = function() {
      this.$('.modal').modal('show'); 
}; 


Template.dialogGeocodeAddress.events({
	'click  .close': function(event, template) {
		template.$('.modal').modal('hide');
		Blaze.remove(Blaze.currentView);
	},
	'click  .btn-address-ok': function(event, template) {
		var street = template.$('.valStreet').val();
		var number = template.$('.valNumber').val();

		// do some validation, show error if needed

		//if(street & number) {

			console.log("Starting geocoding...");
			template.$('.modal').modal('hide');
			Blaze.remove(Blaze.currentView);

		//};



		BauMel.Geocoder.geocodeAddress(street, number); 


	},
	'click  .btn-address-cancel': function(event, template) {
		template.$('.modal').modal('hide');
		Blaze.remove(Blaze.currentView);
	}
});