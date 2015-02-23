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
    var msg = "Meldet die Stadt Köln neue Baustellen oder Ereignisse in dieser Region, können Sie sich per E-Mail rechtzeitig darüber informieren lassen. Dafür müssen  Sie über die Editierfunktion im nächsten Schritt eine Region auswählen, und im Anschluss eine E-Mail-Adresse eingeben. Es wird nur eine Benachrichtigung pro E-Mail-Adresse aktiviert, Sie können aber mehrere Regionen hinzufügen.";
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
  'click  .dialog-subscribe': function() {
    BauMel.Subscribe.dialogEMail();
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