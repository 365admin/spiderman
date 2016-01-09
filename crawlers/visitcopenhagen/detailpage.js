var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);
var cheerio = require('cheerio');
var visitcopenhagen = require('./store.js');
var fs = require('fs');
var colors = require('colors');
var Q = require("q")

var crawl = {};
module['exports'] = crawl;
/**
 * Extract data from visitcopenhagen restaurant detail
 * 
 * @param url address of source
 * 'http://www.visitcopenhagen.com/copenhagen/restaurant-aoc-gdk447262'
 */
crawl.details = function (url) {
    var deferred = Q.defer();
    var result = {};
    client
        .init()
        .url(url)
        .getHTML(".ProductInfoSidebar").then(function (html) {
            fs.writeFile("./www.visitcopenhagen.com.ProductInfoSidebar.html", html)
            var $ = cheerio.load(html);

            visitcopenhagen.getContactRight("Address", $).then(function (r){result.address = r}) ;
            result.web = visitcopenhagen.getContactRight("Web", $);
            result.emaii = visitcopenhagen.getContactRight("Email", $);
            result.phone = visitcopenhagen.getContactRight("Phone", $);
            console.log("result".green,result)
        })
        .getHTML(".ProductBodyContent").then(function (html) {

            fs.writeFile("./www.visitcopenhagen.com.ProductBodyContent.html", html)
            var $ = cheerio.load(html);

            result.productText = visitcopenhagen.getProductText($);
            console.log("result".green,result)
            deferred.resolve(result);
        })
        .saveScreenshot('./snapsnot.png')
        .end();

    return deferred.promise;
}