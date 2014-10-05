//$.getScript("node_modules/socket.io/node_modules/socket.io-client/socket.io.js", function(){
//    console.log("succesful import of socket.io.js");
//});

chrome.browserAction.onClicked.addListener(function() {
    toggleDead();
});

var alive = false;

function toggleDead() {
    if (alive) {
        kill();
    } else {
        alive = true;
        chrome.browserAction.setBadgeText({text:"on"});
        console.log("alive");
    }
}

function kill() {
    alive = false;
    chrome.browserAction.setBadgeText({text:"off"});
    console.log("dead");
}

var socket = null;

function checkForSetup() {
    if (socket) {
        console.log("already connected");
    } else {
        setup();
    }
}

//function reconnect() {
//    console.log("trying");
//    socket.socket.reconnect();
//    console.log("trying");
//    socket.on('requestAuth', function (data) {
//        console.log("chill ballz");
//    });
//}


function setup() {

    console.log("trying to initialize connection");
    socket = io.connect('http://localhost:3000');


    socket.on('requestAuth', function (data) {
        alive = true;
        chrome.browserAction.setBadgeText({text: "on"});

        chrome.storage.sync.get('userid', function (items) {
            var userid = items.userid;
            if (userid) {
                useToken(userid);
            } else {
                userid = getRandomToken();
                chrome.storage.sync.set({userid: userid}, function () {
                    useToken(userid);
                });
            }

            function useToken(userid) {
                socket.emit('sendAuth', { browserId: userid });
            }
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
    });

    socket.on('kill', function(data) {
        kill();
    });

    socket.on('sendJob', function (data) {
        if (alive) {
            try {
                //            loadScript("url/script/id", function sendDataBack() {
                //                generatedData = run();
                //                socket.emit('success', { array: generatedData });
                //            });

            } catch (err) {
                socket.emit('success', { error: err});
            }
        } else {
                socket.emit('success', { error: "dead"});
        }
    });

    function recieveInfo(functionText, params) {
        eval(functionText);
        return start(params);
    }

    function loadScript(url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    }


}

document.addEventListener('load', checkForSetup(), false);