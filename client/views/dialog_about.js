Template.dialogAbout.rendered = function() {
      this.$('.modal').modal('show'); 
}; 

Template.dialogAbout.events({
    'click  .close': function() {
      Blaze.remove(Blaze.currentView);  
    }, 
    'click  .btn-ok': function() {
      Blaze.remove(Blaze.currentView);  
    }
});