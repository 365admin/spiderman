var fs = require('fs');
var lib = require('./crawlers/theworlds50best.com/lib');
var data = require('./crawlers/theworlds50best.com/spec/data');
var crawler = require('./crawlers');
var async = require('async')
var Parse = require('parse/node');
var colors = require('colors');
var database = require('./database');
var argv = require('minimist')(process.argv.slice(2));

console.log("Initilizing")

database.run(process.env.SPIDERMANUSER, process.env.SPIDERMANPWD,function (){
        var CrawlUrls = Parse.Object.extend('CrawlUrls');
        var query = new Parse.Query(CrawlUrls);
        query.equalTo('status','crawl');
        query.first({
            success: function (crawlUrl) {
                if (crawlUrl){
                    var url = crawlUrl.get('url')
                    var key = crawlUrl.get('key')
                    console.log("Ready to crawl".green,url)
                    crawlUrl.set('status', 'crawling')
                    crawlUrl.save(null, {
                    success: function (crawlUrl) {
                        // Execute any logic that should take place after the object is saved.
                        console.log("crawling ",url.inverse);
                        crawler.getPage(url).then (function (result) {
                            var json = {};
                            crawlUrl.set('status', 'parsed')
                
                            switch (key) {
                                case 'detailsLinks':
                                    var detailsLinks =  lib.detailsLinks(data.baseurl,result.html);
                                    json = JSON.stringify(detailsLinks);        
                                    detailsLinks.forEach(function (url){
                                        var newUrl = new CrawlUrls();
                                        newUrl.set('url', url.href)
                                        newUrl.set('status', 'crawl')
                                        newUrl.set('key', 'details')
                                        newUrl.save(null,{
                                                            success: function (invitation) {
                                                                // Execute any logic that should take place after the object is saved.
                                                                console.log('New object created with objectId: ' + invitation.id);
                                                                

                                                            },
                                                            error: function (invitation, error) {
                                                                // Execute any logic that should take place if the save fails.
                                                                // error is a Parse.Error with an error code and message.
                                                                console.log('Failed to create new object, with error code: ' + error.message);
                                                                
                                                            }
                                                          }    
                                    )
                                    })
                                    break;
                                case 'details':
                                    var details =  lib.details(data.baseurl,result.html);
                                    json = JSON.stringify(details);        
                                    break;
                            
                                default:
                                    break;
                            }
                            
                            crawlUrl.set('json',json);
                            crawlUrl.save(null, {
                            success: function (crawlUrl) {
                                console.log("html saved");
                                database.done();
                                console.log("Exiting");
                                process.exit(0);
                                                    },
                            error: function (crawlUrl, error) {
                                console.log("Failed : " + error.message);
                            }
                        });
                    })},
                    error: function (crawlUrl, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        console.log("Failed : " + error.message);
                    }
                });}
                else
                {
                        console.log("nothing to crawl ");
                        database.done();
                        console.log("Exiting ");
                        process.exit(0);
                }
            },
            error: function (error) {
                console.log(error.message.yellow,error)
            }
        });

})
