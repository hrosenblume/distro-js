/**
 * Created by AltonjiC on 10/4/14.
 */

var serv = require("service.js");
var start;

function init() {
    start = new Date().getTime();
    var MAX = 1003;
    var DIFF = 5;

    //method
    var preferred_prime_search = function(start_x) {
        //variables
        var internal_start = new Date().getTime();
        var is_prime;
        var counter;
        var total_cycles = 0;
        var results = new Array();
        //body bulk
        for (var x = start_x; x < x+DIFF; x++) {
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
            results.push([x,is_prime]);
        }
        //end, metric calculations, and return
        var internal_end = new Date().getTime();
        var internal_time = internal_end - internal_start;
        internal_time = internal_time / 1000; //end time in 
        var avg_cycles = total_cycles / (max - 3);
        console.log(avg_cycles); //avergae clock cycles
        console.log(time); // time
        results.push([avg_cycles, internal_time]); //add metrics into it
        return results;
    }

    var raw_prime_search() = function(start_x) {
        //variables
        var internal_start = new Date().getTime();
        var is_prime = true;
        var total_cycles = 0;
        var results = new Array();
        //body bulk
        for (var x = 3; x <= max; x++) {
            for (var y = 2; y < x ; y++) {
                if (x % y == 0) {
                    is_prime = false;
                }
            }
            results.push([x,is_prime]);
            total_cycles += x;
            is_prime = true;
        }
        //closing
        var internal_end = new Date().getTime();
        var internal_time = internal_end - internal_start;
        var avg_cycles = total_cycles / (max - 3);
        console.log(avg_cycles); //avergae clock cycles
        console.log(time); // time
        results.push([avg_cycles, internal_time]); //add metrics into it
    }

    var functionAsString = "" + preferred_prime_search;
    //var functionAsString = "" + raw_prime_search;

    //add the jobs
    for (var x = 3; x < MAX; x+=DIFF) {
        serv.addJob(functionAsString, x);
    }
}

function onJobFinished(contents) {
    console.log("job finished");
    for (int x = 0; x < contents.length - 1; x++) {
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