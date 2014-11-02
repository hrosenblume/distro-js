/**
 * Created by AltonjiC on 10/4/14.
 */


this.onmessage = function(event) {
    if (event.data.task == 'kill') {
        console.log('KILL');
    } else if (event.data.task == 'init') {
        console.log('INIT');
        init();
    } else if (event.data.task == 'jobFinished') {
        console.log("JOB FINISHED");
        onJobFinished(event.data.result);
    }
}

function init() {
    //start = new Date().getTime();
    var MAX = 103;
    var DIFF = 5;

    //method
    var preferred_prime_search = function(start_arr, callback) {
        start_x = parseInt(start_arr[0]);
        //variables
        var internal_start = new Date().getTime();
        var is_prime;
        var counter;
        var total_cycles = 0;
        var results = new Array();
        console.log("Starting with: ", start_x);
        // //body bulk
        var x = start_x;
        var high = start_x + 10000;
        for (x; x < high; x++) {
            counter = 2;
            is_prime = true;
            if (x % 2 == 0) {is_prime = false;}
            while ((counter < Math.sqrt(x) + 1) && is_prime) {
                if (x % counter == 0) {
                    is_prime = false;
                }
                counter++;
            }
            total_cycles+=(counter-1);
            results.push({value: x, prime: is_prime});
            console.log(x, is_prime);

        }
        //end, metric calculations, and return
        var internal_end = new Date().getTime();
        var internal_time = internal_end - internal_start;
        internal_time = internal_time / 1000; //end time in
        // var avg_cycles = total_cycles / (max - 3);
        // console.log(avg_cycles); //avergae clock cycles
        console.log(internal_time); // time
        results.push({time: internal_time}); //add metrics into it
        callback(results);
    }

    // var raw_prime_search = function() {
    //     //variables
    //     var internal_start = new Date().getTime();
    //     var is_prime = true;
    //     var total_cycles = 0;
    //     var results = new Array();
    //     //body bulk
    //     for (var x = 3; x <= max; x++) {
    //         for (var y = 2; y < x ; y++) {
    //             if (x % y == 0) {
    //                 is_prime = false;
    //             }
    //         }
    //         results.push([x,is_prime]);
    //         total_cycles += x;
    //         is_prime = true;
    //     }
    //     //closing
    //     var internal_end = new Date().getTime();
    //     var internal_time = internal_end - internal_start;
    //     var avg_cycles = total_cycles / (max - 3);
    //     console.log(avg_cycles); //avergae clock cycles
    //     console.log(time); // time
    //     results.push([avg_cycles, internal_time]); //add metrics into it
    // }

    var functionAsString = "" + preferred_prime_search;
    //var functionAsString = "" + raw_prime_search;

    //add the jobs
    var interval = 10000;
    for (var x = 3; x < 10*interval ; x += interval) {
        postMessage({task: 'sendJob', fn: functionAsString, params: x});
    }
}

function onJobFinished(contents) {
    console.log("job finished");
    for (var x = 0; x < contents.length - 1; x++) {
        console.log(contents[x]);
        //results
    }
    console.log(contents[contents.length-1]); //information on cycles and time
    //we need to store this to a databse
}

function onFinish() {
    var end = new Date().getTime();
    var time = end - start;
    console.log("Time to completion: " + time/1000 + " seconds");
}
