BauMel.Maps = {
	/** @private */ map: NaN,

	/** @private */ clusterLayer: NaN,

	prepareMap: function() {

		this.map = L.map('map', {
			center: [50.936389, 6.952778],
			zoom: 13,
			maxZoom: 20,
			// drawControl: true
		});


		L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
			minZoom: 0,
			maxZoom: 20,
			subdomains: '1234',
			attribution: 'Imagery by <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
		}).addTo(this.map);


		BauMel.Subscribe.addTestControl(this.map); 

		return this.map;
	},

	setLoading: function() {
		$('.loading-spin').addClass('spinning');
		$('.loading-spin').addClass('glyphicon-refresh');
		$('.loading-spin').removeClass('glyphicon-globe');
	},
	setLoaded: function() {
		$('.loading-spin').removeClass('glyphicon-refresh');
		$('.loading-spin').removeClass('spinning');
		$('.loading-spin').addClass('glyphicon-globe');
	},

	getMap: function() {
		return this.map;
	},

	onEachFeature: function(feature, layer) {
		if (feature.properties) {
			var p = '',
				dateVon = new Date(feature.properties['DATUM_VON']).toLocaleDateString(),
				dateBis = new Date(feature.properties['DATUM_BIS']).toLocaleDateString(),
				link = 'http://www.stadt-koeln.de' + feature.properties['LINK'],
				prop;


			p += '<h4>' + feature.properties['NAME'] + '</h4>';
			p += '<p>' + feature.properties['BESCHREIBUNG'] + '</p>';
			if (dateVon == dateBis) {
				p += '<p> Am ' + dateVon + '</p>';
			} else {
				p += '<p> Von ' + dateVon + ' bis ' + dateBis + '</p>';
			}

			p += '<p><a href="' + link + '">Link für weitere Informationen</a></p>'
		}
		layer.bindPopup(p);
	},

	showBaustellen: function(baustellen) {
		this.setLoading();
		// remove layer
		if (this.clusterLayer && this.map.hasLayer(this.clusterLayer)) {
			this.map.removeLayer(this.clusterLayer);
		}

		var geojsonMarkerOptions = {
			radius: 8,
			fillColor: '#ff7800',
			color: '#000',
			weight: 1,
			opacity: 1,
			fillOpacity: 0.8
		};

		var myIcon = L.icon({
			iconUrl: 'packages/fuatsengul_leaflet/images/marker-icon.png',
			shadowUrl: 'packages/fuatesengul_leaflet/images/marker-shadow.png',
		});

		var markerLayer = L.geoJson(baustellen, {
			onEachFeature: this.onEachFeature,
			pointToLayer: function(feature, latlng) {
				// return L.circleMarker(latlng, geojsonMarkerOptions);
				//return L.marker(latlng);
				return L.marker(latlng, {
					icon: myIcon
				});
			}
		})

		this.clusterLayer = new L.MarkerClusterGroup();
		this.clusterLayer.addLayer(markerLayer);

		this.map.addLayer(this.clusterLayer);


		// zoom to 

		this.map.fitBounds(this.clusterLayer.getBounds(), {
			padding: [2, 2]
		});

		this.setLoaded();
	}


};