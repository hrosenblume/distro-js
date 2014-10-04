var mongoose = require('mongoose');

function start() {

}

//Socket Listeners
function onConnect(socket) {
	//when connect to client

}

function onDisconnect(socket) {
	//when disconnect from client
}

function onSuccess(socket) {
	//when job is completed
}

function onError(socket) {
	//when job errors out
}

//DSS Listeners
function addJobToDB(job) {
	//adds job to DB on successful connection
	//between servicemanger and client
}

//Client Calls to Action
function sendJobToClient(job, client) {
	//changes status of job in database to "running"
	//sends job directly to the right one
}

function killJobOnClient(client) {
	//changes status of job in database to "inactive"
	//sends job directly to the right one
}

//DSS Calls to Action
function startDSS(dss) {

}

function killDSS(dss) {

}

exports.start = start;