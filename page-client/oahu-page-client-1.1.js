var worker = new Worker('./oahu-worker-1.0.js');

worker.addEventListener('message', function(e) {
    console.log("message Recieved: " + e.data);
}, false);