var worker = new Worker('./oahu-worker-1.0.js');

console.log("starting");

worker.addEventListener('message', function(e) {
    console.log("message Recieved: " + e.data);
}, false);
