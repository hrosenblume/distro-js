importScripts('https://cdn.socket.io/socket.io-1.1.0.js');

var socket = io("localhost:3001");
var token = getRandomToken();

socket.on('requestAuth', function(data) {
    console.log("Authenticate");
    socket.emit('sendAuth', {browserId: token})
});

socket.on('sendJob', function(job) {
    console.log("Received job", job);

    eval(job.func);
    console.log(start);
    start(job.params, function(entries) {
        console.log(entries);
        socket.emit('jobSuccess', {result: entries});
    });

});

function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}