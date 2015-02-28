Template.dialogEmail.rendered = function() {
	this.$('.modal').modal('show');
};

Template.dialogEmail.events({
	'click  .close': function() {
		Blaze.remove(Blaze.currentView);
	},
	'click  .btn-ok': function() {
		BauMel.Subscribe.enableEditMode();
		Blaze.remove(Blaze.currentView);
	},
	'click  .btn-cancel': function() {
		Blaze.remove(Blaze.currentView);
	}
});