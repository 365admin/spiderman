var fs = require('fs');
var Crawler = require('./crawlers');
var Roadmap = require('./crawlers/fasttrack.microsoft.com-roadmap.js');
var html = fs.readFileSync(".\\temp\\latest.html").toString();;
var details = Roadmap.details("", html);
fs.writeFileSync(".\\temp\\latest.json", JSON.stringify(details));
console.log("Done");
//Crawler.getPage("https://fasttrack.microsoft.com/roadmap").finally(function(a) { //process.exit(0);})