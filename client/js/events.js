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
  },
  'click  .1year': function() {
    Meteor.call('loadFeatures', new Date().valueOf() + 31556952000, function(error, response) {
      BauMel.Maps.showBaustellen(response);
    });
  },
  'click  .dialog-about': function() {
    Blaze.render(Template.dialogAbout, document.body);  
  },
  'click  .dialog-how': function() {
    Blaze.render(Template.dialogHelp, document.body); 
  },
  'click  .dialog-subscribe': function() {
    Blaze.render(Template.dialogEmail, document.body);
  },
  'click  .dialog-test': function() {
    BauMel.Subscribe.addSubscribeOptionsControl(); 
  },
});


Template.map.events({
    'click  .cancel-region': function() {
      BauMel.Subscribe.disableEditMode(BauMel.Maps.getMap());
    },
    'click  .ok-region': function() {
      BauMel.Subscribe.subscribe();
    },
  
});







