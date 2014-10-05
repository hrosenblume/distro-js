/**
 * Created by AltonjiC on 10/4/14.
 */
var hashTable = [];

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

    console.log("Starting DSS Worker");

    var getReferencedArticles = function(titleArr, callback) {
        var title = titleArr[0];
        var entries = new Array();
        var id;
        $.getJSON("http://en.wikipedia.org/w/api.php?format=json&action=query&titles="
            + title + "&prop=revisions&rvprop=content&callback=?&indexpageids", function (data) {
            id = data.query.pageids[0];
            var wikiText = data.query.pages[id].revisions[0]['*'];
            var re = /\[\[(.*?)\]\]/g;
            for (m = re.exec(wikiText); m; m = re.exec(wikiText)) {
                var entry = m[1];
                if (entry.indexOf("|") != -1) {
                    entry = entry.substring(0, entry.indexOf("|"));
                }
                if (entry.indexOf("#") != -1) {
                    entry = entry.substring(0, entry.indexOf("#"));
                }
                entries.push(entry);
            }
            callback(entries);
        });
    }

    function getTitles(raw) {
        var lines = raw.split("\ ");
        var titleArray = [];
        for(var i = 0; i < lines.length;i++){
            var title = lines[i].replace(/\d*:\d*:/, "");
            titleArray.push(title);
        }
        console.log("there are " + titleArray.length + " titles" );
        // console.log(titleArray);
        return titleArray;
    }

var rawTitles = "590:10:AccessibleComputing \
590:12:Anarchism \
590:13:AfghanistanHistory \
590:14:AfghanistanGeography";

    var titles = getTitles(rawTitles);
    var functionAsString = "" + getReferencedArticles;

    for (var i = 0; i < titles.length; i++) {
        postMessage({task: 'sendJob', fn: functionAsString, params: [titles[i]]}); 
        // Sends message up to be sent to a client
    }
}

function onJobFinished(titleArray) {

    for (var i = 0; i < titleArray.length; i++) {
        // console.log(titleArray[i]);
        title = titleArray[i];
        if (hashTable[title] >=0 ) {
            hashTable[title]++;
        } else {
            hashTable[title] = 1;
        }

    }
    // hashTable.sort(function (a, b) { return b-a; });
    console.log("Results: ", hashTable);
}

function onFinish() {
}