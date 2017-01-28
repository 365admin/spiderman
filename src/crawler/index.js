var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);
var Q = require("q");
var fs = require('fs');
var Roadmap = require('./fasttrack.microsoft.com-roadmap.js');


var debug = require('debug');
var log = debug('app:log');
log.log = console.log.bind(console);

var crawl = {};

module['exports'] = crawl;

crawl.getPage = function(url) {
    log('getPage');
    var deferred = Q.defer();

    client
        .init()
        .url(url)
        .saveScreenshot('./temp/latest.png')
        .getSource().then(function(html) {
            deferred.resolve(html);

        })
        .end();

    return deferred.promise;
};

crawl.getTestHtml = function(path) {
    log('getTestHtml("%s")', path);
    var deferred = Q.defer();
    var html = fs.readFileSync(path).toString();;
    deferred.resolve(html);
    return deferred.promise;

};


crawl.getRoadmap = function(html) {
    var deferred = Q.defer();

    var details = Roadmap.details("", html);
    deferred.resolve(details);

    return deferred.promise;

};