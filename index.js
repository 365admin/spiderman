//var crawler = require("./crawlers/visitcopenhagen")

var lib = require("./crawlers/theworlds50best.com/lib");
var data = require("./crawlers/theworlds50best.com/spec/data");
var crawler = require("./crawlers");

//console.log(lib.details(data.baseurl,data.details));
//console.log(lib.detailsLinks(data.baseurl,data.index));
crawler.getPage("http://www.theworlds50best.com/list/1-50-winners/Mirazur").then (function (r) {
   console.log(lib.details(data.baseurl,r.html));
   process.exit(0); 
});


