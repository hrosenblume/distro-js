//imports and globals
var Worker = require('webworker-threads').Worker;
var processes = [];
var fs = require('fs');

function start(dss) {
	//establish the 
	var path = "../services/" + dss.name + ".js";
	fs.readFile(path, function(error, data) {
		if (error) {
			console.log("you fucked up");
		} else {
			var worker = new Worker(function(){
				postMessage(data);
				this.onmessage = function(event) {
				  	if (event.data == 'kill') {
				  		self.close();
				  	}
				}
			});
			//worker listener
			worker.onmessage = function(event) {
				//job code endpoint... stored in data
				console.log(event.data);
			};
			processes.push({dss.name: worker});
		}
	});
}

function kill(dss) {
	processes[dss.filename].postMessage('kill');
	delete processes[dss.filename];
}

function getRunningProcesses() {
	return processes;
}

function getRunningProcessesNames() {
	return processes.keys();
}
