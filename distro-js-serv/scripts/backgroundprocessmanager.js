//imports and globals
var Worker = require('webworker-threads').Worker;
var processes = [];
var fs = require('fs');

var self = this;

// Initialize by passing in servicemanager
self.init = function(servicemanager) {


	// Pass in DSS for starting
	self.start = function(dss) {
		//read the DSS file
		var path = "../services/" + dss.name + ".js";
		fs.readFile(path, function(error, data) {
			if (error) {
				console.log("you fucked up");
			} else {
				// Spawn the worker thread
				var worker = new Worker(function(){
					postMessage(data);
					console.log("Worker spawned");
					this.onmessage = function(event) {
					  	if (event.task == 'kill') {
					  		self.close();
					  	}
					}
				});
				//worker listener
				worker.onmessage = function(event) {
					//job code endpoint... stored in data
					console.log(event);
					console.log("Received message from worker");
					if (event.data.task == 'sendJob') {
						servicemanager.addJob({
							dss: dss._id,
							func: event.data.func,
							params: event.data.params
						});
					}
				};
				processes[dss.name] = worker;
			}
		});
	}

	// Kill passed in killed DSS
	self.kill = function(dss) {
		processes[dss.filename].postMessage('kill');
		delete processes[dss.filename];
	}

	// Get running procesess
	self.getRunningProcesses = function() {
		return processes;
	}

	// Get running procesess names
	self.getRunningProcessesNames = function() {
		return processes.keys();
	}
}


module.exports = self;