Template.dialogEmail.rendered = function() {
	this.$('.modal').modal('show');
};

Template.dialogEmail.events({
	'click  .close': function(event, template) {
		template.$('.modal').modal('hide');
		Blaze.remove(Blaze.currentView);
	},
	'click  .btn-ok': function(event, template) {
		


		var email = template.$('.valEmail').val();
		var code = template.$('.valCode').val();

		// check for empty string
		if(code) {
			BauMel.Subscribe.setSubscriptionCode(code); 
		}

		if(email) {
			template.$('.modal').modal('hide');
			Blaze.remove(Blaze.currentView);
			BauMel.Subscribe.setEMail(email); 

			BauMel.Subscribe.addSubscribeOptionsControl();

		} else {
			// show error in dialog
		}

	},
	'click  .btn-cancel': function(event, template) {
		template.$('.modal').modal('hide');
		Blaze.remove(Blaze.currentView);
	}
});