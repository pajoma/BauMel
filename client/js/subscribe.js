BauMel.Subscribe = {
	/** @type {L.FeatureGroup} The layer with the used-added regions. */
	subscribedRegionsLayer: null,

	/** @type {[L.Control.Draw]}  Toolbar for editing mode. */
	editControls: null,

	subscribeOptionsControl: null,

	infoControl: null,

	email: null,

	code: null,

	/**
	 * Activates the toolbar too draw rectangles on the map, with each rectangle being a region the user
	 * wants to be notified about in case of new events (baustellen, meldungen)
	 * @param  {L.Map} A leaflet map object
	 */
	enableEditMode: function() {
		var map = BauMel.Maps.getMap();


		this.subscribedRegionsLayer = new L.FeatureGroup();
		map.addLayer(this.subscribedRegionsLayer);

		var options = {
			draw: {
				polyline: false,
				polygon: false,
				circle: false,
				rectangle: {
					shapeOptions: {
						// required for deletion
						clickable: true
					}
				},
				marker: false
			},
			edit: {
				featureGroup: this.subscribedRegionsLayer, //REQUIRED!!
				remove: true
			}
		};
		this.editControls = new L.Control.Draw(options);
		map.addControl(this.editControls);

		map.on('draw:created', function(e) {
			if (e.layerType === 'rectangle') {
				// Do marker specific actions
				$('.ok-region').removeClass('disabled');
			}

			// Do whatever else you need to. (save to db, add to map etc)
			BauMel.Subscribe.addRegion(e.layer);
		});

		this.addInfoControl(map);



		// disable controls
		$('.7days').addClass('disabled');
		$('.30days').addClass('disabled');
		$('.3months').addClass('disabled');

	},
	addRegion: function(layer) {
		this.subscribedRegionsLayer.addLayer(layer);

	},

	addSubscribeOptionsControl: function() {
		var map = BauMel.Maps.getMap();

		/* Layer für die gemalten Regeionen */
		this.subscribedRegionsLayer = new L.FeatureGroup();
		map.addLayer(this.subscribedRegionsLayer);



		L.Control.EditSubscription = L.Control.Draw.extend({
			options: {
				position: 'topleft',
				draw: {
					polyline: true,
					polygon: false,
					circle: false,
					rectangle: {
						shapeOptions: {
							// required for deletion
							clickable: true
						}
					},
					marker: false
				},
				edit: {
					featureGroup: this.subscribedRegionsLayer, //REQUIRED!!
					remove: true
				}
			},
			onAdd: function(map) {
				this.onAdd(map); 
				
				var containerDiv = L.DomUtil.create('div', 'leaflet-bar');

				//var geocoderControl = L.DomUtil.create('div', 'leaflet-draw-toolbar', containerDiv);
				var geocoderUI = L.DomUtil.create('a', 'disabled controls-icon-appearence mdi-image-filter-tilt-shift', containerDiv);
				geocoderUI.title = 'Adresse hinzufügen';
				geocoderUI.href = '#';
				L.DomEvent
					.addListener(geocoderUI, 'click', L.DomEvent.stopPropagation)
					.addListener(geocoderUI, 'click', L.DomEvent.preventDefault)
					.addListener(geocoderUI, 'click', function() {
						drawnItems.clearLayers();
					});

				// url('packages/bdunnette_leaflet-draw/images/spritesheet.png');

				// var routingControl = L.DomUtil.create('div', 'leaflet-draw-toolbar', containerDiv);
				var routingUI = L.DomUtil.create('a', 'disabled controls-icon-appearence  mdi-notification-time-to-leave', containerDiv);
				routingUI.title = 'Route hinzufügen';
				routingUI.href = '#';
				L.DomEvent
					.addListener(routingUI, 'click', L.DomEvent.stopPropagation)
					.addListener(routingUI, 'click', L.DomEvent.preventDefault)
					.addListener(routingUI, 'click', function() {
						drawnItems.clearLayers();
					});

				var editUI = L.DomUtil.create('a', 'disabled controls-icon-appearence mdi-action-tab-unselected', containerDiv);
				//	L.DomUtil.create('i', 'mdi-action-tab-unselected', editUI);

				editUI.title = 'Regionen zeichnen';
				editUI.href = '#';
				L.DomEvent
					.addListener(editUI, 'click', L.DomEvent.stopPropagation)
					.addListener(editUI, 'click', L.DomEvent.preventDefault)
					.addListener(editUI, 'click', function() {
						drawnItems.clearLayers();
					});


				return containerDiv;
			}
		});


		var test = new L.Control.EditSubscription();
		map.addControl(test);

		L.Control.SubscribeOptions = L.Control.extend({
			options: {
				position: 'topleft',
			},
			onAdd: function(map) {
				var containerDiv = L.DomUtil.create('div', 'leaflet-bar');

				//var geocoderControl = L.DomUtil.create('div', 'leaflet-draw-toolbar', containerDiv);
				var geocoderUI = L.DomUtil.create('a', 'disabled controls-icon-appearence mdi-image-filter-tilt-shift', containerDiv);
				geocoderUI.title = 'Adresse hinzufügen';
				geocoderUI.href = '#';
				L.DomEvent
					.addListener(geocoderUI, 'click', L.DomEvent.stopPropagation)
					.addListener(geocoderUI, 'click', L.DomEvent.preventDefault)
					.addListener(geocoderUI, 'click', function() {
						drawnItems.clearLayers();
					});

				// url('packages/bdunnette_leaflet-draw/images/spritesheet.png');

				// var routingControl = L.DomUtil.create('div', 'leaflet-draw-toolbar', containerDiv);
				var routingUI = L.DomUtil.create('a', 'disabled controls-icon-appearence  mdi-notification-time-to-leave', containerDiv);
				routingUI.title = 'Route hinzufügen';
				routingUI.href = '#';
				L.DomEvent
					.addListener(routingUI, 'click', L.DomEvent.stopPropagation)
					.addListener(routingUI, 'click', L.DomEvent.preventDefault)
					.addListener(routingUI, 'click', function() {
						drawnItems.clearLayers();
					});

				var editUI = L.DomUtil.create('a', 'disabled controls-icon-appearence mdi-action-tab-unselected', containerDiv);
				//	L.DomUtil.create('i', 'mdi-action-tab-unselected', editUI);

				editUI.title = 'Regionen zeichnen';
				editUI.href = '#';
				L.DomEvent
					.addListener(editUI, 'click', L.DomEvent.stopPropagation)
					.addListener(editUI, 'click', L.DomEvent.preventDefault)
					.addListener(editUI, 'click', function() {
						drawnItems.clearLayers();
					});


				return containerDiv;
			}
		});



		// this.subscribeOptionsControl = new L.Control.SubscribeOptions();
		// map.addControl(this.subscribeOptionsControl);


	},

	addInfoControl: function(map) {
		this.infoControl = L.control();

		/*L.Routing.control({
			geocoder: L.Control.Geocoder.nominatim()
		}).addTo(map);
*/
		L.Routing.control({
			waypoints: [
				L.latLng(50.74, 6.94),
				L.latLng(52.5, 7.949)
			]
		}).addTo(map);


		this.infoControl.onAdd = function(map) {
			this._div = L.DomUtil.create('div', ''); // create a div with a class "info"
			this.update();
			return this._div;
		};


		// method that we will use to update the control based on feature properties passed
		this.infoControl.update = function(props) {
			var html = '<div class="panel panel-default">' +
				' <div class="panel-body">' +
				'   Region auswählen und <br/> anschließend mit <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> bestätigen' +
				'  </div>' +
				'  <div class="panel-footer">' +
				'     <div class="btn-toolbar">' +
				'     <button type="button" style="margin-right:4px" class="disabled pull-right ok-region btn btn-primary">' +
				'     <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button>' +
				'     <button type="button" style="margin-right:4px" class="pull-right cancel-region btn btn-default">' +
				'     <span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>' +
				'   </div>' +
				' </div>' +
				'</div>';


			this._div.innerHTML = html;
			/*
				'' +
				'<div class="panel panel-default"><div class="panel-body">' +
				'Region auswählen und anschließend mit <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span> bestätigen' +
				'</div><div class="panel-footer">' +
				'<button type="button" class="pull-right cancel-subscription btn btn-danger">  <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>' +
			    '<button type="button" style="margin-left: 5px" class="pull-right dialog-insertEmail btn btn-success">  <span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span></button>'+
			    '</div></div>'; 
			    */
		};

		map.addControl(this.infoControl);
	},

	removeInfoControl: function(map) {
		map.removeControl(this.infoControl);
	},

	/**
	 * Removes the edit controls and added regions from map.
	 * @param  {L.Map} A leaflet map object
	 */
	disableEditMode: function() {
		var map = BauMel.Maps.getMap();

		map.removeControl(this.infoControl);
		map.removeControl(this.editControls);

		if (this.subscribedRegionsLayer && map.hasLayer(this.subscribedRegionsLayer)) {
			map.removeLayer(this.subscribedRegionsLayer);
		}

		$('.7days').removeClass('disabled');
		$('.30days').removeClass('disabled');
		$('.3months').removeClass('disabled');


	},
	subscribe: function() {



	},

	// deprecated
	dialogEMail: function() {
		var mail = '<h5>Bitte geben Sie ihre E-Mail-Adresse an: </h5>' +
			'<div class="input-group">' +
			'<span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></span>' +
			'<input type="text" id="email" class="form-control" placeholder="E-Mail" aria-describedby="basic-addon1">' +
			'</div>';
		var code = '<h5>Falls Sie einen Code zur Hand haben, können Sie eine bestehende Benachrichtigung editieren: </h5>' +
			'<div class="input-group">' +
			'<span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-certificate" aria-hidden="true"></span></span>' +
			'<input type="text" id="code" class="form-control" placeholder="Code" aria-describedby="basic-addon1">' +
			'</div>';
		var msg = mail + code;

		bootbox.dialog({
			title: "Benachrichtigung einrichten",
			message: msg,
			buttons: {
				cancel: {
					label: "Abbrechen",
					className: "btn-default",
					callback: function() {
						BauMel.Subscribe.disableEditMode();
					}
				},
				confirm: {
					label: "Ok",
					className: "btn-primary",
					callback: function() {
						// TODO: validate email

						this.code = $('#code').val();
						this.email = $('#email').val();

						BauMel.Subscribe.enableEditMode();
					}
				}
			}
		});


	}
}