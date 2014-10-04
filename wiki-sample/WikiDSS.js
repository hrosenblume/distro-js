/**
 * Created by AltonjiC on 10/4/14.
 */
function scheduleJobs() {
    var file = "test1000.txt";
    var titles = getTitles(file);
    var jobArray = [];
    for (var i = 0;i < titles.length;i++) {
//        var title = titles[i];
//        var id;
//        $.getJSON("http://en.wikipedia.org/w/api.php?format=json&action=query&titles="
//        + title + "&prop=revisions&rvprop=content&callback=?&indexpageids", function (data) {
//            id = data.query.pageids[0];
//            var wikiText = data.query.pages[id].revisions[0]['*'];
//            var re = /\[\[(.*?)\]\]/g;
//            for (m = re.exec(wikiText); m; m = re.exec(wikiText)) {
//                var entry = m[1];
//                if (entry.indexOf("|") != -1) {
//                    entry = entry.substring(0, entry.indexOf("|"));
//                }
//                if (entry.indexOf("#") != -1) {
//                    entry = entry.substring(0, entry.indexOf("#"));
//                }
//                console.log(entry);
//            }
//        }
    }

    function getTitles(file) {
        var titleArray = [];
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    var lines = allText.split("\n");
                    for(var i = 0;i < lines.length;i++){
                        var title = lines[i].replace(/\d*:\d*:/, "");
                        titleArray.push(title);
                    }
                    console.log("there are " + lines.length + " lines in the .txt" )
                }
            }
        }
        rawFile.send(null);
        return titleArray;
    }
}

//function onJobFinished(var titleArray) {
//
//}