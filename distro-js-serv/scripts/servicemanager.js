// Handle exporting all the functions
var self = this;


// Import models
var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var Dss = mongoose.model('DSS');
var Job = mongoose.model('Job');
var ObjectId = mongoose.Schema.Types.ObjectId;



// Background Process Manager
var procManager = require('./backgroundprocessmanager.js');

self.start  = function(io){
	procManager.init(self);
	// var sockets = io.connected;
	
	console.log("Starting service manager");

	// Go through all DSS records and start them
	Dss.find({}, function (err, services){
		if (err) {
			console.log(err);
		} else {
			for (var i in services) {
				console.log("Starting DSS: ", services[i]);
				procManager.start(services[i]);
			}
		}
	});

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

						// At this point the client can accept jobs
						getJob(function (job) {
							if (job) {
								sendJobToClient(job, client)
							}
						});

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
						// var testJob = {
						// 	func: "function start(params) { console.log(params) }",
						// 	params: ["Hello", "World", "!"]
						// }
						// test(io, testJob);
						// End Test
					}
			});
			// Make the client unavailable if they disconnect
			
		});
		//when connect to client
	}

	//DSS Listeners
	self.addJob = function (job) {
		console.log("Adding job");
		// Add job
		var newJob = new Job({
			dss: job.dss,
			func: job.func,
			params: job.params
		});
		console.log(newJob);
		newJob.save(function(err, data) {
			if (err) {
				console.log("ERROR: ", err);
			} else if (!data) {
				console.log("Not added");
			} else {
				console.log("Added!");
				getClient(function(client) {
					if (client) {
						sendJobToClient(newJob, client)
					}
				});
			}
		}) ;
	}

	function sendJobToClient(job, client) {
		var sockets = io.sockets.connected;
		// console.log(sockets);
		var socket = sockets[client.socketId];
		if (socket) {
			Job.update(job, {state: "running", client: client}, function(err, count) {
				console.log("Sending job", job);
				Client.update(client, {job: job._id, status: "running"}, function(err, client) {
					if (err) { console.log(err); }
					socket.emit('sendJob', {func: job.func, params: job.params});
				})
			});
		} else {
			console.log("Client socket is not connected: ", client.socketId);
		}
	}

	function getJob(callback) {
		Job.findOne({state: 'pending'}, null, { sort: {_id: 1}} ,function (err, job) {
			if (err || !job) {
				return callback(null);
			} else {
				return callback(job);
			}
		});
	}

	function getClient(callback) {
		Client.findOne({}, null, { sort: {lastJob: 1}} ,function (err, client) {
			if (err || !client) {
				return callback(null);
			} else {
				return callback(client);
			}
		});
	}


	function onDisconnect(socket, client) {
	//when disconnect from client
		Client.update(client, {status: "unavailable"}, function(err) {
			if  (err) { console.log(err); }
			else {
				console.log("Client disconnected. ", client);
			}
		});
	}

	function onJobSuccess(socket, client, data) {
		console.log("SUCCESS: ", client);
		procManager.onJobFinish(data);
		job = client.job;
		Job.update({_id: job}, {state: "success"}, function(err) {
			if (err) { console.log(err); }
		});
		Client.update(client, {status: "ready"}, function(err) {
			if (err) {console.log(err); }
			else {
				// console.log("Client job completed successfully.", data);
				getJob(function(job) {
					if (job) {
						sendJobToClient(job, client); 
					}
				})
			}
		});
		//when job is completed
	}

	function onJobError(socket, client, data) {
		Client.update(client, {status: "ready"}, function (err) {
			if (err) { console.log(err); }
			else {
				console.log("Job error.", data);
			}
		});
		//when job errors out
	}
}

// Test config






//Client Calls to Action
// function sendJobToClient(job, client) {
// 	//changes status of job in database to "running"
// 	Client.update(client, {$set: {status: "running"}}, function (err, client) {
// 		if (err) { console.log(err); }
// 		else {
// 			console.log("New job is running.", data);
// 		}
// 	});
// 	//host js for client 

// 	//sends job id directly to the correct client (should send url)
// 	var sockets = io.sockets.connected;
// 	var socket = sockets[client.socketId];
// 	if (socket) {
// 		Job.update(job, {state: "running"}, function(e, j) {
// 			if (e) {console.log(e);}
// 			console.log("Sending job", j);
// 			socket.emit('sendJob', { id:j._id });			
// 		});
// 	} else {
// 		console.log("Client socket is not connected");
// 	}
	


// }

function killJobOnClient (client) {
	//changes status of job in database to "inactive"
	var sockets = io.sockets.connected;
	var socket = sockets[client.socketId];
	if (socket) {
		console.log("Sending job", job);
		socket.emit('sendJob', { id:job._id });
	} else {
		console.log("Client socket is not connected");
	}
	client.emit("kill");
	Client.update(client, {status: "inactive"}, function(err, client) {
		if  (err) { console.log(err); }
		else {
			console.log("Client stopped. ", client);
		}
	});
	//sends job directly to the right one

}

//DSS Calls to Action
function startDSS (dss) {

}

function killDSS (dss) {

}

module.exports = self;