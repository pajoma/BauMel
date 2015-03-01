Template.dialogEmail.rendered = function() {
	this.$('.modal').modal('show');
};

Template.dialogEmail.events({
	'click  .close': function(event, template) {
		template.$('.modal').modal('hide');
		Blaze.remove(Blaze.currentView);
	},
	'click  .btn-ok': function(event, template) {
		BauMel.Subscribe.addSubscribeOptionsControl();
		template.$('.modal').modal('hide');
		Blaze.remove(Blaze.currentView);
	},
	'click  .btn-cancel': function(event, template) {
		template.$('.modal').modal('hide');
		Blaze.remove(Blaze.currentView);
	}
});