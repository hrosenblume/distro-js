var self = this;

console.log("Here");
self.init = function(dss, onJob) {
	console.log("Service Initializing");
	dss.init(self);

	self.addJob = function(func, params) {
		console.log("adding job");
		onJob(func, params);
	}
}


module.exports = self;