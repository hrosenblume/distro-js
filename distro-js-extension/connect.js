$.getScript("node_modules/socket.io/node_modules/socket.io-client/socket.io.js", function(){
    console.log("succesful import of socket.io.js");
});

chrome.browserAction.onClicked.addListener(function(activeTab) {
   chrome.browserAction.setBadgeText({text:"ho"});

    var socket = io.connect('http://localhost:3000');

    socket.on('requestAuth', function (data) {
        chrome.extension.getBackgroundPage().console.log('foo');

        chrome.storage.sync.get('userid', function(items) {
            var userid = items.userid;
            if (userid) {
                useToken(userid);
            } else {
                userid = getRandomToken();
                chrome.storage.sync.set({userid: userid}, function() {
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


});
