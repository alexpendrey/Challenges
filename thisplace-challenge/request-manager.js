var fs = require('fs');
var request = require('request');
var q = require('q');

var RequestManager = function() {

    var deferred;

    var getUrl = function(url, method, formData) {
        deferred = q.defer();

        request({
            "url": url,
            "method": method,
            "form": formData
        }, handleResponse);

        return deferred.promise;
    };

    var handleResponse = function(err, resp, body) {
        if (err) {
            return deferred.reject('error');
        }
        else {
            return deferred.resolve(body);
        }
    };

    return {
        go: function(url, method, formData) {
            return getUrl(url, method, formData);
        }
    }
}();

module.exports = RequestManager;