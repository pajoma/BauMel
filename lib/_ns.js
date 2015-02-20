BauMel = {};


// according to https://medium.com/@sirchill3/meteor-managing-the-global-namespace-5a50080a05ea
// his source code: https://github.com/jchurchill/redscare/blob/master/controllers/create_game_controller.js
// but "this.globalScope" us undefined
BauMel.Namespacer = function(namespace, members) {
	var names = namespace.split("."); 
		// defined in Namespacer constructor
	var currentContext = this.globalScope;

	// Add namespaces if they don’t already exist
	_.each(names, function(name) {
		if (name.length === 0) {
			throw "Invalid namespace: " + namespace;
		}
		if (!currentContext[name]) {
			currentContext[name] = {};
		}
		currentContext = currentContext[name];
	});

	// Add members to namespace
	_.each(members, function(value, key) {
		currentContext[key] = value;
	});
};