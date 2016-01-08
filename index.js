//var crawler = require("./crawlers/visitcopenhagen")

var lib = require("./crawlers/theworlds50best.com/lib");
var data = require("./crawlers/theworlds50best.com/spec/data");

//console.log(lib.details('http://www.theworlds50best.com',data.details));
console.log(lib.detailsLinks('http://www.theworlds50best.com',data.index));
process.exit(0)

