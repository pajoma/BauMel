Template.dialogHelp.rendered = function() {
      this.$('.modal').modal('show'); 
}; 

Template.dialogHelp.events({
    'click  .close': function() {
      Blaze.remove(Blaze.currentView);  
    }, 
    'click  .btn-ok': function() {
      Blaze.remove(Blaze.currentView);  
    }
});