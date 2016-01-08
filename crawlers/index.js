var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);
var cheerio = require('cheerio');
var fs = require('fs');
var colors = require('colors');
var Q = require("q")

var crawl = {};
module['exports'] = crawl;

crawl.getPage = function (url) {
    var deferred = Q.defer();
    var result = {};
    client
        .init()
        .url(url)
        .saveScreenshot('./latest.png')
        .getSource().then(function (html) {
            fs.writeFile("./latest.html", html)
            result.html = html;    
            deferred.resolve(result);

        })
        .end();

    return deferred.promise;
}