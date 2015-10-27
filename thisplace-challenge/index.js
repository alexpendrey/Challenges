var RequestManager = require('./request-manager');
var ResponseManager = require('./response-manager');

var q = require('q');

var baseUrl = "http://dev-challenge.thisplace.com";

var tries = 1;

var recursive = function(rm) {
    RequestManager.go(baseUrl + rm.url, rm.method, rm.postval).then(function(resp) {
        tries++;
        console.log(resp);
        rm = ResponseManager.parseResponse(resp);
        console.log('Sending request: ', rm);

        if (tries >= 18 || rm.method == '') {
            console.log('exiting due to try limit (', tries, ') or task is complete');
            process.exit(0);
        }

        recursive(rm);

    });
};

RequestManager.go(baseUrl, 'get').then(function(resp) {
    console.log(resp);

    var rm = ResponseManager.parseResponse(resp);

    console.log(rm);

    recursive(rm);

});
