var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);
var cheerio = require('cheerio');
var visitcopenhagen = require('./store.js');
var fs = require('fs');
var colors = require('colors');

client
    .init()
    .url('http://www.visitcopenhagen.com/copenhagen/restaurant-aoc-gdk447262')
    .getHTML(".ProductInfoSidebar").then(function (html) {
        
        fs.writeFile("./html/www.visitcopenhagen.com.ProductInfoSidebar.html",html)
        $ = cheerio.load(html);

        console.log("start".green);
        visitcopenhagen.getContactRight("Address",$);
        visitcopenhagen.getContactRight("Web",$);
        visitcopenhagen.getContactRight("Email",$);
        visitcopenhagen.getContactRight("Phone",$);
        console.log("done".green);       

    })
    .getHTML(".ProductBodyContent").then(function (html) {
        
        fs.writeFile("./html/www.visitcopenhagen.com.ProductBodyContent.html",html)
        $ = cheerio.load(html);

        console.log("start".green);

        var productText = visitcopenhagen.getProductText($);
        console.log("done".green);       

    })
    .saveScreenshot('./snapsnot.png')
    .end();