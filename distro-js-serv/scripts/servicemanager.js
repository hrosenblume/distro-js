// Handle exporting all the functions
var self = this;


// Import models
var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var DSS = mongoose.model('DSS');
var Job = mongoose.model('Job');


self.start  = function(){
	// Some logic here
}

//Socket Listeners
self.onConnect = function(socket) {
	// Request authentication browserId
	socket.emit('requestAuth');
	// On response
	socket.on('sendAuth', function(data) {
		var browserId = data.browserId;
		// Update or create client where the status is ready
		Client.findOneAndUpdate({browserId: browserId}, {status: "ready"},
			{upsert: true}, function (err, client) {
				if (err) {
					console.log(err);
				} else {
					console.log("Client authenticated: " + client);	
				}
		});
		// Make the client unavailable if they disconnect
		socket.on('disconnect' ,function() {
			Client.findOneAndUpdate({browserId: browserId}, {status: "unavailable"},
				function(err, client) {
					if  (err) { console.log(err); }
					else {
						console.log("Client disconnected: " + client);
					}
				})
		});
	});
	//when connect to client
}

self.onDisconnect = function(socket) {
	//when disconnect from client
}

self.onSuccess = function (socket) {
	//when job is completed
}

self.onError = function (socket) {
	//when job errors out
}

//DSS Listeners
self.addJobToDB = function (job) {
	//adds job to DB on successful connection
	//between servicemanger and client
}

//Client Calls to Action
self.sendJobToClient = function(job, client) {
	//changes status of job in database to "running"
	//sends job directly to the right one
}

self.killJobOnClient = function (client) {
	//changes status of job in database to "inactive"
	//sends job directly to the right one
}

//DSS Calls to Action
self.startDSS = function (dss) {

}

self.killDSS = function (dss) {

}

module.exports = self;