BauMel.DAO = {};  

BauMel.DAO.Subscriptions = {
	subscriptionsDb: null,
	getSubscriptionsDB: function() {
		if(!this.subscriptionsDb) {
			this.subscriptionsDb = new Mongo.Collection("subscriptions"); 
		}
		return this.subscriptionsDb; 
	},

	/*
		{
			email: "hubertus@sturmius.de". 
			code: "sr3s23", 
			subscribedRegion: {
				type: "FeatureCollection", 
				geometries: [
				
				]
			}

		}
		

	*/

	insertSubscription: function() {

	}, 

	getSubscription: function(email) {

	}, 

	validateCode: function(email, code) {

	}
}

BauMel.DAO.Features = {
		featuresDb: null, 
	

	getFeaturesDB: function() {
		if(!this.featuresDb) {
			this.featuresDb = new Mongo.Collection("features"); 
		}
		return this.featuresDb; 
	}, 
	

	loadFeaturesIntoDB: function(featureCollection) {
		if (!featureCollection) return;

		console.log("Loading " + featureCollection.features.length + " features into database. ")

		featureCollection.features.forEach(function(feature) {
			var count = BauMel.DAO.Features.getFeaturesDB().find({
				id: feature.properties["OBJECTID"]
			}).count()
			if (count === 0) {
				BauMel.DAO.Features.getFeaturesDB().insert({
					id: feature.properties["OBJECTID"],
					datumVon: feature.properties["DATUM_VON"],
					datumBis: feature.properties["DATUM_BIS"],
					feature: feature
				});
				console.log("New Feature: " + feature.properties["NAME"]);
			}

		});
		console.log("Database update complete.")
	},

	findFeaturesByDate: function(dateFrom, dateTo) {

		console.log("New request until "+new Date(dateTo).toDateString()); 
		var cursor = BauMel.DAO.Features.getFeaturesDB().find({
			$and: [{
				datumVon: {
					$gte: dateFrom
				}
			}, {
				datumBis: {
					$lte: dateTo
				}
			}]
		}, {
			fields: {
				datumVon: 0,
				datumBis: 0,
				id: 0,
				_id: 0
			}
		});

		var featureCollection = {
			type: "FeatureCollection",
			features: new Array()
		};
		cursor.forEach(function(post) {
			featureCollection.features.push(post.feature)
		});
		return featureCollection;
	}


}; 