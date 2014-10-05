// Handle exporting all the functions
var self = this;


// Import models
var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var DSS = mongoose.model('DSS');
var Job = mongoose.model('Job');


// Background Process Manager
var procManager = require('./backgroundprocessmanager.js');

self.start  = function(io){

	// procManager.init(self);
	// var sockets = io.connected;
	
	console.log("Starting service manager");

	//Socket Listeners
	self.onConnect = function(socket) {
		// Request authentication browserId
		socket.emit('requestAuth');
		// On response
		socket.on('sendAuth', function(data) {
			var browserId = data.browserId;
			// Update or create client where the status is ready
			Client.findOneAndUpdate({browserId: browserId},
				{status: "ready", socketId: socket.id},
				{upsert: true}, function (err, client) {
					if (err) {
						console.log(err);
					} else {
						console.log("Client authenticated: " + client);	

						// When client disconnects
						socket.on('disconnect' , function() {
							onDisconnect(socket, client);
						});

						// When job completes successfully
						socket.on('jobSuccess', function(data) {
							onJobSuccess(socket, client, data);
						});

						// When job completes with an error
						socket.on('jobError', function(data) {
							onJobError(socket, client, data);
						});

						// This is the example format for a test job
						var testJob = {
							func: "function start(params) { console.log(params) }",
							params: ["Hello", "World", "!"]
						}
						test(io, testJob);
						// End Test
					}
			});
			// Make the client unavailable if they disconnect
			
		});
		//when connect to client
	}

	//DSS Listeners
	self.addJob = function (job) {
		// Add job
		Job.insert(job, function(err, inserted) {
			if (err) { console.log(err);}
			else {
				console.log("Added job: ", inserted);
			}
		});


		Client.findOne({state: "ready"}, {sort: {lastJob: 1}}, function (err, client) {
			if (err) {
				console.log(err);
			} else {
				console.log(client);
			}
		});
	}
}

// Test config
function test(io, job) {
	var ObjectId = require('mongodb').ObjectID;
	Client.findOne({}, function(err, client) {
		if (err) {console.log(err);} 
		else {
			var sockets = io.sockets.connected;
			var socket = sockets[client.socketId];
			if (socket) {
				console.log("Sending job", job);
				socket.emit('sendJob', {func: job.func, params: job.params});
			} else {
				console.log("Client socket is not connected");
			}
		}
	});
}



function onDisconnect(socket, client) {
	//when disconnect from client
	Client.update(client, {status: "unavailable"}, function(err, client) {
		if  (err) { console.log(err); }
		else {
			console.log("Client disconnected. ", client);
		}
	});
}

function onJobSuccess(socket, client, data) {
	Client.update(client, {status: "ready"}, function(err, client) {
		if (err) {console.log(err); }
		else {
			console.log("Client job completed successfully.", data);
		}
	});
	//when job is completed
}

function onJobError(socket, client, data) {
	Client.update(client, {status: "ready"}, function (err, client) {
		if (err) { console.log(err); }
		else {
			console.log("Job error.", data);
		}
	});
	//when job errors out
}

//Client Calls to Action
function sendJobToClient(job, client) {
	//changes status of job in database to "running"
	//sends job directly to the right one
}

function killJobOnClient (client) {
	//changes status of job in database to "inactive"
	//sends job directly to the right one
}

//DSS Calls to Action
function startDSS (dss) {

}

function killDSS (dss) {

}

module.exports = self;