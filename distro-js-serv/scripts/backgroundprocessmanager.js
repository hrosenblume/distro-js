//imports and globals
var Threads = require('webworker-threads');
// var Parallel = require('paralleljs');
var processes = [];
var fs = require('fs');
var service = require('./service');
var self = this;


// Initialize by passing in servicemanager
self.init = function(servicemanager) {


	// Pass in DSS for starting
	self.start = function(dss) {
		//read the DSS file
		var path = "/../services/" + dss.filename + ".js";

		var worker = new Threads.Worker(__dirname + path);
		worker.postMessage({task: 'init', path: path})
	// 	//worker listener
		worker.onmessage = function(event) {
			//job code endpoint... stored in data
			if (event.data.task == 'sendJob') {
				console.log("Received request to send job");

					servicemanager.addJob({
						dss: dss._id,
						func: "var start = " + event.data.fn,
						params: event.data.params
					});
			}
		};
		console.log(worker);


		self.onJobFinish = function(data) {
			console.log("ONJOBFINISH", data);
			worker.postMessage({
				task: 'jobFinished',
				result: data.result
			})
		}
		processes[dss._id] = self;
		return self;
	}

	// Kill passed in killed DSS
	self.kill = function(dss) {
		processes[dss._id].postMessage('kill');
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