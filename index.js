var fs = require('fs');
var Crawler = require('./crawlers');
var Roadmap = require('./crawlers/fasttrack.microsoft.com-roadmap.js');
var html = fs.readFileSync(".\\temp\\latest.html").toString();;
var details = Roadmap.details("", html);

console.log(details);
//Crawler.getPage("https://fasttrack.microsoft.com/roadmap").finally(function(a) { //process.exit(0);})