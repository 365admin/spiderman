var fs = require('fs');
var lib = require("./crawlers/theworlds50best.com/lib");
var data = require("./crawlers/theworlds50best.com/spec/data");
var crawler = require("./crawlers");
var async = require("async")
var Parse = require('parse/node');
var colors = require('colors');
var database = require('./database');
var argv = require('minimist')(process.argv.slice(2));

console.log("Initilizing")

database.run(process.env.SPIDERMANUSER, process.env.SPIDERMANPWD,function (){
        var CrawlUrls = Parse.Object.extend("CrawlUrls");
        var query = new Parse.Query(CrawlUrls);
        query.equalTo("status","crawl");
        query.first({
            success: function (crawlUrl) {
                if (crawlUrl){
                    var url = crawlUrl.get('url')
                    console.log("Ready to crawl".green,url)
                    crawlUrl.set('status', "crawling")
                    crawlUrl.save(null, {
                    success: function (crawlUrl) {
                        // Execute any logic that should take place after the object is saved.
                        console.log('crawling ',url.inverse);
                        database.done();
                        console.log('done ');
                        process.exit(0);
                    },
                    error: function (crawlUrl, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        console.log('Failed : ' + error.message);
                        
                    }
                });}
                else
                {
                        console.log('nothing to crawl ');
                        database.done();
                        console.log('Exiting ');
                        process.exit(0);
                    
                }

                
            },
            error: function (error) {
                console.log(error.message.yellow,error)
            }
        });

})


//var urls = JSON.parse(fs.readFileSync("./index.json"));

/**
 * Load index of top 50 restaurants
 */
// crawler.getPage("http://www.theworlds50best.com/list/1-50-winners#t1-10").then (function (r) {
//    var urls =  lib.detailsLinks(data.baseurl,r.html);
//    fs.writeFileSync("./index.json",JSON.stringify( urls) )
//    process.exit(0); 
// });
